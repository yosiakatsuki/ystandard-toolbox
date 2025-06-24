# core-pattern 下層コンポーネント TypeScript化設計書

## 概要

`src/plugin-settings/block-patterns/core-pattern/` 下層の2つのファイルをモダンなTypeScriptコンポーネントに移行する。WordPress標準パターンの有効・無効を制御するコンポーネント群。

## 現在の構成

```
core-pattern/
├── index.tsx       # CorePatternコンポーネント（PanelBodyラッパー）
└── disable-core-pattern.tsx  # DisableCorePatternコンポーネント（設定UI）
```

## 問題点分析

### 1. index.tsx の問題点

#### レガシーコンポーネントの使用
- `@wordpress/components` の `PanelBody` を直接使用
- aktk-block-componentsルールに違反（wp-controls経由で使用すべき）

#### TypeScript型定義の不備
- 関数コンポーネントの戻り値型（JSX.Element）未定義
- Props型定義なし

#### 国際化対応不足
- ハードコードされた日本語文字列（'WordPress標準パターン'）
- `__()` 関数による国際化未対応

### 2. disable-core-pattern.tsx の問題点

#### レガシーコンポーネントの混在
- `@wordpress/components` の `BaseControl` を直接使用
- `@aktk/components/horizon-buttons` （レガシーコンポーネント）を使用
- aktk-block-componentsルールに違反

#### TypeScript型定義の不備
- Props型定義なし
- 関数パラメータの型定義不足（`newValue` の型未定義）
- Context型との整合性確認が必要

#### 国際化対応不足
- ハードコードされた日本語文字列多数
  - '有効', '無効'
  - 'WordPress本体のブロックパターンの有効・無効'

## 参考となるモダンコンポーネント

### aktk-block-components 使用パターン
- `@aktk/block-components/wp-controls` のコンポーネント使用
- `@aktk/block-components/components` のUIコンポーネント使用

### 国際化パターン
```typescript
import { __ } from '@wordpress/i18n';

title={ __( 'WordPress標準パターン', 'ystandard-toolbox' ) }
```

## 設計方針

### 1. aktk-block-componentsルール準拠

#### PanelBody の移行
```typescript
// 現在（問題）
import { PanelBody } from '@wordpress/components';

// 移行後（設定画面専用）
import { PluginSettingsPanel } from '@aktk/plugin-settings/components/panel';
```

#### BaseControl の移行
```typescript
// 現在（問題）
import { BaseControl } from '@wordpress/components';

// 移行後（設定画面専用）
import PluginSettingsBaseControl from '@aktk/plugin-settings/components/base-control';
```

#### HorizonButtons の移行
```typescript
// 現在（レガシー）
import HorizonButtons from '@aktk/components/horizon-buttons';

// 移行後（モダン版使用）
import { HorizonButtonSelect } from '@aktk/block-components/components/buttons';
```

**注意**: HorizonButtonsとHorizonButtonSelectはAPIが異なるため、propsの調整が必要：
- `items` → `options`
- `primary` → `value`
- `onChange` のパラメータ形式が変更

### 2. TypeScript型定義の強化

#### コンポーネント型定義
```typescript
export default function CorePattern(): JSX.Element {
  // 実装
}

export default function DisableCorePattern(): JSX.Element {
  // 実装
}
```

#### パラメータ型定義
```typescript
// HorizonButtonSelectのoptions型
interface ButtonOption {
  value: boolean;
  label: string;
}

// onChange関数の型（HorizonButtonSelect用）
const handleOnChange = ( newValue: string | number | boolean ) => {
  setSettings( {
    ...settings,
    disable_core_pattern: newValue,
  } );
};
```

### 3. 完全な国際化対応

#### 文字列の国際化
```typescript
// HorizonButtonSelect用のoptions配列
const options = [
  {
    value: false,
    label: __( '有効', 'ystandard-toolbox' ),
  },
  {
    value: true,
    label: __( '無効', 'ystandard-toolbox' ),
  },
];
```

## 実装TODO

### 1. レガシーコンポーネントの問題点分析
- [ ] aktk-block-componentsで利用可能なコンポーネント調査
- [ ] HorizonButtonsの代替コンポーネント検討
- [ ] 移行パスの確定

### 2. モダンコンポーネント移行計画策定
- [ ] index.tsx: PanelBody → wp-controls版に移行
- [ ] disable-core-pattern.tsx: BaseControl → wp-controls版に移行
- [ ] HorizonButtons → 適切なモダンコンポーネントに移行

### 3. TypeScript型定義の改善
- [ ] 関数コンポーネントの戻り値型追加
- [ ] handleOnChange関数のパラメータ型定義
- [ ] Context使用部分の型安全性確保

### 4. 国際化対応の完全実装
- [ ] すべてのハードコード文字列を__()で国際化
- [ ] 適切なtextdomainの設定確認

### 5. importセクションの統一
- [ ] WordPress Dependencies / Aktk Dependencies / Plugin Dependencies形式への統一
- [ ] 適切なコメントセクション追加

## 影響範囲

### 変更対象ファイル
- `src/plugin-settings/block-patterns/core-pattern/index.tsx`
- `src/plugin-settings/block-patterns/core-pattern/disable-core-pattern.tsx`

### 依存関係への影響
- 親コンポーネント（../index.tsx）への影響は最小限
- Context使用部分は既存の型定義に準拠

## 検証事項

1. WordPress標準パターンの有効・無効切り替えが正常動作
2. 設定値の保存・読み込みが適切に機能  
3. UI表示が適切に国際化されている
4. 型安全性が確保されている

## 移行後の期待される構造

```typescript
// index.tsx
import React from 'react';
/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
/**
 * Plugin Dependencies
 */
import { PluginSettingsPanel } from '@aktk/plugin-settings/components/panel';
import DisableCorePattern from './disable-core-pattern';

export default function CorePattern(): JSX.Element {
  return (
    <PluginSettingsPanel title={ __( 'WordPress標準パターン', 'ystandard-toolbox' ) }>
      <DisableCorePattern />
    </PluginSettingsPanel>
  );
}
```

```typescript
// disable-core-pattern.tsx  
import React from 'react';
/**
 * WordPress Dependencies
 */
import { useContext } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
/**
 * Aktk Dependencies
 */
import { HorizonButtonSelect } from '@aktk/block-components/components/buttons';
import { toBool } from '@aktk/block-components/utils/boolean';
/**
 * Plugin Dependencies
 */
import PluginSettingsBaseControl from '@aktk/plugin-settings/components/base-control';
import { BlockPatternsContext } from '../index';

interface ButtonOption {
  value: boolean;
  label: string;
}

export default function DisableCorePattern(): JSX.Element {
  const { settings, setSettings, getSetting } = useContext( BlockPatternsContext );
  
  const handleOnChange = ( newValue: string | number | boolean ) => {
    setSettings( {
      ...settings,
      disable_core_pattern: newValue,
    } );
  };
  
  const options: ButtonOption[] = [
    {
      value: false,
      label: __( '有効', 'ystandard-toolbox' ),
    },
    {
      value: true,
      label: __( '無効', 'ystandard-toolbox' ),
    },
  ];
  
  const currentValue = toBool( getSetting( 'disable_core_pattern' ) );
  
  return (
    <PluginSettingsBaseControl
      id="disable_core_pattern"
      label={ __( 'WordPress本体のブロックパターンの有効・無効', 'ystandard-toolbox' ) }
    >
      <HorizonButtonSelect
        value={ currentValue }
        onChange={ handleOnChange }
        options={ options }
      />
    </PluginSettingsBaseControl>
  );
}
```