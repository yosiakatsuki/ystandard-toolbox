<?php
/**
 * Utility
 *
 * @package ystandard-toolbox
 * @author  yosiakatsuki
 * @license GPL-2.0+
 */

namespace ystandard_toolbox;

use ystandard_toolbox\helper\Boolean;
use ystandard_toolbox\helper\Styles;
use ystandard_toolbox\helper\Text;

defined( 'ABSPATH' ) || die();

/**
 * Class Utility
 *
 * @package ystandard_toolbox
 */
class Utility {

	/**
	 * Bool値に変換
	 *
	 * @param mixed $value value.
	 *
	 * @return bool
	 * @deprecated
	 */
	public static function to_bool( $value ) {
		return Boolean::to_bool( $value );
	}

	/**
	 * CSSの圧縮
	 *
	 * @param string $style inline css styles.
	 *
	 * @return string
	 */
	public static function minify( $style ) {
		return Text::minify( $style );
	}

	/**
	 * メディアクエリを追加
	 *
	 * @param string $css Styles.
	 * @param string $min Breakpoint.
	 * @param string $max Breakpoint.
	 *
	 * @return string
	 * @deprecated
	 */
	public static function add_media_query( $css, $min = '', $max = '' ) {
		return Styles::add_media_query( $css, $min, $max );
	}

	/**
	 * マニュアルリンク作成
	 *
	 * @param string $url   URL.
	 * @param string $text  Text.
	 * @param string $class CSS Class.
	 *
	 * @return string
	 */
	public static function manual_link( $url, $text = '', $class = '' ) {
		$link = self::manual_link_a( $url, $text, $class );
		if ( empty( $link ) ) {
			return '';
		}

		return wp_targeted_link_rel( "<div class=\"ystdtb-menu__manual-link\">${link}</div>" );
	}

	/**
	 * マニュアルリンク(インライン)作成
	 *
	 * @param string $url   URL.
	 * @param string $text  Text.
	 * @param string $class CSS Class.
	 *
	 * @return string
	 */
	public static function manual_link_inline( $url, $text = '', $class = '' ) {
		$link = self::manual_link_a( $url, $text, $class );
		if ( empty( $link ) ) {
			return '';
		}

		return wp_targeted_link_rel( "<div class=\"ystdtb-menu__manual-link-inline\">${link}</div>" );
	}

	/**
	 * マニュアルリンク作成
	 *
	 * @param string $url   URL.
	 * @param string $text  Text.
	 * @param string $class CSS Class.
	 *
	 * @return string
	 */
	public static function manual_link_a( $url, $text = '', $class = '' ) {
		if ( empty( $url ) ) {
			return '';
		}

		if ( '' === $text ) {
			$text = 'マニュアルを見る';
		}
		$icon = '<svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>';

		if ( false === strpos( $url, 'https://' ) ) {
			$url = add_query_arg(
				[
					'utm_source'   => 'manual-link',
					'utm_medium'   => 'referral',
					'utm_campaign' => $url,
				],
				"https://wp-ystandard.com/${url}/"
			);
		}
		$class = '' === $class ? '' : "class=\"$class\"";

		return "<a ${class} href=\"${url}\" target=\"_blank\">${icon}${text}</a>";
	}

	/**
	 * 設定画面リンク作成
	 *
	 * @param string $url   URL.
	 * @param string $text  Text.
	 * @param string $class CSS Class.
	 *
	 * @return string
	 */
	public static function option_link_a( $url, $text = '', $class = '' ) {
		if ( empty( $url ) ) {
			return '';
		}

		if ( '' === $text ) {
			$text = '設定画面';
		}
		$icon = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-settings"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>';

		if ( false === strpos( $url, 'https://' ) ) {
			$url = Admin_Utility::get_menu_page_url( $url );
		}
		$class = '' === $class ? '' : "class=\"$class\"";

		return "<a ${class} href=\"${url}\">${icon}${text}</a>";
	}

