<?php
/**
 * FAQブロック
 *
 * @package ystandard-toolbox
 */

namespace ystandard_toolbox;

defined( 'ABSPATH' ) || die();

/**
 * Class FAQ_Block.
 */
class FAQ_Block {

	const BLOCK_NAME = 'ystdtb/box';

	/**
	 * Instance.
	 *
	 * @var FAQ_Block
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
	 * @return FAQ_Block
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

FAQ_Block::get_instance();
