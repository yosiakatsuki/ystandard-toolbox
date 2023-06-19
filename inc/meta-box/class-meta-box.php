<?php
/**
 * Meta box.
 *
 * @package ystandard-toolbox
 * @author  yosiakatsuki
 * @license GPL-2.0+
 */

namespace ystandard_toolbox;

use ystandard_toolbox\Util\Admin;

defined( 'ABSPATH' ) || die();

/**
 * Class Meta_Box
 *
 * @package ystandard_toolbox
 */
class Meta_Box {

	/**
	 * Nonce name prefix.
	 */
	const NONCE_NAME_PREFIX = 'ystdtb-nonce-';

	/**
	 * Nonce action prefix.
	 */
	const NONCE_ACTION_PREFIX = 'ystdtb-action-';

	/**
	 * ID
	 *
	 * @var string
	 */
	private $id;

	/**
	 * Title
	 *
	 * @var string
	 */
	private $title;

	/**
	 * メタボックスFrom
	 *
	 * @var callable
	 */
	private $meta_box;

	/**
	 * Save処理
	 *
	 * @var callable
	 */
	private $save;

	/**
	 * ページタイプ
	 *
	 * @var array|null
	 */
	private $screen;

	/**
	 * Meta_Box constructor.
	 *
	 * @param string     $id       ID.
	 * @param string     $title    Title.
	 * @param callable   $meta_box メタボックスForm.
	 * @param callable   $save     Save処理.
	 * @param array|null $screen   ページタイプ.
	 */
	public function __construct( $id, $title, $meta_box, $save, $screen = null ) {
		$this->id       = $id;
		$this->title    = $title;
		$this->meta_box = $meta_box;
		$this->save     = $save;
		$this->screen   = $screen;

		add_action( 'admin_menu', [ $this, 'add_meta_box' ] );
		add_action( 'save_post', [ $this, 'save_post' ] );
	}

	/**
	 * Meta box 追加
	 */
	public function add_meta_box() {
		$screen = $this->screen;
		if ( is_null( $screen ) ) {
			$screen = array_keys( Utility::get_post_types( [], [ 'ys-parts' ] ) );
		}
		add_meta_box(
			'ystdtb_' . $this->id,
			$this->title,
			[ $this, 'add_meta_box_form' ],
			$screen,
			'side'
		);
	}

	/**
	 * メタボックス削除.
	 *
	 * @param string     $id     ID.
	 * @param array|null $screen ページタイプ.
	 */
	public static function remove_meta_box( $id, $screen = null ) {
		remove_meta_box(
			'ystdtb_' . $id,
			$screen,
			'side'
		);
	}

	/**
	 * Meta box フォーム
	 *
	 * @param \WP_Post $post The object for the current post/page.
	 */
	public function add_meta_box_form( $post ) {
		wp_nonce_field(
			self::NONCE_ACTION_PREFIX . $this->id,
			self::NONCE_NAME_PREFIX . $this->id
		);
		call_user_func( $this->meta_box, $post->ID );
	}

	/**
	 * Post meta保存
	 *
	 * @param int $post_id The ID of the post being saved.
	 */
	public function save_post( $post_id ) {
		$nonce  = self::NONCE_NAME_PREFIX . $this->id;
		$action = self::NONCE_ACTION_PREFIX . $this->id;
		if ( ! Admin::verify_nonce( $nonce, $action ) ) {
			return;
		}
		if ( defined( 'DOING_AUTOSAVE' ) && DOING_AUTOSAVE ) {
			return;
		}
		/**
		 * ユーザー権限の確認
		 */
		if ( isset( $_POST['post_type'] ) && 'page' === $_POST['post_type'] ) {
			if ( ! current_user_can( 'edit_page', $post_id ) ) {
				return;
			}
		} else {
			if ( ! current_user_can( 'edit_post', $post_id ) ) {
				return;
			}
		}
		call_user_func( $this->save, $post_id );
	}
}
