# 片方が追従できるカラム：親ブロック・親子共通設計

作成日：2026-11-15。更新日：2026-11-18。状態：段階開発中。

対象は`ystdtb/sticky-columns`。子固有の内容は[子ブロックの設計書](../sticky-columns-item/DESIGN.md)を参照する。コードパスはプロジェクトルート基準とする。

## 最新の合意と今回の範囲

- 完成仕様を一括実装せず、設定UIなしの最小構成から作り、実際の挙動を確認しながら拡張する。
- 親も子も静的ブロックとし、親のHTMLを含めて投稿本文へ保存する。PHPは画面幅・コンテナ幅の条件付きCSSを生成する。親子の要素と本文はsaveで保存する。
- 親の直下に子2個だけを配置する。外側・中間・子内部にブロック専用のラッパーを追加しない。
- 標準のブロック名クラス`wp-block-ystdtb-sticky-columns`・`wp-block-ystdtb-sticky-columns-item`を付けない。
- カラム幅・gap・切替条件のプリセット化や、プリセットを解決して幅を計算する方式は採用しない。独自プリセットの追加・変更に伴う下位互換管理も持ち込まない。
- 縦書き・本文の段組み・fitTextは、内部へ配置する通常ブロックに任せる。
- 必要なWordPressバージョンに満たなければ、各index.phpで親子とも登録しない。旧版のための互換UIは作らない。
- 開発中の保存形式の下位互換は維持しない。HTML構造が変わった場合は、編集画面で対象ブロックを削除し、追加し直す。deprecated・migrateは追加しない。
- 既存の他ブロックの互換性方針は変更しない。開発中ブロックの再追加を自動で行ったり、投稿内容を勝手に削除したりしない。
- 設計更新を8217c480、最小構成を88640191でコミット済み。点線削除・装飾Supports追加・表示順の初期設計を37ba86edでコミット済み。表示順・追従設定はfc2d5e94でコミット済み。

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
- この段階では追従対象を第1に固定して挙動を確認した。後続の合意で初期追従対象をカラム1とし、切替UIを追加することが確定した。
- この段階では装飾Supports、幅入力、最低幅入力、追従スイッチ、逆順、オフセット入力は追加していない。
- フロントエンドJavaScript、実行時の個別CSS、独自attributes、保存IDは追加しない。

### 実装済み：点線の削除と装飾Supportsの追加

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

親のgapはユーザー確認により今回の対象外とし、24px固定を維持する。次段階で幅・切替条件と一緒に設計・実装する。幅・可変時の最低幅も後続段階とする。追従ON/OFFは今回追加する。固定する側と追従する側は独立して選べる方向を維持する。

縦書き・本文の段組み・fitTextは採用しない。フォントファミリー、字間、文字装飾等も今回の追加対象には含めず、必要性を確認してから検討する。

文字サイズ・色・グラデーション・影については、WordPress標準UIの既存選択肢と保存形式を使う。独自プリセットを追加したり、装飾用プリセットをカラム幅の計算に使用したりしない。テーマによって非表示にされた項目を独自UIで復活させない。

共通の宣言はtypography.fontSize/lineHeight、color.text/background/gradients、spacing.padding/margin、__experimentalBorder.color/width/style/radius、shadow。shadowはtrueを指定し、枠線パネルの__experimentalDefaultControls.shadowをfalseにする。標準保存先はstyle、fontSize、textColor、backgroundColor、gradient、borderColorで、独自の二重保存先を追加しない。

## HTML構造と保存

