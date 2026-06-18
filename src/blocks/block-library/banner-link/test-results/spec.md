# バナーリンクブロック 操作テスト仕様

エディター上の UI 操作・fixture による HTML 往復検証・手動確認の三層で動作を検証する仕様書。

## テスト方針

- **L1 (fixture-based integration test)**: 属性 → HTML 出力・parse/serialize 往復を全パターン網羅で自動検証（CI 毎回）
- **L2 (Playwright UI 自動テスト)**: 排他関係・条件付き表示・ラベル-値対応・複雑 UI・操作順序・RichText 挙動のスポット検証
- **L3 (手動確認)**: フロント見た目・レスポンシブ挙動の目視確認

運用ルールは [docs/block-operation-test-guideline.md](../../../../../docs/block-operation-test-guideline.md) を参照。

## テスト対象の設定一覧

### サイドバーパネル（7 パネル）

| パネル | 主な設定項目 |
|---|---|
| リンク | リンク先URL / 新しいタブで開く / rel 属性 / リセット |
| バナー設定 | 画像設定（画像・焦点） / 背景（色・グラデーション） / 不透明度 / 縦横比 / 最大幅 / 最小高さ / 角丸 |
| 枠線設定 | 枠線（太さ・スタイル・色） |
| メインテキスト | フォントサイズ / 文字色 / 行の高さ / 文字間隔 / HTMLタグ / 見出しスタイル削除 |
| サブテキスト | フォントサイズ / 文字色 / 行の高さ / 文字間隔 / HTMLタグ / 見出しスタイル削除 / メインテキストとの間隔 |
| 余白 | 内側余白 |
| 影 | ボックスシャドウ |

### ツールバー

- リンクボタン（ツールバーからのリンク設定）
- ブロック位置（最大幅設定時のみ表示）
- コンテンツ位置（水平・垂直）

## 排他関係・条件付き表示

| 条件 | 影響 |
|---|---|
| `ratio` 設定あり | `minHeight`（最小高さ）非表示 |
| `mainTextHtml` が見出しタグ（h1〜h6） | 「見出しスタイル削除」トグル表示 |
| `subTextHtml` が見出しタグ（h1〜h6） | 「見出しスタイル削除」トグル表示 |
| `size.maxWidth` 設定あり | ツールバーに「ブロックの位置」表示 |
| `backgroundImage` 設定あり | 画像設定パネル内に「焦点」タブ表示 |
| 画像クリア | 焦点（`backgroundImageFocalPoint`）も同時にクリア |
| 焦点を `{x:0.5, y:0.5}` に戻す | `backgroundImageFocalPoint` が undefined に（edit.tsx `handleFocalPointOnChange` の仕様） |
| 新しいタブで開く ON | `rel` に `noreferrer noopener` が自動設定 |
| 見出しタグ → 非見出しタグに戻す | `mainTextStyleClear` が自動で undefined に |

## RichText ツールバー制御

| 対象 | 制御 | 期待動作 |
|---|---|---|
| `mainText` | `withoutInteractiveFormatting` 指定あり | ツールバーにインラインリンク挿入ボタンが非表示 |
| `subText` | `withoutInteractiveFormatting` 指定あり | ツールバーにインラインリンク挿入ボタンが非表示 |

基本フォーマット（太字・斜体・下線・取り消し線・インラインコード など）は許可。

## デバイス別テスト対象

レスポンシブ対応している設定:
- `size.maxWidth`
- `size.minHeight`
- `mainTextFontSize`
- `subTextFontSize`
- `subTextMargin`
- `padding`

各対象について以下のパターン:
- desktop のみ
- desktop + mobile（2 デバイス混在）
- desktop + tablet + mobile（全 3 デバイス別値）

---

## L1 fixture テストパターン（全パターン網羅）

L1 fixture は `test/integration/fixtures/blocks/` 配下に配置。各 fixture は 1 設定を代表する HTML スナップショット。

### リンクパネル

- [x] `ystdtb__banner-link__link__url-internal` — サイト内 `/sample-page/`
- [x] `ystdtb__banner-link__link__url-external` — `https://example.com/`
- [x] `ystdtb__banner-link__link__url-relative` — `../page/`
- [x] `ystdtb__banner-link__link__new-tab-on` — `linkTarget=_blank` + `rel="noreferrer noopener"`
- [x] `ystdtb__banner-link__link__rel-nofollow` — `rel="nofollow"`（new tab は OFF）

### バナー設定 > 画像

