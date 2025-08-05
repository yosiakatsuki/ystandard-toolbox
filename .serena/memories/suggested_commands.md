# 推奨開発コマンド

## 環境管理

### 基本的な開発フロー
```bash
npm run start                # wp-env開始 + データインポート + ブラウザオープン (http://localhost:10020)
npm run watch                # 全アセットの監視付き開発モード
npm run stop                 # データエクスポート後、環境停止
```

### 追加的な環境コマンド
```bash
npm run start:update         # 環境開始 + 更新 + テーマ有効化 + インポート
npm run start:env            # 環境開始 + ブラウザオープンのみ
```

## ビルド

### プロダクションビルド
```bash
npm run build                # 全アセットのプロダクションビルド
```

### 個別ビルド
```bash
npm run build:blocks:v2      # モダンブロックのビルド（重要）
npm run build:blocks:v1      # レガシーブロックのビルド
npm run build:plugin-settings # プラグイン設定画面のビルド
```

### 監視モード（開発時）
```bash
npm run watch:blocks:v2      # モダンブロックの監視
npm run watch:plugin-settings # プラグイン設定画面の監視
```

## コード品質

### 全体チェック
```bash
npm run lint                 # 全コードの検証 (JS, CSS, PHP)
npm run format               # Prettierでコードフォーマット
```

### 個別チェック
```bash
npm run lint:js              # JavaScript/TypeScript検証
npm run lint:css             # CSS/SCSS検証  
npm run lint:php             # PHP検証（composer phpcs）
```

## テスト

### 全テスト実行
```bash
npm run test                 # 全テストの実行 (PHPUnit + Jest)
```

### 個別テスト
```bash
npm run test:unit:php        # PHPユニットテスト
npm run test:unit:component  # Jestコンポーネントテスト
```

## 配布

### プラグイン配布用
```bash
npm run zip                  # プラグイン配布用zipファイル作成
```

## データ管理

### データベース・ファイル管理
```bash
npm run export               # アップロードファイル + データベースのエクスポート
npm run import               # アップロードファイル + データベースのインポート
```

## wp-env関連

### WordPress CLI
```bash
npm run cli                  # wp-env内でCLIコマンド実行
npm run wp                   # wp-env内でWP-CLIコマンド実行
```

### 例
```bash
npm run wp "plugin list"     # インストール済みプラグイン一覧
npm run cli "ls -la"         # コンテナ内ファイル確認
```

## 開発時の重要なコマンド順序

### 開発開始時
1. `npm run start` - 環境起動
2. `npm run watch` - ファイル監視開始

### コード作成後
1. `npm run lint` - コード品質チェック
2. `npm run test` - テスト実行
3. `npm run build` - プロダクションビルド確認

### 作業終了時
1. `npm run stop` - データ保存して環境停止