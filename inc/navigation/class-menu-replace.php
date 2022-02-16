<?php
/**
 * メニュー切り替え機能
 *
 * @package ystandard-toolbox
 * @author  yosiakatsuki
 * @license GPL-2.0+
 */

namespace ystandard_toolbox;

defined( 'ABSPATH' ) || die();

/**
 * Class Menu replace
 *
 * @package ystandard_toolbox
 */
class Menu_Replace {

	/**
	 * メタボックスID.
	 */
	const META_BOX_ID = 'menu-replace';

	/**
	 * Menu_Replace Constructor.
	 */
	public function __construct() {
		add_filter( 'wp_nav_menu_args', [ $this, 'replace_menu' ] );
		add_filter( 'admin_head', [ $this, 'delete_meta_box' ] );
		new Meta_Box(
			self::META_BOX_ID,
			'メニュー切り替え',
			[ $this, 'meta_box' ],
			[ $this, 'save_meta' ]
		);
	}

	/**
	 * メニュー書き換え
	 *
	 * @param array $args Array of wp_nav_menu() arguments.
	 */
	public function replace_menu( $args ) {

		if ( ! $this->can_replace_menu() ) {
			return $args;
		}
		$post = get_post();
		if ( ! $post ) {
			return $args;
		}
		$value = Post_Meta::get_post_meta( 'ystdtb-menu-replace', $post->ID );
		if ( ! is_array( $value ) ) {
			return $args;
		}
		$location = $args['theme_location'];
		if ( ! array_key_exists( $location, $value ) ) {
			return $args;
		}
		$menu_id = $value[ $location ];
		if ( ! $menu_id || ! is_numeric( $menu_id ) ) {
			return $args;
		}
		$args['menu'] = (int) $menu_id;

		return $args;
	}

	/**
	 * タイトル書き換え可能なページか
	 *
	 * @param int $post_id post id.
	 *
	 * @return bool
	 */
	private function can_replace_menu( $post_id = 0 ) {
		if ( 0 === $post_id ) {
			$post = get_post();
			if ( $post ) {
				$post_id = $post->ID;
			}
		}

		$show_on_front = get_option( 'show_on_front' );
		$front_page    = get_option( 'page_on_front' );
		$front_page    = is_numeric( $front_page ) ? (int) $front_page : 0;
		$result        = 'page' === $show_on_front && 0 !== $front_page && $front_page === $post_id;

		return apply_filters( 'ystdtb_can_replace_menu', $result );
	}

	/**
	 * メタボックスの判定と削除.
	 */
	public function delete_meta_box() {
		global $post;
		if ( empty( $post ) || $this->can_replace_menu( $post->ID ) ) {
			return;
		}
		Meta_Box::remove_meta_box( self::META_BOX_ID );
	}

	/**
	 * Meta box 表示.
	 *
	 * @param int $post_id Post ID.
	 */
	public function meta_box( $post_id ) {

		if ( ! $this->can_replace_menu( $post_id ) ) {
			return;
		}

		$value     = Post_Meta::get_post_meta( 'ystdtb-menu-replace', $post_id );
		$value     = ! is_array( $value ) ? [] : $value;
		$locations = get_registered_nav_menus();
		$menu_list = [];
		$nav_menus = wp_get_nav_menus();
		if ( is_array( $nav_menus ) ) {
			foreach ( $nav_menus as $_nav_menu ) {
				$menu_list[ $_nav_menu->term_id ] = $_nav_menu->name;
			}
		}
		?>
		<div class="ystdtb-meta-box">
			<?php foreach ( $locations as $location => $location_label ) : ?>
				<label for="<?php echo esc_attr( $location ); ?>" style="display: block;font-weight: bold;margin-top: 1em;"><?php echo esc_html( $location_label ); ?></label>
				<?php
				$selected = array_key_exists( $location, $value ) ? $value[ $location ] : '';
				$selected = is_numeric( $selected ) ? (int) $selected : '';
				?>
				<select name="ystdtb-menu-replace[<?php echo esc_attr( $location ); ?>]" id="<?php echo esc_attr( $location ); ?>" style="display: block;width: 100%;box-sizing: border-box;">
					<option value="" <?php selected( $selected, '' ); ?>>- 変更なし -</option>
					<?php foreach ( $menu_list as $term_id => $name ) : ?>
						<option value="<?php echo esc_attr( $term_id ); ?>" <?php selected( $selected, $term_id ); ?>><?php echo esc_html( $name ); ?></option>
					<?php endforeach; ?>
				</select>
			<?php endforeach; ?>
		</div>
		<?php
	}

	/**
	 * メニュー切り替え不可能案内
	 */
	private function disable_replace_menu_info() {
		?>
		<?php
	}

	/**
	 * 投稿メタ保存
	 *
	 * @param int $post_id Post ID.
	 */
	public function save_meta( $post_id ) {
		Post_Meta::save_post_meta( $post_id, 'ystdtb-menu-replace' );
	}

}

new Menu_Replace();
