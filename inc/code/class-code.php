<?php
/**
 * @package ystandard-toolbox
 * @author  yosiakatsuki
 * @license GPL-2.0+
 */

namespace ystandard_toolbox;

defined( 'ABSPATH' ) || die();

/**
 * Class Code
 *
 * @package ystandard_toolbox
 */
class Code {

	/**
	 * 設定名
	 */
	const OPTION_NAME = 'ystdtb_code';

	/**
	 * Code constructor.
	 */
	public function __construct() {
	}


	/**
	 * 設定取得
	 *
	 * @param string $name 設定名.
	 *
	 * @return string
	 */
	public static function get_option( $name ) {
		$option = get_option( self::OPTION_NAME, null );
		if ( ! is_array( $option ) ) {
			return '';
		}
		if ( ! isset( $option[ $name ] ) ) {
			return '';
		}

		return wp_unslash( $option[ $name ] );
	}


}

new Code();
