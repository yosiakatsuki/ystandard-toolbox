<?php
/**
 * Heading Helper
 *
 * @package ystandard-toolbox
 * @author  yosiakatsuki
 * @license GPL-2.0+
 */

namespace ystandard_toolbox;

defined( 'ABSPATH' ) || die();

class Heading_Helper {

	/**
	 * レスポンシブタイプの値として取得.
	 *
	 * @param mixed $value Value.
	 *
	 * @return array
	 */
	public static function get_responsive_value( $value ) {
		$result = [];
		if ( ! is_array( $value ) ) {
			$result = [ 'desktop' => $value ];
		}
		if ( array_key_exists( 'desktop', $value ) ) {
			$result['desktop'] = $value['desktop'];
		}
		if ( array_key_exists( 'tablet', $value ) ) {
			$result['tablet'] = $value['tablet'];
		}
		if ( array_key_exists( 'mobile', $value ) ) {
			$result['mobile'] = $value['mobile'];
		}

		return $result;
	}
}
