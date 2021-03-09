<?php
/**
 * Navigation.
 *
 * @package ystandard-toolbox
 * @author  yosiakatsuki
 * @license GPL-2.0+
 */

namespace ystandard_toolbox\menu;

use ystandard_toolbox\Menu_Page;
use ystandard_toolbox\Navigation;
use ystandard_toolbox\Option;
use ystandard_toolbox\Utility;

defined( 'ABSPATH' ) || die();

/**
 * Class Menu_Navigation
 *
 * @package ystandard_toolbox\menu
 */
class Menu_Navigation extends Menu_Page_Base {

	/**
	 * Menu_Navigation constructor.
	 */
	public function __construct() {
		parent::__construct();
		$this->menu_slug     = 'navigation';
		$this->menu_title    = 'メニュー拡張';
		$this->menu_label    = 'メニュー拡張';
		$this->template_name = 'navigation';
		$this->option_name   = Navigation::OPTION_NAME;

		add_action( 'admin_enqueue_scripts', [ $this, 'enqueue_app' ] );
		$this->set_ajax();
	}

	/**
	 * 管理画面-スクリプトの読み込み
	 *
	 * @param string $hook_suffix suffix.
	 *
	 * @return void
	 */
	public function enqueue_app( $hook_suffix ) {
		if ( ! $this->is_toolbox_menu_page( $hook_suffix ) ) {
			return;
		}
		wp_enqueue_media();
		$this->enqueue_admin_script( 'navigation' );
		$this->enqueue_admin_localize_script_ajax(
			'navigation',
			'ystdtbNavigationData',
			Navigation::OPTION_NAME,
			Option::get_option( Navigation::OPTION_NAME, '', [] )
		);
	}

	/**
	 * 設定保存
	 *
	 * @param array $_post 設定値.
	 *
	 * @return boolean
	 */
	public function save( $_post ) {
		if ( ! isset( $_post[ Navigation::OPTION_NAME ] ) ) {
			return false;
		}
		$input = $_post[ Navigation::OPTION_NAME ];
		$old   = Option::get_option( Navigation::OPTION_NAME, '', [] );
		if ( $input === $old ) {
			return true;
		}

		return Option::update_option( Navigation::OPTION_NAME, $input );
	}
}

new Menu_Navigation();