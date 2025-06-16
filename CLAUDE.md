# CLAUDE.md

このファイルは、Claude Code (claude.ai/code) がこのリポジトリで作業する際のガイダンスを提供します。

**重要**: このプロジェクトの今後のドキュメント作成は、日本語を使用してください。

## コーディング規約

### ドキュメント・コメント

-   **基本的にドキュメント・コメントは日本語で記述する**
-   ラインコメント、Docコメント（JSDoc）、インラインコメントが対象
-   TypeScriptの型定義やインターフェース名は英語のまま
-   **importセクションコメント（例: `// WordPress`）は英語で記述する**
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
│　　　├── block-library/    # モダンTypeScriptブロック
│　　　├── components/       # プラグイン固有のコンポーネント（将来的に可能なものはaktk-block-componentsへ切り替え予定・JavaScriptのものはTypeScriptへ切り替え予定）
│　　　├── controls/         # レガシーJavaScript コンポーネント（将来的にaktk-block-componentsへ切り替え予定）
│　　　├── function/         # レガシーJavaScript ユーティリティー関数（将来的にaktk-block-componentsへ切り替え予定・./utilsへ移行予定）
│　　　└── utils/            # プラグイン固有のユーティリティー関数（将来的に可能なものはaktk-block-componentsへ切り替え予定・JavaScriptのものはTypeScriptへ切り替え予定）
└── js/                    # レガシーJavaScript（将来的にaktk-block-components、もしくは、src/blocks/内のものに切り替え予定）

blocks/                     # レガシーブロック実装
inc/                       # PHPバックエンドクラス
build/ & dist/             # コンパイル済みアセット
css/ & js/                 # 最終コンパイル出力
```

### ビルドパイプライン

-   **4つの独立したwebpack設定** アセットタイプ別
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
