<?php
/**
 * CTA
 *
 * @package ystandard-toolbox
 * @author  yosiakatsuki
 * @license GPL-2.0+
 */

namespace ystandard_toolbox;

defined( 'ABSPATH' ) || die();

/**
 * Class CTA
 *
 * @package ystandard_toolbox
 */
class CTA {

	/**
	 * 設定名
	 */
	const OPTION_NAME = 'cta';

	/**
	 * CTA constructor.
	 */
	public function __construct() {
		$this->load_files();
	}

	/**
	 * 関連ファイルの読み込み
	 */
	private function load_files() {
		require_once __DIR__ . '/class-cta-sort.php';
	}
}

new CTA();
