# アイコンリスト ブロック 操作テスト仕様

アイコンリスト（icon-list）親子ブロック全体のテスト仕様書。

対象ブロック:
- `ystdtb/icon-list`（親）
- `ystdtb/icon-list-item`（子）

エディター上の UI 操作・fixture による HTML 往復検証・手動確認の三層で動作を検証する。

## テスト方針

- **L1 (fixture-based integration test)**: 属性 → HTML 出力・parse/serialize 往復を全設定パターン網羅で自動検証（CI 毎回）
- **L2 (Playwright UI 自動テスト)**: リストアイコンボタングリッドのラベル-値対応・カラーパレット排他・子アイテムの Enter/Backspace カスタムキー制御をスポット検証
- **L3 (手動確認)**: フロント見た目（アイコンフォント表示）・レスポンシブ挙動・複数組み合わせの並列表示を目視確認

運用ルールは [docs/block-operation-test-guideline.md](../../../../../docs/block-operation-test-guideline.md) を参照。

## ブロック特性

- **親子構成（2 層）**:
  - 親 `ystdtb/icon-list` は子として `ystdtb/icon-list-item` のみ許可（`allowedBlocks`）
  - 親のテンプレートは初期 1 個（`[ ['ystdtb/icon-list-item'] ]`）、`templateLock` なし（追加・削除・並べ替え自由）
  - 子 `icon-list-item` の innerBlocks は `renderAppender: false` + `__unstableDisableDropZone: true` で、子の中にさらに子を入れる UI は無効
- **RichText**: 子 `icon-list-item` の `content`（html source、`<li>` 直下のテキスト）
- **レスポンシブ属性**: なし（icon-list 独自のビューポート別設定 UI は持たない）
- **Context propagation（`providesContext`）**:
  - 親 → 子: `iconType` / `customIconClass` / `iconBold` / `iconColor` / `customIconColor`（子側では現状直接利用していないが将来の拡張用）
- **カラー withColors**: 親 `icon-list` のみ `iconColor` を `iconFontColor` slug として `withColors` 利用
- **className サポート**: 親子ともに `false`（`wp-block-ystdtb-*` プレフィックスを出力しない方針）
- **子のキー操作カスタマイズ（edit.tsx）**:
  - 空 `content` で Backspace → 当該 `icon-list-item` を削除し前のアイテムにフォーカス（ただし子が 1 個のときは削除しない）
  - 最後のアイテムで空 `content` のまま Enter → 当該 `icon-list-item` を削除し、親 `icon-list` の直後に段落ブロックを挿入
- **アイコン表示**: CSS の `:where(li)::before` に `content` プロパティでフォントアイコン（ys-icon-font）を出力。`icon--{slug}` クラスで切替
- **自動 padding**: CSS で `:where([style*="border-"])` / `:where(.has-border-color)` / `:where(.has-background)` のいずれかが当たると `padding: 1em` が自動付与
- **太字**: `iconBold: true` で `is-bold` クラス → `li::before` の `font-weight: bold`

## テスト対象の設定一覧

### 親 `ystdtb/icon-list`

| パネル | 設定項目 | 属性 |
|---|---|---|
| アイコン | リストアイコン | `iconType`（default: `'chevron-right'`、17 種類） |
| アイコン | カスタムアイコンクラス（拡張用） | `customIconClass` |
| アイコン | アイコン色 | `iconColor` / `customIconColor` |
| アイコン | アイコン太さ | `iconBold`（default: false） |
| WP コア（typography） | フォントサイズ | `fontSize` / `style.typography.fontSize` |
| WP コア（typography） | 行の高さ | `style.typography.lineHeight` |
| WP コア（color） | テキスト色 | `textColor` / `style.color.text` |
| WP コア（color） | 背景色 | `backgroundColor` / `style.color.background` |
| WP コア（color） | リンク色 | `style.elements.link.color.text` |
| WP コア（border） | 枠線（色・太さ・線種） | `style.border.{color,width,style}` |
| WP コア（border） | 角丸 | `style.border.radius` |
| WP コア（spacing） | 内側余白 | `style.spacing.padding` |
| WP コア（spacing） | 外側余白 | `style.spacing.margin` |

### 子 `ystdtb/icon-list-item`

| パネル | 設定項目 | 属性 |
|---|---|---|
| （RichText） | アイテムテキスト | `content`（html source） |
| WP コア（typography） | フォントサイズ | `fontSize` / `style.typography.fontSize` |
| WP コア（color） | テキスト色 | `textColor` / `style.color.text` |
| WP コア（color） | 背景色 | `backgroundColor` / `style.color.background` |

