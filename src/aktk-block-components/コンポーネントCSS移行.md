# aktk-block-components 共有CSS移行 設計書

## 概要

aktk-block-components内の13個のCSS/SCSSファイルが、各コンポーネントのTSXで`import './style-editor.scss'`として読み込まれている。webpackが各ブロックを独立エントリーポイントとして処理するため、同じCSSが最大19ブロック分重複してバンドルされている。

本移行では以下を実現する：

- 共有コンポーネントCSSの重複排除
- SCSS → CSS への変換
- CSSクラスプレフィックスの `aktk-component__` 統一
- コンポーネントライブラリ内でCSS変数を自己完結させる
- PostCSSによるモダンCSS構文サポート（CSS Nesting、メディアクエリ範囲構文）

---

## 現状分析

### CSS読み込みの仕組み

現在、各コンポーネントのTSXファイルがSCSS/CSSを直接importしている：

```tsx
// 例: src/aktk-block-components/components/notice/index.tsx
import './style-editor.scss';
```

webpackが各ブロック（`src/blocks/block-library/*`）を独立エントリーポイントとしてビルドするため、複数のブロックが同じコンポーネントを使用すると、そのCSSがブロックごとに重複出力される。

### 対象ファイル一覧（13ファイル）

| # | ファイルパス | 形式 | importしているTSX |
|---|---|---|---|
| 1 | `components/buttons/editor.scss` | SCSS | `components/buttons/index.tsx` |
| 2 | `components/buttons/image-button.scss` | SCSS | `components/buttons/image-button.tsx` |
| 3 | `components/color-pallet-control/editor-color-palette.scss` | SCSS | `components/color-pallet-control/color-palette.tsx` |
| 4 | `components/custom-font-size-picker/style-editor.scss` | SCSS | `components/custom-font-size-picker/controls.tsx` |
| 5 | `components/custom-select-control/style-editor.css` | CSS | `components/custom-select-control/index.tsx` |
| 6 | `components/icon-control/style-editor.css` | CSS | `components/icon-control/wrapper.tsx` |
| 7 | `components/icon-select/icon-select.scss` | SCSS | ※TSXからの直接importなし（style-editor.scssと重複内容） |
| 8 | `components/icon-select/style-editor.scss` | SCSS | `components/icon-select/index.tsx` |
| 9 | `components/link-control/style-editor.scss` | SCSS | `components/link-control/index.tsx` |
| 10 | `components/notice/style-editor.scss` | SCSS | `components/notice/index.tsx` |
| 11 | `components/tab-panel/style-editor.scss` | SCSS | `components/tab-panel/responsive-select-tab.tsx` |
| 12 | `components/text-control/stretch-text-control/style-editor.scss` | SCSS | `components/text-control/stretch-text-control/index.tsx` |
| 13 | `components/toggle-group/style-editor.scss` | SCSS | `components/toggle-group/index.tsx` |

### CSS変数の依存関係

| 現在の変数名 | 使用箇所 | 定義元 | 値 |
|---|---|---|---|
| `--ystdtb--editor--text-color--gray` | `icon-control/style-editor.css` | `src/sass/ystandard-toolbox-block-editor.scss` | `#6b7280` |

この変数はプラグイン固有の命名（`ystdtb`）だが、aktk-block-componentsはプロジェクト共有ライブラリであるため、自己完結した変数名に変更する必要がある。

### 現在のCSSクラスプレフィックス

| 現在のクラス名 | 使用箇所（CSS） | 使用箇所（TSX） |
|---|---|---|
| `.ystdtb-custom-select-control` | `custom-select-control/style-editor.css` | `custom-select-control/index.tsx` |
| `.ystdtb-icon-unit-control-wrap` | `icon-control/style-editor.css` | `icon-control/wrapper.tsx` |
| `.ystd-component__icon-select` | `icon-select/icon-select.scss`, `icon-select/style-editor.scss` | `icon-select/index.tsx` |
| `.ystd-component__icon-select__icon-list` | `icon-select/icon-select.scss`, `icon-select/style-editor.scss` | `icon-select/index.tsx` |
| `.ystd-component__icon-select__popover` | `icon-select/icon-select.scss`, `icon-select/style-editor.scss` | `icon-select/index.tsx` |
| `.ystd-component__icon-preview` | `icon-select/style-editor.scss` | `icon-select/index.tsx` |

