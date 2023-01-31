<?php
/**
 * Heading
 *
 * @package ystandard-toolbox
 * @author  yosiakatsuki
 * @license GPL-2.0+
 */

namespace ystandard_toolbox;

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
	 * Heading constructor.
	 */
	public function __construct() {
		add_action( 'ystdtb_plugin_settings', [ $this, 'add_plugin_settings' ] );
		// 設定移行前は下位互換モードで起動する.
		if ( $this->is_compatible_mode() ) {
			require_once __DIR__ . '/class-heading-compatible.php';
			return;
		}
		add_filter( 'body_class', [ $this, 'body_class_heading' ], 20 );
		add_action( 'rest_api_init', [ $this, 'register_routes' ] );
	}

	/**
	 * 設定画面用データ追加
	 *
	 * @param array $settings Settings.
	 *
	 * @return array
	 */
	public function add_plugin_settings( $settings ) {
		$settings['heading_design'] = self::get_heading_design_options();
		$settings['heading_level'] = self::get_heading_level_options();
		$settings['heading_is_compatible'] = $this->is_compatible_mode();

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
	}

	/**
	 * スタイル定義の追加
	 *
	 * @param \WP_REST_Request $request Request.
	 *
	 * @return \WP_Error|\WP_HTTP_Response|\WP_REST_Response
	 */
	public function add_heading_style( $request ) {
		$data       = $request->get_json_params();
		$result     = false;
		$new_option = [];
		if ( is_array( $data ) ) {
			foreach ( $data as $key => $value ) {
				$new_option[ $key ] = trim( $value );
			}
//			$result = Option::update_option( self::OPTION_NAME, $new_option );
		}

		return Api::create_response(
			$result,
			'',
			json_encode( $data )
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
		if ( is_array( $data ) ) {
			foreach ( $data as $key => $value ) {
				$new_option[ $key ] = trim( $value );
			}
//			$result = Option::update_option( self::OPTION_NAME, $new_option );
		}

		return Api::create_response(
			$result,
			'',
			json_encode( $data )
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
//			$result = Option::update_option( self::OPTION_NAME, $new_option );
		}

		return Api::create_response(
			$result,
			'',
			json_encode( $data )
		);
	}


	/**
	 * 互換性モード起動か判定.
	 *
	 * @return boolean
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
	public function body_class_heading( $classes ) {
		$classes[] = self::BODY_CLASS_HEADING;

		return $classes;
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
