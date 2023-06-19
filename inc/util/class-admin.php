<?php
/**
 * 管理画面関連
 *
 * @package ystandard-toolbox
 * @author  yosiakatsuki
 * @license GPL-2.0+
 */

namespace ystandard_toolbox\Util;

defined( 'ABSPATH' ) || die();

class Admin {
	/**
	 * メニューアイコン取得
	 *
	 * @return string
	 */
	public static function get_menu_icon() {
		$icon = File::file_get_contents( YSTDTB_PATH . '/assets/menu/toolbox.svg' );

		if ( $icon ) {
			$icon = 'data:image/svg+xml;base64,' . base64_encode( $icon );
		}

		return $icon;
	}

	/**
	 * Nonceチェック
	 *
	 * @param string $name   Name.
	 * @param string $action Action.
	 *
	 * @return bool|int
	 */
	public static function verify_nonce( $name, $action ) {
		// nonceがセットされているかどうか確認.
		if ( ! isset( $_POST[ $name ] ) ) {
			return false;
		}

		return wp_verify_nonce( $_POST[ $name ], $action );
	}
}
