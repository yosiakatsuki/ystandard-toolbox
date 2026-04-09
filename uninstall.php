<?php
/**
 * プラグイン削除時の処理
 *
 * @package ystandard-toolbox
 */

if ( ! defined( 'WP_UNINSTALL_PLUGIN' ) ) {
	die();
}

delete_option( 'ystdtb_non_ystandard_notice_dismissed_until' );
