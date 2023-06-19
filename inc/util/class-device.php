<?php
/**
 * デバイス関連
 *
 * @package ystandard-toolbox
 * @author  yosiakatsuki
 * @license GPL-2.0+
 */

namespace ystandard_toolbox\Util;


class Device {

	/**
	 * モバイル判定
	 *
	 * @return bool
	 */
	public static function is_mobile() {
		if ( function_exists( 'ys_is_mobile' ) ) {
			return ys_is_mobile();
		}

		return wp_is_mobile();
	}
}
