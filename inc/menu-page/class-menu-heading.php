<?php
/**
 * Heading
 *
 * @package ystandard-toolbox
 * @author  yosiakatsuki
 * @license GPL-2.0+
 */

namespace ystandard_toolbox\menu;

use ystandard_toolbox\Font;
use ystandard_toolbox\Heading;
use ystandard_toolbox\Plugin_Menu;

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
		add_action( 'admin_enqueue_scripts', [ $this, 'enqueue_style' ], 51 );
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
		$this->enqueue_admin_script( 'heading' );
		wp_localize_script(
			'ystdtb-heading',
			'ystdtbHeadingData',
			Heading::get_option()
		);
		$active_panel = '';
		if ( isset( $_POST['ystdtb_heading_active'] ) ) {
			$active_panel = $_POST['ystdtb_heading_active'];
		}
		wp_localize_script(
			'ystdtb-heading',
			'ystdtbHeadingActive',
			[ 'active' => $active_panel ]
		);
	}

	/**
	 * 管理画面-CSSの読み込み
	 *
	 * @param string $hook_suffix suffix.
	 *
	 * @return void
	 */
	public function enqueue_style( $hook_suffix ) {
		if ( ! $this->is_toolbox_menu_page( $hook_suffix ) ) {
			return;
		}
		$theme_font     = Font::get_theme_font();
		$toolbox_family = Font::get_font_family();
		$font           = ! empty( $toolbox_family ) ? $toolbox_family : $theme_font;
		wp_add_inline_style(
			'ystdtb-admin',
			".heading-editor-preview {font-family:${font};}"
		);
	}

	/**
	 * 設定保存
	 *
	 * @param array $_post 設定値.
	 */
	public function save( $_post ) {
		if ( ! isset( $_post[ Heading::OPTION_NAME ] ) || ! is_array( $_post[ Heading::OPTION_NAME ] ) ) {
			return false;
		}
		$new_option = $_post[ Heading::OPTION_NAME ];
		if ( is_array( $new_option ) ) {
			return update_option( Heading::OPTION_NAME, $new_option );
		}

		return false;
	}
}

new Menu_Heading();
