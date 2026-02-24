# 記事一覧（posts）ブロック移行設計書

## 概要

- **移行元**: `blocks/posts/`
- **移行先**: `src/blocks/block-library/posts/`
- **ブロック名**: `ystdtb/posts`
- **種別**: ダイナミックブロック（サーバーサイドレンダリング）
- **移行方針**: 段階的に移行。仕様変更を含む

---

## 現行実装の分析

### ファイル構成（移行元）

```
blocks/posts/
├── index.js                          # ブロック登録
├── config.js                         # 属性・supports定義
├── edit.js                           # エディターコンポーネント
├── _edit.scss                        # エディター用CSS
├── class-posts-block.php             # PHPレンダリング（Dynamic_Block継承）
└── inspector-controls/
    ├── index.js                      # エクスポート（ListDesign, ExcerptLength）
    ├── basic-option/
    │   ├── index.js                  # 基本設定パネル
    │   ├── count.js                  # 表示件数（レスポンシブ対応）
    │   └── orderby.js               # 並び順
    ├── design/
    │   └── list-design.js            # デザイン選択（レスポンシブ対応）
    ├── thumbnail/
    │   ├── index.js                  # サムネイルパネル
    │   ├── show-image.js             # 画像表示切替
    │   ├── size.js                   # 画像サイズ選択
    │   └── ratio.js                  # アスペクト比選択
    ├── meta/
    │   └── excerpt-length.js         # 概要文字数
    ├── search-option/
    │   ├── index.js                  # 絞り込みパネル
    │   ├── post-type.js              # 投稿タイプ選択
    │   ├── taxonomy.js               # タクソノミー選択
    │   └── term.js                   # ターム選択
    ├── advanced-search/
    │   ├── index.js                  # 高度な絞り込みパネル
    │   ├── post-id.js                # 投稿ID指定
    │   ├── post-name.js              # 投稿スラッグ指定
    │   └── post-parent.js            # 親投稿選択
    └── advanced-design/
        ├── index.js                  # 高度な表示パネル
        └── offset.js                # オフセット（レスポンシブ対応）
```

### 属性一覧（23属性）

| 属性名 | 型 | デフォルト | カテゴリ | 説明 |
|--------|------|-----------|---------|------|
| `count` | number | 3 | 基本 | 表示件数（デスクトップ） |
| `countMobile` | number | - | 基本 | 表示件数（モバイル） |
| `orderby` | string | `'date'` | 基本 | 並び順（date/modified/title/rand） |
| `order` | string | `'DESC'` | 基本 | ソート方向 |
| `listType` | string | `'card'` | 表示 | デザイン（card/list/simple） |
| `listTypeMobile` | string | - | 表示 | モバイル用デザイン |
| `colMobile` | number | 1 | 表示 | 列数（モバイル） |
| `colTablet` | number | 3 | 表示 | 列数（タブレット） |
| `colPc` | number | 3 | 表示 | 列数（デスクトップ） |
| `showImg` | boolean | true | サムネイル | 画像表示 |
| `thumbnailSize` | string | `'full'` | サムネイル | 画像サイズ |
| `thumbnailRatio` | string | `'16-9'` | サムネイル | アスペクト比 |
| `showDate` | boolean | true | メタ | 日付表示 |
| `showCategory` | boolean | true | メタ | カテゴリー表示 |
| `showExcerpt` | boolean | false | メタ | 概要表示 |
| `excerptLength` | number | - | メタ | 概要文字数 |
| `postType` | string | `'post'` | 絞り込み | 投稿タイプ |
| `taxonomy` | string | - | 絞り込み | タクソノミー |
| `termSlug` | string | - | 絞り込み | タームスラッグ |
| `postIn` | string | - | 高度な絞り込み | 投稿ID（カンマ区切り） |
| `postNameIn` | string | - | 高度な絞り込み | 投稿スラッグ（カンマ区切り） |
| `postParent` | string | - | 高度な絞り込み | 親投稿ID |
| `offset` | number | - | 高度な表示 | オフセット（デスクトップ） |
| `offsetMobile` | number | - | 高度な表示 | オフセット（モバイル） |

### PHPレンダリングの仕組み

1. `Dynamic_Block` を継承した `Posts_Block` クラス
2. `render()` でブロック属性をcamelCaseからsnake_caseに変換（`migration_attributes()`）
3. `Utility::parse_shortcode_attributes()` でショートコード引数文字列に変換
4. yStandardテーマの `[ys_recent_posts]` ショートコードに委譲
5. `ys_recent_posts` ショートコードが存在しない場合、ブロック自体を登録しない

### レガシーコンポーネント依存

| インポート元 | 用途 |
|-------------|------|
| `@ystd/config` | アイコン色・カテゴリー定数 |
| `@ystd/helper/blockConfig` | テーマ側のブロック設定取得 |
| `@ystd/helper/number` | 数値バリデーション |
| `@ystd/components/responsive-tab` | レスポンシブ切替タブUI |
| `@ystd/components/number-control` | 数値入力 |
| `@ystd/components/post-type-select` | 投稿タイプ選択 |
| `@ystd/components/taxonomy-select` | タクソノミー選択 |
| `@ystd/components/term-select` | ターム選択 |
| `@ystd/components/post-parent-select` | 親投稿選択 |
| `@ystd/components/notice` | ヘルプ通知表示 |
| `react-feather` → `Archive` | ブロックアイコン |

---

## 移行方針

### 段階的移行計画

#### ステップ1: 基盤整備

- `block.json` の作成（メタデータ駆動）
- `index.php` の作成（シングルトンパターン、`register_block_type(__DIR__)` 方式）
- `index.tsx` の作成（ブロック登録）
- `types.ts` の作成（TypeScript型定義）
- `save.tsx` の作成（`return null` - ダイナミックブロック）

