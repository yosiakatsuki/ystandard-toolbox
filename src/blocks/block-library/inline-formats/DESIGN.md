# DESIGN.md - インラインフォーマット

## 概要

yStandard Toolbox 独自のインラインフォーマット（RichText 上の書式）をまとめて提供する機能。
ブロックエディター標準の `registerFormatType` で実装し、保存結果は素の HTML のみにする。

フォーマットツールバーには **yStandard Toolbox のボタン 1 つ** を追加し、
その中のドロップダウンにフォーマットを機能グループごとに並べる。
フォーマットが増えてもボタンは 1 つのままで、ドロップダウン内の項目が増える形にする。

現在提供しているフォーマット

- レスポンシブ改行（`responsive-br/`）：モバイルのみ / タブレットのみ / PCのみ 改行

## 構成

```text
src/blocks/block-library/inline-formats/
├── block.json          # editorScript / editorStyle を読み込ませるための登録用メタデータ
├── index.php           # フロント用CSS出力 + register_block_type
├── index.tsx           # エントリー（フォーマット登録 + CSS読み込み）
├── config.ts           # 登録するフォーマットとツールバーグループの一覧
├── formats.ts          # registerFormatType でまとめて登録
├── toolbar.tsx         # 共通ツールバー（ドロップダウン1つ）
├── icon.tsx            # yStandard Toolboxアイコン
├── types.ts            # 共通の型定義
└── responsive-br/      # 機能ごとのディレクトリ
    ├── config.ts       # フォーマット定義（名前・クラス名・ラベル・アイコン）
    ├── controls.ts     # ツールバーに出す項目の定義
    ├── utils.ts        # 挿入処理
    ├── types.ts
    ├── style-editor.css
    └── test/utils.test.ts
```

`src/blocks/block-library/` 配下に置くことで、`webpack.blocks.v2.config.js`（`--webpack-src-dir=src/blocks/block-library`）でビルドされ、
`inc/blocks/class-blocks.php` の `glob( .../build/blocks/**/index.php )` で PHP が自動読み込みされる。

### なぜ機能ごとに block-library のディレクトリを分けないか

`block-library/` の各ディレクトリは block.json 単位で**別々の webpack バンドル**になる。
機能ごとにディレクトリを分けると共通ツールバーのモジュールがバンドルごとに複製され、
`BlockControls` のフィルもバンドルごとに描画されてしまうため、**ツールバーボタンが機能の数だけ増える**。
そのため、インラインフォーマットは 1 ディレクトリ（1 バンドル）にまとめ、
中を機能ごとのサブディレクトリで分ける構成にしている。

### block.json

ブロックではないが、`block-hook-hidden-by-size/block.json` と同じ「登録用ダミーブロック」として使う。
サーバー側で `register_block_type()` されたブロックの `editorScript` / `editorStyle` はエディターで必ず読み込まれるため、
アセットの手動エンキューが不要になる。クライアント側で `registerBlockType` を呼ばないのでインサーターには出ない。

フロント CSS は PHP 生成なので `style` キーは持たせない。

## 共通ツールバー

`toolbar.tsx` の `InlineFormatToolbar` が `BlockControls group="inline"` に
`ToolbarGroup` + `ToolbarDropdownMenu` を出す。
フォーマットツールバー自体が同じ `group="inline"` スロットに描画されるため
（`block-editor/src/components/rich-text/format-toolbar-container.js`）、B / I / リンクの隣に並ぶ。

- ボタンのアイコンは `icon.tsx` の `InlineFormatIcon`
- ボタンのラベルは `yStandard Toolbox`
- `controls` にはグループごとの配列を渡す。`ToolbarDropdownMenu` は配列の配列を受け取ると
  グループごとに区切って表示する（`components/src/dropdown-menu/index.tsx`）
- `edit` は RichText がフォーカスされている間だけ描画される

### edit を1つだけ描画する仕組み

`registerFormatType` の `edit` は各フォーマットごとに描画されるため、全フォーマットに渡すとボタンが重複する。
`formats.ts` では **先頭のフォーマットにのみ** 共通ツールバーの `edit` を渡している。
`edit` に渡される `value` / `onChange` は RichText 全体のものなので、1 つの `edit` から全フォーマットを操作できる
（`block-editor/src/components/rich-text/format-edit.js`。`edit` は任意プロパティ）。

### ツールバーボタンのアイコン

`icon.tsx` の `InlineFormatIcon` は、次の 2 つのマークを 1 つの SVG に合成した独自アイコン。
「Toolbox の機能」であることと「yStandard 用」であることを 24px のボタンで同時に伝えるため。

