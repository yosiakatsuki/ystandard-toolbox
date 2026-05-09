# yStandard Toolbox Debug: 見出し設定 — 設計書

## 目的

yStandard Toolbox の見出しデザイン編集機能（v1 / v2）について、開発・テスト時に必要となる以下の操作を提供するデバッグツール。

- 現在の保存値（v1 / v2 メイン / v2 レベル別）の確認
- 各設定の削除（v1 単体 / v2 単体 / 全削除など）
- 設定値の JSON エクスポート（バックアップ・テスト fixture 用）
- JSON インポート（保存テスト・互換モード再現）

通常運用では使わない開発者向け機能。

## 位置づけ

- **独立した WordPress プラグイン**として配置する。Toolbox 本体（`inc/`, `src/`, `blocks/`）には一切手を入れない
- リポジトリには含めるが、`npm run zip` / `npm run alpha` の rsync `--exclude='/debug-tool'` で配布物には含めない
- ローカル開発環境で**手動有効化**して使う
- **Toolbox v1 / v2 のどちらの環境でも動作する**。Toolbox 側の React SPA や定数に依存せず、WordPress 標準の「ツール」メニュー配下に配置することで、v1 環境（v2 サブメニュー登録機構が存在しない環境）でも問題なく使える
  - 主用途: v1 環境で v1 設定を作る → エクスポート → v2 環境にインポート → マイグレーション動作確認 のループ

## 対象 option / transient

| 種別 | キー | Toolbox 側の定数 |
|---|---|---|
| 旧設定（v1） | `ystdtb_heading` | `Heading::is_compatible_mode()` 内で参照 |
| 新設定（v2）メイン | `ystdtb_heading_v2` | `Heading::OPTION_MAIN` |
| 新設定（v2）レベル別 | `ystdtb_heading_level` | `Heading::OPTION_LEVEL` |
| CSS キャッシュ（transient） | `ystdtb_heading_v2_css` | `Heading::CSS_CACHE_KEY` |

互換モード判定: v2 メインが空 かつ v1 が存在 のとき互換モード（v1 の構造を使った CSS 出力）になる（`Heading::is_compatible_mode()`）。

## メニュー登録

- 親メニュー slug: `tools.php`（WordPress 標準の「ツール」メニュー）
- フック: `admin_menu`
- 関数: `add_submenu_page`
  - 親 slug: `tools.php`
  - メニュータイトル: `[ys]見出し編集機能デバッグ`
  - 権限: `manage_options`
  - サブメニュー slug: `ystdtb-debug-heading-option`
  - `$position`: `999`（一番下に表示）
- **Toolbox の React SPA 用フィルター（`ystdtb_plugin_settings_submenus`）は使わない**。Toolbox v1 環境でも動作させるため、Toolbox 側の仕組みに依存せず WordPress 標準のメニュー API のみで完結させる
- ページ URL: `/wp-admin/tools.php?page=ystdtb-debug-heading-option`

## ページ構成（UI）

1 ページ内を 4 セクションに分けて表示。タブは使わずに `<h2>` 区切り。

### 設定値の確認

- 互換モードフラグ（true / false）
- `ystdtb_heading`（v1）の値を JSON 整形で `<pre>` 表示
- `ystdtb_heading_v2`（v2 メイン）の値を JSON 整形で `<pre>` 表示
- `ystdtb_heading_level`（v2 レベル）の値を JSON 整形で `<pre>` 表示
- 値が空 / 未設定の場合は `(未設定)` とテキスト表示

### 削除

POST フォームで以下のボタンを 4 個並べる:

| ボタンラベル | `target` value | 削除対象 |
|---|---|---|
| v1 設定を削除 | `v1` | `ystdtb_heading` |
| v2 メイン設定を削除 | `v2_main` | `ystdtb_heading_v2` |
| v2 レベル設定を削除 | `v2_level` | `ystdtb_heading_level` |
| すべて削除 | `all` | 上記 3 つすべて |

