<?php
/**
 * Option
 *
 * @package ystandard-toolbox
 * @author  yosiakatsuki
 * @license GPL-2.0+
 */

namespace ystandard_toolbox;

defined( 'ABSPATH' ) || die();

/**
 * Class Utility
 *
 * @package ystandard_toolbox
 */
class Option {

	/**
	 * 設定取得
	 *
	 * @return array
	 */
	public static function get_all_option() {
		return get_option( Config::OPTION_NAME, [] );
	}

	/**
	 * 設定取得
	 *
	 * @param string $section Section.
	 * @param string $name    Name.
	 * @param string $default Default.
	 *
	 * @return mixed|string
	 */
	public static function get_option( $section, $name = '', $default = '' ) {
		$option = self::get_all_option();
		if ( ! isset( $option[ $section ] ) ) {
			return $default;
		}
		if ( '' === $name ) {
			return $option[ $section ];
		}
		if ( ! isset( $option[ $section ][ $name ] ) ) {
			return $default;
		}

		return $option[ $section ][ $name ];
	}

	/**
	 * 設定取得（bool）
	 *
	 * @param string $section Section.
	 * @param string $name    Name.
	 * @param bool   $default Default.
	 *
	 * @return bool
	 */
	public static function get_option_by_bool( $section, $name, $default = false ) {

		return Utility::to_bool( self::get_option( $section, $name, $default ) );
	}

	/**
	 * 設定取得（num）
	 *
	 * @param string $name    Name.
	 * @param string $default Default.
	 *
	 * @return int|float
	 */
	public static function get_option_by_num( $name, $default = 0 ) {
		$option = self::get_option( $name, $default );
		if ( ! is_numeric( $option ) ) {
			return $default;
		}

		return $option;
	}

	/**
	 * 設定更新
	 *
	 * @param string $name  Name.
	 * @param mixed  $value Value.
	 *
	 * @return bool
	 */
	public static function update_option( $name, $value ) {
		$option = self::get_all_option();

		if ( is_array( $value ) ) {
			/**
			 * テーマ設定は別保存
			 */
			foreach ( $value as $key => $option_value ) {
				if ( false !== strpos( $key, 'theme_' ) ) {
					$theme_option = str_replace( 'theme_', '', $key );
					update_option( $theme_option, $option_value );
					unset( $value[ $key ] );
				}
			}
		}

		$option[ $name ] = $value;

		return update_option( Config::OPTION_NAME, $option );
	}

	/**
	 * 設定削除
	 *
	 * @param string $name Name.
	 *
	 * @return bool
	 */
	public static function delete_option( $name ) {
		$option = self::get_all_option();
		unset( $option[ $name ] );

		return update_option( Config::OPTION_NAME, $option );
	}
}
