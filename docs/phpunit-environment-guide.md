# yStandard シリーズ PHPUnit テスト環境ガイド

yStandard シリーズ（yStandard テーマ、yStandard Blocks、yStandard Toolbox）共通の PHPUnit テスト環境構築ガイド。

## 方針

- WordPress本体・Gutenbergのテスト環境に合わせる
- 開発サーバーは Local（Local by Flywheel）を使用し、wp-env はテスト実行専用
- wp-env のテスト環境コンテナは無効化し、開発環境の `cli` コンテナで PHPUnit を実行する（Docker リソース節約）

## 前提条件

- Docker Desktop がインストール済み
- Node.js がインストール済み
- `@wordpress/env` がプロジェクトの devDependencies に含まれている

## 各ファイルの設定

### composer.json

`require-dev` に以下を設定する。WordPress 本体・Gutenberg と同じバージョンレンジに揃える。

```json
{
  "require-dev": {
    "dealerdirect/phpcodesniffer-composer-installer": "^1.0",
    "squizlabs/php_codesniffer": "^3.5",
    "phpcompatibility/phpcompatibility-wp": "^2.1.3",
    "wp-coding-standards/wpcs": "^3.0",
    "sirbrillig/phpcs-variable-analysis": "^2.8",
    "wp-phpunit/wp-phpunit": "^6.0",
    "phpunit/phpunit": "^9.6",
    "spatie/phpunit-watcher": "^1.23",
    "yoast/phpunit-polyfills": "^1.1.0"
  }
}
```

各パッケージの役割:

| パッケージ | バージョン | 役割 |
|---|---|---|
| `phpunit/phpunit` | `^9.6` | PHP 7.4〜8.3 対応。WP 本体と同系統 |
| `yoast/phpunit-polyfills` | `^1.1.0` | PHPUnit バージョン間の互換性。WP 本体と同じ |
| `wp-phpunit/wp-phpunit` | `^6.0` | WordPress コアのテストライブラリ |
| `wp-coding-standards/wpcs` | `^3.0` | WordPress コーディング規約。WP 本体と同じ |
| `phpcompatibility/phpcompatibility-wp` | `^2.1.3` | WordPress 向け PHP 互換性チェック |
| `dealerdirect/phpcodesniffer-composer-installer` | `^1.0` | PHPCS スタンダードの自動インストーラ |
| `sirbrillig/phpcs-variable-analysis` | `^2.8` | 未使用変数の検出 |
| `spatie/phpunit-watcher` | `^1.23` | テストファイル監視・自動再実行 |

#### 選定理由

- **PHPUnit 9.6**（10 ではない）: PHP 7.4 をサポートするため。PHPUnit 10 は PHP 8.1+ が必要
- **phpunit-polyfills ^1.1.0**（2.0 ではない）: WordPress 本体・Gutenberg と同じバージョンレンジ
- **phpcompatibility-wp**（php-compatibility ではない）: WordPress 向けの追加ルールを含む。WP 本体と同じ

### .wp-env.json

```json
{
  "port": 10020,
  "testsEnvironment": false,
  "core": "https://ja.wordpress.org/latest-ja.zip",
  "themes": [
    "https://wp-ystandard.com/download/ystandard/v4/ystandard.zip"
  ],
  "plugins": [
    ".",
    "https://wp-ystandard.com/download/ystandard/plugin/ystandard-blocks/ystandard-blocks.zip",
    "https://downloads.wordpress.org/plugin/wp-multibyte-patch.zip"
  ],
  "mappings": {
    ".wp-content": "./.wp-content"
  }
}
```

ポイント:

- **`"testsEnvironment": false`**: テスト専用コンテナ（`tests-mysql`, `tests-wordpress`, `tests-cli`）を作成しない。開発環境の `cli` コンテナで PHPUnit を実行する
- **ポート**: プロジェクトごとに重複しないよう変更する
- **themes / plugins**: テスト対象に応じて調整する。テーマプロジェクトの場合は `themes` に `"."` を指定

この設定で起動すると以下の 3 コンテナ（+ phpMyAdmin）のみ作成される:

| コンテナ | 役割 |
|---|---|
| `mysql` | データベース |
| `wordpress` | WordPress 本体 |
| `cli` | WP-CLI / PHPUnit 実行 |

### phpunit.xml.dist

```xml
<?xml version="1.0"?>
<phpunit
	bootstrap="phpunit/bootstrap.php"
	backupGlobals="false"
	colors="true"
	convertErrorsToExceptions="true"
	convertNoticesToExceptions="true"
	convertWarningsToExceptions="true"
	>
	<testsuites>
		<testsuite name="プロジェクト名">
			<directory prefix="test-" suffix=".php">./phpunit/</directory>
			<exclude>./phpunit/test-sample.php</exclude>
		</testsuite>
	</testsuites>
</phpunit>
```

ポイント:

- **`<testsuite name="...">`**: `name` 属性は必須（PHPUnit 10 で必須化。9 でも指定すべき）
- **`convertErrorsToExceptions` 等**: WordPress 本体がまだ維持しているため残す
- **`prefix="test-"`**: テストファイルは `test-` で始まる命名規則

### phpunit/bootstrap.php

