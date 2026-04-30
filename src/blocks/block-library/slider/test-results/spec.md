# スライダー ブロック 操作テスト仕様

スライダー（slider）+ スライダーアイテム（slider-item）ブロックのテスト仕様書。

対象ブロック:
- `ystdtb/slider`（親、static save block）
- `ystdtb/slider-item`（子、static save block、属性なし）

`save()` を持つ static block かつ、属性 → `data-slider-options` JSON 文字列の組み立てロジック（`getSliderOptions()`）が複雑なため、四層構成（L0 Jest unit / L1 fixture / L2 Playwright UI / L3 手動）で動作を検証する。

## テスト方針

- **L0 (Jest unit)**: `src/blocks/block-library/slider/utils.test.ts` で、`getSliderOptions` / `getSliderWrapStyles` / `getSliderWrapClasses` / `getNavigationClasses` / `getNavigationStyles` / `getPaginationStyles` / `hasSlidesOption` の純関数を網羅検証
- **L1 (fixture-based integration test)**: `save()` の出力 HTML を含む完全な往復検証（parse → migrate → serialize で attributes・HTML がロスなく一致）
- **L2 (Playwright UI 自動テスト)**: 7 つの Inspector Controls パネルのラベル-値対応・条件付き表示・操作順序をスポット検証
- **L3 (手動確認)**: フロントエンドでの Swiper 実動作（自動再生・ナビゲーション・ページネーション・各エフェクト）・レスポンシブ挙動・テーマとの相互作用を目視確認

運用ルールは [docs/block-operation-test-guideline.md](../../../../../docs/block-operation-test-guideline.md) を参照。L0 Jest unit は本ブロック固有のオプトイン対応（`utils.ts` のロジック網羅のため）。

## ブロック特性

- **親子ブロック**: 親 `ystdtb/slider` / 子 `ystdtb/slider-item`（任意のブロックを内包できるラッパー）
- **static save block**: 親・子とも `save()` を持つ。フロントは Swiper（`view.ts`）で初期化
- **`allowedBlocks`**: `core/image` / `core/cover` / `core/video` / `ystdtb/slider-item` の 4 種類
- **innerBlocks template**: `[ [ 'core/image' ] ]`（新規挿入時）
- **className サポート**: `false`（`wp-block-ystdtb-slider` は出力されない、新規 v2 ブロック時）。ただし v1 deprecated 経由で `className` 属性が残る場合あり
- **align サポート**: `[ 'wide', 'full' ]`
- **anchor サポート**: `false`
- **deprecated**: 1 件（v1.34.1 形式から v2 への migrate）
- **`sliderId` 自動生成**: `edit.tsx` の `useEffect` で `clientId.split('-')[0]` を初期値として設定
- **`previewType` 属性**: エディター内のみで使用（grid / horizontal）。フロント描画には影響しない
- **PHP 側の役割**:
  - レスポンシブ高さ用 inline CSS の出力（`Styles::add_media_query_*` で 3 デバイス分）
  - yStandard v4 互換 padding リセット（`is_ystandard_v4()` 判定で条件付き）
  - `render_callback` は無し（`save()` がフロント HTML を出力）
- **Swiper モジュール（フロント）**: 動的読込（Autoplay / Navigation / Pagination / EffectFade / EffectCoverflow / EffectCube）

## テスト対象の設定一覧

### 基本設定（パネル: Basic）

| 設定項目 | 属性 | 型 | デフォルト |
|---|---|---|---|
| エフェクト | `effect` | string | `'slide'`（`slide` / `fade` / `coverflow` / `cube`） |
| スライドアニメーションの早さ | `speed` | number | `0.3`（秒、`× 1000` で ms 化） |
| ループ | `loop` | boolean | `true` |
| スライドアニメーション関数 | `slideFunction` | string | undefined（CSS `transition-timing-function`） |

### 自動再生（パネル: Autoplay）

| 設定項目 | 属性 | 型 | デフォルト |
|---|---|---|---|
| 自動再生有効化 | `autoplay` | boolean | `true` |
| 自動再生の表示時間 | `autoplayDelay` | number | `8`（秒、`× 1000` で ms 化） |
| マウスホバー時に停止 | `autoplayPauseOnMouse` | boolean | `false` |
| 手動スライドで再生を止める | `autoplayDisableOnInteraction` | boolean | `true` |
| 逆方向再生 | `autoplayReverseDirection` | boolean | `false` |

### サイズ（パネル: Size）

