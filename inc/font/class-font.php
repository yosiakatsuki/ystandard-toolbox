<?php
/**
 * Web Font.
 *
 * @package ystandard-toolbox
 * @author  yosiakatsuki
 * @license GPL-2.0+
 */

namespace ystandard_toolbox;

defined( 'ABSPATH' ) || die();

/**
 * Class Font
 *
 * @package ystandard_toolbox
 */
class Font {

	/**
	 * 設定名
	 */
	const OPTION_NAME = 'font_edit';

	/**
	 * Font constructor.
	 */
	public function __construct() {
		if ( ! Utility::ystandard_version_compare() ) {
			return;
		}
		add_action( 'wp_head', [ $this, 'wp_head' ], 11 );
		add_filter( 'ys_css_vars', [ $this, 'add_font_family' ], 20 );
		add_action( 'admin_head', [ $this, 'wp_head' ], 11 );
		add_action( 'enqueue_block_assets', [ $this, 'add_editor_font_styles' ], 11 );
	}

	/**
	 * HTML出力
	 */
	public function wp_head() {
		$option = trim( wp_unslash( Option::get_option( Font::OPTION_NAME, 'html' ) ) );
		if ( empty( $option ) ) {
			return;
		}
		echo $option . PHP_EOL;
	}

	/**
	 * CSS変数追加
	 *
	 * @param array $css_vars vars.
	 *
	 * @return array
	 */
	public function add_font_family( $css_vars ) {
		$font_family = self::get_font_family();

		if ( empty( $font_family ) ) {
			return $css_vars;
		}

		return array_merge(
			$css_vars,
			[ 'font-family' => $font_family ]
		);
	}


	/**
	 * Get font-family option.
	 *
	 * @return string
	 */
	public static function get_font_family() {
		return wp_unslash( Option::get_option( self::OPTION_NAME, 'family', '' ) );
	}

	/**
	 * エディターにフォント設定反映
	 */
	public function add_editor_font_styles() {
		$family = self::get_font_family();
		if ( empty( $family ) ) {
			return;
		}
		$css = "
		#editor .editor-styles-wrapper,
		#editor .editor-styles-wrapper .editor-post-title__block .editor-post-title__input {
			font-family:${family};
		}";
		wp_add_inline_style(
			Config::BLOCK_CSS_HANDLE,
			Utility::minify( $css )
		);
	}

	/**
	 * 現在の設定で取得できるfont-familyの指定
	 *
	 * @return string
	 */
	public static function get_sample_font_family() {
		if ( ! method_exists( '\ystandard\Font', 'get_usable_fonts' ) ) {
			return '';
		}
		$option = get_option( 'ys_design_font_type', 'meihiragino' );
		$fonts  = \ystandard\Font::get_usable_fonts();
		if ( ! isset( $fonts[ $option ] ) ) {
			return '';
		}

		return esc_attr( $fonts[ $option ]['family'] );
	}
}

new Font();
