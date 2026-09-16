# FAQ Itemの標準スタイルとラベル文字サイズ設定

## 標準設定の適用先

文字色はコアの`supports.color.text`を使い、プリセットを`textColor`、カスタム色を`style.color.text`へ保存する。タイポグラフィパネル内での表示はWordPress側のUIに従う。

`selectors.color.root`は`.ystdtb-faq-item`、`selectors.color.text`は`.ystdtb-faq-item__contents`を指定する。個別設定は`__experimentalSkipSerialization: ["text"]`で外側への自動出力を止め、編集時はコアの`useColorProps`、保存時は本文用のクラス・スタイル生成処理で本文へ出力する。背景・ラベル・開閉ボタンの設定には混ぜない。

タイポグラフィはコアの`supports.typography`を使い、FAQコンテンツへ適用する。フォントサイズのプリセットを`fontSize`、カスタム値を`style.typography.fontSize`へ保存する。`__experimentalSkipSerialization: ["fontSize"]`でItem本体への自動出力を止め、`getTypographyClassesAndStyles`で生成したクラスとスタイルを`.ystdtb-faq-item__contents`へ出力する。`selectors.typography`にも同じコンテンツ要素を指定する。

## 旧設定からの移行

背景色・グラデーションは`supports.color.background`と`supports.color.gradients`で有効にし、外側の`.ystdtb-faq-item`へ標準出力する。本文文字色だけを出力先変更の対象にするため、背景はラベルを含むItem全体に適用される。`has-background`による既存の自動余白はグラデーションにも適用する。

`faqBackgroundColor`は`backgroundColor`、`customFaqBackgroundColor`は`style.color.background`へ移行する。旧背景はプリセット指定時にカスタム色を出力しないため、その優先順を維持する。背景と文字色の移行は同じdeprecatedで行う。

v2.3.0の属性と保存処理を`deprecated/2.3.0/`に固定する。`faqTextColor`を`textColor`、`customFaqTextColor`を`style.color.text`へ移し、旧属性を除去する。他の設定と子ブロックは保持する。

文字色以外の改修もv2.4.0リリースまで同じdeprecatedへまとめる。v1のdeprecatedからも現行形式へ直接移行する。

## ラベル表示位置

ラベル表示位置はブロックツールバーの縦位置コントロールで設定する。コアの`BlockVerticalAlignmentToolbar`をグループブロックと同じドロップダウン形式で表示し、上・中央・下を既存の`labelPosition`属性（`flex-start` / `center` / `flex-end`）へ保存する。属性と保存形式は変更しないため、deprecatedは追加しない。

## ラベル文字サイズ

ラベル文字サイズは、スタイルグループに独自の`ToolsPanel`「FAQラベル（文字）」を表示して設定する。フォントサイズは初期表示し、プリセットを`labelSize`、カスタム値を`customLabelSize`へ保存する。

コアのタイポグラフィはFAQコンテンツ専用とし、ラベル設定とは混ぜない。ラベルの文字設定はβ版カスタム見出しの「サブテキスト（文字）」と同様に、対象要素名を付けた独自パネルとして拡張する。

既存の`labelSize`と`customLabelSize`をそのまま利用するため、ラベル文字サイズのdeprecatedや属性変換は追加しない。

## 確認項目

- 標準枠線はFAQ Item全体に適用し、全周・辺別の色／幅／線種と角丸を設定できる
- 標準タイポグラフィの文字サイズはFAQコンテンツだけに適用され、Item全体とラベルには出力されない
- 独自のラベル文字サイズはラベルだけに適用され、FAQコンテンツには出力されない
- 旧下区切り線は同じv2.3.0のdeprecatedで`style.border.bottom`へ変換する。幅0・幅未設定・枠線なしは線を追加しない
- 旧ラベル文字サイズは属性変換なしで引き続き利用できる
- 旧プリセット色を優先し、本文色・背景・ラベル・子ブロックを保持する
- 旧`.has-border-bottom`用CSSは`style.scss`末尾の非推奨コメント内に残す。エディターも共通CSSを利用する
- デザインサンプルは標準枠線を更新し、標準枠線コントロールは初期表示しない

- プリセット色・カスタム色・未設定で本文だけに文字色が出力される
- ラベルと開閉ボタンの色は独立して維持される
- v2.3.0とv1の色設定が移行でき、再保存・再読み込みで検証エラーにならない
- 色のリセット後も背景やラベルなどの設定は残る
