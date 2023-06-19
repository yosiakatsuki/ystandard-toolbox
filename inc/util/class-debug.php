<?php
/**
 * 開発用機能
 *
 * @package ystandard-toolbox
 * @author  yosiakatsuki
 * @license GPL-2.0+
 */

namespace ystandard_toolbox\Util;

class Debug {
	/**
	 * 変数の内容をファイルに出力（開発用）
	 *
	 * @param mixed  $var  value.
	 * @param string $file File Name.
	 * @param string $line Line Number.
	 */
	public static function debug_var_dump_file( $var, $file = '', $line = '' ) {
		ob_start();
		echo date_i18n( 'Y.m.d H:i:s' ) . '<br>' . PHP_EOL;
		if ( $file || $line ) {
			echo $file . ' ' . $line . '<br>' . PHP_EOL;
		}
		var_dump( $var );
		$dump = ob_get_contents();
		ob_end_clean();
		file_put_contents( ABSPATH . 'wp-content/uploads/debug.html', $dump . PHP_EOL, FILE_APPEND );
	}
}
