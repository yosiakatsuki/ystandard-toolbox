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
 * Class SEO
 *
 * @package ystandard_toolbox
 */
class SEO {

	/**
	 * SEO constructor.
	 */
	public function __construct() {
		add_filter( 'pre_get_document_title', [ $this, 'render_title_tag' ], 11 );
		add_filter( 'ys_get_meta_description', [ $this, 'meta_description' ], PHP_INT_MAX );
		add_filter( 'ys_ogp_description_archive', [ $this, 'meta_description' ], PHP_INT_MAX );
		add_action( 'ystdtb_term_edit_form', [ $this, 'term_seo_edit' ], 10, 2 );
		add_action( 'ystdtb_term_edit_save', [ $this, 'term_seo_save' ] );
	}

	/**
	 * タイトルタグの書き換え
	 *
	 * @param string $title Title.
	 *
	 * @return string
	 */
	public function render_title_tag( $title ) {
		if ( ! Taxonomy::is_term_archive() ) {
			return $title;
		}
		$term_id = Taxonomy::get_term_id();

		if ( ! $term_id ) {
			return $title;
		}
		$seo_title = get_term_meta( $term_id, 'ystdtb-seo-title', true );
		if ( ! empty( $seo_title ) ) {
			$title = Utility::get_document_title( $seo_title );
		}

		return $title;
	}

	/**
	 * メタデスクリプション
	 *
	 * @param string $dscr description.
	 *
	 * @return string
	 */
	public function meta_description( $dscr ) {
		if ( ! Taxonomy::is_term_archive() ) {
			return $dscr;
		}
		$term_id = Taxonomy::get_term_id();
		if ( ! $term_id ) {
			return $dscr;
		}
		$seo_dscr = get_term_meta( $term_id, 'ystdtb-seo-description', true );
		if ( ! empty( $seo_dscr ) ) {
			$dscr = $seo_dscr;
		}

		return $dscr;
	}

	/**
	 * タームにSEO設定追加
	 *
	 * @param \WP_Term $tag      Current taxonomy term object.
	 * @param string   $taxonomy Current taxonomy slug.
	 */
	public function term_seo_edit( $tag, $taxonomy ) {
		?>
		<div class="ystdtb-term-option__section">
			<h3 class="ystdtb-term-option__title">SEO設定</h3>
			<table class="form-table" role="presentation">
				<tr class="form-field">
					<th scope="row">
						<label for="ystdtb-seo-title"><?php echo esc_html( '<title>' ); ?>タグ用タイトル</label>
					</th>
					<td>
						<textarea id="ystdtb-seo-title" name="ystdtb-seo-title" rows="2" cols="40"><?php echo esc_textarea( get_term_meta( $tag->term_id, 'ystdtb-seo-title', true ) ); ?></textarea>
					</td>
				</tr>
				<tr class="form-field">
					<th scope="row">
						<label for="ystdtb-seo-description">meta description</label>
					</th>
					<td>
						<textarea id="ystdtb-seo-description" name="ystdtb-seo-description" rows="4" cols="40"><?php echo esc_textarea( get_term_meta( $tag->term_id, 'ystdtb-seo-description', true ) ); ?></textarea>
					</td>
				</tr>
			</table>
		</div>
		<?php
	}

	/**
	 * SEO設定の保存・削除
	 *
	 * @param int $term_id Term ID.
	 */
	public function term_seo_save( $term_id ) {
		/**
		 * タイトルの上書き
		 */
		if ( isset( $_POST['ystdtb-seo-title'] ) && ! empty( $_POST['ystdtb-seo-title'] ) ) {
			update_term_meta( $term_id, 'ystdtb-seo-title', esc_attr( $_POST['ystdtb-seo-title'] ) );
		} else {
			delete_term_meta( $term_id, 'ystdtb-seo-title' );
		}
		/**
		 * 説明の上書き
		 */
		if ( isset( $_POST['ystdtb-seo-description'] ) && ! empty( $_POST['ystdtb-seo-description'] ) ) {
			update_term_meta( $term_id, 'ystdtb-seo-description', esc_attr( $_POST['ystdtb-seo-description'] ) );
		} else {
			delete_term_meta( $term_id, 'ystdtb-seo-description' );
		}
	}
}

new SEO();