- [x] `ystdtb__banner-link__image__with-image` — 画像あり・焦点なし
- [x] `ystdtb__banner-link__image__with-focal-top-left` — 焦点 `{x:0, y:0}`
- [x] `ystdtb__banner-link__image__with-focal-bottom-right` — 焦点 `{x:1, y:1}`
- [x] `ystdtb__banner-link__image__with-focal-custom` — 焦点 `{x:0.3, y:0.2}`

### バナー設定 > 背景色

- [x] `ystdtb__banner-link__bg-color__preset-blue` — `backgroundColor: "ys-blue"`
- [x] `ystdtb__banner-link__bg-color__preset-red` — `backgroundColor: "ys-red"`
- [x] `ystdtb__banner-link__bg-color__custom-hex` — `customBackgroundColor: "#10b981"`

### バナー設定 > グラデーション

- [x] `ystdtb__banner-link__bg-gradient__custom` — `customGradient: "linear-gradient(...)"`

### バナー設定 > 不透明度

- [x] `ystdtb__banner-link__opacity__05` — `backgroundOpacity: 0.5`
- [x] `ystdtb__banner-link__opacity__0` — `backgroundOpacity: 0`

### バナー設定 > 縦横比（全選択肢網羅）

- [x] `ystdtb__banner-link__ratio__1-1`
- [x] `ystdtb__banner-link__ratio__2-1`
- [x] `ystdtb__banner-link__ratio__3-1`
- [x] `ystdtb__banner-link__ratio__3-2`
- [x] `ystdtb__banner-link__ratio__4-3`
- [x] `ystdtb__banner-link__ratio__16-9`

### バナー設定 > 最大幅（デバイス別網羅）

- [x] `ystdtb__banner-link__max-width__desktop-400px`
- [x] `ystdtb__banner-link__max-width__desktop-100percent`
- [x] `ystdtb__banner-link__max-width__responsive-desktop-mobile`
- [x] `ystdtb__banner-link__max-width__responsive-all-devices`

### バナー設定 > 最小高さ（デバイス別網羅）

- [x] `ystdtb__banner-link__min-height__desktop-200px`
- [x] `ystdtb__banner-link__min-height__responsive-desktop-mobile`
- [x] `ystdtb__banner-link__min-height__responsive-all-devices`

### バナー設定 > 角丸

- [x] `ystdtb__banner-link__border-radius__8px`
- [x] `ystdtb__banner-link__border-radius__50percent` — 正方形比率と組み合わせて丸
- [ ] `ystdtb__banner-link__border-radius__4corners` — 4 隅別指定（**UI 未対応のため保留**）

### 枠線設定（スタイル全選択肢網羅）

- [x] `ystdtb__banner-link__border__solid-2px-custom` — solid + カスタム色
- [x] `ystdtb__banner-link__border__solid-2px-preset` — solid + プリセット色
- [x] `ystdtb__banner-link__border__dotted-2px`
- [x] `ystdtb__banner-link__border__dashed-2px`
- [x] `ystdtb__banner-link__border__double-4px`

### メインテキスト

- [x] `ystdtb__banner-link__main-text__bold` — RichText 内に太字
- [x] `ystdtb__banner-link__main-text__font-size-px-24`
- [x] `ystdtb__banner-link__main-text__font-size-em-1-5`
- [x] `ystdtb__banner-link__main-text__font-size-responsive-desktop-mobile`
- [x] `ystdtb__banner-link__main-text__font-size-responsive-all-devices`
- [x] `ystdtb__banner-link__main-text__color-preset` — プリセット slug
- [x] `ystdtb__banner-link__main-text__color-custom-hex` — hex
- [x] `ystdtb__banner-link__main-text__line-height-1-8`
- [x] `ystdtb__banner-link__main-text__letter-spacing-0-1em`
- [x] `ystdtb__banner-link__main-text__tag-h2-clear-on` — h2 + `mainTextStyleClear: true`
- [x] `ystdtb__banner-link__main-text__tag-h3-clear-off` — h3 + `mainTextStyleClear: false`
- [x] `ystdtb__banner-link__main-text__tag-p`
- [x] `ystdtb__banner-link__main-text__tag-div` — デフォルト

### サブテキスト

