<?php
/**
 * Parts Block
 *
 * @package ystandard-toolbox
 * @author  yosiakatsuki
 * @license GPL-2.0+
 */

namespace ystandard_toolbox\blocks;

use ystandard_toolbox\Config;
use ystandard_toolbox\Dynamic_Block;
use ystandard_toolbox\Filesystem;
use ystandard_toolbox\Utility;

defined( 'ABSPATH' ) || die();

/**
 * Class Parts
 *
 * @package ystandard_toolbox\blocks
 */
class Parts_Block extends Dynamic_Block {

	/**
	 * Parts constructor.
	 */
	public function __construct() {
		parent::__construct();
		$this->block_name       = 'parts';
		$this->block_attributes = [
			'partsId' => [
				'type' => 'string',
			],
		];
		add_filter(
			self::REGISTER_DYNAMIC_BLOCK_HOOK . $this->block_name,
			function ( $flag ) {
				return shortcode_exists( 'ys_parts' );
			}
		);
		add_filter( Config::BLOCK_EDITOR_OPTION_HOOK, [ $this, 'add_block_config' ] );
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

		return apply_filters( 'yststd_parts_block_preview_styles', $result );
	}

	/**
	 * Render
	 *
	 * @param array  $attributes block attributes.
	 * @param string $content    innerBlocks.
	 *
	 * @return false|string
	 */
	public function render( $attributes, $content = null ) {

		$parts_id   = $attributes['partsId'];
		$attributes = Utility::parse_shortcode_attributes(
			$this->migration_attributes( $attributes )
		);

		$content = do_shortcode( "[ys_parts {$attributes}]" );

		return apply_filters( "ystdtb_parts_block_content_{$parts_id}", $content );
	}

	/**
	 * パラメーターの変換
	 *
	 * @param array $attributes Attributes.
	 *
	 * @return mixed
	 */
	private function migration_attributes( $attributes ) {

		$attributes['parts_id'] = $attributes['partsId'];

		return $attributes;
	}
}

$block = new Parts_Block();
$block->register_block();