	/**
	 * メニューアイコン取得
	 *
	 * @return string
	 */
	public static function get_menu_icon() {
		$icon = Filesystem::file_get_contents( YSTDTB_PATH . '/assets/menu/toolbox.svg' );

		return 'data:image/svg+xml;base64,' . base64_encode( $icon );
	}

	/**
	 * 投稿タイプ取得
	 *
	 * @param array $args    args.
	 * @param bool  $exclude 除外.
	 *
	 * @return array
	 */
	public static function get_post_types( $args = [], $exclude = true ) {
		$args = array_merge(
			[ 'public' => true ],
			$args
		);

		$types = get_post_types( $args );

		if ( is_array( $exclude ) ) {
			$exclude[] = 'attachment';
			foreach ( $exclude as $item ) {
				unset( $types[ $item ] );
			}
		}

		if ( true === $exclude ) {
			unset( $types['attachment'] );
		}

		foreach ( $types as $key => $value ) {
			$post_type = get_post_type_object( $key );
			if ( $post_type ) {
				$types[ $key ] = $post_type->labels->singular_name;
			}
		}

		return $types;
	}

	/**
	 * Post Type
	 *
	 * @return false|string
	 * @global \WP_Query
	 */
	public static function get_post_type() {
		global $wp_query;
		$post_type = get_post_type();
		if ( ! $post_type ) {
			if ( isset( $wp_query->query['post_type'] ) ) {
				$post_type = $wp_query->query['post_type'];
			}
		}

		return $post_type;
	}


	/**
	 * ページテンプレートパス取得
	 *
	 * @param string $template Template Slug.
	 *
	 * @return string
	 */
	public static function get_page_template_path( $template ) {
		$template_path = str_replace(
			Config::CUSTOM_TEMPLATE_DIR,
			YSTDTB_PATH . '/page-template',
			$template
		);
		if ( file_exists( $template_path ) ) {
			return $template_path;
		}
		global $post;
		$post_type = get_post_type_object( $post->post_type );
		if ( $post_type->hierarchical ) {
			$template = get_page_template();
		} else {
			$template = get_single_template();
		}

		return $template;
	}

	/**
	 * Nonceチェック
	 *
	 * @param string $name   Name.
	 * @param string $action Action.
	 *
	 * @return bool|int
	 */
	public static function verify_nonce( $name, $action ) {
		// nonceがセットされているかどうか確認.
		if ( ! isset( $_POST[ $name ] ) ) {
			return false;
		}

		return wp_verify_nonce( $_POST[ $name ], $action );
	}

	/**
	 * タイトルタグ用タイトルの作成
	 *
	 * @param string $title Title.
	 */
	public static function get_document_title( $title ) {

		$title = apply_filters(
			'document_title_parts',
			[
				'title'   => $title,
				'page'    => '',
				'tagline' => '',
				'site'    => get_bloginfo( 'name', 'display' ),
			]
		);
		$sep   = apply_filters( 'document_title_separator', '-' );
		$title = implode( " $sep ", array_filter( $title ) );
		$title = wptexturize( $title );
		$title = convert_chars( $title );
		$title = esc_html( $title );
		$title = capital_P_dangit( $title );

		return $title;
	}

	/**
	 * 使える画像サイズ一覧取得
	 *
	 * @return array
	 */
	public static function get_image_sizes() {
		global $_wp_additional_image_sizes;
		$sizes = [];
		foreach ( get_intermediate_image_sizes() as $size ) {
			if ( in_array( $size, [ 'thumbnail', 'medium', 'medium_large', 'large' ], true ) ) {
				$sizes[ $size ]['width']  = get_option( "{$size}_size_w" );
				$sizes[ $size ]['height'] = get_option( "{$size}_size_h" );
			} elseif ( isset( $_wp_additional_image_sizes[ $size ] ) ) {
				$sizes[ $size ] = [
					'width'  => $_wp_additional_image_sizes[ $size ]['width'],
					'height' => $_wp_additional_image_sizes[ $size ]['height'],
				];

			}
		}
		/**
		 * フルサイズ追加
		 */
		$sizes['full'] = [
			'width'  => '-',
			'height' => '-',
		];

		return $sizes;
	}

}
