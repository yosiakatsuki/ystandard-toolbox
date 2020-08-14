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
	 * 必要なyStandardバージョン
	 */
	const REQUIRE_YSTANDARD_VERSION = '4.9.0';
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
		add_filter( 'body_class', [ $this, 'body_class' ] );
		$this->check_versions();
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
		if ( ! Utility::ystandard_version_compare( self::REQUIRE_YSTANDARD_VERSION ) ) {
			$this->version_warning .= '<li>yStandard : ' . self::REQUIRE_YSTANDARD_VERSION . '</li>';
		}
		$blocks = apply_filters( 'ystdb_get_version', '' );
		if ( '' === $blocks || version_compare( $blocks, self::REQUIRE_YSTANDARD_BLOCKS_VERSION, '<' ) ) {
			$this->version_warning .= '<li>yStandard Blocks : ' . self::REQUIRE_YSTANDARD_BLOCKS_VERSION . '</li>';
		}
		if ( '' === $this->version_warning ) {
			return;
		}
		$this->version_warning = "
		yStandard Toolboxの全機能を使用するためには以下のバージョンのテーマ・プラグインを使用する必要があります。<br>
		<ul>{$this->version_warning}</ul>
		テーマ・プラグインのアップデートを実施するまでは一部機能が制限されます。
		";
		Notice::set_notice(
			function () {
				Notice::warning( $this->version_warning );
			}
		);
	}
}

new Init();
