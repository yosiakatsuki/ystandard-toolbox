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
 * Class Taxonomy
 *
 * @package ystandard_toolbox
 */
class Taxonomy {

	/**
	 * Nonce Name
	 */
	const NONCE_NAME = 'ystdtb-term-nonce';
	/**
	 * Nonce Action
	 */
	const NONCE_ACTION = 'ystdtb-term-action';

	/**
	 * Taxonomy constructor.
	 */
	public function __construct() {
		$this->add_term_options();
		add_action( 'admin_enqueue_scripts', [ $this, 'admin_enqueue_scripts' ], 50 );
		add_action( 'ystdtb_render_title_tag', [ $this, 'render_title_tag' ] );
		add_filter( 'ys_get_meta_description', [ $this, 'meta_description' ], PHP_INT_MAX );
		add_filter( 'ys_ogp_description_archive', [ $this, 'meta_description' ], PHP_INT_MAX );
	}

	/**
	 * タイトルタグの書き換え
	 *
	 * @param string $title Title.
	 */
	public function render_title_tag( $title ) {
		if ( ! Utility::is_term_archive() ) {
			return $title;
		}
		$term_id = $this->get_term_id();

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
	 */
	public function meta_description( $dscr ) {
		if ( ! Utility::is_term_archive() ) {
			return $dscr;
		}
		$term_id = $this->get_term_id();
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
	 * タームIDの取得
	 *
	 * @return bool|int
	 */
	private function get_term_id() {
		$term_id = false;
		if ( is_tax() ) {
			$taxonomy = get_query_var( 'taxonomy' );
			$term     = get_term_by( 'slug', get_query_var( 'term' ), $taxonomy );
			$term_id  = $term->term_id;
		} elseif ( is_category() ) {
			$category_name = single_cat_title( '', false );
			$term_id       = get_cat_ID( $category_name );
		} elseif ( is_tag() ) {
			$tag     = get_queried_object();
			$term_id = $tag->term_id;
		}

		return $term_id;
	}

	/**
	 * 管理画面-スクリプトの読み込み
	 *
	 * @param string $hook_suffix suffix.
	 *
	 * @return void
	 */
	public function admin_enqueue_scripts( $hook_suffix ) {
		if ( false === strpos( $hook_suffix, 'term.php' ) ) {
			return;
		}
		wp_enqueue_style(
			'ystdtb-admin',
			YSTDTB_URL . '/css/ystandard-toolbox-admin.css',
			[],
			filemtime( YSTDTB_PATH . '/css/ystandard-toolbox-admin.css' )
		);
		wp_enqueue_script(
			'ystdtb-admin',
			YSTDTB_URL . '/js/admin/admin.js',
			[],
			filemtime( YSTDTB_PATH . '/js/admin/admin.js' ),
			true
		);
	}

	/**
	 * タームの拡張設定追加
	 */
	private function add_term_options() {

		$taxonomies = get_taxonomies(
			[
				'public'  => true,
				'show_ui' => true,
			]
		);
		foreach ( $taxonomies as $key => $value ) {
			add_action( "${key}_edit_form", [ $this, 'edit_form' ], 10, 2 );
			add_action( "edit_${key}", [ $this, 'update_term_meta' ] );
		}
	}

	/**
	 * タームに設定追加
	 *
	 * @param \WP_Term $tag      Current taxonomy term object.
	 * @param string   $taxonomy Current taxonomy slug.
	 */
	public function edit_form( $tag, $taxonomy ) {
		?>
		<div class="ystdtb-term-option">
			<?php wp_nonce_field( self::NONCE_ACTION, self::NONCE_NAME ); ?>
			<div class="ystdtb-term-option__label">yStandard Toolbox 設定</div>
			<div class="ystdtb-term-option__manual"><?php echo Utility::manual_link_inline( 'term-meta' ); ?></div>
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
	 * 入力された値の保存・削除
	 *
	 * @param int $term_id Term ID.
	 */
	public function update_term_meta( $term_id ) {

		if ( ! Utility::verify_nonce( self::NONCE_NAME, self::NONCE_ACTION ) ) {
			return;
		}
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

new Taxonomy();