<?php
/**
 * Block Patterns
 *
 * @package ystandard-toolbox
 * @author  yosiakatsuki
 * @license GPL-2.0+
 */

namespace ystandard_toolbox;

defined( 'ABSPATH' ) || die();

/**
 * Class Block Patterns
 *
 * @package ystandard_toolbox
 */
class Block_Patterns {

	/**
	 * 投稿タイプスラッグ
	 */
	const BLOCK_PATTERNS = 'ystdtb-patterns';

	/**
	 * 設定名
	 */
	const OPTION_NAME = 'block-pattern';

	/**
	 * Block_Patterns constructor.
	 */
	public function __construct() {
		if ( ! self::is_enable_block_pattern() ) {
			return;
		}
		add_action( 'init', [ $this, 'register_post_type' ] );
		add_action( 'init', [ $this, 'register_block_pattern' ] );
		if ( Option::get_option_by_bool( Block_Patterns::OPTION_NAME, 'disable_core_pattern', false ) ) {
			add_action( 'init', [ $this, 'remove_core_patterns' ] );
		}
	}

	/**
	 * ブロックパターンを使えるか
	 *
	 * @return bool
	 */
	public static function is_enable_block_pattern() {
		if ( ! class_exists( 'WP_Block_Patterns_Registry' ) ) {
			return false;
		}
		if ( ! function_exists( 'register_block_pattern_category' ) ) {
			return false;
		}
		if ( ! function_exists( 'register_block_pattern' ) ) {
			return false;
		}

		return true;
	}

	/**
	 * 投稿タイプ追加
	 */
	public function register_post_type() {
		$labels = [
			'menu_name'     => __( 'Block Pattern', 'ystandard-toolbox' ),
			'singular_name' => __( 'Block Pattern', 'ystandard-toolbox' ),
			'all_items'     => __( 'All Block Pattern', 'ystandard-toolbox' ),
			'add_new'       => __( 'Add New Block Pattern', 'ystandard-toolbox' ),
			'name'          => __( 'Block Pattern', 'ystandard-toolbox' ),
			'add_new_item'  => __( 'Add New Block Pattern', 'ystandard-toolbox' ),
			'edit_item'     => __( 'Edit Block Pattern', 'ystandard-toolbox' ),
		];
		register_post_type(
			self::BLOCK_PATTERNS,
			[
				'public'              => false,
				'description'         => __( 'ブロックパターン編集機能', 'ystandard-toolbox' ),
				'hierarchical'        => false,
				'has_archive'         => false,
				'labels'              => $labels,
				'show_ui'             => true,
				'show_in_menu'        => true,
				'show_in_nav_menus'   => false,
				'show_in_admin_bar'   => false,
				'capability_type'     => 'post',
				'menu_position'       => 30,
				'query_var'           => false,
				'exclude_from_search' => true,
				'publicly_queryable'  => false,
				'menu_icon'           => Utility::get_menu_icon(),
				'supports'            => [
					'title',
					'editor',
				],
				'show_in_rest'        => true,
			]
		);
	}

	/**
	 * ブロックパターン追加
	 */
	public function register_block_pattern() {
		$patterns = get_posts(
			[
				'post_type'      => [ self::BLOCK_PATTERNS ],
				'post_status'    => [ 'publish' ],
				'posts_per_page' => - 1,
			]
		);
		if ( empty( $patterns ) ) {
			return;
		}
		register_block_pattern_category(
			self::BLOCK_PATTERNS,
			[ 'label' => 'yStandard Toolbox' ]
		);
		$count = 1;
		foreach ( $patterns as $pattern ) {
			if ( $pattern->post_content ) {
				register_block_pattern(
					'ystdtb/pattern-' . $count,
					[
						'title'      => $pattern->post_title,
						'content'    => $pattern->post_content,
						'categories' => [ self::BLOCK_PATTERNS ],
					]
				);
			}
			$count ++;
		}
	}

	/**
	 * コアブロックパターンの削除
	 */
	public function remove_core_patterns() {
		$registered = \WP_Block_Patterns_Registry::get_instance()->get_all_registered();

		foreach ( $registered as $item ) {
			if ( false !== strpos( $item['name'], 'core/' ) ) {
				unregister_block_pattern( $item['name'] );
			}
		}
	}
}

new Block_Patterns();
