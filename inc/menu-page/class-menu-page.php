<?php
/**
 * @package ystandard-toolbox
 * @author  yosiakatsuki
 * @license GPL-2.0+
 */

namespace ystandard_toolbox;

defined( 'ABSPATH' ) || die();

/**
 * Class Menu_Page
 *
 * @package ystandard_toolbox
 */
class Menu_Page {

	/**
	 * メニューページプレフィックス
	 */
	const MENU_PAGE_PREFIX = 'ystdtb-menu-';

	/**
	 * 読み込み
	 */
	private function load() {
		require_once __DIR__ . '/class-menu-page-base.php';
	}

	/**
	 * メニューページURL取得
	 *
	 * @param string $name Name.
	 *
	 * @return string
	 */
	public static function get_menu_page_url( $name ) {
		$menu_page = self::MENU_PAGE_PREFIX . $name;

		return esc_url_raw( admin_url( "admin.php?page=${menu_page}" ) );
	}
}
