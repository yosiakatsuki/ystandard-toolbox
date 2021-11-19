<?php
/**
 * Slider Block
 *
 * @package ystandard-toolbox
 * @author  yosiakatsuki
 * @license GPL-2.0+
 */

namespace ystandard_toolbox\blocks;

defined( 'ABSPATH' ) || die();

/**
 * Class Slider
 *
 * @package ystandard_toolbox\blocks
 */
class Slider {

	/**
	 * スクリプトをすでに読み込んだか
	 * @var bool|null
	 */
	private $is_enqueue = null;

	/**
	 * Slider constructor.
	 */
	public function __construct() {
		add_filter( 'render_block', [ $this, 'enqueue_slider_script' ], 100, 2 );
	}

	public function enqueue_slider_script( $block_content, $parsed_block ) {
		if ( true === $this->is_enqueue ) {
			return $block_content;
		}
		if ( $parsed_block && 'ystdtb/slider' === $parsed_block['blockName'] ) {
			wp_enqueue_script(
				'ystdtb-slider-app',
				YSTDTB_URL . '/js/blocks/app-slider.js',
				[],
				filemtime( YSTDTB_PATH . '/js/blocks/app-slider.js' ),
				true
			);
			wp_enqueue_style(
				'ystdtb-slider-css',
				YSTDTB_URL . '/library/swiper/swiper-bundle.min.css',
				[],
				filemtime( YSTDTB_PATH . '/library/swiper/swiper-bundle.min.css' ),
			);

			$this->is_enqueue = true;
		}

		return $block_content;
	}

}

new Slider();