全クラスともaktk-block-components内部でのみ使用。外部ブロックからの直接参照なし。

---

## 設計方針

### WordPress共有スタイルハンドルの活用

WordPress本体は`wp_register_style`でスタイルハンドルを登録し、`block.json`の`editorStyle`から参照する仕組みを提供している。これを活用して共有CSSを1回だけ登録し、各ブロックから参照する。

**現在の`editorStyle`**:
```json
"editorStyle": "file:./index.css"
```

**移行後の`editorStyle`**:
```json
"editorStyle": ["aktk-components-editor", "file:./index.css"]
```

共有ハンドル`aktk-components-editor`が先 → ブロック固有CSSが後で読み込まれ、オーバーライドが正常に動作する。

### PostCSSによるモダンCSS構文サポート

SCSS → CSS変換にあたり、CSS Nestingを活用する。`postcss-preset-env`を導入し、以下の機能をサポートする：

- **CSS Nesting**: SCSSのネスト構文をネイティブCSS Nestingに変換
- **Media Query Range**: `width <= 40rem` → `max-width: 40rem` への変換

既存のSCSSファイルはSassが先にネストを展開するため、postcss-preset-envの追加による影響はない。

---

## 1. ビルドパイプライン

### 1.1 postcss-preset-env の導入

**インストール**:
```bash
npm install -D postcss-preset-env
```

**`postcss.config.js` の変更**:

```js
// postcss.config.js
module.exports = {
	plugins: {
		'postcss-preset-env': {
			stage: 2,
			features: {
				'nesting-rules': true,
				'media-query-ranges': true,
			},
		},
		tailwindcss: {},
		autoprefixer: { grid: 'autoplace' },
		cssnano: {
			preset: [
				'default',
				{ minifyFontValues: { removeQuotes: false } },
			],
		},
		'css-declaration-sorter': { order: 'smacss' },
	},
};
```

`postcss-preset-env`をtailwindcssの**前**に配置する。CSS Nestingの展開がTailwindの処理より先に行われる必要があるため。

### 1.2 webpack設定（共有CSS用）

`@wordpress/scripts`のデフォルト設定を活用し、RTL CSS自動生成を含む完全なビルドを行う。

**新規ファイル: `webpack.shared-css.config.js`**

```js
const defaultConfig = require( '@wordpress/scripts/config/webpack.config' );
const path = require( 'path' );

module.exports = {
	...defaultConfig,
	entry: {
		'aktk-components-editor':
			'./src/aktk-block-components/index.css',
	},
	output: {
		...defaultConfig.output,
		path: path.resolve( __dirname, 'build/shared' ),
	},
};
```

**生成物**:
- `build/shared/aktk-components-editor.css` - メインCSS
- `build/shared/aktk-components-editor-rtl.css` - RTL版（自動生成）
- `build/shared/aktk-components-editor.js` - 空のJS（webpack仕様上不可避、使用しない）
- `build/shared/aktk-components-editor.asset.php` - 依存関係

### 1.3 package.json scripts追加

```json
"watch:shared-css": "wp-scripts start --config webpack.shared-css.config.js",
"build:shared-css": "wp-scripts build --config webpack.shared-css.config.js"
```

既存の`watch`コマンドは`run-p watch:*`、`build`コマンドは`run-s build:*`のglobパターンで動作するため、上記コマンドは自動的に既存パイプラインに統合される。

### 1.4 対象ファイル

| ファイル | 変更内容 |
|---|---|
| `postcss.config.js` | `postcss-preset-env`追加 |
| `webpack.shared-css.config.js` | 新規作成 |
| `package.json` | `devDependencies`に`postcss-preset-env`追加、`scripts`に2コマンド追加 |

---

## 2. エントリーポイントとCSS変数定義

### 2.1 エントリーポイント

**新規ファイル: `src/aktk-block-components/index.css`**

コンポーネントライブラリのCSS変数定義 + 全コンポーネントCSSの集約。

```css
/* コンポーネント共通CSS変数 */
:root {
	--aktk-component--text-color--gray: #6b7280;
}

/* コンポーネントCSS */
@import './components/buttons/editor.css';
@import './components/buttons/image-button.css';
@import './components/color-pallet-control/editor-color-palette.css';
@import './components/custom-font-size-picker/style-editor.css';
@import './components/custom-select-control/style-editor.css';
@import './components/icon-control/style-editor.css';
@import './components/icon-select/icon-select.css';
@import './components/icon-select/style-editor.css';
@import './components/link-control/style-editor.css';
@import './components/notice/style-editor.css';
@import './components/tab-panel/style-editor.css';
@import './components/text-control/stretch-text-control/style-editor.css';
@import './components/toggle-group/style-editor.css';
```