## 排他関係・条件付き表示

| 条件 | 影響 |
|---|---|
| `iconColor`（slug）設定 | `customIconColor` がクリアされる（`withColors`/ColorPalette UI の挙動） |
| `customIconColor` 設定 | `iconColor`（slug）がクリアされる（同上） |
| `iconColor` または `customIconColor` のいずれか設定 | 親 `<ul>` に `has-icon-font-color` クラス付与、`--icon-font-color` カスタムプロパティが style に出力 |
| `iconColor`（slug）設定 | 親 `<ul>` に `has-{slug}-icon-font-color` クラス付与（`getColorClassName('icon-font-color', slug)`） |
| 親に `style.border.*`（color/width/radius のいずれか）設定 | 親 `<ul>` に `has-border-color` 等が付き、CSS で自動 `padding: 1em` |
| 親に `backgroundColor` / `customBackgroundColor` 設定 | 親 `<ul>` に `has-background` が付き、CSS で自動 `padding: 1em` |
| `iconBold: true` | 親 `<ul>` に `is-bold` クラス付与、`li::before` の font-weight: bold |
| 子が 1 個のみ | 空 `content` で Backspace を押しても削除されない |
| 最後の子で空 `content` のまま Enter | 当該子を削除し、親 `icon-list` の直後に段落ブロックを挿入 |
| 親 `templateLock` なし | 子 icon-list-item の追加・削除・並べ替えは自由 |
| 親 `allowedBlocks: ['ystdtb/icon-list-item']` | 親内には `ystdtb/icon-list-item` 以外を挿入できない |

## RichText ツールバー制御

子 `icon-list-item` の `content` は標準の RichText（`tagName="div"` で内部実装）で、太字・斜体・リンク等の WordPress コア標準フォーマットがすべて利用可能（明示的な `allowedFormats` 制限なし）。

## デバイス別テスト対象

icon-list ブロックに独自のレスポンシブ属性は**なし**（該当なし）。

---

## L1 fixture テストパターン（全パターン網羅）

fixture は `test/integration/fixtures/blocks/icon-list/` 配下に配置。

命名規則: `ystdtb__icon-list__{scope}__{setting}__{variant}`（scope: `icon` / `icon-color` / `icon-bold` / `typography` / `color` / `border` / `spacing` / `child` / `combo`）

### 親 `ystdtb/icon-list` > リストアイコン（代表 2 種）

L1 では「`iconType` の値が `icon--{slug}` クラスとして save 出力される」ことを担保する。全 17 種の網羅は L2（ボタングリッドの全選択肢クリック）で行うため、ここではデフォルト値と非デフォルト値の代表 2 種に絞る。

- [ ] `ystdtb__icon-list__icon__type__chevron-right` — `iconType: "chevron-right"`（デフォルト・明示指定）
- [ ] `ystdtb__icon-list__icon__type__star` — `iconType: "star"`

### 親 `ystdtb/icon-list` > アイコン色

- [ ] `ystdtb__icon-list__icon-color__preset` — `iconColor: "vivid-red"`
- [ ] `ystdtb__icon-list__icon-color__custom` — `customIconColor: "#22c55e"`

### 親 `ystdtb/icon-list` > アイコン太さ

- [ ] `ystdtb__icon-list__icon-bold__false` — `iconBold: false`（デフォルト・明示指定）
- [ ] `ystdtb__icon-list__icon-bold__true` — `iconBold: true`

### 親 `ystdtb/icon-list` > タイポグラフィ

- [ ] `ystdtb__icon-list__typography__font-size__preset` — `fontSize: "large"`
- [ ] `ystdtb__icon-list__typography__font-size__custom-px` — `style.typography.fontSize: "24px"`
- [ ] `ystdtb__icon-list__typography__font-size__custom-em` — `style.typography.fontSize: "1.25em"`
- [ ] `ystdtb__icon-list__typography__line-height__2` — `style.typography.lineHeight: "2"`

### 親 `ystdtb/icon-list` > 色

- [ ] `ystdtb__icon-list__color__text__custom` — `style.color.text: "#1e293b"`
- [ ] `ystdtb__icon-list__color__bg__custom` — `style.color.background: "#fef3c7"`
- [ ] `ystdtb__icon-list__color__text-bg__custom` — テキスト色 + 背景色 両方カスタム
- [ ] `ystdtb__icon-list__color__link__custom` — `style.elements.link.color.text: "#0284c7"`

### 親 `ystdtb/icon-list` > 枠線

