# FAQ Itemのスタイル保存形式と旧形式からの移行

## 作業範囲

v2.4.0に向けて、FAQ固有のスタイル設定を`style`へ集約し、v2.3.0までの保存形式から既存の表示と内容を保って移行する。この文書を今後の設計・進捗の更新先とする。

- WordPress標準設定はBlock Supportsの保存形式を維持する。`textColor`、`backgroundColor`、`gradient`、`borderColor`、`fontSize`など、コアが使うプリセット属性は独自に`style`へ移し替えない
- FAQ固有の設定は`style.ystdtb.faqItem`へ集約する。親の開閉ボタン設定は`style.ystdtb.faq`へ集約し、子への同期も合わせて変更する
- `faqType`と親の`isAccordion`は内容・動作の属性として維持する
- `core/details`など他ブロックとの相互変換は実装しない
- 現在の設定UIと追加済み機能は維持し、保存形式の整理に必要な変更に限定する
- 「移行予定」の項目は未実装とし、親FAQと開閉ボタンの実装範囲は`../faq/DESIGN.md`で管理する

`plans/faq-block-parameter-modernization.md`は初期案として扱う。相互変換、本文の保存先、ラベル文字サイズ・表示位置の保持など、初期案や従来の本書と異なる判断は本書を優先する。

## 引き継ぎ時点の状態

- 実装済み：本文の文字色・文字サイズ、Item全体の背景・グラデーション・枠線の標準設定化
- 実装済み：ラベル文字色・外観・フォント・行の高さ・大文字小文字の`style`保存、開閉ボタン色・余白の`style`保存と親子同期・リセット・旧形式からの変換
- 移行予定：ラベル表示位置・文字サイズ・背景色・枠線・角丸
- 更新予定：旧形式からの変換、デザインプリセット・example・テストの保存値と期待値

## 標準設定の適用先

文字色はコアの`supports.color.text`を使い、プリセットを`textColor`、カスタム色を`style.color.text`へ保存する。タイポグラフィパネル内での表示はWordPress側のUIに従う。

`selectors.color.root`は`.ystdtb-faq-item`、`selectors.color.text`は`.ystdtb-faq-item__contents`を指定する。個別設定は`__experimentalSkipSerialization: ["text"]`で外側への自動出力を止め、編集時はコアの`useColorProps`、保存時は本文用のクラス・スタイル生成処理で本文へ出力する。背景・ラベル・開閉ボタンの設定には混ぜない。

タイポグラフィはコアの`supports.typography`を使い、FAQコンテンツへ適用する。フォントサイズのプリセットを`fontSize`、カスタム値を`style.typography.fontSize`へ保存する。`__experimentalSkipSerialization: ["fontSize"]`でItem本体への自動出力を止め、`getTypographyClassesAndStyles`で生成したクラスとスタイルを`.ystdtb-faq-item__contents`へ出力する。`selectors.typography`にも同じコンテンツ要素を指定する。

## 旧設定からの移行

背景色・グラデーションは`supports.color.background`と`supports.color.gradients`で有効にし、外側の`.ystdtb-faq-item`へ標準出力する。本文文字色だけを出力先変更の対象にするため、背景はラベルを含むItem全体に適用される。`has-background`による既存の自動余白はグラデーションにも適用する。

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

## ラベル表示位置

ラベル表示位置は引き続きブロックツールバーの`BlockVerticalAlignmentToolbar`で設定する。保存先を`labelPosition`から`style.ystdtb.faqItem.item.layout.alignItems`へ変更し、上・中央・下を`flex-start` / `center` / `flex-end`で扱う。未指定時は従来どおり中央とする。旧値は既存のdeprecatedで変換する。

## ラベル文字設定

ラベル文字色・文字サイズ・フォント・外観・行の高さ・大文字小文字は、スタイルグループに独自の`ToolsPanel`「FAQラベル（文字）」を表示して設定する。文字色とフォントサイズは初期表示し、それ以外は必要な場合だけ追加できるようにする。

文字色は`style.ystdtb.faqItem.label.color.text`へ保存する。プリセット色は`var:preset|color|{slug}`形式、カスタム色はCSSカラー値を保存し、FAQラベルだけに出力する。プリセット色とカスタム色を同じ属性で管理することで、コントロールの切り替えとリセットを一つの設定として扱う。

フォントサイズは`style.ystdtb.faqItem.label.typography.fontSize`へ統合する。プリセットは`var:preset|font-size|{slug}`、カスタム値は単位付き文字列で保存する。既存の`labelSize`と`customLabelSize`はdeprecatedで変換する。

外観はWordPressの`FontAppearanceControl`を使い、ウェイトとスタイルを`style.ystdtb.faqItem.label.typography`へ保存する。従来の「太字にする」トグルは表示しない。未指定時は既存CSSの`font-weight: 700`を維持する。

