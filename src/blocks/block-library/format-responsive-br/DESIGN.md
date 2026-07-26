# DESIGN.md - インラインフォーマット：レスポンシブ改行

## 概要

文章の途中で「モバイルのみ改行」「タブレットのみ改行」「PCのみ改行」を指定できるインラインフォーマット。
ブロックエディター標準の `registerFormatType` で実装し、保存結果は素の HTML のみにする。

```html
これはスマホだけ<span class="ystdtb-br--mobile"><br></span>ここで改行される文章です。
```

## 背景

「この文はスマホでだけここで改行したい」という要求は日本語サイトで頻出だが、現状の Toolbox には手段がない。
既存の `block-hook-hidden-by-size` はブロック単位の表示切り替えしかできず、文章途中のインライン改行には使えない。

他プロダクトではショートコード（`[br sp]` 等）で実現している例があるが、次の難点がある。

- `the_content` を通らない箇所（ブロック属性のレンダリング、抜粋、テーマ側テンプレート）で機能しない
- エディター上でプレビューされず、書いている本人が結果を確認できない
- 記事本文にプラグイン固有の独自記法が残る

インラインフォーマットにすることで、

- 段落・見出し・リスト・テーブルセル・Toolbox 独自ブロックの RichText すべてで同じ操作が使える
- エディター上でそのまま改行として見える
- プラグインを停止しても「常に改行される普通の改行」に劣化するだけで、本文は壊れない

## 保存形式の検討

`@wordpress/rich-text` の制約により、実質 1 通りしか選べない。以下は実装前に node_modules のソースで確認した結果。

### 採用：`\n` を `span` フォーマットで包む

```html
<span class="ystdtb-br--mobile"><br></span>
```

- `to-tree.js`（`\n` の処理分岐）が `\n` を「その時点で開いているフォーマット要素の内側」に `<br>` として書き出す
- `create.js` は上記 HTML を「`span` フォーマットが適用された `\n` 1 文字」として復元する
- parse ⇄ serialize が完全に往復するため、ブロック検証（save の HTML 一致）も通る

### 不採用：`<br class="ystdtb-br--mobile">` を直接挿入

`@wordpress/rich-text` の `create.js` は `br` 要素を**属性ごと捨てて `\n` に変換する**ため、クラスが保存されない。

### 不採用：`object: true` の void フォーマット（空 `<span>`）

`to-html-string.js` は `object` フォーマットを**閉じタグなしで出力する**（`<img>` や `<br>` 用の実装）。
`span` で使うと `<span class="...">` だけが出力されて HTML が壊れ、再パース時に後続テキストを巻き込む。

## 仕様

### 提供する種類

| フォーマット名 | クラス名 | ラベル | 有効な画面幅 |
| --- | --- | --- | --- |
| `ystdtb/br-mobile` | `ystdtb-br--mobile` | モバイルのみ改行 | `Styles::add_media_query_only_mobile` |
| `ystdtb/br-tablet` | `ystdtb-br--tablet` | タブレットのみ改行 | `Styles::add_media_query_only_tablet` |
| `ystdtb/br-desktop` | `ystdtb-br--desktop` | PCのみ改行 | `Styles::add_media_query_over_desktop` |

クラス名は BEM（`ystdtb-br` ブロック + サイズ修飾子）。
一度公開すると既存記事に残るため、後方互換のため変更しない。

### UI

フォーマットツールバー（B / I / リンクの並び）に専用のドロップダウンボタンを 1 つ置き、3 種を選ばせる。

- `BlockControls group="inline"` に `ToolbarGroup` + `ToolbarDropdownMenu` を出す。フォーマットツールバー自体が同じ `group="inline"` スロットに描画されるため（`block-editor/src/components/rich-text/format-toolbar-container.js`）、標準のフォーマットボタンと同じ位置に並ぶ
- ボタンアイコンは `CornerDownLeft`、メニュー項目は `Smartphone` / `Tablet` / `Monitor`（`react-feather`）
- 各項目はトグルではなく「挿入」。削除は通常の改行と同じく Backspace で行う

### 動作

- キャレット位置に改行を挿入する。選択範囲があるときは文字を消さないよう選択範囲の末尾に挿入する
- 挿入直後に文字を入力しても `span` の中には入らない（`insert()` が `activeFormats` を落とし、`getActiveFormats` が前後で短い側を採用するため）

### エディターでの見え方

エディターではフロント用 CSS を読み込まないため、**常に改行が見える**状態になる。
加えて、どのサイズ用の改行かを示す小さなバッジを `::before` の生成内容で表示する（`SP` / `TAB` / `PC`）。

既存の画面サイズ別非表示機能が「エディターでは表示したまま破線枠で示す」のと同じ考え方。

## 実装構成

```text
src/blocks/block-library/format-responsive-br/
├── block.json        # editorScript / editorStyle を読み込ませるための登録用メタデータ
├── index.php         # フロント用CSS出力 + register_block_type
├── index.tsx         # エントリー（CSS import + フォーマット登録呼び出し）
├── config.ts         # 3種の定義（フォーマット名・クラス名・ラベル）
├── formats.ts        # registerFormatType × 3
├── toolbar.tsx       # ツールバーのドロップダウン（フォーマットの edit）
├── utils.ts          # insertResponsiveBreak()
├── types.ts
├── style-editor.css  # エディター用のバッジ表示
├── DESIGN.md
└── test/utils.test.ts
```

