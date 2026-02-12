<?php
/**
 * スライダーブロック（子)
 *
 * @package ystandard-toolbox
 */

namespace ystandard_toolbox;

use ystandard_toolbox\Util\Styles;

defined( 'ABSPATH' ) || die();

/**
 * Class Slider_Item_Block.
 */
class Slider_Item_Block {

	/**
	 * ブロック名.
	 */
	const BLOCK_NAME = 'ystdtb/slider-item';

	/**
	 * Instance.
	 *
	 * @var Slider_Item_Block
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
	 * @return Slider_Item_Block
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

Slider_Item_Block::get_instance();
