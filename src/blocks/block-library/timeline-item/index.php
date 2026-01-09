<?php
/**
 * タイムラインブロック（子)
 *
 * @package ystandard-toolbox
 */

namespace ystandard_toolbox;

use ystandard_toolbox\Util\Styles;

defined( 'ABSPATH' ) || die();

/**
 * Class TimelineItem_Block.
 */
class TimelineItem_Block {

	/**
	 * ブロック名.
	 */
	const BLOCK_NAME = 'ystdtb/timeline';

	/**
	 * Instance.
	 *
	 * @var TimelineItem_Block
	 */
	private static $instance;

	/**
	 * Constructor.
	 */
	private function __construct() {
		add_action( 'init', [ $this, 'register_block' ], 100 );
	}

	/**
	 * Instance.
	 *
	 * @return TimelineItem_Block
	 */
	public static function get_instance() {
		if ( ! isset( self::$instance ) ) {
			self::$instance = new self();
		}

		return self::$instance;
	}

	/**
	 * ブロック登録
	 *
	 * @return void
	 */
	public function register_block() {
		register_block_type( __DIR__ );
	}
}

TimelineItem_Block::get_instance();
