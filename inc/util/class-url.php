<?php
/**
 * URL関連
 *
 * @package ystandard-toolbox
 * @author  yosiakatsuki
 * @license GPL-2.0+
 */

namespace ystandard_toolbox\Util;

defined( 'ABSPATH' ) || die();

class URL {
	/**
	 * ページURL取得
	 *
	 * @return string
	 */
	public static function get_page_url() {
		$protocol = 'https://';
		if ( ! is_ssl() ) {
			$protocol = 'http://';
		}

		return $protocol . $_SERVER['HTTP_HOST'] . $_SERVER['REQUEST_URI'];
	}
}