- 左上：管理画面メニューと同じ yStandard Toolbox のマーク（`assets/menu/toolbox.svg` のパスを転記）
- 右下：yStandard の ys マーク（`@aktk/components/ystandard-icon` の `YsIconPaths` を再利用）

CSS の重ね合わせではなく SVG 内の `transform` で配置している。
`viewBox="0 0 24 24"` に対して

- Toolbox マーク：`scale(0.4251)`（元の高さ 42.34 → 18）で左上に配置
- ys マーク：`translate(12.11 13.53) scale(0.5013)`（元の幅 22.34 → 11.2）で右下に配置

Toolbox マークは六角形で右下が空くため、この比率だと**マスクや切り抜きなしで重ならずに収まる**
（六角形の右下の辺と ys の左上に約 0.6 の余白が残る）。
比率を変える場合は、六角形を大きくしすぎると ys と衝突する点に注意。
マスクで抜く案は、六角形の右下が大きく削れて形が破綻したため採用していない。

ys マークのパスは `PanelIcon` と共用するため、`ystandard-icon` 側で
`YsIconPaths`（path のみを返すコンポーネント）として切り出している。

### アイコンが塗りつぶされる問題

WordPress の `.components-button svg { fill: currentColor; }` は
`fill="none"` の**属性**より優先されるため、線画アイコン（react-feather 等）が黒く塗りつぶされる。
共通ツールバー側でインラインスタイル（`config.ts` の `LINE_ICON_STYLE`）を当てて打ち消しているので、
機能側は `icon` にアイコンコンポーネントを渡すだけでよい。

## フォーマットを追加する手順

1. `inline-formats/{機能名}/` を作り、`config.ts`（フォーマット定義）と `controls.ts`（ツールバー項目）を用意する
2. `inline-formats/config.ts` の `INLINE_FORMATS` と `FORMAT_TOOLBAR_GROUPS` に追加する
3. フロント用 CSS が必要なら `index.php` にメソッドを追加し、`add_style()` から連結する
4. エディター用 CSS が必要なら `{機能名}/style-editor.css` を作り、`index.tsx` で import する

## レスポンシブ改行

### 背景

「この文はスマホでだけここで改行したい」という要求は日本語サイトで頻出だが、Toolbox には手段がなかった。
既存の `block-hook-hidden-by-size` はブロック単位の表示切り替えしかできず、文章途中のインライン改行には使えない。

他プロダクトではショートコード（`[br sp]` 等）で実現している例があるが、次の難点がある。

- `the_content` を通らない箇所（ブロック属性のレンダリング、抜粋、テーマ側テンプレート）で機能しない
- エディター上でプレビューされず、書いている本人が結果を確認できない
- 記事本文にプラグイン固有の独自記法が残る

インラインフォーマットにすることで、段落・見出し・リスト・テーブルセル・Toolbox 独自ブロックの
RichText すべてで同じ操作が使え、プラグインを停止しても
「常に改行される普通の改行」に劣化するだけで本文は壊れない。

### 保存形式の検討

`@wordpress/rich-text` の制約により、実質 1 通りしか選べない。以下は実装前に node_modules のソースで確認した結果。

#### 採用：`\n` を `span` フォーマットで包む

```html
これはスマホだけ<span class="ystdtb-br--mobile"><br></span>ここで改行される文章です。
```

- `to-tree.js`（`\n` の処理分岐）が `\n` を「その時点で開いているフォーマット要素の内側」に `<br>` として書き出す
- `create.js` は上記 HTML を「`span` フォーマットが適用された `\n` 1 文字」として復元する
- parse ⇄ serialize が完全に往復するため、ブロック検証（save の HTML 一致）も通る

#### 不採用：`<br class="ystdtb-br--mobile">` を直接挿入

`create.js` は `br` 要素を**属性ごと捨てて `\n` に変換する**ため、クラスが保存されない。

#### 不採用：`object: true` の void フォーマット（空 `<span>`）

`to-html-string.js` は `object` フォーマットを**閉じタグなしで出力する**（`<img>` や `<br>` 用の実装）。
`span` で使うと `<span class="...">` だけが出力されて HTML が壊れ、再パース時に後続テキストを巻き込む。

### 種類

| フォーマット名 | クラス名 | ラベル | 有効な画面幅 |
| --- | --- | --- | --- |
| `ystdtb/br-mobile` | `ystdtb-br--mobile` | モバイルのみ改行 | `Styles::add_media_query_only_mobile` |
| `ystdtb/br-tablet` | `ystdtb-br--tablet` | タブレットのみ改行 | `Styles::add_media_query_only_tablet` |
| `ystdtb/br-desktop` | `ystdtb-br--desktop` | PCのみ改行 | `Styles::add_media_query_over_desktop` |

