<?php
/**
 * Init
 *
 * @package ystandard-toolbox
 * @author  yosiakatsuki
 * @license GPL-2.0+
 */

namespace ystandard_toolbox;

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
		$this->check_versions();
		add_filter( 'ys_system_info', [ __CLASS__, 'system_info' ], 11 );
	}

	/**
	 * プラグインの初期化処理
	 */
	public function plugin_init() {
		$result = load_plugin_textdomain(
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
	 * テーマ・プラグインのバージョンチェック
	 */
	private function check_versions() {
		if ( ! Utility::wordpress_version_compare( Config::REQUIRE_WORDPRESS_VERSION ) ) {
			$this->version_warning .= '<li>WordPress : ' . Utility::remove_beta_version( Config::REQUIRE_WORDPRESS_VERSION ) . '</li>';
		}
		if ( ! Utility::ystandard_version_compare( Config::REQUIRE_YSTANDARD_VERSION ) ) {
			$this->version_warning .= '<li>yStandard : ' . Utility::remove_beta_version( Config::REQUIRE_YSTANDARD_VERSION ) . '</li>';
		}
		if ( ! Utility::ystandard_blocks_version_compare( Config::REQUIRE_YSTANDARD_BLOCKS_VERSION ) ) {
			$this->version_warning .= '<li>yStandard Blocks : ' . Utility::remove_beta_version( Config::REQUIRE_YSTANDARD_BLOCKS_VERSION ) . '</li>';
		}
		if ( '' === $this->version_warning ) {
			return;
		}
		$this->version_warning = "
		yStandard Toolboxの全機能を使用するためには以下のバージョンのWordPress・テーマ・プラグインを使用する必要があります。<br>
		<ul>{$this->version_warning}</ul>
		WordPress本体・テーマ・プラグインのアップデートを実施するまでは一部機能が制限されます。
		";
		Notice::set_notice(
			function () {
				Notice::warning( $this->version_warning );
			}
		);
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
