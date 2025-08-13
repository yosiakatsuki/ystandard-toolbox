# sns-share ブロック移行設計書

## 移行概要

SNSシェアボタンブロックを最新Gutenberg仕様に移行。シンプルな設定画面で複数のSNSシェアボタンを管理するブロック。

## 現在の実装分析

### ファイル構成
```
src/blocks/block-library/sns-share/
├── class-sns-share-block.php (レガシーPHP)
├── config.ts                 (属性・設定定義)
├── edit.tsx                  (エディター画面)
├── index.ts                  (ブロック登録)
├── style-editor.scss         (エディター用CSS)
└── style.scss               (フロントエンド用CSS)
```

### 主要機能
1. **シェアボタン表示制御**: X、Twitter、Bluesky、Facebook、はてなブックマーク、LINE対応
2. **デザイン選択**: 円・四角・アイコン・公式ボタンから選択
3. **テキストカスタマイズ**: 上側・下側テキスト設定
4. **Twitter固有オプション**: via、おすすめアカウント、ハッシュタグ
5. **配置設定**: AlignmentToolbarによる配置制御

### 依存関係分析
- **@ystd依存**: `@ystd/components/notice`、`@ystd/config`
- **WordPress標準**: `@wordpress/components`、`@wordpress/block-editor`
- **レガシー実装**: `config.ts`でattributes定義、直接registerBlockType

## 移行計画

### 1. ブロックメタデータ化
- `block.json`作成（完全なブロック定義）
- `config.ts`廃止、メタデータに統合

### 2. 依存関係モダン化
- `@ystd/components/notice` → `@aktk/block-components/components/notice`
- `@ystd/config` → `@aktk/blocks/config`
- TypeScript型定義追加

### 3. PHPブロック登録統一
- `class-sns-share-block.php` → `index.php`
- `Sns_Share_Block`クラス、シングルトンパターン
- `register_block_type(__DIR__)`によるblock.json自動読み込み

### 4. 最新UI仕様対応
- `__next40pxDefaultSize`、`__nextHasNoMarginBottom`は既に対応済み
- UI構造はそのまま維持（シンプルな設定画面）

## 技術仕様

### block.json構造
```json
{
  "name": "ystdtb/sns-share",
  "title": "シェアボタン",
  "description": "シェアボタンを表示するブロック",
  "category": "ystdtb-common",
  "keywords": ["sns", "share", "シェアボタン"],
  "attributes": {
    "align": {"type": "string", "default": ""},
    "buttonType": {"type": "string", "default": "circle"},
    "useX": {"type": "boolean", "default": true},
    "useFacebook": {"type": "boolean", "default": true},
    // ... 他の属性
  },
  "supports": {
    "className": false,
    "html": false,
    "align": false
  }
}
```

### TypeScript型定義
```typescript
interface SnsShareAttributes {
  align: string;
  buttonType: 'circle' | 'square' | 'icon' | 'official';
  labelBefore: string;
  labelAfter: string;
  useX: boolean;
  useTwitter: boolean;
  useFacebook: boolean;
  useHatenaBookmark: boolean;
  usePocket: boolean;
  useLINE: boolean;
  useBluesky: boolean;
  twitterVia: string;
  twitterRelatedUser: string;
  twitterHashTags: string;
}
```

## 移行リスク・対策

### リスク
1. **ServerSideRender**: フロントエンド描画がPHPに依存
2. **SNS仕様変更**: Bluesky公式ボタン未対応警告の保持必要
3. **設定互換性**: 既存の設定値の維持

### 対策
1. **PHP処理保持**: ServerSideRender部分はそのまま維持
2. **警告UI保持**: Bluesky公式ボタン警告メッセージを維持
3. **属性型変更**: `bool` → `boolean`への自動変換対応

## 期待される効果

1. **保守性向上**: メタデータ駆動によるblock.json管理
2. **型安全性**: TypeScript型定義による開発効率向上
3. **依存関係整理**: レガシー`@ystd`から`@aktk`への移行
4. **統一性**: 他のブロックと同じアーキテクチャパターン

## 完了条件

1. ✅ block.json作成・メタデータ駆動化
2. ✅ index.tsx メタデータインポート対応
3. ✅ @ystd → @aktk 依存関係変換
4. ✅ TypeScript型定義追加
5. ✅ index.php PHP登録処理作成
6. ✅ ビルド成功・動作確認
7. ✅ レガシーファイル削除（config.ts等）