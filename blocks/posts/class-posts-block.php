<?php
/**
 * Posts Block
 *
 * @package ystandard-toolbox
 * @author  yosiakatsuki
 * @license GPL-2.0+
 */

namespace ystandard_toolbox\blocks;

use ystandard_toolbox\Config;
use ystandard_toolbox\Dynamic_Block;
use ystandard_toolbox\Utility;

defined( 'ABSPATH' ) || die();

/**
 * Class Posts
 *
 * @package ystandard_toolbox\blocks
 */
class Posts_Block extends Dynamic_Block {

	/**
	 * Posts constructor.
	 */
	public function __construct() {
		parent::__construct();
		$this->block_name       = 'posts';
		$this->block_attributes = [
			'align'          => [
				'type' => 'string',
			],
			'count'          => [
				'type'    => 'number',
				'default' => 3,
			],
			'orderby'        => [
				'type'    => 'string',
				'default' => 'date',
			],
			'order'          => [
				'type'    => 'string',
				'default' => 'DESC',
			],
			'listType'       => [
				'type'    => 'string',
				'default' => 'card',
			],
			'colMobile'      => [
				'type'    => 'number',
				'default' => 1,
			],
			'colTablet'      => [
				'type'    => 'number',
				'default' => 3,
			],
			'colPc'          => [
				'type'    => 'number',
				'default' => 3,
			],
			'taxonomy'       => [
				'type' => 'string',
			],
			'termSlug'       => [
				'type' => 'string',
			],
			'showImg'        => [
				'type'    => 'boolean',
				'default' => true,
			],
			'showDate'       => [
				'type'    => 'boolean',
				'default' => true,
			],
			'showCategory'   => [
				'type'    => 'boolean',
				'default' => true,
			],
			'showExcerpt'    => [
				'type'    => 'boolean',
				'default' => false,
			],
			'excerptLength'  => [
				'type'    => 'number',
				'default' => 0,
			],
			'thumbnailSize'  => [
				'type'    => 'string',
				'default' => 'full',
			],
			'thumbnailRatio' => [
				'type'    => 'string',
				'default' => '16-9',
			],
			'postType'       => [
				'type'    => 'string',
				'default' => 'post',
			],
			'postIn'         => [
				'type' => 'string',
			],
			'postNameIn'     => [
				'type' => 'string',
			],
			'postParent'     => [
				'type' => 'string',
			],
		];
		add_filter(
			self::REGISTER_DYNAMIC_BLOCK_HOOK . $this->block_name,
			function ( $flag ) {
				return shortcode_exists( 'ys_recent_posts' );
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

		$option['postsDesign'] = [];

		return $option;
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
		$classes = 'ystdtb-posts';
		if ( isset( $attributes['align'] ) && '' !== $attributes['align'] ) {
			$classes .= ' alignfull';
		}
		if ( isset( $attributes['orderby'] ) && 'ranking' === $attributes['orderby'] ) {
			$attributes['filter'] = 'sga';
		}

		$attributes = Utility::parse_shortcode_attributes(
			$this->migration_attributes( $attributes )
		);

		return "<div class=\"${classes}\">" . do_shortcode( "[ys_recent_posts ${attributes}]" ) . '</div>';
	}

	/**
	 * パラメーターの変換
	 *
	 * @param array $attributes Attributes.
	 *
	 * @return mixed
	 */
	private function migration_attributes( $attributes ) {

		$attributes['list_type']       = $attributes['listType'];
		$attributes['col_sp']          = $attributes['colMobile'];
		$attributes['col_tablet']      = $attributes['colTablet'];
		$attributes['col_pc']          = $attributes['colPc'];
		$attributes['term_slug']       = $attributes['termSlug'];
		$attributes['show_img']        = $attributes['showImg'];
		$attributes['show_date']       = $attributes['showDate'];
		$attributes['show_category']   = $attributes['showCategory'];
		$attributes['show_excerpt']    = $attributes['showExcerpt'];
		$attributes['excerpt_length']  = $attributes['excerptLength'];
		$attributes['thumbnail_size']  = $attributes['thumbnailSize'];
		$attributes['thumbnail_ratio'] = $attributes['thumbnailRatio'];
		$attributes['post_type']       = $attributes['postType'];
		$attributes['post__in']        = $attributes['postIn'];
		$attributes['post_name__in']   = $attributes['postNameIn'];
		$attributes['post_parent']     = $attributes['postParent'];

		return $attributes;
	}

}

$block = new Posts_Block();
$block->register_block();
