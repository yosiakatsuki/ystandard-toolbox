<?php
/**
 * 投稿設定モーダルホスト選択.
 *
 * @package ystandard-toolbox
 * @author  yosiakatsuki
 * @license GPL-2.0+
 */

namespace ystandard_toolbox;

defined( 'ABSPATH' ) || die();

/**
 * Class Post_Settings_Registry
 *
 * @package ystandard-toolbox
 */
class Post_Settings_Registry {

	/**
	 * 共通コンテキストを作成する.
	 *
	 * @param string $post_type 投稿タイプ.
	 * @param int    $post_id   投稿ID.
	 *
	 * @return array
	 */
	public static function get_context( $post_type, $post_id = 0 ) {
		return [
			'post_type' => (string) $post_type,
			'post_id'   => (int) $post_id,
		];
	}

	/**
	 * 投稿設定モーダルのホストを取得する.
	 *
	 * @param array $context 共通コンテキスト.
	 *
	 * @return string|false
	 */
	public static function get_host( $context ) {
		return apply_filters( 'ys_post_settings_modal_host', 'ystandard-toolbox', $context );
	}
}