各ボタンクリック時:
- `onclick="return confirm( '...' )"` で確認
- 削除後に CSS キャッシュ transient も必ず削除

### エクスポート

- ボタン 1 個（フォーム submit）
- クリックで JSON ファイルをダウンロード（後述の構造）

### インポート

- `<input type="file" accept="application/json,.json">` 1 個
- アップロードボタン
- 完了後、ページにリダイレクトして notice 表示
- 成功・失敗時のメッセージは admin_notices で表示

### ペーストで上書き保存（option ごと）

「設定値の確認」セクション内で、各 option の表示直下に個別のペーストフォームを配置する（option 単位の上書き保存）。

- 対象 option: 3 種（`ystdtb_heading` / `ystdtb_heading_v2` / `ystdtb_heading_level`）。それぞれにフォーム 1 つ。
- フォーム要素:
  - `<textarea rows="8">`（JSON テキスト直接入力）
  - 上書き保存ボタン
- 受け付ける JSON は **コピーボタンで取得した値そのもの**（option の中身）。エクスポート JSON（`{"options": ...}` でラップした形式）とは別フォーマット。
- 確認ダイアログは出さない（コピー → ペーストの素早い往復を阻害しないため）。
- 成功・失敗は admin_notices で通知。

## エクスポート JSON フォーマット

```json
{
  "exported_at": "2026-05-06T10:00:00+09:00",
  "site_url": "http://localhost:10020",
  "options": {
    "ystdtb_heading":       null,
    "ystdtb_heading_v2":    { ... },
    "ystdtb_heading_level": { ... }
  }
}
```

- `exported_at`: ISO 8601 形式
- `site_url`: 取得元の URL（`home_url()`）
- `options.<key>`: option が未設定なら `null`、配列ならその値をそのまま埋め込む

ファイル名: `ystdtb-heading-options-<YmdHis>.json`

## インポート仕様

- アップロードファイルが `.json` 拡張子であることを確認
- `json_decode( ..., true )` で配列化
- トップレベルに `options` キーがあるか検証
- `options` 内に存在するキーのみ書き戻す（`v1` だけ、`v2` だけのインポートも可能）
- 書き戻し対象は以下 3 キーのみ。それ以外は無視:
  - `ystdtb_heading`
  - `ystdtb_heading_v2`
  - `ystdtb_heading_level`
- 値が `null` の場合は `delete_option()` で削除（クリア用）
- 値が配列の場合は `update_option()` で書き戻し
- 書き戻し後は CSS キャッシュ transient を削除

エラー時:
- ファイルが取得できない → `import_error_no_file`
- JSON 解析失敗 → `import_error_invalid_json`
- `options` キー欠如 → `import_error_invalid_format`

## ペースト仕様（option 単位上書き）

- POST `target` (`v1` / `v2_main` / `v2_level`) と `value`（JSON テキスト）を受け取る
- `value` を `trim` し、空文字なら `paste_error_empty` で notice
- `json_decode( ..., true )` で解析。`json_last_error()` が `JSON_ERROR_NONE` 以外なら `paste_error_invalid_json` で notice
- 解析結果が **配列以外**（数値・文字列・null・bool）なら `paste_error_not_array` で notice（誤削除防止のため、配列以外は受け付けない）
- 解析結果が配列なら、`target` から導出した option キーへ `update_option()` で書き戻し
- 書き戻し後は CSS キャッシュ transient を削除
- 成功時 notice キー: `pasted_v1` / `pasted_v2_main` / `pasted_v2_level`

target → option キーの対応:

| target | option キー |
|---|---|
| `v1` | `ystdtb_heading` |
| `v2_main` | `ystdtb_heading_v2` |
| `v2_level` | `ystdtb_heading_level` |

## 削除仕様

- 削除前の確認は JS `confirm()` のみ
- 削除後は CSS キャッシュ transient を削除
- リダイレクトで notice クエリを付与

## CSS キャッシュ削除

すべての変更系操作（削除・インポート）後に以下を実行:

