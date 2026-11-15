# FAQ Itemのスタイル設計

## 作業範囲

v2.4.0に向けて、FAQ固有のスタイル設定を`style`へ集約し、v2.3.0までの保存形式から既存の表示と内容を保って移行する。この文書はFAQ Item固有の仕様と判断理由の正本とする。部品選択・更新・リセットの共通契約は[ブロック設定の共通設計](../../../../docs/block-style-controls.md)を参照する。検証結果は`../faq/test-results/operation.md`へ分離する。

- WordPress標準設定はBlock Supportsの保存形式を維持する。`textColor`、`backgroundColor`、`gradient`、`borderColor`、`fontSize`など、コアが使うプリセット属性は独自に`style`へ移し替えない
- FAQ固有の設定は`style.ystdtb.faqItem`へ集約する。親の開閉ボタン設定は`style.ystdtb.faq`へ集約し、子への同期も合わせて変更する
- `faqType`と親の`isAccordion`は内容・動作の属性として維持する
- `core/details`など他ブロックとの相互変換は実装しない
- 既存機能を維持し、保存形式の整理と合意したレスポンシブ設定・ラベル調整を追加する
- 親FAQと開閉ボタンの実装範囲は`../faq/DESIGN.md`で管理する

`plans/faq-block-parameter-modernization.md`は初期案として扱う。相互変換、本文の保存先、ラベル文字サイズ・表示位置の保持など、初期案や従来の本書と異なる判断は本書を優先する。

## パネル構成

yStandard Blocksの【β版】カスタム見出しを参照し、通常設定を要素・用途ごとのToolsPanelへ分ける。スタイルグループの全項目は未設定時に非表示とし、追加メニューから表示する。設定済みの項目は自動表示する。アコーディオンによる二重の開閉は追加しない。

- 設定タブ：デザインサンプル。複数の属性を一括適用するFAQ固有の操作として配置する
- コアのスタイルパネル：本文の文字色・文字サイズ、Item全体の背景・枠線、本文パディング
- FAQラベル（文字）：色・フォントサイズ・フォント・外観・行の高さ・大文字小文字
- FAQラベル（背景）：背景色
- FAQラベル（枠線）：枠線と角丸。枠線は幅・色・線種をひとつのコア入力で扱う
- FAQラベル（余白）：上下マージンとラベル・本文の間隔
- FAQラベル（サイズ）：幅・高さに共通のラベルサイズ
- レスポンシブ5パネル：後述の順序で配置

ysアイコンはレスポンシブ5パネルだけに表示する。通常のラベルサイズも追加メニューから表示する。

本文パディングはコアの`supports.spacing.padding`を使い、`style.spacing.padding`へ保存する。外側への自動出力を止め、`.ystdtb-faq-item__contents`へ編集・保存の両方で出力する。ラベル・矢印・Q/A行全体には適用しない。コアのパネル名・プリセット・単位・リセット操作をそのまま使う。

UI構成の参照元は、プロジェクトルート基準で`../ystandard-blocks/src/blocks/block-library/custom-heading/inspector-controls/styles/element-styles/index.tsx`と、同プロジェクトの`src/aktk-block-components/components/element-style-controls/`。初期表示・保存・解除はToolboxの共通設計に従う。

## 実装状況

- 保存形式のstyle集約、v2.3.0／v1からの変換、親子同期は実装済み
- 通常・端末別値の併存、本文だけへのパディング、ラベルサイズ・間隔・上下マージンは実装済み
- パネル構成・初期表示・アイコン・本文パディングの標準化は実装済み
- 本文・ラベルのレスポンシブ文字設定のモード切替ラッパー廃止は実装済み。共有パネルの利用は詳細確認後に進める未対応項目として分ける

保存済みのリリース形式を維持し、UIの整理だけを理由にdeprecatedを追加しない。開発中の独自本文パディングは標準保存先へ整理し、exampleとfixtureも合わせる。過去の実装状態・合格件数は設計へ混在させず、検証記録へ分離する。

## パネル実装の整理

共通設計のaktk-component化とファイル分離の規約に対する適合状況と未対応項目を整理する。