| 設定項目 | 属性 | 型 | デフォルト |
|---|---|---|---|
| 縦横比 | `ratio` | string | undefined（9 種：`1-1` / `2-1` / `3-1` / `3-2` / `4-3` / `16-9` / `2-3` / `9-16` + 「指定なし」） |
| 高さ（単一値） | `height` | string | undefined |
| 高さ（レスポンシブ） | `responsiveHeight` | object | undefined（`{ desktop, tablet, mobile }`） |

### スライド表示数（パネル: Slide、`effect=slide` または `coverflow` のみ表示）

| 設定項目 | 属性 | 型 | デフォルト |
|---|---|---|---|
| 全デバイス共通設定 | `slides` | object | undefined |
| デバイス別設定 | `responsiveSlides` | object | undefined（`{ desktop, tablet, mobile }`） |
| ブレークポイント | `breakpoints` | object | `{ desktop: 1024, tablet: 640 }`（実装内 fallback） |

各 `slides` / `responsiveSlides[device]` の中身:

| 設定項目 | サブ属性 | 型 | デフォルト（実装側） |
|---|---|---|---|
| 1 画面に表示するスライド数 | `slidesPerView` | number / `'auto'` | `1` |
| スライドめくり数 | `slidesPerGroup` | number | `1` |
| スライド間の余白 | `spaceBetween` | string | undefined |
| 中央寄せ | `centeredSlides` | boolean | undefined |

### ナビゲーション（パネル: Navigation）

| 設定項目 | 属性 | 型 | デフォルト |
|---|---|---|---|
| ナビゲーション表示 | `hasNavigation` | boolean | `false` |
| ナビゲーション色（プリセット slug） | `navigationColor` | string | undefined（テーマ slug、例：`ys-red`） |
| ナビゲーション色（カスタム HEX） | `customNavigationColor` | string | undefined |

`navigationColor` と `customNavigationColor` は ColorPalette 側で排他処理される（プリセット選択時は `customNavigationColor: undefined`）。

### ページネーション（パネル: Pagination）

| 設定項目 | 属性 | 型 | デフォルト |
|---|---|---|---|
| ページネーションタイプ | `paginationType` | string | undefined（`bullets` / `dynamicBullets` / `progressbar` / `fraction` の 4 種 + 「なし」） |
| ページネーション色 | `paginationColor` | string | undefined（hex 入力のみ、CSS カスタムプロパティ `--swiper-pagination-color` にも適用） |

### 上級者向け設定（パネル: Advanced）

| 設定項目 | 属性 | 型 | デフォルト |
|---|---|---|---|
| スライダー ID | `sliderId` | string | useEffect で自動生成（`clientId.split('-')[0]`） |

### その他（supports / プレビュー）

| 設定項目 | 属性 | 型 | デフォルト |
|---|---|---|---|
| 配置（`alignwide` / `alignfull`） | `align`（supports） | — | undefined |
| エディター内プレビュータイプ | `previewType` | string | `'grid'`（`grid` / `horizontal`、エディター内のみ） |

## 排他関係・条件付き表示

| 条件 | 影響 |
|---|---|
| `ratio` 指定 | サイドバーの「高さ」UI が非表示。`AspectRatio` の `onChange` で `height` / `responsiveHeight` を `undefined` に強制クリア |
| `effect: 'fade'` または `'cube'` | 「スライド表示数」パネル全体が非表示（`hasSlidesOption()` が false → `Slide` コンポーネントが `<></>` 早期 return） |
| `slides` か `responsiveSlides` の片方を設定 | もう一方を `undefined` に強制クリア（`Slide` パネルの `DefaultTab` / `ResponsiveTab` で実装済） |
| `autoplay: false` | autoplay 関連の設定値（`autoplayDelay` / `autoplayPauseOnMouse` 等）の UI 表示状態は変化しない（純粋に `data-slider-options.autoplay` キー自体が非出力になる） |
| `hasNavigation: false` | ナビゲーション色 UI は表示されたまま（属性のみ）。フロント HTML には `swiper-button-prev` / `next` 要素自体が出力されない |
| `paginationType: ''`（なし） | フロント HTML に `swiper-pagination` 要素自体が出力されない。色 UI は表示されたまま |
| `slidesPerView: 'auto'` | 上級者向け設定の警告 NoticeWarning が表示される |
| `ratio` または `height` または `responsiveHeight` のいずれか設定 | `getSliderWrapClasses()` で `is-fixed-height` クラス追加 |

