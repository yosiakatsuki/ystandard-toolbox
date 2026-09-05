# FAQ Itemの本文文字色

## 標準設定の適用先

文字色はコアの`supports.color.text`を使い、プリセットを`textColor`、カスタム色を`style.color.text`へ保存する。タイポグラフィパネル内での表示はWordPress側のUIに従う。

`selectors.color.text`は`.ystdtb-faq-item__contents`を指定する。個別設定は`__experimentalSkipSerialization: ["text"]`で外側への自動出力を止め、編集時はコアの`useColorProps`、保存時は本文用のクラス・スタイル生成処理で本文へ出力する。背景・ラベル・開閉ボタンの設定には混ぜない。

## 旧設定からの移行

v2.3.0の属性と保存処理を`deprecated/2.3.0/`に固定する。`faqTextColor`を`textColor`、`customFaqTextColor`を`style.color.text`へ移し、旧属性を除去する。他の設定と子ブロックは保持する。

文字色以外の改修もv2.4.0リリースまで同じdeprecatedへまとめる。v1のdeprecatedからも現行形式へ直接移行する。

## 確認項目

- プリセット色・カスタム色・未設定で本文だけに文字色が出力される
- ラベルと開閉ボタンの色は独立して維持される
- v2.3.0とv1の色設定が移行でき、再保存・再読み込みで検証エラーにならない
- 色のリセット後も背景やラベルなどの設定は残る