- 現状：`inspector-controls/styles/`の各ファイルでToolsPanelと入力を組み立てている。共有化されているのは主に入力部品であり、パネル単位のaktk-component化は未対応
- 実装済み：本文・ラベルのレスポンシブ文字設定は、それぞれの入口ファイルで値の取得・更新・個別解除・全解除を扱う。`element`で切り替えるラッパーは廃止し、共有入力の`ResponsiveFontSizeControl`を直接利用する
- 目標：独自パネルのUIと入力の組み立てを、用途別の共有パネルへ移す。ブロック側の各入口は保存値との接続、翻訳名、ID、配置を担当する。コアの本文パディングは標準UIを維持する
- 次段階：パネル全体のaktk-component化は詳細を確認してから実装する。共有パネルとpropsの契約は、その段階で決める
- 互換性：パネルの配置・保存先・既定値・CSSの適用先・旧形式からの変換を維持する。共有化だけを理由に属性や保存HTMLを変更しない
- 確認項目：初期非表示、設定済み項目の表示、追加、個別解除、全解除、通常値・他端末・他パネルの保持、fixtureの保存結果を確認する

パネル全体のaktk-component化は未対応の実装項目として管理し、ラッパー廃止だけで対応済みにしない。

## 標準設定の適用先

文字色はコアの`supports.color.text`を使い、プリセットを`textColor`、カスタム色を`style.color.text`へ保存する。タイポグラフィパネル内での表示はWordPress側のUIに従う。

`selectors.color.root`は`.ystdtb-faq-item`、`selectors.color.text`は`.ystdtb-faq-item__contents`を指定する。個別設定は`__experimentalSkipSerialization: ["text"]`で外側への自動出力を止め、編集時はコアの`useColorProps`、保存時は本文用のクラス・スタイル生成処理で本文へ出力する。背景・ラベル・開閉ボタンの設定には混ぜない。

タイポグラフィはコアの`supports.typography`を使い、FAQコンテンツへ適用する。フォントサイズのプリセットを`fontSize`、カスタム値を`style.typography.fontSize`へ保存する。`__experimentalSkipSerialization: ["fontSize"]`でItem本体への自動出力を止め、`getTypographyClassesAndStyles`で生成したクラスとスタイルを`.ystdtb-faq-item__contents`へ出力する。`selectors.typography`にも同じコンテンツ要素を指定する。

## 旧設定からの移行

背景色・グラデーションは`supports.color.background`と`supports.color.gradients`で有効にし、外側の`.ystdtb-faq-item`へ標準出力する。本文文字色だけを出力先変更の対象にするため、背景はラベルを含むItem全体に適用される。背景付きItemの上下左右の余白1.25remはグラデーションにも適用する。

`faqBackgroundColor`は`backgroundColor`、`customFaqBackgroundColor`は`style.color.background`へ移行する。旧背景はプリセット指定時にカスタム色を出力しないため、その優先順を維持する。背景と文字色の移行は同じdeprecatedで行う。

v2.3.0の属性と保存処理を`deprecated/2.3.0/`に固定する。`faqTextColor`を`textColor`、`customFaqTextColor`を`style.color.text`へ移し、旧属性を除去する。他の設定と子ブロックは保持する。

文字色以外の改修もv2.4.0リリースまで同じdeprecatedへまとめる。v1のdeprecatedからも現行形式へ直接移行する。

### 互換性の維持方針

- v2.3.0のattributes・supports・saveと、v1の旧HTML再現処理を固定し、現行の保存処理変更で旧形式の判定を壊さない
- 各deprecatedから最終的な現行形式へ直接変換する。deprecatedの連鎖は前提にしない
- 未リリースのv2.4.0改修途中の形式ごとにdeprecatedを増やさない
- 移行先に値がある場合はその値を保持し、旧属性は不足する値の補完にだけ使う
- プリセットとカスタム値の両方がある旧データは、各世代の保存処理とCSSを確認し、旧表示の優先順位を維持する
- v1の数値による枠線幅・角丸は必要な`px`を補う。単位付きの値は維持する
- 未設定と`0`を一律に同一視せず、旧表示で有効な値を保持する。旧表示で線が出ていなかった設定から新たに枠線を出さない
- 変換済みの旧独自属性は移行結果から除去する。現行の属性定義に判定用として残す必要があるかはfixtureで確認し、残す場合も現行UIの保存先にはしない
- `faqType`、親の開閉状態、Q/AのInnerBlocksと順序を保持する。再保存前の投稿に必要な旧CSSも維持する
- 個別設定の更新・リセットでは他の設定を保持し、空になった階層は`stripUndefined()`で除去する

## FAQ行の縦余白

v2.4.0では、装飾のないQ/A行の上下paddingを0.5remにする。親FAQまたはItem自身に背景・グラデーション・枠線がある場合は、行の上下左右を1.25remにする。背景・グラデーションはBlock Supportsが出力する`has-background`を利用し、枠線は`hasFaqBorder()`で設定値を判定して`has-border`を出力する。編集・保存の両方で同じクラス判定を使い、CSSでstyle属性の文字列を調べない。

