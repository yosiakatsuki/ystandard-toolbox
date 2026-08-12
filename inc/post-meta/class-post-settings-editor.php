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
	const SCRIPT_HANDLE = 'ystdtb-post-settings';

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

		$script_path = YSTDTB_PATH . '/build/plugin-settings/post-settings.js';
		$asset_path  = YSTDTB_PATH . '/build/plugin-settings/post-settings.asset.php';
		if ( ! is_readable( $script_path ) || ! is_readable( $asset_path ) ) {
			return;
		}

		$asset = require $asset_path;
		wp_enqueue_script(
			self::SCRIPT_HANDLE,
			YSTDTB_URL . '/build/plugin-settings/post-settings.js',
			$asset['dependencies'],
			$asset['version'],
			true
		);
		wp_set_script_translations(
			self::SCRIPT_HANDLE,
			'ystandard-toolbox',
			YSTDTB_PATH . '/languages'
		);
	}
}

new Post_Settings_Editor();
