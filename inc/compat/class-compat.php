<?php
/**
 * 互換処理
 *
 * @package ystandard-toolbox
 */

namespace ystandard_toolbox;
use ystandard_toolbox\Util\Version;

defined( 'ABSPATH' ) || die();

/**
 * Class Compat.
 */
class Compat {

	/**
	 * Instance.
	 *
	 * @var Compat
	 */
	private static $instance;

	/**
	 * Constructor.
	 */
	private function __construct() {
		add_filter( 'ystdtb_css_breakpoints', [ $this, 'get_ystandard_v4_css_breakpoints' ], 9999 );
		add_filter( 'ystdtb_css_breakpoint_unit', [ $this, 'get_ystandard_v4_breakpoint_unit' ] );
	}

	/**
	 * Instance.
	 *
	 * @return Compat
	 */
	public static function get_instance() {
		if ( ! isset( self::$instance ) ) {
			self::$instance = new self();
		}

		return self::$instance;
	}


	/**
	 * v4のCSSブレイクポイントを返す
	 *
	 * @param array $breakpoints ブレイクポイントの配列。
	 * @return array ブレイクポイントの配列。
	 */
	public function get_ystandard_v4_css_breakpoints( $breakpoints ) {

		if ( ! $this->is_ystandard_v4() ) {
			return $breakpoints;
		}

		return [
			'mobile'  => 600,
			'tablet'  => 600,
			'desktop' => 769,
			'large'   => 1025,
		];
	}

	/**
	 * v4のブレイクポイント単位を返す
	 *
	 * @param string $unit ブレイクポイントの単位。
	 * @return string ブレイクポイントの単位。
	 */
	function get_ystandard_v4_breakpoint_unit( $unit ) {
		if ( ! $this->is_ystandard_v4() ) {
			return $unit;
		}

		return 'px';
	}



	/**
	 * yStandard v4系かどうかを判定.
	 *
	 * @return bool
	 */
	private function is_ystandard_v4() {
		if ( ! Version::ystandard_version_compare() ) {
			return false;
		}

		$theme         = wp_get_theme( get_template() );
		$theme_version = Version::remove_beta_version( $theme->version );

		return version_compare( $theme_version, '5.0.0', '<' );
	}

}

Compat::get_instance();
