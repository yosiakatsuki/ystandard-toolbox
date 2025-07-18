# CLAUDE.md

このファイルは、Claude Code (claude.ai/code) がこのリポジトリで作業する際のガイダンスを提供します。

**重要**: このプロジェクトの今後のドキュメント作成は、日本語を使用してください。

## コーディング規約

### 整形

-   WordPressのコーディング規約に従うこと

### ドキュメント・コメント

-   **基本的にドキュメント・コメントは日本語で記述する**
-   ラインコメント、Docコメント（JSDoc）、インラインコメントが対象
-   TypeScriptの型定義やインターフェース名は英語のまま
-   **importセクションコメントは英語で記述する。またラインコメントではなく、ブロックコメントとする**
    -   外部ライブラリのimport(classnames等) → コメント無しで先頭に記載
    -   WordPress依存関係 → WordPress Dependencies
    -   aktk-block-components(`src/aktk-block-components/**`,`@aktk/block-components/**`)依存関係 → Aktk Dependencies
    -   プラグイン固有の依存関係 → Plugin Dependencies

### aktk-block-componentsでのルール

#### @wordpress/componentsの直接利用不可

1. @wordpress/componentsのコンポーネントは基本的に直接使用しない。
2. wp-controls内にラップしたコンポーネントを作成し、それを利用する。
3. このルールは後から追加したルールのため、プロジェクト内で守られていない部分が多数あることを理解・許容すること
4. 新規で作成するコンポーネントには上記1.,2.のルールを適用する
5. このルールはWordPress(Gutenberg)のコンポーネントにはアップデートによって過渡期対応となるプロパティが追加されることがあるが、その対応を1つのコンポーネントを更新するだけで完了できるようにするための対応である。

#### wp-controlsの正しい利用方法

**基本的なコントロール**:
```typescript
// 正しい使用方法
import BaseControl from '@aktk/block-components/wp-controls/base-control';
import ToggleControl from '@aktk/block-components/wp-controls/toggle-control';
import RangeControl from '@aktk/block-components/wp-controls/range-control';
import UnitControl from '@aktk/block-components/wp-controls/unit-control';
```

**注意事項**:
- `@aktk/block-components/wp-controls/select-control`は存在しない
- 代わりに`@aktk/block-components/components/custom-select-control`を使用
- `__nextHasNoMarginBottom`、`__next40pxDefaultSize`プロパティは削除する
- オプション形式を`{ value, label }`から`{ key, name }`に変換する

#### BaseControlによるコントロールラップ規則

**すべてのコントロールを`BaseControl`でラップする**:
```typescript
// 基本パターン
<BaseControl>
	<UnitControl label={ __( 'サイズ', 'textdomain' ) } />
</BaseControl>

// ColorPaletteは特別対応（UIの明確性のため）
<BaseControl label={ __( '背景色', 'textdomain' ) }>
	<ColorPalette label={ __( '背景色', 'textdomain' ) } />
</BaseControl>
```

**理由**:
- **統一された余白**: 隣接するコントロール間の適切な余白を確保
- **視覚的な統一性**: すべてのコントロールが同じスタイルで表示
- **ColorPaletteの特別対応**: BaseControlとColorPalette両方にラベルを設定することで、設定内容がより分かりやすくなる

**コントロール別対応パターン**:
1. **UnitControl, CustomSelectControl等**: BaseControlでラップ、内部コントロールにラベル設定
2. **ColorPalette**: BaseControlとColorPalette両方に同じラベルを設定
3. **複合コントロール**: BaseControlでラップ、適切なラベルを設定

## プロジェクト概要

**yStandard Toolbox** は、無料WordPressテーマ「yStandard」を拡張する商用プラグインです。カスタムGutenbergブロック、デザイン設定、ユーティリティ機能を提供します。現在のバージョン: 2.0.0-alpha

## よく使う開発コマンド

### 環境管理

```bash
npm run start                # wp-env開始 + データインポート + ブラウザオープン (http://localhost:10020)
npm run watch                # 全アセットのファイル監視付き開発モード
npm run build                # 全アセットのプロダクションビルド
npm run stop                 # データエクスポート後、環境停止
```

### コード品質

```bash
npm run lint                 # 全コードの検証 (JS, CSS, PHP)
npm run test                 # 全テストの実行 (PHPUnit + Jest)
npm run format               # Prettierでコードフォーマット
```

### ブロック開発

```bash
npm run build:blocks:v2      # 移行中ブロックのビルド（src/blocks/block-library内のモダンブロック）
```