- [ ] `ystdtb__icon-list__border__solid-1px` — `style.border: { color, width: "1px", style: "solid" }`
- [ ] `ystdtb__icon-list__border__dashed-2px` — `style.border: { color, width: "2px", style: "dashed" }`
- [ ] `ystdtb__icon-list__border__radius-8px` — `style.border.radius: "8px"`（実線 + 角丸）

### 親 `ystdtb/icon-list` > 余白

- [ ] `ystdtb__icon-list__spacing__padding__shorthand-all` — `style.spacing.padding: "24px"`
- [ ] `ystdtb__icon-list__spacing__padding__shorthand-4corners` — `style.spacing.padding: { top, right, bottom, left }` 各値違い
- [ ] `ystdtb__icon-list__spacing__margin__top-bottom` — `style.spacing.margin: { top: "32px", bottom: "32px" }`

### 子 `ystdtb/icon-list-item` > 個別設定

- [ ] `ystdtb__icon-list__child__text__custom` — 子 1 個に `style.color.text: "#dc2626"`
- [ ] `ystdtb__icon-list__child__bg__custom` — 子 1 個に `style.color.background: "#fef9c3"`
- [ ] `ystdtb__icon-list__child__font-size__preset` — 子 1 個に `fontSize: "large"`

### 代表的な組み合わせパターン（examples HTML の組み合わせ例を流用）

- [ ] `ystdtb__icon-list__combo__simple` — デフォルト（chevron-right）+ 3 アイテム
- [ ] `ystdtb__icon-list__combo__checklist` — `iconType: "check"` + `customIconColor: "#22c55e"` + `iconBold: true`
- [ ] `ystdtb__icon-list__combo__card` — `iconType: "star"` + `customIconColor: "#f59e0b"` + 背景色 + 枠線 + 角丸
- [ ] `ystdtb__icon-list__combo__notice` — `iconType: "alert-triangle"` + `iconBold: true` + テキスト色 + アイコン色
- [ ] `ystdtb__icon-list__combo__action-link` — `iconType: "chevrons-right"` + アイコン色 + リンク色 + 子 li にリンク

---

## L2 Playwright UI テストパターン（絞り込み）

### 排他関係・カスケード

- [ ] `iconColor`（slug）設定 → `customIconColor` に切替 → `iconColor` がクリアされる
- [ ] `customIconColor`（hex）設定 → `iconColor`（slug）に切替 → `customIconColor` がクリアされる
- [ ] アイコン色「クリア」→ `iconColor` / `customIconColor` 両方が undefined、`has-icon-font-color` クラスが消える

### 条件付き表示

- [ ] 親に背景色設定 → エディターでも `has-padding`（実装は CSS の自動 padding）相当の見た目になり、内側に余白が出る
- [ ] 親に枠線設定 → 同上、自動 padding が効く

### ラベル-値対応（全選択肢網羅）

- [ ] 親「リストアイコン」ボタングリッド: 全 17 選択肢クリック → 各値が `iconType` に保存され、対応する `icon--{slug}` クラスが付く
- [ ] 親「アイコン色」ColorPalette: プリセット 1 件 + カスタム 1 件 → `iconColor` / `customIconColor` が排他的に保存される
- [ ] 親「アイコン太さ」ToggleControl: ON / OFF → `iconBold` が true / false で保存される

### 複雑 UI

- [ ] アイコン色 ColorPalette: プリセット → カスタム → クリアの 3 段階遷移で、`iconColor` / `customIconColor` が排他的に保存され、最終クリアで `has-icon-font-color` 関連がすべて消える

### 操作順序（切り替え・リセットの整合性）

- [ ] `iconType` を 17 種類連続クリック → 各クリック後に `iconType` が更新され、前回値の残骸（`customIconClass` 等）がないこと
- [ ] アイコン色: プリセット A → プリセット B → カスタム → プリセット A の順で切替 → 各段階で `iconColor` / `customIconColor` が排他的に保存される

### RichText フォーマット・ツールバー制御

- [ ] 子 `icon-list-item` の `content` に太字・斜体・リンク等の基本フォーマットを適用 → 保存 → 再読込で検証エラーなし
- [ ] 親に link 色設定 + 子 li 内にリンク → エディター上でリンク色が反映される

### 子アイテムのキー操作（独自実装）

- [ ] 空 content の icon-list-item で Backspace → 当該アイテムが削除され、前のアイテムにフォーカスが移る
- [ ] 子が 1 個のみのとき空 content で Backspace → 削除されない（最後の 1 個が残る）
- [ ] 最後のアイテムで空 content のまま Enter → 当該アイテムが削除され、親 `icon-list` の直後に段落ブロックが挿入される
- [ ] 中間アイテムで Enter（content あり）→ 通常の RichText 分割（次の icon-list-item 追加）

