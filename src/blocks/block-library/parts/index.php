<?php
/**
 * パーツブロック
 *
 * @package ystandard-toolbox
 */

namespace ystandard_toolbox;

use ystandard_toolbox\Util\Shortcode;

defined( 'ABSPATH' ) || die();


class Parts_Block {
	/**
	 * Instance.
	 *
	 * @var Parts_Bloc
	 */
	private static $instance;

	/**
	 * Constructor.
	 */
	private function __construct() {
		add_action( 'init', [ $this, 'register_block' ], 100 );
		add_action( 'ystdtb_block_editor_option', [ $this, 'add_block_config' ] );
	}

	/**
	 * Instance.
	 *
	 * @return Parts_Block
	 */
	public static function get_instance() {
		if ( ! isset( self::$instance ) ) {
			self::$instance = new self();
		}

		return self::$instance;
	}

	/**
	 * レンダーコールバック
	 *
	 * @param array $attributes ブロック属性.
	 * @param string $content インナーブロック.
	 *
	 * @return string
	 */
	public function render_callback( $attributes, $content = '' ) {

		$attributes = wp_parse_args(
			$attributes,
			[
				'partsId'  => '',
				'parts_id' => '',
			]
		);

		$attributes['parts_id'] = $attributes['partsId'];
		$parts_id = $attributes['parts_id'];
		// ショートコード用に変換.
		$attributes = Shortcode::parse_shortcode_attributes( $attributes );

		$content = do_shortcode( "[ys_parts {$attributes}]" );

		return apply_filters( "ystdtb_parts_block_content_{$parts_id}", $content );
	}

	/**
	 * ブロック設定の追加
	 *
	 * @param array $option Options.
	 *
	 * @return array
	 */
	public function add_block_config( $option ) {

		$parts = get_posts(
			[
				'post_type'      => 'ys-parts',
				'posts_per_page' => - 1,
			]
		);

		$parts = ! $parts ? [] : array_map(
			function ( $post ) {
				return [
					'label' => $post->post_title,
					'value' => $post->ID,
				];
			},
			$parts
		);

		$option['partsList']          = $parts;
		$option['partsPreviewStyles'] = $this->get_parts_preview_styles();

		return $option;
	}

	/**
	 * パーツブロックプレビュー用CSS
	 *
	 * @return array
	 */
	private function get_parts_preview_styles() {
		$result = [];
		$styles = wp_styles();
		/**
		 * コアブロック
		 */
		if ( isset( $styles->registered['wp-block-library']->src ) ) {
			$src  = $styles->registered['wp-block-library']->src;
			$path = untrailingslashit( ABSPATH ) . $src;
			if ( is_file( $path ) ) {
				$result[] = [
					'css'            => file_get_contents( $path ),
					'baseURL'        => site_url() . $src,
					'__unstableType' => 'plugin',
				];
			}
		}

		/**
		 * Toolbox ブロック
		 */
		$path = YSTDTB_PATH . '/css/ystandard-toolbox.css';
		if ( is_file( $path ) ) {
			$result[] = [
				'css'            => file_get_contents( $path ),
				'baseURL'        => YSTDTB_URL . '/css/ystandard-toolbox.css',
				'__unstableType' => 'plugin',
			];
		}

		return apply_filters( 'ystdtb_parts_block_preview_styles', $result );
	}


	/**
	 * ブロック登録
	 *
	 * @return void
	 */
	public function register_block() {
		register_block_type( __DIR__, [
			'render_callback' => [ $this, 'render_callback' ],
			'attributes'      => [
				'partsId' => [
					'type' => 'string',
				],
			],
		] );
	}
}

Parts_Block::get_instance();
