<?php
/**
 * Helper Debug
 *
 * @package ystandard-toolbox
 * @author  yosiakatsuki
 * @license GPL-2.0+
 */

namespace ystandard_toolbox\helper;

defined( 'ABSPATH' ) || die();

/**
 * Class Debug
 *
 * @package ystandard_toolbox\helper
 */
class Debug {

	/**
	 * ファイル出力式var_dump
	 *
	 * @param mixed $var 出力する変数.
	 * @return void
	 */
	public static function file_dump( $var ) {
		$dir = YSTDTB_PATH . '/debug';
		ob_start();
		var_dump( $var );
		$dump = ob_get_clean();
		if ( ! is_dir( $dir ) ) {
			mkdir( $dir );
		}
		file_put_contents(
			$dir . '/' . wp_date( 'YmdHis' ) . '.html',
			$dump
		);
	}
}
