<?php
/**
 * Sub Header.
 *
 * @package ystandard-toolbox
 * @author  yosiakatsuki
 * @license GPL-2.0+
 */

namespace ystandard_toolbox;

defined( 'ABSPATH' ) || die();

/**
 * Class Header_Design
 *
 * @package ystandard_toolbox
 */
class Header_Design {

	/**
	 * 設定名
	 */
	const OPTION_NAME = 'header_design';

	/**
	 * Header_Design constructor.
	 */
	public function __construct() {
		$this->load_files();
	}

	/**
	 * 関連ファイルの読み込み
	 */
	private function load_files() {
		require_once __DIR__ . '/class-sub-header.php';
		require_once __DIR__ . '/class-header-overlay.php';
	}

	/**
	 * 設定の取得
	 *
	 * @param string $name    Option Name.
	 * @param mixed  $default Default Value.
	 *
	 * @return mixed
	 */
	public static function get_option( $name, $default = null ) {
		return Option::get_option( self::OPTION_NAME, $name, $default );
	}
}

new Header_Design();
