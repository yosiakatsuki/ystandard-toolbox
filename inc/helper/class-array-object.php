<?php
/**
 * Helper : Array,Object
 *
 * @package ystandard
 * @author  yosiakatsuki
 * @license GPL-2.0+
 */

namespace ystandard_toolbox\helper;

defined( 'ABSPATH' ) || die();

/**
 * Class Array,Object.
 */
class Array_Object {

	/**
	 * 配列の値を取得.
	 *
	 * @param array  $array   Array.
	 * @param string $key     Key.
	 * @param mixed  $default Default Value.
	 *
	 * @return array|mixed
	 */
	public static function get_value( $array, $key, $default = false ) {
		if ( ! is_array( $array ) || empty( $array ) ) {
			return $default;
		}
		if ( array_key_exists( $key, $array ) ) {
			return $array[ $key ];
		}

		return $default;
	}
}
