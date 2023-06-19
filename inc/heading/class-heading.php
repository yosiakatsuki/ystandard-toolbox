<?php
/**
 * Heading
 *
 * @package ystandard-toolbox
 * @author  yosiakatsuki
 * @license GPL-2.0+
 */

namespace ystandard_toolbox;

use ystandard_toolbox\helper\Styles;
use ystandard_toolbox\helper\Text;

defined( 'ABSPATH' ) || die();

/**
 * Class Heading
 *
 * @package ystandard_toolbox
 */
class Heading {
	/**
	 * 見出し設定メイン
	 */
	const OPTION_MAIN = 'ystdtb_heading_v2';
	/**
	 * 見出しレベル別設定
	 */
	const OPTION_LEVEL = 'ystdtb_heading_level';
	/**
	 * ブロックスタイル用
	 */
	const BODY_CLASS_HEADING = 'ystdtb-heading';
	/**
	 * キャッシュキー.
	 */
	const CSS_CACHE_KEY = 'ystdtb_heading_v2_css';

	const CSS_HANDLE = 'ystdtb_heading_css';

	/**
	 * Heading constructor.
	 */
	public function __construct() {

		require_once __DIR__ . '/class-heading-helper.php';
		add_action( 'ystdtb_plugin_settings', [ $this, 'add_plugin_settings' ] );

		// 設定移行前は下位互換モードで起動する.
		if ( $this->is_compatible_mode() ) {
			require_once __DIR__ . '/class-heading-compatible.php';
			require_once __DIR__ . '/class-heading-migration.php';

			return;
		}
		add_filter( 'body_class', [ $this, 'body_class' ], 20 );
		add_action( 'rest_api_init', [ $this, 'register_routes' ] );

		add_action( 'enqueue_block_assets', [ $this, 'enqueue_block_assets' ], 11 );
		add_action( 'enqueue_block_editor_assets', [ $this, 'enqueue_editor_assets' ], 11 );

	}


	/**
	 * CSS作成.
	 *
	 * @return string
	 */
	public function get_css() {
		$heading = self::get_heading_design_options();
		$level   = self::get_heading_level_options();
		$css     = Heading_Helper::get_heading_css( $heading, $level );

		return $css;
	}

	/**
	 * CSS追加.
	 *
	 * @return void
	 */
	public function enqueue_block_assets() {
		$css = $this->get_css();
		if ( empty( $css ) ) {
			return;
		}
		wp_register_style( self::CSS_HANDLE, false, [], wp_date( 'YmdHis' ) );
		wp_add_inline_style(
			self::CSS_HANDLE,
			Text::minify( $css )
		);
		wp_enqueue_style( self::CSS_HANDLE );
	}

	/**
	 * CSS（Editor）追加.
	 *
	 * @return void
	 */
	public function enqueue_editor_assets() {
		$this->enqueue_block_assets();
	}

	/**
	 * 設定画面用データ追加
	 *
	 * @param array $settings Settings.
	 *
	 * @return array
	 */
	public function add_plugin_settings( $settings ) {
		$settings['heading_design']        = self::get_heading_design_options();
		$settings['heading_level']         = self::get_heading_level_options();
		$settings['heading_is_compatible'] = $this->is_compatible_mode();
		$settings['heading_breakpoints']   = Styles::get_breakpoints();

		return $settings;
	}

	/**
	 * Register REST API route
	 *
	 * @return void
	 */
	public function register_routes() {
		Api::register_rest_route( 'add_heading_style', [ $this, 'add_heading_style' ] );
		Api::register_rest_route( 'update_heading_style', [ $this, 'update_heading_style' ] );
		Api::register_rest_route( 'update_heading_level', [ $this, 'update_heading_level' ] );
		Api::register_rest_route( 'get_heading_styles', [ $this, 'get_heading_styles' ], 'GET' );
		Api::register_rest_route( 'get_heading_level', [ $this, 'get_heading_level' ], 'GET' );
	}

