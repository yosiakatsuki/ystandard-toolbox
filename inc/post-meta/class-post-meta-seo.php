<?php
/**
 * SEO post meta.
 *
 * @package ystandard-toolbox
 * @author  yosiakatsuki
 * @license GPL-2.0+
 */

namespace ystandard_toolbox;

defined( 'ABSPATH' ) || die();


/**
 * Class Post_Meta_SEO
 *
 * @package ystandard_toolbox
 */
class Post_Meta_SEO {

	/**
	 * Post_Meta_SEO constructor.
	 */
	public function __construct() {
		if ( ! Utility::ystandard_version_compare( '4.12.2' ) ) {
			return;
		}
		add_action( 'ys_meta_box_seo', [ $this, 'add_seo_option' ] );
		add_action( 'ys_save_post_meta_seo', [ $this, 'save_seo_option' ] );
		remove_action( 'wp_head', '_wp_render_title_tag', 1 );
		add_action( 'wp_head', [ $this, '_render_title_tag' ], 1 );
		add_filter( 'ys_get_meta_description', [ $this, 'meta_description' ], PHP_INT_MAX );
	}

	/**
	 * <title>タグ
	 */
	public function _render_title_tag() {
		$title = wp_get_document_title();
		if ( is_singular() ) {
			$seo_title = Post_Meta::get_post_meta( 'ystdtb_seo_title', get_the_ID() );
			if ( ! empty( trim( $seo_title ) ) ) {
				$site  = get_bloginfo( 'name', 'display' );
				$sep   = apply_filters( 'document_title_separator', '-' );
				$title = $seo_title . ' ' . $sep . ' ' . $site;
				$title = wptexturize( $title );
				$title = convert_chars( $title );
				$title = esc_html( $title );
				$title = capital_P_dangit( $title );
			}
		}
		echo '<title>' . $title . '</title>' . PHP_EOL;
	}

	/**
	 * メタデスクリプション
	 *
	 * @param string $dscr description.
	 */
	public function meta_description( $dscr ) {
		if ( ! is_singular() ) {
			return $dscr;
		}
		$seo_dscr = Post_Meta::get_post_meta( 'ystdtb_seo_description', get_the_ID() );
		if ( empty( trim( $seo_dscr ) ) ) {
			return $dscr;
		}

		return $seo_dscr;
	}

	/**
	 * SEO設定追加
	 *
	 * @param int $post_id Post id.
	 */
	public function add_seo_option( $post_id ) {
		?>
		<div class="meta-box__list">
			<label class="meta-box__label" for="ystdtb_seo_title"><?php echo esc_html( '<title>' ); ?>タグ用タイトル</label>
			<textarea id="ystdtb_seo_title" class="meta-box__textarea" name="ystdtb_seo_title" rows="2" cols="40"><?php echo esc_textarea( Post_Meta::get_post_meta( 'ystdtb_seo_title', $post_id ) ); ?></textarea>
			<div class="meta-box__dscr"><?php echo esc_html( '<title>' ); ?>タグ用のタイトル設定欄</div>
		</div>
		<div class="meta-box__list">
			<label class="meta-box__label" for="ystdtb_seo_description">meta description</label>
			<textarea id="ystdtb_seo_description" class="meta-box__textarea" name="ystdtb_seo_description" rows="4" cols="40"><?php echo esc_textarea( Post_Meta::get_post_meta( 'ystdtb_seo_description', $post_id ) ); ?></textarea>
		</div>
		<?php
	}

	/**
	 * Post meta保存
	 *
	 * @param int $post_id The ID of the post being saved.
	 */
	public function save_seo_option( $post_id ) {

		Post_Meta::save_post_textarea( $post_id, 'ystdtb_seo_title' );
		Post_Meta::save_post_textarea( $post_id, 'ystdtb_seo_description' );
	}
}

new Post_Meta_SEO();
