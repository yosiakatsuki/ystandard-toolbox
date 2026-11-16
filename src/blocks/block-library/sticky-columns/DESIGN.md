# 片方が追従できるカラム：親ブロック・親子共通設計

作成日：2026-11-15。更新日：2026-11-16。状態：レビュー前・未実装。

既存コードの調査結果と、新規ブロックへの提案を分けて記載する。コード例は設計説明用であり、そのまま適用する実装ではない。コードパスはプロジェクトルート基準。Markdownリンクはこのファイルからの相対パス。

本書は`ystdtb/sticky-columns`と親子共通仕様を扱う。子固有の設定・編集・保存は[sticky-columns-itemの設計書](../sticky-columns-item/DESIGN.md)に分ける。

## 推奨案

- `ystdtb/sticky-columns`と`ystdtb/sticky-columns-item`を追加する。
- 外側の`.ystdtb-sticky-columns__container`をサイズコンテナ、内側の`.ystdtb-sticky-columns`をCSS Gridにする。子の`.ystdtb-sticky-columns-item`はGridの直下に置く。コンテナの内容幅が指定値以下なら1列、超える場合だけ2列・追従を有効にする。
- 子2個を標準のテンプレートロックで固定し、子の内部は自由編集にする。
- 色・文字・装飾はBlock Supportsを使う。親のgapと子の幅だけは自動出力を抑制し、内側Gridへ明示的に反映する。
- 親を動的ブロック、子を静的ブロックとする。親は子の幅を読み取り、Gridの列定義とブロック固有のコンテナクエリCSSをPHPで生成する。フロントエンドJavaScriptは追加しない。
- 追従スイッチは子に表示するが、保存する追従対象は親の単一属性に集約する。
- 現行本体の最低要件6.5を維持する案を第一候補とする。幅の標準UIがない6.5〜6.9だけ互換入力を補い、7.0以上では標準UIを使う。最低バージョンと機能範囲は承認事項とする。

## 既存コードの調査結果

### 配置・登録・ビルド

- 作業ブランチは`feature/add-sticky-columns`。調査開始時の未コミット差分はなかった。
- v2ブロックは`src/blocks/block-library/{block}/`に配置される。
- `faq/index.tsx`はmetadata、`mergeDefaultAttributes()`、`CATEGORY.common`、共通アイコン色を使い、`registerBlockType()`で登録している。
- PHPは各ブロックの`index.php`から`init`優先度20で`register_block_type(__DIR__)`を呼ぶ。namespaceは`ystandard_toolbox`、singleton形式。
- `inc/blocks/class-blocks.php`の`init_blocks()`が`build/blocks/**/index.php`を読み込む。新規ブロックのための固定一覧追加は原則不要。
- `webpack.blocks.v2.config.js`は`@wordpress/scripts`の標準設定と既存エイリアスを利用する。
- `npm run build:blocks:v2`は既存の`build/blocks`とキャッシュを削除して再ビルドし、PHPもコピーする。今回実行していない。
- `posts/index.php`に`render_callback`の登録例がある。

### 親子ブロック

- `faq/edit.tsx`は子2個のtemplate、`allowedBlocks`、`templateLock: 'all'`を使用する。今回の固定2個構成に最も近い。
- `faq-item/block.json`は`parent`を指定。`faq-item/edit.tsx`は内部の`templateLock: false`で内容を自由編集できる構造にしている。
- `description-list-dl-column`も2個の子と`useInnerBlocksProps()`を使う。
- FAQには子属性の一括更新例がある。ただし今回の追従設定では、2個のbooleanを同期するより単一値を保存する方が単純。
- FAQのPHPにある`BLOCK_NAME`は`ystdtb/box`になっており、登録パターンを流用する際は定数をそのままコピーしない。今回は既存箇所を変更しない。

### 最低バージョンと依存関係

