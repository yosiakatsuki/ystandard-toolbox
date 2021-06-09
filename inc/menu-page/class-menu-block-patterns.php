<?php
/**
 * Block Pattern
 *
 * @package ystandard-toolbox
 * @author  yosiakatsuki
 * @license GPL-2.0+
 */

namespace ystandard_toolbox\menu;

use ystandard_toolbox\Block_Patterns;
use ystandard_toolbox\Plugin_Menu;
use ystandard_toolbox\Option;
use ystandard_toolbox\Utility;

defined( 'ABSPATH' ) || die();

/**
 * Class Menu_Block_Patterns
 *
 * @package ystandard_toolbox\menu
 */
class Menu_Block_Patterns extends Menu_Page_Base {

	/**
	 * Code constructor.
	 */
	public function __construct() {
		if ( ! Block_Patterns::is_enable_block_pattern() ) {
			return;
		}
		parent::__construct();
		$this->menu_slug     = 'block-patterns';
		$this->menu_title    = 'ブロックパターン設定';
		$this->menu_label    = 'ブロックパターン設定';
		$this->template_name = 'block-patterns';
	}

	/**
	 * 設定保存
	 *
	 * @param array $_post 設定値.
	 */
	public function save( $_post ) {
		if ( ! isset( $_post[ Block_Patterns::OPTION_NAME ] ) ) {
			return false;
		}
		$input                         = $_post[ Block_Patterns::OPTION_NAME ];
		$input['disable_core_pattern'] = isset( $input['disable_core_pattern'] ) ? Utility::to_bool( $input['disable_core_pattern'] ) : false;

		return Option::update_option( Block_Patterns::OPTION_NAME, $input );
	}


}

new Menu_Block_Patterns();
