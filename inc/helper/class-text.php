<?php
/**
 * Helper Text
 *
 * @package ystandard-toolbox
 * @author  yosiakatsuki
 * @license GPL-2.0+
 */

namespace ystandard_toolbox\helper;

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
	 * キャメルケースをスネークケースに変換.
	 *
	 * @param string $text Text.
	 *
	 * @return string
	 */
	public static function camel_to_snake( $text ) {
		return strtolower( preg_replace( '/[A-Z]/', '_$0', lcfirst( $text ) ) );
	}
}
