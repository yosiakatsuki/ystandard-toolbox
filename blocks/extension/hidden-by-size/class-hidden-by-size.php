<?php
/**
 * Block Config : Extension
 *
 * @package ystandard-toolbox
 * @author  yosiakatsuki
 * @license GPL-2.0+
 */

namespace ystandard_toolbox\blocks\extension;

use ystandard_toolbox\Util\File;

defined( 'ABSPATH' ) || die();

/**
 * サイズによる非表示設定
 */
class Hidden_By_Size {

	/**
	 * サイズによる非表示設定のパラメーター追加.
	 *
	 * @param array $args Args.
	 *
	 * @return array
	 */
	public static function merge_attributes( $args ) {

		return Extension::merge_attributes(
			$args,
			File::get_json_file_contents( __DIR__ . '/attributes.json' )
		);
	}

}

