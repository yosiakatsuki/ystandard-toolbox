# v2 ブロック全体テスト

v2 リリースロードマップ フェーズ3.2「yStandard テーマでの全体テスト」のうち、`src/blocks/block-library/` 配下の全ブロックを対象とした編集・保存・フロント表示確認の進捗管理。

三層テスト戦略（L1 fixture / L2 UI / L3 手動）で進める。

## このドキュメントの読み方

新規セッションで作業を再開するときは以下の順で進める:

1. 「全体進捗サマリー」で全ブロックの状態を一目で把握
2. 対象ブロックの「ブロック別詳細」セクションを読み、「次にやること」を確認
3. 実ファイル（examples / spec.md / fixture ディレクトリ）で最終状態を検証
4. 作業を開始

進捗ドキュメントは古くなる可能性があるため、**作業前に必ず実ファイルを確認する**こと。

## 参照ドキュメント（必読）

- [block-operation-test-guideline.md](block-operation-test-guideline.md) — 三層テスト戦略 L1/L2/L3 の詳細運用ルール
- [testing.md](testing.md) — L1 fixture 作成手順・トラブルシューティング
- [block-examples-guideline.md](block-examples-guideline.md) — examples HTML の書き方

## 作業の流れ（ブロック単位）

各ブロックについて以下の順に実施する。

1. **examples HTML 作成**: `src/blocks/block-library/[ブロック名]/examples/all-variations.html` を執筆（見出しツリー設計を兼ねる）
2. **spec.md 作成**: `src/blocks/block-library/[ブロック名]/test-results/spec.md` に三層対応の操作テスト仕様を作成
3. **L1 fixture 作成**: `test/integration/fixtures/blocks/` 配下に spec.md の L1 リストに対応する fixture を作成し、`npm run test:integration` で全通過を確認
4. **L2 Playwright UI テスト**: Playwright MCP で spec.md の L2 絞り込み項目を実 UI 確認（結果は `test-results/operation.md` に記録、Git 管理外）
5. **L3 手動確認（フロント）**: フロントエンドで全パターンの表示を目視確認

## 全体進捗サマリー

