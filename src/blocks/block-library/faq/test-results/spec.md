# FAQ ブロック 操作テスト仕様

FAQ（faq）親子ブロック全体のテスト仕様書。

対象ブロック:
- `ystdtb/faq`（親）
- `ystdtb/faq-item`（子。faqType = 'q' | 'a'）

エディター上の UI 操作・fixture による HTML 往復検証・手動確認の三層で動作を検証する。

## テスト方針

- **L1 (fixture-based integration test)**: 属性 → HTML 出力・parse/serialize 往復を全設定パターン網羅で自動検証（CI 毎回）
- **L2 (Playwright UI 自動テスト)**: テンプレート固定制約・デザインプリセット適用・親子間の属性同期・ボーダータイプ選択肢・カラーパレット UI のスポット検証
- **L3 (手動確認)**: フロント見た目・アコーディオン開閉動作・複数パターン並列表示を目視確認

運用ルールは [docs/block-operation-test-guideline.md](../../../../../docs/block-operation-test-guideline.md) を参照。

## ブロック特性

- **親子構成（2 層）**:
  - 親 `ystdtb/faq` は子として `ystdtb/faq-item` のみ許可（`allowedBlocks`）
  - 親のテンプレートは `[q, a]` の固定ペア、`templateLock: 'all'` で追加・削除・並べ替え不可
  - 子 `faq-item` の innerBlocks は段落等自由配置可（`templateLock: false`）
- **RichText**: なし（コンテンツは子の InnerBlocks に委譲）
- **レスポンシブ属性**: 親のフォントサイズ・文字揃えをdesktop / tablet / mobileごとに設定
- **Context propagation（`providesContext` / `usesContext`）**:
  - 親 → 子: `isAccordion` / `backgroundColor` / `borderType` / `borderSize` / `borderColor` / `customBorderColor` / `accordionArrowColor` / `customAccordionArrowColor`
  - 旧背景色・旧枠線のContextキーは移行期間の互換属性としてmetadataに残るが、現行の親枠線表示には使わない
- **親子属性の同期**:
  - 親の `accordionArrowColor` / `customAccordionArrowColor` 変更時、`updateChildAttributes` で子全員の属性も同値に更新（親子両方に持つのはフロント描画のため）
- **カラー withColors**: 子 `faq-item` は 7 属性で `withColors` 利用
  - `faqTextColor` / `faqBackgroundColor` / `faqBorderColor` / `labelColor` / `labelBackgroundColor` / `labelBorderColor` / `accordionArrowColor`
- **アコーディオン UI**: Q 側のみ矢印（`.ystdtb-faq-item__arrow` + `chevron-down` SVG）を出力。`view.ts` により Q 要素クリックで開閉
- **デザインプリセット**: 子 `faq-item` の Design パネルに 6 種のプリセット（default / background-square / background-circle / outline-square / outline-circle / bottom-divider）。クリックで複数の子属性 + 親の `accordionArrowColor` を一括適用

## テスト対象の設定一覧

### 親 `ystdtb/faq`

| パネル | 設定項目 | 属性 |
|---|---|---|
| FAQ設定 | 開閉式 | `isAccordion`（default: false） |
| スタイル > 開閉ボタン（色） | 色（isAccordion=true時） | `accordionArrowColor` / `customAccordionArrowColor` |
| スタイル > 開閉ボタン（余白） | マージン（上下左右、isAccordion=true時） | 親: `style.ystdtb.faq.arrow.spacing.margin` / 子: `style.ystdtb.faqItem.arrow.spacing.margin` |
| 色 | 親背景色 | `backgroundColor` / `style.color.background` |
| 色 | 親背景グラデーション | `gradient` / `style.color.gradient` |
| 枠線 | 親枠線色・角丸・スタイル・幅 | `style.border` |
| タイポグラフィ | 親フォントサイズ・行の高さ・文字揃え等 | `fontSize` / `fontFamily` / `style.typography` |
| サイズ | 親外側余白（上下） | `style.spacing.margin` |
| サイズ | 親内側余白（上下左右） | `style.spacing.padding` |
| レスポンシブ文字設定 | 親フォントサイズ | `style.ystdtb.faq.responsive.typography.fontSize` |
| レスポンシブ文字設定 | 親文字揃え | `style.ystdtb.faq.responsive.typography.textAlign` |

