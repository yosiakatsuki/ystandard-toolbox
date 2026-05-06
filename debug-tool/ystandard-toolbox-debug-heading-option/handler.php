<?php
/**
 * 見出し設定デバッグ用 admin_post ハンドラ.
 *
 * 削除 / エクスポート / インポートの各処理を提供.
 *
 * @package ystandard-toolbox-debug
 */

defined( 'ABSPATH' ) || die();

/**
 * 削除処理.
 *
 * @return void
 */
function ystdtb_debug_heading_option_handle_delete() {
	if ( ! current_user_can( 'manage_options' ) ) {
		wp_die( esc_html__( 'You do not have sufficient permissions to access this page.' ) );
	}
	check_admin_referer( YSTDTB_DEBUG_HEADING_OPTION_NONCE_ACTION, YSTDTB_DEBUG_HEADING_OPTION_NONCE_NAME );

	$target = isset( $_POST['target'] ) ? sanitize_key( wp_unslash( $_POST['target'] ) ) : '';

	switch ( $target ) {
		case 'v1':
			delete_option( YSTDTB_DEBUG_HEADING_OPTION_KEY_V1 );
			$notice = 'deleted_v1';
			break;
		case 'v2_main':
			delete_option( YSTDTB_DEBUG_HEADING_OPTION_KEY_V2_MAIN );
			$notice = 'deleted_v2_main';
			break;
		case 'v2_level':
			delete_option( YSTDTB_DEBUG_HEADING_OPTION_KEY_V2_LEVEL );
			$notice = 'deleted_v2_level';
			break;
		case 'all':
			delete_option( YSTDTB_DEBUG_HEADING_OPTION_KEY_V1 );
			delete_option( YSTDTB_DEBUG_HEADING_OPTION_KEY_V2_MAIN );
			delete_option( YSTDTB_DEBUG_HEADING_OPTION_KEY_V2_LEVEL );
			$notice = 'deleted_all';
			break;
		default:
			wp_die( esc_html__( '不正な削除対象です。', 'ystandard-toolbox' ) );
	}

	ystdtb_debug_heading_option_clear_cache();
	ystdtb_debug_heading_option_redirect_with_notice( $notice );
}
add_action( 'admin_post_ystdtb_debug_heading_option_delete', 'ystdtb_debug_heading_option_handle_delete' );

/**
 * エクスポート処理.
 *
 * 現在保存されている option 値を JSON ファイルとして出力する.
 *
 * @return void
 */
function ystdtb_debug_heading_option_handle_export() {
	if ( ! current_user_can( 'manage_options' ) ) {
		wp_die( esc_html__( 'You do not have sufficient permissions to access this page.' ) );
	}
	check_admin_referer( YSTDTB_DEBUG_HEADING_OPTION_NONCE_ACTION, YSTDTB_DEBUG_HEADING_OPTION_NONCE_NAME );

	$v1       = get_option( YSTDTB_DEBUG_HEADING_OPTION_KEY_V1, null );
	$v2_main  = get_option( YSTDTB_DEBUG_HEADING_OPTION_KEY_V2_MAIN, null );
	$v2_level = get_option( YSTDTB_DEBUG_HEADING_OPTION_KEY_V2_LEVEL, null );

	$payload = [
		'exported_at' => wp_date( 'c' ),
		'site_url'    => home_url(),
		'options'     => [
			YSTDTB_DEBUG_HEADING_OPTION_KEY_V1       => false === $v1 ? null : $v1,
			YSTDTB_DEBUG_HEADING_OPTION_KEY_V2_MAIN  => false === $v2_main ? null : $v2_main,
			YSTDTB_DEBUG_HEADING_OPTION_KEY_V2_LEVEL => false === $v2_level ? null : $v2_level,
		],
	];

	$filename = 'ystdtb-heading-options-' . wp_date( 'YmdHis' ) . '.json';
	$json     = wp_json_encode( $payload, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES );

	nocache_headers();
	header( 'Content-Type: application/json; charset=utf-8' );
	header( 'Content-Disposition: attachment; filename="' . $filename . '"' );
	echo $json; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped -- JSON ダウンロード出力のため.
	exit;
}
add_action( 'admin_post_ystdtb_debug_heading_option_export', 'ystdtb_debug_heading_option_handle_export' );

/**
 * インポート処理.
 *
 * アップロードされた JSON ファイルから option を書き戻す.
 *
 * @return void
 */
function ystdtb_debug_heading_option_handle_import() {
	if ( ! current_user_can( 'manage_options' ) ) {
		wp_die( esc_html__( 'You do not have sufficient permissions to access this page.' ) );
	}
	check_admin_referer( YSTDTB_DEBUG_HEADING_OPTION_NONCE_ACTION, YSTDTB_DEBUG_HEADING_OPTION_NONCE_NAME );

	if ( empty( $_FILES['import_file']['tmp_name'] ) ) {
		ystdtb_debug_heading_option_redirect_with_notice( 'import_error_no_file' );
	}
	if ( ! empty( $_FILES['import_file']['error'] ) ) {
		ystdtb_debug_heading_option_redirect_with_notice( 'import_error_upload' );
	}

	$tmp_name = sanitize_text_field( wp_unslash( $_FILES['import_file']['tmp_name'] ) );
	$contents = file_get_contents( $tmp_name ); // phpcs:ignore WordPress.WP.AlternativeFunctions.file_get_contents_file_get_contents -- 一時ファイル読み込みのため.
	if ( false === $contents ) {
		ystdtb_debug_heading_option_redirect_with_notice( 'import_error_upload' );
	}

	$data = json_decode( $contents, true );
	if ( null === $data || ! is_array( $data ) ) {
		ystdtb_debug_heading_option_redirect_with_notice( 'import_error_invalid_json' );
	}
	if ( ! isset( $data['options'] ) || ! is_array( $data['options'] ) ) {
		ystdtb_debug_heading_option_redirect_with_notice( 'import_error_invalid_format' );
	}

	$allowed_keys = [
		YSTDTB_DEBUG_HEADING_OPTION_KEY_V1,
		YSTDTB_DEBUG_HEADING_OPTION_KEY_V2_MAIN,
		YSTDTB_DEBUG_HEADING_OPTION_KEY_V2_LEVEL,
	];

	foreach ( $allowed_keys as $key ) {
		if ( ! array_key_exists( $key, $data['options'] ) ) {
			continue;
		}
		$value = $data['options'][ $key ];

		if ( is_null( $value ) ) {
			delete_option( $key );
			continue;
		}
		if ( is_array( $value ) ) {
			update_option( $key, $value );
		}
	}

	ystdtb_debug_heading_option_clear_cache();
	ystdtb_debug_heading_option_redirect_with_notice( 'imported' );
}
add_action( 'admin_post_ystdtb_debug_heading_option_import', 'ystdtb_debug_heading_option_handle_import' );
