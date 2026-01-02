<?php
/**
 * 定義リスト 横並びブロック
 *
 * @package ystandard-toolbox
 */

namespace ystandard_toolbox;

use ystandard_toolbox\Util\Styles;

defined( 'ABSPATH' ) || die();

/**
 * Class Description_List_Column_Block
 */
class Description_List_Column_Block {

	/**
	 * Instance.
	 *
	 * @var Description_List_Column_Block
	 */
	private static $instance;

	/**
	 * Instance.
	 *
	 * @return Description_List_Column_Block
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
		$selector   = '.ystdtb-dl-column';
		$css        = '';
		// margin,padding等.
		foreach ( $types as $type ) {

			foreach ( [ 'top', 'right', 'bottom', 'left' ] as $pos ) {
				$logical = Styles::get_logical_direction( $pos );
				// Margin.
				$responsive[ $type ] .= Styles::get_responsive_custom_prop_css(
					[
						'selector'  => $selector,
						'prop_name' => "dl-column--margin-{$pos}",
						'property'  => "margin-{$logical}",
						'type'      => $type,
					]
				);
			}
		}
		// border.
		$responsive['desktop'] .= '.ystdtb-dl-column:where(.has-border) > :where(dd) {border-inline-start:0;}';
		$responsive['tablet']  .= '.ystdtb-dl-column:where(.has-border:not(.is-stacked-on-tablet)) > :where(dd) {border-inline-start:0;}';
		$responsive['mobile']  .= '.ystdtb-dl-column:where(.has-border:not(.is-stacked-on-mobile)) > :where(dd) {border-inline-start:0;}';
		// stack.
		$responsive['tablet'] .= '.ystdtb-dl-column:where(.is-stacked-on-tablet) {display:block;}';
		$responsive['tablet'] .= '.ystdtb-dl-column:where(.is-stacked-on-tablet) + :where(.ystdtb-dl-column) {margin-block-start:var(--ystd-layout-gap, 1.5rem);}';
		$responsive['mobile'] .= '.ystdtb-dl-column:where(.is-stacked-on-mobile) {display:block;}';
		$responsive['mobile'] .= '.ystdtb-dl-column:where(.is-stacked-on-mobile) + :where(.ystdtb-dl-column) {margin-block-start:var(--ystd-layout-gap, 1.5rem);}';
		// column-width.
		$responsive['desktop'] .= '.ystdtb-dl-column[style*="dl-column--width--desktop"] {--ystdtb--dl-column--width:var(--ystdtb--dl-column--width--desktop);}';
		$responsive['tablet'] .= '.ystdtb-dl-column[style*="dl-column--width--tablet"] {--ystdtb--dl-column--width:var(--ystdtb--dl-column--width--tablet);}';
		$responsive['mobile'] .= '.ystdtb-dl-column[style*="dl-column--width--mobile"] {--ystdtb--dl-column--width:var(--ystdtb--dl-column--width--mobile);}';

		// 結合.
		$css .= Styles::add_media_query_over_desktop( $responsive['desktop'] );
		$css .= Styles::add_media_query_only_tablet( $responsive['tablet'] );
		$css .= Styles::add_media_query_only_mobile( $responsive['mobile'] );

		// $handle = generate_block_asset_handle( 'ystdtb/description-list-column', 'style' );
		$handle = 'ystdtb-dl-column-block-responsive';
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

Description_List_Column_Block::get_instance();
