<?php
/**
 * テンプレート関連
 *
 * @package ystandard-toolbox
 * @author  yosiakatsuki
 * @license GPL-2.0+
 */

namespace ystandard_toolbox\Util;

use ystandard_toolbox\Config;

defined( 'ABSPATH' ) || die();

class Template {
	/**
	 * ページテンプレートパス取得
	 *
	 * @param string $template Template Slug.
	 *
	 * @return string
	 */
	public static function get_page_template_path( $template ) {
		$template_path = str_replace(
			Config::CUSTOM_TEMPLATE_DIR,
			YSTDTB_PATH . '/page-template',
			$template
		);
		if ( file_exists( $template_path ) ) {
			return $template_path;
		}
		global $post;
		$post_type = get_post_type_object( $post->post_type );
		if ( $post_type->hierarchical ) {
			$template = get_page_template();
		} else {
			$template = get_single_template();
		}

		return $template;
	}
}
