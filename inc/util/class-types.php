<?php
/**
 * 型 関連
 *
 * @package ystandard-toolbox
 * @author  yosiakatsuki
 * @license GPL-2.0+
 */

namespace ystandard_toolbox\Util;

defined( 'ABSPATH' ) || die();

/**
 * Class Types.
 */
class Types {

	/**
	 * Trueかどうか
	 *
	 * @param mixed $value チェックする値.
	 *
	 * @return bool
	 */
	public static function is_true( $value ) {
		return true === $value || 'true' === $value || 1 === $value || '1' === $value;
	}

	/**
	 * Boolに変換
	 *
	 * @param mixed $value 変換する値.
	 *
	 * @return bool
	 */
	public static function to_bool( $value ) {
		if ( self::is_true( $value ) ) {
			return true;
		} else {
			return false;
		}
	}

	/**
	 * 配列の値を取得.
	 *
	 * @param array  $array   Array.
	 * @param string $key     Key.
	 * @param mixed  $default Default Value.
	 *
	 * @return array|mixed
	 */
	public static function get_array_value( $array, $key, $default = false ) {
		if ( ! is_array( $array ) || empty( $array ) ) {
			return $default;
		}
		if ( array_key_exists( $key, $array ) ) {
			return $array[ $key ];
		}

		return $default;
	}
}