#### ステップ2: エディターUI移行

- `edit.tsx` の作成（ServerSideRender維持）
- インスペクターコントロールのTypeScript化・パネル分割
- `style-editor.scss` の作成

#### ステップ3: PHPレンダリング実装

- `index.php` に `render_callback` を実装
- `WP_Query` による独自の投稿取得・HTML生成（ショートコード非依存）
- 旧 `class-posts-block.php`（`Dynamic_Block`継承・ショートコード委譲）を完全に置き換え

#### ステップ4: 旧ブロックとの互換対応

- `deprecated/` ディレクトリの作成（必要に応じて）
- 既存コンテンツの互換性確認

### 仕様変更

#### 確定事項

1. **`Dynamic_Block` を継承しない**
   - 旧実装は `Dynamic_Block` 抽象クラスを継承していたが、新実装では使用しない
   - `register_block_type( __DIR__ )` による標準的なブロック登録に移行
   - `render_callback` は `index.php` 内の `Posts_Block` クラスに直接実装

2. **`ys_recent_posts` ショートコードを使用しない**
   - 旧実装はyStandardテーマの `[ys_recent_posts]` ショートコードにレンダリングを委譲していたが、廃止
   - PHP側で独自に `WP_Query` を実行し、HTMLを直接生成する
   - テーマのショートコード存在有無に依存しなくなる
   - これに伴い、旧PHPの `migration_attributes()`（camelCase → snake_case変換）も不要になる

3. **`ranking`（SGA連携）の廃止**
   - 旧実装の `orderby: 'ranking'` → `filter = 'sga'` の特殊処理を廃止
   - `orderby` の選択肢から `ranking` を削除

#### 検討事項

- [ ] 属性構造の見直し（必要に応じて）
- [ ] インスペクターコントロールのパネル構成見直し
- [ ] レスポンシブ関連コントロールのモダン化検討
- [ ] `__next40pxDefaultSize`、`__nextHasNoMarginBottom` の削除（wp-controls利用）

---

## 移行後のファイル構成（予定）

```
src/blocks/block-library/posts/
├── block.json              # ブロックメタデータ定義
├── index.php               # PHPブロック登録・レンダリング
├── index.tsx               # ブロック登録（メタデータ駆動）
├── edit.tsx                # エディターコンポーネント
├── save.tsx                # 保存コンポーネント（return null）
├── types.ts                # TypeScript型定義
├── utils.ts                # ユーティリティ関数
├── style-editor.scss       # エディター専用CSS
├── inspector-controls/     # インスペクターコントロール
│   ├── index.tsx
│   ├── basic/              # 基本設定
│   ├── display/            # 表示設定
│   ├── thumbnail/          # サムネイル設定
│   ├── meta/               # メタ情報表示設定
│   ├── filter/             # 絞り込み設定
│   └── advanced/           # 高度な設定
└── DESIGN.md               # 本設計書（移行完了後削除）
```

### PHP登録クラス

```php
namespace ystandard_toolbox;

class Posts_Block {
    const BLOCK_NAME = 'ystdtb/posts';

    // シングルトンパターン
    // register_block_type( __DIR__ ) + render_callback
    // WP_Query による独自レンダリング（ショートコード非依存）
}
```

---

## コンポーネント依存の移行方針

### aktk-block-components に存在するもの

| 旧コンポーネント | 移行先 |
|-----------------|--------|
| `@ystd/components/number-control` | `@aktk/block-components/wp-controls/number-control` |
| `@ystd/components/notice` | `@aktk/block-components/components/notice` |

### プラグイン固有（旧コンポーネントを継続利用）

| コンポーネント | 理由 |
|---------------|------|
| `PostTypeSelect` | プラグイン固有のREST API連携 |
| `TaxonomySelect` | プラグイン固有のREST API連携 |
| `TermSelect` | プラグイン固有のREST API連携 |
| `PostParentSelect` | プラグイン固有のREST API連携 |
| `ResponsiveTab` | プラグイン固有のUI。レスポンシブ切替パターン |

### 変換ルール

- `@ystd/config` → `@aktk/config`
- `@ystd/helper/*` → `@aktk/helper/*`
- `@ystd/components/*` → `@aktk/components/*`（aktk-block-componentsに無いもの）
- `react-feather` → Lucideアイコンまたは既存アイコンコンポーネント

---

## 注意事項・リスク

### テーマ依存の解消

- 旧実装は `ys_recent_posts` ショートコード（yStandardテーマ提供）に依存していた
- 新実装では `WP_Query` で独自にレンダリングするため、テーマ依存がなくなる
- ただし、投稿一覧のHTML構造・CSSクラスはyStandardテーマとの整合性を考慮する必要がある

### 廃止される旧実装の要素

| 旧実装の要素 | 状態 |
|-------------|------|
| `Dynamic_Block` 継承 | 廃止 |
| `ys_recent_posts` ショートコード委譲 | 廃止 |
| `migration_attributes()`（camelCase → snake_case変換） | 不要（ショートコード廃止のため） |
| `orderby: 'ranking'` / `filter: 'sga'`（SGA連携） | 廃止 |
| `Utility::parse_shortcode_attributes()` | 不要（ショートコード廃止のため） |

---

## 進捗管理

- [ ] ステップ1: 基盤整備
- [ ] ステップ2: エディターUI移行
- [ ] ステップ3: PHPレンダリング移行
- [ ] ステップ4: 旧ブロックとの互換対応
- [ ] 動作確認・テスト
- [ ] 旧ブロック（`blocks/posts/`）の無効化
