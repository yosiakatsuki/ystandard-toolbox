<?php
/**
 * Custom CSS
 *
 * @package ystandard-toolbox
 * @author  yosiakatsuki
 * @license GPL-2.0+
 */

namespace ystandard_toolbox;

use ystandard_toolbox\Util\Text;

defined( 'ABSPATH' ) || die();

/**
 * Class Custom CSS.
 */
class Custom_Css {

	/**
	 * 設定名
	 */
	const OPTION_NAME = 'ystdtb_custom_css';

	/**
	 * Construct
	 */
	public function __construct() {
		add_action( 'rest_api_init', [ $this, 'register_routes' ] );
		add_action( 'ystdtb_plugin_settings', [ $this, 'add_plugin_settings' ] );
		add_action( Config::AFTER_ENQUEUE_CSS_HOOK, [ $this, 'add_front_css' ] );
		add_action( Config::AFTER_ENQUEUE_BLOCK_ASSETS_CSS_HOOK, [ $this, 'add_editor_css' ] );
	}

	/**
	 * フロント用CSS追加
	 *
	 * @return void
	 */
	public function add_front_css() {
		$option = self::get_option();
		$css    = Text::minify( $option['all'] . $option['front'] );
		if ( empty( $css ) ) {
			return;
		}
		wp_add_inline_style(
			Config::CSS_HANDLE,
			$css
		);

	}

	/**
	 * エディター用CSS追加
	 *
	 * @return void
	 */
	public function add_editor_css() {
		$option = self::get_option();
		$css    = Text::minify( $option['all'] . $option['editor'] );
		if ( empty( $css ) ) {
			return;
		}
		wp_add_inline_style(
			Config::BLOCK_CSS_HANDLE,
			$css
		);
	}

	/**
	 * 設定取得
	 *
	 * @return array
	 */
	public static function get_option() {
		$option = get_option( self::OPTION_NAME, '' );
		if ( ! is_array( $option ) ) {
			return [
				'all'        => '',
				'front'      => '',
				'editor'     => '',
				'hideNotice' => false,
			];
		}
		$option['all']    = wp_unslash( $option['all'] );
		$option['front']  = wp_unslash( $option['front'] );
		$option['editor'] = wp_unslash( $option['editor'] );

		return $option;
	}

	/**
	 * 追加CSSの有無
	 *
	 * @return string
	 */
	public static function has_wp_custom_css() {
		$css = '';
		if ( empty( $stylesheet ) ) {
			$stylesheet = get_stylesheet();
		}

		$post = wp_get_custom_css_post( $stylesheet );
		if ( $post ) {
			$css = $post->post_content;
		}

		return ! empty( $css );
	}


	/**
	 * 設定画面用データ追加
	 *
	 * @param array $settings Settings.
	 *
	 * @return array
	 */
	public function add_plugin_settings( $settings ) {
		$settings['customCss'] = self::get_option();
		// 追加CSS情報の追加.
		$settings['customCss']['hasWPCustomCss'] = self::has_wp_custom_css();

		return $settings;
	}

	/**
	 * Register REST API route
	 */
	public function register_routes() {
		Api::register_rest_route( 'update_custom_css', [ $this, 'update_option' ] );
	}

	/**
	 * 設定更新
	 *
	 * @param \WP_REST_Request $request Request.
	 *
	 * @return \WP_Error|\WP_HTTP_Response|\WP_REST_Response
	 */
	public function update_option( $request ) {
		$data   = $request->get_json_params();
		$result = [];
		unset( $data['hasWPCustomCss'] );
		$result[] = Option::update_option( self::OPTION_NAME, $data );

		return Api::create_response(
			$result,
			'',
			json_encode( $data )
		);
	}
}

new Custom_Css();