### 子 `ystdtb/faq-item`

| パネル | 設定項目 | 属性 |
|---|---|---|
| （属性） | FAQ タイプ | `faqType`（'q'/'a'、default: 'q'） |
| FAQラベル設定 | ラベル表示位置 | `labelPosition`（flex-start/center/flex-end、default: center） |
| FAQラベル設定 | ラベル文字サイズ | `labelSize`（プリセット） / `customLabelSize`（px/em） |
| FAQラベル設定 | ラベル太字 | `labelBold`（default: true） |
| FAQラベル設定 | ラベル文字色 | `labelColor` / `customLabelColor` |
| FAQラベル設定 | ラベル背景色 | `labelBackgroundColor` / `customLabelBackgroundColor` |
| FAQラベル設定 | ラベル角丸 | `labelBorderRadius` |
| FAQラベル設定 | ラベル枠線サイズ | `labelBorderSize` |
| FAQラベル設定 | ラベル枠線色 | `labelBorderColor` / `customLabelBorderColor` |
| FAQコンテンツ設定 | コンテンツ文字色 | `faqTextColor` / `customFaqTextColor` |
| FAQコンテンツ設定 | コンテンツ背景色 | `faqBackgroundColor` / `customFaqBackgroundColor` |
| FAQコンテンツ設定 | コンテンツ区切り線タイプ | `faqBorderType`（''/bottom、default: ''） |
| FAQコンテンツ設定 | 区切り線サイズ（faqBorderType 有効時） | `faqBorderSize` |
| FAQコンテンツ設定 | 区切り線色（faqBorderType 有効時） | `faqBorderColor` / `customFaqBorderColor` |
| デザインサンプル | プリセットボタン | 複数属性を一括適用（default / background-square / background-circle / outline-square / outline-circle / bottom-divider） |

## 排他関係・条件付き表示

| 条件 | 影響 |
|---|---|
| 親`isAccordion=false` | スタイルパネルの「開閉ボタン（色）」「開閉ボタン（余白）」が非表示（各コンポーネントが早期return） |
| 子 `faqBorderType=''` 選択 | `faqBorderSize` が `undefined` にリセット + `faqBorderColor` がクリア（`ContentsBorder.handleOnBorderTypeChange`） |
| 子 `faqBorderType='bottom'` 選択 | `faqBorderSize='1px'` + `faqBorderColor='#eeeeee'` がデフォルト適用（`ContentsBorder.handleOnBorderTypeChange`） |
| 子 `faqBorderType=''` | 「区切り線サイズ」「区切り線色」UI が非表示 |
| 子 `faqType='a'` | アコーディオン矢印（`.ystdtb-faq-item__arrow`）が非出力 |
| 親 `accordionArrowColor` / `customAccordionArrowColor` 変更 | 子 faq-item 全員の同属性も同時更新（`updateChildAttributes`） |
| 親の開閉ボタンmargin変更 | 子 faq-item 全員の`style.ystdtb.faqItem.arrow.spacing.margin`も同時更新（`updateChildAttributes`） |
| 親子テンプレートは `[q, a]` 固定 | 子 faq-item の追加・削除・並べ替え不可（`templateLock: 'all'`） |
| 親の`backgroundColor` / `style.color.background` / `gradient` / `style.color.gradient`設定 | WordPress標準の`has-background`クラスが付き、FAQ項目の左右余白が自動で入る |
| 子の`faqBackgroundColor` / `customFaqBackgroundColor`設定 | 子要素に`has-padding`クラス付与（内側余白が自動で入る） |
| ラベルに `labelBackgroundColor` / `customLabelBackgroundColor` / `labelBorderColor` / `customLabelBorderColor` / `labelBorderSize` のいずれか設定 | ラベルに `has-padding` クラス付与 |

