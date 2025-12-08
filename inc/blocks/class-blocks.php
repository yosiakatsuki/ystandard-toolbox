<?php
/**
 * Blocks
 *
 * @package ystandard-toolbox
 * @author  yosiakatsuki
 * @license GPL-2.0+
 */

namespace ystandard_toolbox;

use ystandard_toolbox\Util\Version;

defined( 'ABSPATH' ) || die();

/**
 * Class Blocks
 *
 * @package ystandard_toolbox
 */
class Blocks {
	/**
	 * ブロックエディター用スクリプトハンドル
	 */
	const BLOCK_EDITOR_SCRIPT_HANDLE = 'ystandard-toolbox-block-editor';

	/**
	 * Blocks constructor.
	 */
	public function __construct() {

		$this->init_blocks();
		$this->load_extension_files();
		add_filter( 'block_categories_all', [ __CLASS__, 'add_block_categories' ] );
		add_action( 'enqueue_block_assets', [ $this, 'enqueue_block_assets' ] );
	}

	/**
	 * ファイルの読み込み
	 */
	private function load_extension_files() {
		require_once __DIR__ . '/extension/class-section.php';
	}

	/**
	 * Register Blocks.
	 *
	 * @return void
	 */
	public function init_blocks() {
		$blocks = glob( YSTDTB_PATH . '/build/blocks/**/index.php' );
		foreach ( $blocks as $file ) {
			require_once $file;
		}
	}

	/**
	 * Add block category
	 *
	 * @param array $categories ブロックカテゴリー.
	 *
	 * @return array
	 */
	public static function add_block_categories( $categories ) {
		if ( apply_filters( 'ystdtb_block_category_top', false ) ) {
			return array_merge( array_values( Config::BLOCK_CATEGORIES ), $categories );
		}

		return array_merge( $categories, array_values( Config::BLOCK_CATEGORIES ) );
	}

	/**
	 * Block Assets.
	 */
	public function enqueue_block_assets() {

		if ( ! is_admin() ) {
			return;
		}

		// CSS.
		wp_enqueue_style(
			Config::BLOCK_CSS_HANDLE,
			YSTDTB_URL . '/css/ystandard-toolbox-block-editor.css',
			[],
			filemtime( YSTDTB_PATH . '/css/ystandard-toolbox-block-editor.css' )
		);
		if ( ! Version::ystandard_blocks_version_compare() ) {
			wp_add_inline_style(
				Config::CSS_HANDLE,
				Enqueue::get_color_palette_css( '.editor-styles-wrapper ' )
			);
		}
		do_action( Config::AFTER_ENQUEUE_BLOCK_ASSETS_CSS_HOOK );

		// 設定関連.
		wp_register_script( self::BLOCK_EDITOR_SCRIPT_HANDLE, false );
		wp_localize_script(
			self::BLOCK_EDITOR_SCRIPT_HANDLE,
			'ystdtbBlockEditor',
			$this->create_block_option()
		);

//		if ( function_exists( 'wp_set_script_translations' ) ) {
//			wp_set_script_translations(
//				self::BLOCK_EDITOR_SCRIPT_HANDLE,
//				'ystandard-toolbox',
//				YSTDTB_PATH . '/languages'
//			);
//		}
		wp_enqueue_script( self::BLOCK_EDITOR_SCRIPT_HANDLE );
	}

	/**
	 * ブロックエディター用設定作成
	 *
	 * @return array
	 */
	private function create_block_option() {
		$options = [
			'isEnableSga'       => function_exists( 'sga_ranking_get_date' ),
			'defaultAttributes' => $this->get_block_default_attributes(),
		];

		return apply_filters( 'ystdtb_block_editor_option', $options );
	}

	/**
	 * ブロック初期値カスタマイズ値取得
	 *
	 * @return array
	 */
	private function get_block_default_attributes() {
		return apply_filters( 'ys_block_default_attributes', [] );
	}

	/**
	 * 属性をマージする (ブロック拡張機能用)
	 *
	 * @param array $args ブロック引数
	 * @param array $attributes 追加する属性
	 *
	 * @return array
	 */
	public static function merge_attributes( $args, $attributes ) {
		if ( array_key_exists( 'attributes', $args ) && is_array( $args['attributes'] ) ) {
			$args['attributes'] = array_merge( $args['attributes'], $attributes );
		} else {
			$args['attributes'] = $attributes;
		}

		return $args;
	}
}

new Blocks();
