<?php
/**
 * @package ystandard-toolbox
 * @author  yosiakatsuki
 * @license GPL-2.0+
 */

namespace ystandard_toolbox;

defined( 'ABSPATH' ) || die();

/**
 * Class Copyright
 *
 * @package ystandard_toolbox
 */
class Copyright {

	/**
	 * 設定名
	 */
	const OPTION_NAME = 'copyright';

	/**
	 * Font constructor.
	 */
	public function __construct() {
		if ( ! Utility::ystandard_version_compare() ) {
			return;
		}
		add_filter( 'ys_copyright', [ $this, '_copyright' ], 11 );
		add_filter( 'ys_poweredby', [ $this, '_poweredby' ], 11 );
		add_action(
			'customize_register',
			function ( $wp_customize ) {
				$wp_customize->remove_section( 'ys_design_copyright' );
			},
			11
		);

	}

	/**
	 * Copyright書き換え
	 *
	 * @param string $text Copyright.
	 *
	 * @return string|string[]
	 */
	public function _copyright( $text ) {

		return str_replace( '{year}', date_i18n( 'Y' ), self::get_copyright_option() );
	}

	/**
	 * Powered By 書き換え
	 *
	 * @param string $html Powered By.
	 *
	 * @return string
	 */
	public function _poweredby( $html ) {
		if ( self::get_disable_theme_info() ) {
			return '';
		}

		return $html;
	}

	/**
	 * Copyright設定取得
	 *
	 * @return mixed|string
	 */
	public static function get_copyright_option() {
		$copyright = get_option( 'ys_copyright', '' );

		return Option::get_option( Copyright::OPTION_NAME, 'copyright', $copyright );
	}

	/**
	 * Powered By 非表示設定取得
	 *
	 * @return bool
	 */
	public static function get_disable_theme_info() {

		return Option::get_option_by_bool( Copyright::OPTION_NAME, 'disable_theme_info', false );
	}
}

new Copyright();
