<?php
/**
 * サブヘッダー（消費側）ロジックテスト
 *
 * 設定値（Header_Design::OPTION_NAME 配下）→ Sub_Header::enqueue_css の出力 CSS を検証する。
 * 既存の Sub_Header_Test は get_font_size の旧→新 migrate のみカバーしているため、
 * 本テストは「背景色 / 文字色 / 表示位置 / フォントサイズ → CSS 出力」の対応関係を担保する。
 *
 * @package ystandard_toolbox
 */

class Settings_Sub_Header_Test extends WP_UnitTestCase {

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

	/**
	 * Config::CSS_HANDLE をテスト用に登録し、wp_add_inline_style で書かれた
	 * CSS を取得できる状態にする。
	 */
	private function register_css_handle() {
		// 既存の登録があればクリア。
		wp_deregister_style( \ystandard_toolbox\Config::CSS_HANDLE );
		wp_register_style( \ystandard_toolbox\Config::CSS_HANDLE, false );
	}

	/**
	 * wp_add_inline_style で追加された 'after' インライン CSS を文字列で取得。
	 *
	 * @return string
	 */
	private function get_inline_css() {
		$styles = wp_styles();
		$extra  = $styles->get_data( \ystandard_toolbox\Config::CSS_HANDLE, 'after' );
		if ( ! is_array( $extra ) ) {
			return '';
		}
		return implode( '', $extra );
	}

	public function tear_down() {
		delete_option( \ystandard_toolbox\Header_Design::OPTION_NAME );
		wp_deregister_style( \ystandard_toolbox\Config::CSS_HANDLE );
		parent::tear_down();
	}

	/**
	 * 設定が空のとき、enqueue_css() がデフォルト値（背景 #f1f1f3 / 文字色 #666666 /
	 * 右揃え / 0.7em）でインライン CSS を出力することを確認。
	 */
	public function test_enqueue_css_outputs_default_values_when_settings_empty() {
		$this->update_option( [] );
		$this->register_css_handle();

		$instance = new \ystandard_toolbox\Sub_Header();
		$instance->enqueue_css();

		$css = $this->get_inline_css();
		$this->assertStringContainsString( 'background-color:#f1f1f3', $css );
		$this->assertStringContainsString( 'color:#666666', $css );
		$this->assertStringContainsString( 'justify-content:flex-end', $css );
		$this->assertStringContainsString( 'font-size:0.7em', $css );
	}

	/**
	 * subHeaderBackgroundColorDesktop に値を設定すると、
	 * 出力 CSS の background-color が設定値で置き換わることを確認。
	 */
	public function test_enqueue_css_uses_custom_background_color() {
		$this->update_option(
			[ 'subHeaderBackgroundColorDesktop' => '#ff0000' ]
		);
		$this->register_css_handle();

		$instance = new \ystandard_toolbox\Sub_Header();
		$instance->enqueue_css();

		$css = $this->get_inline_css();
		$this->assertStringContainsString( 'background-color:#ff0000', $css );
		// デフォルト値は使われないことを確認。
		$this->assertStringNotContainsString( 'background-color:#f1f1f3', $css );
	}

	/**
	 * subHeaderColorDesktop に値を設定すると、
	 * 出力 CSS の color が設定値で置き換わることを確認。
	 */
	public function test_enqueue_css_uses_custom_text_color() {
		$this->update_option( [ 'subHeaderColorDesktop' => '#00ff00' ] );
		$this->register_css_handle();

		$instance = new \ystandard_toolbox\Sub_Header();
		$instance->enqueue_css();

		$css = $this->get_inline_css();
		$this->assertStringContainsString( 'color:#00ff00', $css );
	}

	/**
	 * subHeaderAlignDesktop=left のとき、CSS の justify-content が flex-start に変換されることを確認。
	 */
	public function test_enqueue_css_align_left_maps_to_flex_start() {
		$this->update_option( [ 'subHeaderAlignDesktop' => 'left' ] );
		$this->register_css_handle();

		$instance = new \ystandard_toolbox\Sub_Header();
		$instance->enqueue_css();

		$css = $this->get_inline_css();
		$this->assertStringContainsString( 'justify-content:flex-start', $css );
	}

	/**
	 * subHeaderAlignDesktop=center のとき、CSS の justify-content が center になることを確認。
	 */
	public function test_enqueue_css_align_center_maps_to_center() {
		$this->update_option( [ 'subHeaderAlignDesktop' => 'center' ] );
		$this->register_css_handle();

		$instance = new \ystandard_toolbox\Sub_Header();
		$instance->enqueue_css();

		$css = $this->get_inline_css();
		$this->assertStringContainsString( 'justify-content:center', $css );
	}

	/**
	 * subHeaderAlignDesktop=right（または未指定）のとき、
	 * CSS の justify-content が flex-end になることを確認。
	 */
	public function test_enqueue_css_align_right_maps_to_flex_end() {
		$this->update_option( [ 'subHeaderAlignDesktop' => 'right' ] );
		$this->register_css_handle();

		$instance = new \ystandard_toolbox\Sub_Header();
		$instance->enqueue_css();

		$css = $this->get_inline_css();
		$this->assertStringContainsString( 'justify-content:flex-end', $css );
	}

	/**
	 * subHeaderFontSize に新形式の値を設定すると、CSS の font-size が新値で出力されることを確認。
	 */
	public function test_enqueue_css_uses_new_font_size_setting() {
		$this->update_option( [ 'subHeaderFontSize' => '1.2em' ] );
		$this->register_css_handle();

		$instance = new \ystandard_toolbox\Sub_Header();
		$instance->enqueue_css();

		$css = $this->get_inline_css();
		$this->assertStringContainsString( 'font-size:1.2em', $css );
	}

	/**
	 * 旧形式の subHeaderFontSizeDesktop / Unit のみ設定された場合に
	 * CSS が migrate 結果（{size}{unit}）で出力されることを確認。
	 * （Sub_Header::get_font_size() の挙動が enqueue_css 経由でも反映されることの担保）
	 */
	public function test_enqueue_css_falls_back_to_legacy_font_size() {
		$this->update_option(
			[
				'subHeaderFontSizeDesktop'     => 14,
				'subHeaderFontSizeUnitDesktop' => 'px',
			]
		);
		$this->register_css_handle();

		$instance = new \ystandard_toolbox\Sub_Header();
		$instance->enqueue_css();

		$css = $this->get_inline_css();
		$this->assertStringContainsString( 'font-size:14px', $css );
	}
}
