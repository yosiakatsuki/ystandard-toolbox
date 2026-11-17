# 片方が追従できるカラム（子）：子ブロック設計

作成日：2026-11-15。更新日：2026-11-17。状態：段階開発中。

対象は`ystdtb/sticky-columns-item`。親子共通の方針、段階的な実装範囲、幅と追従、対応WordPressバージョンは[親ブロックの設計書](../sticky-columns/DESIGN.md)を正本とする。

## 合意した役割

- 日本語名は「片方が追従できるカラム（子）」。
- 親の直下にのみ配置し、親が自動生成する2個のうちの1個とする。
- 内部へ通常のGutenbergブロックを自由に配置できる。
- 子自身のHTMLと内容を静的に保存する。SSRは使わない。
- 縦書き・本文の段組み・fitTextは内部ブロックへ任せ、専用の本文ラッパーを作らない。
- 幅・gap・切替条件のプリセットは採用しない。
- 開発中の保存形式は互換維持しない。構造変更後は親ブロックごと追加し直し、deprecated・migrateは作らない。

## 既存コードの調査結果

- faq-item/block.jsonはparentで親の直下への配置を制限する。
- faq-item/edit.tsxには、子内部のtemplateLockをfalseにして自由編集する例がある。
- 既存部品はsrc/aktk-block-componentsを優先する。今回の装飾設定は標準Supportsへ任せ、独自パネルを追加しない。

## 最小構成と今回の追加

- 今回は文字サイズ、行間、文字色、単色・グラデーション背景、padding、上下margin、枠線、角丸、影の標準Supportsを追加する。
- 幅入力と追従スイッチはまだ追加しない。
- 空の段落を初期配置し、内容だけを編集できるようにする。
- 親の共通CSSにより、第1は320px固定・追従あり、第2は最低400pxから伸びる可変カラムになる。
- 親の内容幅が744px未満なら両方全幅・追従なし。判定を子で二重管理しない。
- 固定幅・追従位置は今回のモックに限る。完成版では固定する側と追従する側を独立して指定する方向とする。

## block.jsonの構造に関する設定（抜粋）

```json
{
  "apiVersion": 3,
  "name": "ystdtb/sticky-columns-item",
  "title": "片方が追従できるカラム（子）",
  "textdomain": "ystandard-toolbox",
  "parent": ["ystdtb/sticky-columns"],
  "selectors": { "root": ".ystdtb-sticky-columns-item" },
  "supports": {
    "html": false,
    "align": false,
    "className": false,
    "customClassName": false,
    "reusable": false
  },
  "editorScript": "file:./index.js",
  "editorStyle": "file:./index.css",
  "style": "file:./style-index.css"
}
```

装飾Supportsは親と同じ宣言を加える。標準属性の保存と出力はuseBlockProps/useBlockProps.save()に任せ、独自のスタイル出力を重ねない。

index.phpはSticky_Columns_Item_Blockクラス、BLOCK_NAMEはystdtb/sticky-columns-itemとする。WordPress 7.0未満では登録しない。互換入力は作らず、プラグイン全体の最低要件も変更しない。

## HTMLとエディター

```html
<div class="ystdtb-sticky-columns-item">
  <!-- 通常ブロック -->
</div>
```

- 編集側はuseBlockPropsとuseInnerBlocksPropsを同じdivへ適用する。
- 保存側はuseBlockProps.save()とInnerBlocks.Contentを使う。
- parentと親のallowedBlocks・templateLockで親子関係を制限する。
- 子内部のtemplateLockはfalse。内容ブロックの種類や数を独自に制限しない。
- 子の追加・削除・移動を親の通常UIから行えないことと、子内部の自由編集を両立させる。
- style.scssは子のbox-sizing・min-width・長い文字列の折返し等を担当する。
- style-editor.scssから常時表示の点線を削除する。空状態の最低高さだけを補い、Gutenbergの選択・フォーカス表示は変更しない。
- 自分の装飾も含む子外側全体を追従対象とする。親の範囲外には追従させない。

## 装飾設定と後続の設定

- 今回の親子共通設定は標準UIを使い、初期非表示・設定済み時の表示・解除をコアと共通設計に合わせる。
- 既存の標準パレット・文字サイズ・影の選択肢は使用し、独自プリセットは追加しない。縦書き・本文の段組み・fitTextは採用しない。
- 子固有：2列時の固定幅、可変時の最低幅、追従ON/OFF。カラム間gapは親だけに置く。
- 追従の保存先は親の単一値にする案を保持する。子ごとのbooleanを同期する仕組みは作らない。
- 幅は標準のstyle.dimensions.widthを使う方向とし、任意入力とCSS出力の詳細は最小構成の確認後に決める。プリセット解決は組み込まない。
- 設定を追加する段階でdocs/block-style-controls.mdを適用し、標準Supportsと共有部品を優先する。

## 左右の表示順について

親の[表示順切替の設計](../sticky-columns/DESIGN.md#左右の表示順切替設計のみ)に従う。今回、子側の属性やUIは追加しない。

- 親が2列時だけCSSのorderを切り替える案とする。
- 子の保存順・内容・幅・装飾・追従対象は維持する。逆順時に自分を別カラムへ置き換えない。
- 1列時は元のDOM順へ戻る。読み上げ順・Tab順は変えない。

## 確認項目

- fixtureのparse/serializeで子の内容が維持され、親の直下に配置されること。
- 標準ブロック名クラスと専用本文ラッパーが保存されないこと。装飾Supports用のクラスは保持する。
- 装飾設定が子の外側へ保存され、他の子の設定や内容を変更しないこと。
- 親子が同じバージョン条件で登録され、対象外環境ではどちらも登録されないこと。
- 許可後の画面確認で、内部ブロックの編集、保存再読込、固定幅・可変幅、1列時の全幅化と追従解除を確認する。
- ブラウザ未確認の状態を、画面上の動作確認済みとは扱わない。
