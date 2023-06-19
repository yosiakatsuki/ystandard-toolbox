<?php
/**
 * Option
 *
 * @package ystandard-toolbox
 * @author  yosiakatsuki
 * @license GPL-2.0+
 */

namespace ystandard_toolbox;

use ystandard_toolbox\Util\Types;

defined( 'ABSPATH' ) || die();

/**
 * Class Option
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
	 * 設定削除
	 *
	 * @return bool
	 */
	public static function delete_all_option() {
		return delete_option( Config::OPTION_NAME );
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

		return Types::to_bool( self::get_option( $section, $name, $default ) );
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
	 * プラグイン設定更新
	 *
	 * @param string $section_name セクション名.
	 * @param mixed  $value        Value.
	 *
	 * @return bool
	 */
	public static function update_plugin_option( $section_name, $value ) {
		$option = self::get_all_option();
		if ( ! is_array( $option ) ) {
			$option = [];
		}
		if ( is_array( $value ) ) {
			/**
			 * テーマ設定は別保存
			 */
			foreach ( $value as $key => $option_value ) {
				if ( 0 === strpos( $key, 'theme_' ) ) {
					$theme_option = str_replace( 'theme_', '', $key );
					update_option( $theme_option, $option_value );
					unset( $value[ $key ] );
				}
			}
		}

		$option[ $section_name ] = $value;

		return self::update_option( Config::OPTION_NAME, $option );
	}

	/**
	 * プラグイン設定更新
	 *
	 * @param string $name  設定名.
	 * @param mixed  $value Value.
	 *
	 * @return bool
	 */
	public static function update_option( $name, $value ) {
		$old_value = get_option( $name );
		// 値が変更されていない場合、更新はしないけどtrueを返す.
		if ( ! self::is_new_value( $value, $old_value ) ) {
			return true;
		}

		return update_option( $name, $value );
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
		if ( ! is_array( $option ) ) {
			$option = [];
		}
		if ( ! isset( $option[ $name ] ) ) {
			return true;
		}
		unset( $option[ $name ] );

		return self::update_option( Config::OPTION_NAME, $option );
	}

	/**
	 * 設定が新しいかチェック.
	 *
	 * @param mixed $new New.
	 * @param mixed $old New.
	 *
	 * @return bool
	 */
	public static function is_new_value( $new, $old ) {
		if ( $new === $old || maybe_serialize( $new ) === maybe_serialize( $old ) ) {
			return false;
		}

		return true;
	}


	/**
	 * [yStandard]の設定取得
	 *
	 * @param string $name    option key.
	 * @param mixed  $default デフォルト値.
	 * @param mixed  $type    取得する型.
	 *
	 * @return mixed
	 */
	public static function get_ystd_option( $name, $default = false, $type = false ) {
		if ( function_exists( 'ys_get_option' ) ) {
			return ys_get_option( $name, $default, $type );
		}

		return get_option( $name, $default );
	}

	/**
	 * [yStandard]の設定取得(bool)
	 *
	 * @param string $name    option key.
	 * @param mixed  $default デフォルト値.
	 *
	 * @return mixed
	 */
	public static function get_ystd_option_by_bool( $name, $default = false ) {
		if ( function_exists( 'ys_get_option_by_bool' ) ) {
			return ys_get_option_by_bool( $name, $default );
		}

		return self::get_ystd_option( $name, $default, 'boolean' );
	}

	/**
	 * プラグインの全設定削除.
	 *
	 * @return void
	 */
	public static function delete_all_plugin_data() {
		$keys = [
			Config::OPTION_NAME,
			Heading::OPTION_MAIN,
			Heading::OPTION_LEVEL,
			Custom_Css::OPTION_NAME,
			Code::OPTION_NAME,
		];

		foreach ( $keys as $key ) {
			delete_option( $key );
		}
	}
}
