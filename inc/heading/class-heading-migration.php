<?php
/**
 * Heading Setting Migration
 *
 * @package ystandard-toolbox
 * @author  yosiakatsuki
 * @license GPL-2.0+
 */

namespace ystandard_toolbox;

defined( 'ABSPATH' ) || die();

/**
 * Class Heading_Migration.
 */
class Heading_Migration {
	/**
	 *  Constructor.
	 */
	public function __construct() {
		add_action( 'rest_api_init', [ $this, 'register_routes' ] );
	}

	/**
	 * Register REST API route
	 *
	 * @return void
	 */
	public function register_routes() {
		Api::register_rest_route( 'migration_heading_v1_v2', [ $this, 'migration_heading_v1_v2' ] );
	}


	/**
	 * 見出しレベル関連の設定追加
	 *
	 * @param \WP_REST_Request $request Request.
	 *
	 * @return \WP_Error|\WP_HTTP_Response|\WP_REST_Response
	 */
	public function migration_heading_v1_v2( $request ) {
		$data       = $request->get_json_params();
		$result     = false;
		$new_option = [];
		if ( ! is_array( $data ) || ! array_key_exists( 'migration', $data ) ) {
			return Api::create_response(
				$result,
				'パラメーターが正しくありません。',
				json_encode( $data )
			);
		}
		if ( ! helper\Boolean::to_bool( $data['migration'] ) ) {
			return Api::create_response(
				$result,
				'パラメーターが正しくありません。',
				json_encode( $data )
			);
		}


		$result = true;

		return Api::create_response(
			$result,
			'',
			json_encode( $data )
		);
	}
}

new Heading_Migration();