	/**
	 * スタイル定義の追加
	 *
	 * @param \WP_REST_Request $request Request.
	 *
	 * @return \WP_Error|\WP_HTTP_Response|\WP_REST_Response
	 */
	public function add_heading_style( $request ) {
		$data   = $request->get_json_params();
		$result = false;
		if ( is_array( $data ) && isset( $data['style'] ) ) {

			$new_style = [
				$data['style']['slug'] => $data['style'],
			];
			$styles    = $this->get_heading_styles();
			$styles    = array_merge( $styles, $new_style );
			$result    = $this->update_heading_design_option( $styles );
		}

		return Api::create_response(
			$result,
			'',
			wp_json_encode( $data )
		);
	}

	/**
	 * スタイル関連の設定追加
	 *
	 * @param \WP_REST_Request $request Request.
	 *
	 * @return \WP_Error|\WP_HTTP_Response|\WP_REST_Response
	 */
	public function update_heading_style( $request ) {
		$data       = $request->get_json_params();
		$result     = false;
		$new_option = [];
		if ( is_array( $data ) && isset( $data['style'] ) ) {

		}

		return Api::create_response(
			$result,
			'',
			wp_json_encode( $data )
		);
	}

	/**
	 * 見出しレベル関連の設定追加
	 *
	 * @param \WP_REST_Request $request Request.
	 *
	 * @return \WP_Error|\WP_HTTP_Response|\WP_REST_Response
	 */
	public function update_heading_level( $request ) {
		$data       = $request->get_json_params();
		$result     = false;
		$new_option = [];
		if ( is_array( $data ) ) {
			foreach ( $data as $key => $value ) {
				$new_option[ $key ] = trim( $value );
			}
			// $result = Option::update_option( self::OPTION_NAME, $new_option );
		}

		return Api::create_response(
			$result,
			'',
			wp_json_encode( $data )
		);
	}

	/**
	 * 設定情報取得.
	 *
	 * @return array
	 */
	public function get_heading_styles() {
		$result = self::get_heading_design_options();

		return $result;
	}

	/**
	 * レベル情報取得.
	 *
	 * @return array
	 */
	public function get_heading_level() {
		$result = self::get_heading_level_options();

		return $result;
	}

	/**
	 * 互換性モード起動か判定.
	 *
	 * @return bool
	 */
	private function is_compatible_mode() {
		$old = get_option( 'ystdtb_heading', null );
		$v2  = self::get_heading_design_options();

		// 新設定があれば新設定使う.
		if ( ! empty( $v2 ) ) {
			return false;
		}

		if ( ! is_null( $old ) ) {
			return true;
		}

		return false;
	}

	/**
	 * Body Class.
	 *
	 * @param array $classes classes.
	 *
	 * @return array
	 */
	public function body_class( $classes ) {
		$classes[] = self::BODY_CLASS_HEADING;

		return $classes;
	}

	/**
	 * 見出しデザイン設定の更新.
	 *
	 * @param array $value 設定.
	 *
	 * @return bool
	 */
	public static function update_heading_design_option( $value ) {
		return Option::update_option( self::OPTION_MAIN, $value );
	}

	/**
	 * 見出しデザイン設定の更新.
	 *
	 * @param array $value 設定.
	 *
	 * @return bool
	 */
	public static function update_heading_level_option( $value ) {
		return Option::update_option( self::OPTION_LEVEL, $value );
	}


	/**
	 * 見出しカスタマイズ機能設定取得
	 *
	 * @return array
	 */
	public static function get_heading_design_options() {
		$option = get_option( self::OPTION_MAIN, [] );

		return is_array( $option ) ? stripslashes_deep( $option ) : [];
	}

	/**
	 * 見出しカスタマイズ機能 レベル設定
	 *
	 * @return array
	 */
	public static function get_heading_level_options() {
		$option = get_option( self::OPTION_LEVEL, [] );

		return is_array( $option ) ? stripslashes_deep( $option ) : [];
	}

}

new Heading();
