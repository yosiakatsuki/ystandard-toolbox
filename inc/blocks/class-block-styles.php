<?php
/**
 * Blocks
 *
 * @package ystandard-toolbox
 * @author  yosiakatsuki
 * @license GPL-2.0+
 */

namespace ystandard_toolbox;

defined( 'ABSPATH' ) || die();

/**
 * Class Block_Styles
 */
class Block_Styles {

	/**
	 * Singleton instance
	 *
	 * @var null
	 */
	private static $instance = null;

	/**
	 * @var array {
	 *     'block_name' => string,
	 *     'name'       => string,
	 *     'label'      => string,
	 *     'url'        => string,
	 *     'var'        => string,
	 *     'editor_style' => string,'
	 *     'editor_style_var' => string,'
	 * }
	 */
	private static $block_styles = null;

	/**
	 * Get instance
	 *
	 * @return self|null
	 */
	public static function get_instance() {
		if ( null === self::$instance ) {
			self::$instance = new self();
		}

		return self::$instance;
	}

	/**
	 * Constructor
	 */
	private function __construct() {
		add_action( 'init', [ $this, 'register_block_styles' ] );
		add_action( 'enqueue_block_assets', [ $this, 'enqueue_custom_block_styles' ] );
	}

	/**
	 * カスタムブロックスタイル取得
	 *
	 * @return array[]
	 */
	public static function get_custom_block_styles() {
		if ( null === self::$block_styles ) {
			$block_styles       = apply_filters(
				'ystdtb_custom_block_styles',
				[],
			);
			self::$block_styles = array_merge( self::get_toolbox_block_styles(), $block_styles );
		}

		return self::$block_styles;
	}

	/**
	 * Toolbox定義のブロックスタイル取得
	 *
	 * @return array[]
	 */
	private static function get_toolbox_block_styles() {
		return [
			[
				'block_name'       => 'core/table',
				'name'             => 'ystdtb-table-2col',
				'label'            => __( '2列用', 'ystandard-toolbox' ),
				'url'              => YSTDTB_URL . '/css/block-styles/core__table/table.css',
				'var'              => filemtime( YSTDTB_PATH . '/css/block-styles/core__table/table.css' ),
				'editor_style'     => YSTDTB_URL . '/css/block-styles/core__table/table-editor.css',
				'editor_style_var' => filemtime( YSTDTB_PATH . '/css/block-styles/core__table/table-editor.css' ),
			],
			[
				'block_name'       => 'core/table',
				'name'             => 'ystdtb-table-2col-m',
				'label'            => __( '2列用(モバイルで1列)', 'ystandard-toolbox' ),
				'url'              => YSTDTB_URL . '/css/block-styles/core__table/table.css',
				'var'              => filemtime( YSTDTB_PATH . '/css/block-styles/core__table/table.css' ),
				'editor_style'     => YSTDTB_URL . '/css/block-styles/core__table/table-editor.css',
				'editor_style_var' => filemtime( YSTDTB_PATH . '/css/block-styles/core__table/table-editor.css' ),
			],
			[
				'block_name'       => 'core/table',
				'name'             => 'ystdtb-table-scroll',
				'label'            => __( 'モバイルでスクロール', 'ystandard-toolbox' ),
				'url'              => YSTDTB_URL . '/css/block-styles/core__table/table.css',
				'var'              => filemtime( YSTDTB_PATH . '/css/block-styles/core__table/table.css' ),
				'editor_style'     => YSTDTB_URL . '/css/block-styles/core__table/table-editor.css',
				'editor_style_var' => filemtime( YSTDTB_PATH . '/css/block-styles/core__table/table-editor.css' ),
			],
		];
	}

	/**
	 * Register block styles
	 *
	 * @return void
	 */
	public function register_block_styles() {
		$blocks = self::get_custom_block_styles();
		foreach ( $blocks as $item ) {
			$args = [
				'name'  => $item['name'],
				'label' => $item['label'],
			];
			register_block_style( $item['block_name'], $args );
		}
	}

	public function enqueue_custom_block_styles() {

	}
}

Block_Styles::get_instance();
