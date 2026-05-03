# タイムライン ブロック 操作テスト仕様

タイムライン（timeline）親子ブロック全体のテスト仕様書。

対象ブロック:
- `ystdtb/timeline`（親。属性は持たず、子 timeline-item を一括設定するパネルのみ）
- `ystdtb/timeline-item`（子。ラベルとコンテンツを持つアイテム）

エディター上の UI 操作・fixture による HTML 往復検証・手動確認の三層で動作を検証する。

## テスト方針

- **L1 (fixture-based integration test)**: 属性 → HTML 出力・parse/serialize 往復を全設定パターン網羅で自動検証（CI 毎回）
- **L2 (Playwright UI 自動テスト)**: ラベルタイプ切替時のアイコン/テキスト UI の出し分け、親「一括設定」パネルからの子全員への属性反映、カラーパレット排他をスポット検証
- **L3 (手動確認)**: フロント見た目（ラベル形状・線・SVG アイコン表示）・複数組み合わせの並列表示を目視確認

運用ルールは [docs/block-operation-test-guideline.md](../../../../../docs/block-operation-test-guideline.md) を参照。

## ブロック特性

- **親子構成（2 層）**:
  - 親 `ystdtb/timeline` は子として `ystdtb/timeline-item` のみ許可（`allowedBlocks`）
  - 親のテンプレートは初期 2 個（`[ ['ystdtb/timeline-item'], ['ystdtb/timeline-item'] ]`）、`templateLock` なし（追加・削除・並べ替え自由）
  - 親自体に attribute は無く、Inspector の役割は **子全員の属性一括更新**（`updateChildAttributes` 経由）
- **RichText**: なし。コンテンツは子の InnerBlocks に委譲（テンプレートは段落 1 個）
- **レスポンシブ属性**: なし
- **Context propagation（`providesContext`）**: なし。親は子の最初のアイテムの attribute を `useSelect` で取得して UI 表示し、変更時は `updateBlockAttributes` を子全員に対して実行
- **親「一括設定」と子「個別設定」の関係**:
  - 親 Inspector の「コンテンツ一括設定」「ラベル一括設定」は、UI 操作時に**全子アイテムへ同値を上書き**（差分マージではなく上書き）
  - UI 表示は **最初の子アイテムの値**を反映（`firstChildAttributes`）
  - `LabelText` パネル（テキスト入力欄）は親側には**存在しない**（テキスト内容は個別アイテムでしか設定できない）
- **ラベル種別ごとの UI 出し分け**:
  - `labelType=''`（なし）: アイコン UI / テキスト UI / 太さ UI / フォントサイズ UI / 文字色 UI が**すべて非表示**
  - `labelType='icon'`: `LabelIcon` 表示、`LabelText` 非表示、`LabelWeight` 非表示
  - `labelType='text'`: `LabelText` 表示、`LabelIcon` 非表示、`LabelWeight` 表示
- **タイプ切替時のリセット**:
  - 子側 `LabelType.handleOnChange` で `labelContents` を上書き：`'icon' === value` → `'bookmark'`、それ以外 → `''`
- **親「ラベルタイプ」の選択肢は子と異なる**:
  - 子側「タイプ」: なし / アイコン / **テキスト**（labelContents は手動入力）
  - 親側「ラベルタイプ」: なし / アイコン / **連番**（`bulk-label/label-type.tsx`）
  - 親「連番」選択時: 全子に対して `labelType: 'text'` + `labelContents: (index + 1).toString()` を順次セット（1, 2, 3, ...）→ ステップガイド風タイムラインを 1 クリックで生成するショートカット
  - 親「アイコン」選択時: 全子に `labelType: 'icon'` + `labelContents: 'bookmark'`
  - 親「なし」選択時: 全子に `labelType: undefined` + `labelContents: ''`
- **className サポート**: 親子ともに `false`
- **デフォルト値**:
  - `labelBorderRadius`: `'50px'`（常に style="border-radius:50px" が出力される）
  - `contentsInnerMargin`: `'normal'`
