# 片方が追従できるカラム：親ブロック・親子共通設計

作成日：2026-11-15。更新日：2026-11-17。状態：段階開発中。

対象は`ystdtb/sticky-columns`。子固有の内容は[子ブロックの設計書](../sticky-columns-item/DESIGN.md)を参照する。コードパスはプロジェクトルート基準とする。

## 最新の合意と今回の範囲

- 完成仕様を一括実装せず、設定UIなしの最小構成から作り、実際の挙動を確認しながら拡張する。
- 親も子も静的ブロックとし、親のHTMLを含めて投稿本文へ保存する。SSR、render_callback、PHPによる個別CSS生成は採用しない。
- 親の直下に子2個だけを配置する。外側・中間・子内部にブロック専用のラッパーを追加しない。
- 標準のブロック名クラス`wp-block-ystdtb-sticky-columns`・`wp-block-ystdtb-sticky-columns-item`を付けない。
- カラム幅・gap・切替条件のプリセット化や、プリセットを解決して幅を計算する方式は採用しない。独自プリセットの追加・変更に伴う下位互換管理も持ち込まない。
- 縦書き・本文の段組み・fitTextは、内部へ配置する通常ブロックに任せる。
- 必要なWordPressバージョンに満たなければ、各index.phpで親子とも登録しない。旧版のための互換UIは作らない。
- 開発中の保存形式の下位互換は維持しない。HTML構造が変わった場合は、編集画面で対象ブロックを削除し、追加し直す。deprecated・migrateは追加しない。
- 既存の他ブロックの互換性方針は変更しない。開発中ブロックの再追加を自動で行ったり、投稿内容を勝手に削除したりしない。
- 設計更新を8217c480、最小構成を88640191でコミット済み。その後の点線削除・装飾Supports追加・表示順の設計は、次のコミット指示まで未コミットで進める。

以前の動的親ブロック、実行時ID、プリセット解決、旧WordPress向け幅UI、writingMode用の本文ラッパーは、この方針で置き換える。

## 既存コードの調査結果

### 配置・登録・ビルド

- v2ブロックの配置先は`src/blocks/block-library/{block}/`。
- `faq/index.tsx`はmetadata、`mergeDefaultAttributes()`、`CATEGORY.common`、共通アイコン色を使って登録する。
- 各ブロックのindex.phpで`init`優先度20に`register_block_type(__DIR__)`を実行する。namespaceは`ystandard_toolbox`、singleton形式。
- `inc/blocks/class-blocks.php`が`build/blocks/**/index.php`を読み込む。固定の登録一覧への追加は不要。
- `webpack.blocks.v2.config.js`と`npm run build:blocks:v2`を使用する。ビルドは既存の`build/blocks`とキャッシュを削除して再生成し、PHPもコピーする。
- `style.scss`はindex.tsx、`style-editor.scss`はedit.tsxから読み込む。共通CSSとエディター専用CSSをmetadataでも分ける。

### 親子構造と共通部品

- `faq/edit.tsx`に2個のtemplate、allowedBlocks、templateLock: allの例がある。
- `faq-item/edit.tsx`に、子内部のtemplateLockをfalseにして自由編集する例がある。
- `description-list-dl-column`もuseInnerBlocksPropsを用いた親子構造を持つ。
- `docs/block-style-controls.md`は標準Supports優先、独自スタイルはstyle.ystdtb配下、初期非表示、設定ごとの解除を定める。装飾設定を追加する段階で適用する。
- UI部品は`src/aktk-block-components/`を優先する。旧`src/blocks/controls/`は新規利用しない。
- クラスは`ystdtb-`、CSSカスタムプロパティは`--ystdtb--`、翻訳ドメインは`ystandard-toolbox`。

### バージョン

