<?php
/**
 * ボックスブロック
 *
 * @package ystandard-toolbox
 */

namespace ystandard_toolbox;

defined( 'ABSPATH' ) || die();

/**
 * Class Box_Block.
 */
class Box_Block {

	const BLOCK_NAME = 'ystdtb/box';

	/**
	 * Instance.
	 *
	 * @var Box_Block
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
	 * @return Box_Block
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

Box_Block::get_instance();