`src/blocks/block-library/` 配下に置くことで、`webpack.blocks.v2.config.js`（`--webpack-src-dir=src/blocks/block-library`）でビルドされ、
`inc/blocks/class-blocks.php` の `glob( .../build/blocks/**/index.php )` で PHP が自動読み込みされる。

### block.json

ブロックではないが、`block-hook-hidden-by-size/block.json` と同じ「登録用ダミーブロック」として使う。
サーバー側で `register_block_type()` されたブロックの `editorScript` / `editorStyle` はエディターで必ず読み込まれるため、
アセットの手動エンキューが不要になる。クライアント側で `registerBlockType` を呼ばないのでインサーターには出ない。

- `apiVersion: 3` / `name: "ystdtb/format-responsive-br"`
- `editorScript: "file:./index.js"`
- `editorStyle: ["ystdtb-aktk-components-editor", "file:./index.css"]`
- フロント CSS は PHP 生成なので `style` キーは持たせない

### フォーマット登録

3 種を `config.ts` の配列で定義し、`formats.ts` で `registerFormatType` を回す。
`tagName: 'span'` + `className` で登録し、`edit` は**先頭（mobile）だけに渡す**。

`edit` に渡ってくる `value` / `onChange` は RichText 全体のものなので、1 つの `edit` から 3 種すべてを挿入できる
（`block-editor/src/components/rich-text/format-edit.js`。`edit` は任意プロパティ）。

### 改行の挿入

```ts
/**
 * レスポンシブ改行を挿入した RichText 値を返す
 */
export const insertResponsiveBreak = (
	value: RichTextValue,
	formatName: string
): RichTextValue => {
	// 改行文字 1 文字にフォーマットを適用した挿入用の値を作る
	const lineBreak = applyFormat( create( { text: '\n' } ), { type: formatName }, 0, 1 );
	// 選択範囲があるときは文字を消さないよう末尾に挿入する
	const index = value.end ?? value.start;
	if ( undefined === index ) {
		return value;
	}
	return insert( value, lineBreak, index, index );
};
```

### PHP（index.php）

`block-hook-hidden-by-size/index.php` と同じ singleton 構成にする
（`namespace ystandard_toolbox`、`get_instance()`、`init` で `register_block_type( __DIR__ )`）。

- `init`（優先度 100）で `register_block_type( __DIR__ )` → エディター用 JS / CSS が読まれる
- `wp_enqueue_scripts` でフロント用 CSS を出力（独自ハンドルを `wp_register_style( $handle, false )` で登録 → `wp_add_inline_style`）

CSS は `ystandard_toolbox\Util\Styles` のブレークポイントヘルパーで生成し、`Util\Text::minify()` を通す。
これで既存の画面サイズ別非表示機能と区切りが完全に一致し、yStandard v4 互換フィルター `ystdtb_css_breakpoints` も効く。

```text
/* 既定では改行しない */
.ystdtb-br--mobile > br, .ystdtb-br--tablet > br, .ystdtb-br--desktop > br { display: none; }
/* 対象サイズだけ改行を有効化（メディアクエリを後に出力して勝たせる） */
only_mobile   → .ystdtb-br--mobile > br { display: inline; }
only_tablet   → .ystdtb-br--tablet > br { display: inline; }
over_desktop  → .ystdtb-br--desktop > br { display: inline; }
```

`wp_enqueue_scripts` 限定にすることで、エディター iframe には流れない（エディターでは常に改行が見える）。

### エディター用 CSS

`--ystdtb--format-responsive-br--*` のカスタムプロパティ命名と `.css` でのネスト記述は
`block-hook-hidden-by-size/style-editor.css` に合わせる。

- `.ystdtb-br--mobile::before { content: "SP"; }` / `--tablet` は `"TAB"` / `--desktop` は `"PC"`
- 共通スタイル：極小フォント、角丸、薄いグレー背景、`user-select: none`、`pointer-events: none`

## 検証

### ビルド

`npm run build:blocks:v2` → `build/blocks/format-responsive-br/{index.js,index.css,index.php,block.json}` が生成されること。

### unit テスト

`test/utils.test.ts` を追加し `npm run test:unit:component` で実行する。

- `registerFormatType` を 3 種登録した上で、`insertResponsiveBreak` の結果を `toHTMLString` して `<span class="ystdtb-br--mobile"><br></span>` になること
- `create( { html } )` → `toHTMLString` の往復で HTML が一致すること（ブロック検証が通ることの担保）
- 選択範囲があるケースで既存テキストが消えないこと

`test/unit/setup-tests.js` が `@wordpress/data` を全体でモックしているため、
rich-text のストアを実際に動かすテストでは先頭で `jest.unmock( '@wordpress/data' )` が必要。

### lint

- `composer phpcs`
- `npx wp-scripts lint-js src/blocks/block-library/format-responsive-br`

### 実機確認

`npm run start`（wp-env port 10020）で `docs/block-operation-test-guideline.md` に沿って確認する。

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
