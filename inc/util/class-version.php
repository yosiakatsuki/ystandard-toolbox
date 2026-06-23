<?php
/**
 * バージョン関連
 *
 * @package ystandard-toolbox
 * @author  yosiakatsuki
 * @license GPL-2.0+
 */

namespace ystandard_toolbox\Util;

defined( 'ABSPATH' ) || die();

/**
 * Class Version Utility
 */
class Version {
	/**
	 * WordPressのバージョンチェック
	 *
	 * @param string $version バージョン.
	 *
	 * @return bool|int
	 */
	public static function wordpress_version_compare( $version ) {

		$wp_version = get_bloginfo( 'version' );

		return version_compare( $wp_version, $version, '>=' );
	}

	/**
	 * テーマのバージョンチェック
	 *
	 * @param string $version バージョン.
	 *
	 * @return bool|int
	 */
	public static function ystandard_version_compare( $version = '' ) {
		if ( 'ystandard' !== get_template() ) {
			return false;
		}
		// バージョンの確認不要であればテーマの確認のみ.
		if ( '' === $version ) {
			return true;
		}
		$pre_version = apply_filters( 'ys_ystandard_version', null );
		if ( is_null( $pre_version ) ) {
			$theme = wp_get_theme( get_template() );
			if ( is_null( $theme ) ) {
				return false;
			}
			$theme_version = $theme->version;
		} else {
			$theme_version = $pre_version;
		}

		return version_compare( $theme_version, $version, '>=' );
	}


	/**
	 *  [yStandard Blocks]のバージョンチェック
	 *
	 * @param string $version バージョン.
	 *
	 * @return bool|int
	 */
	public static function ystandard_blocks_version_compare( $version = '' ) {

		$blocks = apply_filters( 'ystdb_get_version', '' );
		if ( '' === $blocks ) {
			return false;
		}
		// バージョンの確認不要であればプラグインの確認のみ.
		if ( '' === $version ) {
			return true;
		}

		return version_compare( $blocks, $version, '>=' );
	}

	/**
	 * バージョン文字列からベータ・アルファ情報の削除.
	 *
	 * @param string $version バージョン文字列.
	 *
	 * @return string
	 */
	public static function remove_beta_version( $version ) {

		return preg_replace(
			'/\-(beta|alpha)\-\d+/i',
			'',
			$version
		);
	}
}
