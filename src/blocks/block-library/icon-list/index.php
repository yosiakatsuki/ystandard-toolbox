<?php
/**
 * アイコンリスト（外側）ブロック
 *
 * @package ystandard-toolbox
 */

namespace ystandard_toolbox;

defined( 'ABSPATH' ) || die();

/**
 * Class Icon_List_Block.
 */
class Icon_List_Block {
	/**
	 * Instance.
	 *
	 * @var Icon_List_Block
	 */
	private static $instance;

	/**
	 * Constructor.
	 */
	private function __construct() {
		add_action( 'init', [ $this, 'register_block' ], 100 );
		add_filter( 'ystdtb_block_editor_option', [ $this, 'add_block_config' ] );
	}

	/**
	 * Instance.
	 *
	 * @return Icon_List_Block
	 */
	public static function get_instance() {
		if ( ! isset( self::$instance ) ) {
			self::$instance = new self();
		}

		return self::$instance;
	}

	public function add_block_config( $options ) {

		$options['listIcons'] = [];

		return $options;
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

Icon_List_Block::get_instance();