```html
<div class="ystdtb-sticky-columns has-sticky-first">
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
  "attributes": {
    "reverse": { "type": "boolean", "default": false },
    "stickyColumn": {
      "type": "string",
      "enum": ["first", "second", "none"],
      "default": "first"
    }
  },
  "supports": {
    "html": false,
    "align": false,
    "className": false,
    "customClassName": true
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
- 親・子それぞれの「高度な設定」で追加CSSクラスを入力できる。WordPress標準の`customClassName`サポートで、選択したブロックの外枠に保存する。

## 1列にするタイミングとカラム幅

親の設定タブには、次の順でパネルを配置する。

- 「2列表示の設定」には「プレビュー」と「2列の時の表示順」を置く。プレビューには現在の表示順と追従対象を反映する。
- 「追従するカラムの設定」には「追従させるカラム」と「画面上端からの距離」を置く。距離の初期値は1rem。入力を消すと1remに戻り、0pxを指定すると画面上端に揃う。
- 「1列にするタイミング」には「切り替わりタイミング」を置き、コンテナサイズを選んだときだけ幅の入力欄を表示する。切り替わりタイミングは親の通常属性 `collapseAt` へ保存する。

選択した条件は次のようにレイアウトへ適用する。

- 初期値はモバイル。モバイルはToolboxのタブレット開始幅、タブレットはPC開始幅を境に、画面幅が境界以上で2列になる。テーマのブレークポイントフィルターを反映する。
- コンテナサイズは親の内容幅で判定する。入力欄に初期値はなく、空欄なら1列・DOM順・追従なしで表示する。指定した値は `containerSize` に保存し、px・em・rem・ch・vw・vhの単位を選べる。モバイル・タブレットへ切り替えたら任意値を解除する。
- 基本表示は全幅の1列でDOM順・追従なし。条件成立時に直下の子へFlexの幅配分・表示順・追従位置をまとめて適用する。追従する子は親の下端で止まる。
- 幅は子のスタイル設定で指定する。2列で両方未指定なら均等、片方のみなら他方が残幅、両方指定なら各希望幅を上限として配分する。カラム幅と間隔を変更しても1列にするタイミングは親で選んだ条件に従う。

### カラムの間隔

- 親のスタイルタブでコアの「ブロックの間隔」を使用する。テーマで有効な場合に表示され、通常値は`style.spacing.blockGap`に保存する。縦は`top`、横は`left`、単一の値は両方向に適用する。
- 「レスポンシブ余白」の「カラムの間隔」では、横方向と縦方向をPC・タブレット・モバイルごとに単位付きで入力する。保存先は`style.ystdtb.stickyColumns.responsive.blockGap`。項目の解除では端末別の間隔だけを削除する。
- 各方向は対象端末の値、通常値、既定の24pxの順に適用する。0は間隔なし。2列時は横の間隔を引いた残り幅を配分し、1列時は縦の間隔を使う。入れ子の間隔は親ブロックごとに決まる。

### PHPと編集キャンバス

- 画面幅用の共通CSSは `Styles` のメディアクエリを使い、コアが登録したブロックのスタイルハンドルへ追加する。
- コンテナ条件はコアのlayoutサポートと同じStyle Engineの `rules_group` と `block-supports` ストアで登録する。条件値を識別する親の `data-collapse` と直接子セレクターを組み合わせ、各子から最も近い同名コンテナの内容幅を参照する。同じ条件は同一ルールを共有する。
- 親子のCSSセレクターは詳細度を`0,1,0`とする。親で1列時の幅・追従・表示順の既定値を定義し、2列の条件を満たした直下の子でCSS変数を上書きする。状態・属性・子の位置の判定には`:where()`を使う。
- 描画時のフィルターで保存済みの親開始タグに条件と子の希望幅を添える。幅の正本は子のスタイル属性に限る。入れ子の各親で幅のCSS変数を初期化する。
- 編集キャンバスではPHPの同じルールから作ったテンプレートを `useStyleOverride` に渡し、選択中の値を即時反映する。フロントではJavaScriptを使わない。
- 2列時の追従対象の`top`に使う長さは、`style.ystdtb.stickyColumns.stickyOffset`に保存する。px・em・remで0以上の値を指定できる。固定ヘッダーの高さなどは手動で指定する。
- 距離のCSS変数は親ごとに初期化する。1列時や「追従なし」のときは指定を保持し、再び追従する際に同じ距離を使う。

コアの参照箇所は、Gridの子に条件付きルールを登録する `wp_render_layout_support_flag()`。このブロックも登録時のCSSサニタイズと、同じセレクター・条件のルール管理をStyle Engineに任せる。[WordPress 7.0のlayout.php](https://github.com/WordPress/wordpress-develop/blob/7.0/src/wp-includes/block-supports/layout.php)

### 確認範囲

設定の切り替え、端末別寸法の解除、投稿の保存・再読込、PHPによる描画、異なる境界値と同一境界値のCSS登録を自動テストで確認した。実画面では、異なる幅の入れ子、境界値の前後、左右で文字サイズを変えたem幅、子のpadding・枠線を大きくした場合の追従と表示順が確認対象となる。

## エディターの制約

- 親のuseInnerBlocksPropsへtemplate、allowedBlocks、templateLock: all、renderAppender: falseを渡す。
- 同じ要素へuseBlockPropsを渡し、中間ラッパーを作らない。
- 子内部はtemplateLock: falseとし、通常ブロックを自由に編集できる。
- 親子の制約は通常編集UIの制約であり、コード編集や外部データによる不正構造の完全な防止を意味しない。
- 開発中は不整合な構造を自動修復・削除せず、ブロックを追加し直す。修復UIは今回作らない。

## 後続段階で決めること

- padding・border・長い内容を加えたときの折返しと追従解除の一致。
- 画面より高い追従内容の扱い。高さ検出や内部スクロールの自動追加は行わない。

## 前段階の記録：表示順と追従対象の設定

### 合意した表示と既定値

- カラム1・カラム2は、1列時の上からの順序を表す固定の名前とする。左右を入れ替えても名前と内容を維持する。
- 親の「2列の時の表示順」で「カラム1 → カラム2」「カラム2 → カラム1」を選ぶ。初期値はカラム1 → カラム2。
- 親の「表示順」パネルで、表示順の下に「追従させるカラム」を置く。選択肢は「追従なし」「カラム1」「カラム2」の順で、初期値はカラム1。
- 子に追従設定は置かない。親で1つだけ選ぶため、同時追従は発生しない。
- 表示順の変更は2列時の見た目だけに適用し、保存する子の順序・内容・幅・装飾・追従対象は変えない。
- 1列時はカラム1 → カラム2のDOM順へ戻し、追従を解除する。入力値自体は維持し、2列へ戻ったら設定を再適用する。
- カラム2が追従する場合、通常順は左がカラム1・右が追従カラム2、逆順は左が追従カラム2・右がカラム1になる。
- 文字方向は変えず、direction: rtlは使わない。

### 属性と設定UI

- 親の通常attributesにreverse（boolean、default: false）とstickyColumn（string、enum: first/second/none、default: first）を追加する。
- 親のUIからstickyColumnを直接更新する。子側の親属性参照・更新、スイッチ、追従用共有パネルは削除する。保存先は従来の親属性を維持し、移行処理は不要。
- UIの配置はInspectorControlsの設定グループ。ユーザー指定により、style配下とstylesグループは使わない。内容の配置と追従機能を操作する設定として扱い、装飾Supportsとは分離する。
- 設定グループでは入力を常時表示し、通常のPanelを使う。スタイルパネル用の追加メニュー・初期非表示は適用しない。
- ユーザー指定により、表示順パネルはブロック固有の設定として作る。docs/block-style-controls.mdの共有パネル原則の例外とし、sliderと同様にパネルの組み立てと各コントロールを分ける。汎用のPanel・BaseControl・CustomSelectControl等は既存のaktk部品を使う。
- パネルのindex.tsxはプレビューと各コントロールの配置だけを担当する。各設定ファイルが自分の属性取得・更新・翻訳ラベルを扱い、設定の集約ラッパーは作らない。
- 表示順と追従対象は既存のCustomSelectControlを使用する。追従設定には1列時には追従しないことを案内する。
- パネル上部は標準BaseControl.VisualLabelで「プレビュー」を表示し、他の設定ラベルと文字サイズをそろえる。その下に現在の左右順のカラムを表示する。
- プレビューのカラムは薄いグレーのベタ塗り・4pxの角丸で表現し、枠線は付けない。「カラム1」「カラム2」の下に、選択されているカラムだけ「(追従)」を小さく表示する。「追従なし」では両方に表示しない。
- 通常順へ戻す操作はreverseだけ、追従操作はstickyColumnだけを更新する。装飾と子の内容には触れない。
- ブロックごとの保存IDは不要。同じページの複数配置・入れ子は、各親の属性更新と直接子CSSで独立させる。

### 設定ファイルの構成

配置先はsrc/blocks/block-library/sticky-columns/。src/aktk-block-components/components/column-order-panelは削除する。

```text
inspector-controls/
├── index.tsx                   # 設定グループへの配置
└── column-order/
    ├── index.tsx               # 「表示順」パネルの組み立て
    ├── display-order.tsx       # 2列の時の表示順
    ├── sticky-column.tsx       # 追従させるカラム
    ├── preview.tsx             # プレビュー
    └── style-editor.scss       # パネルとプレビューの専用CSS
