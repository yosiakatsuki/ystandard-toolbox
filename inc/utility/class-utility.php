<?php
/**
 * @package ystandard-toolbox
 * @author  yosiakatsuki
 * @license GPL-2.0+
 */

namespace ystandard_toolbox;

defined( 'ABSPATH' ) || die();

/**
 * Class Utility
 *
 * @package ystandard_toolbox
 */
class Utility {

	/**
	 * AMPが有効か
	 *
	 * @return bool
	 */
	public static function is_amp() {

		if ( function_exists( 'ys_is_amp' ) && ys_is_amp() ) {
			return ys_is_amp();
		}

		return function_exists( 'is_amp_endpoint' ) && is_amp_endpoint();
	}

	/**
	 * AMPが使えるか
	 */
	public static function is_amp_enable() {
		return function_exists( 'is_amp_endpoint' );
	}

	/**
	 * ショートコードようにパラメーターを展開
	 *
	 * @param array $attributes Attributes.
	 *
	 * @return string
	 */
	public static function parse_shortcode_attributes( $attributes ) {
		$result = '';
		foreach ( $attributes as $key => $value ) {
			if ( is_array( $value ) ) {
				$value = implode( ',', $value );
			}
			$result .= "${key}=\"${value}\" ";
		}

		return $result;
	}

	/**
	 * テーマのバージョンチェック
	 *
	 * @param string $version
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
		$theme = wp_get_theme( get_template() );
		if ( is_null( $theme ) ) {
			return false;
		}
		$theme_version = $theme->Version;

		return version_compare( $theme_version, $version, '>=' );
	}

	/**
	 * Bool値に変換
	 *
	 * @param mixed $value value.
	 *
	 * @return bool
	 */
	public static function to_bool( $value ) {
		if ( true === $value || 'true' === $value || 1 === $value || '1' === $value ) {
			return true;
		}

		return false;
	}

	/**
	 * Jsonファイルの中身を取得
	 *
	 * @param string $path json file path.
	 *
	 * @return array|mixed
	 */
	public static function get_json_file_contents( $path ) {
		$contents = self::get_file_contents( $path );
		if ( ! $contents ) {
			return [];
		}
		$json = json_decode( $contents, true );
		if ( is_null( $json ) ) {
			return [];
		}

		return $json;
	}


	/**
	 * ファイル取得
	 *
	 * @param string $path File path.
	 *
	 * @return bool|string
	 */
	public static function get_file_contents( $path ) {
		global $wp_filesystem;
		if ( empty( $wp_filesystem ) ) {
			require_once ABSPATH . '/wp-admin/includes/file.php';
		}
		$content = false;
		if ( WP_Filesystem() ) {
			global $wp_filesystem;
			$content = $wp_filesystem->get_contents( $path );
		}

		return $content;
	}

	/**
	 * CSSの圧縮
	 *
	 * @param string $style inline css styles.
	 *
	 * @return string
	 */
	public static function minify( $style ) {
		$style = preg_replace( '#/\*[^!][^*]*\*+([^/][^*]*\*+)*/#', '', $style );
		$style = str_replace( ': ', ':', $style );
		$style = str_replace( [ "\r\n", "\r", "\n", "\t" ], '', $style );
		$style = str_replace( [ '  ', '   ', '    ' ], ' ', $style );

		return $style;
	}

	/**
	 * メディアクエリを追加
	 *
	 * @param string $css Styles.
	 * @param string $min Breakpoint.
	 * @param string $max Breakpoint.
	 *
	 * @return string
	 */
	public static function add_media_query( $css, $min = '', $max = '' ) {
		$breakpoints = apply_filters( 'ystdtb_css_breakpoints', Config::BREAKPOINTS );
		if ( ! array_key_exists( $min, $breakpoints ) && ! array_key_exists( $max, $breakpoints ) ) {
			return $css;
		}
		if ( array_key_exists( $min, $breakpoints ) ) {
			$breakpoint = $breakpoints[ $min ];
			$min        = "(min-width: ${breakpoint}px)";
		}
		if ( array_key_exists( $max, $breakpoints ) ) {
			$breakpoint = $breakpoints[ $max ] - 1;
			$max        = "(max-width: ${breakpoint}px)";
		}
		$breakpoint = $min . $max;
		if ( '' !== $min && '' !== $max ) {
			$breakpoint = $min . ' AND ' . $max;
		}

		if ( empty( $breakpoint ) ) {
			return $css;
		}

		return sprintf(
			'@media %s {%s}',
			$breakpoint,
			$css
		);
	}

	/**
	 * マニュアルリンク作成
	 *
	 * @param string $url   URL.
	 * @param string $text  Text.
	 * @param string $class CSS Class.
	 *
	 * @return string
	 */
	public static function manual_link( $url, $text = '', $class = '' ) {

		if ( empty( $url ) ) {
			return '';
		}

		if ( '' === $text ) {
			$text = 'マニュアルを見る';
		}
		$icon = '<svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>';

		if ( false === strpos( $url, 'https://' ) ) {
			$url = 'ystdtb-' . $url;
			$url = add_query_arg(
				[
					'utm_source'   => 'manual-link',
					'utm_medium'   => 'referral',
					'utm_campaign' => $url,
				],
				"https://wp-ystandard.com/${url}/"
			);
		}
		$class = '' === $class ? '' : "class=\"$class\"";
		$link  = wp_targeted_link_rel(
			"<div class=\"ystdtb-menu__manual-link\"><a ${class} href=\"${url}\" target=\"_blank\">${icon}${text}</a></div>"
		);

		return $link;
	}
}
