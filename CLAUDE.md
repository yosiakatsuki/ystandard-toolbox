# CLAUDE.md

このファイルは、Claude Code がこのリポジトリで作業する際のガイダンスを提供します。

**重要**: ドキュメント・コメント・チャットはすべて日本語で記述すること。

## プロジェクト概要

**yStandard Toolbox** は、無料WordPressテーマ「yStandard」を拡張する商用プラグイン。カスタムGutenbergブロック、デザイン設定、ユーティリティ機能を提供する。

- **WordPress**: 6.1+（日本語版推奨）
- **PHP**: 7.4+
- **yStandardテーマ**: 4.36.0+

## 開発コマンド

```bash
npm run start                # wp-env開始（http://localhost:10020）
npm run watch                # ファイル監視付き開発モード
npm run build                # プロダクションビルド
npm run build:blocks:v2      # モダンブロックのみビルド（src/blocks/block-library）
npm run stop                 # 環境停止
npm run lint                 # 全コード検証 (JS, CSS, PHP)
npm run test                 # 全テスト実行 (PHPUnit + Jest)
npm run format               # Prettierフォーマット
npm run zip                  # 配布用zipファイル作成
```

## ディレクトリ構成

```
src/
├── aktk-block-components/  # 共有コンポーネントライブラリ（yStandard Blocksと共用）
│   ├── components/         # カスタムUIコンポーネント（26個）
│   ├── wp-controls/        # @wordpress/componentsのラッパー（22個）
│   ├── config/             # 共通設定定数
│   ├── hooks/              # React hooks
│   ├── utils/              # ユーティリティ関数
│   └── types/              # 型定義
├── blocks/
│   ├── block-library/      # モダンTypeScriptブロック（19ブロック）
│   ├── api/                # REST API処理
│   ├── config/             # ブロックカテゴリ・スタイル設定
│   ├── components/         # プラグイン固有コンポーネント（レガシー含む）
│   ├── controls/           # レガシーコントロール
│   ├── function/           # レガシーユーティリティ関数
│   └── utils/              # プラグイン固有ユーティリティ
├── plugin-settings/        # React管理画面
│   ├── heading/            # 見出し設定（TypeScript完了）
│   ├── design/             # デザイン設定（TypeScript移行中）
│   ├── components/         # 管理画面固有コンポーネント
│   └── [その他設定画面]/
├── js/                     # レガシーJavaScript
└── sass/                   # SCSS

blocks/                     # レガシーブロック（posts/のみ残存）
inc/                        # PHPバックエンド（namespace: ystandard_toolbox）
build/                      # コンパイル済みアセット出力
```

### TypeScriptパスエイリアス

```
@aktk/block-components/*  → src/aktk-block-components/*
@aktk/blocks/*            → src/blocks/*
@aktk/function/*          → src/blocks/function/*
@aktk/components/*        → src/blocks/components/*
@aktk/controls/*          → src/blocks/controls/*
@aktk/utils/*             → src/blocks/utils/*
@aktk/api                 → src/blocks/api/index
@aktk/config/*            → src/js/config/*
@aktk/helper/*            → src/js/helper/*
@aktk/plugin-settings/*   → src/plugin-settings/*
```

### ビルドシステム

5つのwebpack設定が存在する:

| 設定ファイル | 対象 | 出力先 |
|---|---|---|
| `webpack.blocks.v2.config.js` | モダンブロック | `build/blocks/` |
| `webpack.blocks.hook.config.js` | ブロックフック（拡張機能） | `build/block-hook/` |
| `webpack.blocks.config.js` | レガシーブロック | `build/blocks/` |
| `webpack.app.config.js` | JSアプリ | `js/app/` |
| `webpack.plugin-settings.config.js` | プラグイン設定画面 | `build/plugin-settings/` |

## コーディング規約

### 基本

- WordPressのコーディング規約に従う
- ドキュメント・コメントは日本語で記述する
- TypeScriptの型定義やインターフェース名は英語

### importセクションコメント

**ブロックコメント形式**で英語で記述する:

```typescript
import classnames from 'classnames';              // 外部ライブラリ → コメント無し

/* WordPress Dependencies */
import { __ } from '@wordpress/i18n';

/* Aktk Dependencies */
import BaseControl from '@aktk/block-components/wp-controls/base-control';

/* Plugin Dependencies */
import { someUtil } from '@aktk/utils/some-util';
```

### aktk-block-componentsのルール

詳細は `src/aktk-block-components/コンポーネント作成ガイドライン.md` を参照。

#### @wordpress/componentsの直接利用禁止

`@wordpress/components`は直接使用せず、`wp-controls/`のラッパーを使用する。Gutenbergのアップデートで追加される過渡期プロパティ（`__next40pxDefaultSize`等）への対応を一箇所に集約するため。

```typescript
// ✅ 正しい
import BaseControl from '@aktk/block-components/wp-controls/base-control';
import ToggleControl from '@aktk/block-components/wp-controls/toggle-control';

// ❌ 誤り
import { BaseControl, ToggleControl } from '@wordpress/components';
```

