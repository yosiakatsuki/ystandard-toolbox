<?php
/**
 * FAQブロック
 *
 * @package ystandard-toolbox
 */

namespace ystandard_toolbox;

use ystandard_toolbox\Util\Styles;
use ystandard_toolbox\Util\Text;

defined( 'ABSPATH' ) || die();

/**
 * Class FAQ_Item_Block.
 */
class FAQ_Item_Block {

	const BLOCK_NAME = 'ystdtb/box';

	/**
	 * Instance.
	 *
	 * @var FAQ_Item_Block
	 */
	private static $instance;

	/**
	 * Constructor.
	 */
	private function __construct() {
		add_action( 'init', [ $this, 'register_block' ], 20 );
		add_action( 'enqueue_block_assets', [ $this, 'enqueue_responsive_style' ] );
	}

	/**
	 * Instance.
	 *
	 * @return FAQ_Item_Block
	 */
	public static function get_instance() {
		if ( ! isset( self::$instance ) ) {
			self::$instance = new self();
		}

		return self::$instance;
	}

	/**
	 * FAQアイテムの端末別設定を編集画面とフロントへ配信する。
	 *
	 * @return void
	 */
	public function enqueue_responsive_style() {
		$selector          = '.ystdtb-faq-item';
		$contents_selector = "{$selector} > :where(.ystdtb-faq-item__contents)";
		$label_selector    = "{$selector} > :where(.ystdtb-faq-item__label)";
		$responsive        = [];

		foreach ( [ 'desktop', 'tablet', 'mobile' ] as $device ) {
			// 本文・ラベルの文字サイズ。
			$css  = Styles::get_responsive_custom_prop_css(
				[
					'selector'  => $contents_selector,
					'prop_name' => 'faq-item--contents-font-size',
					'property'  => 'font-size',
					'type'      => $device,
				]
			);
			$css .= Styles::get_responsive_custom_prop_css(
				[
					'selector'  => $label_selector,
					'prop_name' => 'faq-item--label-font-size',
					'property'  => 'font-size',
					'type'      => $device,
				]
			);

			// 本文の内側余白。
			foreach ( [ 'top', 'right', 'bottom', 'left' ] as $side ) {
				$css .= Styles::get_responsive_custom_prop_css(
					[
						'selector'  => $contents_selector,
						'prop_name' => "faq-item--contents-padding-{$side}",
						'property'  => "padding-{$side}",
						'type'      => $device,
					]
				);
			}

			// ラベルの上下余白と本文との間隔。
			foreach ( [ 'top', 'bottom' ] as $side ) {
				$css .= Styles::get_responsive_custom_prop_css(
					[
						'selector'  => $label_selector,
						'prop_name' => "faq-item--label-margin-{$side}",
						'property'  => "margin-{$side}",
						'type'      => $device,
					]
				);
			}
			$css .= Styles::get_responsive_custom_prop_css(
				[
					'selector'  => $selector,
					'prop_name' => 'faq-item--label-gap',
					'property'  => '--ystdtb--faq-item--label-gap',
					'type'      => $device,
				]
			);

			// サイズ未指定端末には寸法や中央揃えを追加せず、従来の自動サイズを保つ。
			$size = Styles::get_responsive_custom_prop_name( 'faq-item--label-size', $device );
			$css .= <<<CSS
{$label_selector}:where([style*="{$size}"]) {
	width: var({$size}) !important;
	height: var({$size}) !important;
	min-width: var({$size}) !important;
	min-height: var({$size}) !important;
	box-sizing: border-box;
	flex-shrink: 0;
	display: flex;
	align-items: center;
	justify-content: center;
}
CSS;

			$responsive[ $device ] = $css;
		}

		$css    = Styles::add_media_query_over_desktop( $responsive['desktop'] );
		$css   .= Styles::add_media_query_only_tablet( $responsive['tablet'] );
		$css   .= Styles::add_media_query_only_mobile( $responsive['mobile'] );
		$handle = 'ystdtb-faq-item-responsive';
		wp_register_style( $handle, false );
		wp_add_inline_style( $handle, Text::minify( $css ) );
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

FAQ_Item_Block::get_instance();
