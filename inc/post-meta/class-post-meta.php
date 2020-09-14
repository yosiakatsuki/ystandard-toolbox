<?php
/**
 * Post meta.
 *
 * @package ystandard-toolbox
 * @author  yosiakatsuki
 * @license GPL-2.0+
 */

namespace ystandard_toolbox;

defined( 'ABSPATH' ) || die();

/**
 * Class Post_Meta
 *
 * @package ystandard_toolbox
 */
class Post_Meta {

	/**
	 * Post_Meta constructor.
	 */
	public function __construct() {
		$this->load_files();
	}

	/**
	 * Load PHP files.
	 */
	private function load_files() {
		require_once __DIR__ . '/class-post-meta-seo.php';
	}

	/**
	 * 投稿オプション(post-meta)取得
	 *
	 * @param string  $key     設定キー.
	 * @param integer $post_id 投稿ID.
	 *
	 * @return string
	 */
	public static function get_post_meta( $key, $post_id = 0 ) {
		if ( 0 === $post_id ) {
			$post_id = get_the_ID();
		}

		return get_post_meta( $post_id, $key, true );
	}

	/**
	 * 投稿オプションの更新：textarea
	 *
	 * @param int    $post_id       投稿ID.
	 * @param string $key           設定キー.
	 * @param bool   $remove_breaks 改行を削除するか.
	 */
	public static function save_post_textarea( $post_id, $key, $remove_breaks = true ) {
		if ( ! isset( $_POST[ $key ] ) ) {
			return;
		}
		if ( ! empty( $_POST[ $key ] ) ) {
			$text = wp_strip_all_tags( $_POST[ $key ], $remove_breaks );
			update_post_meta( $post_id, $key, $text );
		} else {
			delete_post_meta( $post_id, $key );
		}
	}


}

new Post_Meta();