枠線は全周幅と各辺の上書きを合成し、いずれかの辺に0以外の幅がある場合を対象にする。幅0、色や角丸だけ、ラベルだけの背景・枠線では行余白を増やさない。既存の枠線リセットも`has-border`の有無で判定する。

Qの下側・Aの上側だけを詰めたり戻したりする補正は設けず、編集画面も同じ行余白を使う。本文の通常・レスポンシブpaddingは内側の本文要素へ適用するため、この行余白とは独立する。

閉じたAは非表示にするため上下paddingを0にし、開いたときと編集画面では共通の縦余白を使う。この処理はQ/A間隔の調整とは区別する。

ラベル間隔と閉じたAの余白制御は、親・対象要素の条件を`:where()`で囲み、詳細度0,1,0で扱う。閉じたAの余白は行の基本スタイルより後に指定し、`!important`による上書きは行わない。

行余白は互換維持の対象から外す仕様変更とする。旧投稿も再保存の有無にかかわらず新しい余白を使い、以前の間隔を再現する条件付きCSSやdeprecatedは追加しない。

`has-border`は現行の保存HTMLにも出力する。v2.3以前のdeprecated saveは固定し、移行後の保存で新しいクラスを付ける。未リリースのv2.4開発中の形式向けdeprecatedは追加せず、現行形式のfixtureと確認投稿を新しいクラスへ揃える。

## ラベル表示位置

ラベル表示位置は引き続きブロックツールバーの`BlockVerticalAlignmentToolbar`で設定する。保存先を`labelPosition`から`style.ystdtb.faqItem.item.layout.alignItems`へ変更し、上・中央・下を`flex-start` / `center` / `flex-end`で扱う。未指定時は従来どおり中央とする。旧値は既存のdeprecatedで変換する。

## ラベル文字設定

ラベル文字色・文字サイズ・フォント・外観・行の高さ・大文字小文字は、スタイルグループに独自の`ToolsPanel`「FAQラベル（文字）」を表示して設定する。すべての項目を初期非表示とし、必要なものを追加メニューから表示する。

文字色は`style.ystdtb.faqItem.label.color.text`へ保存する。プリセット色は`var:preset|color|{slug}`形式、カスタム色はCSSカラー値を保存し、FAQラベルだけに出力する。プリセット色とカスタム色を同じ属性で管理することで、コントロールの切り替えとリセットを一つの設定として扱う。

フォントサイズは`style.ystdtb.faqItem.label.typography.fontSize`へ統合する。プリセットは`var:preset|font-size|{slug}`、カスタム値は単位付き文字列で保存する。既存の`labelSize`と`customLabelSize`はdeprecatedで変換する。

外観はWordPressの`FontAppearanceControl`を使い、ウェイトとスタイルを`style.ystdtb.faqItem.label.typography`へ保存する。従来の「太字にする」トグルは表示しない。未指定時は既存CSSの`font-weight: 700`を維持する。

フォントはプリセットを`var:preset|font-family|{slug}`形式で`fontFamily`へ保存し、出力時にCSSカスタムプロパティへ変換する。行の高さは`lineHeight`、大文字小文字は`textTransform`へ保存する。未指定時は既存CSSの`line-height: 1`と`text-transform: uppercase`を維持する。いずれも新規設定のためdeprecatedは追加しない。

コアのタイポグラフィはFAQコンテンツ専用とし、ラベル設定とは混ぜない。ラベルの文字設定はβ版カスタム見出しの「サブテキスト（文字）」と同様に、対象要素名を付けた独自パネルとして拡張する。

v2.3.0の`labelColor`はプリセットトークン、`customLabelColor`はカスタム色として同じ2.3.0のdeprecatedで新しい文字色へ変換する。両方がある場合は従来の表示と同じくプリセット色を優先する。

v2.3.0の`labelBold: false`は同じ2.3.0のdeprecatedで`fontStyle: "normal"`と`fontWeight: "400"`へ変換する。WordPressの外観コントロールはスタイルとウェイトの組み合わせで選択肢を判定するため、両方を保存して「標準」を選択状態にする。`labelBold: true`は既定の太字表示を維持し、旧属性を移行結果に残さない。ラベル関連の旧独自属性は現行の属性定義から除去した。旧形式はdeprecated側の属性定義と`isEligible`で判定する。

## ラベル背景・枠線

保存先は`style.ystdtb.faqItem.label`配下とする。

- `labelBackgroundColor` / `customLabelBackgroundColor` → `color.background`
- `labelBorderColor` / `customLabelBorderColor` → `border.color`
- `labelBorderSize` → `border.width`
- `labelBorderRadius` → `border.radius`

