# テストと品質保証

## テストフレームワーク

### JavaScript/TypeScript テスト
- **Jest 29.7.0** - メインテストフレームワーク
- **React Testing Library** - Reactコンポーネントテスト
- **@wordpress/scripts** - WordPress統合テスト

### PHP テスト
- **PHPUnit 8.5+** - WordPressテストフレームワーク
- **WordPress Test Suite** - WordPress統合テスト環境
- **Yoast PHPUnit Polyfills** - 後方互換性確保

## テスト実行コマンド

### 全テスト実行
```bash
npm run test                 # 全テスト（PHPUnit + Jest）
```

### 個別テスト
```bash
npm run test:unit:php        # PHPユニットテスト
npm run test:unit:component  # Jestコンポーネントテスト
```

### PHP詳細
```bash
# wp-env環境でのPHPUnit実行
wp-env run phpunit 'phpunit -c /var/www/html/wp-content/plugins/ystandard-toolbox/phpunit.xml.dist --verbose'
```

## テストファイル配置規則

### 規則
- テストファイルは該当ファイルと同階層の`test`ディレクトリに配置
- 関数ごとにテストファイルを作成（例: `to-bool.test.ts`）
- インポートパスは相対パス（`../index`）を使用

### 配置例
```
src/components/example/
├── index.tsx
├── utils.ts
└── test/
    ├── utils.test.ts        # utils.tsのテスト
    ├── example.test.ts      # index.tsxのテスト
    └── integration.test.ts  # 統合テスト
```

## テスト設定ファイル

### Jest設定
- `test/unit/component.config.js` - コンポーネントテスト設定
- `identity-obj-proxy` - CSSモジュールモック
- Babel変換設定あり

### PHPUnit設定
- `phpunit.xml.dist` - PHPUnit設定
- `/phpunit/` ディレクトリ - テスト環境
- WordPress Test Suite統合

## 品質チェックツール

### ESLint設定（.eslintrc.js）
- WordPress規約ベース
- Tailwind CSS規約追加
- TypeScript対応
- カスタムルール設定

### PHPCS設定（.phpcs.xml.dist）
- WordPress-Core規約
- PHP 7.4+ 対応
- カスタム除外ルール設定

### Stylelint設定（.stylelintrc.json）
- WordPress設定ベース
- SCSS対応

## 自動化されたチェック

### Husky Git フック
```bash
# pre-commit時自動実行
npm run lint:js              # JavaScript/TypeScript検証
npm run lint:css             # CSS/SCSS検証
```

### 手動実行が必要
```bash
npm run lint:php             # PHP検証（Composer必要）
npm run test:unit:php        # PHPテスト（wp-env必要）
```

## フィクスチャテスト

### ブロック統合テスト
```bash
npm run fixtures:generate    # テストフィクスチャ生成
npm run fixtures:regenerate  # 全フィクスチャ再生成
npm run fixtures:clean       # フィクスチャクリーンアップ
```

### 設定
- `test/integration/fixtures/blocks/` - フィクスチャ配置
- `test/integration/full-content/` - フルコンテンツテスト
- JSON + HTML形式でのテストデータ

## CI/CD考慮事項

### 必要環境変数
- WordPress環境
- Composer依存関係
- Node.js環境

### 実行順序
1. 依存関係インストール
2. Lint実行
3. ユニットテスト実行
4. ビルド確認
5. 統合テスト実行

## テスト実行時の注意点

### wp-env依存テスト
- PHPテストはwp-env環境が必要
- ポート10020でWordPress環境起動状態であること
- yStandardテーマがインストール・有効化されていること

### メモリ・パフォーマンス
- 大量ファイルテスト時のメモリ制限考慮
- 並列実行時のリソース競合回避
- テストデータの適切なクリーンアップ

## デバッグ・トラブルシューティング

### Jest デバッグ
```bash
# 特定テストファイルのみ実行
npx jest src/components/example/test/example.test.ts

# デバッグ情報付き実行
npx jest --verbose --no-cache
```

### PHPUnit デバッグ
```bash
# 特定テストクラスのみ実行
npm run cli 'phpunit --filter TestClassName'

# テスト環境確認
npm run wp "option get siteurl"
```