## RichText ツールバー制御

FAQ ブロック自体には RichText を持たない。コンテンツ部分は子の InnerBlocks に委譲しており、そちらで挿入された段落ブロック等の RichText は各ブロックのルールに従う。

## デバイス別テスト対象

- 親フォントサイズ: desktop / tablet / mobile
- 親文字揃え: desktop / tablet / mobile
- 未設定のデバイスはCSSカスタムプロパティを出力しない

---

## L1 fixture テストパターン（全パターン網羅）

fixture は `test/integration/fixtures/blocks/faq/` 配下に配置。既存の `ystdtb__faq__deprecated-*` とは別プレフィックスで v2 操作テスト用を区別する（deprecated は v1 マイグレーションテスト用）。

命名規則: `ystdtb__faq__{scope}__{setting}__{variant}`（scope: `faq` / `item-type` / `label` / `contents` / `preset` / `combo`）

### 親`ystdtb/faq` > FAQ設定・スタイル

- [ ] `ystdtb__faq__faq__accordion__off` — `isAccordion: false`（デフォルト・明示指定）
- [ ] `ystdtb__faq__faq__accordion__on` — `isAccordion: true`
- [ ] `ystdtb__faq__faq__accordion-arrow-color__preset` — `isAccordion: true` + `accordionArrowColor: "ys-red"`
- [ ] `ystdtb__faq__faq__accordion-arrow-color__custom` — `isAccordion: true` + `customAccordionArrowColor: "#dc2626"`
- [ ] `ystdtb__faq__faq__accordion-arrow-spacing__4corners` — `isAccordion: true` + 開閉ボタンmarginの上・右・下・左を個別に設定
- [ ] `ystdtb__faq__faq__bg__preset` — `backgroundColor: "ys-light-orange"`
- [ ] `ystdtb__faq__faq__bg__custom` — `style.color.background: "#fff7ed"`
- [ ] `ystdtb__faq__faq__gradient__preset` — `gradient: "midnight"`
- [ ] `ystdtb__faq__faq__gradient__custom` — `style.color.gradient`に任意のグラデーションを設定
- [ ] `ystdtb__faq__deprecated-2-3-0-background-custom` — v2.3.0の`customBackgroundColor`を現行形式へ移行
- [ ] `ystdtb__faq__deprecated-1-34-1-background-custom` — v1.34.1以前の数値枠線幅と`customBackgroundColor`を同時に移行
- [ ] `ystdtb__faq__deprecated-2-3-0-border-all-custom` — v2.3.0の全周カスタム枠線を`style.border`へ移行
- [ ] `ystdtb__faq__faq__border-type__all` — `borderColor`と`style.border`へ全周のプリセット色・スタイル・幅を設定
- [ ] `ystdtb__faq__faq__border-type__bottom` — `style.border.bottom`へ下辺の色・スタイル・幅を設定
- [ ] `ystdtb__faq__faq__border-size__3px` — `style.border.width: "3px"`
- [ ] `ystdtb__faq__faq__border-color__custom` — `style.border.color: "#0284c7"`
- [ ] `ystdtb__faq__faq__border-style__dashed` — `style.border.style: "dashed"`
- [ ] `ystdtb__faq__faq__border-radius__8px` — `style.border.radius: "8px"`

### 親 `ystdtb/faq` > タイポグラフィ

- [ ] `ystdtb__faq__typography__font-size__preset` — `fontSize: "large"`
- [ ] `ystdtb__faq__responsive-typography__all-devices` — フォントサイズ・文字揃えをdesktop / tablet / mobileに設定

