# CLAUDE.md

このファイルは、Claude Code (claude.ai/code) がこのリポジトリで作業する際のガイダンスを提供します。

**重要**: このプロジェクトの今後のドキュメント作成は、日本語を使用してください。

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
- **レガシーブロック** (`/blocks/`) - 従来のWordPressブロック（クラシックJS/SCSS）
- **モダンコンポーネント** (`/src/`) - aktkフレームワークを使用したTypeScript/React
- **プラグイン設定** (`/src/plugin-settings/`) - React製管理画面
- **コアPHP** (`/inc/`) - `ystandard_toolbox`名前空間のバックエンド機能

### 主要ディレクトリ
```
src/
├── block-library/          # モダンTypeScriptブロック
├── plugin-settings/        # React管理画面
├── blocks/                 # 共有ブロックユーティリティ
└── js/                    # レガシーJavaScript

blocks/                     # レガシーブロック実装
inc/                       # PHPバックエンドクラス
build/ & dist/             # コンパイル済みアセット
css/ & js/                 # 最終コンパイル出力
```

### ビルドパイプライン
- **4つの独立したwebpack設定** アセットタイプ別
- **SASS → PostCSS** パイプライン（Tailwind CSS統合）
- **TypeScript** 厳密設定とパスエイリアス（`@aktk/*`, `@ystdtb/*`）
- **Babel** レガシーJavaScript用トランスパイル

### TypeScriptパスエイリアス
```typescript
@aktk/function/*         → src/blocks/function/*
@aktk/components/*       → src/blocks/components/*  
@aktk/utils/*           → src/blocks/utils/*
@ystdtb/*               → src/js/*
```

## 開発パターン

### WordPress統合
- WordPress Scriptsをメインビルドツールとして使用
- WordPress コーディング規約に準拠（ESLint, PHPCS, Stylelint）
- `@wordpress/scripts` とGutenberg APIを使用したブロック開発
- PHP REST APIエンドポイント（`ystandard_toolbox`名前空間）

### コンポーネントアーキテクチャ
- **aktk-block-components** 再利用可能Reactコンポーネントライブラリ
- モダンブロックではフックベースの状態管理
- レガシーブロックでは設定ベースの属性管理
- テーマシステムと統合されたレスポンシブデザインユーティリティ

### テスト設定
- **PHPUnit** 8.5+ WordPressテストフレームワーク (`/phpunit/`)
- **Jest** JavaScriptコンポーネントテスト (`/test/`)
- ブロック検証とフルコンテンツの統合テスト

### CSSアーキテクチャ
- **Tailwind CSS** カスタムデザイントークン（preflight無効）
- **SMACSS** プロパティ順序（CSS Declaration Sorter）
- テーマ固有のレスポンシブブレークポイント: `mobile`, `tablet`, `desktop`
- PostCSS（Autoprefixer + CSSnano最適化）

## 開発環境

### WordPress環境
- ポート10020（開発）、10021（テスト）で動作
- 日本語版WordPressとyStandardテーマが必要
- `.wp-content/`ディレクトリによるデータ永続化
- yStandard Blocksプラグインの自動インポート

### コード品質ツール
- **ESLint** WordPress + Tailwind CSSルール
- **Prettier** WordPress設定
- **PHP CodeSniffer** WordPress規約
- **Husky** 自動品質チェック用Gitフック

## プラグイン要件

- **WordPress**: 6.1+（日本語版推奨）
- **PHP**: 7.4+
- **yStandardテーマ**: 4.36.0+
- **Node.js**: @wordpress/scripts対応バージョン

## 主要機能

### ブロックシステム
- 15+のカスタムGutenbergブロック（ボックス、スライダー、FAQ、タイムライン、投稿など）
- レスポンシブ表示制御のブロック拡張
- ブロックパターンとカテゴリー管理
- デザイン変更のライブプレビューシステム

### デザインシステム
- ヘッダー/サブヘッダーデザインのライブプレビュー付きカスタマイズ
- プリセット管理付き見出しスタイルエディター
- CodeMirror統合カスタムCSSエディター
- フォントファミリー管理とWebフォント読み込み

### コンテンツ管理
- ページ別SEO設定（タイトル、メタディスクリプション）
- レスポンシブオプション付きアーカイブレイアウト制御
- ナビゲーション拡張とCTA管理
- テンプレート変数付きコピーライトテキストカスタマイズ