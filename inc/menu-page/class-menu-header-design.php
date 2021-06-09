<?php
/**
 * Header Design.
 *
 * @package ystandard-toolbox
 * @author  yosiakatsuki
 * @license GPL-2.0+
 */

namespace ystandard_toolbox\menu;

use ystandard_toolbox\Header_Design;
use ystandard_toolbox\Plugin_Menu;
use ystandard_toolbox\Option;
use ystandard_toolbox\Utility;

defined( 'ABSPATH' ) || die();

/**
 * Class Menu_Header_Design
 *
 * @package ystandard_toolbox\menu
 */
class Menu_Header_Design extends Menu_Page_Base {

	/**
	 * Code constructor.
	 */
	public function __construct() {
		parent::__construct();
		$this->menu_slug     = 'header-design';
		$this->menu_title    = 'ヘッダーデザイン';
		$this->menu_label    = 'ヘッダーデザイン設定';
		$this->template_name = 'header-design';

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
		$this->enqueue_admin_script( 'header-design' );

		$param = array_merge(
			Option::get_option( Header_Design::OPTION_NAME, '', [] ),
			[ 'postTypes' => Utility::get_post_types( [], [ 'ys-parts' ] ) ]
		);
		wp_localize_script(
			'ystdtb-header-design',
			'ystdtbHeaderDesignData',
			$param
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
		if ( ! isset( $_post[ Header_Design::OPTION_NAME ] ) ) {
			return false;
		}
		$input = $_post[ Header_Design::OPTION_NAME ];

		return Option::update_option( Header_Design::OPTION_NAME, $input );
	}
}

new Menu_Header_Design();
