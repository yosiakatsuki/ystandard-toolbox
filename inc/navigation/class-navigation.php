<?php
/**
 * Navigation
 *
 * @package ystandard-toolbox
 * @author  yosiakatsuki
 * @license GPL-2.0+
 */

namespace ystandard_toolbox;

defined( 'ABSPATH' ) || die();

/**
 * Class Navigation
 *
 * @package ystandard_toolbox
 */
class Navigation {

	/**
	 * 設定名
	 */
	const OPTION_NAME = 'navigation';

	/**
	 * Navigation constructor.
	 */
	public function __construct() {
		$this->load_files();
	}

	/**
	 * 関連ファイルの読み込み
	 */
	private function load_files() {
		require_once __DIR__ . '/class-drawer-menu.php';
		require_once __DIR__ . '/class-menu-replace.php';
	}

	/**
	 * ドロワーメニュー開始サイズ取得
	 *
	 * @return int
	 */
	public static function get_drawer_menu_start() {
		return apply_filters( 'ys_get_drawer_menu_start', 768 );
	}
}

new Navigation();
