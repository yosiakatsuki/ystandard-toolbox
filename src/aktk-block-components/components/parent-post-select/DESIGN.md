# ParentPostSelect コンポーネント設計書

## 概要

階層型投稿タイプにおいて、子ページを持つ投稿を一覧取得し、親投稿として選択できるセレクトコンポーネント。
階層構造をインデント付きのツリー表示で表現する。

## コンポーネント名

`ParentPostSelect`（ディレクトリ: `parent-post-select`）

## 設計方針

### データ取得

- `@wordpress/data`の`useSelect`を使用
- `getPostType(postType)`で階層型判定
- 階層型の場合のみ`getEntityRecords('postType', postType, { per_page: -1 })`で投稿を全件取得
- `postType`が未指定・空文字、または非階層型の場合はデータ取得を行わず空選択肢のみ表示

### 親投稿の抽出

- 子ページを持つ投稿のみ選択肢として表示（レガシー実装と同じ仕様）
- 全角スペース（`　`）でインデントし、階層構造をフラットリストで表現
- ツリー変換ロジックはコンポーネント内部の`utils.ts`に実装

### UI

- `CustomSelectControl`を使用（aktk-block-components内の既存コンポーネント）
- `noOptionsLabel`で選択肢がない場合のラベルを制御可能

## インターフェース

```typescript
export interface ParentPostSelectProps {
    /** 現在選択されている親投稿のID（文字列） */
    value: string;
    /** 値変更時のコールバック */
    onChange: (id: string) => void;
    /** 対象の投稿タイプスラッグ（未指定・空文字、または非階層型の場合は空選択肢のみ表示） */
    postType?: string;
    /** ラベル */
    label?: string;
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
parent-post-select/
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
import { ParentPostSelect } from '@aktk/block-components/components/parent-post-select';

<BaseControl label="親ページ指定">
    <ParentPostSelect
        postType={ attributes.postType }
        value={ attributes.postParent }
        onChange={ ( newValue ) => setAttributes( { postParent: newValue } ) }
    />
</BaseControl>
```