### 配布用ビルド

```bash
npm run zip                  # プラグイン配布用zipファイル作成
```

## アーキテクチャ概要

### デュアルビルドシステム

-   **レガシーブロック** (`/blocks/`) - 従来のWordPressブロック（クラシックJS/SCSS）
-   **モダンコンポーネント** (`/src/`) - aktkフレームワークを使用したTypeScript/React
-   **プラグイン設定** (`/src/plugin-settings/`) - React製管理画面
-   **コアPHP** (`/inc/`) - `ystandard_toolbox`名前空間のバックエンド機能

### 主要ディレクトリ

```
src/
├── aktk-block-components/  # モダンTypeScriptコンポーネント（他プロジェクトでも使用）
│　　　├── components/       # ブロック・設定画面で使用する各種値設定のUIコンポーネント
│　　　├── config/           # プロダクト共通の設定
│　　　├── hooks/            # react hooks
│　　　├── types/            #
│　　　├── utils/            # ユーティリティー関数
│　　　└── wp-controls/      # WordPress（Gutenberg）のコンポーネントを単純にラップしたコンポーネント
├── plugin-settings/        # React管理画面
├── blocks/                 # 共有ブロックユーティリティ
│　　　├── api/    		  # REST APIを使用した処理など
│　　　├── block-library/    # モダンTypeScriptブロック・ブロックフック
│　　　│   ├── block-hook-*/ # ブロック拡張機能（フック）✅
│　　　│   └── */           # 通常のブロック
│　　　├── components/       # プラグイン固有のコンポーネント（将来的に可能なものはaktk-block-componentsへ切り替え予定・JavaScriptのものはTypeScriptへ切り替え予定）
│　　　├── controls/         # レガシーJavaScript コンポーネント（将来的にaktk-block-componentsへ切り替え予定）
│　　　├── function/         # レガシーJavaScript ユーティリティー関数（将来的にaktk-block-componentsへ切り替え予定・./utilsへ移行予定）
│　　　└── utils/            # プラグイン固有のユーティリティー関数（将来的に可能なものはaktk-block-componentsへ切り替え予定・JavaScriptのものはTypeScriptへ切り替え予定）
└── js/                    # レガシーJavaScript（将来的にaktk-block-components、もしくは、src/blocks/内のものに切り替え予定）

blocks/                     # レガシーブロック実装
inc/                       # PHPバックエンドクラス
build/                     # コンパイル済みアセット
├── block-hook/            # ブロックフック（拡張機能）ビルド出力 ✅
│   └── block-hook-*/      # 機能ごとの独立ディレクトリ
├── blocks/                # モダンブロックビルド出力
└── dist/                  # その他ビルド出力
css/ & js/                 # 最終コンパイル出力
```

### ビルドパイプライン

-   **5つの独立したwebpack設定** アセットタイプ別
-   `webpack.blocks.v2.config.js` - モダンブロック用
-   `webpack.blocks.hook.config.js` - ブロックフック（拡張機能）用 ✅
-   `webpack.blocks.config.js` - レガシーブロック用
-   `webpack.block-app.config.js` - ブロックアプリ用
-   `webpack.plugin-settings.config.js` - プラグイン設定用
-   **SASS → PostCSS** パイプライン（Tailwind CSS統合）
-   **TypeScript** 厳密設定とパスエイリアス（`@aktk/*`, `@ystdtb/*`）
-   **Babel** レガシーJavaScript用トランスパイル

### TypeScriptパスエイリアス

```typescript
@aktk/function/*         → src/blocks/function/*
@aktk/components/*       → src/blocks/components/*
@aktk/utils/*           → src/blocks/utils/*
@ystdtb/*               → src/js/*
```

## 開発パターン

### WordPress統合

-   WordPress Scriptsをメインビルドツールとして使用
-   WordPress コーディング規約に準拠（ESLint, PHPCS, Stylelint）
-   `@wordpress/scripts` とGutenberg APIを使用したブロック開発
-   PHP REST APIエンドポイント（`ystandard_toolbox`名前空間）

### コンポーネントアーキテクチャ

-   **aktk-block-components** 再利用可能Reactコンポーネントライブラリ
-   モダンブロックではフックベースの状態管理
-   レガシーブロックでは設定ベースの属性管理
-   テーマシステムと統合されたレスポンシブデザインユーティリティ

### テスト設定

