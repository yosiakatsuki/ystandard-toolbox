# TermSelect コンポーネント設計書

## 概要

指定したタクソノミーに属するターム一覧を取得し、選択できるセレクトコンポーネント。
階層型タクソノミーの場合はインデント付きのツリー表示に対応する。

## Gutenbergコア調査結果

- ターム選択の専用UIコンポーネントは存在しない
- `@wordpress/core-data`に`getEntityRecords('taxonomy', slug)`セレクターがあり、ターム一覧を取得可能
- `getTaxonomy(slug)`で階層型かどうかを判定可能

## コンポーネント名

`TermSelect`（ディレクトリ: `term-select`）

## 既存実装の分析（`src/blocks/components/term-select/index.js`）

- `getEntityRecords('taxonomy', taxonomy, { per_page: -1 })`でターム取得
- `getTaxonomy(taxonomy)`で階層型判定
- 階層型の場合は`getTermTree()`で全角スペースインデントのフラットリストに変換
- フラットの場合はそのまま`{value, label}`に変換
- **問題点**:
  - `@wordpress/components`の`SelectControl`を直接使用
  - JavaScript実装（型安全性なし）
  - ツリー変換ロジックが外部ヘルパー（`@aktk/helper/terms`）に依存

## 設計方針

### データ取得

- `@wordpress/data`の`useSelect`を使用
- `getEntityRecords('taxonomy', taxonomy, { per_page: -1 })`でターム全件取得
- `getTaxonomy(taxonomy)`で階層型判定
- `taxonomy`が未指定・空文字の場合はデータ取得を行わず、空選択肢のみ表示

### 階層型タクソノミーのツリー表示

- 階層型の場合、`parent`フィールドを使って再帰的にツリーを構築
- 全角スペース（`　`）でインデントし、フラットなリストとして表示（レガシーと同じUX）
- ツリー変換ロジックはコンポーネント内部のユーティリティとして実装（外部ヘルパー非依存）

### フィルタリング

- プラグイン固有のフィルタロジックはコンポーネントに含めない
- `excludeSlugs`プロパティで除外したいタームスラッグを指定可能
- `filter`プロパティで任意のフィルタ関数を渡せる

### UI

- `CustomSelectControl`を使用（aktk-block-components内の既存コンポーネント）
- 空選択肢の表示有無を制御可能
- `noOptionsLabel`で選択肢がない場合のラベルを制御可能

## インターフェース

```typescript
export interface TermSelectProps {
    /** 現在選択されているタームのスラッグ */
    value: string;
    /** 値変更時のコールバック */
    onChange: (slug: string) => void;
    /** 対象タクソノミーのスラッグ（未指定・空文字時は空選択肢のみ表示） */
    taxonomy?: string;
    /** ラベル */
    label?: string;
    /** 除外するタームスラッグの配列 */
    excludeSlugs?: string[];
    /** 追加のフィルタ関数 */
    filter?: (term: TermRecord) => boolean;
    /** 空選択肢を表示するか */
    useEmptyValue?: boolean;
    /** 空選択肢のラベル */
    emptyLabel?: string;
    /** 選択肢がない場合に表示するラベル */
    noOptionsLabel?: string;
    /** 無効状態 */
    disabled?: boolean;
}
```

## ファイル構成

```
term-select/
├── DESIGN.md        # 本設計書
├── index.tsx        # エントリーポイント（export）
├── types.ts         # 型定義
└── utils.ts         # ツリー変換ユーティリティ
```

## 依存関係

- `@wordpress/data` - `useSelect`フック
- `@wordpress/core-data` - `store`（型参照）
- `@aktk/block-components/components/custom-select-control` - UI表示

## 使用例

```tsx
/* Aktk Dependencies */
import BaseControl from '@aktk/block-components/wp-controls/base-control';
import { TermSelect } from '@aktk/block-components/components/term-select';

// 基本的な使用
<BaseControl>
    <TermSelect
        label="カテゴリー"
        taxonomy="category"
        value={ attributes.termSlug }
        onChange={ ( newValue ) => setAttributes( { termSlug: newValue } ) }
    />
</BaseControl>

// タクソノミー未選択時（空選択肢のみ表示）
<BaseControl>
    <TermSelect
        label="ターム"
        taxonomy={ attributes.taxonomy }
        value={ attributes.termSlug }
        onChange={ ( newValue ) => setAttributes( { termSlug: newValue } ) }
        noOptionsLabel="分類を先に選択してください"
    />
</BaseControl>
```

## レガシーコンポーネントとの違い

| 項目 | レガシー | 新コンポーネント |
|---|---|---|
| データ取得 | `getEntityRecords` + `getTaxonomy` | 同じ（正しいAPI） |
| ツリー変換 | 外部ヘルパー`@aktk/helper/terms` | 内部ユーティリティ |
| UI | `SelectControl`直接使用 | `CustomSelectControl`（ラッパー経由） |
| 型安全性 | なし（JavaScript） | TypeScript |
| 除外機能 | なし | `excludeSlugs`/`filter`プロパティ |
| 空時の表示 | 固定ラベル | `noOptionsLabel`で制御可能 |
