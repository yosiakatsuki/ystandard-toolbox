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
 * Class FAQ_Block.
 */
class FAQ_Block {

	const BLOCK_NAME = 'ystdtb/box';

	/**
	 * Instance.
	 *
	 * @var FAQ_Block
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
	 * @return FAQ_Block
	 */
	public static function get_instance() {
		if ( ! isset( self::$instance ) ) {
			self::$instance = new self();
		}

		return self::$instance;
	}

	/**
	 * FAQのレスポンシブスタイル用CSSを追加.
	 *
	 * @return void
	 */
	public function enqueue_responsive_style() {
		$selector   = '.ystdtb-faq';
		$responsive = [];
		$spacing    = [
			'margin'  => [ 'top', 'bottom' ],
			'padding' => [ 'top', 'right', 'bottom', 'left' ],
		];

		foreach ( [ 'desktop', 'tablet', 'mobile' ] as $type ) {
			// 文字サイズ。
			$responsive[ $type ] = Styles::get_responsive_custom_prop_css(
				[
					'selector'  => $selector,
					'prop_name' => 'faq--font-size',
					'property'  => 'font-size',
					'type'      => $type,
				]
			);

			// 外側・内側の余白。
			foreach ( $spacing as $property => $positions ) {
				foreach ( $positions as $position ) {
					$responsive[ $type ] .= Styles::get_responsive_custom_prop_css(
						[
							'selector'  => $selector,
							'prop_name' => "faq--{$property}-{$position}",
							'property'  => "{$property}-{$position}",
							'type'      => $type,
						]
					);
				}
			}
		}

		$css  = Styles::add_media_query_over_desktop( $responsive['desktop'] );
		$css .= Styles::add_media_query_only_tablet( $responsive['tablet'] );
		$css .= Styles::add_media_query_only_mobile( $responsive['mobile'] );

		$handle = 'ystdtb-faq-responsive';
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

FAQ_Block::get_instance();
