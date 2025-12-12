<?php
/**
 * 定義リストブロック（dt)
 *
 * @package ystandard-toolbox
 */

namespace ystandard_toolbox;

use ystandard_toolbox\Util\Styles;

defined( 'ABSPATH' ) || die();

/**
 * Class Description_Term_Block.
 */
class Description_Term_Block {

	/**
	 * Instance.
	 *
	 * @var Description_Term_Block
	 */
	private static $instance;

	/**
	 * Instance.
	 *
	 * @return Description_Term_Block
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
Description_Term_Block::get_instance();