### 2.2 CSS変数の移行

| 現在の変数名 | 新しい変数名 | 値 |
|---|---|---|
| `--ystdtb--editor--text-color--gray` | `--aktk-component--text-color--gray` | `#6b7280` |

- `icon-control/style-editor.css` 内の参照を新変数名に更新
- 元の `src/sass/ystandard-toolbox-block-editor.scss` の定義はそのまま維持（他の箇所で使用されていないが、安全のため）
- 新変数は `src/aktk-block-components/index.css` の `:root` ブロックで定義

### 2.3 対象ファイル

| ファイル | 変更内容 |
|---|---|
| `src/aktk-block-components/index.css` | 新規作成 |

---

## 3. SCSS → CSS 変換 + @apply除去

### 3.1 変換一覧

| # | ファイル | 変換内容 |
|---|---|---|
| 1 | `buttons/editor.scss` → `.css` | `@tailwind utilities`削除 + `@apply` 5行除去 + CSS Nesting |
| 2 | `buttons/image-button.scss` → `.css` | CSS Nesting |
| 3 | `color-pallet-control/editor-color-palette.scss` → `.css` | `@apply` 1行除去 + `rgba(#999, 0.8)` → `rgb(153 153 153 / 0.8)` + CSS Nesting |
| 4 | `custom-font-size-picker/style-editor.scss` → `.css` | `@apply` 1行除去 + CSS Nesting |
| 5 | `custom-select-control/style-editor.css` | 変換不要（既にCSS） |
| 6 | `icon-control/style-editor.css` | CSS変数名の更新のみ |
| 7 | `icon-select/icon-select.scss` → `.css` | CSS Nesting |
| 8 | `icon-select/style-editor.scss` → `.css` | CSS Nesting |
| 9 | `link-control/style-editor.scss` → `.css` | CSS Nesting + SCSSコメント → CSSコメント |
| 10 | `notice/style-editor.scss` → `.css` | 変換軽微（ネストなし、SCSSコメント除去のみ） |
| 11 | `tab-panel/style-editor.scss` → `.css` | `@apply` 4行除去 + CSS Nesting |
| 12 | `text-control/stretch-text-control/style-editor.scss` → `.css` | CSS Nesting |
| 13 | `toggle-group/style-editor.scss` → `.css` | CSS Nesting |

### 3.2 @apply変換詳細

#### buttons/editor.scss（5行）

```scss
/* 変換前 */
.aktk-components__horizon-buttons {
	@apply flex;
	> button {
		@apply w-full text-center justify-center border border-solid;
		&:not(:first-child) {
			@apply rounded-l-none;
		}
		&:not(:last-child) {
			@apply rounded-r-none border-r-0;
		}
	}
}
```

```css
/* 変換後 */
.aktk-components__horizon-buttons {
	display: flex;

	& > button {
		width: 100%;
		text-align: center;
		justify-content: center;
		border-width: 1px;
		border-style: solid;
		box-shadow: none !important;
		border-color: var(--wp-components-color-accent, var(--wp-admin-theme-color, #3858e9));

		&:not(:first-child) {
			border-top-left-radius: 0;
			border-bottom-left-radius: 0;
		}

		&:not(:last-child) {
			border-top-right-radius: 0;
			border-bottom-right-radius: 0;
			border-right-width: 0;
		}
	}
}
```

#### tab-panel/style-editor.scss（4行）

```scss
/* 変換前 */
.aktk-responsive-select-tab {
	.components-tab-panel__tabs {
		@apply border-0 border-b border-b-gray-100 border-solid;
	}
	.components-tab-panel__tabs {
		@apply grid grid-cols-2;
	}
	.components-tab-panel__tabs-item {
		@apply text-center justify-center;
	}
}
```

