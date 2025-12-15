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
	 * Constructor.
	 */
	private function __construct() {
		add_action( 'init', [ $this, 'register_block' ], 100 );
		add_action( 'enqueue_block_assets', [ $this, 'enqueue_responsive_style' ] );
	}

	public function enqueue_responsive_style() {
		$types      = [ 'desktop', 'tablet', 'mobile' ];
		$responsive = [
			'desktop' => '',
			'tablet'  => '',
			'mobile'  => '',
		];
		$selector   = '.ystdtb-dt';
		$css        = '';
		foreach ( $types as $type ) {

			// Font size.
			$responsive[ $type ] .= Styles::get_responsive_custom_prop_css(
				[
					'selector'  => $selector,
					'prop_name' => 'dt--font-size',
					'property'  => 'font-size',
					'type'      => $type,
				]
			);

			foreach ( [ 'top', 'right', 'bottom', 'left' ] as $pos ) {
				// Margin.
				$responsive[ $type ] .= Styles::get_responsive_custom_prop_css(
					[
						'selector'  => $selector,
						'prop_name' => "dt--margin-{$pos}",
						'property'  => "margin-{$pos}",
						'type'      => $type,
					]
				);
				// Padding.
				$responsive[ $type ] .= Styles::get_responsive_custom_prop_css(
					[
						'selector'  => $selector,
						'prop_name' => "dt--padding-{$pos}",
						'property'  => "padding-{$pos}",
						'type'      => $type,
					]
				);
			}
		}
		// 結合.
		$css .= Styles::add_media_query_over_desktop( $responsive['desktop'] );
		$css .= Styles::add_media_query_only_tablet( $responsive['tablet'] );
		$css .= Styles::add_media_query_only_mobile( $responsive['mobile'] );

		$handle = 'ystdtb-dl-block-responsive';
		wp_register_style( $handle, false );
		wp_add_inline_style( $handle, $css );
		wp_enqueue_style( $handle );
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
