<?php
/**
 * Design
 *
 * @package ystandard-toolbox
 * @author  yosiakatsuki
 * @license GPL-2.0+
 */

namespace ystandard_toolbox;

use ystandard_toolbox\Util\Version;

defined( 'ABSPATH' ) || die();

/**
 * Class Design
 *
 * @package ystandard_toolbox
 */
class Design {

	/**
	 * Design constructor.
	 */
	public function __construct() {
		add_filter( 'ystdtb_plugin_settings_submenus', [ $this, 'add_submenu' ] );
	}

	/**
	 * サブメニュー登録
	 *
	 * @param array $submenus サブメニュー一覧.
	 *
	 * @return array
	 */
	public function add_submenu( $submenus ) {
		if ( ! Version::ystandard_version_compare() ) {
			return $submenus;
		}
		$submenus[] = [
			'slug'       => 'design',
			'page-title' => 'サイトデザイン拡張',
			'menu-title' => 'サイトデザイン拡張',
			'priority'   => 20,
		];

		return $submenus;
	}
}

new Design();
