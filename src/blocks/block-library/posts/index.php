<?php
/**
 * 投稿一覧ブロック
 *
 * @package ystandard-toolbox
 */

namespace ystandard_toolbox;

use ystandard_toolbox\Util\Styles;

defined( 'ABSPATH' ) || die();

/**
 * Class Posts_Block.
 */
class Posts_Block {

	const BLOCK_NAME = 'ystdtb/posts';

	/**
	 * テンプレートディレクトリ名（テーマ側上書き用）
	 */
	const TEMPLATE_DIR = 'ystdtb-templates/posts';

	/**
	 * Instance.
	 *
	 * @var Posts_Block
	 */
	private static $instance;

	/**
	 * Constructor.
	 */
	private function __construct() {
		add_action( 'init', [ $this, 'register_block' ], 100 );
		add_action( 'enqueue_block_assets', [ $this, 'enqueue_responsive_style' ] );
	}

	/**
	 * Instance.
	 *
	 * @return Posts_Block
	 */
	public static function get_instance() {
		if ( ! isset( self::$instance ) ) {
			self::$instance = new self();
		}

		return self::$instance;
	}

	/**
	 * ブロック登録
	 *
	 * @return void
	 */
	public function register_block() {
		register_block_type(
			__DIR__,
			[
				'render_callback' => [ $this, 'render_callback' ],
			]
		);
	}

	/**
	 * レンダーコールバック
	 *
	 * @param array $attributes ブロック属性.
	 *
	 * @return string
	 */
	public function render_callback( $attributes ) {
		$query_args = $this->build_query_args( $attributes );
		$query      = new \WP_Query( $query_args );

		if ( ! $query->have_posts() ) {
			wp_reset_postdata();

			return '';
		}

		// テンプレートに渡す引数の構築.
		$args = $this->get_template_args( $attributes, $query );

		// テンプレート名の決定.
		$template_name = 'simple' === $args['list_type'] ? 'posts-simple.php' : 'posts.php';
		$template_path = $this->locate_template( $template_name );
		$template_path = apply_filters( 'ystdtb_blocks_posts_template_path', $template_path, $template_name, $args );

		// テンプレート内で wp_kses_post() を使用してもSVGが消えないよう、レンダリング中のみ許可タグを拡張.
		add_filter( 'wp_kses_allowed_html', [ $this, 'allow_svg_in_kses' ], 10, 2 );

		ob_start();
		load_template( $template_path, false, $args );
		$html = ob_get_clean();

		remove_filter( 'wp_kses_allowed_html', [ $this, 'allow_svg_in_kses' ], 10 );

		wp_reset_postdata();

		return $html;
	}

	/**
	 * レスポンシブスタイルのエンキュー
	 */
	public function enqueue_responsive_style() {
		$handle = 'ystdtb-blocks-posts-responsive';
		$css    = '';

		$responsive = [
			'desktop' => '',
			'tablet'  => '',
			'mobile'  => '',
		];

		for ( $i = 1; $i <= 6; $i++ ) {
			$responsive['desktop'] .= ".ystdtb-posts__list:where(.col-desktop--{$i}) {--ystdtb--posts--columns:" . $i . ';}';
			$responsive['tablet']  .= ".ystdtb-posts__list:where(.col-tablet--{$i}) {--ystdtb--posts--columns:" . $i . ';}';
			$responsive['mobile']  .= ".ystdtb-posts__list:where(.col-mobile--{$i}) {--ystdtb--posts--columns:" . $i . ';}';
		}

		// 結合.
		$css .= Styles::add_media_query_over_desktop( $responsive['desktop'] );
		$css .= Styles::add_media_query_only_tablet( $responsive['tablet'] );
		$css .= Styles::add_media_query_only_mobile( $responsive['mobile'] );

		wp_register_style( $handle, false );
		wp_add_inline_style( $handle, $css );
		wp_enqueue_style( $handle );
	}

	/**
	 * wp_kses_allowed_html にSVGタグを追加
	 *
	 * @param array  $allowed_tags 許可タグ.
	 * @param string $context      コンテキスト.
	 *
	 * @return array
	 */
	public function allow_svg_in_kses( $allowed_tags, $context ) {
		if ( 'post' !== $context ) {
			return $allowed_tags;
		}

		$svg_tags = [
			'svg'      => [
				'xmlns'        => [],
				'viewbox'      => [],
				'width'        => [],
				'height'       => [],
				'fill'         => [],
				'stroke'       => [],
				'stroke-width' => [],
				'class'        => [],
				'style'        => [],
				'aria-hidden'  => [],
				'role'         => [],
				'focusable'    => [],
			],
			'path'     => [
				'd'              => [],
				'fill'           => [],
				'stroke'         => [],
				'stroke-width'   => [],
				'stroke-linecap' => [],
			],
			'circle'   => [
				'cx'           => [],
				'cy'           => [],
				'r'            => [],
				'fill'         => [],
				'stroke'       => [],
				'stroke-width' => [],
			],
			'rect'     => [
				'x'            => [],
				'y'            => [],
				'width'        => [],
				'height'       => [],
				'rx'           => [],
				'ry'           => [],
				'fill'         => [],
				'stroke'       => [],
				'stroke-width' => [],
			],
			'line'     => [
				'x1'           => [],
				'y1'           => [],
				'x2'           => [],
				'y2'           => [],
				'stroke'       => [],
				'stroke-width' => [],
			],
			'polyline' => [
				'points'       => [],
				'fill'         => [],
				'stroke'       => [],
				'stroke-width' => [],
			],
			'polygon'  => [
				'points'       => [],
				'fill'         => [],
				'stroke'       => [],
				'stroke-width' => [],
			],
			'g'        => [
				'fill'         => [],
				'stroke'       => [],
				'stroke-width' => [],
				'transform'    => [],
			],
		];

		return array_merge( $allowed_tags, $svg_tags );
	}

