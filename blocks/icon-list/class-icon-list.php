<?php
/**
 * Block Config : List Icon.
 *
 * @package ystandard-toolbox
 * @author  yosiakatsuki
 * @license GPL-2.0+
 */

namespace ystandard_toolbox\blocks\icon_list;

use ystandard_toolbox\Config;

defined( 'ABSPATH' ) || die();

/**
 * Class Block_Config
 *
 * @package ystandard_toolbox\blocks\icon_list
 */
class Block_Config {
	/**
	 * Block_Config constructor.
	 */
	public function __construct() {
		add_filter( Config::BLOCK_EDITOR_OPTION_HOOK, [ $this, 'add_block_config' ] );
	}

	/**
	 * ブロック設定の追加
	 *
	 * @param array $options Options.
	 *
	 * @return array
	 */
	public function add_block_config( $options ) {

		$options['listIcons'] = [];

		return $options;
	}
}

new Block_Config();