フォントはプリセットを`var:preset|font-family|{slug}`形式で`fontFamily`へ保存し、出力時にCSSカスタムプロパティへ変換する。行の高さは`lineHeight`、大文字小文字は`textTransform`へ保存する。未指定時は既存CSSの`line-height: 1`と`text-transform: uppercase`を維持する。いずれも新規設定のためdeprecatedは追加しない。

コアのタイポグラフィはFAQコンテンツ専用とし、ラベル設定とは混ぜない。ラベルの文字設定はβ版カスタム見出しの「サブテキスト（文字）」と同様に、対象要素名を付けた独自パネルとして拡張する。

v2.3.0の`labelColor`はプリセットトークン、`customLabelColor`はカスタム色として同じ2.3.0のdeprecatedで新しい文字色へ変換する。両方がある場合は従来の表示と同じくプリセット色を優先する。

v2.3.0の`labelBold: false`は同じ2.3.0のdeprecatedで`fontStyle: "normal"`と`fontWeight: "400"`へ変換する。WordPressの外観コントロールはスタイルとウェイトの組み合わせで選択肢を判定するため、両方を保存して「標準」を選択状態にする。`labelBold: true`は既定の太字表示を維持し、旧属性を移行結果に残さない。`labelColor`、`customLabelColor`、`labelBold`の現行属性定義は現在判定用に残っているため、削除可否を旧形式のfixtureで確認する。

## ラベル背景・枠線

保存先は`style.ystdtb.faqItem.label`配下とする。

- `labelBackgroundColor` / `customLabelBackgroundColor` → `color.background`
- `labelBorderColor` / `customLabelBorderColor` → `border.color`
- `labelBorderSize` → `border.width`
- `labelBorderRadius` → `border.radius`

色のプリセットは`var:preset|color|{slug}`へ統合する。枠線の線種は旧表示の再現に必要な場合に`border.style: "solid"`を補う。背景や枠線に伴うラベルの自動余白、角丸、既存クラスによる表示は維持し、新形式でも同じ見た目になるよう出力する。

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

## 確認項目

- 標準枠線はFAQ Item全体に適用し、全周・辺別の色／幅／線種と角丸を設定できる
- 標準タイポグラフィの文字サイズはFAQコンテンツだけに適用され、Item全体とラベルには出力されない
- 独自のラベル文字色はラベルだけに適用され、FAQコンテンツには出力されない
- 独自のラベル文字サイズはラベルだけに適用され、FAQコンテンツには出力されない
- ラベルの外観はウェイトとスタイルを指定でき、ラベルだけに適用される
- ラベルのフォント・行の高さ・大文字小文字はラベルだけに適用され、個別リセットで他の文字設定を保持する
- 旧下区切り線は同じv2.3.0のdeprecatedで`style.border.bottom`へ変換する。幅0・幅未設定・枠線なしは線を追加しない
- 旧ラベル表示位置・文字サイズ・背景・枠線・角丸が新しい`style`へ移り、見た目を維持する
- 旧`labelColor`と`customLabelColor`は新しいラベル文字色へ変換され、両方がある場合はプリセット色が優先される
- 旧`labelBold: false`はラベルの`fontStyle: "normal"`と`fontWeight: "400"`へ変換され、外観に「標準」と表示される
- 旧プリセット色を優先し、本文色・背景・ラベル・子ブロックを保持する
- 旧`.has-border-bottom`用CSSは`style.scss`末尾の非推奨コメント内に残す。エディターも共通CSSを利用する
- デザインサンプルは標準枠線を更新し、標準枠線コントロールは初期表示しない

- プリセット色・カスタム色・未設定で本文だけに文字色が出力される
- ラベルと開閉ボタンの色は独立して維持される
- v2.3.0とv1の色設定が移行でき、再保存・再読み込みで検証エラーにならない
- 色のリセット後も背景やラベルなどの設定は残る

## 完了条件と検証

- 現行UI・プリセット・exampleが新しい保存先を使い、移行対象の旧独自属性を新規保存しない
- v2.3.0とv1それぞれのfixtureでparse・migrate・serializeを確認し、HTMLの一致だけでなく旧属性の除去とInnerBlocksの保持を確認する
- プリセット／カスタム／未設定／有効な0、旧新設定の併存、親子同期、個別リセット、プリセット連続適用を関連するunit test・integration testで確認する
- fixture更新時は入力HTML・`.parsed.json`・`.json`・`.serialized.html`を確認する
- 関連するlint・build・テストと`git diff --check`を許可範囲で実行する
- ブラウザ確認は明示許可後に行い、編集画面とフロントの表示、保存再読込、開閉動作を確認する。未実施の場合はその範囲を報告する
