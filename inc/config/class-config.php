<?php
/**
 * @package ystandard-toolbox
 * @author  yosiakatsuki
 * @license GPL-2.0+
 */

namespace ystandard_toolbox;

defined( 'ABSPATH' ) || die();

/**
 * Class Config
 *
 * @package ystandard_toolbox
 */
class Config {
	/**
	 * CSS Handle
	 */
	const CSS_HANDLE = 'ystdtb-css';
	/**
	 * CSS Hook
	 */
	const AFTER_ENQUEUE_CSS_HOOK = 'ystdtb_enqueue_css';

	/**
	 * Body class.
	 */
	const BODY_CLASS = 'ystdtb';

	/**
	 * ブレークポイント
	 *
	 * @var array
	 */
	const BREAKPOINTS = [
		'sm' => 600,
		'md' => 769,
		'lg' => 1025,
	];
}
