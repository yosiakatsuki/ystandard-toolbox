<?php
/**
 * ヘッダーオーバーレイ（消費側）ロジックテスト
 *
 * 設定値（Header_Design::OPTION_NAME 配下）→ Header_Overlay の各メソッド出力を検証する。
 * is_header_overlay() は WP の状態（is_singular / is_front_page 等）に強く依存するため、
 * フィルタ `ystdtb_is_header_overlay` で強制的に true / false にした状態で消費側の出力を確認する。
 *
 * @package ystandard_toolbox
 */

class Settings_Header_Overlay_Test extends WP_UnitTestCase {

	/**
	 * Header_Design 設定を更新するヘルパー。
	 *
	 * @param array $value 設定値。
	 */
	private function update_option( $value ) {
		\ystandard_toolbox\Option::update_plugin_option(
			\ystandard_toolbox\Header_Design::OPTION_NAME,
			$value
		);
	}

	public function tear_down() {
		delete_option( \ystandard_toolbox\Header_Design::OPTION_NAME );
		remove_all_filters( 'ystdtb_is_header_overlay' );
		parent::tear_down();
	}

	/**
	 * enableOverlay=false の状態では is_header_overlay() が false を返し、
	 * 早期 return が機能していることを確認。
	 */
	public function test_is_header_overlay_returns_false_when_disabled() {
		$this->update_option( [ 'enableOverlay' => false ] );
		$this->assertFalse( \ystandard_toolbox\Header_Overlay::is_header_overlay() );
	}

	/**
	 * enableOverlay=true かつ ystdtb_is_header_overlay フィルタで true 強制時、
	 * is_header_overlay() が true を返すことを確認。
	 * フィルタは複雑な WP 状態（is_singular / is_front_page）を回避してオーバーレイを ON にする抜け道。
	 */
	public function test_is_header_overlay_returns_true_when_filter_forces_true() {
		$this->update_option( [ 'enableOverlay' => true ] );
		add_filter( 'ystdtb_is_header_overlay', '__return_true' );
		$this->assertTrue( \ystandard_toolbox\Header_Overlay::is_header_overlay() );
	}

	/**
	 * enableOverlay=false の場合、ystdtb_is_header_overlay フィルタが true を返しても
	 * 設定側の早期 return が優先され is_header_overlay() が false を返すことを確認。
	 * 設定 OFF を「最も強い無効化」として扱う仕様の担保。
	 */
	public function test_is_header_overlay_filter_ignored_when_setting_disabled() {
		$this->update_option( [ 'enableOverlay' => false ] );
		add_filter( 'ystdtb_is_header_overlay', '__return_true' );
		// 設定が OFF なら、フィルタが true でも結果は false（早期 return が優先）。
		$this->assertFalse( \ystandard_toolbox\Header_Overlay::is_header_overlay() );
	}

	/**
	 * enableOverlay=false のとき inline_css() が入力 CSS をそのまま返し、
	 * グローバルナビ透過ルールを追加しないことを確認。
	 */
	public function test_inline_css_is_no_op_when_disabled() {
		$this->update_option( [ 'enableOverlay' => false ] );
		$instance = new \ystandard_toolbox\Header_Overlay();
		$css      = $instance->inline_css( '/* base */' );

		// 入力 CSS そのまま、追加なし。
		$this->assertSame( '/* base */', $css );
	}

	/**
	 * オーバーレイ有効時、inline_css() が .global-nav の background-color: transparent ルールを追加することを確認。
	 * メディアクエリ（min-width: ドロワー閉幅+1）の中で適用される想定。
	 */
	public function test_inline_css_appends_transparent_rule_when_enabled() {
		$this->update_option( [ 'enableOverlay' => true ] );
		add_filter( 'ystdtb_is_header_overlay', '__return_true' );
		$instance = new \ystandard_toolbox\Header_Overlay();
		$css      = $instance->inline_css( '' );

		// グローバルナビ透過ルールが含まれる。
		$this->assertStringContainsString( '.global-nav', $css );
		$this->assertStringContainsString( 'background-color: transparent', $css );
	}

	/**
	 * enableOverlay=false のとき add_overlay_class() が body class 配列を変更せず、
	 * 既存クラスのみを返すことを確認。
	 */
	public function test_add_overlay_class_no_op_when_disabled() {
		$this->update_option( [ 'enableOverlay' => false ] );
		$instance = new \ystandard_toolbox\Header_Overlay();
		$classes  = $instance->add_overlay_class( [ 'existing-class' ] );

		// クラス追加なし、既存クラスのみ。
		$this->assertSame( [ 'existing-class' ], $classes );
	}

	/**
	 * オーバーレイ有効時、add_overlay_class() が body class 配列に
	 * is-overlay / is-transparent を追加し、既存クラスは保持することを確認。
	 */
	public function test_add_overlay_class_appends_overlay_classes_when_enabled() {
		$this->update_option( [ 'enableOverlay' => true ] );
		add_filter( 'ystdtb_is_header_overlay', '__return_true' );
		$instance = new \ystandard_toolbox\Header_Overlay();
		$classes  = $instance->add_overlay_class( [ 'existing-class' ] );

		$this->assertContains( 'is-overlay', $classes );
		$this->assertContains( 'is-transparent', $classes );
		$this->assertContains( 'existing-class', $classes );
	}

	/**
	 * enableOverlay=false のとき overlay_css_vars() が CSS カスタムプロパティ配列に
	 * overlay-text-color を追加せず、入力 vars をそのまま返すことを確認。
	 */
	public function test_overlay_css_vars_no_op_when_disabled() {
		$this->update_option( [ 'enableOverlay' => false ] );
		$instance = new \ystandard_toolbox\Header_Overlay();
		$vars     = $instance->overlay_css_vars( [ 'existing-var' => 'value' ] );

		// 既存 vars そのまま。
		$this->assertSame( [ 'existing-var' => 'value' ], $vars );
	}

	/**
	 * オーバーレイ有効 + overlayTextColor 未設定のとき、overlay_css_vars() の
	 * overlay-text-color が var(--header-text)（ヘッダー既定色フォールバック）になることを確認。
	 */
	public function test_overlay_css_vars_default_color_when_text_color_unset() {
		$this->update_option( [ 'enableOverlay' => true ] );
		add_filter( 'ystdtb_is_header_overlay', '__return_true' );
		$instance = new \ystandard_toolbox\Header_Overlay();
		$vars     = $instance->overlay_css_vars( [] );

		// テキストカラー未設定時はヘッダー既定色フォールバック。
		$this->assertSame( 'var(--header-text)', $vars['overlay-text-color'] );
	}

	/**
	 * オーバーレイ有効 + overlayTextColor=#ffffff のとき、overlay_css_vars() の
	 * overlay-text-color が設定値（カスタム色）で上書きされることを確認。
	 */
	public function test_overlay_css_vars_uses_custom_color() {
		$this->update_option(
			[
				'enableOverlay'    => true,
				'overlayTextColor' => '#ffffff',
			]
		);
		add_filter( 'ystdtb_is_header_overlay', '__return_true' );
		$instance = new \ystandard_toolbox\Header_Overlay();
		$vars     = $instance->overlay_css_vars( [] );

		$this->assertSame( '#ffffff', $vars['overlay-text-color'] );
	}
}
