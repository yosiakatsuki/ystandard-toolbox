# DESIGN.md - ブロック拡張：画面サイズによる非表示機能

## 概要

既存ブロックに対して、デバイス別（モバイル・タブレット・デスクトップ）での表示・非表示を制御する機能を提供するブロック拡張機能。

## 機能仕様

### 基本機能
- 既存のすべてのGutenbergブロックに対して適用可能な拡張機能
- モバイル・タブレット・デスクトップの3つの画面サイズでの表示・非表示を個別制御
- ブロックエディター上では視覚的にわかるよう破線の枠線で表示状態を示す

### 対象ブロック
- `customClassName`サポートがあるブロック
- `ystdtdHiddenBySize`サポートが有効なブロック
- 名前空間が`core`、`ystdb`、`ystdtb`で始まるブロック

### 属性定義
```typescript
interface HiddenBySizeAttributes {
  ystdtbIsHiddenMobile: boolean;   // モバイルで非表示
  ystdtbIsHiddenTablet: boolean;   // タブレットで非表示
  ystdtbIsHiddenDesktop: boolean;  // デスクトップで非表示
}
```

## 既存実装の分析

### ファイル構成（レガシー）
```
blocks/extension/hidden-by-size/
├── index.js              # メインロジック（フィルター・Higher Order Component）
├── attributes.json       # ブロック属性定義
├── class-hidden-by-size.php  # PHP側の属性マージ処理
├── _block.scss          # フロントエンド用CSS
└── _edit.scss           # エディター用CSS
```

### 技術的特徴
- **フィルターベースの実装**: `blocks.registerBlockType`と`editor.BlockEdit`フィルターを使用
- **Higher Order Component**: `createHigherOrderComponent`でブロックエディターを拡張
- **動的属性追加**: レジスト時に対象ブロックにのみ属性を追加
- **クラス名管理**: `classnames/dedupe`を使用してCSSクラスを動的制御

### 依存関係
- `@aktk/components/ystandard-icon` - パネルアイコン
- `@aktk/components/manual-link` - マニュアルリンクコンポーネント
- `../helper` - ヘルパー関数（`isEnableHook`, `getPanelClassName`）

## 移行設計

### 新しいファイル構成
```
src/blocks/block-library/extension-hidden-by-size/
├── DESIGN.md            # 本設計書
├── index.tsx            # TypeScript化されたメインロジック
├── types.ts             # TypeScript型定義
├── hooks.ts             # カスタムフック定義
├── style.scss           # フロントエンド用CSS（旧_block.scss）
├── style-editor.scss    # エディター用CSS（旧_edit.scss）
└── index.php            # エントリーポイント用PHP
```

**注意**: この機能はブロック拡張のため`block.json`は不要。独立したブロックタイプを登録せず、既存ブロックの機能拡張のみを行う。

### モダン化の要点

#### 1. TypeScript化
- 属性の型安全性を確保
- WordPress APIの型定義を活用
- コンポーネント間の型定義を明確化

#### 2. React Hooks活用
- Higher Order Componentからカスタムフックへの移行検討
- 状態管理の最適化

#### 3. aktk-block-components移行
- `@aktk/components/ystandard-icon` → `aktk-block-components/components/svg-icon`
- `@aktk/components/manual-link` → `aktk-block-components/components/manual-link`
- 新規`wp-controls/toggle-control`の活用

#### 4. CSS命名規則統一
- ファイル名を`style.scss`、`style-editor.scss`に統一
- 既存のCSS内容は変更なし（互換性維持）

#### 5. PHP側実装刷新
- `index.php`でのブロック登録処理
- 属性定義をTypeScriptと連携

### 実装上の注意点

#### 互換性の維持
- 既存の属性名（`ystdtbIsHiddenMobile`等）は変更しない
- CSSクラス名（`ystdtb-hidden-*`）は変更しない
- フィルターの実行優先度（`Number.MAX_SAFE_INTEGER`）を維持

#### エディター機能
- InspectorControlsパネルの表示位置・内容を維持
- ToggleControlの`__nextHasNoMarginBottom`プロパティ維持
- パネルアイコンとクラス名を維持

#### ブロックサポート機能
- `customClassName`サポート確認の仕組み維持
- `ystdtdHiddenBySize`サポート確認の追加

## 移行時のリスク

### 高リスク
- フィルターの実行タイミング変更による他プラグインとの競合
- Higher Order Componentからの移行による予期しない副作用

### 中リスク
- aktk-block-components移行時のコンポーネント仕様差異
- TypeScript化によるビルドエラー

### 低リスク
- CSS・PHPファイル名変更（機能に影響なし）
- 型定義追加（ランタイムに影響なし）

## 移行後の検証項目

1. **機能検証**
   - 各画面サイズでの非表示機能動作確認
   - エディター上での視覚的表示確認
   - 既存ブロックへの適用可能性確認

2. **互換性検証**
   - 既存投稿・ページでの表示崩れがないか
   - 他のブロック拡張機能との競合確認
   - yStandardテーマとの連携確認

3. **パフォーマンス検証**
   - ビルドサイズの確認
   - エディター動作の軽快性確認

## 今後の拡張予定

- レスポンシブ設定のプリセット機能
- より細かい画面サイズでの制御オプション
- アニメーション効果の追加検討