### テンプレート制約

- [ ] 親 icon-list を新規挿入 → デフォルトで子 1 個が自動追加される
- [ ] 親 icon-list 内に別ブロック（段落など）を挿入しようとしても許可されない（`allowedBlocks: ['ystdtb/icon-list-item']`）

---

## L3 手動確認チェックリスト

### フロント見た目（examples/all-variations.html ベース）

- [ ] examples HTML をエディターに貼り付け → 全パターンの見た目を目視確認
- [ ] 「設定の組み合わせ例」5 パターン（シンプル / チェックリスト風 / カード風 / お知らせリスト風 / アクションリスト風）の見た目
- [ ] アイコン 17 種類が正しく表示される（フォントアイコン `ys-icon-font` の glyph）
- [ ] `iconBold: true` でアイコンが太く表示される（`li::before` font-weight）
- [ ] `iconColor` / `customIconColor` がアイコンのみに反映され、テキスト色には影響しない
- [ ] 背景色 / 枠線あり時の自動 padding が効いている
- [ ] 子 li に個別設定したテキスト色 / 背景色 / フォントサイズが当該アイテムだけに反映される

### ビューポート切替時の表示

- [ ] desktop / tablet / mobile の各ビューポートで内側余白・枠線・アイコン位置が破綻しない

### 検証エラー・コンソールエラー

- [ ] examples HTML ペースト → 保存 → 再読込で検証エラーが出ないこと
- [ ] ブラウザコンソールにエラー・警告なし

### テーマとの干渉

- [ ] yStandard テーマで見た目が壊れない
- [ ] 他のブロック（見出し / 段落 / Box / カラム）と並べたときの整合性
- [ ] テーマの `ul` 既定スタイルがリセットされている（list-style: none / padding-left: 0）

---

## 意地悪パターン（粗探し観点）

共通観点は [docs/block-operation-test-guideline.md](../../../../../docs/block-operation-test-guideline.md#粗探しのプロ観点意地悪パターン) を参照。

icon-list ブロック固有の観点:

- **`iconColor` と `customIconColor` を HTML 直書きで両方指定**: save / parse の挙動。`getBlockStyles` は `iconColor ? undefined : customIconColor` で slug 優先のため、custom 側は出力されないはず
- **`iconType` に未定義の slug を指定**: `icon--{slug}` クラスは付くが、CSS 側に対応する `&:where(.icon--{slug})` ルールがないため、アイコンは表示されない
- **`customIconClass` 設定**: `getBlockEditorConfig('listIcons', [])` で外部からカスタムアイコンを追加できる仕組み。標準 17 種以外でクラスが付与される挙動
- **背景色のみ + 枠線なし + padding 未指定**: CSS の `:where(.has-background) { padding: 1em }` が効いて自動 padding が出る
- **ボーダー radius のみ設定（color / width 未指定）**: `style.border.radius: "8px"` だけでは `:where([style*="border-"])` にマッチしないため、自動 padding が付かない可能性 → 角丸は見た目に出るが余白なし
- **空 li を多数追加してから一気に Backspace**: フォーカス移動と削除順序が破綻しないか
- **子 li をコピー → 親の外にペースト**: `parent: ['ystdtb/icon-list']` 制約により icon-list 外には貼り付けられないか
- **親の `iconColor` を slug → 未定義テーマで開く**: `has-{slug}-icon-font-color` クラスは付くが対応する CSS 変数がないため、`--icon-font-color` のフォールバックで `currentColor`（テキスト色）になる
- **親の link 色 + 子 li 個別の textColor 設定**: 子 textColor がリンクテキスト色を上書きするか、それとも親 link 色が優先か
- **子 li 内に深いネスト（ブロック）を入れようとする**: `__unstableDisableDropZone: true` と `renderAppender: false` で UI 上は子の中にブロック追加できないが、HTML 直書きで挿入したらどうなるか
- **iconType を連続変更時の `customIconClass` 残骸**: 標準 17 種に切替時 `customIconClass: undefined` でクリアされるが、再度カスタム iconType に戻すときの整合性

---

## 補足

- 本仕様は block.json / edit.tsx / save.tsx / utils.ts / examples HTML の構造に基づく
- ブロックの仕様変更時は本仕様も更新する
- L2 / L3 セッション結果は `operation.md`（Git 管理外）に記録
- L1 fixture は `test/integration/fixtures/blocks/icon-list/` 配下（新規作成）
- 本仕様の fixture 数はおよそ 26 件（icon 2 / icon-color 2 / icon-bold 2 / typography 4 / color 4 / border 3 / spacing 3 / child 3 / combo 5）