```css
/* 変換後 */
.aktk-responsive-select-tab {
	& .components-tab-panel__tabs {
		border-width: 0;
		border-bottom-width: 1px;
		border-bottom-color: rgb(243 244 246); /* gray-100 */
		border-style: solid;
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
	}

	& .components-tab-panel__tabs-item {
		text-align: center;
		justify-content: center;
	}
}

.aktk-responsive-select-tab-for-setting-page {
	& .aktk-responsive-select-tab {
		& .components-tab-panel__tabs {
			display: block;
		}
	}
}
```

#### custom-font-size-picker/style-editor.scss（1行）

```scss
/* 変換前 */
.aktk-component__custom-font-size-picker {
	.components-tab-panel__tabs {
		@apply border-0 border-b border-b-gray-100 border-solid;
	}
}
```

```css
/* 変換後 */
.aktk-component__custom-font-size-picker {
	& .components-tab-panel__tabs {
		border-width: 0;
		border-bottom-width: 1px;
		border-bottom-color: rgb(243 244 246); /* gray-100 */
		border-style: solid;
	}
}
```

#### color-pallet-control/editor-color-palette.scss（1行 + Sass関数変換）

```scss
/* 変換前 */
.aktk-components__color-palette-control {
	legend {
		@apply px-4 pt-4;
		/* ... */
	}
}
/* rgba(#999, 0.8) はSass関数 */
```

```css
/* 変換後 */
.aktk-components__color-palette-control {
	& legend {
		padding-left: 1rem; /* px-4 */
		padding-right: 1rem;
		padding-top: 1rem; /* pt-4 */

		& * {
			font-weight: 700 !important;
			margin: 0 !important;
		}

		& + div {
			padding-top: 4px !important;
		}
	}
}

.components-circular-option-picker__option {
	&[style*="currentColor"],
	&[style*="currentcolor"] {
		color: transparent !important;
		background-color: #fff !important;
		background: repeating-linear-gradient(
			-45deg,
			rgb(153 153 153 / 0.8),
			rgb(153 153 153 / 0.8) 3px,
			#fff 0,
			#fff 6px
		) !important;
	}

	&[style*="transparent"] {
		color: transparent !important;
		background-color: rgb(255 255 255 / 0.6) !important;
	}
}
```

### 3.3 対象ファイル

- 上記13ファイル（SCSS → CSS変換 or 内容更新）

---

## 4. CSSクラスプレフィックス統一

### 4.1 変更対象

| 現在のクラス名 | 変更後 | 変更対象ファイル |
|---|---|---|
| `.ystdtb-custom-select-control` | `.aktk-component__custom-select-control` | `custom-select-control/style-editor.css`, `custom-select-control/index.tsx` |
| `.ystdtb-icon-unit-control-wrap` | `.aktk-component__icon-unit-control-wrap` | `icon-control/style-editor.css`, `icon-control/wrapper.tsx` |
| `.ystd-component__icon-select` | `.aktk-component__icon-select` | `icon-select/icon-select.css`, `icon-select/style-editor.css`, `icon-select/index.tsx` |
| `.ystd-component__icon-select__icon-list` | `.aktk-component__icon-select__icon-list` | 同上 |
| `.ystd-component__icon-select__popover` | `.aktk-component__icon-select__popover` | 同上 |
| `.ystd-component__icon-preview` | `.aktk-component__icon-preview` | `icon-select/style-editor.css`, `icon-select/index.tsx` |

### 4.2 影響範囲

全クラスともaktk-block-components内部でのみ使用されている。外部ブロックからの直接CSS参照はなし。TSXファイル内のクラス名参照のみ更新が必要。

### 4.3 対象ファイル

- CSS: `custom-select-control/style-editor.css`, `icon-control/style-editor.css`, `icon-select/icon-select.css`, `icon-select/style-editor.css`
- TSX: `custom-select-control/index.tsx`, `icon-control/wrapper.tsx`, `icon-select/index.tsx`

---

## 5. PHP側の実装

### 5.1 共有スタイルハンドル登録

**新規ファイル: `inc/blocks/class-shared-styles.php`**