### 親 `ystdtb/faq` > 余白

- [ ] `ystdtb__faq__spacing__margin__top-bottom` — `style.spacing.margin`の上・下を個別に設定
- [ ] `ystdtb__faq__spacing__padding__4corners` — `style.spacing.padding`の上・右・下・左を個別に設定

### 子 `ystdtb/faq-item` > FAQ タイプ

- [ ] `ystdtb__faq__item-type__q` — `faqType: "q"`（デフォルト・明示指定）
- [ ] `ystdtb__faq__item-type__a` — `faqType: "a"`

### 子 `ystdtb/faq-item` > ラベル設定

- [ ] `ystdtb__faq__label__position__flex-start` — `labelPosition: "flex-start"`
- [ ] `ystdtb__faq__label__position__center` — `labelPosition: "center"`（デフォルト・明示指定）
- [ ] `ystdtb__faq__label__position__flex-end` — `labelPosition: "flex-end"`
- [ ] `ystdtb__faq__label__size__preset` — `labelSize: "large"`
- [ ] `ystdtb__faq__label__size__custom-px` — `customLabelSize: "24px"`
- [ ] `ystdtb__faq__label__size__custom-em` — `customLabelSize: "1.5em"`
- [ ] `ystdtb__faq__label__bold__true` — `labelBold: true`（デフォルト・明示指定）
- [ ] `ystdtb__faq__label__bold__false` — `labelBold: false`
- [ ] `ystdtb__faq__label__color__preset` — `labelColor: "ys-red"`
- [ ] `ystdtb__faq__label__color__custom` — `customLabelColor: "#0f766e"`
- [ ] `ystdtb__faq__label__bg__preset` — `labelBackgroundColor: "ys-light-green"`
- [ ] `ystdtb__faq__label__bg__custom` — `customLabelBackgroundColor: "#fde68a"`
- [ ] `ystdtb__faq__label__border-radius__4px` — `labelBorderRadius: "4px"`
- [ ] `ystdtb__faq__label__border-radius__16px` — `labelBorderRadius: "16px"`
- [ ] `ystdtb__faq__label__border-radius__50px` — `labelBorderRadius: "50px"`
- [ ] `ystdtb__faq__label__border__1px-preset` — `labelBorderSize: "1px"` + `labelBorderColor: "ys-red"`
- [ ] `ystdtb__faq__label__border__2px-custom` — `labelBorderSize: "2px"` + `customLabelBorderColor: "#7c3aed"`

### 子 `ystdtb/faq-item` > コンテンツ設定

- [ ] `ystdtb__faq__contents__text__preset` — `faqTextColor: "ys-purple"`
- [ ] `ystdtb__faq__contents__text__custom` — `customFaqTextColor: "#1e3a8a"`
- [ ] `ystdtb__faq__contents__bg__preset` — `faqBackgroundColor: "ys-light-orange"`
- [ ] `ystdtb__faq__contents__bg__custom` — `customFaqBackgroundColor: "#ecfdf5"`
- [ ] `ystdtb__faq__contents__border-type__bottom` — `faqBorderType: "bottom"` + `faqBorderSize: "1px"` + `faqBorderColor: "ys-black"`
- [ ] `ystdtb__faq__contents__border-size__1px` — 上と同じ（1px）
- [ ] `ystdtb__faq__contents__border-size__3px` — `faqBorderType: "bottom"` + `faqBorderSize: "3px"` + `faqBorderColor: "ys-black"`
- [ ] `ystdtb__faq__contents__border-color__preset` — `faqBorderType: "bottom"` + `faqBorderSize: "1px"` + `faqBorderColor: "ys-green"`
- [ ] `ystdtb__faq__contents__border-color__custom` — `faqBorderType: "bottom"` + `faqBorderSize: "1px"` + `customFaqBorderColor: "#f59e0b"`