- プラグイン本体の宣言はWordPress 6.5以上・PHP 7.4以上。AGENTS.mdのWordPress 6.1表記とは異なる。
- apiVersion 3は6.3以降、metadataのallowedBlocksは6.5以降。
- dimensions.widthはWordPress 7.0で標準Supportsに追加された。[公式変更説明](https://make.wordpress.org/core/2026/03/15/dimensions-support-enhancements-in-wordpress-7-0/)
- この新規ブロックは将来の幅設定も見据えてWordPress 7.0以上を対象とする。プラグイン全体の最低要件は変更しない。
- npmのWordPressパッケージによるテスト成功と、実際のWordPress上での動作確認は区別する。

## 段階的な実装方針

### 実装済み：設定UIなしの最小構成

- 親を挿入すると同じ子を2個生成する。
- 各子に空の段落を初期配置し、通常のGutenbergブロックを自由に追加できるようにする。
- 親の直下は子2個をテンプレートロックする。子内部はロックしない。
- 第1カラムを320px固定・追従あり、第2カラムを可変・2列時の最低幅400pxとする。
- gapは縦横24px、追従位置はtop: 0とする。
- 親の内容幅が320 + 400 + 24 = 744px以上なら2列、未満なら両方全幅の1列・追従なしにする。
- 744pxは試作用の幅から導出した値であり、ユーザー設定のブレークポイントでもプリセットでもない。
- 幅・gap・最低幅は同じSCSS内の定数からレイアウトとクエリ条件へ反映する。
- 初期の追従対象を第1に固定するのは挙動確認のため。完成版の既定値・ON/OFF仕様を確定したものではない。
- この段階では装飾Supports、幅入力、最低幅入力、追従スイッチ、逆順、オフセット入力は追加していない。
- フロントエンドJavaScript、実行時の個別CSS、独自attributes、保存IDは追加しない。

### 今回：点線の削除と装飾Supportsの追加

子のエディター専用CSSから常時表示の点線を削除する。空カラムの最低高さは維持し、Gutenberg標準の選択・フォーカス表示は変更しない。

親子共通で次の標準Supportsを追加する：

- 文字サイズ・行間。
- 文字色。
- 背景色：単色・グラデーション。
- 内側余白：上下左右。
- 外側余白：上下のみ。
- 枠線：色・太さ・スタイル・角丸。
- ボックスシャドウ。

独自の装飾パネルや独自属性は作らず、標準UIとuseBlockProps/useBlockProps.save()へ任せる。全項目を初期非表示にし、設定済みの項目はコアの挙動に従って表示する。未設定時の装飾値は追加しない。

親のgapはユーザー確認により今回の対象外とし、24px固定を維持する。次段階で幅・切替条件と一緒に設計・実装する。幅・可変時の最低幅・追従ON/OFFも後続段階とする。固定する側と追従する側は独立して選べる方向を維持する。

縦書き・本文の段組み・fitTextは採用しない。フォントファミリー、字間、文字装飾等も今回の追加対象には含めず、必要性を確認してから検討する。

文字サイズ・色・グラデーション・影については、WordPress標準UIの既存選択肢と保存形式を使う。独自プリセットを追加したり、装飾用プリセットをカラム幅の計算に使用したりしない。テーマによって非表示にされた項目を独自UIで復活させない。

共通の宣言はtypography.fontSize/lineHeight、color.text/background/gradients、spacing.padding/margin、__experimentalBorder.color/width/style/radius、shadow。shadowはtrueを指定し、枠線パネルの__experimentalDefaultControls.shadowをfalseにする。標準保存先はstyle、fontSize、textColor、backgroundColor、gradient、borderColorで、独自の二重保存先を追加しない。

## HTML構造と保存

```html
<div class="ystdtb-sticky-columns">
  <div class="ystdtb-sticky-columns-item">
    <!-- 通常ブロック -->
  </div>
  <div class="ystdtb-sticky-columns-item">
    <!-- 通常ブロック -->
  </div>
</div>
```

- 親子ともuseBlockProps.save()とInnerBlocks.Contentを用い、上記の外枠も保存する。
- className: falseで標準のブロック名クラスを抑制し、独自クラスを明示する。
- selectors.rootも独自クラスに合わせる。エディター操作に必要なクラスは削除しない。
- 子内部の任意ブロックに付くwp-block-*クラスまで削除するものではない。
- 保存HTMLをPHPで組み直さない。CSSが読み込まれなくても親子と内容のHTMLは残る。

## block.jsonと登録の構成

親の構造・登録に関する設定の抜粋。装飾Supportsは前節の共通宣言を加える：

```json
{
  "apiVersion": 3,
  "name": "ystdtb/sticky-columns",
  "title": "片方が追従できるカラム",
  "textdomain": "ystandard-toolbox",
  "allowedBlocks": ["ystdtb/sticky-columns-item"],
  "selectors": { "root": ".ystdtb-sticky-columns" },
  "supports": {
    "html": false,
    "align": false,
    "className": false,
    "customClassName": false
  },
  "editorScript": "file:./index.js",
  "editorStyle": "file:./index.css",
  "style": "file:./style-index.css"
}
```

- categoryは既存のCATEGORY.commonへ合わせる。今回の装飾Supportsは親子とも同じ定義とする。
- index.phpのクラスはSticky_Columns_Block、BLOCK_NAMEはystdtb/sticky-columns。
- 登録時にWordPress 7.0以上か確認し、不足時はreturnする。子も同じ条件とする。
- render、render_callback、viewScript、viewScriptModuleは使わない。
- 追加CSSクラスの入力はまだ出さない。完成版のcustomClassNameの扱いは別に決める。

## CSSとコンテナクエリ

- 親をサイズコンテナ兼Flexboxとし、子へクエリ内のスタイルを適用する。親自身を自身のサイズクエリで変更しない。
- 基礎CSSでは子をflex-basis: 100%・position: staticにする。コンテナクエリ非対応環境も1列で表示する。
- 2列条件の同じクエリ内で、第1をflex: 0 0 320px、第2をflex: 1 0 400pxにし、第1だけposition: stickyを有効にする。
- 親にはflex-wrap: wrapとalign-items: flex-start、子にはmin-width: 0とbox-sizing: border-boxを指定する。
- 直接子セレクターと、最も近い同名コンテナによる判定で入れ子同士の適用を分離する。
- 幅の判定にviewportのメディアクエリは使わない。
- エディターとフロントは同じstyle.scssを使用する。エディター専用CSSは空カラムの最低高さに限定し、幅やgapを変更しない。
- 長いURLの折返しを許可する。表・コード等の横スクロールは内容ブロック側に任せる。
- overflow: hidden/autoを自動追加しない。追従は親の範囲内とし、祖先のoverflowによってスクロール基準が変わる点に注意する。
- エディターとフロントのスクロール領域は異なるため、停止する画面座標の一致までは保証しない。

### 折返しを作りながら確認する範囲

設定値から求めた必要幅とFlexboxが使用する実寸は、padding・border・外部CSS等によって食い違う可能性がある。最小構成で基本挙動を確認したうえで、装飾設定を追加する段階で境界条件を確認・修正する。今回の固定値モックを、任意の設定値でも一致する完成設計と扱わない。

任意幅・gapの入力を追加する場合も、フロントJavaScriptとSSRを使わない方針を維持する。@container条件ではCSSカスタムプロパティを直接使えないため、可変設定からCSSを用意する方法はその段階の検討課題とする。今回、実行時CSS生成の仕組みを先回りして作らない。

## エディターの制約

- 親のuseInnerBlocksPropsへtemplate、allowedBlocks、templateLock: all、renderAppender: falseを渡す。
- 同じ要素へuseBlockPropsを渡し、中間ラッパーを作らない。
- 子内部はtemplateLock: falseとし、通常ブロックを自由に編集できる。
- 親子の制約は通常編集UIの制約であり、コード編集や外部データによる不正構造の完全な防止を意味しない。
- 開発中は不整合な構造を自動修復・削除せず、ブロックを追加し直す。修復UIは今回作らない。

## 後続段階で決めること

- 幅・最低幅・gapの任意入力、許可単位、静的保存のまま切替CSSを管理する方法。
- padding・border・長い内容を加えたときの折返しと追従解除の一致。
- 追従の初期状態とオフセット。管理バーと固定ヘッダーの補正は今回未対応。
- 追従スイッチを子へ表示し、親のnone/first/secondの単一値を更新する方式は後続案として保持する。今回属性は追加しない。
- 逆順設定は未実装。2列時のみ左右反転、1列時はDOM順へ戻す案とし、視覚順とTab順の違いを確認してから追加する。
- 画面より高い追従内容の扱い。高さ検出や内部スクロールの自動追加は行わない。
- gapを任意変更できるようにする時点で、必要幅と追従解除を一緒に更新する。

## 左右の表示順切替：設計のみ

今回の実装対象には含めない。次の案を確認した後に追加する。

### 表示の仕様

- 親に「左右の表示順」を設け、左→右（通常）と右→左（逆順）を選べるようにする。
- 反転するのは2列時の見た目だけ。第1・第2カラムの保存順と内容は変更しない。
- 1列時は第1→第2のDOM順に戻す。画面幅ではなく既存の2列成立条件で切り替える。
- 第1の幅・装飾・追従設定は、右へ表示しても同じカラムに付いたままとする。「左カラム」を追従対象の識別名にしない。
- 現段階の固定値モックなら、逆順では第2の可変カラムが左、第1の320px固定・追従カラムが右になる。
- 内容の文字方向は変えず、direction: rtlは使わない。

### 保存と設定UI

- 保存先案はstyle.ystdtb.stickyColumns.reverse。booleanでtrueだけを保存し、未設定は通常順とする。
- 通常順へ戻す操作・個別解除ではreverseだけを削除し、兄弟の内容や同じstyle内の装飾を維持する。
- orderを制御するため、InspectorControlsのstylesグループに独立した「表示順」パネルを置く。
- 共通設計に合わせてToolsPanel/ToolsPanelItemの追加・解除を利用し、入力は初期非表示。選択肢はCustomSelectControlの既存ラッパーを使う。
- パネルは共有部品とし、ブロック側が属性パスを扱う。未承認の現段階では共有部品も作らない。
- ヘルプに「2列のときだけ左右を入れ替えます。1列では元の順序で表示します。」と記載する。

### HTML・CSSへの反映案

- 親の保存クラスへis-reversedを付け、親子のHTML構造は増やさない。PHPによる出力加工は行わない。
- 子の基本スタイルではorder: 0とし、2列条件のコンテナクエリ内でのみ、第1をorder: 2、第2をorder: 1にする。
- セレクターは.ystdtb-sticky-columns.is-reversedの直接子に限定する。外側の反転を入れ子ブロックへ波及させない。
- 幅・gap・追従を有効にする条件と、表示順を反転する条件を別々に管理しない。
- 今回はreverse属性、is-reversedクラス、orderのCSS、入力UIを追加しない。

### アクセシビリティと確認事項

- 読み上げ順・Tab順はDOM順のままなので、逆順表示中は見た目の左右順と異なる。
- 論理的な読む順序を入れ替える機能として案内しない。正のtabindexやARIAによる順序の偽装はしない。
- 1列でも第2→第1にしたい場合は別仕様になるため、この設定へ混在させず再検討する。
- 実装時は通常・逆順それぞれで2列/1列、保存再読込、解除、入れ子、追従対象と装飾の維持、Tab順を確認する。

## 今回の検証方針

ブラウザを起動しない確認：

- 対象TSX/SCSS/PHPのlint、PHP構文、ブロックビルド。
- fixtureで親HTML・子2個・内容がparse/serialize後も残ること、標準ブロック名クラスが付かないことを確認する。
- 登録のバージョン条件を、7.0未満・7.0以上で確認する。
- 装飾あり・未設定のfixtureで標準のクラスとinline styleが保存され、子内容と直接子の構造が維持されることを確認する。
- 出力CSSに常時表示の点線がなく、カラムの基本条件を勝手に変更していないことを確認する。
- 表示順切替のコードが今回の変更へ混入していないことを確認する。

別途許可を得た画面確認：

- 親の初期挿入、子内部の編集、保存再読込。
- 同じ画面幅で配置領域だけを変え、743px・744px・745pxで列数と追従解除を確認する。
- 2列時の320px固定・残り幅への伸長、1列時の全幅表示。
- 長い内容、親下端での停止、入れ子、複数配置、祖先overflow。
- HTMLを変更した後に、対象ブロックを削除・追加し直す開発フロー。

前段階では、許可されたフロント画面の追従調査をagent-browserで実施した。bodyのoverflow-x: hiddenがある状態でも追従し、管理バー相当の覆いによって内容が隠れることを一時再現した。管理バー補正は今回の変更には含めない。今回追加するエディター設定の画面操作はまだ許可されていないため、ブラウザ未確認として報告する。
