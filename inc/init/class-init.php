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
	 * 必要なWordPressバージョン
	 */
	const REQUIRE_WORDPRESS_VERSION = '5.5.0';

	/**
	 * 必要なyStandardバージョン
	 */
	const REQUIRE_YSTANDARD_VERSION = '4.13.1';
	/**
	 * 必要なyStandard Blocksバージョン
	 */
	const REQUIRE_YSTANDARD_BLOCKS_VERSION = '2.1.0';

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
		add_filter( 'body_class', [ $this, 'body_class' ] );
		$this->check_versions();
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
		if ( ! Utility::wordpress_version_compare( self::REQUIRE_WORDPRESS_VERSION ) ) {
			$this->version_warning .= '<li>WordPress : ' . self::REQUIRE_WORDPRESS_VERSION . '</li>';
		}
		if ( ! Utility::ystandard_version_compare( self::REQUIRE_YSTANDARD_VERSION ) ) {
			$this->version_warning .= '<li>yStandard : ' . self::REQUIRE_YSTANDARD_VERSION . '</li>';
		}
		if ( ! Utility::ystandard_blocks_version_compare( self::REQUIRE_YSTANDARD_BLOCKS_VERSION ) ) {
			$this->version_warning .= '<li>yStandard Blocks : ' . self::REQUIRE_YSTANDARD_BLOCKS_VERSION . '</li>';
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
				Notice::error( '<div style="padding: 1em 0.5em;line-height: 2;">このyStandard Toolboxは正しくセットアップされていません。<br><a href="https://support.wp-ystandard.com/shop/" target="_blank" rel="nofollow noreferrer noopener">公式サイト</a>よりプラグインをご購入ください。<br>もし購入されている場合は<a href="https://support.wp-ystandard.com/my-account/" target="_blank" rel="nofollow noreferrer noopener">マイページ</a>より再度ダウンロードし、プラグインをインストールし直してください。</div>' );
			}
		);
	}
}

new Init();
