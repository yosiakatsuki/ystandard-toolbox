<?php
/**
 * Sub Header.
 *
 * @package ystandard-toolbox
 * @author  yosiakatsuki
 * @license GPL-2.0+
 */

namespace ystandard_toolbox;

defined( 'ABSPATH' ) || die();

/**
 * Class header_overlay
 *
 * @package ystandard_toolbox
 */
class Header_Overlay {

	/**
	 * Header_Overlay constructor.
	 */
	public function __construct() {
		add_action( 'ys_enqueue_script', [ $this, 'enqueue_overlay_script' ] );
		add_action( 'body_class', [ $this, 'add_overlay_class' ], 20 );
	}


	/**
	 * Body クラス追加
	 *
	 * @param array $classes Classes.
	 *
	 * @return array
	 */
	public function add_overlay_class( $classes ) {

		if ( self::is_header_overlay() ) {
			$classes[] = 'is-overlay';
			$classes[] = 'is-transparent';
		}

		return $classes;
	}

	/**
	 * ヘッダーオーバーレイ機能有効判定
	 *
	 * @return boolean
	 */
	public static function is_header_overlay() {
		$enable = Option::get_option_by_bool( Header_Design::OPTION_NAME, 'enableOverlay', false );
		if ( ! $enable ) {
			return false;
		}
		$overlay = false;
		// 設定取得.
		$types = Option::get_option( Header_Design::OPTION_NAME, 'overlayPageType', [] );
		// フロントページ.
		if ( ( is_front_page() && ! is_paged() ) && in_array( 'front-page', $types, true ) ) {
			$overlay = true;
		}
		// 投稿一覧.
		if ( is_home() && in_array( 'archive-post', $types, true ) ) {
			$overlay = true;
		}
		// 検索.
		if ( is_search() && in_array( 'search', $types, true ) ) {
			$overlay = true;
		}
		// 404.
		if ( is_404() && in_array( '404', $types, true ) ) {
			$overlay = true;
		}
		// 投稿タイプ関連.
		$post_type = Utility::get_post_type();
		// 投稿タイプ.
		if ( ! is_front_page() && ! is_home() ) {
			if ( is_singular() && in_array( $post_type, $types, true ) ) {
				$overlay = true;
			}
		}
		// 投稿タイプ 一覧.
		if ( is_post_type_archive() && in_array( 'archive-' . $post_type, $types, true ) ) {
			$overlay = true;
		}

		return apply_filters( 'ystdt_is_header_overlay', $overlay );
	}

	/**
	 * オーバーレイ機能用スクリプト読み込み
	 */
	public function enqueue_overlay_script() {
		if ( ! Option::get_option_by_bool( Header_Design::OPTION_NAME, 'enableOverlay', false ) ) {
			return;
		}
		$handle = 'ystdtb-overlay';
		wp_enqueue_script(
			$handle,
			YSTDTB_URL . '/js/app/overlay.js',
			[],
			filemtime( YSTDTB_PATH . '/js/app/overlay.js' ),
			true,
		);
		wp_script_add_data( $handle, 'defer', true );
	}
}

new Header_Overlay();
