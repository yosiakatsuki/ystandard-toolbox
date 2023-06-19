<?php
/**
 * Utility
 *
 * @package ystandard-toolbox
 * @author  yosiakatsuki
 * @license GPL-2.0+
 */

namespace ystandard_toolbox;

use ystandard_toolbox\Util;

defined( 'ABSPATH' ) || die();

/**
 * Class Utility
 *
 * @package ystandard_toolbox
 */
class Utility {

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