**注意**: `@aktk/block-components/wp-controls/select-control`は存在しない。代わりに`@aktk/block-components/components/custom-select-control`を使用。

#### BaseControlラップ規則

**ブロック側ですべてのコントロールを`BaseControl`でラップする**（統一余白・視覚的統一性のため）:

```typescript
// 基本パターン
<BaseControl>
	<UnitControl label={ __( 'サイズ', 'ystandard-toolbox' ) } />
</BaseControl>

// ColorPaletteは両方にラベル設定
<BaseControl label={ __( '背景色', 'ystandard-toolbox' ) }>
	<ColorPalette label={ __( '背景色', 'ystandard-toolbox' ) } />
</BaseControl>
```

#### 新規コンポーネント作成の判断基準

- aktk-block-componentsは複数プロジェクト共用のため、**プラグイン固有のロジックを含めない**
- ブロック固有のロジックは`src/blocks/`側に作成可能
- 共通利用が想定される機能は作成前に相談すること
- aktk-block-componentsにないコンポーネントは、新規作成を提案する
  - 相談の結果、レガシー（`@aktk/components/`等）を使う可能性もある。ただし、今後移行対象となる。

## ブロック開発

### ブロック一覧（src/blocks/block-library/）

| ブロック | 種別 | 備考                      |
|---|---|-------------------------|
| `box` | 単体 |                         |
| `banner-link` | 単体 |                         |
| `parts` | 単体 |                         |
| `posts` | 単体 | レガシー`blocks/posts/`を移行中 |
| `sns-share` | 単体 |                         |
| `block-hook-hidden-by-size` | ブロックフック | 専用ビルドシステム               |
| `slider` + `slider-item` | 親子 |                         |
| `faq` + `faq-item` | 親子 |                         |
| `timeline` + `timeline-item` | 親子 |                         |
| `icon-list` + `icon-list-item` | 親子 |                         |
| `description-list` + `description-list-dd-box`, `description-list-dd-simple`, `description-list-dl-column`, `description-list-dt` | 親子（5ブロック） |                         |

### ブロックファイル構成

```
src/blocks/block-library/[ブロック名]/
├── block.json          # ブロック定義（メタデータ駆動）
├── index.tsx           # ブロック登録
├── index.php           # PHPブロック登録クラス
├── edit.tsx            # エディターコンポーネント
├── save.tsx            # 保存コンポーネント
├── style.scss          # フロントエンドCSS（index.tsxでimport、今後`.css`に移行予定）
├── style-editor.scss   # エディター専用CSS（edit.tsxでimport、今後`.css`に移行予定）
├── types.ts            # TypeScript型定義
├── utils.ts            # ブロック固有ユーティリティ
├── inspector-controls/ # サイドバー設定パネル
├── block-controls/     # ツールバーコントロール
└── deprecated/         # 下位互換対応
```

### index.tsx テンプレート

```tsx
/* WordPress Dependencies */
import { registerBlockType } from '@wordpress/blocks';

/* Aktk Dependencies */
import { COLORS } from '@aktk/block-components/config';
import { mergeDefaultAttributes } from '@aktk/block-components/utils/attributes';

/* Plugin Dependencies */
import { CATEGORY } from '@aktk/blocks/config';
// @ts-ignore
import metadata from './block.json';
import edit from './edit';
import save from './save';
import icon from './icon';
import './style.scss';

export function registerExampleBlock() {
	const attributes = mergeDefaultAttributes(
		metadata.name,
		metadata.attributes
	);

	registerBlockType( metadata.name, {
		...metadata,
		...{
			icon: (
				<IconName
					stroke={ COLORS.iconForeground }
					style={ { fill: 'none' } }
				/>
			),
			category: CATEGORY.common,
			attributes,
			edit,
			save,
		},
	} );
}

registerExampleBlock();
```

**importに関する注意**:
- `COLORS`は`@aktk/block-components/config`からインポート（yStandardプロジェクト共通）
- `CATEGORY`は`@aktk/blocks/config`からインポート（`@aktk/block-components/config`には存在しない。プラグイン固有。）

### index.php テンプレート

```php
<?php
/**
 * [ブロック名]ブロック
 *
 * @package ystandard-toolbox
 */

namespace ystandard_toolbox;

defined( 'ABSPATH' ) || die();

/**
 * Class [ブロック名]_Block.
 */
class [ブロック名]_Block {

	const BLOCK_NAME = 'ystdtb/[ブロック名]';

	/**
	 * Instance.
	 *
	 * @var [ブロック名]_Block
	 */
	private static $instance;

	/**
	 * Constructor.
	 */
	private function __construct() {
		add_action( 'init', [ $this, 'register_block' ], 100 );
	}

	/**
	 * Instance.
	 *
	 * @return [ブロック名]_Block
	 */
	public static function get_instance() {
		if ( ! isset( self::$instance ) ) {
			self::$instance = new self();
		}

		return self::$instance;
	}

	/**
	 * ブロック登録
	 *
	 * @return void
	 */
	public function register_block() {
		register_block_type( __DIR__ );
	}
}

[ブロック名]_Block::get_instance();
```

