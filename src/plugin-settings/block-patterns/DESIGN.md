# ブロックパターン設定画面 TypeScript化設計書

## 概要

`src/plugin-settings/block-patterns/index.tsx` をモダンなTypeScriptコンポーネントに移行する。現在のコードは古いJavaScriptスタイルでレガシーコンポーネントを使用しており、他の設定画面（add-code, cta, heading）と統一した実装に変更する。

## 現在の問題点

### 1. レガシーコンポーネントの使用
- `PageBase` → `AppContainer` に変更が必要
- `Buttons` → `PrimaryButton` に変更が必要
- `@aktk/components/toast-message` → `@aktk/block-components/components/toast-message` に変更が必要

### 2. TypeScript型定義の不備
- Context型定義が不完全（`createContext()`）
- Props、State の型定義なし
- 型安全性の確保が必要

### 3. 古いimport構造
- importコメントセクションが統一されていない
- レガシーなimportパスを使用

### 4. update.js の分離
- 更新処理が別ファイルに分離されている
- 他の設定画面と同様にメインファイルに統合が必要

## 参考となる実装パターン

### 1. add-code/index.tsx パターン（最新）
```typescript
interface AddCodeContextType {
  settings: Record<string, any>;
  setSettings: React.Dispatch<React.SetStateAction<Record<string, any>>>;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AddCodeContext = createContext<AddCodeContextType>({
  settings: {},
  setSettings: () => {},
  isLoading: true,
  setIsLoading: () => {},
});
```

### 2. cta/index.tsx パターン（複雑な状態管理）
- 複数の状態を管理するContext
- 詳細な型定義とコメント
- apiPost直接統合

### 3. heading/index.tsx パターン（シンプル）
- シンプルな構造
- 条件分岐による画面制御

## 設計方針

### 1. TypeScript型定義
```typescript
interface BlockPatternsContextType {
  settings: Record<string, any>;
  setSettings: React.Dispatch<React.SetStateAction<Record<string, any>>>;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  getSetting: (name: string) => any;
}
```

### 2. コンポーネント構造
- React.FC関数コンポーネント形式
- 適切なJSDoc日本語コメント
- 統一されたimportセクション構造

### 3. 更新処理統合
- update.js の処理をメインファイルに統合
- apiPost直接使用
- 他画面と同様のエラーハンドリング

### 4. 依存関係更新
- `@aktk/block-components` 使用
- `AppContainer` 使用
- 適切な型安全性確保

## 実装TODO

### 1. TypeScript型定義の追加
- [x] BlockPatternsContextType インターフェース定義
- [x] コンポーネントの戻り値型（JSX.Element）追加
- [x] 適切なContext初期値設定

### 2. モダンコンポーネントへの移行
- [x] importセクションの統一（WordPress Dependencies / Aktk Dependencies / Plugin Dependencies）
- [x] PageBase → AppContainer 変更
- [x] Buttons → PrimaryButton 変更
- [x] toast-message パス修正

### 3. update.js処理の統合
- [x] apiPost import追加
- [x] update関数をhandleOnClickUpdate内に統合
- [x] update.js ファイル削除

### 4. 国際化対応の追加
- [x] __ 関数使用
- [x] ハードコードされた文字列の国際化

### 5. コード品質向上
- [x] 適切な日本語コメント追加
- [x] レンダリング処理の型安全性確保
- [x] エラーハンドリングの統一

## 実装完了

すべてのTODO項目が完了しました。主要な変更内容：

1. **TypeScript完全対応**: 型安全なContext定義と関数型定義
2. **モダンコンポーネント移行**: 最新のaktk-block-components使用
3. **統合された更新処理**: update.jsを統合してファイル削除
4. **国際化完全対応**: すべての表示テキストを__()で国際化
5. **統一されたアーキテクチャ**: 他の設定画面との一貫性確保

## 影響範囲

### 変更ファイル
- `src/plugin-settings/block-patterns/index.tsx` - メイン実装
- `src/plugin-settings/block-patterns/update.js` - 削除予定

### 依存関係
- 子コンポーネント（CorePattern）への影響は最小限
- Context構造は維持するため既存の使用箇所は影響なし

## 検証事項

1. ブロックパターン設定の保存・読み込み機能が正常動作
2. CorePatternコンポーネントとの連携が正常
3. トースト通知が適切に表示
4. ローディング状態の適切な制御

## 完成後の構造

```typescript
import React from 'react';
/**
 * WordPress Dependencies
 */
import { useState, useEffect, createContext, createRoot } from '@wordpress/element';
import { __ } from '@wordpress/i18n';

/**
 * Aktk Dependencies
 */
import { ToastContainer, notifySuccess, notifyError } from '@aktk/block-components/components/toast-message';
import { PrimaryButton } from '@aktk/block-components/components/buttons/buttons';
import { apiPost, getEndpoint } from '@aktk/api';

/**
 * Plugin Dependencies
 */
import AppContainer from '@aktk/plugin-settings/components/app-container';
import { getPluginSetting } from '@aktk/plugin-settings/utils/setting';
import { getObjectValue } from '@aktk/helper/object.js';
import CorePattern from './core-pattern';

interface BlockPatternsContextType {
  // 型定義
}

export const BlockPatternsContext = createContext<BlockPatternsContextType>({
  // 初期値
});

export default function BlockPatterns(): JSX.Element {
  // 実装
}
```