<?php
/**
 * スクリプト関連
 *
 * @package ystandard-toolbox
 * @author  yosiakatsuki
 * @license GPL-2.0+
 */

namespace ystandard_toolbox\Util;

defined( 'ABSPATH' ) || die();

/**
 * Class Scripts
 */
class Scripts {
	/**
	 * Add defer.
	 *
	 * @param string $handle handle.
	 */
	public static function add_defer( $handle ) {
		wp_script_add_data( $handle, 'defer', true );
	}

	/**
	 * Add async.
	 *
	 * @param string $handle handle.
	 */
	public static function add_async( $handle ) {
		wp_script_add_data( $handle, 'async', true );
	}

	/**
	 * Add crossorigin.
	 *
	 * @param string $handle handle.
	 * @param string $value value.
	 */
	public static function add_crossorigin( $handle, $value ) {
		wp_script_add_data( $handle, 'crossorigin', $value );
	}
}
