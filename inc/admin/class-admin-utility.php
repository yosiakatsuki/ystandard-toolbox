<?php
/**
 * Admin Utility
 *
 * @package ystandard-toolbox
 * @author  yosiakatsuki
 * @license GPL-2.0+
 */

namespace ystandard_toolbox;

defined( 'ABSPATH' ) || die();

/**
 * Class Admin_Utility
 *
 * @package ystandard_toolbox
 */
class Admin_Utility {

	/**
	 * Toolbox設定画面チェック
	 *
	 * @param string $hook_suffix Hook Suffix.
	 *
	 * @return bool
	 */
	public static function is_toolbox_admin_page( $hook_suffix ) {
		$result = false;
		if ( false !== strpos( $hook_suffix, Config::ADMIN_MENU_PARENT_SLUG ) ) {
			$result = true;
		}

		if ( false !== strpos( $hook_suffix, Config::ADMIN_MENU_PAGE_PREFIX ) ) {
			$result = true;
		}

		return $result;
	}

	/**
	 * メニューページの準備
	 */
	public static function init_menu_page() {
		add_action( 'admin_enqueue_scripts', [ __CLASS__, 'enqueue_base_style' ] );
		add_action( 'admin_body_class', [ __CLASS__, 'admin_body_class' ] );
	}

	/**
	 * 管理画面用CSS読み込み
	 *
	 * @param string $hook_suffix Hook Suffix.
	 */
	public static function enqueue_base_style( $hook_suffix ) {
		if ( ! self::is_toolbox_admin_page( $hook_suffix ) ) {
			return;
		}

		wp_enqueue_style(
			'ystdtb-admin',
			YSTDTB_URL . '/css/ystandard-toolbox-admin.css',
			[],
			filemtime( YSTDTB_PATH . '/css/ystandard-toolbox-admin.css' )
		);
	}

	/**
	 * Body Class.
	 *
	 * @param string $classes Classes.
	 *
	 * @return string
	 */
	public static function admin_body_class( $classes ) {
		global $hook_suffix;
		if ( ! self::is_toolbox_admin_page( $hook_suffix ) ) {
			return $classes;
		}
		if ( false === strpos( $classes, 'ystdtb-menu-page' ) ) {
			$classes = $classes . ' ystdtb-menu-page';
		}

		return $classes;
	}

	/**
	 * メニューページURL取得
	 *
	 * @param string $name Name.
	 *
	 * @return string
	 */
	public static function get_menu_page_url( $name ) {
		$menu_page = config::ADMIN_MENU_PAGE_PREFIX . '-' . $name;

		return esc_url_raw( admin_url( "admin.php?page=${menu_page}" ) );
	}

	/**
	 * メニューページHTML作成
	 *
	 * @param string $slug    Menu Slug.
	 * @param string $content Content.
	 */
	public static function the_admin_page_html( $slug, $content ) {
		?>
		<div class="wrap">
			<div class="ystdtb-menu">
				<ul class="ystdtb-menu__nav">
					<?php self::create_menu_nav( $slug ); ?>
				</ul>
				<div class="ystdtb-menu__detail">
					<?php echo $content; ?>
				</div>
			</div>
		</div>
		<?php
	}

	/**
	 * メニューナビゲーション作成
	 *
	 * @param string $slug Menu Slug.
	 */
	private static function create_menu_nav( $slug ) {
		$nav = apply_filters( Config::ADMIN_MENU_NAV_HOOK, [] );
		foreach ( $nav as $item ) {
			$current = $item['name'] === $slug ? 'is-current' : '';
			?>
			<li class="ystdtb-menu__nav-item <?php echo $current; ?>">
				<a href="<?php echo Admin_Utility::get_menu_page_url( $item['name'] ); ?>"><?php echo esc_html( $item['label'] ); ?></a>
			</li>
			<?php
		}
	}
}
