<?php
/**
 * Code
 *
 * @package ystandard-toolbox
 * @author  yosiakatsuki
 * @license GPL-2.0+
 */

namespace ystandard_toolbox;

use ystandard_toolbox\helper\AMP;

defined( 'ABSPATH' ) || die();

/**
 * Class Code
 *
 * @package ystandard_toolbox
 */
class Code {

	/**
	 * 設定名
	 */
	const OPTION_NAME = 'ystdtb_code';

	/**
	 * Code constructor.
	 */
	public function __construct() {
		add_action( 'wp_head', [ $this, 'add_head' ] );
		add_action( 'wp_body_open', [ $this, 'add_body_open' ] );
		add_action( 'wp_footer', [ $this, 'add_footer' ] );
		add_action( 'rest_api_init', [ $this, 'register_routes' ] );
		add_action( 'ystdtb_plugin_settings', [ $this, 'add_plugin_settings' ] );
	}

	/**
	 * Headに追加
	 */
	public function add_head() {
		$this->echo_code( 'head', 'head_amp' );
	}

	/**
	 * Body開始位置に追加
	 */
	public function add_body_open() {
		$this->echo_code( 'body_open', 'body_open_amp' );
	}

	/**
	 * Body終了位置に追加
	 */
	public function add_footer() {
		$this->echo_code( 'body_close', 'body_close_amp' );
	}

	/**
	 * コード出力
	 *
	 * @param string $option     Option Name.
	 * @param string $option_amp Option Name(AMP).
	 */
	private function echo_code( $option, $option_amp ) {
		$normal = self::get_option( $option );
		$amp    = self::get_option( $option_amp );
		$code   = AMP::is_amp() ? $amp : $normal;
		if ( ! empty( trim( $code ) ) ) {
			echo trim( $code ) . PHP_EOL;
		}
	}

	/**
	 * 設定取得
	 *
	 * @param string $name 設定名.
	 *
	 * @return string
	 */
	public static function get_option( $name ) {
		$option = get_option( self::OPTION_NAME, null );
		if ( ! is_array( $option ) ) {
			return '';
		}
		if ( ! isset( $option[ $name ] ) ) {
			return '';
		}

		return wp_unslash( $option[ $name ] );
	}

	/**
	 * 全設定取得
	 *
	 * @return boolean | array
	 */
	public static function get_all_code() {
		$option = get_option( self::OPTION_NAME, null );
		$result = [];
		if ( ! is_array( $option ) ) {
			return false;
		}
		foreach ( array_keys( $option ) as $key ) {
			$result[ $key ] = wp_unslash( $option[ $key ] );
		}

		return $result;
	}

	/**
	 * 設定画面用データ追加
	 *
	 * @param array $settings Settings.
	 *
	 * @return array
	 */
	public function add_plugin_settings( $settings ) {
		$settings['code'] = self::get_all_code();

		return $settings;
	}

	/**
	 * Register REST API route
	 */
	public function register_routes() {
		Api::register_rest_route( 'update_code', [ $this, 'update_option' ] );
	}

	/**
	 * 設定更新
	 *
	 * @param \WP_REST_Request $request Request.
	 *
	 * @return \WP_Error|\WP_HTTP_Response|\WP_REST_Response
	 */
	public function update_option( $request ) {
		$data       = $request->get_json_params();
		$result     = false;
		$new_option = [];
		if ( is_array( $data ) ) {
			foreach ( $data as $key => $value ) {
				$new_option[ $key ] = trim( $value );
			}
			$result = Option::update_option( self::OPTION_NAME, $new_option );
		}

		return Api::create_response(
			$result,
			'',
			json_encode( $data )
		);
	}
}

new Code();