-   **PHPUnit** 8.5+ WordPressテストフレームワーク (`/phpunit/`)
-   **Jest** JavaScriptコンポーネントテスト (`/test/`)
-   ブロック検証とフルコンテンツの統合テスト

#### テストファイル配置ルール

-   テストファイルは該当ファイルと同階層に`test`ディレクトリを作成
-   関数ごとにテストファイルを作成（例: `to-bool.test.ts`）
-   インポートパスは相対パス（`../index`）を使用

### CSSアーキテクチャ

-   **Tailwind CSS** カスタムデザイントークン（preflight無効）
-   **SMACSS** プロパティ順序（CSS Declaration Sorter）
-   テーマ固有のレスポンシブブレークポイント: `mobile`, `tablet`, `desktop`
-   PostCSS（Autoprefixer + CSSnano最適化）

## 開発環境

### WordPress環境

-   ポート10020（開発）、10021（テスト）で動作
-   日本語版WordPressとyStandardテーマが必要
-   `.wp-content/`ディレクトリによるデータ永続化
-   yStandard Blocksプラグインの自動インポート

### コード品質ツール

-   **ESLint** WordPress + Tailwind CSSルール
-   **Prettier** WordPress設定
-   **PHP CodeSniffer** WordPress規約
-   **Husky** 自動品質チェック用Gitフック

## プラグイン要件

-   **WordPress**: 6.1+（日本語版推奨）
-   **PHP**: 7.4+
-   **yStandardテーマ**: 4.36.0+
-   **Node.js**: @wordpress/scripts対応バージョン

## 主要機能

### ブロックシステム

-   15+のカスタムGutenbergブロック（ボックス、スライダー、FAQ、タイムライン、投稿など）
-   レスポンシブ表示制御のブロック拡張
-   ブロックパターンとカテゴリー管理
-   デザイン変更のライブプレビューシステム

### デザインシステム

-   ヘッダー/サブヘッダーデザインのライブプレビュー付きカスタマイズ
-   プリセット管理付き見出しスタイルエディター
-   CodeMirror統合カスタムCSSエディター
-   フォントファミリー管理とWebフォント読み込み

### コンテンツ管理

-   ページ別SEO設定（タイトル、メタディスクリプション）
-   レスポンシブオプション付きアーカイブレイアウト制御
-   ナビゲーション拡張とCTA管理
-   テンプレート変数付きコピーライトテキストカスタマイズ

## 共通パーツのライブラリ化

yStandard Toolboxの他にyStandard BlocksというyStandardシリーズのブロック追加プラグインがあり、共通で利用できると思われるコントロールやコンポーネントは`src/aktk-block-components`に作成・参照するようにしている。

特にWordPressのUIコントロールはアップデートによって`__next40pxDefaultSize`のような移行・下位互換に関するプロパティが追加されることがあり、個別の対応が難しいため、コントロールを単純にラップしたコンポーネントを`src/aktk-block-components/wp-controls`内に作成する。

## プラグイン設定の刷新

-   一度`.js`として作成したが、`src/plugin-settings/heading`をTypeScriptで作成したため、他の画面も再度TypeScriptに作り直す
-   `src/plugin-settings/design`の移行が仕掛
-   コンポーネントはなるべく`aktk-block-components`を利用するが、管理画面特有の処理が必要な場合は`src/plugin-settings/components`にコンポーネント・コントロールを作成する

## レガシーブロックの刷新

-   段階的に移行予定
-   最終的には`blocks/`内のブロックをすべて`src/blocks/block-library`へと移す
-   移行は単純なファイル移動ではなく、最新のGutenbergブロックの仕様に合わせて刷新する
-   プラグイン設定の刷新が完了した後に着手予定

### 🚀 最新Gutenberg仕様移行ガイドライン

**1. メタデータ駆動アーキテクチャ**

-   `block.json`に完全なブロック定義を記述
-   `index.tsx`は`metadata`からインポートしてregisterBlockTypeに渡す
-   `config.tsx`を廃止し、必要な定数は`utils.ts`に移行

**2. 最新ファイル構成**

```
src/blocks/block-library/[ブロック名]/
├── block.json          # 完全なブロック定義（example含む）
├── index.tsx           # メタデータ駆動の登録
├── edit.tsx            # CSS直接インポート付きエディター
├── save.tsx            # 保存コンポーネント
├── style.scss          # フロントエンド用CSS
├── style-editor.scss   # エディター専用CSS
├── utils.ts            # ブロック固有の定数・ユーティリティ
├── types.ts            # TypeScript型定義
└── deprecated/         # 下位互換対応
```