```

設定UIとプレビューは同じ表示・操作を維持し、保存属性・保存HTML・フロントCSSは変更しない。

### HTML・CSS

- edit/save共通の関数で、親にis-reversed、has-sticky-first、has-sticky-secondを付ける。追従なしでは追従対象クラスを付けない。
- HTMLは親の直下に子2個のままとし、子の保存形式は変えない。SSR・フロントJavaScript・実行時CSS生成は追加しない。
- 基本スタイルは子のorder: 0・position: static。既存の744px以上のコンテナクエリ内で、逆順時だけ第1をorder: 2、第2をorder: 1にする。
- 同じクエリ内で、has-sticky-firstの第1、has-sticky-secondの第2だけをposition: sticky・top: 0にする。
- すべて親クラスからの直接子セレクターとし、外側の設定を入れ子へ波及させない。
- 幅・gap・2列成立条件は従来の320px・400px・24px・744pxを維持する。
- 親の保存クラスが変わるため、開発中ブロックは削除・再追加する。deprecated・migrateは追加しない。

### アクセシビリティ

- 読み上げ順・Tab順はDOM順のままなので、逆順表示中は見た目の左右順と異なる。
- 論理的な読む順序を入れ替える機能として案内しない。正のtabindexやARIAによる順序の偽装はしない。
- 配置図は選択肢を補足する装飾表示とし、入力のアクセシブルなラベル・選択肢は維持する。
- 1列でもカラム2 → カラム1にしたい場合は別仕様になるため、この設定へ混在させない。

## 表示順・追従設定の検証方針

ブラウザを起動しない確認：

- 対象TSX/SCSS/PHPのlint、PHP構文、ブロックビルド。
- fixtureで親HTML・子2個・内容がparse/serialize後も残ること、標準ブロック名クラスが付かないことを確認する。
- 登録のバージョン条件を、7.0未満・7.0以上で確認する。
- 装飾あり・未設定のfixtureで標準のクラスとinline styleが保存され、子内容と直接子の構造が維持されることを確認する。
- 出力CSSに常時表示の点線がなく、カラムの基本条件を勝手に変更していないことを確認する。
- 通常・逆順と追従1・追従2・追従なしの保存、再読込、子の順序・装飾の維持を確認する。
- 親の2つのドロップダウン、初期値、装飾保持、通常・逆順と追従対象のプレビュー、追従なしでの表示をブラウザ不要のコンポーネントテストで確認する。

別途許可を得た画面確認：

- 親の初期挿入、子内部の編集、保存再読込。
- 同じ画面幅で配置領域だけを変え、743px・744px・745pxで列数・表示順・追従解除が同時に切り替わることを確認する。
- 2列時の320px固定・残り幅への伸長、1列時の全幅表示。
- 長い内容、親下端での停止、入れ子、複数配置、祖先overflow。
- HTMLを変更した後に、対象ブロックを削除・追加し直す開発フロー。

前段階では、許可されたフロント画面の追従調査をagent-browserで実施した。bodyのoverflow-x: hiddenがある状態でも追従し、管理バー相当の覆いによって内容が隠れることを一時再現した。管理バー補正は今回の変更には含めない。今回追加するエディター設定の画面操作はまだ許可されていないため、ブラウザ未確認として報告する。

## 表示順・追従設定の検証結果

- ブロック固有のパネルと各コントロールへの分割後、設定UI・プレビューのコンポーネントテスト4件を再実行して成功。ブラウザは起動せず、Jest/jsdomで実行した。保存処理10件・対象fixture4件は前段階で成功済み。
- ドロップダウンの初期値・選択肢・順序、追従なし、通常・逆順での追従表示、装飾保持、保存済み属性の再表示を確認した。
- 対象のESLint・Stylelint、ブロックビルド、git diff --checkが成功。
- 出力CSSでプレビューの薄いグレー背景・4px角丸・枠線なし・追従表示0.85emを確認した。配置図のCSSはエディター専用。
- コアの選択欄ラベルとプレビュー見出しは、ともにBaseControl.VisualLabelを使用する。子のビルド出力から追従UIと親属性の参照処理がなくなったことも確認した。
- 今回のファイル移動・分割では保存属性・保存HTML・フロントCSSを変更していない。ビルドしたフロントCSSのハッシュも移動前後で一致した。
- 前段階のTypeScript確認は既存の@wordpress/block-editorの型定義不足（TS7016）で未完了。今回も依存追加や型チェックを抑制する宣言は加えていない。
- ブラウザ操作は未許可のため未実施。実画面での余白・文字サイズ・選択操作は別途確認が必要。