### デザインプリセット（各プリセット適用直後の属性一式を fixture 化）

- [ ] `ystdtb__faq__preset__default` — `attributes: {}`（プリセット「デフォルト」は全属性未設定状態と同等）
- [ ] `ystdtb__faq__preset__background-square` — `customLabelColor: "#222222"` + `customLabelBackgroundColor: "#f1f1f3"`
- [ ] `ystdtb__faq__preset__background-circle` — 上 + `labelBorderRadius: "50px"`
- [ ] `ystdtb__faq__preset__outline-square` — `labelBorderSize: "2px"` + `customLabelColor: "#666666"` + `customLabelBackgroundColor: "#ffffff"` + `customLabelBorderColor: "#666666"`
- [ ] `ystdtb__faq__preset__outline-circle` — 上 + `labelBorderRadius: "50px"`
- [ ] `ystdtb__faq__preset__bottom-divider` — `faqBorderType: "bottom"` + `faqBorderSize: "1px"` + `customFaqBorderColor: "#aaaaaa"`

### 代表的な組み合わせパターン（examples HTML の組み合わせ例を流用）

- [ ] `ystdtb__faq__combo__basic` — デフォルトの基本 FAQ
- [ ] `ystdtb__faq__combo__accordion` — `isAccordion: true` のみ
- [ ] `ystdtb__faq__combo__card` — `style.color.background` + `style.border`の全周枠線
- [ ] `ystdtb__faq__combo__divider` — 子の `faqBorderType: "bottom"` を Q/A 両方に適用
- [ ] `ystdtb__faq__combo__preset-bg-circle-applied` — デザインプリセット「背景あり丸」適用済み + `isAccordion: true`

---

## L2 Playwright UI テストパターン（絞り込み）

### 排他関係・カスケード

- [ ] 親 `isAccordion=false` → `true` → 「開閉ボタン（色）」「開閉ボタン（余白）」UIの表示／非表示が切り替わる
- [ ] WordPress標準の枠線パネルで親枠線を追加・解除し、`style.border`だけが更新される
- [ ] 子 `faqBorderType: ''` → `'bottom'` に切替 → `faqBorderSize: '1px'` + `faqBorderColor: '#eeeeee'` が自動設定される
- [ ] 子 `faqBorderType: 'bottom'` → `''` に戻す → `faqBorderSize` が undefined、`faqBorderColor` がクリア
- [ ] 親 `accordionArrowColor` を変更 → 子 Q/A 両方の `accordionArrowColor` も同値に更新される（`updateChildAttributes`）
- [ ] 親の開閉ボタンmarginを変更 → 子 Q/A 両方の`style.ystdtb.faqItem.arrow.spacing.margin`も同値に更新される（`updateChildAttributes`）

### 条件付き表示

- [ ] 親のスタイルパネルでは、タイポグラフィ・背景色・グラデーション・余白・枠線・開閉ボタン色・開閉ボタン余白の設定項目が初期表示されない
- [ ] 親`isAccordion=true`時のみ、スタイルパネルに「開閉ボタン（色）」「開閉ボタン（余白）」パネルが表示される
- [ ] 開閉ボタン色を設定すると「−」リセットボタンが表示され、操作すると親子の色属性が削除される
- [ ] 開閉ボタンmarginは上下左右を設定でき、リセットすると親子のmarginだけが削除される
- [ ] 子 `faqBorderType` が空以外のときのみ「区切り線サイズ」「区切り線色」BaseControl が表示される
- [ ] 子 `faqType: 'a'` 時はエディター上で矢印領域が描画されない

### ラベル-値対応（全選択肢網羅）