**3. CSS分離パターン**

-   **中央集約廃止**: `src/sass/ystandard-toolbox-*.scss`からの参照削除
-   **ブロック個別**: `index.tsx`で`./style.scss`直接インポート
-   **エディター専用**: `edit.tsx`で`./style-editor.scss`直接インポート

**4. 必須実装パターン**

```tsx
// index.tsx テンプレート
import { registerBlockType } from '@wordpress/blocks';
import { COLORS } from '@aktk/block-components/config';
import { mergeDefaultAttributes } from '@aktk/block-components/utils/attributes';
import { CATEGORY } from '@aktk/blocks/config';
// @ts-ignore
import metadata from './block.json';
import edit from './edit';
import save from './save';
import icon from './icon';
import './style.scss';

export function register[ブロック名]Block() {
    const attributes = mergeDefaultAttributes(
        metadata.name,
        metadata.attributes
    );

    registerBlockType( metadata.name, {
        ...metadata,
        ...{
            icon(
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

register[ブロック名]Block();
```

### ✅ ブロック拡張機能移行完了実績

**`extension/hidden-by-size`機能の移行完了により、以下の技術基盤が確立されました：**

-   **ブロックフック専用ビルドシステム** - `webpack.blocks.hook.config.js`
-   **機能別独立ディレクトリ構成** - `build/block-hook/block-hook-**/`
-   **TypeScript/React現代化** - レガシーJSからの完全移行
-   **手動アセットエンキューシステム** - `block.json`に依存しない拡張機能用
-   **標準ファイル命名規則** - `index.js`、`index.css`、`style-index.css`

この実績により、今後のブロック拡張機能追加時の効率が大幅に向上し、保守性の高いアーキテクチャが実現されました。

### 移行手順

#### 1. 事前準備（ユーザー担当）

-   移行対象ディレクトリ・ファイルを `src/blocks/block-library/` へ移動
-   `.js` ファイルを `.tsx` に変更
-   入れ子構造ブロックは平坦化（parent-child関係を廃止し、block-library直下に配置）

#### 2. 設計書作成（開発サポート）

-   移行対象ブロックディレクトリに `DESIGN.md` を作成
-   現在の実装の分析と移行後の設計方針を文書化
-   コンポーネント依存関係とaktk-block-components移行計画を記載
-   レスポンシブ機能や入れ子構造の変更点を明文化
-   移行に伴うリスクと対策を記録

#### 3. ブロック登録処理の作成（開発サポート）

-   各ブロックディレクトリに `index.php` を作成
-   **namespace**: `ystandard_toolbox` （サブnamespaceは使用しない）
-   **クラス化**: `[ブロック名]_Block` 形式のクラス名（例: `Box_Block`）
-   **シングルトンパターン**: `get_instance()` メソッドによるインスタンス管理
-   **ブロック定数**: `const BLOCK_NAME = 'ystdtb/[ブロック名]'`
-   `init` アクションで `register_block_type( __DIR__ )` する処理を実装
-   WordPressのコーディング規約に準拠したPHPコードを作成
-   **設計書に実装内容を反映**

#### 4. コンポーネント移行対応

-   `src/blocks/components/` 内コンポーネント利用箇所を特定
-   該当コンポーネントを **deprecated** マーク（後にaktk-block-componentsに移行予定）
-   `aktk-block-components` に同等機能がある場合は参照を変更
-   **設計書にコンポーネント移行の進捗と変更点を記録**

##### ⚠️ 重要な移行方針

**aktk-block-componentsへの新規追加制限**:
- 基本的にaktk-block-componentsには新規でコンポーネントを追加しない
- yStandard Blocksプラグインでも同じaktk-block-componentsを使用するため、プロジェクト固有のロジックを入れると不都合が生じる

**レガシーコンポーネントの取り扱い**:
- aktk-block-componentsにコンポーネントが無い場合は、旧コンポーネント（`@ystd/`）を使い続ける
- 現在は最低限のGutenbergブロック最新仕様対応を優先し、早期リリースを目指す
- レガシーコンポーネントの精査・移行は次フェーズで対応

**新規コンポーネント作成時の判断基準**:
- どこにも利用できる関数やコンポーネントがない場合は、実装前に確認を取る
- ブロック内固有のロジック（そのブロックでしか使わない処理）であれば作成可能
- 共通利用が想定される機能は勝手に作成せず、相談する