- `ystandard-toolbox.php`：`Requires at least: 6.5`、`Requires PHP: 7.4`。
- 提供されたAGENTS.mdの概要はWordPress 6.1以上。実ファイルの宣言と不一致があるため、6.1対応済みとは判断しない。
- `inc/config/class-config.php`のテーマ要件は`4.36.0-beta-1`。ガイドの4.36.0以上と表記差がある。
- `.wp-env.json`は最新版のWordPressを取得する設定。最低バージョンの検証環境ではない。
- PHPUnit用npm scriptはWordPress 7.1指定。これだけでは6.5互換性を証明できない。
- npm側の`@wordpress/block-editor`は15.16系。ローカルパッケージにAPIがあっても、6.5のブラウザに同じAPIがあるとは限らない。

### Supports・スタイル・翻訳

- `faq/block.json`はAPI v3。fontSize、lineHeight、実験的なfontFamily/fontStyle/fontWeight/letterSpacing/textTransform/textDecoration/writingModeを採用している。
- `faq-item`には`__experimentalSkipSerialization`で自動出力を抑え、別要素に適用する実例がある。
- `docs/block-style-controls.md`は標準Supports優先、独自スタイルを`style.ystdtb`配下へ保存、初期非表示、解除時は対象項目のみ削除する方針。
- 共通SCSSは`index.tsx`から、エディター専用SCSSは`edit.tsx`からimportする。metadataは`style-index.css`と`index.css`を分け、共有エディタースタイルハンドルも指定する。
- CSSは`ystdtb-`、カスタムプロパティは`--ystdtb--`、翻訳ドメインは`ystandard-toolbox`。ラベルは`__()`等を使う。
- `src/aktk-block-components/utils/style-engine/index.ts`に`presetTokenToCssVar()`がある。プリセット変換に再利用できるが、安全性を保証するバリデーターではない。
- PHPの動的CSSには既存の`Text::minify()`を使用する。既存の`Styles::add_media_query_*()`は画面幅用なので、今回のコンテナ幅判定には使わない。この例外理由を本設計に記録する。
- `docs/design-system.md`はテーマ依存を避けたフォールバックを求めている。参照一覧にある`docs/ystandard-design-system.md`はこのcheckoutには存在しなかった。

## WordPress標準APIの確認結果

### バージョン別の扱い

