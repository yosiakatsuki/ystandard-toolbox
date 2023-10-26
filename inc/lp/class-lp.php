<?php
/**
 * LP
 *
 * @package ystandard-toolbox
 * @author  yosiakatsuki
 * @license GPL-2.0+
 */

namespace ystandard_toolbox;

defined( 'ABSPATH' ) || die();

/**
 * Class LP
 *
 * @package ystandard_toolbox
 */
class LP {

	/**
	 * LP constructor.
	 */
	public function __construct() {
		if ( ! Utility::ystandard_version_compare( '4.26.1' ) ) {
			return;
		}
		add_filter( 'theme_templates', [ $this, 'add_template' ], 20, 4 );
		add_filter( 'template_include', [ $this, 'load_template' ], 99 );
		add_filter( 'body_class', [ $this, 'body_class' ], 99 );
		add_filter( 'ys_show_footer_mobile_nav', [ $this, 'disable_footer_nav' ] );
		add_filter( 'ys_is_wide_templates', [ $this, 'add_is_wide_templates' ] );
		add_filter( 'ys_is_no_title_templates', [ $this, 'add_lp_templates' ] );
		add_filter( 'ys_is_one_column_templates', [ $this, 'add_lp_templates' ] );
		add_filter( 'ys_create_toc', [ $this, 'return_false' ] );
		add_filter( 'ys_is_active_advertisement', [ $this, 'return_false' ] );
		add_filter( 'document_title_parts', [ $this, 'lp_document_title' ], 100 );
		add_filter( Config::AFTER_ENQUEUE_CSS_HOOK, [ $this, 'enqueue_css' ] );
	}

	/**
	 * Body クラス追加
	 *
	 * @param array $clases Classes.
	 *
	 * @return array
	 */
	public function body_class( $clases ) {

		if ( self::is_lp_template() ) {
			$clases[] = 'is-lp-template';
			$clases[] = 'is-lp-template-body';
		}

		return $clases;
	}

	/**
	 * CSS追加
	 *
	 * @return void
	 */
	public function enqueue_css() {
		$css = '
		body.is-lp-template.is-lp-template-body {
			margin-top:0;
			padding-top:0;
			--ys-site-header-height:0;
		}
		';
		wp_add_inline_style(
			Config::CSS_HANDLE,
			Utility::minify( $css )
		);
	}

	/**
	 * フィルター用：LPテンプレートならfalse.
	 *
	 * @param bool $value Value.
	 *
	 * @return bool
	 */
	public function return_false( $value ) {
		if ( self::is_lp_template() ) {
			return false;
		}

		return $value;
	}


	/**
	 * LPテンプレート一覧取得
	 *
	 * @return array
	 */
	public static function get_lp_templates() {
		$template_dir = Config::CUSTOM_TEMPLATE_DIR;

		return [
			"{$template_dir}/lp/lp-wide.php" => 'LP(ワイド) [Toolbox]',
			"{$template_dir}/lp/lp.php"      => 'LP [Toolbox]',
		];
	}

	/**
	 * LPテンプレート判断
	 *
	 * @param string $template Template Slug.
	 *
	 * @return bool
	 */
	public static function is_lp_template( $template = '' ) {
		$lp_templates = self::get_lp_templates();
		if ( '' === $template ) {
			if ( ! is_singular() ) {
				return false;
			}
			global $post;
			$template = get_page_template_slug( $post->ID );
		}
		if ( array_key_exists( $template, $lp_templates ) ) {
			return true;
		}

		return false;
	}

	/**
	 * LPテンプレート選択追加
	 *
	 * @param string[]      $post_templates Array of template header names keyed by the template file name.
	 * @param \WP_Theme     $theme          The theme object.
	 * @param \WP_Post|null $post           The post being edited, provided for context, or null.
	 * @param string        $post_type      Post type to get the templates for.
	 *
	 * @return string[];
	 */
	public function add_template( $post_templates, $theme, $post, $post_type ) {

		if ( 'ys-parts' === $post_type ) {
			return $post_templates;
		}

		$post_type = get_post_type_object( $post_type );
		if ( is_null( $post_type ) ) {
			return $post_templates;
		}

		if ( ! $post_type->public ) {
			return $post_templates;
		}

		$templates = self::get_lp_templates();
		foreach ( $templates as $file => $name ) {
			if ( ! array_key_exists( $file, $post_templates ) ) {
				$post_templates[ $file ] = $name;
			}
		}

		return $post_templates;
	}

	/**
	 * LPテンプレートの読み込み
	 *
	 * @param string $template Template Slug.
	 *
	 * @return string
	 */
	public function load_template( $template ) {
		if ( ! is_singular() ) {
			return $template;
		}
		global $post;
		$page_template_slug = get_page_template_slug( $post->ID );

		if ( ! self::is_lp_template( $page_template_slug ) ) {
			return $template;
		}

		return Utility::get_page_template_path( $page_template_slug );
	}

	/**
	 * モバイルフッターの非表示
	 *
	 * @param bool $status Status.
	 *
	 * @return bool
	 */
	public function disable_footer_nav( $status ) {
		if ( is_page_template( array_keys( self::get_lp_templates() ) ) ) {
			return false;
		}

		return $status;
	}

	/**
	 * 幅広テンプレート判断追加
	 *
	 * @param array $templates Templates.
	 *
	 * @return array
	 */
	public function add_is_wide_templates( $templates ) {
		$templates[] = Config::CUSTOM_TEMPLATE_DIR . '/lp/lp-wide.php';

		return $templates;
	}

	/**
	 * テンプレート判断にLPテンプレートを追加
	 *
	 * @param array $templates Templates.
	 *
	 * @return array
	 */
	public function add_lp_templates( $templates ) {
		return array_merge(
			$templates,
			array_keys( self::get_lp_templates() )
		);
	}

	/**
	 * タイトルの変更
	 *
	 * @param array $title Title parts.
	 *
	 * @return array
	 */
	public function lp_document_title( $title ) {
		if ( ! self::is_lp_template() ) {
			return $title;
		}
		if ( isset( $title['title'] ) ) {
			return [ 'title' => $title['title'] ];
		}

		return $title;
	}
}

new LP();
