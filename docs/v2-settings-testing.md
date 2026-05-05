# プラグイン設定画面テスト

プラグイン設定画面（`src/plugin-settings/` 配下）のロジック検証用自動テストの方針と進捗。

## 目的

- 設定 UI の **操作 → 設定値保存** のロジック検証（JS）
- 設定値を消費する **PHP 側ロジックの出力** 検証（PHP）
- 今後の更新で**リグレッション**を早期検出する

## スコープ

| 対象 | 対象外 |
|---|---|
| 操作 → state 更新の対応関係 | コンポーネントのレンダリング・見た目 |
| 値変換ロジック（toBool 等） | アクセシビリティ全般・スタイル |
| 条件付き表示の分岐ロジック | アニメーション・遷移 |
| 設定値 → PHP 出力の対応関係 | ブラウザ間互換性 |

レンダリング・見た目・操作感は **手動 UI テスト**で担保する（`docs/v2-roadmap.md` フェーズ 3.2）。

## テスト方針

### JS テスト

- **基盤**: Jest + React Testing Library（`@wordpress/jest-preset-default`）
- **設定**: `test/unit/component.config.js`（`testMatch` に `src/plugin-settings/**/*.test.[jt]s?(x)` 含まれる）
- **配置**: コンポーネント隣に `test/` サブディレクトリを切る（既存 block-library と統一）
  ```
  src/plugin-settings/{section}/{機能}/
  ├── {機能}.tsx
  └── test/
      └── {機能}.test.tsx
  ```
- **書き方**:
  - `updateSection` / `setAttributes` を `jest.fn()` で渡す
  - `fireEvent.click(screen.getByRole('button', { name: '...' }))` でユーザ操作を再現
  - `expect(updateSection).toHaveBeenCalledWith({ ... })` で payload 検証
  - 条件付き表示は `queryByRole`（null 判定）/ `getAllByRole`（長さ）で分岐検証

### PHP テスト

- **基盤**: PHPUnit + WP_UnitTestCase（既存 `phpunit/test-archive.php` 等と同パターン）
- **配置**: `phpunit/settings/test-{機能}.php`
- **クラス名**: `Settings_{機能}_Test`（`--filter=Settings_` で設定系のみ実行可能）
- **書き方**:
  - `\ystandard_toolbox\Option::update_plugin_option(\ystandard_toolbox\{ClassName}::OPTION_NAME, [...])` で設定値仕込み
  - `new \ystandard_toolbox\{ClassName}()` でインスタンス生成
  - 対象メソッドを直接呼び出し → 戻り値（CSS/HTML/値）を `assertStringContainsString` / `assertSame` で検証
  - `tear_down()` で `delete_option(...)` してテスト間の状態漏れを防止
  - **各 `test_*` メソッドの直前に PHPDoc 形式の日本語コメント**を必ず付け、何をテストしているかを記述する（`Settings_*_Test` クラスはテストメソッド数が多くなりやすく、コメントが索引代わりになる）

## 実行コマンド

```bash
# JS テスト全体
npm run test:unit:component

# JS テスト 機能絞り込み
npm run test:unit:component -- --testPathPattern={pattern}

# PHP テスト全体
npm run test:unit:php

# PHP テスト 設定系のみ
npm run test:unit:php -- --filter=Settings_

# PHP テスト 機能絞り込み
npm run test:unit:php -- --filter=Settings_{機能}_Test
```

## 進捗チェックリスト

凡例: ✅ 完了 / 🔄 進行中 / ❌ 未着手 / △ 既存テストあり（要見直し / 拡張）/ — 対象外

### サイトデザイン拡張（`src/plugin-settings/design/` 配下）

| 機能 | UI コンポーネント | 消費側 PHP | JS | PHP |
|---|---|---|:-:|:-:|
| ヘッダー オーバーレイ | `header/overlay.tsx` | `inc/header/class-header-overlay.php` | ✅ | ✅ |
| サブヘッダー | `header/sub-header.tsx` | `inc/header/class-sub-header.php` | ✅ | ✅（既存 `Sub_Header_Test` + 新規 `Settings_Sub_Header_Test`） |
| リッチドロワーメニュー | `menu/rich-drawer-menu.tsx` | `inc/navigation/class-drawer-menu.php` | ✅ | ✅ |
| アーカイブ レイアウト | `archive/layout.tsx` | `inc/archive/class-archive.php` | ✅ | ✅（既存 `Archive_Test` + 新規 `Settings_Archive_Test`） |
| アーカイブ ソート | `archive/sort.tsx` | 同上 | ✅ | 同上 |
| アーカイブ 日付 | `archive/date.tsx` | 同上 | ✅ | 同上 |
| アーカイブ 画像 | `archive/image.tsx` | 同上 | ✅ | 同上 |
| Copyright | `copyright/index.tsx` | `inc/copyright/class-copyright.php` | ✅ | ✅ |

### その他の設定画面

| 設定画面 | 配置 | JS | PHP |
|---|---|:-:|:-:|
| フォント | `src/plugin-settings/font/` | ✅ | ✅ |
| 見出しデザイン | `src/plugin-settings/heading/` | △ | △ 既存 4 ファイル |
| カスタム CSS | `src/plugin-settings/custom-css/` | ✅ | ✅ |
| コード追加 | `src/plugin-settings/add-code/` | ✅ | ✅ |
| 投稿詳細ページ拡張（CTA 等） | `src/plugin-settings/cta/` | ✅ | ✅ |

> アイコンフォント（`inc/font/class-icon-font.php`）は管理 UI を持たないフロント機能のため、本ドキュメントのスコープ外。機能ロジックテストとして別途整備する。

### 既存 PHP テストとの関係

以下は v2 開発前から存在する PHP テスト。設定値消費側の検証として有効だが、命名規則・配置が `Settings_*_Test` / `phpunit/settings/` と異なる:

- `phpunit/test-archive.php` — `Archive_Test`
- `phpunit/test-sub-header.php` — `Sub_Header_Test`
- `phpunit/test-lp.php` — `LP_Test`
- `phpunit/test-heading-design-*.php` — 見出しデザイン関連 4 ファイル

これらを `phpunit/settings/` 配下に移して命名統一するかは別途判断（現状は機能している前提でそのまま）。新規追加分のみ `Settings_*_Test` 命名で進める。

## 命名・配置サマリ

```
JS: src/plugin-settings/{section}/{機能}/test/{機能}.test.tsx
PHP: phpunit/settings/test-{機能}.php  →  Settings_{機能}_Test
```

## 参考

- リッチドロワーメニュー（型として最初に確立した実装）:
  - JS: `src/plugin-settings/design/menu/test/rich-drawer-menu.test.tsx`
  - PHP: `phpunit/settings/test-drawer-menu.php`
