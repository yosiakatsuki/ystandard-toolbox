<?php
/**
 * Update
 *
 * @package ystandard-toolbox
 * @author  yosiakatsuki
 * @license GPL-2.0+
 */

namespace ystandard_toolbox;

defined( 'ABSPATH' ) || die();

/**
 * Class Update
 *
 * @package ystandard_toolbox
 */
class Update {

	/**
	 * Update constructor.
	 */
	public function __construct() {
		add_action( 'after_setup_theme', [ $this, 'check' ] );
	}

	/**
	 * アップデートチェック
	 */
	public function check() {
		if ( ! is_admin() ) {
			return;
		}
		require_once YSTDTB_PATH . '/library/plugin-update-checker/plugin-update-checker.php';
		$dir = apply_filters( 'ys_update_check_dir', '' );
		$url = "https://wp-ystandard.com/download/ystandard/plugin/ystandard-toolbox${dir}/ystandard-toolbox.json";
		\Puc_v4_Factory::buildUpdateChecker(
			$url,
			YSTDTB_PATH . '/ystandard-toolbox.php',
			'yStandard Toolbox'
		);
	}
}

new Update();
