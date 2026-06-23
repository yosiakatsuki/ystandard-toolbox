<?php
/**
 * テキスト関連
 *
 * @package ystandard-toolbox
 * @author  yosiakatsuki
 * @license GPL-2.0+
 */

namespace ystandard_toolbox\Util;

defined( 'ABSPATH' ) || die();

class Text {

	/**
	 * スネークケースをキャメルケースに変換.
	 *
	 * @param string $text Text.
	 *
	 * @return string
	 */
	public static function snake_to_camel( $text ) {
		return str_replace( ' ', '', ucwords( str_replace( '_', ' ', $text ) ) );
	}

	/**
	 * キャメルケースをケバブケースに変換.
	 *
	 * @param string $text Text.
	 *
	 * @return string
	 */
	public static function camel_to_kebab( $text ) {
		return strtolower( preg_replace( '/[A-Z]/', '-$0', lcfirst( $text ) ) );
	}
	/**
	 * キャメルケースをスネークケースに変換.
	 *
	 * @param string $text Text.
	 *
	 * @return string
	 */
	public static function camel_to_snake( $text ) {
		return strtolower( preg_replace( '/[A-Z]/', '_$0', lcfirst( $text ) ) );
	}

	/**
	 * テキスト/CSSの圧縮
	 *
	 * @param string $text inline css styles / text.
	 *
	 * @return string
	 */
	public static function minify( $text ) {
		$text = preg_replace( '#/\*[^!][^*]*\*+([^/][^*]*\*+)*/#', '', $text );
		$text = str_replace( ': ', ':', $text );
		$text = str_replace( [ "\r\n", "\r", "\n", "\t" ], '', $text );
		$text = str_replace( [ '  ', '   ', '    ' ], ' ', $text );

		return $text;
	}
}
