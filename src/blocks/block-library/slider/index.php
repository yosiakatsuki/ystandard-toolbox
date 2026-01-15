<?php
/**
 * スライダーブロック（親)
 *
 * @package ystandard-toolbox
 */

namespace ystandard_toolbox;

use ystandard_toolbox\Util\Styles;

defined( 'ABSPATH' ) || die();


/**
 * Class Slider_Block.
 */
class Slider_Block {

	/**
	 * ブロック名.
	 */
	const BLOCK_NAME = 'ystdtb/slider';

	/**
	 * Instance.
	 *
	 * @var Slider_Block
	 */
	private static $instance;

	/**
	 * Constructor.
	 */
	private function __construct() {
		add_action( 'init', [ $this, 'register_block' ], 100 );
		add_action( 'enqueue_block_assets', [ $this, 'enqueue_responsive_style' ] );
	}

	public function enqueue_responsive_style() {
		$responsive = [
			'desktop' => '',
			'tablet'  => '',
			'mobile'  => '',
		];
		$css        = '';
		// スタイル.
		$responsive['desktop'] .= '';
		// 結合.
		$css .= Styles::add_media_query_over_desktop( $responsive['desktop'] );
		$css .= Styles::add_media_query_only_tablet( $responsive['tablet'] );
		$css .= Styles::add_media_query_only_mobile( $responsive['mobile'] );

		$handle = 'ystdtb-timeline-item-responsive';
		wp_register_style( $handle, false );
		wp_add_inline_style( $handle, $css );
		wp_enqueue_style( $handle );
	}

	/**
	 * Instance.
	 *
	 * @return Slider_Block
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

Slider_Block::get_instance();
