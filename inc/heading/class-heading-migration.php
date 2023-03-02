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
	 * 新設定.
	 *
	 * @var array
	 */
	private $new_option = [];

	/**
	 *  Constructor.
	 */
	public function __construct() {
		add_action( 'rest_api_init', [ $this, 'register_routes' ] );
	}

	private function migration( &$data ) {
		$old        = Heading_Compatible::get_option();
		$data['v1'] = $old;
		// 初期化.
		$this->new_option = [];



		return true;
	}

	/**
	 * Register REST API route
	 *
	 * @return void
	 */
	public function register_routes() {
		Api::register_rest_route( 'migration_heading_v1_v2', [ $this, 'api_route' ] );
	}


	/**
	 * 見出しレベル関連の設定追加
	 *
	 * @param \WP_REST_Request $request Request.
	 *
	 * @return \WP_Error|\WP_HTTP_Response|\WP_REST_Response
	 */
	public function api_route( $request ) {
		$data       = $request->get_json_params();
		$result     = false;
		$new_option = [];
		if ( ! is_array( $data ) || ! array_key_exists( 'migration', $data ) ) {
			return Api::create_response(
				$result,
				'パラメーターが正しくありません。',
				wp_json_encode( $data )
			);
		}
		if ( ! helper\Boolean::to_bool( $data['migration'] ) ) {
			return Api::create_response(
				$result,
				'パラメーターが正しくありません。',
				wp_json_encode( $data )
			);
		}

		$result = $this->migration( $data );

		return Api::create_response(
			$result,
			'',
			wp_json_encode( $data )
		);
	}
}

new Heading_Migration();
