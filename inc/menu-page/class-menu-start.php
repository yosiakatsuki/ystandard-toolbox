<?php
/**
 * Start Page
 *
 * @package ystandard-toolbox
 * @author  yosiakatsuki
 * @license GPL-2.0+
 */

namespace ystandard_toolbox\menu;

use ystandard_toolbox\Code;
use ystandard_toolbox\Menu_Page;

defined( 'ABSPATH' ) || die();

/**
 * Class Menu_Start
 *
 * @package ystandard_toolbox\menu
 */
class Menu_Start extends Menu_Page_Base {

	/**
	 * Code constructor.
	 */
	public function __construct() {
		parent::__construct();
		$this->menu_slug     = '';
		$this->menu_title    = 'yStandard Toolbox';
		$this->menu_label    = 'yStandard Toolbox';
		$this->template_name = 'start';

		add_action( 'admin_menu', [ $this, 'add_menu_page' ], 51 );
	}

	/**
	 * サブメニューページ追加
	 */
	public function add_menu_page() {
		add_submenu_page(
			Menu_Page::MENU_SLUG,
			$this->menu_title,
			$this->menu_label,
			'manage_options',
			Menu_Page::MENU_SLUG,
			[ $this, 'menu_page' ]
		);
	}

	/**
	 * 設定保存
	 *
	 * @param array $_post 設定値.
	 */
	public function save( $_post ) {

	}

}

new Menu_Start();
