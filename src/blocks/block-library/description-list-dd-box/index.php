<?php
/**
 * 定義リスト 詳細ブロック 入れ子版(dd)
 *
 * @package ystandard-toolbox
 */

namespace ystandard_toolbox;

use ystandard_toolbox\Util\Styles;

defined( 'ABSPATH' ) || die();

/**
 * Class Description_Details_Box_Block
 */
class Description_Details_Box_Block {

	/**
	 * Instance.
	 *
	 * @var Description_Details_Box_Block
	 */
	private static $instance;

	/**
	 * Instance.
	 *
	 * @return Description_Details_Box_Block
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
		$selector   = '.ystdtb-dd-box';
		$css        = '';
		foreach ( $types as $type ) {

			foreach ( [ 'top', 'right', 'bottom', 'left' ] as $pos ) {
				// Margin.
				$responsive[ $type ] .= Styles::get_responsive_custom_prop_css(
					[
						'selector'  => $selector,
						'prop_name' => "dd-box--margin-{$pos}",
						'property'  => "margin-{$pos}",
						'type'      => $type,
					]
				);
				// Padding.
				$responsive[ $type ] .= Styles::get_responsive_custom_prop_css(
					[
						'selector'  => $selector,
						'prop_name' => "dd-box--padding-{$pos}",
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

		$handle = 'ystdtb-dd-box-block-responsive';
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

Description_Details_Box_Block::get_instance();