- API v3は6.3以降、metadataの`allowedBlocks`は6.5以降。6.5基準なら利用できる。親の編集実装にも同じ制限を渡す。
- 6.5基準で色、グラデーション、padding、上下margin、blockGap、実験的borderと既存FAQ相当のtypographyを採用する。UIの表示にはテーマ設定も関係する。
- `shadow: true`によるブロック編集UIは6.5で利用できる。6.2のテーマ向けshadow対応とは区別する。[公式解説](https://developer.wordpress.org/news/2024/03/drop-shadow-updates-in-wordpress-6-5/)
- `dimensions.width`は7.0追加。保存先は`style.dimensions.width`。6.5〜6.9では宣言だけで幅入力が出ることを期待しない。7.0ではdimension-sizeプリセットも扱う。[7.0の変更](https://make.wordpress.org/core/2026/03/15/dimensions-support-enhancements-in-wordpress-7-0/)
- `typography.textAlign`は6.6追加。6.5ではこの追加項目を表示しない。[6.6の変更](https://make.wordpress.org/core/2024/06/24/miscellaneous-editor-changes-in-wordpress-6-6/)
- `typography.textIndent`は7.0追加。`textColumns`には6.3のPHP対応があるが、各対象バージョンのUI提供範囲は別に確認する。[コアのtypography実装](https://github.com/WordPress/WordPress/blob/master/wp-includes/block-supports/typography.php)
- 最新Handbookには7.2予定の`textShadow`も含まれる。最新版ドキュメントに載る全項目を、6.5や7.1の利用可能機能と同一視しない。[Supports](https://developer.wordpress.org/block-editor/reference-guides/block-api/block-supports/)

### 「タイポグラフィをすべて」との整合性

既存FAQ相当の9項目に、対応環境のtextAlign、textIndentを加える案を推奨する。次の項目は要件との競合があり、無断で採用・除外を確定しない。

- `textColumns`は本文の段組み機能。親のGridに設定しても期待する段組みにはならない。子の本文へ適用すると複数の任意ブロックが段組みされるため、追従・分断と合わせた仕様が必要。
- `fitText`は直接テキストを扱うブロック向けの性質が強く、任意InnerBlocks全体へ一律適用するのは避けたい。フロントのJavaScript不要という要件とも照合が必要。
- `writingMode`は既存FAQとの整合で候補に含める。ただしレイアウトの軸まで縦書きにしないため、適用先を本文用要素に限定する案とする。
- dropCapは一般的なコンテナ向けSupportsとは別。段落ブロック側に任せる。
- 将来追加される設定を自動ですべて有効にしない。バージョンごとに確認した項目だけを宣言する。

### コアブロックの参考範囲

`core/columns`と`core/column`の直下関係は公式InnerBlocks解説の参考例になっている。`parent`と`allowedBlocks`、テンプレート、子の自由編集を参考にする。[InnerBlocks](https://developer.wordpress.org/block-editor/how-to-guides/block-tutorial/nested-blocks-inner-blocks/)

コアColumnの幅をdimensionsへ移行する変更には、自動serializeを抑制する設定が確認できる。標準UI・保存形式と実レイアウトへの出力を分離する先例として扱う。[コアの変更記録](https://github.com/WordPress/gutenberg/actions/runs/23302726466)

今回、Gutenbergリポジトリの対象ソースURL取得は404になったため、現行Columns/Columnの全編集処理・CSSを直接照合できていない。上記の確認済み範囲を超えて「現行コアと同じ実装」とは扱わない。実装着手時に対象リリースのソースを固定して再確認する。

## 親子構成とファイル案

追加予定の構造は既存ブロックに合わせる。

```text
src/blocks/block-library/
├── sticky-columns/
│   ├── DESIGN.md
│   ├── block.json
│   ├── index.tsx
│   ├── index.php
│   ├── edit.tsx
│   ├── save.tsx
│   ├── style.scss
│   ├── style-editor.scss
│   ├── types.ts
│   ├── utils.ts
│   └── inspector-controls/
└── sticky-columns-item/
    ├── DESIGN.md
    ├── block.json
    ├── index.tsx
    ├── index.php
    ├── edit.tsx
    ├── save.tsx
    ├── style.scss
    ├── style-editor.scss
    ├── types.ts
    └── inspector-controls/
```

今回は両フォルダの`DESIGN.md`のみを作成する。親の本書を親子共通仕様の正本とし、子固有の仕様は子の設計書を参照する。その他のファイルは承認後の実装時に追加する。

## block.jsonの主要設定案

### 親

```json
{
  "apiVersion": 3,
  "name": "ystdtb/sticky-columns",
  "title": "片方が追従できるカラム",
  "category": "ystdtb-common",
  "textdomain": "ystandard-toolbox",
  "allowedBlocks": ["ystdtb/sticky-columns-item"],
  "selectors": { "root": ".ystdtb-sticky-columns__container" },
  "attributes": {
    "style": { "type": "object" },
    "stickyColumn": {
      "type": "string",
      "enum": ["none", "first", "second"],
      "default": "none"
    }
  },
  "supports": {
    "html": false,
    "align": false,
    "className": false,
    "spacing": {
      "padding": true,
      "margin": ["top", "bottom"],
      "blockGap": true,
      "__experimentalSkipSerialization": ["blockGap"],
      "__experimentalDefaultControls": {
        "padding": false,
        "margin": false,
        "blockGap": false
      }
    }
  },
  "editorScript": "file:./index.js",
  "editorStyle": ["ystdtb-aktk-components-editor", "file:./index.css"],
  "style": "file:./style-index.css"
}
```

共通Supportsは次項をマージする。`viewScript`は登録しない。PHPは`Sticky_Columns_Block`、定数は`ystdtb/sticky-columns`とし、`render_callback`を登録する。標準layoutの切替UIは追加しない。blockGapのUIが6.5のテーマ条件で非表示になる場合は、標準の設定パスを使う互換パネルをその環境だけに出す。gap属性を別名で二重管理しない。

子のmetadataは[子の設計書](../sticky-columns-item/DESIGN.md#blockjsonの主要設定案)に記載する。

### 親子共通の装飾Supports

```json
{
  "typography": {
    "fontSize": true,
    "lineHeight": true,
    "__experimentalFontFamily": true,
    "__experimentalFontStyle": true,
    "__experimentalFontWeight": true,
    "__experimentalLetterSpacing": true,
    "__experimentalTextTransform": true,
    "__experimentalTextDecoration": true,
    "__experimentalWritingMode": true,
    "__experimentalSkipSerialization": ["writingMode"],
    "__experimentalDefaultControls": {
      "fontSize": false,
      "lineHeight": false,
      "fontFamily": false,
      "fontStyle": false,
      "fontWeight": false,
      "letterSpacing": false,
      "textTransform": false,
      "textDecoration": false,
      "writingMode": false
    }
  },
  "color": {
    "text": true,
    "background": true,
    "gradients": true,
    "__experimentalDefaultControls": {
      "text": false,
      "background": false,
      "gradients": false
    }
  },
  "__experimentalBorder": {
    "color": true,
    "width": true,
    "style": true,
    "radius": true,
    "__experimentalDefaultControls": {
      "color": false,
      "width": false,
      "style": false,
      "radius": false
    }
  },
  "shadow": true
}
```

textAlign/textIndentは対象環境に応じた追加候補。writingModeは親の値を子本文へ渡し、子の明示値を優先する。外側の自動出力との二重適用はしない。この適用先変更にはPHP・JS双方の変換処理とグローバルスタイルの検証が必要。

影UIはコアの提供形態を使用し、存在しない初期非表示オプションを捏造しない。すべての標準パネルが共通設計の初期非表示に対応するかは対象WPごとに検証する。

## 属性の保存と更新

### 親

- `stickyColumn`: `none | first | second`。初期値は`none`。
- `style.ystdtb.stickyColumns.reverse`: boolean。未設定・falseは通常、trueは逆順。
- `style.ystdtb.stickyColumns.breakpoint`: number。整数px、未設定は720。提案範囲は1〜4096。0、負数、非数値、小数、範囲外は入力エラーにし、PHPの不正入力は720へ戻す。
- `style.ystdtb.stickyColumns.stickyOffset`: 単位付き長さ。追加採用する場合、px/rem、非負、未設定は`0px`。固定ヘッダー用の利用者指定分。
- gapは`style.spacing.blockGap`だけを使用する。

表示順はCSS配置の変更なのでstylesグループ、コンテナ幅はレスポンシブ動作の基準としてsettingsグループ、追従ON/OFFは機能としてsettingsグループに置く。オフセットはstylesグループ。コンテナ幅をsettingsへ置く例外理由は、単一要素のCSS長さではなくレイアウト切替条件を指定するため。

子の幅の保存先と追従スイッチの更新契約は[子の設計書](../sticky-columns-item/DESIGN.md#属性の保存と追従スイッチ)に記載する。

独自スタイルの解除は`undefined`と`stripUndefined()`を使用。他の装飾、兄弟の幅、子の内容は維持する。

## HTML・レンダリング案

### クラスと直接子の構造

- 親子とも`supports.className: false`を指定し、自動生成される`wp-block-ystdtb-sticky-columns`と`wp-block-ystdtb-sticky-columns-item`を出力しない。独自クラスは`useBlockProps()`・`useBlockProps.save()`・`get_block_wrapper_attributes()`へ明示する。[標準クラスの抑制](https://developer.wordpress.org/block-editor/reference-guides/block-api/block-supports/#classname)
- ローカルの`node_modules/@wordpress/block-editor/src/hooks/generated-class-name.js`でも、`className`サポートが有効な場合にのみ保存HTMLへ標準クラスを加えることを確認した。
- 親の`.ystdtb-sticky-columns`と子の`.ystdtb-sticky-columns-item`は直接の親子にする。幅測定用の`.ystdtb-sticky-columns__container`はその外側に置く。コンテナ自身の幅を条件に自分自身のGridを変更できないため、測定要素とGrid要素の分離は維持する。
- 標準クラスを前提にしたグローバルスタイルが失われないよう、metadataの`selectors.root`にはSupportsを適用する独自クラスを指定する。親は装飾と幅測定を担当する外側、子は子外側を指定する。
- `className: false`はすべてのWordPress由来クラスやCSSを無効にする指定ではない。色・プリセット等のSupports用クラスやエディター操作用の`wp-block`は保持する。子の内部に利用者が置くコアブロックのクラスも変更しない。

```html
<div class="ystdtb-sticky-columns__container"
     data-ystdtb-instance="sc-123"
     data-order="normal" data-sticky="first">
  <div class="ystdtb-sticky-columns">
    <div class="ystdtb-sticky-columns-item">
      <div class="ystdtb-sticky-columns-item__content">第1カラムのブロック</div>
    </div>
    <div class="ystdtb-sticky-columns-item">
      <div class="ystdtb-sticky-columns-item__content">第2カラムのブロック</div>
    </div>
  </div>
</div>
```

- 外側の`.ystdtb-sticky-columns__container`に親の色・背景・枠線・角丸・影・padding・marginを適用。外側のcontent boxを測定するため、親paddingを引いた実際の配置可能幅で切り替わる。
- 内側の`.ystdtb-sticky-columns`にGridとgapを適用。子外側に子の装飾とsticky、本文要素にwritingModeを適用する。親の文字設定は子の明示設定がなければ継承させる。
- 子の幅はGridの列定義へ変換し、子自身へ`width: 30%`等を出さない。そうしないと「30%の列の中でさらに30%幅」になる。
- `container-type: inline-size`を外側に指定。サイズクエリでそのコンテナ自身を変更できないため、内側Gridが必要。[コンテナクエリ](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Containment/Container_queries)
- 親のsaveは`InnerBlocks.Content`を返し、子の内容を投稿本文に保存する。PHPは`$content`を一度だけ使用して外側・Gridを生成する。子を再renderして二重実行しない。
- 親の`$block->parsed_block['innerBlocks']`から直下2個の属性を読む。HTML文字列を正規表現で分解しない。
- PHPの親外側には`get_block_wrapper_attributes()`、子の保存には`useBlockProps.save()`を使う。
- プラグイン停止時は保存済み子内容が残るが、親のレイアウト・装飾は復元されない。静的フォールバック外枠も保存する案は追加複雑化になるため初版では採用しない。

## 幅とgapの連携

### 幅の意味を明確にする

推奨する幅は「2列時に確保したい幅」。未設定・autoは残り幅の分配。1列時は設定値を保持しつつ幅100%相当に戻す。

- 両方未設定：`minmax(0, 1fr) minmax(0, 1fr)`。
- 第1だけ320px：`minmax(0, 320px) minmax(0, 1fr)`。
- 第2だけ25%：列間gapを除いた利用可能幅の25%を第2へ、残りを第1へ。
- 両方固定長：指定幅まで使用する。余りは末尾に残し、勝手に等分拡大しない。
- 両方割合：gapを除いた幅に対して指定割合を使う。50%+50%でgap分だけはみ出すことを防ぐ。
- 指定合計が利用可能幅を超える場合：`minmax(0, 指定幅)`によるGridの縮小を許容する。指定値を下回る可能性を説明する。比率を保つ縮小は保証しない。

例：gapが24px、第1が30%なら、第1の上限を`calc((100% - 24px) * 0.3)`へ変換する。親側で両方の幅を解決し、逆順時は列定義も同時に入れ替える。

許可する幅はまずpx/rem/em/%とauto、存在を確認できたdimension-sizeプリセットに限定する案。任意の`calc()`、URL、セミコロン等は受け付けない。標準UIが入力できる範囲より狭くなるため、検証メッセージを出し、保存値を黙って別値へ書き換えない。許可単位を増やす場合は変換仕様も追加する。

テーマの幅プリセットに%が含まれる場合も、テーマ設定から値を解決して同じ割合変換をする。未解決のプリセットはautoへフォールバックし、編集画面で通知する。

### gap

- 標準の`style.spacing.blockGap`を内側の`row-gap`・`column-gap`へ反映する。
- 単一値なら両方向、objectなら`top`を行間、`left`を列間として扱う。未指定の軸はその軸の既定値へ戻し、0を有効値として保持する。
- 既定値は24px案。1列時にも行間として使う。
- 解決優先順位はブロック明示値、当該ブロックのグローバルスタイル、全体のgap、24px。エディターとPHPで同じ規則にする。
- spacingプリセットは既存変換を再利用する。列幅計算に必要な場合はテーマ設定側の値も解決する。未解決値や不正値をCSSへ直挿入しない。
- 子の上下marginはgapに加算される独立した指定。Grid内でコアflowレイアウトの隣接marginを重ねて生成しない。
- 親に標準Gridの自動配置・列数変更を許可すると固定2列と競合するため、レイアウト制御は本ブロックに限定する。

## CSSと任意ブレークポイント

### 基本構造

次は720px・第1カラム追従の概念例。実際にはブロックごとの安全な識別子でセレクターを限定する。

```css
.ystdtb-sticky-columns__container {
  container: ystdtb-sticky-columns / inline-size;
  min-width: 0;
}
.ystdtb-sticky-columns {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: var(--ystdtb--sticky-columns--row-gap, 24px)
       var(--ystdtb--sticky-columns--column-gap, 24px);
  align-items: start;
}
.ystdtb-sticky-columns-item {
  min-width: 0;
  box-sizing: border-box;
  position: static;
  top: auto;
}
@container ystdtb-sticky-columns (width > 720px) {
  [data-ystdtb-instance="sc-123"] > .ystdtb-sticky-columns {
    grid-template-columns: var(--ystdtb--sticky-columns--tracks);
  }
  [data-ystdtb-instance="sc-123"][data-sticky="first"]
    > .ystdtb-sticky-columns > .ystdtb-sticky-columns-item:first-child {
    position: sticky;
    top: var(--ystdtb--sticky-columns--effective-offset, 0px);
    align-self: start;
  }
}
```

- 非対応ブラウザは基本CSSの1列・追従なし。画面幅のmedia queryへ置き換えない。
- 境界値そのものは1列。721pxでは2列、720pxでは1列という契約。
- カラムに`overflow: hidden/auto`を自動追加しない。長いURLは折返しを許し、表・コード等の横スクロールは内部ブロック側で扱う。
- CSSカスタムプロパティはブロックの根元で既定値を再定義し、入れ子で外側の列定義やoffsetが漏れないようにする。
- 同名コンテナは最も近い祖先を参照する。直接子セレクターとインスタンス識別子を併用し、内外の設定を混線させない。

### CSS生成・配置

- breakpointは整数のみ受け付け、条件式には検証済み数値と固定の`px`だけを埋め込む。`var()`を条件に使わない。
- IDはPHPの`wp_unique_id()`等で表示ごとに生成し、英数字・ハイフンだけに限定する。保存しないので、複製・同期パターンの複数表示でも衝突しない。
- 共通CSSはSCSSから配信。個別クエリは親render時に作り、`Text::minify()`を通す。
- 出力場所は`wp_enqueue_block_support_styles()`のコア方式を基本にする。クラシックテーマはfooter、ブロックテーマはheadへの登録となる。`wp_add_inline_style()`をhead出力後に呼ぶだけでは欠落し得る。[コア関数](https://developer.wordpress.org/reference/functions/wp_enqueue_block_support_styles/)
- 対象hookが実行済みの遅延renderでは、そのrender結果に安全なstyle要素を添付するフォールバックを設ける。RESTプレビューもHTML単体でCSSが欠落しない契約にする。
- 生の投稿属性をstyle要素へ埋め込まない。数値、列挙値、許可した長さとプリセットだけから組み立てる。エスケープは値の検証の代わりにはならない。
- 初版では1インスタンス1クエリとし、不要な永続CSSファイル・DBキャッシュ・固定ID管理を増やさない。CSSは短く、ページキャッシュ時はHTMLと一緒に扱える。
- エディターはclientId由来の一時識別子と同じ数値規則でCSSを生成し、そのブロックのキャンバス内へstyleを置く。iframe外のdocument.headへ固定挿入しない。削除・値変更時は古いCSSもReactの更新で除去する。

## エディターと固定2個の制御

- 親は`useBlockProps({ className: 'ystdtb-sticky-columns__container' })`を外側に、`useInnerBlocksProps({ className: 'ystdtb-sticky-columns' }, options)`を内側Gridに使用する。子との間に別のレイアウトラッパーを挟まない。
- templateは同じ子ブロック2個。`templateLock: 'all'`、`allowedBlocks`固定、`renderAppender: false`を設定する。
- 子内部は`templateLock: false`。必要なら初期の空段落を1つ置くが、通常ブロックの許可一覧は独自に狭めない。
- 親のロックは追加・削除・移動の通常UIを抑える。権限による解除やコード編集・REST経由まで2個を保証するものではない。
- 既存データが0・1・3個、異種の子を含む場合、勝手に削除・切詰め・テンプレート再同期しない。エディターでは内容を残して不整合を通知し、修復操作を利用者に選ばせる。
- PHPは不整合時に全内容を1列・追従なしで表示し、データを失わない。初期挿入の空状態と、既存データの破損を区別する。
- `useSelect`で親と直下の子属性を読み、幅と追従を導出する。計算結果をuseEffectで親へ保存し続けない。
- 互換幅入力は6.5〜6.9のみ。`UnitControl`等のラッパーを使い、7.0以上の標準パネルと同時表示しない。利用中のGutenbergプラグインで機能が先行提供される場合も二重表示を防ぐ能力判定を用意する。
- 独自パネルは共有コンポーネントとして作り、属性パス・親子操作はブロック側へ置く。既存のToolsPanel/ToolsPanelItem、BaseControl、UnitControl、CustomSelectControlを優先する。
- エディター専用CSSは選択表示・appender等の補正に限定し、Grid・gap・切替・stickyのルールを別物にしない。
- 追従はエディターのスクロール領域とフロントのページスクロールで基準が異なる。見た目と切替条件は一致させるが、同じ画面座標で止まるとは保証しない。

## 追従範囲・オフセット

- 追従するのは子ブロックの装飾を含む外側全体。Gridコンテナの下端で停止し、親の外まで追従しない。
- `align-self: start`で追従する子が相手と同じ高さに伸びるのを防ぐ。両方の高さが同じなら追従移動する余地はない。
- `top`は利用者指定offsetに、固定表示中の管理バー補正を加える。管理バーが固定でない状態では高さを加えない。
- yStandardの固定ヘッダー高さに使える共通トークンは今回の対象範囲では確認できなかった。架空のテーマ変数へ依存せず、初期値0と利用者指定offsetを提案する。
- 祖先の`overflow: auto/scroll/hidden`はスクロール基準を変える。横方向だけのoverflow指定も反対軸のcomputed値へ影響し得る。祖先CSSを勝手に書き換えない。[stickyの仕様](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/position)
- 画面より高い追従内容はCSSだけでは「高さを測って自動OFF」にできない。内容末尾へ到達できることを検証し、長いカラムではOFFを案内する。内部スクロールの自動追加はしない。
- 親の角丸のためにoverflowを切る処理は入れない。影やフォーカスリングを欠落させない。

## 逆順とアクセシビリティ

推奨は「2列時のみ見た目を反転、1列時は元のDOM順」。第1・第2の保存順、読み上げ順、Tab順は変更しない。

- CSSのGrid配置で第1を2列目、第2を1列目へ移し、列幅の並びも反転する。
- `direction: rtl`は使わない。内容の文字方向を変更しない。
- 1列時は明示したgrid-column/grid-rowを解除し、第1→第2へ戻す。
- 逆順時は視覚順と読み上げ・Tab順が一致しない。設定説明に明記し、順序依存の説明やフォームには通常順を推奨する。
- 正のtabindexやARIAで読み上げ順を擬似的に操作しない。
- もし視覚順と読み上げ順の一致が必須なら、切替操作を「子ブロックの実際の並べ替え」に変更する。この場合は1列でも反転順になる。単なるCSS表示順設定とは仕様が変わるため要承認。

## 実装時の検証方針

### ブラウザを起動しない確認

- breakpointと幅・gapの正規化、プリセット、0・未設定、不正CSS値の拒否をTS unitで確認する。
- 追従スイッチの切替、親不在、不整合、Undo/Redo、子の装飾保持をコンポーネントテストで確認する。
- 保存HTMLとPHP出力に標準の`wp-block-ystdtb-sticky-columns`・`wp-block-ystdtb-sticky-columns-item`がなく、`.ystdtb-sticky-columns > .ystdtb-sticky-columns-item`の関係を保つこと。独自selectorsでもグローバルスタイルとSupportsの装飾が反映されること。
- fixtureで親子のparse/serialize、装飾、幅、通常・逆順、追従なし・第1・第2、保存再読込を確認する。
- `test/integration/helpers/register-blocks.js`へ両ブロックを登録。`.html`、`.parsed.json`、`.json`、`.serialized.html`を確認する。
- PHPには幅計算、全内容保持、不正値、遅いCSS出力、入れ子・複数描画の分岐があるため、`phpunit/blocks/`へ対象テストを追加する。
- CSSへ`</style>`等を混入できないこと、無効な値でフロント全体が壊れないことを確認する。
- 対象TS/SCSS/PHPのlint、型確認、ブロックビルドを行う。既存npm lintには`--fix`があるので、依頼外ファイルを変更しない対象限定コマンドを選ぶ。
- WP6.5、6.9、7.0、現行対象版でSupportsの登録と出力を確認する。現在のnpm依存によるJestだけで古いWP互換性を合格にしない。

### 別途許可を得て実施する画面確認

agent-browser CLIで専用ウィンドウを使い、対象編集画面とフロントを確認する。今回は実施していない。

- 同じ画面幅で、本文・狭いカラム内に置いたブロックが異なる列数になること。
- コンテナ幅719/720/721pxと任意値の境界。親padding・border変更後も内容幅基準で切り替わること。
- 幅未指定、片側px、片側%、両側%、両側固定長、混合単位、合計過大、寸法プリセット。
- gapなし・0・軸別・プリセット、子margin、背景、枠線、影、縦書きを含む文字設定。
- 複数インスタンス、入れ子、複製、同期パターン、投稿ループ内の繰返し表示。
- 第1/第2追従、逆順、1列解除、親下端停止、固定ヘッダー・管理バー、長い追従内容、祖先overflowあり。
- リストビュー、キーボード、Tab順、Undo/Redo、保存再読込、子内の任意ブロック編集。
- iframeの編集画面とフロント、yStandardと別テーマ、コンテナクエリ非対応相当の基本CSS。
- 幅切替の確認はコンテナ幅を中心に行う。端末エミュレーションやスマホ幅の追加確認は許可範囲を別途明示する。

合格条件は、2個の内容が失われないこと、設定が保存後も保持されること、指定境界で列数・追従が一致すること、幅とgapの計算で意図しない横はみ出しがないこと、他インスタンスへ設定が漏れないこと。

## 承認が必要な仕様

- 最低WPは本体宣言の6.5を基準にし、6.5〜6.9の幅入力を補うか。標準UIのみを優先して新ブロックを7.0以上に限定するか。ガイドの6.1表記の整備は別変更とする。
- タイポグラフィの「すべて」を既存FAQ相当＋対応版のtextAlign/textIndentとし、textColumns/fitTextを初版から除外してよいか。writingModeを本文へ適用する案を採用するか。
- 逆順は2列時のみ、1列時はDOM順でよいか。順序依存コンテンツにも使うなら実並べ替え案を選ぶ。
- 幅を希望幅として扱い、過大指定時は縮小、両側固定で余りがあれば末尾に残す契約でよいか。単位制限と割合のgap除外基準も含む。
- breakpoint初期値720px、整数1〜4096px、既定gap24px、追従初期値OFFでよいか。
- 固定ヘッダー用の追加offset入力を設けるか。推奨はpx/remで追加し、初期値0。
- 子のスイッチの保存先を親の単一`stickyColumn`にするか。親子間の矛盾を避けるため推奨する。

## 今回の作業範囲

親子それぞれのフォルダに設計Markdownを配置した。旧`docs/sticky-columns-design.md`は本書と子の設計書へ分割・移動した。ブロックコード、依存関係、ビルド出力は変更していない。実装テスト・ビルド・ブラウザ確認は未実施。上記はコード調査と一次資料に基づく設計であり、動作確認済みの実装仕様ではない。