##### 📋 共通エラー対応パターン

**CATEGORYエクスポートエラー**:
```typescript
// ❌ エラーとなるパターン
import { COLORS, CATEGORY } from '@aktk/block-components/config';

// ✅ 正しい修正パターン
import { COLORS } from '@aktk/block-components/config';
import { CATEGORY } from '@aktk/blocks/config';
```
- **原因**: `@aktk/block-components/config`にはCATEGORYがエクスポートされていない
- **解決策**: CATEGORYは`@aktk/blocks/config`から個別にインポートする
- **適用対象**: 全ブロックの`index.tsx`ファイル

**@ystd → @aktk 依存関係変換表**:

##### ✅ 単純変換可能（webpack設定で同じディレクトリを参照）
| @ystd | @aktk | 実際のパス |
|-------|-------|-----------|
| `@ystd/function` | `@aktk/function` | `src/blocks/function` |
| `@ystd/components` | `@aktk/components` | `src/blocks/components` |
| `@ystd/controls` | `@aktk/controls` | `src/blocks/controls` |
| `@ystd/config` | `@aktk/config` | `src/js/config` |
| `@ystd/helper` | `@aktk/helper` | `src/js/helper` |

### @ystd/ → @aktk/ 変換ガイドライン

**3段階の変換方針**:
1. **aktk-block-components優先**: 存在する場合は `@aktk/block-components/` に移行
2. **一括書き換え実行**: すべての `@ystd/` → `@aktk/` へ機械的に変換
3. **ビルド確認**: `npm run build:blocks:v2` でエラーが出るもののみ手動対応

**具体的な手順**:
1. aktk-block-componentsに同等コンポーネントがあるかチェック
2. ある場合は `@aktk/block-components/` に変更
3. ない場合は `@ystd/` を `@aktk/` に一括置換
4. ビルドを実行してエラーが出た箇所のみ個別対応

**重要**: 事前の判断で「変換不可能」と決めつけず、まず実際に変換してビルドで確認する

##### ⚠️ aktk-block-componentsに移行すべき項目
- `@ystd/components/responsive-values` → `@aktk/block-components/components/responsive-values`
- `@ystd/components/box-shadow-control` → `@aktk/block-components/components/box-shadow-control`
- `@ystd/controls/number-control` → `@aktk/block-components/wp-controls/number-control`

##### 🚫 真の変換不可能項目（例）
- `@ystd/components/ratio-size-control` → プラグイン固有（aktk未対応）
- `@ystd/helper/fallback` → プラグイン固有（aktk未対応）

##### 📋 移行方針
1. **aktk-block-components移行**: 共通コンポーネント活用
2. **単純変換**: `@ystd/` → `@aktk/`でwebpackエイリアス解決
3. **最小限維持**: 真に変換不可能な2%のみ`@ystd/`維持

#### 5. 入れ子構造ブロックの対応

-   親子関係を廃止し、独立したブロックとして再構築
-   ブロック間の参照関係を修正
-   `InnerBlocks` を使用していた箇所の代替実装
-   **設計書に構造変更の詳細と影響範囲を更新**

#### 6. 最新Gutenberg仕様への対応

-   `block.json` を使用したブロック定義への移行
-   TypeScript型定義の追加
-   現代的なReactパターンの適用（フックベース）
-   **設計書に新仕様対応の内容と既存からの変更点を記録**

#### 7. スタイルシート対応

-   **style-editor.scss** - 編集画面専用スタイルを記述
-   **style.scss** - フロントエンド表示用スタイルを記述
-   旧スタイルシート名からのリネーム後、参照先の修正を適宜実施
-   既存の `_block.scss`, `_edit.scss` などは上記命名規則に統一
-   **設計書にスタイル変更の内容と影響範囲を記録**

### 移行対象ブロック分類

#### 単体ブロック（7個）

-   `banner-link/` - バナーリンクブロック
-   `box/` - ボックスブロック
-   `extension/` - ブロック拡張機能
-   `parts/` - パーツブロック
-   `posts/` - 投稿一覧ブロック
-   `sns-share/` - SNSシェアブロック
-   `styles/` - スタイル拡張

#### 入れ子構造ブロック（5組）

-   `description-list/` → 親ブロック + 4子ブロック(`dd-box/`, `dd-simple/`, `dl-column/`, `dt/`)
-   `faq/` → 親ブロック + 1子ブロック(`item/`)
-   `icon-list/` + `icon-list-item/` → 関連ブロック
-   `slider/` → 親ブロック + 1子ブロック(`item/`)
-   `timeline/` → 親ブロック + 1子ブロック(`item/`)

