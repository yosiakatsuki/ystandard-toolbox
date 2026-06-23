<?php
/**
 * V2 Switch
 *
 * @package ystandard-toolbox
 * @author  yosiakatsuki
 * @license GPL-2.0+
 */

namespace ystandard_toolbox;

defined( 'ABSPATH' ) || die();

/**
 * Class V2_Switch
 *
 * @package ystandard_toolbox
 */
class V2_Switch {

	/**
	 * オプション名
	 */
	const OPTION_NAME = 'v2_switch';

	/**
	 * V1アップデートキー
	 */
	const UPDATE_KEY_V1 = 'jgtmvhneyxrp';

	/**
	 * V2アップデートキー
	 */
	const UPDATE_KEY_V2 = 'Qz4PCHRZv2';

	/**
	 * Notice非表示期限保存用メタキー
	 */
	const NOTICE_HIDE_META_KEY = 'ystdtb_v2_switch_notice_hidden_until';

	/**
	 * Notice非表示リクエスト名
	 */
	const NOTICE_HIDE_REQUEST_NAME = 'ystdtb_v2_switch_notice';

	/**
	 * Notice非表示リクエスト値
	 */
	const NOTICE_HIDE_REQUEST_VALUE = 'hide';

	/**
	 * Notice非表示nonceアクション
	 */
	const NOTICE_HIDE_NONCE_ACTION = 'ystdtb_v2_switch_notice_hide';

	/**
	 * V2_Switch constructor.
	 */
	public function __construct() {
		if ( ! is_admin() ) {
			return;
		}
		add_action( 'admin_init', [ $this, 'hide_notice' ] );
		Notice::set_notice( [ $this, 'notice' ] );
	}

	/**
	 * V2切り替えが有効か
	 *
	 * @return bool
	 */
	public static function is_enabled() {
		return Option::get_option_by_bool( self::OPTION_NAME, 'enable', false );
	}

	/**
	 * アップデートキー取得
	 *
	 * @return string
	 */
	public static function get_update_key() {
		if ( self::is_enabled() ) {
			return self::UPDATE_KEY_V2;
		}

		return self::UPDATE_KEY_V1;
	}

	/**
	 * 設定画面URL取得
	 *
	 * @return string
	 */
	public static function get_menu_url() {
		return admin_url( 'admin.php?page=' . Config::ADMIN_MENU_PAGE_PREFIX . '-v2-switch' );
	}

	/**
	 * Noticeの1か月非表示
	 */
	public function hide_notice() {
		if ( ! current_user_can( 'manage_options' ) ) {
			return;
		}
		if ( ! isset( $_GET[ self::NOTICE_HIDE_REQUEST_NAME ] ) ) {
			return;
		}
		$request = sanitize_text_field( wp_unslash( $_GET[ self::NOTICE_HIDE_REQUEST_NAME ] ) );
		if ( self::NOTICE_HIDE_REQUEST_VALUE !== $request ) {
			return;
		}
		$nonce = isset( $_GET['_wpnonce'] ) ? sanitize_text_field( wp_unslash( $_GET['_wpnonce'] ) ) : '';
		if ( ! wp_verify_nonce( $nonce, self::NOTICE_HIDE_NONCE_ACTION ) ) {
			return;
		}
		update_user_meta( get_current_user_id(), self::NOTICE_HIDE_META_KEY, time() + MONTH_IN_SECONDS );

		wp_safe_redirect(
			remove_query_arg(
				[
					self::NOTICE_HIDE_REQUEST_NAME,
					'_wpnonce',
				]
			)
		);
		exit;
	}

	/**
	 * Notice表示
	 */
	public function notice() {
		if ( ! $this->should_show_notice() ) {
			return;
		}
		$setting_url = self::get_menu_url();
		$hide_url    = wp_nonce_url(
			add_query_arg( self::NOTICE_HIDE_REQUEST_NAME, self::NOTICE_HIDE_REQUEST_VALUE ),
			self::NOTICE_HIDE_NONCE_ACTION
		);

		$content  = '<p>';
		$content .= esc_html__( 'yStandard Toolbox v2が利用できるようになりました🎉 ', 'ystandard-toolbox' );
		$content .= '<br>';
		$content .= esc_html__( 'v2では大きな変更を伴うアップデートが含まれています。', 'ystandard-toolbox' );
		$content .= '<br>';
		$content .= esc_html__( 'v2へのアップデートを有効にするにはv2切り替え設定画面からアップデートを有効にしてください。', 'ystandard-toolbox' );
		$content .= '<br>';
		$content .= esc_html__( '詳しくは', 'ystandard-toolbox' );
		$content .= sprintf(
			'<a href="%1$s" target="_blank" rel="noreferrer noopener">%2$s</a>',
			esc_url( 'https://wp-ystandard.com/ystandard-toolbox-v2-0/' ),
			esc_html__( 'アップデート情報', 'ystandard-toolbox' )
		);
		$content .= esc_html__( 'をご確認ください。', 'ystandard-toolbox' );
		$content .= '</p>';
		$content .= '<p>';
		$content .= sprintf(
			'<a class="button button-primary" href="%1$s">%2$s</a> <a class="button" href="%3$s">%4$s</a>',
			esc_url( $setting_url ),
			esc_html__( 'v2切り替え設定を開く', 'ystandard-toolbox' ),
			esc_url( $hide_url ),
			esc_html__( '1か月表示しない', 'ystandard-toolbox' )
		);
		$content .= '</p>';

		Notice::info( $content );
	}

	/**
	 * Noticeを表示するか
	 *
	 * @return bool
	 */
	private function should_show_notice() {
		if ( ! current_user_can( 'manage_options' ) ) {
			return false;
		}
		if ( $this->is_v2_switch_page() ) {
			return false;
		}
		if ( self::is_enabled() ) {
			return false;
		}
		if ( version_compare( YSTDTB_VERSION, '2.0.0', '>=' ) ) {
			return false;
		}
		$hidden_until = (int) get_user_meta( get_current_user_id(), self::NOTICE_HIDE_META_KEY, true );
		if ( time() < $hidden_until ) {
			return false;
		}

		return true;
	}

	/**
	 * V2切り替え設定画面か
	 *
	 * @return bool
	 */
	private function is_v2_switch_page() {
		// phpcs:ignore WordPress.Security.NonceVerification.Recommended -- 表示判定のみで値は保存しない.
		if ( ! isset( $_GET['page'] ) ) {
			return false;
		}
		// phpcs:ignore WordPress.Security.NonceVerification.Recommended -- 表示判定のみで値は保存しない.
		$page = sanitize_text_field( wp_unslash( $_GET['page'] ) );

		return Config::ADMIN_MENU_PAGE_PREFIX . '-v2-switch' === $page;
	}
}

new V2_Switch();
