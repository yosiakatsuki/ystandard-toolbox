# TaxonomySelect コンポーネント設計書

## 概要

指定した投稿タイプに紐づくタクソノミー一覧を取得し、選択できるセレクトコンポーネント。
`@wordpress/core-data`の`getTaxonomies()`を使用してデータを取得し、`CustomSelectControl`で表示する。

## Gutenbergコア調査結果

- タクソノミー選択の専用UIコンポーネントは存在しない
- `@wordpress/core-data`に`getTaxonomies(query)`セレクターがあり、`type`パラメータで投稿タイプによるフィルタが可能

## コンポーネント名

`TaxonomySelect`（ディレクトリ: `taxonomy-select`）

## 既存実装の分析（`src/blocks/components/taxonomy-select/index.js`）

- `getTaxonomy()`を引数なしで呼び出し + `getPostType(postType).taxonomies`で投稿タイプのタクソノミースラッグ配列を取得
- タクソノミースラッグをキーにオブジェクトから名前を取得してオプション生成
- **問題点**:
  - `getTaxonomy()`の使い方が非標準（引数なしは単一取得API、`getTaxonomies`が正しい）
  - `@wordpress/components`の`SelectControl`を直接使用
  - JavaScript実装（型安全性なし）

## 設計方針

### データ取得

- `@wordpress/data`の`useSelect`と`select('core').getTaxonomies()`を使用
- `type`クエリパラメータで投稿タイプに紐づくタクソノミーをフィルタ
- `per_page: -1`で全件取得
- `postType`が未指定または空文字の場合はデータ取得を行わず、空選択肢のみ表示する

### フィルタリング

- プラグイン固有のフィルタロジックはコンポーネントに含めない
- `excludeSlugs`プロパティで除外したいタクソノミースラッグを指定可能
- `filter`プロパティで任意のフィルタ関数を渡せる

### UI

- `CustomSelectControl`を使用（aktk-block-components内の既存コンポーネント）
- 空選択肢の表示有無を制御可能

## インターフェース

```typescript
export interface TaxonomySelectProps {
    /** 現在選択されているタクソノミーのスラッグ */
    value: string;
    /** 値変更時のコールバック */
    onChange: (slug: string) => void;
    /** フィルタ対象の投稿タイプスラッグ（未指定・空文字時は空選択肢のみ表示） */
    postType?: string;
    /** ラベル */
    label?: string;
    /** 除外するタクソノミースラッグの配列 */
    excludeSlugs?: string[];
    /** 追加のフィルタ関数 */
    filter?: (taxonomy: TaxonomyRecord) => boolean;
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
taxonomy-select/
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
import { TaxonomySelect } from '@aktk/block-components/components/taxonomy-select';

// 投稿タイプに紐づくタクソノミーを選択
<BaseControl>
    <TaxonomySelect
        label="タクソノミー"
        postType="post"
        value={ attributes.taxonomy }
        onChange={ ( newValue ) => setAttributes( { taxonomy: newValue } ) }
    />
</BaseControl>

// 特定のタクソノミーを除外
<BaseControl>
    <TaxonomySelect
        label="タクソノミー"
        postType={ attributes.postType }
        value={ attributes.taxonomy }
        onChange={ ( newValue ) => setAttributes( { taxonomy: newValue } ) }
        excludeSlugs={ [ 'post_format' ] }
    />
</BaseControl>
```

## レガシーコンポーネントとの違い

| 項目 | レガシー | 新コンポーネント |
|---|---|---|
| データ取得 | `getTaxonomy()`（非標準） | `getTaxonomies({ type, per_page: -1 })` |
| フィルタ | 投稿タイプのtaxonomies配列でマッチ | `type`クエリパラメータで直接フィルタ |
| UI | `SelectControl`直接使用 | `CustomSelectControl`（ラッパー経由） |
| 型安全性 | なし（JavaScript） | TypeScript |
| 除外機能 | なし | `excludeSlugs`/`filter`プロパティ |
