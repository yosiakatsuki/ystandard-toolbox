# Banner-Link ブロック移行設計書

## 移行概要

### 移行前の状況
- **場所**: `src/blocks/block-library/banner-link/`（既に移動済み）
- **状態**: TypeScript化済み、モダンなReactパターン使用
- **実装レベル**: 高い（画像・テキスト・リンク機能が充実）

### 移行の目的
1. 最新Gutenbergブロック仕様（block.json）への対応
2. aktk-block-componentsへの依存関係移行
3. レガシー`@ystd/`パッケージからの脱却
4. 統一されたPHPブロック登録処理の実装

## 現在の実装分析

### ✅ 良好な点
- **TypeScript完全対応**: 全ファイルが.tsxで実装済み
- **モダンReactパターン**: Hooks、Compose使用
- **充実したUI**: 33個のコントロールファイルで詳細設定可能
- **レスポンシブ対応**: デスクトップ・モバイル対応済み
- **アクセシビリティ**: RichText、ARIA属性適切に使用

### ⚠️ 移行が必要な箇所

#### 1. レガシー依存関係（27ファイル）
```typescript
// 現在
import { ystdtbConfig } from '@ystd/config';
import { mergeDefaultAttributes } from '@ystd/helper/attribute';
// ↓ 移行先
import { COLORS, CATEGORY } from '@aktk/block-components/config';
import { mergeDefaultAttributes } from '@aktk/block-components/utils/attributes';
```

#### 2. WordPressコンポーネント直接利用（33ファイル）
```typescript
// 現在
import { BaseControl, TextControl, RangeControl } from '@wordpress/components';
// ↓ 移行先
import BaseControl from '@aktk/block-components/wp-controls/base-control';
import UnitControl from '@aktk/block-components/wp-controls/unit-control';
```

#### 3. ブロック登録の現代化
- `config.ts` → `block.json` + `utils.ts`
- `registerBlockType`パターンの統一
- PHPクラスベース登録の追加

## 移行計画

### ✅ 完了済みフェーズ

#### フェーズ1: 基盤整備（部分完了）
1. ✅ **block.json作成**: メタデータ駆動アーキテクチャ
2. ✅ **index.php作成**: Banner_Link_Blockクラス実装
3. ✅ **utils.ts作成**: config.tsから定数移行
4. ✅ **types.ts作成**: TypeScript型定義追加

#### 実際の対応事項
1. ✅ **CATEGORYエクスポートエラー修正**: 
   - **問題**: `@aktk/block-components/config`からCATEGORYがエクスポートされていない
   - **解決策**: `@aktk/blocks/config`から正しくインポート
   ```typescript
   // 修正前（エラー）
   import { COLORS, CATEGORY } from '@aktk/block-components/config';
   
   // 修正後（正常）
   import { COLORS } from '@aktk/block-components/config';
   import { CATEGORY } from '@aktk/blocks/config';
   ```

### ⏸️ 一時中断フェーズ

#### フェーズ2: 依存関係移行（一時中断）
- **理由**: 60ファイル以上の複雑な`@ystd/`依存関係
- **新方針**: レガシーコンポーネント維持、最低限の仕様対応のみ実施
- **今後の対応**: 他の簡単なブロック移行完了後に再検討

#### フェーズ3: 最適化（一時中断）
- CSS分離、型定義強化、テスト追加は後回し

## コンポーネント移行マップ

### 高優先度（共通コンポーネント）
```typescript
// 色関連
@ystd/components/color-palette-control → @aktk/block-components/components/color-pallet-control
// サイズ関連
@ystd/controls/unit-control → @aktk/block-components/wp-controls/unit-control
// ボーダー関連
@ystd/controls/border-control → @aktk/block-components/components/border-radius-control
```

### 中優先度（ユーティリティ）
```typescript
// ヘルパー関数
@ystd/helper/ratio → @aktk/block-components/utils/（新規作成が必要）
@ystd/helper/fontSize → @aktk/block-components/utils/font-size
@ystd/helper/config → @aktk/block-components/config
```

### 低優先度（プラグイン固有）
```typescript
// プラグイン専用機能（移行不要）
@ystd/components/box-shadow-control → src/blocks/components/（既存維持）
```

## リスク評価と対策

### 高リスク
1. **複雑なスタイル実装**: 
   - リスク: 3つのSCSSファイル、複雑なCSS変数
   - 対策: 段階的移行、既存スタイル保持

2. **多数の依存関係**:
   - リスク: 60ファイル以上の影響範囲
   - 対策: バッチ処理での一括更新

### 中リスク
1. **RichTextカスタマイズ**:
   - リスク: WordPress APIの変更影響
   - 対策: 最新仕様への適合確認

## 完了基準

### 必須要件
- [ ] block.json完全実装
- [ ] Banner_Link_Block PHPクラス実装
- [ ] @ystd/依存関係完全除去
- [ ] @wordpress/components直接利用除去
- [ ] BaseControl id属性すべて追加

### 推奨要件
- [ ] Jest単体テスト追加
- [ ] TypeScript型定義強化
- [ ] CSS分離完了

## 移行後の期待効果

1. **保守性向上**: 統一されたコンポーネント利用
2. **アップデート対応**: WordPress版本変更に強い構造
3. **開発効率**: aktk-block-components活用による高速開発
4. **品質向上**: 型安全性とテストカバレッジの向上

## 実装優先順序

1. **基盤**: block.json, index.php, utils.ts
2. **コア機能**: index.tsx, edit.tsx, save.tsx
3. **コントロール**: inspector-controls/ 33ファイル
4. **ユーティリティ**: function/, controls/
5. **スタイル**: SCSS分離とCSS最適化

この設計書に従って段階的に移行を実施し、各フェーズでテストと検証を行う。