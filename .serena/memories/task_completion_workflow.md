# タスク完了時のワークフロー

## 必須実行項目

### 1. コード品質チェック
```bash
npm run lint                 # 全コード検証（JS, CSS, PHP）
```

### 2. テスト実行
```bash
npm run test                 # 全テスト実行（PHPUnit + Jest）
```

### 3. プロダクションビルド確認
```bash
npm run build                # 本番環境用ビルドが正常に完了することを確認
```

## 個別チェック詳細

### JavaScript/TypeScript
```bash
npm run lint:js              # ESLint + Tailwind CSS ルール
npm run test:unit:component  # Jestコンポーネントテスト
```

### CSS/SCSS
```bash
npm run lint:css             # Stylelint チェック
```

### PHP
```bash
npm run lint:php             # PHP CodeSniffer（WordPress規約）
npm run test:unit:php        # PHPUnit テスト
```

## モダンブロック開発時の特別対応

### ブロック別ビルド確認
```bash
npm run build:blocks:v2      # モダンブロック専用ビルド
```

## エラー対応方針

### ビルドエラー時
1. TypeScript型エラーの解決
2. 依存関係の確認（特に@aktk/*, @ystdtb/*パス）
3. 欠落している型定義の追加

### Lintエラー時
1. WordPress規約違反の修正
2. Tailwind CSS未定義クラスの確認
3. 未使用変数・インポートの削除

### テストエラー時
1. ユニットテストの修正
2. コンポーネントpropsの型整合性確認
3. モックデータの更新

## 品質保証チェックリスト

### TypeScript関連
- [ ] 型エラーが0件
- [ ] 未使用変数・関数が0件  
- [ ] strict modeで警告が0件

### WordPress関連
- [ ] WordPress規約準拠
- [ ] ブロック登録が正常動作
- [ ] 日本語翻訳対応済み

### スタイル関連
- [ ] レスポンシブ対応確認
- [ ] エディター・フロントエンド両対応
- [ ] Tailwind CSS適切使用

## 推奨実行順序

1. **開発中**: `npm run watch` で継続的チェック
2. **機能完成時**: `npm run lint && npm run test`
3. **PR前**: `npm run build` で最終確認
4. **リリース前**: 全環境での動作確認

## Git フック自動化

### Husky設定済み
- pre-commit: 自動Lint実行
- 手動実行不要（コミット時に自動チェック）

### 手動実行が必要な場面
- CI/CD環境での最終確認
- 大規模リファクタリング後
- デプロイ前の品質保証確認