色のプリセットは`var:preset|color|{slug}`へ統合する。枠線の線種は旧表示の再現に必要な場合に`border.style: "solid"`を補う。背景や枠線に伴うラベルの自動余白、角丸、既存クラスによる表示は維持し、新形式でも同じ見た目になるよう出力する。

## レスポンシブ設定とラベル調整

### パネルの責任

レスポンシブパネルは次の順に配置し、各パネルは端末別設定だけを扱う。通常入力の変更・解除と端末別入力の変更・解除は独立させる。

- レスポンシブ文字設定：本文文字サイズ。親FAQと同じ`ResponsiveFontSizeControl`
- レスポンシブ余白：本文内側余白。`ResponsiveSpacingControl`で上下左右を扱う
- レスポンシブラベル文字設定：ラベル文字サイズ。`ResponsiveFontSizeControl`
- レスポンシブラベル余白：ラベル上下マージンとラベル・本文の間隔。前者は`ResponsiveSpacingControl`、後者は端末アイコン付きの単一長さ入力
- レスポンシブサイズ：ラベルの幅・高さに共通の値。端末アイコン付きの単一長さ入力

通常のラベルサイズは「FAQラベル（サイズ）」、通常のマージンと本文との間隔は「FAQラベル（余白）」で扱う。通常の本文パディングはコアのパネルで扱う。すべて未設定時は初期非表示とし、設定済みなら表示する。通常パネルを先、指定順の5つのレスポンシブパネルを後に置く。

単一長さ入力の`styles/components/responsive-length-control/index.tsx`は、共有の`UnitControl`・`IconUnitControl`とFAQ側の更新処理を接続する内部部品とする。通常値を解除する動作を持つ`CustomSizeControl`へ置き換えない。端末別の余白・文字サイズを独自実装で複製しない。

### 適用先と保存先

通常値に加えてPC・タブレット・モバイルの独立した上書き値を設定する。各端末の未設定値は通常値へ戻り、他端末の値は引き継がない。本文文字サイズは子の端末別設定、子の標準設定、親からの継承の順で適用する。

- 本文文字サイズ：通常値はコア属性のまま、端末別値は`style.ystdtb.faqItem.contents.responsive.typography.fontSize`
- ラベル文字サイズ：通常値は`label.typography.fontSize`、端末別値は`label.responsive.typography.fontSize`
- 本文内側余白：通常値は`style.spacing.padding`、端末別値は`contents.responsive.spacing.padding`。上下左右を設定し、本文要素だけに適用する。ラベル・開閉ボタン・Q/A行自体の余白は変更しない
- ラベルと本文の間隔：通常値は`item.spacing.gap`、端末別値は`item.responsive.spacing.gap`。開閉ボタンの間隔は変更しない
- ラベルサイズ：通常値は`label.dimensions.size`、端末別値は`label.responsive.dimensions.size`。ひとつの値を幅・高さへ適用し、枠線込みの正方形として扱う。縮小させず文字は中央に置く。文字サイズの自動調整はしない
- ラベル外側余白：通常値は`label.spacing.margin`、端末別値は`label.responsive.spacing.margin`。上下のみ、負の値を許可する。左右方向はラベルと本文の間隔で設定する

`style.spacing.padding`以外の省略パスは`style.ystdtb.faqItem`配下を表す。通常値と端末別値は併存する。リセットの対象は共通契約に従い、レスポンシブパネルからは通常値を除去しない。サイズ・間隔・内側余白は負の値を許可しない。

ラベル外側余白は上揃えと組み合わせて本文の先頭行に合わせる用途とする。本文の行数による自動切替は行わない。サイズ未指定時は背景・枠線による従来の自動サイズを維持する。

レスポンシブ値は対象要素にCSSカスタムプロパティとして保存し、PHPの共通ブレークポイントで編集画面・フロント両方に適用する。ラベルサイズと間隔はpx・em・remの単位を使い、幅と高さの基準が異なる百分率は提供しない。閉じた回答は本文の通常・端末別パディングを含めて非表示にし、行の高さ・上下余白を残さない。編集画面では従来どおり回答を常時表示して余白を確認できる。間隔の0はCSSの長さ計算に使える`0px`へ変換する。

新機能を未設定の場合は既存の保存HTML・表示を維持する。追加機能だけのdeprecatedは増やさず、旧ラベル属性の変換は既存のv2.3.0／v1の移行に統合する。

## 開閉ボタンと親子同期

- 親の`accordionArrowColor` / `customAccordionArrowColor`は`style.ystdtb.faq.arrow.color.text`へ統合する
- 子の同名属性は`style.ystdtb.faqItem.arrow.color.text`へ統合する
- プリセット色は`var:preset|color|{slug}`、カスタム色はCSSカラー値で保存する
- 追加済みの余白は親子それぞれの`arrow.spacing.margin`を維持する