- [x] `ystdtb__banner-link__sub-text__bold` — RichText 内に太字
- [x] `ystdtb__banner-link__sub-text__font-size-px-14`
- [x] `ystdtb__banner-link__sub-text__font-size-em-0-875`
- [x] `ystdtb__banner-link__sub-text__font-size-responsive`
- [x] `ystdtb__banner-link__sub-text__color-preset`
- [x] `ystdtb__banner-link__sub-text__color-custom-hex`
- [x] `ystdtb__banner-link__sub-text__line-height-1-6`
- [x] `ystdtb__banner-link__sub-text__letter-spacing-0-05em`
- [x] `ystdtb__banner-link__sub-text__tag-p`
- [x] `ystdtb__banner-link__sub-text__tag-h3-clear-on`
- [x] `ystdtb__banner-link__sub-text__margin-16px`
- [x] `ystdtb__banner-link__sub-text__margin-responsive-desktop-mobile`
- [x] `ystdtb__banner-link__sub-text__margin-responsive-all-devices`

### 余白（ショートハンド網羅）

- [x] `ystdtb__banner-link__padding__shorthand-all-32` — 4 辺同値
- [x] `ystdtb__banner-link__padding__shorthand-4corners` — 4 辺別値
- [x] `ystdtb__banner-link__padding__shorthand-2-pairs` — 上下・左右（2 ペア）
- [x] `ystdtb__banner-link__padding__shorthand-3-pairs` — 上・左右・下（3 分割）
- [x] `ystdtb__banner-link__padding__responsive-desktop-mobile`
- [x] `ystdtb__banner-link__padding__responsive-all-devices`

### 影

- [x] `ystdtb__banner-link__box-shadow__basic` — オフセット・ぼかし・色・透明度あり

### ツールバー設定

- [x] `ystdtb__banner-link__content-position__horizontal-left`
- [x] `ystdtb__banner-link__content-position__horizontal-right`
- [x] `ystdtb__banner-link__content-position__vertical-top`
- [x] `ystdtb__banner-link__content-position__vertical-bottom`
- [x] `ystdtb__banner-link__block-position__center` — maxWidth 設定時
- [x] `ystdtb__banner-link__block-position__right` — maxWidth 設定時

### 代表的な組み合わせパターン（実用シナリオ）

examples HTML の組み合わせ例を流用。

- [x] `ystdtb__banner-link__combo__simple` — シンプル（背景色 + 白テキスト）
- [x] `ystdtb__banner-link__combo__photo-banner` — 背景画像 + オーバーレイ
- [x] `ystdtb__banner-link__combo__card` — カード風（角丸 + 影 + 最大幅 + 中央）
- [ ] `ystdtb__banner-link__combo__campaign` — キャンペーン風（大文字 + 余白広め）

---

## L2 Playwright UI テストパターン（絞り込み）

### 排他関係・カスケード

- [ ] `ratio` 設定 → UI 上で「最小高さ」項目が非表示になる
- [ ] `ratio` 設定 → 内部の `minHeight` 属性がクリアされる（事前に minHeight 設定済みの状態から）
- [ ] `ratio` クリア → 「最小高さ」項目が再表示される
- [ ] `backgroundImage` 設定 → 画像設定パネル内に「焦点」タブが出現
- [ ] 画像クリア → `backgroundImage` と `backgroundImageFocalPoint` が両方 undefined に
- [ ] 焦点を `{x:0.5, y:0.5}` に戻す → `backgroundImageFocalPoint` が undefined に
- [ ] 画像のみ差し替え → `backgroundImageFocalPoint` が保持
- [ ] `mainTextHtml` = h1〜h6 → 「見出しスタイル削除」トグル表示
- [ ] `mainTextHtml` = div/p → 「見出しスタイル削除」トグル非表示
- [ ] 見出しタグ → 非見出しタグに戻す → `mainTextStyleClear` が自動クリア
- [ ] `subTextHtml` でも同様（代表 1 ケース）
- [ ] `size.maxWidth` 設定 → ツールバーに「ブロックの位置」が出現
- [ ] `size.maxWidth` クリア → 「ブロックの位置」が消失
- [ ] 新しいタブ ON → `rel` に `noreferrer noopener` が自動セット
- [ ] 新しいタブ ON → OFF → `rel` が空文字（または undefined）に
- [ ] リンク「リセット」ボタン → URL / linkTarget / rel が全て undefined に

### ラベル-値対応（全選択肢網羅）

ドロップダウン・ラジオ・チップの **全選択肢をクリック** し、それぞれ対応する属性値が保存されることを確認。

- [ ] 縦横比ドロップダウン（6 選択肢: 1-1, 2-1, 3-1, 3-2, 4-3, 16-9）
- [ ] メインテキスト HTMLタグ（8 選択肢: div, h1, h2, h3, h4, h5, h6, p）
- [ ] サブテキスト HTMLタグ（同上、代表 2〜3 ケースで可）
- [ ] 枠線スタイル（4 選択肢: solid, dotted, dashed, double）
- [ ] 背景色プリセット（主要 2〜3 色で代表確認、全色は L1 でカバー）
- [ ] メインテキスト文字色プリセット（同上）
- [ ] コンテンツ位置 水平（3 選択肢: 左・中央・右）
- [ ] コンテンツ位置 垂直（3 選択肢: 上・中央・下）
- [ ] ブロック位置（3 選択肢: 左・中央・右、maxWidth 設定時）

