<?php
/**
 * バナーリンクブロック
 *
 * @package ystandard-toolbox
 */

namespace ystandard_toolbox;

defined( 'ABSPATH' ) || die();

/**
 * Class Banner_Link_Block.
 */
class Banner_Link_Block {

	const BLOCK_NAME = 'ystdtb/banner-link';

	/**
	 * Instance.
	 *
	 * @var Banner_Link_Block
	 */
	private static $instance;

	/**
	 * Constructor.
	 */
	private function __construct() {
		add_action( 'init', [ $this, 'register_block' ], 100 );
		add_filter( 'block_bindings_supported_attributes_' . self::BLOCK_NAME, [ $this, 'add_block_bindings_supported_attributes' ] );
	}

	/**
	 * Instance.
	 *
	 * @return Banner_Link_Block
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

	/**
	 * Block Bindings対応属性を追加
	 *
	 * @param array $supported_attributes 対応属性.
	 *
	 * @return array
	 */
	public function add_block_bindings_supported_attributes( $supported_attributes ) {
		return array_values(
			array_unique(
				array_merge(
					$supported_attributes,
					[
						'mainText',
						'subText',
					]
				)
			)
		);
	}
}

Banner_Link_Block::get_instance();
