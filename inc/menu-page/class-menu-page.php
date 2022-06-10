<?php
/**
 * Menu Page
 *
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
	 * 読み込み
	 */
	public static function load() {
		require_once __DIR__ . '/class-menu-page-base.php';
		require_once __DIR__ . '/class-menu-heading.php';
		require_once __DIR__ . '/class-menu-font.php';
		require_once __DIR__ . '/class-menu-header-design.php';
		require_once __DIR__ . '/class-menu-navigation.php';
		require_once __DIR__ . '/class-menu-cta.php';
		require_once __DIR__ . '/class-menu-archive.php';
		require_once __DIR__ . '/class-menu-custom-css.php';
		require_once __DIR__ . '/class-menu-copyright.php';
		require_once __DIR__ . '/class-menu-block-patterns.php';
	}
}