### 条件付き表示

- [ ] `backgroundImage` 設定 → 画像設定パネルに「焦点」タブが出現
- [ ] `ratio` 設定 → 「最小高さ」項目が消える
- [ ] `mainTextHtml` 見出しタグ選択 → 「見出しスタイル削除」トグル出現
- [ ] `size.maxWidth` 設定 → ツールバー「ブロックの位置」出現

### 複雑 UI

- [ ] メディアライブラリから画像を選択（モーダル操作 → 画像クリック → 選択）
- [ ] FocalPointPicker: X/Y 数値入力で焦点設定
- [ ] ColorPalette: プリセット色クリック
- [ ] ColorPalette: カスタム hex 入力
- [ ] リンクパネルのリセットボタン（全クリア）

### 操作順序（切り替え・リセットの整合性）

- [ ] 背景色: プリセット → カスタム → プリセット 切り替え（`backgroundColor` / `customBackgroundColor` が排他的に切り替わる）
- [ ] 新しいタブ ON → OFF → rel 解除
- [ ] ratio 設定 → クリア → 再設定（minHeight との相互作用確認）
- [ ] 画像 → 焦点設定 → 画像差し替え（焦点保持）
- [ ] 見出しタグ → 見出しスタイル削除 OFF → 非見出しに戻す → 再度見出し（`mainTextStyleClear` のリセット挙動）

### RichText フォーマット・ツールバー制御

- [ ] メインテキストに太字（Cmd+B）→ `<strong>` で保存・再読込で維持
- [ ] メインテキストに斜体適用 → 保存・再読込で維持
- [ ] メインテキスト選択時のツールバーに**インラインリンク挿入ボタンが非表示**（`withoutInteractiveFormatting` 動作）
- [ ] サブテキストは実装共通のため代表 1 ケースで OK

---

## L3 手動確認チェックリスト

### フロント見た目（examples/all-variations.html ベース）

- [ ] examples HTML をエディターに貼り付け → 全パターンの見た目を目視確認
- [ ] 代表的な組み合わせ（シンプル / 写真バナー / カード / キャンペーン）の最終見た目
- [ ] 画像あり + 焦点設定時の背景位置
- [ ] 枠線スタイル 4 種（solid / dotted / dashed / double）の実描画

### レスポンシブ挙動（実機ビューポート切替）

- [ ] 最大幅: desktop 400px → mobile 100% の切り替え確認
- [ ] 最小高さ: desktop 300px → mobile 150px の切り替え確認
- [ ] メインテキスト フォントサイズ: desktop 32px → mobile 18px
- [ ] サブテキスト フォントサイズ: 同様
- [ ] 余白: desktop 40px → mobile 16px
- [ ] サブテキスト間隔: desktop 16px → mobile 8px

### 検証エラー・コンソールエラー（最終確認）

- [ ] examples HTML ペースト → 保存 → 再読込 で検証エラーが出ないこと
- [ ] ブラウザコンソールにエラー・警告なし

### テーマとの干渉

- [ ] yStandard テーマで見た目が壊れない
- [ ] 他のブロックと並べた時の整合性

---

## 意地悪パターン（粗探し観点）

共通観点は [docs/block-operation-test-guideline.md](../../../../../docs/block-operation-test-guideline.md#粗探しのプロ観点意地悪パターン) を参照。

バナーリンクブロック固有の観点:

- **排他境界**: `ratio` 設定 → `minHeight` クリア → ratio クリアしても minHeight は戻らないのが仕様
- **画像 focal 境界**: `{x:0, y:0}` は保存されるが save.tsx 側で `background-position` CSS を出さない（CSS デフォルトと一致する最適化）
- **リンクのスキーマ**: URL 形式以外の文字列（`javascript:` 等）は WordPress コア準拠で `wp_kses_bad_protocol` に委任。クライアント側サニタイズなし。テスト対象外

## 補足

- 本仕様は block.json / inspector-controls / examples HTML の構造に基づく
- ブロックの仕様変更時は本仕様も更新する
- L2 / L3 セッション結果は `operation.md`（Git 管理外）に記録
- L1 fixture は `test/integration/fixtures/blocks/` 配下
