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
		add_action( 'init', [ $this, 'register_taxonomy' ] );
		add_action( 'init', [ $this, 'register_block_pattern' ] );
		add_filter( 'pre_get_posts', [ $this, 'set_order' ] );
		add_action( 'restrict_manage_posts', [ $this, 'block_pattern_tax_dropdown' ] );
		if ( Option::get_option_by_bool( Block_Patterns::OPTION_NAME, 'disable_core_pattern', false ) ) {
			add_action( 'init', [ $this, 'remove_core_patterns' ], 9 );
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
	 * タクソノミーの有効化.
	 */
	public function register_taxonomy() {
		register_taxonomy(
			self::BLOCK_PATTERNS . '_tax',
			self::BLOCK_PATTERNS,
			[
				'hierarchical'          => true,
				'update_count_callback' => '_update_post_term_count',
				'label'                 => __( 'ブロックパターンカテゴリー', 'ystandard-toolbox' ),
				'singular_label'        => __( 'ブロックパターンカテゴリー', 'ystandard-toolbox' ),
				'public'                => false,
				'show_ui'               => true,
				'show_in_rest'          => true,
				'show_in_quick_edit'    => true,
				'show_admin_column'     => true,
			]
		);
	}

	/**
	 * ブロックパターンカテゴリーの絞り込み.
	 *
	 * @param string $post_type Post Type.
	 */
	public function block_pattern_tax_dropdown( $post_type ) {
		if ( self::BLOCK_PATTERNS === $post_type ) {
			$taxonomy = self::BLOCK_PATTERNS . '_tax';
			$terms    = get_terms(
				$taxonomy,
				[ 'hide_empty' => false ]
			);
			if ( is_wp_error( $terms ) || empty( $terms ) ) {
				return;
			}
			wp_dropdown_categories(
				[
					'show_option_all' => __( '全てのカテゴリー', 'ystandard-toolbox' ),
					'orderby'         => 'name',
					'selected'        => get_query_var( $taxonomy ),
					'hide_empty'      => 0,
					'name'            => $taxonomy,
					'taxonomy'        => $taxonomy,
					'value_field'     => 'slug',
				]
			);
		}
	}

	/**
	 * ブロックパターン追加
	 */
	public function register_block_pattern() {
		/**
		 * カテゴリー登録
		 */
		$taxonomy = self::BLOCK_PATTERNS . '_tax';
		$terms    = get_terms( $taxonomy, [ 'hide_empty' => true ] );
		if ( ! is_wp_error( $terms ) && ! empty( $terms ) ) {
			foreach ( $terms as $term ) {
				// カテゴリー登録.
				register_block_pattern_category(
					self::BLOCK_PATTERNS . '_' . $term->slug,
					[ 'label' => $term->name ]
				);
			}
		}
		// カテゴリーがついていないパターンの受け皿.
		register_block_pattern_category(
			self::BLOCK_PATTERNS,
			[ 'label' => 'yStandard Toolbox' ]
		);

		do_action( 'ystdtb_register_block_pattern_category' );

		// 投稿取得.
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

		foreach ( $patterns as $pattern ) {
			if ( $pattern->post_content ) {
				$pattern_categories = [ self::BLOCK_PATTERNS ];
				$category           = get_the_terms( $pattern->ID, $taxonomy );
				if ( ! is_wp_error( $category ) && ! empty( $category ) ) {
					$pattern_categories = [];
					foreach ( $category as $term ) {
						$pattern_categories[] = self::BLOCK_PATTERNS . '_' . $term->slug;
					}
				}
				register_block_pattern(
					'ystdtb/pattern-' . $pattern->ID,
					[
						'title'      => $pattern->post_title,
						'content'    => $pattern->post_content,
						'categories' => $pattern_categories,
					]
				);
			}
		}

		do_action( 'ystdtb_register_block_pattern' );
	}

	/**
	 * 管理画面並び替え
	 *
	 * @param \WP_Query $query query.
	 */
	public function set_order( $query ) {
		if ( is_admin() ) {
			if ( isset( $query->query['post_type'] ) && self::BLOCK_PATTERNS === $query->query['post_type'] ) {
				if ( ! filter_input( INPUT_GET, 'orderby' ) ) {
					$query->set( 'orderby', 'date' );
					$query->set( 'order', 'DESC' );
				}
			}
		}
	}

	/**
	 * コアブロックパターンの削除
	 */
	public function remove_core_patterns() {
		remove_theme_support( 'core-block-patterns' );
	}
}

new Block_Patterns();
