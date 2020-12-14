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
		add_filter( 'ys_css_vars', [ $this, 'overlay_css_vars' ], 20 );
		add_filter( 'get_custom_logo_image_attributes', [ $this, 'custom_logo_image_attributes' ] );
		add_filter( 'ys_get_header_logo', [ $this, 'add_overlay_logo' ] );
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

	/**
	 * CSSカスタムプロパティの追加
	 *
	 * @param array $vars CSS Custom Properties.
	 *
	 * @return array
	 */
	public function overlay_css_vars( $vars ) {
		if ( ! self::is_header_overlay() ) {
			return $vars;
		}
		$vars['overlay-text-color'] = 'var(--header-text)';
		// 設定取得.
		$color = $this->get_overlay_text_color();
		// 色追加.
		if ( $color ) {
			$vars['overlay-text-color'] = $color;
		}

		return $vars;
	}

	/**
	 * オーバーレイ表示のテキストカラー取得
	 *
	 * @return string
	 */
	private function get_overlay_text_color() {
		return Option::get_option( Header_Design::OPTION_NAME, 'overlayTextColor', '' );
	}

	/**
	 * オーバーレイ用ロゴ取得
	 *
	 * @return string
	 */
	private function get_overlay_logo() {
		return Option::get_option( Header_Design::OPTION_NAME, 'overlayImage', '' );
	}

	/**
	 * ロゴにクラス追加
	 *
	 * @param array $custom_logo_attr Custom logo image attributes.
	 *
	 * @return array
	 */
	public function custom_logo_image_attributes( $custom_logo_attr ) {
		if ( ! self::is_header_overlay() || ! $this->get_overlay_logo() ) {
			return $custom_logo_attr;
		}
		$custom_logo_attr['class'] = $custom_logo_attr['class'] . ' is-normal';

		return $custom_logo_attr;
	}

	/**
	 * オーバーレイ用ロゴ追加
	 *
	 * @param string $html Logo Html.
	 *
	 * @return string
	 */
	public function add_overlay_logo( $html ) {

		if ( ! $this->has_overlay_logo() ) {
			return $html;
		}
		$image_url = $this->get_overlay_logo();
		$image     = sprintf(
			'<img class="custom-logo is-overlay" src="%s" alt="%s" />',
			$this->get_overlay_logo(),
			esc_attr( get_bloginfo( 'name' ) )
		);

		return str_replace( '</a>', $image . '</a>', $html );
	}

	/**
	 * オーバーレイ用ロゴが必要か
	 *
	 * @return bool
	 */
	private function has_overlay_logo() {
		if ( ! has_custom_logo() ) {
			return false;
		}
		if ( Option::get_ystd_option_by_bool( 'ys_logo_hidden', false ) ) {
			return false;
		}
		if ( ! self::is_header_overlay() ) {
			return false;
		}
		if ( ! $this->get_overlay_logo() ) {
			return false;
		}

		return true;
	}
}

new Header_Overlay();
