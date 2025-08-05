# yStandard Toolbox プロジェクト概要

## プロジェクト目的
yStandard Toolboxは、無料WordPressテーマ「yStandard」を拡張する商用プラグインです。カスタムGutenbergブロック、デザイン設定、ユーティリティ機能を提供します。

## 現在のバージョン
v2.0.0-alpha（開発中）

## 技術スタック

### フロントエンド
- **React/TypeScript** - モダンブロック開発
- **WordPress Scripts** - メインビルドツール（@wordpress/scripts v30.16.0）
- **Tailwind CSS v3.4.17** - ユーティリティファーストCSS（preflight無効）
- **SASS/PostCSS** - スタイルパイプライン
- **Webpack** - 5つの独立した設定でアセット別ビルド

### バックエンド
- **PHP 7.4+**
- **WordPress 6.1+**
- **yStandardテーマ 4.36.0+** 必須
- **Composer** - PHP依存関係管理

### 開発環境
- **wp-env** - ローカル開発環境（ポート10020）
- **Husky** - Git フック自動化
- **Jest** - JavaScript ユニットテスト
- **PHPUnit 8.5+** - PHP ユニットテスト

## アーキテクチャ

### デュアルビルドシステム
- **レガシーブロック** (`/blocks/`) - 従来のWordPressブロック（クラシックJS/SCSS）
- **モダンコンポーネント** (`/src/`) - TypeScript/React
- **プラグイン設定** (`/src/plugin-settings/`) - React製管理画面
- **コアPHP** (`/inc/`) - `ystandard_toolbox`名前空間のバックエンド機能

### 主要機能
1. **15+のカスタムGutenbergブロック** - ボックス、スライダー、FAQ、タイムライン、投稿一覧など
2. **ブロック拡張機能** - レスポンシブ表示制御など
3. **デザインシステム** - ヘッダー/サブヘッダーカスタマイズ、見出しスタイルエディター
4. **コンテンツ管理** - SEO設定、アーカイブレイアウト制御、ナビゲーション拡張

### 開発の方向性
- レガシーブロック（blocks/）からモダンブロック（src/blocks/block-library/）への段階的移行
- 共通コンポーネント（aktk-block-components）によるライブラリ化
- プラグイン設定画面のTypeScript化
- 最新Gutenberg仕様への対応