```php
<?php
/**
 * 共有スタイル
 *
 * @package ystandard-toolbox
 */

namespace ystandard_toolbox;

defined( 'ABSPATH' ) || die();

/**
 * Class Shared_Styles.
 */
class Shared_Styles {

	/**
	 * aktk-block-componentsエディタースタイルのハンドル名
	 */
	const AKTK_COMPONENTS_EDITOR_HANDLE = 'aktk-components-editor';

	/**
	 * Instance.
	 *
	 * @var Shared_Styles
	 */
	private static $instance;

	/**
	 * Constructor.
	 */
	private function __construct() {
		add_action( 'init', [ $this, 'register_shared_styles' ] );
	}

	/**
	 * Instance.
	 *
	 * @return Shared_Styles
	 */
	public static function get_instance() {
		if ( ! isset( self::$instance ) ) {
			self::$instance = new self();
		}

		return self::$instance;
	}

	/**
	 * 共有スタイルの登録
	 *
	 * @return void
	 */
	public function register_shared_styles() {
		$css_path = YSTDTB_PATH . '/build/shared/aktk-components-editor.css';
		if ( ! file_exists( $css_path ) ) {
			return;
		}
		wp_register_style(
			self::AKTK_COMPONENTS_EDITOR_HANDLE,
			YSTDTB_URL . '/build/shared/aktk-components-editor.css',
			[],
			filemtime( $css_path )
		);
	}
}

Shared_Styles::get_instance();
```

### 5.2 load.phpへの追加

`inc/load.php` の `require_once __DIR__ . '/blocks/class-blocks.php';` の直前に追加：

```php
require_once __DIR__ . '/blocks/class-shared-styles.php';
```

### 5.3 plugin-settings側の対応

`inc/plugin-settings/class-plugin-settings.php` の `enqueue_setting_base_scripts()` メソッド内、`wp_enqueue_style( 'wp-components' );` の直前に追加：

```php
wp_enqueue_style( Shared_Styles::AKTK_COMPONENTS_EDITOR_HANDLE );
```

plugin-settingsは`block.json`経由の自動読み込みが効かないため、明示的にenqueueする必要がある。

### 5.4 対象ファイル

| ファイル | 変更内容 |
|---|---|
| `inc/blocks/class-shared-styles.php` | 新規作成 |
| `inc/load.php` | require追加（1行） |
| `inc/plugin-settings/class-plugin-settings.php` | enqueue追加（1行） |

---

## 6. block.json + TSX更新

### 6.1 block.json editorStyle配列化

全ブロック（19個）の`block.json`を更新：

```json
"editorStyle": ["aktk-components-editor", "file:./index.css"]
```

**対象ブロック**:
- `banner-link`, `block-hook-hidden-by-size`, `box`
- `description-list`, `description-list-dd-box`, `description-list-dd-simple`, `description-list-dl-column`, `description-list-dt`
- `faq`, `faq-item`
- `icon-list`, `icon-list-item`
- `parts`, `posts`
- `slider`, `slider-item`
- `sns-share`
- `timeline`, `timeline-item`

### 6.2 TSXからのCSS import削除

以下12箇所のimport文を削除：

| # | TSXファイル | 削除するimport |
|---|---|---|
| 1 | `components/buttons/index.tsx` | `import './editor.scss'` |
| 2 | `components/buttons/image-button.tsx` | `import './image-button.scss'` |
| 3 | `components/color-pallet-control/color-palette.tsx` | `import './editor-color-palette.scss'` |
| 4 | `components/custom-font-size-picker/controls.tsx` | `import './style-editor.scss'` |
| 5 | `components/custom-select-control/index.tsx` | `import './style-editor.css'` |
| 6 | `components/icon-control/wrapper.tsx` | `import './style-editor.css'` |
| 7 | `components/icon-select/index.tsx` | `import './style-editor.scss'` |
| 8 | `components/link-control/index.tsx` | `import './style-editor.scss'` |
| 9 | `components/notice/index.tsx` | `import './style-editor.scss'` |
| 10 | `components/tab-panel/responsive-select-tab.tsx` | `import './style-editor.scss'` |
| 11 | `components/text-control/stretch-text-control/index.tsx` | `import './style-editor.scss'` |
| 12 | `components/toggle-group/index.tsx` | ※現在import文なし → 対応不要 |

**注意**: `toggle-group/index.tsx`は現在CSS importを持っていない（別のファイルからimportされている可能性あり）。実装時に再確認すること。

---

## 7. Tailwind CSS 評価

### 7.1 今回のスコープ

- **SCSS/CSS内の@apply（全11行）**: 全て単純なユーティリティで1:1変換可能 → **本移行のスコープ内で対応**
- **TSX内のTailwindクラス（約360箇所）**: 維持 → **スコープ外**
- **Tailwind v4移行**: 別フェーズで対応 → **スコープ外**
- **Tailwind完全除去**: 別フェーズで検討 → **スコープ外**

