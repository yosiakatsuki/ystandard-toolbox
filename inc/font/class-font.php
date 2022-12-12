<?php
/**
 * Web Font.
 *
 * @package ystandard-toolbox
 * @author  yosiakatsuki
 * @license GPL-2.0+
 */

namespace ystandard_toolbox;

use ystandard_toolbox\helper\Version_Compare;

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
		if ( ! Version_Compare::ystandard_version_compare() ) {
			return;
		}
		add_action( 'wp_head', [ $this, 'wp_head' ], 11 );
		add_filter( 'ys_css_vars', [ $this, 'add_font_family' ], 20 );
		add_action( 'admin_head', [ $this, 'wp_head' ], 11 );
		add_action( 'enqueue_block_assets', [ $this, 'add_editor_font_styles' ], 11 );
		add_action( 'ys_customizer_parse_args__ys_design_font_type', [ $this, 'remove_customizer_font_setting' ] );
		add_action( 'rest_api_init', [ $this, 'register_routes' ] );
		add_action( 'ystdtb_plugin_settings', [ $this, 'add_plugin_settings' ] );
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
	 * テーマ設定表示用
	 *
	 * @return string
	 */
	public static function get_sample_font_family() {

		return esc_attr( self::get_theme_font() );
	}

	/**
	 * 現在のテーマ設定で取得できるfont-familyの指定
	 *
	 * @return string
	 */
	public static function get_theme_font() {
		if ( ! method_exists( '\ystandard\Font', 'get_usable_fonts' ) ) {
			return '';
		}
		$option = get_option( 'ys_design_font_type', 'meihiragino' );
		$fonts  = \ystandard\Font::get_usable_fonts();
		if ( ! isset( $fonts[ $option ] ) ) {
			return '';
		}

		return $fonts[ $option ]['family'];
	}

	/**
	 * フォント設定削除
	 *
	 * @param array $args 設定.
	 */
	public function remove_customizer_font_setting( $args ) {
		$font_family = self::get_font_family();

		if ( empty( $font_family ) ) {
			return $args;
		}
		$args['control_type'] = 'hidden';
		$args['description']  = Notice::customizer_notice( '※ yStandard Toolboxのフォント設定でフォントが指定されています。' );

		return $args;
	}

	/**
	 * 設定取得
	 *
	 * @return array
	 */
	public static function get_option() {
		$default = [
			'html'        => '',
			'family'      => '',
			'customFonts' => [],
		];
		$option  = Option::get_option( self::OPTION_NAME );
		if ( ! is_array( $option ) ) {
			return $default;
		}
		$option                     = array_merge( $default, $option );
		$option['html']             = wp_unslash( $option['html'] );
		$option['family']           = wp_unslash( $option['family'] );
		$option['customFonts']      = stripslashes_deep( $option['customFonts'] );
		$option['themeFontSetting'] = self::get_theme_font();

		return $option;
	}

	/**
	 * 設定画面用データ追加
	 *
	 * @param array $settings Settings.
	 *
	 * @return array
	 */
	public function add_plugin_settings( $settings ) {
		$settings['font'] = self::get_option();

		return $settings;
	}

	/**
	 * Register REST API route
	 */
	public function register_routes() {
		Api::register_rest_route( 'update_font', [ $this, 'update_option' ] );
	}

	/**
	 * 設定更新
	 *
	 * @param \WP_REST_Request $request Request.
	 *
	 * @return \WP_Error|\WP_HTTP_Response|\WP_REST_Response
	 */
	public function update_option( $request ) {
		$data = $request->get_json_params();
		unset( $data['themeFontSetting'] );
		$result = Option::update_plugin_option( self::OPTION_NAME, $data );

		return Api::create_response(
			$result,
			'',
			json_encode( $data )
		);
	}
}

new Font();
