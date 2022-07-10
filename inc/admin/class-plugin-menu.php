<?php
/**
 * Plugin Menu Page
 *
 * @package ystandard-toolbox
 * @author  yosiakatsuki
 * @license GPL-2.0+
 */

namespace ystandard_toolbox;

defined( 'ABSPATH' ) || die();

/**
 * Class Plugin_Menu
 *
 * @package ystandard_toolbox
 */
class Plugin_Menu {

	/**
	 * Menu_Page constructor.
	 */
	public function __construct() {
		add_action( 'admin_menu', [ $this, 'add_menu_page' ], 50 );
		// TODO:メニューページ刷新.
		Menu_Page::load();

		// メニューページの準備.
		Admin_Utility::init_menu_page();
	}

	/**
	 * メニュー追加
	 */
	public function add_menu_page() {
		add_menu_page(
			'yStandard Toolbox',
			'[ys] Toolbox v1',
			'manage_options',
			Config::ADMIN_MENU_PARENT_SLUG,
			'',
			Utility::get_menu_icon(),
			59
		);
		add_submenu_page(
			Config::ADMIN_MENU_PARENT_SLUG,
			'yStandard Toolbox',
			'yStandard Toolbox',
			'manage_options',
			Config::ADMIN_MENU_PARENT_SLUG,
			[ $this, 'menu_page' ],
			1
		);
	}

	/**
	 * メニューページ
	 */
	public function menu_page() {
		if ( ! current_user_can( 'manage_options' ) ) {
			wp_die( __( 'You do not have sufficient permissions to access this page.' ) );
		}
		ob_start();
		?>
		<div class="start ystdtb-menu__start ystdtb-menu__component ystdtb-menu__form">
			<h1 class="ystdtb-menu__title">yStandard Toolbox</h1>
			<?php
			include __DIR__ . '/feature-list/design/index.php';
			?>
		</div>
		<?php
		Admin_Utility::the_admin_page_html(
			Config::ADMIN_MENU_PARENT_SLUG,
			ob_get_clean()
		);
	}
}

new Plugin_Menu();
