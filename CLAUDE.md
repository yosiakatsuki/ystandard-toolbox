# CLAUDE.md

このファイルは、Claude Code がこのリポジトリで作業する際のガイダンスを提供します。

**重要**: ドキュメント・コメント・チャットはすべて日本語で記述すること。

## 関連ドキュメント

- [docs/v2-roadmap.md](docs/v2-roadmap.md) — v2 リリースに向けた残タスク
- [docs/future-improvements.md](docs/future-improvements.md) — v2 リリース後に対応したい改修リスト
- [docs/design-system.md](docs/design-system.md) — yStandard Toolbox デザインシステム
- [docs/ystandard-design-system.md](docs/ystandard-design-system.md) — yStandard テーマ デザインシステム
- [docs/testing.md](docs/testing.md) — テスト全般（unit / integration の構成、fixture 追加手順、テスト用画像URL）
- [docs/block-examples-guideline.md](docs/block-examples-guideline.md) — ブロック設定例・使用例（examples）の作成ガイドライン
- [docs/block-operation-test-guideline.md](docs/block-operation-test-guideline.md) — ブロック操作テスト（Chrome 拡張を使った UI 操作検証）の共通ガイドライン
- [docs/v2-block-testing.md](docs/v2-block-testing.md) — v2 ブロック全体テストの対象・進捗管理

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

## 提案・実装方針の品質基準

機能追加・修正・テスト方針などを提案するときの判断基準。

### 原則

- **WordPress コア（Gutenberg を含む）の手法に合わせる**ことを最優先とする
  - WordPressプラグインとしての品質・保守性・他開発者にとっての読みやすさを重視
  - 「ystdtb 流の独自手法」を勝手に作らない
- **なるべく最新の API・パターン**を使う
  - 非推奨APIや古いパターンは避ける
  - 新規実装時は最新の WordPress / Gutenberg のドキュメント・実装を参考にする
- 例: ブロック開発は `block.json` メタデータ駆動、deprecated は WordPress 標準の `deprecated` 配列、テストは Gutenberg の fixture-based test、など

### オーバーエンジニアリング回避

WordPress コア準拠の方法が、このプロジェクトの規模・目的に対して**過剰**になる場合は、別の現実的な選択肢も併記する。

判断の目安:

- セットアップ・学習コストが導入効果に見合わない
- 単発の小規模機能のために大きな仕組みを導入する必要がある
- 既存コードへの広範な改修が必要になる

提案時は次の形式で示す:

1. **推奨案**: WordPress コア準拠の方法（最新かつ標準）
2. **代替案**: 軽量で現実的な方法（必要に応じて）
3. **判断材料**: それぞれのメリット・デメリット・工数感

ユーザーが選びやすいよう、推奨理由と妥協ポイントを明示する。

## コーディング規約

### 基本

- WordPressのコーディング規約に従う
- ドキュメント・コメントは日本語で記述する
- TypeScriptの型定義やインターフェース名は英語

### ドキュメント命名ルール（同名設定の曖昧さ回避）

1 つのブロック内に同じ名前の設定が複数箇所存在する場合、ドキュメント上は必ず適用対象の要素名を前置する。

- ✅ 「○○角丸」「△△角丸」（例: 「BOX角丸」「ラベル角丸」）
- ✅ 「○○文字色」「△△文字色」（例: 「メインテキスト文字色」「サブテキスト文字色」）
- ❌ 単独の「角丸」「文字色」（どこを指すか不明）

**理由**: 長いドキュメントの途中を「L 160 の〜」のように行番号で参照された際、その行単独で何の話か分かるようにするため。

**判断基準**: 同一ブロック内で同じラベル名の設定が 2 つ以上存在しうるなら、常に対象要素名を前置する。単独の設定（他と競合しないもの）はそのままで良い。

**要素名の決め方**: UI ラベル／実装上の論理要素名（attributes 名と対応が取れる呼び方。`boxBorderRadius` → 「BOX角丸」、`labelBorderRadius` → 「ラベル角丸」、`mainTextColor` → 「メインテキスト文字色」など）を用いる。

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
- **PHPでインラインCSSをenqueueする場合**: `wp_add_inline_style()` に渡す CSS は必ず `ystandard_toolbox\Util\Text::minify()` で圧縮する。NOWDOC 等で書いた読みやすい CSS もそのまま enqueue せず minify を通すこと。
- **レスポンシブ用メディアクエリ**: SCSS の `@include media-breakpoint-*` ではなく、PHP 側の `Styles::add_media_query_only_mobile` / `only_tablet` / `over_desktop` を使う。ブレークポイント定義の一元化（`Styles::BREAKPOINTS` / `ystdtb_css_breakpoints` フィルター）を活かすため。

## テスト

- **PHPUnit**: `/phpunit/` — WordPressテストフレームワーク
- **Jest**: `/test/` — JavaScriptテスト
  - **unit** (`test/unit/`): pure function / コンポーネント単体テスト。テストファイルは `src/` 配下に `*.test.ts(x)` で配置
  - **integration** (`test/integration/`): Gutenberg fixture-based test（ブロックの parse / migrate / serialize / validate 検証）

詳細・実行コマンド・fixture 追加手順は [docs/testing.md](docs/testing.md) を参照。

## ブロック設定例・使用例（examples）

詳細は [docs/block-examples-guideline.md](docs/block-examples-guideline.md) を参照。

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
