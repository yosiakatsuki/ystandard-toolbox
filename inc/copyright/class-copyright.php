<?php
/**
 * Copyright
 *
 * @package ystandard-toolbox
 * @author  yosiakatsuki
 * @license GPL-2.0+
 */

namespace ystandard_toolbox;

use ystandard_toolbox\Util\Version;

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
		if ( ! Version::ystandard_version_compare() ) {
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
		add_filter( 'ystdtb_admin_config', [ $this, 'add_admin_config' ] );
		add_filter( 'ystdtb_update_plugin_settings_all_data', [ $this, 'sanitize_copyright' ] );
	}

	/**
	 * Copyright書き換え
	 *
	 * @param string $text Copyright.
	 *
	 * @return string|string[]
	 */
	public function _copyright( $text ) {
		$copyright = self::get_copyright_option();

		// 変換.
		$copyright = str_replace( '{year}', date_i18n( 'Y' ), $copyright );
		$copyright = str_replace( '{site}', get_bloginfo( 'name', 'display' ), $copyright );
		$copyright = str_replace( '{url}', home_url( '/' ), $copyright );

		return $copyright;
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
	 * デフォルト表示
	 *
	 * @return string
	 */
	public static function get_default() {

		return '&copy; {year} <a href="{url}" rel="home">{site}</a>';
	}

	/**
	 * Copyright設定取得
	 *
	 * @return mixed|string
	 */
	public static function get_copyright_option() {
		$copyright = get_option( 'ys_copyright', self::get_default() );

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

	/**
	 * Copyright設定用データ追加
	 *
	 * @param array $config Configs.
	 *
	 * @return array
	 */
	public function add_admin_config( $config ) {
		$config['copyrightDefault'] = self::get_default();

		return $config;
	}

	/**
	 * Copyrightのサニタイズ
	 *
	 * @param array $settings Settings.
	 *
	 * @return array
	 */
	public function sanitize_copyright( $settings ) {

		if ( ! array_key_exists( 'copyright', $settings ) ) {
			return $settings;
		}
		if ( ! array_key_exists( 'copyright', $settings['copyright'] ) ) {
			return $settings;
		}

		$allowed_html     = wp_kses_allowed_html( 'post' );
		$new_allowed_html = [];
		if ( isset( $allowed_html['a'] ) ) {
			$new_allowed_html['a'] = $allowed_html['a'];
		}
		if ( isset( $allowed_html['span'] ) ) {
			$new_allowed_html['span'] = $allowed_html['span'];
		}
		if ( isset( $allowed_html['br'] ) ) {
			$new_allowed_html['br'] = $allowed_html['br'];
		}
		if ( isset( $allowed_html['strong'] ) ) {
			$new_allowed_html['strong'] = $allowed_html['strong'];
		}
		$settings['copyright']['copyright'] = wp_kses( $settings['copyright']['copyright'], $new_allowed_html );

		return $settings;
	}
}

new Copyright();
