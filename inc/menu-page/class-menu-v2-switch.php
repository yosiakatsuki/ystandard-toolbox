<?php
/**
 * V2 Switch Menu
 *
 * @package ystandard-toolbox
 * @author  yosiakatsuki
 * @license GPL-2.0+
 */

namespace ystandard_toolbox\menu;

use ystandard_toolbox\Option;
use ystandard_toolbox\Utility;
use ystandard_toolbox\V2_Switch;

defined( 'ABSPATH' ) || die();

/**
 * Class Menu_V2_Switch
 *
 * @package ystandard_toolbox\menu
 */
class Menu_V2_Switch extends Menu_Page_Base {

	/**
	 * Menu_V2_Switch constructor.
	 */
	public function __construct() {
		parent::__construct();
		$this->menu_slug     = 'v2-switch';
		$this->menu_title    = 'v2切り替え設定';
		$this->menu_label    = 'v2切り替え';
		$this->template_name = 'v2-switch';
	}

	/**
	 * 設定保存
	 *
	 * @param array $_post 設定値.
	 *
	 * @return bool
	 */
	public function save( $_post ) {
		if ( ! isset( $_post[ V2_Switch::OPTION_NAME ] ) ) {
			return false;
		}
		$input = wp_unslash( $_post[ V2_Switch::OPTION_NAME ] );

		return Option::update_option(
			V2_Switch::OPTION_NAME,
			[
				'enable' => isset( $input['enable'] ) ? Utility::to_bool( $input['enable'] ) : false,
			]
		);
	}
}

new Menu_V2_Switch();