- [ ] 子「区切り線タイプ」CustomSelectControl: 全 2 選択肢（'' / 'bottom'）→ 各値が `faqBorderType` に保存
- [ ] 子「ラベル表示位置」HorizonButtonSelect: 全 3 選択肢（'flex-start' / 'center' / 'flex-end'）→ 各値が `labelPosition` に保存
- [ ] 親背景色・グラデーション: WordPress標準の色パネルでプリセット色が`backgroundColor`、カスタム色が`style.color.background`、プリセットグラデーションが`gradient`、カスタムグラデーションが`style.color.gradient`へ保存される
- [ ] 親枠線: WordPress標準の枠線パネルで色・角丸・スタイル・幅が`style.border`へ保存される
- [ ] 親余白: WordPress標準のサイズパネルでmarginは上・下だけ、paddingは上・右・下・左を設定でき、`style.spacing`へ保存される
- [ ] 各種 ColorPalette（矢印／ラベル文字／ラベル背景／ラベル枠線／コンテンツ文字／コンテンツ背景／コンテンツ区切り線）: プリセットとカスタムの切替で slug / custom が正しく排他的に保存される
- [ ] ラベル文字サイズ CustomFontSizePicker: プリセット → `labelSize` に slug、カスタム → `customLabelSize` に値

### 複雑 UI

- [ ] デザインプリセット 6 種のクリック適用: 各プリセットで期待される子 attributes セット + 親 `accordionArrowColor` 同期が実行される
  - 特に `outline-square` / `outline-circle` / `bottom-divider` は複数属性一括反映が正しいこと
- [ ] ColorPalette: プリセット → カスタム → クリアの 3 段階遷移で、`xxxColor` と `customXxxColor` が排他的に保存される
- [ ] 「レスポンシブ文字設定」でフォントサイズ・文字揃えを追加し、3デバイスの値が個別に保存される
- [ ] レスポンシブ設定の項目リセット・パネル全体リセットで、対象設定だけが削除される

### 操作順序（切り替え・リセットの整合性）

- [ ] 親枠線: 全周 → 下辺のみ → 解除と切り替え、各段階で`style.border`以外の属性が変わらないことを確認
- [ ] 子 `faqBorderType`: `''` → `'bottom'` → `''` → `'bottom'` → プリセット値（1px / #eeeeee）が再設定されるか
- [ ] デザインプリセット複数連続適用: `default` → `background-square` → `outline-circle` → `bottom-divider` → 各適用で attribute が上書きされ、前プリセット由来の残骸がないこと

### RichText フォーマット・ツールバー制御

- [ ] 子の InnerBlocks に段落ブロックを追加 → 太字・斜体・リンク等の基本フォーマット適用 → 保存 → 再読込で検証エラーなし（段落ブロック本体の挙動は別途担保されるが、FAQ 親子の下でも破綻しないこと）

### テンプレート制約

- [ ] 親 FAQ ブロックを新規挿入 → デフォルトで Q + A の 2 アイテムが自動追加される
- [ ] 親 FAQ 内に別の子ブロック（段落など）を挿入しようとしても許可されない（`allowedBlocks: ['ystdtb/faq-item']`）
- [ ] `templateLock: 'all'` により、子 faq-item の追加・削除・並べ替え UI が無効化されていること

---

## L3 手動確認チェックリスト

### フロント見た目（examples/all-variations.html ベース）

- [ ] examples HTML をエディターに貼り付け → 全パターンの見た目を目視確認
- [ ] 「設定の組み合わせ例」5 パターン（基本 / アコーディオン / カード風 / 区切り線 / 背景あり丸）の見た目
- [ ] 親背景色・グラデーション × 親枠線 × ラベルスタイルの組み合わせ表示
- [ ] 親枠線の全周・下辺のみ・破線・角丸がエディターとフロントで一致する
- [ ] 親margin・paddingがフロントとエディターで同じ方向へ反映される
- [ ] デザインプリセット 6 種の見た目が意図通り
- [ ] Q / A 側で矢印の有無が正しく切り替わっている（Q のみ表示）

### レスポンシブ挙動

