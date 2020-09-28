<?php
/**
 * Header Design.
 *
 * @package ystandard-toolbox
 * @author  yosiakatsuki
 * @license GPL-2.0+
 */

namespace ystandard_toolbox\menu;

use ystandard_toolbox\Archive;
use ystandard_toolbox\Menu_Page;
use ystandard_toolbox\Option;
use ystandard_toolbox\Utility;

defined( 'ABSPATH' ) || die();

/**
 * Class Menu_Header_Design
 *
 * @package ystandard_toolbox\menu
 */
class Menu_Archive extends Menu_Page_Base {

	/**
	 * Code constructor.
	 */
	public function __construct() {
		parent::__construct();
		$this->menu_slug     = 'archive';
		$this->menu_title    = 'アーカイブページ設定';
		$this->menu_label    = 'アーカイブページ設定';
		$this->template_name = 'archive';

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
		if ( ! $this->is_toolbox_menu_page( $hook_suffix ) ) {
			return;
		}

		wp_enqueue_media();
		$this->enqueue_admin_script( 'archive' );
		$this->enqueue_admin_localize_script(
			'archive',
			'ystdtbArchiveData',
			Option::get_option( Archive::OPTION_NAME, '', [] )
		);
	}

	/**
	 * 設定保存
	 *
	 * @param array $_post 設定値.
	 */
	public function save( $_post ) {
		if ( ! isset( $_post[ Archive::OPTION_NAME ] ) ) {
			return false;
		}
		$input = $_post[ Archive::OPTION_NAME ];

		return Option::update_option( Archive::OPTION_NAME, $input );
	}
}

new Menu_Archive();