### コンポーネント変換表

#### `src/blocks/components/` → `aktk-block-components` 変換対応

**1. 完全一致で移行可能**

-   `color-palette-control/` → `components/color-pallet-control/`
-   `custom-select-control/` → `components/custom-select-control/`
-   `border-radius-control/` → `components/border-radius-control/`
-   `svg-icon/` → `components/svg-icon/`
-   `toast-message/` → `components/toast-message/`
-   `modal/` → `components/modal/`
-   `notice/` → `components/notice/`

**2. wp-controls経由で利用すべき**

-   `unit-control/` → `wp-controls/unit-control/`
-   `number-control/` → `wp-controls/number-control/`
-   `font-size-picker/` → `wp-controls/font-size-picker/`

**3. プラグイン固有（移行不可）**

-   `responsive-*` 系コンポーネント（レスポンシブ機能）
-   `post-*-select/` 系コンポーネント（WordPress投稿関連）
-   `taxonomy-select/`, `term-select/`
-   `ystandard-icon/`（テーマ固有）

**4. 機能統合・名称変更あり**

-   `align-items-control/` → `components/alignment-control/`
-   `box-control/` → `components/custom-spacing-select/`
-   `color-gradient-control/` → `components/color-pallet-control/`

### 移行優先順位

#### フェーズ1（単体ブロック）

1. ✅ **`extension/`** - 他ブロックへの影響が大きいため最優先 **【移行完了】**
    - `blocks/extension/hidden-by-size/` → `src/blocks/block-library/block-hook-hidden-by-size/`
    - TypeScript化、ブロックフック専用ビルドシステム構築
    - 機能ごとの独立ディレクトリ構成（`build/block-hook/block-hook-**/`）実現
2. ✅ **`box/`** - 使用頻度が高く、比較的シンプル **【移行完了】**
    - `blocks/box/` → `src/blocks/block-library/box/`
    - aktk-block-componentsコンポーネント活用
    - BaseControlへのid属性追加完了
3. ⏸️ **`banner-link/`** - 中程度の複雑さ **【一時中断】**
    - 複雑な依存関係のため、より簡単なブロックの移行完了後に対応
    - 60ファイル以上の`@ystd/`依存関係が存在
    - レガシーコンポーネント精査フェーズで対応予定

#### フェーズ2（独立性の高いブロック）

1. `sns-share/` - 外部依存が少ない
2. `parts/` - シンプルな構造
3. `posts/` - 複雑だが独立性が高い

#### フェーズ3（入れ子構造ブロック）

1. `icon-list/` + `icon-list-item/` - 関連ブロック（比較的シンプル）
2. `faq/` + `item/` - 中程度の複雑さ
3. `timeline/` + `item/` - 中程度の複雑さ
4. `slider/` + `item/` - 高い複雑さ（JavaScript依存）
5. `description-list/` + 子ブロック群 - 最も複雑（5ブロック構成）

#### フェーズ4（スタイル系）

1. `styles/` - スタイル拡張機能（特殊対応）

## 設計書運用

### 設計書作成ルール

-   **コード編集前に設計書を必ず作成する**
-   機能ごとに該当ディレクトリ内に`DESIGN.md`として作成
-   既存の設計書がある場合は更新しながら進める
-   変更の影響範囲と設計意図を明文化する

### PHPブロック登録の統一規約

#### 基本構造

全てのブロックの`index.php`は以下の構造に統一する：

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

#### 命名規則

-   **namespace**: `ystandard_toolbox` （サブnamespaceは使用しない）
-   **クラス名**: `[ブロック名]_Block` 形式（例: `Box_Block`, `Timeline_Block`）
-   **定数**: `const BLOCK_NAME = 'ystdtb/[ブロック名]'`
-   **ファイル名**: `index.php`

#### 実装パターン

-   **シングルトンパターン**: `get_instance()` メソッドによるインスタンス管理
-   **WordPress標準**: `register_block_type( __DIR__ )` によるblock.json自動読み込み
-   **優先度**: `add_action( 'init', [ $this, 'register_block' ], 100 )`

この規約により、全ブロックの登録処理が統一され、保守性が向上する。

### 設計書の目的

-   複雑な機能変更の設計意図を文書化
-   レガシー→モダン移行時の安全性確保
-   他の開発者との設計共有
-   将来のメンテナンス時の参照資料