- **ラベルの長文判定（CSS 切替）**:
  - `labelType='text'` かつ `labelContents.length > 1` のときラベル要素に `has-long-text` クラス付与（円形 → 横長へ）
- **コンテンツ上部余白**:
  - `contentMarginTop` 未指定時は CSS 側で `-1.8rem` 相当（labelType='icon'/'text' 時に label と contents の縦位置を揃える調整）。指定時はその値で `style="margin-top:VALUE"` を出力
- **線色とアイテム枠**:
  - `contentsBorderColor` または `customContentsBorderColor` のいずれか設定で `<div class="ystdtb-timeline-item">` に `has-border` クラス付与、左ボーダー描画
  - スラッグ指定時は `has-{slug}-border-color` も付与、カスタム色は `style="border-left-color:..."` で出力
  - `contentsBorderSize` は CSS カスタムプロパティ `--ystdtb--timeline-item--border-width` として出力（左ボーダーの太さ）

## テスト対象の設定一覧

### 親 `ystdtb/timeline`

属性は持たず、Inspector の操作はすべて子 `timeline-item` 全員への一括更新。

| パネル | 設定項目 | 反映先（子の属性） |
|---|---|---|
| コンテンツ一括設定 | コンテンツ間の余白 | `contentsInnerMargin` |
| コンテンツ一括設定 | 枠線の太さ | `contentsBorderSize` |
| コンテンツ一括設定 | 線の色 | `contentsBorderColor` / `customContentsBorderColor` |
| コンテンツ一括設定 | コンテンツ上部余白 | `contentMarginTop` |
| ラベル一括設定 | ラベルサイズ（縦・横） | `labelSize` |
| ラベル一括設定 | ラベル角丸 | `labelBorderRadius` |
| ラベル一括設定 | ラベルタイプ（**子側と選択肢が異なる**: なし/アイコン/**連番**） | `labelType` / `labelContents`（後述） |
| ラベル一括設定 | アイコン（`labelType=icon` 時） | `labelContents` |
| ラベル一括設定 | ラベル太さ（`labelType=text` 時） | `labelBold` |
| ラベル一括設定 | 文字・アイコンサイズ（`labelType` 有時） | `labelFontSize` / `customLabelFontSize` |
| ラベル一括設定 | 文字・アイコン色（`labelType` 有時） | `labelColor` / `customLabelColor` |
| ラベル一括設定 | ラベル背景色 | `labelBackgroundColor` / `customLabelBackgroundColor` |
| ラベル一括設定 | ラベル枠線の太さ | `labelBorderSize` |
| ラベル一括設定 | ラベル枠線の色 | `labelBorderColor` / `customLabelBorderColor` |

### 子 `ystdtb/timeline-item`

| パネル | 設定項目 | 属性 |
|---|---|---|
| タイムライン | コンテンツ間の余白 | `contentsInnerMargin`（`small`/`normal`/`large`、default: `normal`） |
| タイムライン | 枠線の太さ | `contentsBorderSize`（placeholder: `2px`） |
| タイムライン | 線の色 | `contentsBorderColor` / `customContentsBorderColor` |
| タイムライン | コンテンツ上部余白 | `contentMarginTop`（placeholder: `-1.8rem`） |
| ラベル | ラベルサイズ（縦・横） | `labelSize` |
| ラベル | 角丸 | `labelBorderRadius`（default: `50px`） |
| ラベル | タイプ | `labelType`（`''`/`icon`/`text`、default: `''`） |
| ラベル | アイコン（`labelType=icon` 時） | `labelContents` |
| ラベル | テキスト（`labelType=text` 時） | `labelContents` |
| ラベル | ラベル太さ（`labelType=text` 時） | `labelBold`（boolean） |
| ラベル | 文字・アイコンサイズ（`labelType` 有時） | `labelFontSize` / `customLabelFontSize` |
| ラベル | 文字・アイコン色（`labelType` 有時） | `labelColor` / `customLabelColor` |
| ラベル | ラベル背景色 | `labelBackgroundColor` / `customLabelBackgroundColor` |
| ラベル | ラベル枠線の太さ | `labelBorderSize` |
| ラベル | ラベル枠線の色 | `labelBorderColor` / `customLabelBorderColor` |

## 排他関係・条件付き表示

| 条件 | 影響 |
|---|---|
| `labelType=''` | `LabelIcon` / `LabelText` / `LabelWeight` / `FontSize` / `LabelColor` の各 UI が非表示（早期 return） |
| `labelType='icon'` 切替 | `labelContents` が `'bookmark'` で上書き |
| `labelType='text'` 切替 | `labelContents` が `''` で上書き |
| `labelType=''` 切替 | `labelContents` が `''` で上書き |
| `labelColor`（slug）設定 | `customLabelColor` がクリア（同上の onChange ロジック） |
| `customLabelColor` 設定 | `labelColor` がクリア |
| `labelBackgroundColor`（slug）設定 | `customLabelBackgroundColor` がクリア |
| `labelBorderColor`（slug）設定 | `customLabelBorderColor` がクリア |
| `contentsBorderColor`（slug）設定 | `customContentsBorderColor` がクリア |
| `labelType='text'` かつ `labelContents.length > 1` | label 要素に `has-long-text` クラス付与（横長表示） |
| `contentsBorderColor` または `customContentsBorderColor` のいずれか設定 | `ystdtb-timeline-item` に `has-border` クラス付与 |
| `labelBorderSize` 設定（truthy） | label 要素 style に `border-width:VALUE; border-style:solid` が出力 |
| `labelBorderSize` 未指定 | label 要素 style に `border-width` / `border-style` が出力されない |
| `labelBold=true` かつ `labelType='text'` | label 要素 style に `font-weight:700` が出力 |
| `contentsInnerMargin='normal'`（デフォルト） | アイテム要素には `is-margin-normal` が**付かない**（`'normal' !== _contentMargin` 条件）。コンテンツ要素には常に `is-margin-{value}` が付く |
| 親「一括設定」UI で値変更 | `updateChildAttributes` が全子アイテムに対して同値を `setAttributes`（差分マージなし、明示的な上書き） |

## RichText ツールバー制御

タイムラインブロック自体には RichText を持たない。コンテンツ部分は子の InnerBlocks に委譲しており、そちらで挿入された段落ブロック等の RichText は各ブロックのルールに従う。ラベルテキストは `labelContents` 属性として `InputControl` から入力する（ツールバー無し）。

## デバイス別テスト対象

タイムラインブロックにレスポンシブ対応属性は**なし**（該当なし）。

---

## L1 fixture テストパターン（全パターン網羅）

fixture は `test/integration/fixtures/blocks/timeline/` 配下に配置。既存の `ystdtb__timeline__deprecated-*` とは別プレフィックスで v2 操作テスト用を区別する（deprecated は v1 マイグレーションテスト用）。

命名規則: `ystdtb__timeline__{scope}__{setting}__{variant}`（scope: `label-type` / `label-icon` / `label-text` / `label-size` / `label-radius` / `label-bold` / `label-font` / `label-color` / `label-bg` / `label-border` / `contents-margin` / `border-size` / `border-color` / `margin-top` / `child` / `combo`）

### 子 `ystdtb/timeline-item` > ラベル設定

#### タイプ（`labelType`）

- [x] `ystdtb__timeline__label-type__none` — `labelType: ''`（デフォルト・明示なし、ラベル中身空）
- [x] `ystdtb__timeline__label-type__icon` — `labelType: 'icon'` + `labelContents: 'bookmark'`
- [x] `ystdtb__timeline__label-type__text` — `labelType: 'text'` + `labelContents: 'A'`

#### アイコン（`labelContents`、`labelType=icon` 前提）

`bookmark` は `label-type__icon` でカバー済みのため、ここでは別アイコン 2 種で網羅。全 SVG パスは L2 / L3 で目視。

- [x] `ystdtb__timeline__label-icon__star` — `labelContents: 'star'`
- [x] `ystdtb__timeline__label-icon__heart` — `labelContents: 'heart'`

#### テキスト（`labelContents`、`labelType=text` 前提）

- [x] `ystdtb__timeline__label-text__one-char` — `labelContents: '1'`（円形ラベル、`has-long-text` なし）
- [x] `ystdtb__timeline__label-text__multi-char` — `labelContents: 'NEW'`（`has-long-text` 付与）

#### ラベルサイズ（`labelSize`）

- [x] `ystdtb__timeline__label-size__40px` — `labelSize: '40px'`（icon ラベル）
- [x] `ystdtb__timeline__label-size__60px` — `labelSize: '60px'`（icon ラベル）

#### 角丸（`labelBorderRadius`、default `50px`）

- [x] `ystdtb__timeline__label-radius__zero` — `labelBorderRadius: '0'`（デフォルトを上書き、角なし）
- [x] `ystdtb__timeline__label-radius__8px` — `labelBorderRadius: '8px'`

#### ラベル太さ（`labelBold`、`labelType=text` 前提）

- [x] `ystdtb__timeline__label-bold__false` — `labelBold: false`（デフォルト）
- [x] `ystdtb__timeline__label-bold__true` — `labelBold: true`（style に `font-weight:700` 出力）

#### 文字・アイコンサイズ（`labelFontSize` / `customLabelFontSize`）

- [x] `ystdtb__timeline__label-font__preset` — `labelFontSize: 'large'`（icon ラベル、`has-large-font-size` クラス付与）
- [x] `ystdtb__timeline__label-font__custom` — `customLabelFontSize: '28px'`（icon ラベル、style に `font-size:28px` 出力）

#### 文字・アイコン色（`labelColor` / `customLabelColor`）

- [x] `ystdtb__timeline__label-color__preset` — `labelColor: 'ys-blue'`（icon ラベル、`has-text-color has-ys-blue-color` クラス）
- [x] `ystdtb__timeline__label-color__custom` — `customLabelColor: '#0284c7'`（icon ラベル、`has-text-color` クラス + style）

#### ラベル背景色（`labelBackgroundColor` / `customLabelBackgroundColor`）

- [x] `ystdtb__timeline__label-bg__preset` — `labelBackgroundColor: 'ys-light-blue'`
- [x] `ystdtb__timeline__label-bg__custom` — `customLabelBackgroundColor: '#fef3c7'`

#### ラベル枠線の太さ（`labelBorderSize`）

- [x] `ystdtb__timeline__label-border__1px` — `labelBorderSize: '1px'` + `labelBorderColor: 'ys-blue'`
- [x] `ystdtb__timeline__label-border__2px` — `labelBorderSize: '2px'` + `labelBorderColor: 'ys-blue'`

#### ラベル枠線の色（`labelBorderColor` / `customLabelBorderColor`）

- [x] `ystdtb__timeline__label-border-color__preset` — `labelBorderSize: '2px'` + `labelBorderColor: 'ys-purple'`
- [x] `ystdtb__timeline__label-border-color__custom` — `labelBorderSize: '2px'` + `customLabelBorderColor: '#dc2626'`

### 子 `ystdtb/timeline-item` > タイムライン設定

#### コンテンツ間の余白（`contentsInnerMargin`、default `normal`）

- [x] `ystdtb__timeline__contents-margin__small` — `contentsInnerMargin: 'small'`
- [x] `ystdtb__timeline__contents-margin__large` — `contentsInnerMargin: 'large'`

#### 枠線の太さ（`contentsBorderSize`）

- [x] `ystdtb__timeline__border-size__1px` — `contentsBorderSize: '1px'` + `contentsBorderColor: 'ys-gray'`
- [x] `ystdtb__timeline__border-size__4px` — `contentsBorderSize: '4px'` + `contentsBorderColor: 'ys-gray'`

#### 線の色（`contentsBorderColor` / `customContentsBorderColor`）

- [x] `ystdtb__timeline__border-color__preset` — `contentsBorderColor: 'ys-green'`
- [x] `ystdtb__timeline__border-color__custom` — `customContentsBorderColor: '#7c3aed'`

#### コンテンツ上部余白（`contentMarginTop`）

- [x] `ystdtb__timeline__margin-top__zero` — `contentMarginTop: '0px'`
- [x] `ystdtb__timeline__margin-top__20px` — `contentMarginTop: '20px'`

### 子アイテム個別設定（複数子で異なる属性）

- [x] `ystdtb__timeline__child__mixed-label` — 子 3 個に異なる `labelType`（なし / text NEW / icon star）+ ラベル色違い
- [x] `ystdtb__timeline__child__mixed-border-color` — 子 3 個に異なる `contentsBorderColor`（ys-blue / ys-green / ys-red）
- [x] `ystdtb__timeline__child__mixed-contents-margin` — 子 3 個に異なる `contentsInnerMargin`（small / normal / large）

### 親一括設定の適用結果（連番）

親 Inspector「ラベルタイプ」の「連番」選択時の状態を fixture で担保する（実 UI 操作は L2 で確認済）。

- [x] `ystdtb__timeline__bulk__sequential` — 親「連番」適用後の状態：子 3 個すべて `labelType: 'text'` + `labelContents: '1' / '2' / '3'`（インデックス連番）

### 代表的な組み合わせパターン（examples HTML の組み合わせ例を流用）

- [x] `ystdtb__timeline__combo__blog-history` — シンプル（ラベルなし、3 アイテム）
- [x] `ystdtb__timeline__combo__step-guide` — 数字テキスト（labelBold + 背景色 + 文字色プリセット、3 アイテム）
- [x] `ystdtb__timeline__combo__award` — アイコン（award）+ labelSize 50px + 角丸 8px + 背景色プリセット
- [x] `ystdtb__timeline__combo__service-flow` — テキスト「STEP 1」+ has-long-text + カスタム色 + カスタム背景 + customLabelFontSize
- [x] `ystdtb__timeline__combo__event` — 子 3 個に異なるアイコン（bookmark/star/heart）+ 異なる色（labelColor / contentsBorderColor）

---

## L2 Playwright UI テストパターン（絞り込み）

### ラベルタイプ切替時のリセット

- [ ] `labelType=''` → `'icon'` 切替 → `labelContents` が `'bookmark'` に上書きされる
- [ ] `labelType='icon'` → `'text'` 切替 → `labelContents` が `''` にクリアされる
- [ ] `labelType='text'`（`labelContents='ABC'`）→ `''` 切替 → `labelContents` が `''` にクリアされる

### 条件付き表示

- [ ] `labelType=''` のとき、Inspector に「アイコン」「テキスト」「ラベル太さ」「文字・アイコンサイズ」「文字・アイコン色」UI が表示されない
- [ ] `labelType='icon'` のとき、「アイコン」UI が出る、「テキスト」「ラベル太さ」UI は出ない
- [ ] `labelType='text'` のとき、「テキスト」「ラベル太さ」UI が出る、「アイコン」UI は出ない
- [ ] `labelType=''` → `'text'` → labelContents='NEW' にした瞬間 ラベル要素に `has-long-text` が付き、円形 → 横長に切り替わる

### 排他関係（カラーパレット）

- [ ] `labelColor`（slug）設定 → `customLabelColor` に切替 → `labelColor` がクリアされる
- [ ] `labelBackgroundColor`（slug）設定 → カスタム色に切替 → slug がクリアされる
- [ ] `labelBorderColor`（slug）設定 → カスタム色に切替 → slug がクリアされる
- [ ] `contentsBorderColor`（slug）設定 → カスタム色に切替 → slug がクリアされる
- [ ] 各色「クリア」→ slug / custom 両方が undefined、対応する `has-*-color` クラスが消える

### 親「一括設定」→ 子全員への反映

- [ ] 親 Inspector「コンテンツ一括設定」で `contentsInnerMargin: 'large'` 適用 → 全子アイテムが `is-margin-large` に揃う
- [ ] 親「ラベル一括設定」で `labelType: 'icon'` 適用 → 全子の `labelContents` が `'bookmark'` に揃う
- [ ] 親「ラベル一括設定」で `labelType: 'text'`（**「連番」**）適用 → 全子に `labelType: 'text'` + `labelContents: '1', '2', '3', ...`（インデックス連番）が順次セットされる
- [ ] 親「ラベル一括設定」で `labelColor: 'ys-blue'` 適用 → 全子の `labelColor` が `'ys-blue'` に揃う
- [ ] 親パネル UI 表示は最初の子の値を反映する（`firstChildAttributes`）。最初の子の値を変えてからもう一度親パネルを開くと UI が変化することを確認

### ラベル-値対応（全選択肢網羅）

- [ ] 子「タイプ」HorizonButtonSelect: なし / アイコン / テキスト の 3 ボタンクリック → 各値が `labelType` に保存される
- [ ] 子「コンテンツ間の余白」HorizonButtonSelect: 小 / 通常 / 大 の 3 ボタンクリック → `contentsInnerMargin` が更新される

### 操作順序（切り替え・リセットの整合性）

- [ ] `labelType` を icon → text → '' → icon の順で連続切替 → 各段階で `labelContents` が期待値で上書きされる
- [ ] ラベル色: プリセット A → プリセット B → カスタム → プリセット A の順で切替 → 各段階で slug / custom が排他的に保存される
- [ ] 親「一括設定」で `labelType: 'text'` → 子個別で `labelContents: 'X'` 設定 → 親で再度 `labelType: 'icon'` 適用 → 子の labelContents が `'bookmark'` に上書きされる（個別設定が消える）

### テンプレート制約

- [ ] 親 timeline を新規挿入 → デフォルトで子 2 個が自動追加される
- [ ] 親 timeline 内に別ブロック（段落など）を挿入しようとしても許可されない（`allowedBlocks: ['ystdtb/timeline-item']`）

---

## L3 手動確認チェックリスト

### フロント見た目（examples/all-variations.html ベース）

- [ ] examples HTML をエディターに貼り付け → 全パターンの見た目を目視確認
- [ ] 「設定の組み合わせ例」5 パターン（ブログ更新履歴 / ステップガイド / 受賞・実績年表 / サービス利用フロー / イベントタイムライン）の見た目
- [ ] ラベルタイプ「なし／アイコン／テキスト」の表示差異
- [ ] アイコンラベル: bookmark / star / heart の SVG が正しく描画される（`ys-icon` の glyph）
- [ ] テキストラベル: 1 文字 → 円形、複数文字 → 横長（`has-long-text`）に切り替わる
- [ ] ラベルサイズ 40px / 60px が幅・高さ両方に適用される
- [ ] 角丸 50px（default）/ 0 / 8px の見た目差異
- [ ] `labelBold: true` でラベルテキストが太字になる（font-weight:700）
- [ ] 文字・アイコンサイズ プリセット / カスタムが反映される
- [ ] 文字・アイコン色 プリセット / カスタムが反映される
- [ ] ラベル背景色 プリセット / カスタムが反映される
- [ ] ラベル枠線 1px / 2px と色（プリセット / カスタム）が反映される
- [ ] コンテンツ間余白 小 / 通常 / 大 でアイテム間の縦間隔が変わる
- [ ] 線の太さ 1px / 4px がアイテム左ボーダーに反映される
- [ ] 線の色 プリセット / カスタムがアイテム左ボーダーに反映される
- [ ] コンテンツ上部余白 0px / 20px でラベル横の段落の縦位置が変わる
- [ ] 子アイテムごとに違うラベル / 違う線色 / 違う余白がそれぞれ独立して反映される

### 検証エラー・コンソールエラー

- [ ] examples HTML ペースト → 保存 → 再読込で検証エラーが出ないこと
- [ ] ブラウザコンソールにエラー・警告なし

### テーマとの干渉

- [ ] yStandard テーマで見た目が壊れない
- [ ] 他のブロック（見出し / 段落 / Box / 画像）と並べたときの整合性

---

## 意地悪パターン（粗探し観点）

共通観点は [docs/block-operation-test-guideline.md](../../../../../docs/block-operation-test-guideline.md#粗探しのプロ観点意地悪パターン) を参照。

タイムラインブロック固有の観点:

- **`labelColor` と `customLabelColor` を HTML 直書きで両方指定**: save 出力では slug 優先（`labelColorClass ? undefined : customLabelColor`）のため custom 側は style に出ない。`has-text-color` と `has-ys-X-color` は両方付く
- **`labelType='icon'` で `labelContents` が空文字 / 未定義**: `SvgIcon.Content name=""` で `getIconSvg` が undefined を返し、SVG タグが出ない（`<span class="ystdtb-timeline__label-icon"></span>` だけ残る）
- **`labelType='text'` で `labelContents` が空文字**: `<span class="ystdtb-timeline__label-text"></span>` が出力される。`has-long-text` は `labelContents.length > 1` なので付かない
- **`labelType=''` のまま `labelContents` だけ何かを残してシリアライズ**: save では `_labelType` が falsy のとき `<span>` 自体が出力されない。labelContents が attributes に残っていても表示されない
- **`labelBorderSize` を未指定のまま `labelBorderColor` だけ設定**: label 要素に `has-border` クラスは付くが、`border-style: solid` と `border-width` が出ないため、CSS の `border-style` 既定値（none）で枠線が描画されない可能性
- **`contentsBorderSize` 設定 + 線色 未指定**: CSS カスタムプロパティ `--ystdtb--timeline-item--border-width` は出るが `has-border` が付かない → 既定の border-color で描画されるかテーマ依存
- **親「一括設定」UI で空値を入れる**: `setAttributes` で `undefined` が渡されたとき、子の attribute が消える（前の値が残らない）こと
- **親「一括設定」UI を開いた状態で子を 1 個削除 → さらに 1 個追加**: `firstChildAttributes` の参照が新しい子に切り替わるか、UI 表示が古い値のまま残らないか
- **親パネルでアイコン選択 → 個別子でテキスト切替**: 親で適用済みの `labelContents='bookmark'` が、子で `labelType='text'` に変えられたとき `''` で上書きされる挙動
- **親で `labelType=''` 適用 → `labelColor` UI が消えるが、子個別では `labelType='icon'` のままにしたい**: 親一括は子全員上書きなので不可。意図的な設計か確認
- **`contentMarginTop: '0px'`（明示 0）と未指定の差**: 0px 指定時は style に `margin-top:0px` が出る、未指定時は出ない。CSS デフォルトの `-1.8rem` は未指定時のみ効く
- **アイコンライブラリに無い slug を `labelContents` に指定**: SVG 取得失敗で `<span class="ys-icon">` 自体が出ない（fallback も指定なしのため空）

---

## 補足

- 本仕様は block.json / edit.tsx / save.tsx / utils.ts / examples HTML の構造に基づく
- ブロックの仕様変更時は本仕様も更新する
- L2 / L3 セッション結果は `operation.md`（Git 管理外）に記録
- L1 fixture は `test/integration/fixtures/blocks/timeline/` 配下（既存 `deprecated-*` とは別プレフィックスで追加）
- 本仕様の fixture 数は 38 件（label-type 3 / label-icon 2 / label-text 2 / label-size 2 / label-radius 2 / label-bold 2 / label-font 2 / label-color 2 / label-bg 2 / label-border 2 / label-border-color 2 / contents-margin 2 / border-size 2 / border-color 2 / margin-top 2 / child 3 / combo 5 / bulk 1）
