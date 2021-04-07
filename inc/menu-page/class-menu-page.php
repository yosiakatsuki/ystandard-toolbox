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
	 * メニュー名
	 */
	const MENU_SLUG = 'ystdtb-menu';
	/**
	 * メニューページプレフィックス
	 */
	const MENU_PAGE_PREFIX = 'ystdtb-menu';


	/**
	 * Menu_Page constructor.
	 */
	public function __construct() {
		add_action( 'admin_menu', [ $this, 'add_menu_page' ], 50 );
		$this->load();
	}

	/**
	 * 読み込み
	 */
	private function load() {
		require_once __DIR__ . '/class-menu-page-base.php';
		require_once __DIR__ . '/class-menu-start.php';
		require_once __DIR__ . '/class-menu-heading.php';
		require_once __DIR__ . '/class-menu-font.php';
		require_once __DIR__ . '/class-menu-header-design.php';
		require_once __DIR__ . '/class-menu-navigation.php';
		require_once __DIR__ . '/class-menu-cta.php';
		require_once __DIR__ . '/class-menu-archive.php';
		require_once __DIR__ . '/class-menu-custom-css.php';
		require_once __DIR__ . '/class-menu-copyright.php';
		require_once __DIR__ . '/class-menu-block-patterns.php';
		require_once __DIR__ . '/class-menu-code.php';
	}

	/**
	 * メニュー追加
	 */
	public function add_menu_page() {
		add_menu_page(
			'yStandard Toolbox',
			'[ys] Toolbox',
			'manage_options',
			self::MENU_SLUG,
			'',
			Utility::get_menu_icon(),
			59
		);
	}


	/**
	 * メニューページURL取得
	 *
	 * @param string $name Name.
	 *
	 * @return string
	 */
	public static function get_menu_page_url( $name ) {
		$menu_page = self::MENU_PAGE_PREFIX . '-' . $name;

		return esc_url_raw( admin_url( "admin.php?page=${menu_page}" ) );
	}
}

new Menu_Page();
