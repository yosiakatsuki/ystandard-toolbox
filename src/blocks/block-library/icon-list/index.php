<?php
/**
 * アイコンリスト（外側）ブロック
 *
 * @package ystandard-toolbox
 */

namespace ystandard_toolbox;

use ystandard_toolbox\Util\Styles;
use ystandard_toolbox\Util\Text;

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
		add_action( 'enqueue_block_assets', [ $this, 'enqueue_responsive_style' ] );
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
	 * レスポンシブmargin用スタイルを追加.
	 *
	 * @return void
	 */
	public function enqueue_responsive_style() {
		$responsive = [
			'tablet' => '',
			'mobile' => '',
		];
		$selector   = '.ystdtb-icon-list';

		foreach ( array_keys( $responsive ) as $type ) {
			foreach ( [ 'top', 'right', 'bottom', 'left' ] as $position ) {
				$logical = Styles::get_logical_direction( $position );

				$responsive[ $type ] .= Styles::get_responsive_custom_prop_css(
					[
						'selector'  => $selector,
						'prop_name' => "icon-list--margin-{$position}",
						'property'  => "margin-{$logical}",
						'type'      => $type,
					]
				);
			}
		}

		$css  = Styles::add_media_query_only_tablet( $responsive['tablet'] );
		$css .= Styles::add_media_query_only_mobile( $responsive['mobile'] );

		$handle = 'ystdtb-icon-list-responsive';
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

Icon_List_Block::get_instance();
