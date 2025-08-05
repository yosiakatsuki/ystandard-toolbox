# 技術スタックとアーキテクチャ

## ビルドシステム

### 5つの独立したWebpack設定
1. `webpack.blocks.v2.config.js` - モダンブロック用（TypeScript/React）
2. `webpack.blocks.hook.config.js` - ブロックフック（拡張機能）用
3. `webpack.blocks.config.js` - レガシーブロック用
4. `webpack.block-app.config.js` - ブロックアプリ用
5. `webpack.plugin-settings.config.js` - プラグイン設定用

### CSSパイプライン
- **SASS → PostCSS** - メインスタイル処理
- **Tailwind CSS統合** - カスタムデザイントークン（preflight無効）
- **SMACSS** プロパティ順序（CSS Declaration Sorter）
- **PostCSS** - Autoprefixer + CSSnano最適化

### TypeScriptパスエイリアス
```typescript
@aktk/block-components/* → src/aktk-block-components/*
@aktk/function/*         → src/blocks/function/*
@aktk/components/*       → src/blocks/components/*
@aktk/utils/*           → src/blocks/utils/*
@ystdtb/*               → src/js/*
@aktk/blocks/*          → src/blocks/*
@aktk/config/*          → src/js/config/*
```

## ディレクトリ構造

### 主要ディレクトリ
```
src/
├── aktk-block-components/  # 再利用可能TypeScriptコンポーネント
│   ├── components/         # ブロック・設定画面用UIコンポーネント
│   ├── wp-controls/        # WordPress(Gutenberg)コンポーネントラッパー
│   ├── hooks/              # React hooks
│   └── utils/              # ユーティリティ関数
├── blocks/block-library/   # モダンTypeScriptブロック
├── plugin-settings/        # React管理画面
├── blocks/                 # 共有ブロックユーティリティ
└── js/                     # レガシーJavaScript

blocks/                     # レガシーブロック実装
inc/                       # PHPバックエンドクラス（ystandard_toolbox名前空間）
build/                     # コンパイル済みアセット
css/ & js/                 # 最終コンパイル出力
```

## レスポンシブデザイン

### ブレークポイント
- `mobile` - モバイル表示
- `tablet` - タブレット表示  
- `desktop` - デスクトップ表示

### v2.0.0でのキー変更
- `sm` → `mobile`
- `md` → `tablet` 
- `lg` → `desktop`
値に単位追加

## WordPress統合

### 必要環境
- WordPress 6.1+（日本語版推奨）
- PHP 7.4+
- yStandardテーマ 4.36.0+

### コーディング規約遵守
- WordPress Scripts使用
- ESLint: WordPress + Tailwind CSSルール
- PHPCS: WordPress規約（.phpcs.xml.dist）
- Prettier: WordPress設定

### 開発環境
- wp-env（ポート10020開発、10021テスト）
- 日本語版WordPress + yStandardテーマ自動セットアップ
- .wp-content/によるデータ永続化