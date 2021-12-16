<?php
/**
 * Helper Drawer Menu
 *
 * @package ystandard-toolbox
 * @author  yosiakatsuki
 * @license GPL-2.0+
 */

namespace ystandard_toolbox\helper;

defined( 'ABSPATH' ) || die();

/**
 * Class Drawer_Menu
 *
 * @package ystandard_toolbox\helper
 */
class Drawer_Menu {

	/**
	 * ドロワーメニュー開始サイズ取得
	 *
	 * @return int
	 */
	public static function get_drawer_menu_start() {
		return apply_filters( 'ys_get_drawer_menu_start', 768 );
	}
}
