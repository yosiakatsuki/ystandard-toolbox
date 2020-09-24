<?php
/**
 * SEO post meta.
 *
 * @package ystandard-toolbox
 * @author  yosiakatsuki
 * @license GPL-2.0+
 */

namespace ystandard_toolbox;

defined( 'ABSPATH' ) || die();

/**
 * Class SEO
 *
 * @package ystandard_toolbox
 */
class SEO {

	/**
	 * SEO constructor.
	 */
	public function __construct() {
		if ( ! Utility::ystandard_version_compare( '4.12.2' ) ) {
			return;
		}
		remove_action( 'wp_head', '_wp_render_title_tag', 1 );
		add_action( 'wp_head', [ $this, '_render_title_tag' ], 1 );
	}

	/**
	 * <title>タグ
	 */
	public function _render_title_tag() {
		$title = apply_filters( 'ystdtb_render_title_tag', wp_get_document_title() );
		echo '<title>' . $title . '</title>' . PHP_EOL;
	}
}

new SEO();
