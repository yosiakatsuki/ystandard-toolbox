<?php
/**
 * Copyright（消費側）ロジックテスト
 *
 * 設定値（Copyright::OPTION_NAME 配下）→ Copyright クラスの各フィルタメソッド出力を検証する。
 * - _copyright(): {year}/{site}/{url} の置換
 * - _poweredby(): disable_theme_info=true で空文字を返す
 * - sanitize_copyright(): wp_kses で許可タグ以外を除去
 * - get_default(): 固定文字列の確認
 *
 * @package ystandard_toolbox
 */

class Settings_Copyright_Test extends WP_UnitTestCase {

	/**
	 * Copyright 設定を更新するヘルパー。
	 *
	 * @param array $value 設定値。
	 */
	private function update_option( $value ) {
		\ystandard_toolbox\Option::update_plugin_option(
			\ystandard_toolbox\Copyright::OPTION_NAME,
			$value
		);
	}

	public function tear_down() {
		delete_option( \ystandard_toolbox\Copyright::OPTION_NAME );
		delete_option( 'ys_copyright' );
		parent::tear_down();
	}

	/**
	 * get_default() がフォールバック用デフォルトテンプレートを返すことを確認。
	 * 他テストの期待値の基準にもなる。
	 */
	public function test_get_default_returns_fallback_template() {
		$this->assertSame(
			'&copy; {year} <a href="{url}" rel="home">{site}</a>',
			\ystandard_toolbox\Copyright::get_default()
		);
	}

	/**
	 * 設定が空のとき、_copyright() がデフォルトテンプレートに対して
	 * {year}/{site}/{url} 置換を行って返すことを確認。
	 */
	public function test_copyright_replaces_placeholders_with_default_template() {
		$this->update_option( [] );
		$instance = new \ystandard_toolbox\Copyright();
		$result   = $instance->_copyright( '無視される元の文字列' );

		// プレースホルダが残っていない（置換済み）。
		$this->assertStringNotContainsString( '{year}', $result );
		$this->assertStringNotContainsString( '{site}', $result );
		$this->assertStringNotContainsString( '{url}', $result );
		// 現在の年が含まれる。
		$this->assertStringContainsString( date_i18n( 'Y' ), $result );
		// サイト名が含まれる。
		$this->assertStringContainsString(
			get_bloginfo( 'name', 'display' ),
			$result
		);
	}

	/**
	 * カスタム copyright 文字列を設定すると、_copyright() がその文字列に対して置換を行うことを確認。
	 */
	public function test_copyright_uses_custom_template_with_replacement() {
		$this->update_option(
			[ 'copyright' => 'Custom {year} - {site} ({url})' ]
		);
		$instance = new \ystandard_toolbox\Copyright();
		$result   = $instance->_copyright( '' );

		$this->assertStringStartsWith( 'Custom ', $result );
		$this->assertStringContainsString( date_i18n( 'Y' ), $result );
		$this->assertStringContainsString(
			get_bloginfo( 'name', 'display' ),
			$result
		);
		$this->assertStringContainsString( home_url( '/' ), $result );
	}

	/**
	 * disable_theme_info 未設定時、_poweredby() が引数の HTML をそのまま返すことを確認。
	 */
	public function test_poweredby_returns_original_html_when_not_disabled() {
		$this->update_option( [] );
		$instance = new \ystandard_toolbox\Copyright();
		$this->assertSame(
			'<p>Powered by ...</p>',
			$instance->_poweredby( '<p>Powered by ...</p>' )
		);
	}

	/**
	 * disable_theme_info=true 設定時、_poweredby() が空文字を返すことを確認。
	 */
	public function test_poweredby_returns_empty_string_when_disabled() {
		$this->update_option( [ 'disable_theme_info' => true ] );
		$instance = new \ystandard_toolbox\Copyright();
		$this->assertSame( '', $instance->_poweredby( '<p>Powered by ...</p>' ) );
	}

	/**
	 * sanitize_copyright() が許可タグ（a / span / strong / br）を残し、
	 * 不許可タグ（script / img 等）を除去することを確認。
	 */
	public function test_sanitize_copyright_strips_disallowed_tags() {
		$instance = new \ystandard_toolbox\Copyright();
		$settings = [
			'copyright' => [
				'copyright' => '<a href="#">link</a><span>span</span><strong>bold</strong><br><script>alert(1)</script><img src="x">',
			],
		];
		$result = $instance->sanitize_copyright( $settings );

		// 許可タグが残る。
		$this->assertStringContainsString( '<a href="#">link</a>', $result['copyright']['copyright'] );
		$this->assertStringContainsString( '<span>span</span>', $result['copyright']['copyright'] );
		$this->assertStringContainsString( '<strong>bold</strong>', $result['copyright']['copyright'] );
		$this->assertStringContainsString( '<br>', $result['copyright']['copyright'] );
		// 不許可タグが除去される。
		$this->assertStringNotContainsString( '<script>', $result['copyright']['copyright'] );
		$this->assertStringNotContainsString( '<img', $result['copyright']['copyright'] );
	}

	/**
	 * sanitize_copyright() が settings に 'copyright' キーが無い場合、
	 * 引数の settings をそのまま返す（早期 return）ことを確認。
	 */
	public function test_sanitize_copyright_returns_settings_when_key_missing() {
		$instance = new \ystandard_toolbox\Copyright();
		$result   = $instance->sanitize_copyright( [ 'other' => 'data' ] );
		$this->assertSame( [ 'other' => 'data' ], $result );
	}

	/**
	 * add_admin_config() が config 配列に copyrightDefault キーを追加し、
	 * 値が get_default() と一致することを確認。
	 */
	public function test_add_admin_config_adds_copyright_default() {
		$instance = new \ystandard_toolbox\Copyright();
		$config   = $instance->add_admin_config( [ 'existing' => 'value' ] );

		$this->assertArrayHasKey( 'copyrightDefault', $config );
		$this->assertSame(
			\ystandard_toolbox\Copyright::get_default(),
			$config['copyrightDefault']
		);
		// 既存キーは保持される。
		$this->assertSame( 'value', $config['existing'] );
	}
}
