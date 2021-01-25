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
		add_action( 'init', [ $this, 'add_term_options' ], PHP_INT_MAX );
		add_action( 'admin_enqueue_scripts', [ $this, 'admin_enqueue_scripts' ], 50 );
	}

	/**
	 * タームIDの取得
	 *
	 * @return bool|int
	 */
	public static function get_term_id() {
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
	 * カテゴリー・タグ・ターム 一覧ページかどうか
	 */
	public static function is_term_archive() {
		return is_tax() || is_category() || is_tag();
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
	public function add_term_options() {

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
		<div class="ystdtb-option-box">
			<?php wp_nonce_field( self::NONCE_ACTION, self::NONCE_NAME ); ?>
			<h2 class="ystdtb-option-box__label">yStandard Toolbox 設定</h2>
			<div class="ystdtb-option-box__manual"><?php echo Utility::manual_link_inline( 'manual/ystdtb-term-meta' ); ?></div>
			<?php do_action( 'ystdtb_term_edit_form', $tag, $taxonomy ); ?>
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

		do_action( 'ystdtb_term_edit_save', $term_id );
	}
}

new Taxonomy();