**PHP命名規則**:
- namespace: `ystandard_toolbox`（サブnamespace不使用）
- クラス名: `[ブロック名]_Block`（例: `Box_Block`）
- 定数: `BLOCK_NAME = 'ystdtb/[ブロック名]'`

### CSSパターン

- **ブロック個別管理**: `index.tsx`で`./style.scss`、`edit.tsx`で`./style-editor.scss`をimport
- **Tailwind CSS**: カスタムデザイントークン（preflight無効）
- **レスポンシブブレークポイント**: `mobile`, `tablet`, `desktop`
- **SMACSS**: プロパティ順序（CSS Declaration Sorter）

## テスト

- **PHPUnit**: `/phpunit/` - WordPressテストフレームワーク
- **Jest**: `/test/` - JavaScriptコンポーネントテスト

### テストファイル配置ルール

- テストファイルは該当ファイルと同階層に`test/`ディレクトリを作成
- 関数ごとにテストファイルを作成（例: `to-bool.test.ts`）
- インポートパスは相対パス（`../index`）を使用

## ブロック表示テスト用フィクスチャ

ブロックの全設定パターンをエディターに貼り付けて表示確認できるHTMLファイルを作成する。マニュアルの「設定例・使用例」ページとしても流用可能な品質で記述する。

### 配置

`src/blocks/block-library/[ブロック名]/test-fixtures/all-variations.html`

### 構成ルール

- **見出し階層**: h2（ページタイトル）→ h3（設定パネル単位）→ h4（設定項目）→ h5（各バリエーション）
- **h3（パネル）の直後**: そのパネルで何ができるのかを説明する導入文（`<p>`）を配置
- **h4（設定項目）の直後**: その設定の意味・用途を説明する文を配置
- **h5（バリエーション）**: 具体的な設定値がわかる見出し（例: 「3件（デフォルト）」「16:9（デフォルト・横長ワイド）」）
- **セパレーター**: パネル間に`<!-- wp:separator -->`を挿入
- **サイトデータ依存の設定**: 「サイトに合わせて変更してください」等の注記を入れる
- **末尾に「設定の組み合わせ例」セクション**: 実用的なパターンに用途を示す名前と説明文をつける（例: 「ブログ記事一覧」「ギャラリー風」「サイドバー向け」）

### ブロック形式

- **ダイナミックブロック**: `<!-- wp:ystdtb/[ブロック名] {"attr":"value"} /-->`
- **通常ブロック**: `<!-- wp:ystdtb/[ブロック名] {"attr":"value"} -->` + innerHTML + `<!-- /wp:ystdtb/[ブロック名] -->`
- **インナーブロックを持つブロック**: 親ブロック内に子ブロックを含めた完全なHTMLを記述。サンプルテキストには日本語のダミーテキストを使用

### 網羅基準

- `block.json`のattributesに定義された全属性を対象にする
- 各属性のデフォルト値、主要な選択肢、境界値（最小・最大）を含める
- boolean属性はtrue/false両方を含める
- レスポンシブ属性（モバイル/タブレット別設定）がある場合、別設定ありのパターンも含める
- 属性の組み合わせで見え方が変わるもの（例: デザインタイプ × メタ情報表示）はクロスパターンを含める

### 参考

`src/blocks/block-library/posts/test-fixtures/all-variations.html` を構成の参考にすること。

## 設計書運用

- **コード編集前に設計書（`DESIGN.md`）を必ず作成する**
- 機能ごとに該当ディレクトリ内に配置
- 変更の影響範囲と設計意図を明文化する

## コンポーネント変換リファレンス

レガシーコンポーネントからaktk-block-componentsへの主な変換:

| レガシー | aktk-block-components |
|---|---|
| `@aktk/components/responsive-values` | `@aktk/block-components/components/custom-size-control`（`values` → `value`） |
| `@aktk/components/responsive-font-size` | `@aktk/block-components/components/custom-font-size-picker`（プロパティ構造変更あり） |
| `@aktk/components/color-palette-control` | `@aktk/block-components/components/color-pallet-control` |
| `@aktk/components/custom-select-control` | `@aktk/block-components/components/custom-select-control` |
| `@aktk/components/border-radius-control` | `@aktk/block-components/components/border-radius-control` |
| `@aktk/components/box-shadow-control` | `@aktk/block-components/components/box-shadow-control` |
| `@aktk/components/align-items-control` | `@aktk/block-components/components/alignment-control` |
| `@aktk/components/unit-control` | `@aktk/block-components/wp-controls/unit-control` |
| `@aktk/components/number-control` | `@aktk/block-components/wp-controls/number-control` |