```php
<?php
/**
 * PHPUnit bootstrap file
 *
 * @package プロジェクト名
 */

// Composer の自動ロード.
require_once dirname( __DIR__ ) . '/vendor/autoload.php';

// WP テストディレクトリの検出.
$_tests_dir = getenv( 'WP_TESTS_DIR' );

if ( ! $_tests_dir ) {
	$_tests_dir = getenv( 'WP_PHPUNIT__DIR' );
}

if ( ! $_tests_dir ) {
	$_try_tests_dir = __DIR__ . '/../../../../tests/phpunit';
	if ( file_exists( $_try_tests_dir . '/includes/functions.php' ) ) {
		$_tests_dir = $_try_tests_dir;
	}
}

if ( ! $_tests_dir ) {
	$_tests_dir = '/tmp/wordpress-tests-lib';
}

require_once $_tests_dir . '/includes/functions.php';

// Gutenberg の外部スクリプト読み込みを無効化.
define( 'GUTENBERG_LOAD_VENDOR_SCRIPTS', false );

/**
 * テスト対象のプラグイン/テーマを読み込む.
 */
function _manually_load_plugin() {
	// プラグインの場合:
	require dirname( __DIR__ ) . '/プラグインのメインファイル.php';

	// テーマの場合（テーマの functions.php は自動的に読み込まれるため、
	// 追加のセットアップが必要な場合のみ記述）:
	// switch_theme( 'テーマディレクトリ名' );
}

tests_add_filter( 'muplugins_loaded', '_manually_load_plugin' );

/**
 * セットアップ中の wp_die をキャッチ.
 *
 * @param string|WP_Error $message エラーメッセージ.
 *
 * @throws Exception wp_die が呼ばれた場合.
 */
function fail_if_died( $message ) {
	if ( is_wp_error( $message ) ) {
		$message = $message->get_error_message();
	}

	throw new Exception( 'WordPress died: ' . $message );
}

tests_add_filter( 'wp_die_handler', 'fail_if_died' );

// WP テスト環境を起動.
require $_tests_dir . '/includes/bootstrap.php';

// テスト実行中は通常の wp_die ハンドラに戻す.
remove_filter( 'wp_die_handler', 'fail_if_died' );
```

#### カスタマイズのポイント

- `_manually_load_plugin()` 内でテスト対象のプラグイン/テーマを読み込む
- 依存プラグインがある場合は同じ関数内で先に読み込む

### package.json テストスクリプト

```json
{
  "scripts": {
    "test:unit:php": "wp-env start && wp-env run cli --env-cwd=wp-content/plugins/プラグインディレクトリ名 -- vendor/bin/phpunit -c phpunit.xml.dist"
  }
}
```

ポイント:

- **`wp-env run cli`**（`tests-cli` ではない）: `testsEnvironment: false` のため開発環境の `cli` コンテナを使用
- **`vendor/bin/phpunit`**（グローバルの `phpunit` ではない）: コンテナにグローバルインストールされた PHPUnit とバージョンが異なる可能性があるため、プロジェクトの vendor を明示指定
- **`--env-cwd`**: コンテナ内の作業ディレクトリを指定。テーマの場合は `wp-content/themes/テーマディレクトリ名`

### .gitignore に追加するエントリ

```
tsconfig.tsbuildinfo
.phpunit.result.cache
```

- `tsconfig.tsbuildinfo`: TypeScript インクリメンタルビルドキャッシュ
- `.phpunit.result.cache`: PHPUnit テスト結果キャッシュ（失敗テスト優先実行用）

## テストファイルの配置

```
phpunit/
├── bootstrap.php          # PHPUnit ブートストラップ
├── test-機能名.php         # テストファイル（test- プレフィックス）
└── data/                  # テストデータ（必要に応じて）
```

## 実行方法

### テスト実行

```bash
# npm スクリプト経由
npm run test:unit:php

# 直接実行（wp-env 起動済みの場合）
npx wp-env run cli --env-cwd=wp-content/plugins/プラグイン名 -- vendor/bin/phpunit -c phpunit.xml.dist
```

### 環境管理

```bash
# 起動
npx wp-env start

# 停止
npx wp-env stop

# 環境破棄（Docker リソース完全解放）
npx wp-env destroy

# Docker ビルドキャッシュ削除
docker builder prune -f
```

### 初回セットアップ / composer.json 変更後

wp-env コンテナ内で composer install を実行する:

```bash
npx wp-env start
npx wp-env run cli --env-cwd=wp-content/plugins/プラグイン名 -- composer install --no-interaction
```

## 既存プロジェクトからの移行チェックリスト

古い設定から移行する場合の確認項目:

- [ ] `composer.json`: `phpunit/phpunit` を `^9.6` に更新
- [ ] `composer.json`: `yoast/phpunit-polyfills` を `^1.1.0` に更新
- [ ] `composer.json`: `wp-phpunit/wp-phpunit` を `^6.0` に更新
- [ ] `composer.json`: `wp-coding-standards/wpcs` を `^3.0` に更新
- [ ] `composer.json`: `dealerdirect/phpcodesniffer-composer-installer` を `^1.0` に更新
- [ ] `composer.json`: `phpcompatibility/php-compatibility` を `phpcompatibility/phpcompatibility-wp` `^2.1.3` に変更
- [ ] `.wp-env.json`: `"testsEnvironment": false` を追加
- [ ] `.wp-env.json`: `env.tests` セクションがあれば削除
- [ ] `phpunit.xml.dist`: `<testsuite>` に `name` 属性を追加
- [ ] `package.json`: テストスクリプトの `tests-cli` を `cli` に変更
- [ ] `package.json`: テストスクリプトの `phpunit` を `vendor/bin/phpunit` に変更
- [ ] `package.json`: `@wordpress/env` を `^11.2.0` 以上に更新
- [ ] `.gitignore`: `tsconfig.tsbuildinfo` と `.phpunit.result.cache` を追加
- [ ] コンテナ内で `composer update` を実行して `composer.lock` を更新
- [ ] 既存の wp-env 環境を `npx wp-env destroy` で破棄してから再起動
