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
		add_action( 'after_setup_theme', [ $this, 'update_check' ] );
	}

	/**
	 * アップデートチェック
	 */
	public function update_check() {
		if ( ! is_admin() ) {
			return;
		}
		$update_checker_path = YSTDTB_PATH . '/library/plugin-update-checker/plugin-update-checker.php';
		// アップデートチェッカーの存在確認.
		if ( ! file_exists( $update_checker_path ) ) {
			return;
		}
		// アップデートチェッカーの読み込み.
		require_once $update_checker_path;
		// チェックするディレクトリをフィルターで変更可能に.
		$dir = apply_filters( 'ys_update_check_dir', '' );
		// アップデート情報ファイルURL.
		$url = "https://wp-ystandard.com/download/ystandard/plugin/ystandard-toolbox/Qz4PCHRZv2{$dir}/ystandard-toolbox.json";
		// アップデートチェッカーの初期化・実行.
		\YahnisElsts\PluginUpdateChecker\v5\PucFactory::buildUpdateChecker(
			$url,
			YSTDTB_PATH . '/ystandard-toolbox.php',
			'yStandard Toolbox'
		);
	}
}

new Update();
