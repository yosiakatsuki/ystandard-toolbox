<?php
/**
 * マニュアル関連
 *
 * @package ystandard-toolbox
 * @author  yosiakatsuki
 * @license GPL-2.0+
 */

namespace ystandard_toolbox\Util;

defined( 'ABSPATH' ) || die();

/**
 * Class Manual
 */
class Manual {

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
		$link = self::manual_link_a( $url, $text, $class );
		if ( empty( $link ) ) {
			return '';
		}

		return wp_targeted_link_rel( "<div class=\"ystdtb-menu__manual-link\">${link}</div>" );
	}

	/**
	 * マニュアルリンク(インライン)作成
	 *
	 * @param string $url   URL.
	 * @param string $text  Text.
	 * @param string $class CSS Class.
	 *
	 * @return string
	 */
	public static function manual_link_inline( $url, $text = '', $class = '' ) {
		$link = self::manual_link_a( $url, $text, $class );
		if ( empty( $link ) ) {
			return '';
		}

		return wp_targeted_link_rel( "<div class=\"ystdtb-menu__manual-link-inline\">${link}</div>" );
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
	public static function manual_link_a( $url, $text = '', $class = '' ) {
		if ( empty( $url ) ) {
			return '';
		}

		if ( '' === $text ) {
			$text = 'マニュアルを見る';
		}
		$icon = '<svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>';

		if ( false === strpos( $url, 'https://' ) ) {
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

		return "<a ${class} href=\"${url}\" target=\"_blank\">${icon}${text}</a>";
	}
}