| ブロック | examples | spec.md | L1 fixture | L2 UI | L3 フロント |
|---|:-:|:-:|:-:|:-:|:-:|
| [banner-link](#banner-link) | ✅ | ✅ | ✅ 76件 | ✅ | ✅ |
| [block-hook-hidden-by-size](#block-hook-hidden-by-size) | ✅ | ✅ | — 対象外 | ✅ | ✅ |
| [box](#box) | ✅ | ✅ | ✅ 48件 | ✅ | ✅ |
| [description-list](#description-list--dd-box--dd-simple--dl-column--dt) | ✅ | ✅ | ✅ 93件 | ✅ | ✅ |
| [faq](#faq--faq-item) | ✅ | ✅ | ✅ 42件 | ✅ | ✅ |
| [icon-list](#icon-list--icon-list-item) | ✅ | ✅ | ✅ 28件 | ✅ | ✅ |
| [parts](#parts) | — 対象外 | — 対象外 | — 対象外 | — 対象外 | ✅ |
| [posts](#posts) | ✅ | ✅ | ✅ 29件 | ✅ | ✅ |
| [slider](#slider--slider-item) | ✅ | ✅ | ✅ 44件 | ✅ | ✅ |
| [sns-share](#sns-share) | ✅ | ✅ | ✅ 23件 | ✅ | ✅ |
| [timeline](#timeline--timeline-item) | ✅ | ✅ | ✅ 38件 | ❌ | ❌ |

凡例: ✅ 完了 / 🔄 進行中 / ⚠️ 要対応 / ❌ 未着手

**備考**: `description-list` / `faq` / `slider` / `timeline` には `__deprecated-*` の fixture が既に存在するが、これは deprecated マイグレーションテスト用で L1 操作テストには該当しない（スコープ外）。

## ブロック別詳細

フォルダ名昇順で 1 ブロックずつ対応する。

### banner-link

- [x] examples HTML 作成（グラデーション例削除・レスポンシブ 3 デバイス化などの手動テストフィードバック反映済み）
- [x] spec.md 作成（三層 L1/L2/L3 対応）
- [x] L1 fixture 作成（76 件、`npm run test:integration` 全 113 件パス）
- [x] L2 UI テスト完了（複数セッションで実施、結果は `test-results/operation.md` に集約。Git 管理外）
- [x] L3 フロント確認（ユーザー手動確認にて完了）

**スコープ外（UI 未対応のため fixture 保留）**:
- `border-radius__4corners` — `borderRadius` 属性は単一 string 値のみで 4 隅個別指定 UI 未対応
- `combo__campaign` — グラデーション UI 未実装（examples のキャンペーン例は単色に書き換え済）

**手動テストで判明した実装修正**:
- メインテキスト/サブテキストの HTMLタグ UI を v1 挙動に合わせ、「-- 選択してください --」を非表示化、初期値を `div` に統一（`block.json` default + `useEmptyValue={ false }`）
- HTMLタグを一度選択後に空値へ戻した際の `InvalidCharacterError` に対する多層防御ガードを追加

### block-hook-hidden-by-size

段落ブロック・Box ブロックに設定を適用。各デバイスでの表示確認テキストを含める。
確認パターン: モバイルのみ / タブレットのみ / デスクトップのみ / モバイル+タブレット / タブレット+デスクトップ / モバイル+デスクトップ の 6 パターン。
「設定の組み合わせ例」セクションは省略。

- [x] examples HTML 作成（6 パターン × 段落/Box = 12 ブロックペア）
- [x] spec.md 作成（L1 は対象外、L2 / L3 手動テスト中心に改訂済）
- [—] L1 fixture — **対象外**。本ブロックはフィルタ経由で attribute を追加する拡張のため、test 環境で正しく parse するには `index.tsx` の分割が必要。実装修正コストが見合わないため L1 は実施しない。既存 fixture 12 件は削除済み
- [x] L2 UI テスト完了（`test-results/operation.md` に記録。Git 管理外）
- [x] L3 フロント確認完了（ユーザー手動確認にて OK）

### box

- [x] examples HTML 作成（25 ボックス + 4 コンボ例 + 余白プリセット例 + label-line + レスポンシブ余白例）
- [x] spec.md 作成（三層 L1/L2/L3 対応。BOX角丸・ラベル角丸の適用ルール表を実装準拠に更新済み）
- [x] L1 fixture 作成（48 件、`npm run test:integration` box 分全通過）
- [x] L2 UI テスト完了（spec.md 記述の不一致 1 件を発見 → 実装準拠に修正。`test-results/operation.md` に記録）
- [x] L3 フロント確認（ユーザー手動確認にて完了）

**今日の box 改修で対応した実装修正**:

- CSS カスタムプロパティのメディアクエリ処理を SCSS `@include` から PHP 側（`Styles::add_media_query_*` + `Text::minify`）へ統一。従来 768〜1023px でタブレット余白設定が効いていなかった不具合を修正
- 余白プリセット（`var:preset|spacing|*`）の save 時展開対応（`presetTokenToCssVar`）
- 線上ラベル（label-line）+ 余白レスポンシブの上側余白・ラベル横位置の反映不具合修正（PHP 側で label-line 用の responsive override を追加）
- エディタ表示: ラベル文字サイズ／アイコンサイズが反映されない不具合修正、ラベル太さボタンの角丸修正
- CSS 詳細度を `:where()` で (0,0,1,0) に統一
- SCSS 変数をグローバル CSS カスタムプロパティへ移行

**次のターン以降**: description-list（+ dd-box / dd-simple / dl-column / dt）

### description-list（+ dd-box / dd-simple / dl-column / dt）

親ブロック側に 1 ファイルで集約。子ブロックの設定も含めて網羅。

- [x] examples HTML 作成（「FAQ 風」例削除・親 dl の margin を上下限定仕様に合わせて修正済み）
- [x] spec.md 作成（三層 L1/L2/L3 対応、約 95 件 → 修正後 90 件）
- [x] L1 fixture 作成（93 件、`npm run test:integration` 全 277 件パス）
- [x] L2 UI テスト完了（全 6 サブセクション OK、`test-results/operation.md` に記録。Git 管理外）
- [x] L3 フロント確認（ユーザー手動確認にて完了）

**L2 で発見した注意点（P-001）**: backgroundColor と gradient は UI 片方向排他のみ。gradient → bg で bg クリア、bg 設定中に gradient を追加するルートでは gradient 残存。詳細は operation.md 参照

### faq（+ faq-item）

親ブロック側に 1 ファイルで集約。

- [x] examples HTML 作成（設定の組み合わせ例 5 + 設定一覧 全網羅 + デザインプリセット 6 種）
- [x] spec.md 作成（三層 L1/L2/L3 対応、fixture 数約 42 件）
- [x] L1 fixture 作成（42 件、`npm run test:integration` 全 319 件パス）
- [x] L2 UI テスト完了（3 セッション：親 FAQ / 子 faq-item / 修正後再検証。`test-results/operation.md` に記録。Git 管理外）
- [x] L3 フロント確認完了（ユーザー手動確認にて完了）

**L2 で発見した問題と対応**:
- **P001**: `LabelSize` / `LabelWeight` の BaseControl label が「FAQラベル表示位置」で重複 → 「FAQラベル文字サイズ」「FAQラベルを太字にする」に修正
- **P002**: デザインプリセット適用時、色 hex 値が slug 側 attribute（`labelColor` 等）に入っていた → `customLabelColor` 等の custom 側 attribute へ移動
- **P003**: デザインプリセット適用時、サイズ系が number 型（`1`, `50` 等）で保存 → string 型（`'0'`, `'1px'`, `'50px'` 等）に統一。`0` は単位なし `'0'` で保存
- **P004**: プリセットの `accordionArrowColor` が親 FAQ に同期されない → Q/A で個別にデザイン選択できる仕様として割り切り、子のみ `customAccordionArrowColor` を設定

**L3 で発見した問題と対応**:
- examples HTML のプリセット系 5 箇所で item div に `style="border-width:0"` が残存 → 実装修正（下区切り線 bottom 限定化）で item div には style が出ない仕様に変わったため削除

**付随する共通実装の追加**:
- `src/aktk-block-components/utils/size/` に `normalizeSizeValue` と `hasBorderWidth` を追加（ユニットテスト 35 ケース）
  - `normalizeSizeValue`: UnitControl 入力を正規化（`'0px'` / `'0em'` 等のゼロ値を単位なし `'0'` に統一）
  - `hasBorderWidth`: border として描画される太さかを判定（ゼロ値 / 空値を false、その他 true）
- `faq-item/utils.ts` で `hasBorderWidth` を使い、サイズ 0 時に `has-padding` / `has-border` / `has-{slug}-border-color` を付けないよう変更
- `label-border-radius` / `label-border` / `contents-border` の UnitControl onChange で `normalizeSizeValue` を使用

**faq-item の下区切り線実装を bottom 限定化**:
- `getItemStyles`: `borderColor` / `borderWidth`（4 辺）→ `borderBottomColor` / `borderBottomWidth`（下辺のみ）に変更
- `style.scss`: `.has-border-bottom` に `border-bottom-style: solid` を追加（`border: 0` 初期値の上書き用）

### icon-list（+ icon-list-item）

親ブロック側に 1 ファイルで集約。

- [x] examples HTML 作成（設定の組み合わせ例 5 個 + 設定一覧：アイコン設定／タイポグラフィ／色／枠線／余白／子アイテム個別設定）
- [x] spec.md 作成（三層 L1/L2/L3 対応、fixture 約 26 件）
- [x] L1 fixture 作成（28 件、`npm run test:integration` 全 347 件パス）
- [x] L2 UI テスト完了（2 セッション：親 / 子。`test-results/operation.md` に記録。Git 管理外）
- [x] L3 フロント確認完了（ユーザー手動確認にて完了）

**L2 で発見した問題と対応**:
- **P001（修正済み）**: 親「リストアイコン」ボタングリッドに `aria-label` / `title` が無く、同名ラベル「右矢印」が 2 つ存在 → aktk Button ラッパーに `label` プロパティ追加 + `<Button label={ option.label }>` 渡し + 同名ラベルを「右矢印（>）」「右矢印（→）」「右二重矢印（>>）」で区別

### parts

属性は `partsId: string` 1 個のみ・dynamic block（`save()` は `null`、`render_callback` 経由でショートコード `[ys_parts]` に委譲）の極小ブロック。検証対象が「[ys]パーツ投稿の選択 → ServerSideRender プレビュー → フロント表示」に集約されるため、**L1 fixture / L2 UI / examples HTML / spec.md は対象外**として L3 手動テストのみで完了とする。

- [—] examples HTML — 対象外（バリエーションが極めて限定的）
- [—] spec.md — 対象外
- [—] L1 fixture — 対象外
- [—] L2 UI テスト — 対象外
- [x] L3 フロント確認完了（ユーザー手動確認にて OK）

### posts

dynamic block（`save() = null`、`render_callback` 経由）。PHP ロジックが多いため、三層（L1/L2/L3）に加えて **L0: PHPUnit テスト**をオプトイン追加した（[testing.md の PHPUnit セクション](testing.md#phpunit-テストオプトイン) 参照）。

- [x] examples HTML 作成（既存 695 行 → 685 行に再構成: 「設定の組み合わせ例」を冒頭移動・「フル設定」削除）
- [x] spec.md 作成（四層 L0/L1/L2/L3 対応）
- [x] **L0 PHPUnit テスト作成（`phpunit/blocks/test-posts.php`、40 テスト / 54 アサーション全パス）**
- [x] L1 fixture 作成（29 件、`npm run test:integration` 全 376 件パス。dynamic block のため serialize 出力はブロックコメントのみ）
- [x] L2 UI テスト完了（4 大カテゴリすべて OK、`test-results/operation.md` に記録。Git 管理外）
- [x] L3 フロント確認完了（ユーザー手動確認にて OK）

**手動テストで判明・対応した実装修正**:
- アイキャッチ未設定時の画像 `object-fit: cover` がエディターで効かない問題 → ユーザー手動修正（詳細は実装側コミット参照）
- シンプルレイアウト時の日付文字色をテキストカラーに → ユーザー手動修正
- **`excerptLines: 1/4` 指定時に `style="1"` のような壊れた CSS が出力されるバグ修正**（`index.php:283-285`）: `array_filter` + `implode` で配列キーが捨てられて値だけ連結されていた → CSS カスタムプロパティ `--ystdtb--posts--excerpt-line-clamp:N` を直接組み立てる方式に変更
- **`.wp-env.json` から `testsEnvironment: false` を削除**（wp-env 現行バージョンで未定義オプションのため `wp-env start` が失敗していた）
- **PHPUnit テスト導入**: 上記 excerpt バグの再発防止 + 26 属性の組み合わせ網羅検証のため、ブロック単位でオプトイン PHPUnit テストを導入する方針を策定。`docs/testing.md` / `docs/block-operation-test-guideline.md` に運用ルール追記

**L2 で発見した問題と判断**:
- **P001（要判断）**: postType 切替時に taxonomy / termSlug が自動クリアされない（古い値が残る）。実害は WP_Query が結果を返さないだけで最小限。**暫定判断: 仕様として運用、L3 でフロント挙動を再確認**
- **spec.md 仕様の再整理**: `showImg: false` は SelectControl 表示状態を変えない（ToggleControl のみ OFF）→ spec.md を実装準拠に微修正済


### slider（+ slider-item）

親ブロック側に 1 ファイルで集約。

- [x] examples HTML 作成（設定の組み合わせ例・子ブロック種類・全設定パネルを網羅）
- [x] spec.md 作成（四層 L0/L1/L2/L3 対応）
- [x] **L0 Jest unit テスト作成**（`utils.test.ts` / `view-utils.test.ts`、Swiper options・runtime breakpoint 正規化を検証）
- [x] L1 fixture 作成（44 件、deprecated fixture とは別枠）
- [x] L2 Playwright UI テスト完了（1 セッション 44 件すべて OK、`test-results/operation.md` に記録。Git 管理外）
- [x] L3 フロント確認完了（ユーザー手動確認にて OK）

**L3 で確認した内容と対応**:
- Swiper 実動作（自動再生・ナビゲーション・ページネーション・各エフェクト）を確認
- レスポンシブ高さ・レスポンシブスライド数の切り替えを確認
- yStandard v4 / 非 yStandard テーマでの breakpoint 挙動を確認
- `data-slider-options` の保存値は変更せず、フロント初期化前の runtime option で breakpoint 補正・`resizeObserver: false` を適用
- yStandard v4 向け breakpoint 互換処理は `inc/compat/class-compat.php` に集約

### sns-share

- [x] examples HTML 作成
- [x] spec.md 作成（三層 L1/L2/L3 対応）
- [x] L1 fixture 作成（23 件、`npm run test:integration` 全通過）
- [x] L2 UI テスト完了（24 項目すべて OK、`test-results/operation.md` に記録。Git 管理外）
- [x] L3 フロント確認完了（ユーザー手動確認にて OK）

### timeline（+ timeline-item）

親ブロック側に 1 ファイルで集約。

- [x] examples HTML 作成（実装齟齬「`labelWeight` → `labelBold`」修正を含む。実機エディタで正規化済み）
- [x] spec.md 作成（三層 L1/L2/L3 対応、L1 fixture 38 件）
- [x] L1 fixture 作成（38 件、`npm run test:integration` 全 459 件パス）
- [ ] L2 Playwright UI テスト
- [ ] L3 フロント確認

**実装修正（examples 作成中に発見）**:
- `labelWeight` → `labelBold` 属性名のずれ（`block.json` のみ古い `labelWeight: string` のまま、UI / utils / v1 deprecated migrate はすべて `labelBold: boolean` 想定）→ `block.json` を `labelBold: { type: "boolean" }` に修正、`types.ts` から未使用の `labelWeight` を削除、deprecated fixture 3 件（`deprecated-no-label` / `deprecated-contents-border-color` / `deprecated-contents-inner-margin`）に `"labelBold": false` を追加

**L1 fixture 作成中の発見**:
- `setup-tests.js` で `window.ystdtbIconList` モックが `star` のみ。`star` を含む fixture（`label-icon__star` / `label-font__preset` / `label-font__custom` / `child__mixed-label` / `combo__event`）は SVG 込みで HTML を書く必要あり（モックされていないアイコンは空タグで OK）
- `labelBorderRadius: "0"` のような明示的「ゼロ値」は `labelBorderRadius ? labelBorderRadius : undefined` で truthy 扱いとなり `style="border-radius:0"` が出力される（fixture HTML にも反映が必要）

**次にやること**: L2 Playwright UI テスト
