# PostTypeSelect コンポーネント設計書

## 概要

サイト内で利用可能な投稿タイプを取得し、選択できるセレクトコンポーネント。
`@wordpress/core-data`の`getPostTypes()`を使用してデータを取得し、`CustomSelectControl`で表示する。

## Gutenbergコア調査結果

- **専用コンポーネントは存在しない**
- `@wordpress/core-data`に`getPostTypes()`セレクターがあるが、UIコンポーネントは提供されていない
- WordPress Query Loopブロックも汎用`SelectControl`で自前実装している

## コンポーネント名

`PostTypeSelect`（ディレクトリ: `post-type-select`）

## 既存実装の分析

### レガシー版（`src/blocks/components/post-type-select/index.js`）

- `useSelect` + `select('core').getPostTypes({ per_page: -1 })` でデータ取得
- `filterSelectPostTypes()`でフィルタリング（`viewable`かつ`ys-parts`/`attachment`を除外）
- `SelectControl`で表示
- **問題点**: フィルタ関数がプラグイン固有ロジック（`ys-parts`除外）を含む

### plugin-settings版（`src/plugin-settings/cta/post-type-selector.tsx`）

- REST APIからプラグイン設定経由で取得
- `CustomSelectControl`で表示
- CTA設定に特化したコンテキスト依存の実装

## 設計方針

### データ取得

- `@wordpress/data`の`useSelect`と`select('core').getPostTypes()`を使用
- `per_page: -1`で全件取得
- デフォルトでは`viewable: true`の投稿タイプのみ取得

### フィルタリング

- **プラグイン固有のフィルタロジックはコンポーネントに含めない**
- `filter`プロパティで呼び出し側が任意のフィルタ関数を渡せるようにする
- デフォルトフィルタ: `viewable`が`true`のもののみ（`getPostTypes`のクエリパラメータで制御）

### UI

- `CustomSelectControl`を使用（aktk-block-components内の既存コンポーネント）
- 空選択肢の表示有無を制御可能

### 除外対象の投稿タイプ

- `excludeSlugs`プロパティで呼び出し側が除外したい投稿タイプスラッグを指定可能
- デフォルト: `['attachment']`（メディアは通常不要）

## インターフェース

```typescript
export interface PostTypeSelectProps {
    /** 現在選択されている投稿タイプのスラッグ */
    value: string;
    /** 値変更時のコールバック */
    onChange: (slug: string) => void;
    /** ラベル */
    label?: string;
    /** 除外する投稿タイプスラッグの配列 */
    excludeSlugs?: string[];
    /** 追加のフィルタ関数 */
    filter?: (postType: PostTypeRecord) => boolean;
    /** 空選択肢を表示するか */
    useEmptyValue?: boolean;
    /** 空選択肢のラベル */
    emptyLabel?: string;
    /** 無効状態 */
    disabled?: boolean;
}
```

## ファイル構成

```
post-type-select/
├── DESIGN.md        # 本設計書
├── index.tsx        # エントリーポイント（export）
└── types.ts         # 型定義
```

## 依存関係

- `@wordpress/data` - `useSelect`フック
- `@wordpress/core-data` - `store`（型参照）
- `@aktk/block-components/components/custom-select-control` - UI表示

## 使用例

```tsx
/* Aktk Dependencies */
import BaseControl from '@aktk/block-components/wp-controls/base-control';
import { PostTypeSelect } from '@aktk/block-components/components/post-type-select';

// 基本的な使用
<BaseControl>
    <PostTypeSelect
        label="投稿タイプ"
        value={ attributes.postType }
        onChange={ ( newValue ) => setAttributes( { postType: newValue } ) }
    />
</BaseControl>

// 特定の投稿タイプを除外
<BaseControl>
    <PostTypeSelect
        label="投稿タイプ"
        value={ attributes.postType }
        onChange={ ( newValue ) => setAttributes( { postType: newValue } ) }
        excludeSlugs={ [ 'attachment', 'ys-parts' ] }
    />
</BaseControl>

// カスタムフィルタ
<BaseControl>
    <PostTypeSelect
        label="投稿タイプ"
        value={ attributes.postType }
        onChange={ ( newValue ) => setAttributes( { postType: newValue } ) }
        filter={ ( postType ) => postType.has_archive }
    />
</BaseControl>
```
