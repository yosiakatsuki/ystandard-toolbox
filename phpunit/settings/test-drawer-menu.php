<?php
/**
 * リッチドロワーメニュー（消費側）ロジックテスト
 *
 * 設定値（Navigation::OPTION_NAME 配下）→ Drawer_Menu::inline_css の出力を検証する。
 *
 * @package ystandard_toolbox
 */

class Settings_Drawer_Menu_Test extends WP_UnitTestCase {

	/**
	 * Navigation 設定を更新するヘルパー。
	 *
	 * @param array $value 設定値。
	 */
	private function update_option( $value ) {
		\ystandard_toolbox\Option::update_plugin_option(
			\ystandard_toolbox\Navigation::OPTION_NAME,
			$value
		);
	}

	public function tear_down() {
		// 後続テストへの設定漏れ防止。
		delete_option( \ystandard_toolbox\Navigation::OPTION_NAME );
		parent::tear_down();
	}

	/**
	 * mobileMenuEnable=true のみ設定された状態で inline_css() がベース CSS のみを出力し、
	 * グローバルメニュー非表示 / 検索非表示の追加ルールが含まれないことを確認。
	 */
	public function test_inline_css_default_enabled_only_outputs_base_css() {
		$this->update_option( [ 'mobileMenuEnable' => true ] );
		$instance = new \ystandard_toolbox\Drawer_Menu();
		$css      = $instance->inline_css( '' );

		// ベース CSS（.widget-mobile-nav 関連）が含まれる。
		$this->assertStringContainsString( '.widget-mobile-nav', $css );
		// 隠し設定 OFF 時は global-nav / search 用の display:none ルールが含まれない。
		$this->assertStringNotContainsString( '.global-nav__menu:not(', $css );
		$this->assertStringNotContainsString( '.global-nav__search', $css );
	}

	/**
	 * mobileMenuHideGlobalMenu=true 設定時に inline_css() に
	 * グローバルメニュー非表示の display:none ルールが追加されることを確認。
	 * 検索ルールは含まれないことも併せて検証。
	 */
	public function test_inline_css_hide_global_menu_outputs_display_none_rule() {
		$this->update_option(
			[
				'mobileMenuEnable'         => true,
				'mobileMenuHideGlobalMenu' => true,
			]
		);
		$instance = new \ystandard_toolbox\Drawer_Menu();
		$css      = $instance->inline_css( '' );

		// グローバルメニュー非表示ルールが含まれる。
		$this->assertStringContainsString(
			'.global-nav__menu:not(#global-nav__menu-amp)',
			$css
		);
		// 検索ルールは含まれない。
		$this->assertStringNotContainsString( '.global-nav__search', $css );
	}

	/**
	 * mobileMenuHideSearch=true 設定時に inline_css() に
	 * 検索フォーム非表示の display:none ルールが追加されることを確認。
	 * グローバルメニュールールは含まれないことも併せて検証。
	 */
	public function test_inline_css_hide_search_outputs_display_none_rule() {
		$this->update_option(
			[
				'mobileMenuEnable'     => true,
				'mobileMenuHideSearch' => true,
			]
		);
		$instance = new \ystandard_toolbox\Drawer_Menu();
		$css      = $instance->inline_css( '' );

		// 検索非表示ルールが含まれる。
		$this->assertStringContainsString( '.global-nav__search', $css );
		// グローバルメニュールールは含まれない。
		$this->assertStringNotContainsString(
			'.global-nav__menu:not(',
			$css
		);
	}

	/**
	 * mobileMenuHideGlobalMenu / mobileMenuHideSearch を両方 true にした際、
	 * inline_css() に両方の display:none ルールが含まれることを確認。
	 */
	public function test_inline_css_hide_both_outputs_both_rules() {
		$this->update_option(
			[
				'mobileMenuEnable'         => true,
				'mobileMenuHideGlobalMenu' => true,
				'mobileMenuHideSearch'     => true,
			]
		);
		$instance = new \ystandard_toolbox\Drawer_Menu();
		$css      = $instance->inline_css( '' );

		$this->assertStringContainsString(
			'.global-nav__menu:not(#global-nav__menu-amp)',
			$css
		);
		$this->assertStringContainsString( '.global-nav__search', $css );
	}

	/**
	 * inline_css() が引数で渡された既存 CSS を結果の先頭に保持し、
	 * その後にベースルールを連結する形で出力することを確認。
	 */
	public function test_inline_css_preserves_input_css_at_head() {
		$this->update_option( [ 'mobileMenuEnable' => true ] );
		$instance = new \ystandard_toolbox\Drawer_Menu();
		$css      = $instance->inline_css( '/* base */' );

		// 入力 CSS が結果の先頭に保持されたうえで、ベースルールが連結される。
		$this->assertStringStartsWith( '/* base */', $css );
		$this->assertStringContainsString( '.widget-mobile-nav', $css );
	}
}
