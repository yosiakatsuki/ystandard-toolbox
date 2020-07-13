<?php
/**
 * @package ystandard-toolbox
 * @author  yosiakatsuki
 * @license GPL-2.0+
 */

namespace ystandard_toolbox;

defined( 'ABSPATH' ) || die();

/**
 * Class Heading
 *
 * @package ystandard_toolbox
 */
class Heading {
	/**
	 * 設定名
	 */
	const OPTION_NAME = 'ystdtb_heading';


	/**
	 * 設定取得
	 *
	 * @return array
	 */
	public static function get_option() {
		$option = get_option( self::OPTION_NAME, null );

		return is_array( $option ) ? $option : [];
	}

}