静的保存に必要な親から子への同期は維持する。親UIで色・余白を変更またはリセットしたとき、子の該当設定だけを更新し、本文・ラベル・背景・枠線など他の`style`を上書きしない。旧データは親子それぞれのdeprecatedで変換し、移行時に保存済みの子の設定を一律に親の値で上書きしない。

## 実装対象

- `faq-item/`の属性定義・型・編集UI・スタイル生成・保存処理
- `faq-item/deprecated/`の現行形式への変換処理
- `faq/`の開閉ボタン色・親子同期・deprecatedと関連する型・属性定義
- デザインプリセット、example、unit test、`test/integration/fixtures/blocks/faq/`とFAQ専用integration test

パスは`src/blocks/block-library/`を基準とし、`test/`のみプロジェクトルートを基準とする。デザインプリセットを連続適用しても以前の対象設定が残らないよう、設定とリセットを新保存先にそろえる。主要クラス、Q/A構造、フロントの開閉処理は維持する。

## 実装の責任分担

- `block.json`・`types.ts`：属性と保存構造。旧属性はdeprecated側で扱う
- `inspector-controls/styles/`：パネルごとの入口と、保存値の取得・更新・解除。現行のUI組み立ては「パネル実装の整理」の次段階で扱う
- `src/aktk-block-components/components/`：移行先の共有パネル。特定ブロックの保存パスや親子同期を含めない（このパスのみプロジェクトルート基準）
- `style-utils.ts`：他要素を保持する更新と端末別CSSカスタムプロパティの組み立て。UI表示やブレークポイントを持たない
- `utils.ts`：保存値からItem・本文・ラベル・開閉ボタンそれぞれのクラス・スタイルへ変換する
- `index.php`：共通ヘルパーによる端末条件の配信。編集画面とフロントで同じ値を使う
- `style.scss`：既定の表示、要素間の間隔、旧投稿を表示するための互換CSS
- `deprecated/`：世代ごとの旧HTMLの再現と現行保存形式への変換

PHPのレスポンシブCSSは、文字サイズ・本文内側余白・ラベル外側余白と間隔・ラベルサイズの順に処理を分ける。異なる用途をひとつの設定配列へ集約せず、辺別の余白など同じ用途の繰り返しだけをループで扱う。端末名は処理のループに直接記述する。

セレクターは`.ystdtb-faq-item`から始め、本文・ラベルは直下の子要素を`:where()`で指定する。端末別値の有無も`:where()`内で判定し、詳細度を0,1,0に保つ。既存のCSSカスタムプロパティ名・端末範囲・適用するプロパティは維持する。

保存先や適用要素を変えるときは、型・編集UI・リセット・保存HTML・PHPのセレクター・fixtureをまとめて確認する。パネル名の変更だけで対象要素が変わったことにしない。

## 完了条件と検証

- 現行UI・プリセット・exampleが新しい保存先を使い、移行対象の旧独自属性を新規保存しない
- v2.3.0とv1それぞれのfixtureでparse・migrate・serializeを確認し、HTMLの一致だけでなく旧属性の除去とInnerBlocksの保持を確認する
- プリセット／カスタム／未設定／有効な0、旧新設定の併存、親子同期、個別リセット、プリセット連続適用を関連するunit test・integration testで確認する
- fixture更新時は入力HTML・`.parsed.json`・`.json`・`.serialized.html`を確認する
- 関連するlint・build・テストと`git diff --check`を許可範囲で実行する
- ブラウザ確認は明示許可後に行い、編集画面とフロントの表示、保存再読込、開閉動作を確認する。未実施の場合はその範囲を報告する

## 検証の参照先

- 更新・リセット：該当するパネル配下の`test/`。通常値・他端末・他設定の保持を検証する
- 保存・変換：`test/integration/blocks/faq/`と`test/integration/fixtures/blocks/faq/`。入力HTML・parse生出力・移行後構造・再保存HTMLを確認する
- 実サイト由来の旧形式：`test/integration/fixtures/live/faq/`。FAQ専用テストで段落と矢印SVGを登録し、全ブロックの有効性・本文保持・再保存を確認する
- 手動検証の仕様：`../faq/test-results/spec.md`
- 実行結果・未検証範囲：`../faq/test-results/operation.md`

この文書には合格件数や一時的な投稿IDを複製しない。仕様変更時は関連する検証仕様も更新し、以前の検証結果を変更後の仕様の合格証拠として流用しない。
