<?php
/**
 * ショートコード関連
 *
 * @package ystandard-toolbox
 * @author  yosiakatsuki
 * @license GPL-2.0+
 */

namespace ystandard_toolbox\Util;

defined( 'ABSPATH' ) || die();

class Shortcode {
	/**
	 * ショートコード用にパラメーターを展開
	 *
	 * @param array $attributes Attributes.
	 *
	 * @return string
	 */
	public static function parse_shortcode_attributes( $attributes ) {
		$result = '';
		foreach ( $attributes as $key => $value ) {
			if ( is_null( $value ) ) {
				continue;
			}
			if ( is_array( $value ) ) {
				$value = implode( ',', $value );
			}
			$result .= "${key}=\"${value}\" ";
		}

		return $result;
	}
}
