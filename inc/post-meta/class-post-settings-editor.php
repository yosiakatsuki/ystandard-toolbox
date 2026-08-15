<?php
/**
 * ブロックエディター投稿設定.
 *
 * @package ystandard-toolbox
 * @author  yosiakatsuki
 * @license GPL-2.0+
 */

namespace ystandard_toolbox;

defined( 'ABSPATH' ) || die();

/**
 * Class Post_Settings_Editor
 *
 * @package ystandard-toolbox
 */
class Post_Settings_Editor {

	/**
	 * スクリプトハンドル.
	 */
	const HOST_SCRIPT_HANDLE = 'ystdtb-post-settings-host';

	/**
	 * Toolbox設定プロバイダースクリプトのハンドル.
	 */
	const PROVIDER_SCRIPT_HANDLE = 'ystdtb-post-settings-provider';

	/**
	 * Post_Settings_Editor constructor.
	 */
	public function __construct() {
		add_action( 'enqueue_block_editor_assets', [ $this, 'enqueue_scripts' ] );
	}

	/**
	 * 投稿設定モーダル用スクリプトを読み込む.
	 */
	public function enqueue_scripts() {
		$screen = get_current_screen();
		if ( ! $screen || 'post' !== $screen->base || empty( $screen->post_type ) ) {
			return;
		}
		if ( ! use_block_editor_for_post_type( $screen->post_type ) ) {
			return;
		}

		$post    = get_post();
		$post_id = $post ? (int) $post->ID : 0;
		$context = Post_Settings_Registry::get_context( $screen->post_type, $post_id );

		if ( Post_Settings_Provider::is_available( $screen->post_type ) ) {
			$this->enqueue_script(
				self::PROVIDER_SCRIPT_HANDLE,
				'post-settings-provider',
				'ystdtbPostSettingsProvider',
				Post_Settings_Provider::get_config( $screen->post_type, $post_id )
			);
		}

		if ( 'ystandard-toolbox' === Post_Settings_Registry::get_host( $context ) ) {
			$this->enqueue_script(
				self::HOST_SCRIPT_HANDLE,
				'post-settings-host',
				'ystdtbPostSettingsHost',
				$this->get_host_config( $screen->post_type, $post_id )
			);
		}
	}

	/**
	 * モーダルホストへ渡す共通コンテキストを取得する.
	 *
	 * @param string $post_type 投稿タイプ.
	 * @param int    $post_id   投稿ID.
	 *
	 * @return array
	 */
	public function get_host_config( $post_type, $post_id = 0 ) {
		return [
			'apiVersion' => 1,
			'postType'   => (string) $post_type,
			'postId'     => (int) $post_id,
		];
	}

	/**
	 * 投稿設定用の独立したスクリプトを読み込む.
	 *
	 * @param string $handle      スクリプトハンドル.
	 * @param string $entry       ビルドエントリー名.
	 * @param string $global_name 初期データのグローバル変数名.
	 * @param array  $config      初期データ.
	 */
	private function enqueue_script( $handle, $entry, $global_name, $config ) {
		$script_path = YSTDTB_PATH . "/build/plugin-settings/{$entry}.js";
		$asset_path  = YSTDTB_PATH . "/build/plugin-settings/{$entry}.asset.php";
		if ( ! is_readable( $script_path ) || ! is_readable( $asset_path ) ) {
			return;
		}

		$asset = require $asset_path;
		wp_enqueue_script(
			$handle,
			YSTDTB_URL . "/build/plugin-settings/{$entry}.js",
			$asset['dependencies'],
			$asset['version'],
			true
		);
		$style_entry = "style-{$entry}";
		$style_path  = YSTDTB_PATH . "/build/plugin-settings/{$style_entry}.css";
		if ( is_readable( $style_path ) ) {
			wp_enqueue_style(
				$handle,
				YSTDTB_URL . "/build/plugin-settings/{$style_entry}.css",
				[],
				$asset['version']
			);
			wp_style_add_data( $handle, 'rtl', 'replace' );
		}
		wp_set_script_translations(
			$handle,
			'ystandard-toolbox',
			YSTDTB_PATH . '/languages'
		);
		wp_add_inline_script(
			$handle,
			"window.{$global_name} = " . wp_json_encode(
				$config,
				JSON_HEX_TAG | JSON_HEX_AMP | JSON_HEX_APOS | JSON_HEX_QUOT
			) . ';',
			'before'
		);
	}
}

new Post_Settings_Editor();
