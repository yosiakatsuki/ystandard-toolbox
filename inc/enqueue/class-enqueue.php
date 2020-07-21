<?php
/**
 * @package ystandard-toolbox
 * @author  yosiakatsuki
 * @license GPL-2.0+
 */

namespace ystandard_toolbox;

defined( 'ABSPATH' ) || die();

/**
 * Class Enqueue
 *
 * @package ystandard_toolbox
 */
class Enqueue {



	/**
	 * Enqueue constructor.
	 */
	public function __construct() {
		add_action( 'wp_enqueue_scripts', [ $this, 'enqueue_css' ], 11 );
	}

	/**
	 * Enqueue Styles
	 */
	public function enqueue_css() {
		wp_enqueue_style(
			Config::CSS_HANDLE,
			self::get_css_uri(),
			[],
			filemtime( YSTDTB_PATH . '/css/ystandard-toolbox.css' )
		);
		do_action( Config::AFTER_ENQUEUE_CSS_HOOK );
	}

	/**
	 * CSS URL取得
	 *
	 * @return string
	 */
	public static function get_css_uri() {
		return YSTDTB_URL . '/css/ystandard-toolbox.css';
	}
}

new Enqueue();
