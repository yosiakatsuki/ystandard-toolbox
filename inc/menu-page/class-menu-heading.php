<?php
/**
 * @package ystandard-toolbox
 * @author  yosiakatsuki
 * @license GPL-2.0+
 */

namespace ystandard_toolbox\menu;

use ystandard_toolbox\Heading;
use ystandard_toolbox\Menu_Page;

defined( 'ABSPATH' ) || die();

/**
 * Class Menu_Heading
 *
 * @package ystandard_toolbox\menu
 */
class Menu_Heading extends Menu_Page_Base {

	/**
	 * Code constructor.
	 */
	public function __construct() {
		parent::__construct();
		$this->menu_slug     = 'heading';
		$this->menu_title    = '見出しデザイン';
		$this->menu_label    = '見出しデザイン編集';
		$this->template_name = 'heading';

		add_action( 'admin_enqueue_scripts', [ $this, 'enqueue_app' ] );
	}

	/**
	 * 管理画面-スクリプトの読み込み
	 *
	 * @param string $hook_suffix suffix.
	 *
	 * @return void
	 */
	public function enqueue_app( $hook_suffix ) {
		if ( false === strpos( $hook_suffix, Menu_Page::MENU_PAGE_PREFIX . $this->menu_slug ) ) {
			return;
		}
		$this->enqueue_admin_script( 'heading' );
		wp_localize_script(
			'ystdtb-heading',
			'ystdtbHeadingData',
			Heading::get_option()
		);
	}

	/**
	 * 設定保存
	 *
	 * @param array $_post 設定値.
	 */
	public function save( $_post ) {
		if ( ! isset( $_post[ Heading::OPTION_NAME ] ) || ! is_array( $_post[ Heading::OPTION_NAME ] ) ) {
			return;
		}
		$new_option = $_post[ Heading::OPTION_NAME ];
//		var_dump($new_option);
		$option     = Heading::get_option();
		foreach ( $option as $level => $value ) {
			if ( isset( $new_option[ $level ] ) ) {
				foreach ( $new_option[ $level ] as $key => $new_value ) {
					$option[ $level ][ $key ] = $new_value;
				}
			}
		}
		update_option( Heading::OPTION_NAME, $option );
	}
}

new Menu_Heading();
