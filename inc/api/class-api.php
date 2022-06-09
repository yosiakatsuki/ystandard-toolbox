<?php
/**
 * Api
 *
 * @package ystandard
 * @author  yosiakatsuki
 * @license GPL-2.0+
 */

namespace ystandard_toolbox;

defined( 'ABSPATH' ) || die();

/**
 * Class Api
 *
 * @package ystandard_toolbox
 */
class Api {

	/**
	 * Status : Success
	 */
	const STATUS_SUCCESS = 'success';
	/**
	 * Status : Error
	 */
	const STATUS_ERROR = 'error';

	const API_NAMESPACE = 'ystdtb-api';

	/**
	 * Constructor
	 */
	public function __construct() {
		add_action( 'rest_api_init', [ $this, 'register_routes' ] );
	}

	/**
	 * Register REST API route
	 */
	public function register_routes() {
		$this->register_rest_route( 'get_plugin_settings' );
	}

	/**
	 * プラグイン設定取得.
	 *
	 * @return \WP_Error|\WP_HTTP_Response|\WP_REST_Response
	 */
	public function get_plugin_settings() {
		return rest_ensure_response(
			[
				'plugin' => Option::get_all_option(),
			]
		);
	}

	/**
	 * エンドポイントの追加
	 *
	 * @param string $function_name Function Name.
	 *
	 * @return void
	 */
	private function register_rest_route( $function_name ) {
		register_rest_route(
			self::API_NAMESPACE . '/v1',
			"/${function_name}",
			[
				[
					'methods'             => 'POST',
					'callback'            => [ $this, "${function_name}" ],
					'permission_callback' => function () {
						return current_user_can( 'manage_options' );
					},
				],
			]
		);
	}

	/**
	 * レスポンス作成
	 *
	 * @param string|int|array|bool $status  ステータス.
	 * @param string                $message メッセージ.
	 * @param array                 $data    データ.
	 *
	 * @return \WP_Error|\WP_HTTP_Response|\WP_REST_Response
	 */
	public static function create_response( $status, $message = '', $data = [] ) {

		return rest_ensure_response(
			[
				'status'  => self::get_status( $status ),
				'message' => $message,
				'data'    => $data,
			]
		);
	}

	/**
	 * ステータス取得
	 *
	 * @param string|int|array|bool $status ステータス.
	 *
	 * @return string
	 */
	public static function get_status( $status ) {

		if ( is_array( $status ) ) {
			if ( in_array( false, $status, true ) ) {
				$status = false;
			} else {
				$status = true;
			}
		}

		if ( true === $status || 200 === $status || '200' === $status || self::STATUS_SUCCESS === $status ) {
			return self::STATUS_SUCCESS;
		}

		return self::STATUS_ERROR;
	}
}
