<?php
/**
 * 定義リストブロック（親)
 *
 * @package ystandard-toolbox
 */

namespace ystandard_toolbox;

defined( 'ABSPATH' ) || die();

/**
 * Class Description_List_Block.
 */
class Description_List_Block {

	/**
	 * ブロック名.
	 */
	const BLOCK_NAME = 'ystdtb/description-list';

	/**
	 * Instance.
	 *
	 * @var Description_List_Block
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
	 * @return Description_List_Block
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

Description_List_Block::get_instance();