```php
delete_transient( 'ystdtb_heading_v2_css' );
```

## セキュリティ

- 全フォームに nonce を付与（`wp_nonce_field( 'ystdtb_debug_heading_option_action', 'ystdtb_debug_nonce' )`）
- 全 admin_post ハンドラで以下を必ず実施:
  - `current_user_can( 'manage_options' )` 権限チェック
  - `check_admin_referer( 'ystdtb_debug_heading_option_action', 'ystdtb_debug_nonce' )` で nonce 検証
- インポートファイルの拡張子チェック（`.json` のみ受け付け）
- option への書き戻しは値構造の最低限のチェック（配列または `null`）

## 画面遷移

```
[管理画面ページ表示]
  ├── 削除ボタン押下 → admin-post.php → ystdtb_debug_heading_option_handle_delete
  │     → delete_option / delete_transient → wp_safe_redirect( ?notice=deleted_xxx )
  │
  ├── エクスポートボタン押下 → admin-post.php → ystdtb_debug_heading_option_handle_export
  │     → ヘッダ + JSON 出力 → exit
  │
  ├── インポートボタン押下 → admin-post.php → ystdtb_debug_heading_option_handle_import
  │     → ファイル解析 → update_option / delete_option → delete_transient
  │     → wp_safe_redirect( ?notice=imported|import_error_xxx )
  │
  └── ペーストで上書き保存ボタン押下 → admin-post.php → ystdtb_debug_heading_option_handle_paste
        → JSON 解析 → 該当 option へ update_option → delete_transient
        → wp_safe_redirect( ?notice=pasted_xxx|paste_error_xxx )
```

## ファイル構成

| ファイル | 役割 |
|---|---|
| `ystandard-toolbox-debug-heading-option.php` | プラグインヘッダ、メニュー登録、ページ描画関数、admin_notices 表示、handler.php 読み込み |
| `handler.php` | 削除 / エクスポート / インポートの admin_post ハンドラ |
| `DESIGN.md` | 設計書（このファイル） |
| `readme.md` | 使い方ガイド |

## 関数命名

すべて `ystdtb_debug_heading_option_` プレフィックス。

| 関数 | 役割 |
|---|---|
| `ystdtb_debug_heading_option_register_menu()` | サブメニュー登録（`admin_menu` フック） |
| `ystdtb_debug_heading_option_render_page()` | ページ描画 |
| `ystdtb_debug_heading_option_render_notice()` | クエリパラメータ `notice` を読んで admin_notice 表示 |
| `ystdtb_debug_heading_option_handle_delete()` | `admin_post_ystdtb_debug_heading_option_delete` |
| `ystdtb_debug_heading_option_handle_export()` | `admin_post_ystdtb_debug_heading_option_export` |
| `ystdtb_debug_heading_option_handle_import()` | `admin_post_ystdtb_debug_heading_option_import` |
| `ystdtb_debug_heading_option_handle_paste()` | `admin_post_ystdtb_debug_heading_option_paste` |
| `ystdtb_debug_heading_option_render_paste_form()` | option 単位ペーストフォームの描画 |
| `ystdtb_debug_heading_option_clear_cache()` | CSS キャッシュ transient 削除（共通処理） |
| `ystdtb_debug_heading_option_redirect_with_notice( $notice )` | リダイレクト共通処理 |

## 将来拡張

`debug-tool/` 配下に同じ命名規則で別プラグインを追加する想定:

```
debug-tool/
├── ystandard-toolbox-debug-heading-option/      # このプラグイン
├── ystandard-toolbox-debug-description-list/    # 将来追加例
└── ystandard-toolbox-debug-custom-css/          # 将来追加例
```

各プラグインは独立して有効化・無効化できる。

## 影響範囲

- Toolbox 本体への影響: なし（コードは独立。option 読み書きでのみ干渉）
- ビルド/CI への影響: `package.json` の rsync `--exclude` に `/debug-tool` を 1 個追加するのみ
- テストへの影響: なし（`phpunit/` 配下とは無関係）
