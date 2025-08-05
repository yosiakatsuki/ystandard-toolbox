# 開発パターンとガイドライン

## アーキテクチャ移行戦略

### レガシー → モダン移行方針
1. **段階的移行**: `blocks/` → `src/blocks/block-library/`
2. **最新Gutenberg仕様対応**: block.json中心のメタデータ駆動
3. **共通コンポーネント化**: aktk-block-components活用
4. **TypeScript完全対応**: JavaScript廃止

### 移行優先度
1. ✅ **ブロック拡張機能** - 影響範囲が大きいため最優先（完了）
2. ✅ **単体ブロック** - box/, extension/（一部完了）
3. ⏸️ **複雑ブロック** - banner-link/（一時中断）
4. 🔄 **入れ子構造ブロック** - timeline/, faq/等（今後対応）

## 最新Gutenberg仕様ガイドライン

### 1. メタデータ駆動アーキテクチャ
```typescript
// index.tsx
import metadata from './block.json';
import { mergeDefaultAttributes } from '@aktk/block-components/utils/attributes';

const attributes = mergeDefaultAttributes(
    metadata.name,
    metadata.attributes
);

registerBlockType( metadata.name, {
    ...metadata,
    attributes,
    edit,
    save,
} );
```

### 2. ファイル構成
```
src/blocks/block-library/[ブロック名]/
├── block.json          # 完全なブロック定義
├── index.tsx           # メタデータ駆動の登録
├── edit.tsx            # エディターコンポーネント
├── save.tsx            # 保存コンポーネント
├── style.scss          # フロント用CSS
├── style-editor.scss   # エディター専用CSS
├── utils.ts            # ブロック固有のユーティリティ
└── types.ts            # TypeScript型定義
```

### 3. CSS分離パターン
- **中央集約廃止**: `src/sass/ystandard-toolbox-*.scss`参照削除
- **個別インポート**: `index.tsx`で`./style.scss`直接インポート
- **エディター専用**: `edit.tsx`で`./style-editor.scss`インポート

## コンポーネント設計パターン

### aktk-block-components使用ルール

#### 直接@wordpress/components使用禁止
```typescript
// ❌ 直接使用禁止
import { UnitControl } from '@wordpress/components';

// ✅ ラップされたコンポーネント使用
import UnitControl from '@aktk/block-components/wp-controls/unit-control';
```

#### BaseControlによるラップ必須
```typescript
// 基本パターン
<BaseControl>
    <UnitControl label={ __( 'サイズ', 'ystandard-toolbox' ) } />
</BaseControl>

// ColorPalette特別対応
<BaseControl label={ __( '背景色', 'ystandard-toolbox' ) }>
    <ColorPalette label={ __( '背景色', 'ystandard-toolbox' ) } />
</BaseControl>
```

### レガシーコンポーネント変換パターン

#### ResponsiveValues → CustomSizeControl
```typescript
// 変更前
import ResponsiveValues from '@aktk/components/responsive-values';
<ResponsiveValues
    label="ラベル名"
    values={attributeValue}
    onChange={handleChange}
/>

// 変更後  
import { CustomSizeControl } from '@aktk/block-components/components/custom-size-control';
<BaseControl label="ラベル名">
    <CustomSizeControl
        value={attributeValue}  // values → value
        onChange={handleChange}
    />
</BaseControl>
```

## プロジェクト固有の制約

### aktk-block-components新規追加制限
- **制限理由**: yStandard Blocksプラグインでも同じライブラリを使用
- **対応方針**: プラグイン固有ロジックの混入防止
- **例外**: 汎用性の高い機能は事前相談

### @ystd → @aktk変換ルール
```typescript
// 3段階変換方針
// 1. aktk-block-components優先
import { CustomSizeControl } from '@aktk/block-components/components/custom-size-control';

// 2. 一括書き換え実行
// @ystd/components → @aktk/components

// 3. ビルド確認でエラー対応
```

## テスト戦略

### テストファイル配置
```
src/components/example/
├── index.tsx
├── types.ts
└── test/
    ├── example.test.ts    # 関数ごとのテスト
    └── integration.test.ts
```

### テスト実行コマンド
```bash
npm run test:unit:component  # Jest React コンポーネントテスト
npm run test:unit:php        # PHPUnit WordPress統合テスト
```

## 設計書運用

### DESIGN.md必須作成
- 各ブロックディレクトリに配置
- 移行前の現状分析
- 移行後の設計方針
- コンポーネント依存関係記録
- リスク・対策の明文化

### 設計書更新タイミング
- コード編集前（必須）
- 依存関係変更時
- アーキテクチャ変更時
- バグ修正・機能追加時