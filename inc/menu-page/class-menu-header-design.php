<?php
/**
 * Header Design.
 *
 * @package ystandard-toolbox
 * @author  yosiakatsuki
 * @license GPL-2.0+
 */

namespace ystandard_toolbox\menu;

use ystandard_toolbox\Header_Design;
use ystandard_toolbox\Menu_Page;
use ystandard_toolbox\Option;
use ystandard_toolbox\Utility;

defined( 'ABSPATH' ) || die();

/**
 * Class Menu_Header_Design
 *
 * @package ystandard_toolbox\menu
 */
class Menu_Header_Design extends Menu_Page_Base {

	/**
	 * Code constructor.
	 */
	public function __construct() {
		parent::__construct();
		$this->menu_slug     = 'header-design';
		$this->menu_title    = 'ヘッダーデザイン';
		$this->menu_label    = 'ヘッダーデザイン設定';
		$this->template_name = 'header-design';

		add_action( 'admin_enqueue_scripts', [ $this, 'enqueue_app' ] );
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
		if ( is_front_page() && in_array( 'front-page', $types, true ) ) {
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
		if ( ! self::is_header_overlay() ) {
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

	/**
	 * 管理画面-スクリプトの読み込み
	 *
	 * @param string $hook_suffix suffix.
	 *
	 * @return void
	 */
	public function enqueue_app( $hook_suffix ) {
		if ( ! $this->is_toolbox_menu_page( $hook_suffix ) ) {
			return;
		}
		wp_enqueue_media();
		$this->enqueue_admin_script( 'header-design' );

		// 投稿タイプ一覧ページ.
		$types   = Utility::get_has_archive_post_types();
		$archive = [];
		if ( ! empty( $types ) ) {
			foreach ( $types as $key => $value ) {
				$archive[ 'archive-' . $key ] = $value;
			}
		}

		$param = array_merge(
			Option::get_option( Header_Design::OPTION_NAME, '', [] ),
			[ 'postTypes' => Utility::get_post_types( [], [ 'ys-parts' ] ) ],
			[ 'archivePostTypes' => $archive ]
		);
		wp_localize_script(
			'ystdtb-header-design',
			'ystdtbHeaderDesignData',
			$param
		);
	}

	/**
	 * 設定保存
	 *
	 * @param array $_post 設定値.
	 *
	 * @return boolean
	 */
	public function save( $_post ) {
		if ( ! isset( $_post[ Header_Design::OPTION_NAME ] ) ) {
			return false;
		}
		$input = $_post[ Header_Design::OPTION_NAME ];

		return Option::update_option( Header_Design::OPTION_NAME, $input );
	}
}

new Menu_Header_Design();