---

## 8. 段階的移行フロー

### フェーズ1: インフラ整備

1. `postcss-preset-env` インストール
2. `postcss.config.js` 更新
3. `webpack.shared-css.config.js` 作成
4. `package.json` にビルドコマンド追加
5. `src/aktk-block-components/index.css` 作成（CSS変数定義 + 空の@import群）
6. `inc/blocks/class-shared-styles.php` 作成
7. `inc/load.php` 更新
8. ビルド動作確認（`npm run build:shared-css`）

### フェーズ2: パイロット移行（3コンポーネント）

シンプルなものから移行し、仕組み全体の動作を検証する。

1. **`toggle-group/style-editor.scss`** → `.css`（最もシンプル、3行）
2. **`notice/style-editor.scss`** → `.css`（シンプル、ネストなし）
3. **`custom-select-control/style-editor.css`**（既にCSS、プレフィックス変更のみ）

各コンポーネントの作業:
1. SCSS → CSS変換（拡張子変更 + 構文変換 + @apply除去）
2. プレフィックス変更（該当する場合、CSS + TSX）
3. TSXからのCSS import削除
4. `index.css` の@importコメントアウトを解除
5. 対象ブロックの `block.json` editorStyle配列化
6. ビルド確認 + エディター動作確認

**フェーズ2の検証項目**:
- `npm run build:shared-css` が正常完了するか
- `build/shared/aktk-components-editor.css` にCSSが出力されるか
- 各ブロックの `build/blocks/*/index.css` から該当CSSが消えているか
- エディター上でスタイルが正常に適用されるか
- DevToolsでCSSの読み込みが1回だけか確認
- plugin-settings画面でもスタイルが適用されるか

### フェーズ3: 残りのコンポーネント一括移行

パイロットで問題なければ残り10コンポーネントを一括対応:

4. `icon-control/style-editor.css`（プレフィックス変更 + CSS変数更新）
5. `text-control/stretch-text-control/style-editor.scss` → `.css`
6. `buttons/image-button.scss` → `.css`
7. `link-control/style-editor.scss` → `.css`
8. `buttons/editor.scss` → `.css`（@apply 5行除去）
9. `tab-panel/style-editor.scss` → `.css`（@apply 4行除去）
10. `custom-font-size-picker/style-editor.scss` → `.css`（@apply 1行除去）
11. `color-pallet-control/editor-color-palette.scss` → `.css`（@apply 1行除去 + Sass関数変換）
12. `icon-select/icon-select.scss` → `.css`（プレフィックス変更）
13. `icon-select/style-editor.scss` → `.css`（プレフィックス変更）

### フェーズ4: 全block.json更新 + クリーンアップ

- 全ブロック（19個）の `block.json` editorStyle配列化
- `inc/plugin-settings/class-plugin-settings.php` に共有CSSのenqueue追加
- 旧SCSSファイル削除
- ビルド出力サイズ比較検証

---

## 9. リスクと対策

| リスク | 対策 |
|---|---|
| CSS読み込み順序の変化 | block.jsonで共有ハンドルを先に記述し、ブロック固有CSSで上書き可能にする |
| TSX内Tailwindクラスの重複 | 今回のスコープ外。Tailwindユーティリティは各ブロックにバンドルされたまま維持 |
| plugin-settings画面でのCSS欠落 | PHP側で `wp_enqueue_style('aktk-components-editor')` を明示追加 |
| CSS Nestingのブラウザ互換性 | postcss-preset-envがフラットCSSに展開するため問題なし |
| RTL対応 | @wordpress/scriptsのwebpackビルドが自動生成 |
| icon-select内のicon-select.scssとstyle-editor.scssの内容重複 | 両ファイルを統合せず、それぞれCSS化して`index.css`から読み込む（内容の精査は次フェーズ） |

---

## 10. 検証方法

1. `npm run build` 後、`build/shared/aktk-components-editor.css` が生成されていること
2. `build/blocks/*/index.css` のサイズが減少していること
3. `wp-env` でエディター画面を開き、各コンポーネントのスタイルが適用されていること
4. DevToolsの「Styles」タブで同一CSSルールの重複がないこと
5. plugin-settings画面でもスタイルが正常に適用されること
6. RTLモードでの表示確認
