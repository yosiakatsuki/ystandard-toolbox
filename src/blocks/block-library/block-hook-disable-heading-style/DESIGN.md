# ブロック拡張：見出しデザイン無効化

## 概要

見出しタグを使用するブロック単位で、yStandard Toolboxの「見出しデザイン編集」が生成したスタイルを無効化する。

既存の`is-clear-style`はテーマやブロック側の見出しスタイル制御にも使われているため変更せず、Toolbox専用の状態クラスを追加する。

## 対象ブロック

初期状態では次のブロックを対象とする。

- `core/heading`
- `core/post-title`

`ystdb/custom-heading`と`ystdb/heading`には見出しデザイン編集のCSSが適用されないため、初期対象には含めない。

対象ブロックは次のフックで拡張できる。

- JavaScript: `yStandardToolbox.disableHeadingStyle.targetBlocks`
- PHP: `ystdtb_disable_heading_style_target_blocks`

JavaScriptフックはエディターUIと保存HTML、PHPフックはサーバー側のブロック属性登録に使用する。対象を追加する連携機能では、エディターとサーバーの判定を揃えるため両方へ同じブロック名を追加する。

## 保存仕様

専用のboolean属性は追加せず、WordPress標準の追加CSSクラスと同じ`className`属性を状態の正本とする。

- 状態クラス: `is-ystdtb-heading-style-disabled`
- クラスあり: Toolboxの見出しデザインを無効化
- クラスなし: Toolboxの見出しデザインを適用

初期対象の`core/heading`と`core/post-title`はWordPress標準のカスタムクラス処理を利用する。

フックで追加されたブロックが`supports.className`を無効にしている場合にも対応できるよう、対象ブロックへ`className`属性を追加し、`blocks.getSaveContent.extraProps`で保存HTMLのルート要素へ状態クラスを追加する。標準の「追加CSSクラス」入力欄は有効化しない。

エディター内では`editor.BlockListBlock`を使い、見出しタグ自身またはその祖先へ状態クラスが付くようにする。

## 設定UI

ブロック設定サイドバーへ、既存の「非表示設定（画面サイズ）」と同じブロック拡張方式で追加する。

- パネル名: `見出しデザイン`
- トグル名: `Toolboxの見出しデザインを無効化`
- 説明テキスト: なし

UIは`BlockHookPanel`とaktk-componentsの`ToggleControl`を使用する。

## CSS除外仕様

状態クラス自身と、状態クラスを持つラッパー内の見出し要素を除外する。

```css
:not(:where(.is-ystdtb-heading-style-disabled)):not(:where(.is-ystdtb-heading-style-disabled *))
```

下位互換モードの既存CSS生成処理がカンマでセレクターを分割するため、状態クラス自身と子孫の除外条件を連結し、除外条件内ではカンマを使用しない。

次のCSS生成経路へ同じ除外条件を追加する。

- 見出しレベルに割り当てた自動スタイル
- ブロックスタイルとして選択した見出しスタイル
- 投稿タイトル・固定ページタイトル
- 疑似要素
- レスポンシブスタイル
- 下位互換モード

除外条件はPHPのヘルパーへ集約し、通常モードと下位互換モードで共用する。

## テスト方針

- 初期対象2ブロックとJavaScriptフックによる対象追加
- `className`への状態クラス追加・削除と他クラスの保持
- 対象ブロックだけに保存用クラスを追加
- PHPフックによる対象追加と`className`属性登録
- 通常モードと下位互換モードのCSSセレクター
- 投稿タイトル・固定ページタイトル、疑似要素、レスポンシブCSSの除外
