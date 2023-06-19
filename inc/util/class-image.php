<?php
/**
 * ページ関連
 *
 * @package ystandard-toolbox
 * @author  yosiakatsuki
 * @license GPL-2.0+
 */

namespace ystandard_toolbox\Util;

defined( 'ABSPATH' ) || die();

class Image {
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
