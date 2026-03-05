# aktk-block-components 共有CSS移行

## 概要

aktk-block-components内のコンポーネントCSSを、各ブロックへの重複バンドルからWordPressの共有スタイルハンドルによる一括配信に移行した。

### 実現した内容

- 共有コンポーネントCSSの重複排除（最大19ブロック分の重複 → 1回のCSS読み込み）
- SCSS → CSS への変換（CSS Nesting + postcss-preset-envで処理）
- CSSクラスプレフィックスの `aktk-component__` 統一
- コンポーネントライブラリ内でCSS変数を自己完結（`--aktk-component--*`）
- コンポーネントにつき1CSSファイル（`index.css`）に統一

---

## アーキテクチャ

### ビルドパイプライン

```
src/aktk-block-components/index.css  （エントリーポイント）
  ├── :root { CSS変数定義 }
  ├── @import './components/buttons/index.css'
  ├── @import './components/color-pallet-control/index.css'
  ├── @import './components/custom-font-size-picker/index.css'
  ├── @import './components/custom-select-control/index.css'
  ├── @import './components/icon-control/index.css'
  ├── @import './components/icon-select/index.css'
  ├── @import './components/link-control/index.css'
  ├── @import './components/notice/index.css'
  ├── @import './components/tab-panel/index.css'
  ├── @import './components/text-control/stretch-text-control/index.css'
  └── @import './components/toggle-group/index.css'
        ↓ webpack.shared-css.config.js
  build/shared/aktk-components-editor.css      （メインCSS）
  build/shared/aktk-components-editor-rtl.css  （RTL版・自動生成）
  build/shared/aktk-components-editor.asset.php
```

### CSS配信の仕組み

1. **PHP側**: `Shared_Styles` クラスが `aktk-components-editor` ハンドルでCSSを `wp_register_style` で登録
2. **ブロック側**: 各ブロックの `block.json` の `editorStyle` 配列でハンドルを参照
3. **plugin-settings側**: `wp_enqueue_style` で明示的にenqueue

```json
"editorStyle": ["aktk-components-editor", "file:./index.css"]
```

共有ハンドルが先 → ブロック固有CSSが後で読み込まれ、オーバーライドが正常に動作する。

---

## ファイル構成

### 新規作成ファイル

| ファイル | 説明 |
|---|---|
| `webpack.shared-css.config.js` | 共有CSSビルド用webpack設定 |
| `src/aktk-block-components/index.css` | CSSエントリーポイント（変数定義 + 全コンポーネントimport） |
| `inc/blocks/class-shared-styles.php` | 共有スタイルハンドル登録クラス |
| `src/aktk-block-components/components/*/index.css` | 各コンポーネントCSS（11ファイル） |

### 変更ファイル

| ファイル | 変更内容 |
|---|---|
| `postcss.config.js` | `postcss-preset-env` 追加（CSS Nesting、Media Query Range対応） |
| `package.json` | `postcss-preset-env` 追加、`watch:shared-css` / `build:shared-css` 追加 |
| `inc/load.php` | `class-shared-styles.php` のrequire追加 |
| `inc/plugin-settings/class-plugin-settings.php` | 共有CSSのenqueue追加 |
| 19個の `block.json` | `editorStyle` を文字列から配列に変更 |
| 7個のTSX | CSS import文削除 + クラスプレフィックス更新 |

### 削除ファイル

旧SCSS/CSSファイル（11ファイル）: `editor.scss`, `image-button.scss`, `editor-color-palette.scss`, `style-editor.scss`/`.css`, `icon-select.scss` 等

---

## コンポーネントCSS一覧

各コンポーネントにつき `index.css` 1ファイルに統一。

| # | コンポーネント | CSSファイル | 旧ファイル | 変換内容 |
|---|---|---|---|---|
| 1 | buttons | `index.css` | `editor.scss` + `image-button.scss` | 2ファイル統合 + @apply除去 |
| 2 | color-pallet-control | `index.css` | `editor-color-palette.scss` | @apply除去 + Sass関数変換 |
| 3 | custom-font-size-picker | `index.css` | `style-editor.scss` | @apply除去 |
| 4 | custom-select-control | `index.css` | `style-editor.css` | プレフィックス変更 |
| 5 | icon-control | `index.css` | `style-editor.css` | プレフィックス変更 + CSS変数更新 |
| 6 | icon-select | `index.css` | `icon-select.scss` + `style-editor.scss` | 2ファイル統合 + プレフィックス変更 |
| 7 | link-control | `index.css` | `style-editor.scss` | CSS Nesting + SCSSコメント変換 |
| 8 | notice | `index.css` | `style-editor.scss` | SCSSコメント除去 |
| 9 | tab-panel | `index.css` | `style-editor.scss` | @apply除去 |
| 10 | text-control/stretch-text-control | `index.css` | `style-editor.scss` | CSS Nesting |
| 11 | toggle-group | `index.css` | `style-editor.scss` | CSS Nesting |

---

## CSS変数

| 変数名 | 値 | 定義元 | 用途 |
|---|---|---|---|
| `--aktk-component--text-color--gray` | `#6b7280` | `index.css` の `:root` | icon-controlのアイコン色 |

旧変数 `--ystdtb--editor--text-color--gray`（`src/sass/ystandard-toolbox-block-editor.scss`）はそのまま維持。

---

## CSSクラスプレフィックス

| 旧クラス名 | 新クラス名 |
|---|---|
| `.ystdtb-custom-select-control` | `.aktk-component__custom-select-control` |
| `.ystdtb-icon-unit-control-wrap` | `.aktk-component__icon-unit-control-wrap` |
| `.ystd-component__icon-select` | `.aktk-component__icon-select` |
| `.ystd-component__icon-select__icon-list` | `.aktk-component__icon-select__icon-list` |
| `.ystd-component__icon-select__popover` | `.aktk-component__icon-select__popover` |
| `.ystd-component__icon-preview` | `.aktk-component__icon-preview` |

全クラスともaktk-block-components内部でのみ使用。外部影響なし。

---

## webpack設定の注意点

`webpack.shared-css.config.js` では `@wordpress/scripts` のデフォルト設定から `CopyPlugin` と `PhpFilePathsPlugin` を除外している。これはCSS専用ビルドに不要であり、含めると `block.json` ファイルが `build/shared/blocks/` にコピーされてしまうため。

```js
const plugins = defaultConfig.plugins.filter( ( plugin ) => {
	const name = plugin.constructor.name;
	return name !== 'CopyPlugin' && name !== 'PhpFilePathsPlugin';
} );
```

---

## 新規コンポーネントCSS追加時の手順

1. コンポーネントディレクトリに `index.css` を作成
2. CSS Nesting構文で記述（postcss-preset-envがフラットCSSに展開）
3. クラスプレフィックスは `aktk-component__` を使用
4. `src/aktk-block-components/index.css` に `@import` を追加
5. TSXファイルからCSS importは**行わない**（共有CSSとして一括配信される）

---

## 検証方法

1. `npm run build:shared-css` → `build/shared/aktk-components-editor.css` が生成されること
2. `npm run build:blocks:v2` → ブロックビルドが正常完了すること
3. `npm run build:plugin-settings` → plugin-settingsビルドが正常完了すること
4. エディター画面で各コンポーネントのスタイルが正常に適用されること
5. plugin-settings画面でもスタイルが正常に適用されること
6. DevToolsで同一CSSルールの重複がないこと