	/**
	 * テンプレートファイルの検索
	 *
	 * テーマ側で上書きできる仕組み:
	 *   1. 子テーマ/親テーマの ystdtb-templates/posts/{$template_name}
	 *   2. プラグインの templates/{$template_name}
	 *
	 * @param string $template_name テンプレートファイル名.
	 *
	 * @return string テンプレートファイルパス.
	 */
	private function locate_template( $template_name ) {
		$template = locate_template( self::TEMPLATE_DIR . '/' . $template_name );
		if ( ! $template ) {
			$template = __DIR__ . '/templates/' . $template_name;
		}

		return $template;
	}

	/**
	 * テンプレートに渡す変数を構築
	 *
	 * @param array $attributes ブロック属性.
	 * @param \WP_Query $query 投稿クエリ.
	 *
	 * @return array
	 */
	private function get_template_args( $attributes, $query ) {

		// 表示タイプ.
		$list_type = $attributes['listType'] ?? 'card';
		if ( self::is_mobile() && ! empty( $attributes['listTypeMobile'] ) ) {
			$list_type = $attributes['listTypeMobile'];
		}

		// カラム数（モバイル・タブレット・PC）.
		$col_mobile = $attributes['colMobile'] ?? 1;
		$col_tablet = $attributes['colTablet'] ?? 3;
		$col_pc     = $attributes['colPc'] ?? 3;

		// サムネイルのアスペクト比.
		$thumbnail_ratio = $attributes['thumbnailRatio'] ?? '16-9';
		if ( self::is_mobile() && ! empty( $attributes['thumbnailRatioMobile'] ) ) {
			$thumbnail_ratio = $attributes['thumbnailRatioMobile'];
		}

		// タクソノミースラッグ.
		$taxonomy         = ! empty( $attributes['taxonomy'] ) ? $attributes['taxonomy'] : '';
		$display_taxonomy = ! empty( $taxonomy ) ? $taxonomy : 'category';

		// 概要の行数.
		$excerpt_lines = '';
		if ( isset( $attributes['excerptLines'] ) && is_numeric( $attributes['excerptLines'] ) ) {
			$excerpt_lines = 2 === (int) $attributes['excerptLines'] ? '' : (int) $attributes['excerptLines'];
		}

		// 追加CSSクラスの反映.
		$custom_class  = ! empty( $attributes['className'] ) ? $attributes['className'] : '';
		$wrapper_class = implode( ' ', array_filter( [ 'ystdtb-posts', 'is-' . $list_type, $custom_class ] ) );

		// excerpt の style.
		$excerpt_styles = array_filter(
			[
				'-webkit-line-clamp' => $excerpt_lines,
			]
		);

		// 画像関連.
		$thumbnail_size = $attributes['thumbnailSize'] ?? 'full';
		$default_image  = Posts_Block::get_default_image( $thumbnail_size, 'ystdtb-posts__image' );

		// アイコン関連
		$calendar_icon = self::get_calendar_icon();
		$taxonomy_icon = self::get_taxonomy_icon( $display_taxonomy );

		return apply_filters(
			'ystdtb_blocks_posts_template_args',
			[
				'query'           => $query,
				'wrapper_class'   => $wrapper_class,
				'list_type'       => $list_type,
				'show_img'        => $attributes['showImg'] ?? true,
				'thumbnail_size'  => $thumbnail_size,
				'thumbnail_ratio' => $thumbnail_ratio,
				'default_image'   => $default_image,
				'show_date'       => $attributes['showDate'] ?? true,
				'show_category'   => $attributes['showCategory'] ?? true,
				'taxonomy'        => $taxonomy,
				'show_excerpt'    => $attributes['showExcerpt'] ?? false,
				'excerpt_lines'   => $excerpt_lines,
				'excerpt_styles'  => implode( ' ', $excerpt_styles ),
				'col_class'       => "col-mobile--{$col_mobile} col-tablet--{$col_tablet} col-desktop--{$col_pc}",
				'calendar_icon'   => $calendar_icon,
				'taxonomy_icon'   => $taxonomy_icon,
			]
		);
	}