- [ ] 親フォントサイズがdesktop / tablet / mobileの各ビューポートで切り替わる
- [ ] 親文字揃えがdesktop / tablet / mobileの各ビューポートで切り替わる

### アコーディオン動作

- [ ] `isAccordion: true` の FAQ を公開ページで開いたとき、Q クリックで A が開閉する
- [ ] 開閉時に矢印の向きがアニメーションで回転する（CSS transform）
- [ ] 初期状態で A が閉じている
- [ ] 複数アコーディオン FAQ を並べた場合に個別に開閉できる

### 検証エラー・コンソールエラー

- [ ] examples HTML ペースト → 保存 → 再読込で検証エラーが出ないこと
- [ ] ブラウザコンソールにエラー・警告なし

### テーマとの干渉

- [ ] yStandard テーマで見た目が壊れない
- [ ] 他のブロック（見出し / 段落 / Box / カラム）と並べたときの整合性

---

## 意地悪パターン（粗探し観点）

共通観点は [docs/block-operation-test-guideline.md](../../../../../docs/block-operation-test-guideline.md#粗探しのプロ観点意地悪パターン) を参照。

FAQ ブロック固有の観点:

- **親 `accordionArrowColor` を設定した状態で `isAccordion` を off にする**: UI が消えても属性値は残る？再度 on に戻したときに以前の値が復活するか
- **親子の `accordionArrowColor` が乖離した状態**: 例えば fixture で親 only / 子 only に色を設定した場合、save 出力はどうなるか（親から子への一方向同期のみ）
- **子 `faqBorderType: 'bottom'` → `''` にクリア**: `faqBorderColor` が `setFaqBorderColor(undefined)` でクリアされる一方、`customFaqBorderColor` は残る可能性（UI コードで `setFaqBorderColor(undefined)` のみで custom 側のクリアは明示していない）
- **親の`style.border`に色だけ設定**: ブラウザ既定の枠線幅やスタイルへ意図せず変わらないか、WordPress標準パネルでの保存結果を確認する
- **親のstyle属性に`border-width`あり**: FAQ共通の`border: 0`でBlock Supportsの全周枠線が打ち消されない
- **ラベル角丸だけ設定（背景なし・枠線なし）**: `has-padding` が付かないため角丸が見た目にわからない
- **子 `faqType: 'a'` + `accordionArrowColor` 設定**: A 側は arrow div 自体を出力しないので、色設定は無効（属性は保存されるが DOM には出ない）
- **デザインプリセット適用直後に個別属性を手動変更**: プリセット復帰機能はないため、再度プリセットをクリックするまで混成状態になる
- **子ブロックをクリップボード経由で別ブロックに変換**: `parent: ['ystdtb/faq']` 制約で拒否されるか
- **ブロック複製**: 親 FAQ 全体を複製 → 内部の Q/A の clientId が独立・attributes が独立、親子の accordionArrowColor 同期が複製側でも維持される
- **ネストされた `faqType` 手動書き換え**: block.json の属性列挙には Q/A 2 値以外も設定可能（string 型）→ UI からは変更できないが、HTML 直書きで `faqType: "x"` を入れた場合の parse 挙動
- **プリセット色削除後のフォールバック**: 保存時に存在した `ys-xxx` がテーマ更新で未定義化 → フロントで色なしとして表示される挙動

---

## 補足

- 本仕様は block.json / edit.tsx / save.tsx / utils.ts / examples HTML の構造に基づく
- ブロックの仕様変更時は本仕様も更新する
- L2 / L3 セッション結果は `operation.md`（Git 管理外）に記録
- L1 fixture は `test/integration/fixtures/blocks/faq/` 配下（既存 `ystdtb__faq__deprecated-*` と同ディレクトリに追加）
- 本仕様のfixture数はおよそ60件（親faq 19 / item-type 2 / label 17 / contents 9 / preset 6 / combo 5、+ デフォルト含む概算）
