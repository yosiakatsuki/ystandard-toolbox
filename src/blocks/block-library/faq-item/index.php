<?php
/**
 * FAQブロック
 *
 * @package ystandard-toolbox
 */

namespace ystandard_toolbox;

defined( 'ABSPATH' ) || die();

/**
 * Class FAQ_Item_Block.
 */
class FAQ_Item_Block {

	const BLOCK_NAME = 'ystdtb/box';

	/**
	 * Instance.
	 *
	 * @var FAQ_Item_Block
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
	 * @return FAQ_Item_Block
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

FAQ_Item_Block::get_instance();