	/**
	 * WP_Queryパラメータを構築
	 *
	 * @param array $attributes ブロック属性.
	 *
	 * @return array
	 */
	private function build_query_args( $attributes ) {
		$args = [
			'post_type'           => $attributes['postType'] ?? 'post',
			'posts_per_page'      => $this->get_count( $attributes ),
			'offset'              => $this->get_offset( $attributes ),
			'order'               => $attributes['order'] ?? 'DESC',
			'orderby'             => $attributes['orderby'] ?? 'date',
			'post_status'         => 'publish',
			'ignore_sticky_posts' => true,
			'no_found_rows'       => true,
		];

		// 投稿ID指定.
		if ( ! empty( $attributes['postIn'] ) ) {
			$args['post__in'] = array_map( 'intval', explode( ',', $attributes['postIn'] ) );
		}

		// 投稿名指定.
		if ( ! empty( $attributes['postNameIn'] ) ) {
			$args['post_name__in'] = array_map( 'trim', explode( ',', $attributes['postNameIn'] ) );
		}

		// 親投稿指定.
		if ( ! empty( $attributes['postParent'] ) ) {
			$args['post_parent'] = intval( $attributes['postParent'] );
		}

		// タクソノミー・ターム絞り込み.
		if ( ! empty( $attributes['taxonomy'] ) && ! empty( $attributes['termSlug'] ) ) {
			$args['tax_query'] = [ // phpcs:ignore WordPress.DB.SlowDBQuery.slow_db_query_tax_query
				[
					'taxonomy' => $attributes['taxonomy'],
					'field'    => 'slug',
					'terms'    => $attributes['termSlug'],
				],
			];
		}

		// 表示中の投稿を除外（シングルページ閲覧時）.
		if ( is_singular() ) {
			$args['post__not_in'] = [ get_the_ID() ]; // phpcs:ignore WordPress.DB.SlowDBQuery.slow_db_query_post__not_in
		}

		return $args;
	}

	/**
	 * 表示件数の取得（モバイル対応）
	 *
	 * @param array $attributes ブロック属性.
	 *
	 * @return int
	 */
	private function get_count( $attributes ) {
		$count = $attributes['count'] ?? 3;
		if ( ! empty( $attributes['countMobile'] ) && self::is_mobile() ) {
			$count = $attributes['countMobile'];
		}

		return (int) $count;
	}

	/**
	 * オフセットの取得（モバイル対応）
	 *
	 * @param array $attributes ブロック属性.
	 *
	 * @return int
	 */
	private function get_offset( $attributes ) {
		$offset = $attributes['offset'] ?? 0;
		if ( ! empty( $attributes['offsetMobile'] ) && self::is_mobile() ) {
			$offset = $attributes['offsetMobile'];
		}

		return (int) $offset;
	}

	/**
	 * デフォルト画像の取得（サムネイルなし時のフォールバック）
	 *
	 * 優先順:
	 *   1. プラグイン設定の投稿一覧デフォルト画像
	 *   2. WordPressサイトロゴ
	 *   3. プレースホルダーアイコン
	 *
	 * @param string $thumbnail_size 画像サイズ.
	 * @param string $class CSSクラス.
	 *
	 * @return string 画像HTML.
	 */
	public static function get_default_image( $thumbnail_size, $class ) {
		// 1. プラグイン設定のデフォルト画像.
		$image_id = Option::get_option( 'archive', 'archiveDefaultImageId' );
		if ( $image_id ) {
			return wp_get_attachment_image( $image_id, $thumbnail_size, false, [ 'class' => $class ] );
		}

		// 2. サイトロゴ.
		$logo_id = get_theme_mod( 'custom_logo' );
		if ( $logo_id ) {
			return wp_get_attachment_image( $logo_id, $thumbnail_size, false, [ 'class' => $class ] );
		}

		// 3. プレースホルダーアイコン.
		$icon_data = Icon::get_icon( 'image' );

		return '<span class="ystdtb-posts__no-image">' . ( $icon_data['icon'] ?? '' ) . '</span>';
	}

	/**
	 * タクソノミーアイコンSVGの取得
	 *
	 * 階層型ならフォルダアイコン、非階層型ならタグアイコンを返す。
	 *
	 * @param string $taxonomy タクソノミースラッグ.
	 *
	 * @return string SVGマークアップ.
	 */
	public static function get_taxonomy_icon( $taxonomy ) {
		$taxonomy_obj = get_taxonomy( $taxonomy );
		if ( ! $taxonomy_obj ) {
			return '';
		}

		$icon_name = $taxonomy_obj->hierarchical ? 'folder' : 'tag';
		$icon_data = Icon::get_icon( $icon_name );

		return $icon_data['icon'] ?? '';
	}

	/**
	 * カレンダーアイコンSVGの取得
	 *
	 * @return string SVGマークアップ.
	 */
	public static function get_calendar_icon() {
		$icon_data = Icon::get_icon( 'calendar' );

		return $icon_data['icon'] ?? '';
	}

	/**
	 * モバイル判定
	 *
	 * @return mixed|null
	 */
	public static function is_mobile() {
		$is_mobile = wp_is_mobile();

		return apply_filters( 'ystdtb_blocks_posts_is_mobile', $is_mobile );
	}
}

Posts_Block::get_instance();