クラス名は BEM（`ystdtb-br` ブロック + サイズ修飾子）。
一度公開すると既存記事に残るため、後方互換のため変更しない。

### 動作

- キャレット位置に改行を挿入する。選択範囲があるときは文字を消さないよう選択範囲の末尾に挿入する
- 各項目はトグルではなく「挿入」。削除は通常の改行と同じく Backspace で行う
- 挿入直後に文字を入力しても `span` の中には入らない（`insert()` が `activeFormats` を落とし、`getActiveFormats` が前後で短い側を採用するため）

### フロント用 CSS

`index.php` の `get_responsive_br_css()` で生成し、`Util\Text::minify()` を通して出力する。
ブレークポイントは `ystandard_toolbox\Util\Styles` のヘルパーを使うため、
既存の画面サイズ別非表示機能と区切りが完全に一致し、yStandard v4 互換フィルター `ystdtb_css_breakpoints` も効く。

```text
/* 既定では改行しない */
.ystdtb-br--mobile > br, .ystdtb-br--tablet > br, .ystdtb-br--desktop > br { display: none; }
/* 対象サイズだけ改行を有効化（メディアクエリを後に出力して勝たせる） */
only_mobile   → .ystdtb-br--mobile > br { display: inline; }
only_tablet   → .ystdtb-br--tablet > br { display: inline; }
over_desktop  → .ystdtb-br--desktop > br { display: inline; }
```

`wp_enqueue_scripts` 限定にすることで、エディター iframe には流れない（エディターでは常に改行が見える）。

### エディターでの見え方

エディターではフロント用 CSS を読み込まないため、常に改行が見える。
加えて、どのサイズ用の改行かを示す小さなバッジを `::before` の生成内容で表示する（`SP` / `TAB` / `PC`）。
既存の画面サイズ別非表示機能が「エディターでは表示したまま破線枠で示す」のと同じ考え方。

`--ystdtb--format-responsive-br--*` のカスタムプロパティ命名と `.css` でのネスト記述は
`block-hook-hidden-by-size/style-editor.css` に合わせている。

## 検証

### ビルド

`npm run build:blocks:v2` → `build/blocks/inline-formats/{index.js,index.css,index.php,block.json}` が生成されること。

### unit テスト

`responsive-br/test/utils.test.ts` を `npm run test:unit:component` で実行する。

- `registerFormatType` を 3 種登録した上で、`insertResponsiveBreak` の結果を `toHTMLString` して `<span class="ystdtb-br--mobile"><br></span>` になること
- `create( { html } )` → `toHTMLString` の往復で HTML が一致すること（ブロック検証が通ることの担保）
- 選択範囲があるケースで既存テキストが消えないこと

`test/unit/setup-tests.js` が `@wordpress/data` を全体でモックしているため、
rich-text のストアを実際に動かすテストでは先頭で `jest.unmock( '@wordpress/data' )` が必要。

### 実機確認

`npm run start`（wp-env port 10020）で `docs/block-operation-test-guideline.md` に沿って確認する。

- フォーマットツールバーに yStandard Toolbox のボタンが**1つだけ**表示される
- ボタンのアイコンが 24px でも Toolbox マーク + ys として判別できる
- ドロップダウン内のアイコンが線画で表示される（塗りつぶされていない）
- 段落の途中で「モバイルのみ改行」→ エディター上で改行 + `SP` バッジが出る
- 保存 → リロードしてブロック検証エラーが出ないこと
- フロントでウィンドウ幅を変え、対象サイズのみ改行されることを確認（3 種すべて）
- 見出し・リスト・テーブルセル・Toolbox の box ブロック内でも同じ操作ができること
- 改行直後に文字を入力しても `span` の中に入らないこと
- Backspace で改行が消えること

## 将来の検討事項

- キーボードショートカット（`RichTextShortcut`）。既存キーとの衝突が読めないため初期実装では入れない
- キャレットが既存のレスポンシブ改行に隣接している場合に、種類の切り替え（置換）や解除を行う操作
- 複合条件（「モバイル以外で改行」「PC以外で改行」）の追加。クラス種類が増えて長期の互換維持コストが上がるため、要望が出てから判断する
- `src/plugin-settings/start-page/feature-list.tsx` への機能追加（マニュアル URL 整備後）
