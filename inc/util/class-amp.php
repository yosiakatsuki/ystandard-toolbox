<?php
/**
 * Helper AMP
 *
 * @package ystandard-toolbox
 * @author  yosiakatsuki
 * @license GPL-2.0+
 */
namespace ystandard_toolbox\Util;

defined( 'ABSPATH' ) || die();

/**
 * Class AMP.
 */
class AMP {
	/**
	 * AMPが有効か
	 *
	 * @return bool
	 */
	public static function is_amp() {

		if ( function_exists( 'ys_is_amp' ) && ys_is_amp() ) {
			return ys_is_amp();
		}

		return function_exists( 'is_amp_endpoint' ) && is_amp_endpoint();
	}

	/**
	 * AMPが使えるか
	 */
	public static function is_amp_enable() {
		return function_exists( 'is_amp_endpoint' );
	}
}