## 実装上のバグ・修正履歴

L0 Jest unit テスト導入時に Swiper 仕様（[Breakpoints](https://swiperjs.com/swiper-api#param-breakpoints)）と実装出力を突き合わせて以下 3 件のバグを発見し、本テスト導入と同時に修正した。

| ID | 内容 | 出典・修正 |
|---|---|---|
| B001 | `responsiveSlides` のタブレット用設定値が `slidesMobile` から取られていた（タブレット値が反映されず、モバイル値がコピーされる） | `src/blocks/block-library/slider/utils.ts` のタブレット用分割代入を `slidesMobile` → `slidesTablet` に修正 |
| B002 | `responsiveSlides` のデスクトップ用設定で `breakpointsOptions[breakpointsDesktop]` のキー名が `desktopSlidesPerView` などになっており Swiper 仕様の `slidesPerView` で受け付けられなかった | `src/blocks/block-library/slider/utils.ts` のデスクトップ用キー名を Swiper 仕様（`slidesPerView` / `spaceBetween` / `slidesPerGroup` / `centeredSlides`）に修正 |
| B003 | `breakpointsOptions` がトップレベル（`{ "640": {...}, "1024": {...}, ... }`）に展開されていた。Swiper 仕様では `breakpoints: { 640: {...}, 1024: {...} }` のネスト構造が期待される | `src/blocks/block-library/slider/utils.ts` の `...stripUndefined(breakpointsOptions)` を `breakpoints: stripUndefined(breakpointsOptions)` に修正 |

修正後の期待値は L0 Jest unit テスト（`utils.test.ts` の `responsiveSlides` セクション）で固定化されており、リグレッション検出が可能。

---

## L0 Jest unit テストパターン（utils.ts ロジック網羅検証）

実装は `src/blocks/block-library/slider/utils.test.ts`。`utils.ts` の純関数を引数 → 戻り値で検証する。

実行: `npm run test:unit:component`（または `npm run test:unit`）

### `getSliderOptions(attributes)` テストケース

| # | テスト名 | 検証内容 |
|---|---|---|
| 1 | `default attributes` | デフォルトで `effect:'slide', speed:300, loop:true, autoplay:{delay:8000, pauseOnMouseEnter:false, disableOnInteraction:true, reverseDirection:false}` |
| 2-4 | `effect: fade / coverflow / cube` | 指定 effect が JSON に含まれる |
| 5 | `speed: 1` | `speed: 1000` |
| 6 | `speed: 5` | `speed: 5000` |
| 7 | `loop: false` | `loop: false` |
| 8 | `autoplay: false` | `autoplay` キー自体が出力されない |
| 9 | `autoplayDelay: 5` | `autoplay.delay: 5000` |
| 10 | `autoplayDelay: 15` | `autoplay.delay: 15000` |
| 11 | `autoplayPauseOnMouse: true` | `autoplay.pauseOnMouseEnter: true` |
| 12 | `autoplayDisableOnInteraction: false` | `autoplay.disableOnInteraction: false` |
| 13 | `autoplayDisableOnInteraction: true` | `autoplay.disableOnInteraction: true` |
| 14 | `autoplayReverseDirection: true` | `autoplay.reverseDirection: true` |
| 15 | `hasNavigation: true` | `navigation: { nextEl, prevEl }` |
| 16 | `paginationType: 'bullets'` | `pagination: { type:'bullets', el, dynamicBullets:false }` |
| 17 | `paginationType: 'dynamicBullets'` | `pagination: { type:'bullets', el, dynamicBullets:true }`（type は `bullets` に変換） |
| 18 | `paginationType: 'progressbar'` | `pagination: { type:'progressbar', ... }` |
| 19 | `paginationType: 'fraction'` | `pagination: { type:'fraction', ... }` |
| 20 | `slides: { slidesPerView: 2 }` | `slidesPerView: 2, slidesPerGroup: 1` |
| 21 | `slides: { slidesPerView: 'auto' }` | `slidesPerView: 'auto'` |
| 22 | `slides: { slidesPerView: 2, slidesPerGroup: 2 }` | `slidesPerGroup: 2` |
| 23 | `slides: { slidesPerView: 2, spaceBetween: '16px' }` | `spaceBetween: '16px'` |
| 24 | `slides: { slidesPerView: 2, centeredSlides: true }` | `centeredSlides: true` |
| 25 | `responsiveSlides: { mobile: { slidesPerView: 1 } }` | base に `slidesPerView: 1`、`breakpointsOptions` には何も追加されない |
| 26 | `responsiveSlides: { mobile, tablet }` | `breakpoints[640]` に tablet の値（B001 修正後） |
| 27 | `responsiveSlides: { mobile, tablet, desktop }` | `breakpoints[640]` / `breakpoints[1024]` のネスト構造、各デバイス値が Swiper 仕様のキー名で出力（B002 / B003 修正後） |
| 28 | `effect: 'fade'` + `slides: {...}` | `slidesPerView` は出力されない（`hasSlidesOption('fade')` false） |

### その他のヘルパー関数

| # | テスト対象 | 検証内容 |
|---|---|---|
| 29 | `getSliderBlockClasses()` | 戻り値が `'ystdtb-slider'` の単一クラス |
| 30 | `getSliderWrapClasses({ ratio: '16-9' })` | `'ystdtb-slider__slider swiper is-fixed-height'` |
| 31 | `getSliderWrapClasses({})` | `'ystdtb-slider__slider swiper'`（is-fixed-height なし） |
| 32-40 | `getSliderWrapStyles({ ratio: 'X-Y' })` 全 9 種 | `aspectRatio: 'X / Y'`（1-1〜9-16 を網羅） |
| 41 | `getSliderWrapStyles({ height: '600px' })` | `height: '600px'` |
| 42 | `getSliderWrapStyles({ responsiveHeight: { desktop, tablet, mobile } })` | 3 つの `--ystdtb--{device}--slider--height` カスタムプロパティ |
| 43 | `getSliderContainerStyles({ slideFunction: 'ease-in-out' })` | `transitionTimingFunction: 'ease-in-out'` |
| 44 | `getNavigationClasses('prev', { navigationColor: 'ys-red' })` | `'swiper-button-prev has-text-color has-ys-red-color'` |
| 45 | `getNavigationClasses('next', { customNavigationColor: '#ff6600' })` | `'swiper-button-next has-text-color'`（プリセット色クラスなし） |
| 46 | `getNavigationStyles({ customNavigationColor: '#ff6600' })` | `color: '#ff6600'` |
| 47 | `getPaginationClasses()` | `'swiper-pagination'` |
| 48 | `getPaginationStyles({ paginationColor: '#ff00aa' })` | `color: '#ff00aa', '--swiper-pagination-color': '#ff00aa'` |
| 49 | `hasSlidesOption('slide')` | `true` |
| 50 | `hasSlidesOption('fade')` | `false` |
| 51 | `hasSlidesOption('coverflow')` | `true` |
| 52 | `hasSlidesOption('cube')` | `false` |
| 53 | `hasSlidesOption(undefined)` | `true`（`?? 'slide'` で fallback） |

合計 **約 53 テストケース**。

---

## L1 fixture テストパターン（属性 + save HTML 往復保持）

`save()` が出力する HTML の構造（class / style / `data-slider-options` 文字列）を含めた完全な往復検証。

fixture は `test/integration/fixtures/blocks/slider/` 配下に配置（既存の deprecated fixture とは別ファイル）。

### 命名規則

`ystdtb__slider__{パネル}__{設定}__{バリアント}.html`

### fixture リスト（合計 44 件）

#### 設定の組み合わせ例（5 件）

| fixture | attributes |
|---|---|
| `combo__basic` | デフォルト |
| `combo__hero` | `height:'500px', hasNavigation:true, paginationType:'bullets', align:'full'` |
| `combo__cards` | `responsiveSlides:{mobile,tablet,desktop}` |
| `combo__fade` | `effect:'fade', autoplayDelay:5` |
| `combo__ratio-nav` | `ratio:'16-9', hasNavigation:true, customNavigationColor:'#ff6600'` |

#### 子ブロックの種類（3 件）

| fixture | 内容 |
|---|---|
| `variant__cover` | `core/cover` × 2 |
| `variant__video` | `core/video` × 2 |
| `variant__slider-item-with-box` | `ystdtb/slider-item` × 2（中に `ystdtb/box`） |

#### 基本設定（6 件）

| fixture | attributes |
|---|---|
| `basic__effect__coverflow` | `effect:'coverflow'` |
| `basic__effect__cube` | `effect:'cube'` |
| `basic__speed__1s` | `speed:1` |
| `basic__speed__5s` | `speed:5` |
| `basic__loop__off` | `loop:false` |
| `basic__slide-function__ease-in-out` | `slideFunction:'ease-in-out'` |

#### 自動再生（5 件）

| fixture | attributes |
|---|---|
| `autoplay__off` | `autoplay:false` |
| `autoplay__delay__15s` | `autoplayDelay:15` |
| `autoplay__pause-on-mouse__on` | `autoplayPauseOnMouse:true` |
| `autoplay__disable-on-interaction__off` | `autoplayDisableOnInteraction:false` |
| `autoplay__reverse-direction__on` | `autoplayReverseDirection:true` |

#### サイズ（11 件）

| fixture | attributes |
|---|---|
| `size__ratio__1-1` 〜 `size__ratio__9-16` | `ratio:'X-Y'`（7 種：1-1 / 2-1 / 3-1 / 3-2 / 4-3 / 2-3 / 9-16） |
| `size__height__single` | `height:'600px'` |
| `size__height__responsive-desktop` | `responsiveHeight:{desktop:'500px'}` |
| `size__height__responsive-desktop-tablet` | `responsiveHeight:{desktop:'500px', tablet:'400px'}` |
| `size__height__responsive-all` | `responsiveHeight:{desktop, tablet, mobile}` |

#### スライド表示数（7 件）

| fixture | attributes |
|---|---|
| `slide__slides-per-view__2` | `slides:{slidesPerView:2}` |
| `slide__slides-per-view__auto` | `slides:{slidesPerView:'auto'}` |
| `slide__slides-per-group__2` | `slides:{slidesPerView:2, slidesPerGroup:2}` |
| `slide__space-between` | `slides:{slidesPerView:2, spaceBetween:'16px'}` |
| `slide__centered-slides` | `slides:{slidesPerView:2, centeredSlides:true}` |
| `slide__responsive__mobile-only` | `responsiveSlides:{mobile:{slidesPerView:1}}` |
| `slide__responsive__mobile-tablet` | `responsiveSlides:{mobile, tablet}` |

#### ナビゲーション（2 件）

| fixture | attributes |
|---|---|
| `navigation__color__preset` | `hasNavigation:true, navigationColor:'ys-red'` |
| `navigation__color__custom-hex` | `hasNavigation:true, customNavigationColor:'#0099ff'` |

#### ページネーション（4 件）

| fixture | attributes |
|---|---|
| `pagination__type__dynamic-bullets` | `paginationType:'dynamicBullets'` |
| `pagination__type__progressbar` | `paginationType:'progressbar'` |
| `pagination__type__fraction` | `paginationType:'fraction'` |
| `pagination__color__custom` | `paginationType:'bullets', paginationColor:'#ff00aa'` |

#### 配置（1 件）

| fixture | attributes |
|---|---|
| `align__wide` | `align:'wide'` |

---

## L2 Playwright UI テストパターン（絞り込み）

L1 fixture / L0 Jest unit でカバーできない UI 経由の挙動のみを Playwright MCP で検証する。

### ラベル-値対応（全選択肢網羅）

| 対象 | 確認内容 |
|---|---|
| エフェクト（RadioControl） | `slide` / `fade` / `coverflow` / `cube` の 4 値とラベル対応 |
| 縦横比（CustomSelectControl） | 全 9 種（指定なし / 1-1 / 2-1 / 3-1 / 3-2 / 4-3 / 16-9 / 2-3 / 9-16） |
| ページネーションタイプ（RadioControl） | `''`（なし）/ `bullets` / `dynamicBullets` / `progressbar` / `fraction` の 5 値 |
| ナビゲーション色（ColorPalette） | プリセット選択時 `navigationColor` に slug 保存、カスタム入力時 `customNavigationColor` に hex 保存 |
| ページネーション色（ColorPalette） | hex 値が `paginationColor` に保存される |
| 1 画面表示数（NumberControl + auto ボタン） | 数値入力 / `auto` ボタン切替 / 警告 Notice 表示 |

### 条件付き表示・カスケード

| 条件 | 確認内容 |
|---|---|
| `effect` を `fade` または `cube` に切替 | 「スライド表示数」パネル全体が非表示（`Slide` コンポーネントが早期 return） |
| `effect` を `slide` または `coverflow` に戻す | 「スライド表示数」パネル再表示 |
| `ratio` を選択 | 「高さ」UI が非表示（`Height` コンポーネントの早期 return） |
| `ratio` を「指定なし」に戻す | 「高さ」UI 再表示 |
| `ratio` を選択した瞬間 | `height` / `responsiveHeight` 属性がクリアされる |
| `responsiveSlides` を設定 | `slides` 属性がクリアされる（DefaultTab → ResponsiveTab 切替） |
| `slides` を設定 | `responsiveSlides` 属性がクリアされる（ResponsiveTab → DefaultTab 切替） |
| `slidesPerView: 'auto'` を選択 | NoticeWarning「auto は上級者向け設定」表示 |
| `hasNavigation` を OFF | 「ナビゲーション色」UI は残る（属性は保持される） |
| `paginationType` を「なし」 | 「ページネーション色」UI は残る |

### 操作順序（切替・useEffect）

| 対象 | 確認内容 |
|---|---|
| ブロック新規挿入 | `sliderId` が `useEffect` で自動生成される（空文字列にはならない） |
| `previewType` 切替 | エディター内のスライダー表示プレビュー（`is-preview--grid` / `is-preview--horizontal` クラス） |

### 永続化検証

| 対象 | 確認内容 |
|---|---|
| 全 23 属性の組み合わせ設定 → 保存 → 再読込 | attributes が完全に保持される、コンソールエラー無し |
| 全 23 属性 → serialize → parse | 往復で attributes が一致 |
| `align: 'full'` / `'wide'` 切替 | wrapper に `alignfull` / `alignwide` クラスが反映される |

### 子ブロック制限

| 対象 | 確認内容 |
|---|---|
| `+` ボタンから挿入できるブロック | `core/image` / `core/cover` / `core/video` / `ystdtb/slider-item` の 4 種類のみ |
| 上記以外のブロックを挿入しようとする | UI で挿入候補に出てこない |

---

## L3 手動確認チェックリスト

2026-05-01 にユーザー手動確認で完了。フロント Swiper 実動作、レスポンシブ高さ、レスポンシブスライド数、yStandard v4 / 非 yStandard テーマでの breakpoint 挙動を確認済み。

### フロント Swiper 動作（examples/all-variations.html ベース）

- [x] 「設定の組み合わせ例」5 パターン（基本 / ヒーロー / 商品カード / フェード / 16:9 アスペクト比）が想定通り動作
- [x] 「子ブロックの種類」3 パターン（cover / video / slider-item+box）が想定通り表示
- [x] 「基本設定」: エフェクト 4 種（slide / fade / coverflow / cube）の動作、スピード変化、ループ OFF、イージング関数
- [x] 「自動再生」: 自動再生 OFF / 表示時間 15 秒 / マウスホバー停止 / 操作後再開 OFF / 逆方向
- [x] 「サイズ」: アスペクト比 7 種、高さ単一値、高さレスポンシブ（3 デバイス）
- [x] 「スライド表示数」: 全デバイス共通 5 種、デバイス別 2 種
- [x] 「ナビゲーション」: プリセット色（ys-red）、カスタム HEX 色
- [x] 「ページネーション」: ダイナミック / プログレスバー / fraction、カスタム色
- [x] 「配置」: 幅広（alignwide）

### Swiper 機能の実動作

- [x] 自動再生がフロントで動く（エディター内では Swiper は走らない）
- [x] ナビゲーション矢印クリックで前後スライド
- [x] ページネーションクリックでスライド遷移（bullets）
- [x] ループ ON 時に最終スライドから最初に戻る
- [x] エフェクト fade で重なるアニメーション
- [x] エフェクト coverflow で 3D 風アニメーション
- [x] エフェクト cube でキューブ回転アニメーション

### レスポンシブ・テーマ互換

- [x] レスポンシブ高さ（desktop / tablet / mobile）が CSS メディアクエリで切り替わる
- [x] `responsiveSlides` が動作する（B001 / B002 / B003 修正後の Swiper breakpoints ネスト構造で動作することを実機確認）
- [x] `align: 'full'` で yStandard テーマの全幅表示が padding 0 で正しく描画される
- [x] エディター内表示と、フロント表示で崩れがない

### 子ブロックの構造

- [x] スライダー内に画像ブロック（`core/image`）を入れた場合の表示
- [x] スライダー内にカバーブロック（`core/cover`）を入れた場合の表示
- [x] スライダー内に動画ブロック（`core/video`）を入れた場合の表示
- [x] スライダー内にスライダーアイテム（`ystdtb/slider-item`）を入れて、その中に他のブロック（BOX 等）を入れた場合の表示

### コンソールエラー

- [x] 操作中・属性更新中ともに `console.error` / 例外発生なし
- [x] フロントで Swiper の初期化エラーなし
