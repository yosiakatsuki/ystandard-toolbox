<?php
/**
 * Init
 *
 * @package ystandard-toolbox
 * @author  yosiakatsuki
 * @license GPL-2.0+
 */

namespace ystandard_toolbox;

use ystandard_toolbox\Util\Version;

defined( 'ABSPATH' ) || die();

/**
 * Class Init
 *
 * @package ystandard_toolbox
 */
class Init {

	/**
	 * バージョンチェック警告文
	 *
	 * @var string
	 */
	private $version_warning = '';

	/**
	 * Init constructor.
	 */
	public function __construct() {
		add_action( 'after_setup_theme', [ $this, 'plugin_init' ] );
		add_filter( 'body_class', [ $this, 'body_class' ], 20 );
		add_filter( 'ys_system_info', [ __CLASS__, 'system_info' ], 11 );
		// 使用版チェックとバージョンチェック.
		if ( ! $this->is_trial() ) {
			$this->check_versions();
		}
	}

	/**
	 * プラグインの初期化処理
	 */
	public function plugin_init() {
		load_plugin_textdomain(
			Config::TEXT_DOMAIN,
			false,
			dirname( YSTDTB_NAME ) . '/languages'
		);
	}

	/**
	 * Body Class.
	 *
	 * @param array $classes classes.
	 *
	 * @return array
	 */
	public function body_class( $classes ) {
		$classes[] = Config::BODY_CLASS;

		return $classes;
	}

	/**
	 * 試用版チェック
	 *
	 * @return bool
	 */
	private function is_trial() {
		$update_checker_path = YSTDTB_PATH . '/library/plugin-update-checker/plugin-update-checker.php';
		// アップデートチェッカーの存在確認.
		if ( file_exists( $update_checker_path ) ) {
			return false;
		}
		// 試用版の場合の注意文表示.
		Notice::set_notice(
			function () {
				Notice::warning(
					__( 'このyStandard Toolboxは検証のために作成されたバージョンです。機能が不足していたり、不具合が多く含まれる可能性があります。', 'ystandard-toolbox' ) . '<br>' .
					__( 'また、管理画面からのアップデートを構成するファイルが含まれていないため、アップデートは最新ファイルを「プラグインを追加」から手動でアップロードしてインストールしてください。', 'ystandard-toolbox' )
				);
			}
		);
		return true;
	}

	/**
	 * 非yStandardテーマ通知の非表示オプション名
	 */
	const OPTION_DISMISS_NON_YSTANDARD_NOTICE = 'ystdtb_non_ystandard_notice_dismissed_until';

	/**
	 * 非yStandardテーマ通知の非表示アクション名
	 */
	const ACTION_DISMISS_NON_YSTANDARD_NOTICE = 'ystdtb_dismiss_non_ystandard_notice';

	/**
	 * テーマ・プラグインのバージョンチェック
	 */
	private function check_versions() {
		// WordPressバージョンチェック（テーマに関わらず実施）.
		if ( ! Version::wordpress_version_compare( Config::REQUIRE_WORDPRESS_VERSION ) ) {
			$this->version_warning .= '<li>WordPress : ' . Version::remove_beta_version( Config::REQUIRE_WORDPRESS_VERSION ) . '</li>';
		}

		if ( Version::ystandard_version_compare() ) {
			// yStandardテーマの場合: バージョンチェック.
			$this->check_ystandard_versions();
		} else {
			// yStandard以外のテーマの場合: 連携機能の通知.
			$this->maybe_show_non_ystandard_notice();
		}

		// WordPressバージョン警告の表示.
		if ( '' !== $this->version_warning ) {
			$this->version_warning = sprintf(
				'yStandard Toolboxの全機能を使用するためには以下のバージョンのWordPress・テーマ・プラグインを使用する必要があります。<br><ul>%s</ul>WordPress本体・テーマ・プラグインのアップデートを実施するまでは一部機能が制限されます。',
				$this->version_warning
			);
			Notice::set_notice(
				function () {
					Notice::warning( $this->version_warning );
				}
			);
		}
	}

	/**
	 * yStandardテーマのバージョンチェック
	 */
	private function check_ystandard_versions() {
		if ( ! Version::ystandard_version_compare( Config::REQUIRE_YSTANDARD_VERSION ) ) {
			$this->version_warning .= '<li>yStandard : ' . Version::remove_beta_version( Config::REQUIRE_YSTANDARD_VERSION ) . '</li>';
		}
		if ( ! Version::ystandard_blocks_version_compare( Config::REQUIRE_YSTANDARD_BLOCKS_VERSION ) ) {
			$this->version_warning .= '<li>yStandard Blocks : ' . Version::remove_beta_version( Config::REQUIRE_YSTANDARD_BLOCKS_VERSION ) . '</li>';
		}
	}

	/**
	 * 非yStandardテーマの通知表示（非表示期間中はスキップ）
	 */
	private function maybe_show_non_ystandard_notice() {
		$dismissed_until = get_option( self::OPTION_DISMISS_NON_YSTANDARD_NOTICE, 0 );
		if ( $dismissed_until && time() < (int) $dismissed_until ) {
			return;
		}

		add_action( 'admin_post_' . self::ACTION_DISMISS_NON_YSTANDARD_NOTICE, [ $this, 'handle_dismiss_non_ystandard_notice' ] );

		Notice::set_notice(
			function () {
				if ( ! current_user_can( 'manage_options' ) ) {
					return;
				}
				$dismiss_url = wp_nonce_url(
					admin_url( 'admin-post.php?action=' . self::ACTION_DISMISS_NON_YSTANDARD_NOTICE ),
					self::ACTION_DISMISS_NON_YSTANDARD_NOTICE
				);
				$message     = sprintf(
					'<div style="display: flex; flex-wrap: wrap; justify-content: space-between; align-items: center;"><span>%s</span><p style="margin: 0;"><a href="%s">%s</a></p></div>',
					esc_html__( 'お使いのテーマではyStandard ToolboxのyStandardテーマ連携機能は利用できません。', 'ystandard-toolbox' ),
					esc_url( $dismiss_url ),
					esc_html__( '12ヶ月非表示にする', 'ystandard-toolbox' )
				);
				Notice::info( $message );
			}
		);
	}

	/**
	 * 非yStandardテーマ通知の非表示処理
	 */
	public function handle_dismiss_non_ystandard_notice() {
		if ( ! current_user_can( 'manage_options' ) ) {
			wp_die( esc_html__( '権限がありません。', 'ystandard-toolbox' ) );
		}
		check_admin_referer( self::ACTION_DISMISS_NON_YSTANDARD_NOTICE );

		// 12ヶ月後のタイムスタンプを保存.
		$dismissed_until = time() + YEAR_IN_SECONDS;
		update_option( self::OPTION_DISMISS_NON_YSTANDARD_NOTICE, $dismissed_until, false );

		wp_safe_redirect( wp_get_referer() ? wp_get_referer() : admin_url() );
		exit;
	}

	/**
	 * ファイルのビルドチェック
	 *
	 * @return bool
	 */
	public static function check_build_files() {
		if ( file_exists( YSTDTB_PATH . '/css' ) && file_exists( YSTDTB_PATH . '/js' ) ) {
			return true;
		}
		Notice::set_notice(
			function () {
				Notice::error( '<div style="padding: 1em 0.5em;line-height: 2;">このyStandard Toolboxは正しくセットアップされていません。<br><a href="https://support.wp-ystandard.com/shop/" target="_blank" rel="nofollow noreferrer noopener">公式サイト</a>よりプラグインをご購入ください。<br>もし購入されている場合は<a href="https://support.wp-ystandard.com/my-account/" target="_blank" rel="nofollow noreferrer noopener">マイページ</a>より再度ダウンロードし、プラグインを再インストールしてください。</div>' );
			}
		);

		return false;
	}

	/**
	 * システム情報
	 *
	 * @param array $info システム情報.
	 *
	 * @return array
	 */
	public static function system_info( $info ) {
		$info[] = 'yStandard Toolbox バージョン: ' . YSTDTB_VERSION;

		return $info;
	}
}

new Init();
