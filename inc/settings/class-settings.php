<?php
/**
 * Plugin Settings
 *
 * @package ystandard-toolbox
 * @author  yosiakatsuki
 * @license GPL-2.0+
 */

namespace ystandard_toolbox;

use ystandard_toolbox\helper\AMP;
use ystandard_toolbox\helper\Version_Compare;

defined( 'ABSPATH' ) || die();

/**
 * Class Settings.
 */
class Settings {

	/**
	 * サブメニュー.
	 */
	const SUBMENU = [
		[
			'slug'       => Config::ADMIN_MENU_SLUG_V2,
			'page-title' => 'yStandard Toolbox',
			'menu-title' => 'yStandard Toolbox',
		],
	];

	/**
	 * Constructor.
	 */
	public function __construct() {
		add_action( 'admin_menu', [ $this, 'add_menu_page' ], 50 );
		add_filter( 'admin_body_class', [ $this, 'admin_body_class' ], 20 );
		add_action( 'admin_enqueue_scripts', [ $this, 'admin_enqueue_scripts' ], 50 );
	}

	/**
	 * 管理画面-スクリプトの読み込み
	 *
	 * @param string $hook_suffix suffix.
	 *
	 * @return void
	 */
	public function admin_enqueue_scripts( $hook_suffix ) {
		if ( false === strpos( $hook_suffix, Config::ADMIN_MENU_PREFIX_V2 ) ) {
			return;
		}

		if ( ! Version_Compare::ystandard_version_compare() ) {
			wp_enqueue_style(
				'ystdtb-plugin-settings-orbitron',
				'https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700&display=swap',
			);
		}

		wp_enqueue_style(
			'ystdtb-plugin-settings',
			YSTDTB_URL . '/css/ystandard-toolbox-plugin-settings.css',
			[],
			filemtime( YSTDTB_PATH . '/css/ystandard-toolbox-plugin-settings.css' )
		);

		wp_enqueue_style( 'wp-components' );
		wp_enqueue_media();

		$asset_file                 = include( YSTDTB_PATH . '/dist/plugin-settings/plugin-settings.asset.php' );
		$asset_file['dependencies'] = array_merge(
			$asset_file['dependencies'],
			[ 'jquery' ]
		);

		wp_enqueue_script(
			'ystdtb-plugin-settings',
			YSTDTB_URL . '/dist/plugin-settings/plugin-settings.js',
			$asset_file['dependencies'],
			$asset_file['version'],
			true
		);
		wp_localize_script(
			'ystdtb-plugin-settings',
			'ystdtbPluginSettings',
			[
				'siteUrl'     => esc_url_raw( home_url() ),
				'pluginUrl'   => YSTDTB_URL,
				'menuPageUrl' => esc_url_raw( admin_url( 'admin.php?page=' ) ),
				'isAmpEnable' => AMP::is_amp_enable(),
			]
		);

		foreach ( glob( YSTDTB_PATH . '/dist/plugin-settings/*.js' ) as $file ) {
			if ( ! is_file( $file ) ) {
				continue;
			}
			$name = basename( $file, '.js' );
			if ( 'plugin-settings' === $name ) {
				continue;
			}
			$asset = include( YSTDTB_PATH . "/dist/plugin-settings/${name}.asset.php" );
			wp_enqueue_script(
				"ystdtb-plugin-settings-${name}",
				YSTDTB_URL . "/dist/plugin-settings/${name}.js",
				$asset['dependencies'],
				$asset['version'],
				true
			);
		}

	}

	/**
	 * メニュー追加
	 */
	public function add_menu_page() {
		add_menu_page(
			'yStandard Toolbox',
			'[ys] Toolbox',
			'manage_options',
			Config::ADMIN_MENU_SLUG_V2,
			'',
			Utility::get_menu_icon(),
			59
		);
		foreach ( self::SUBMENU as $menu ) {
			add_submenu_page(
				Config::ADMIN_MENU_SLUG_V2,
				$menu['page-title'],
				$menu['menu-title'],
				'manage_options',
				$menu['slug'],
				[ $this, 'menu_page' ],
			);
		}
	}

	public function menu_page() {
		if ( ! current_user_can( 'manage_options' ) ) {
			wp_die( __( 'You do not have sufficient permissions to access this page.' ) );
		}
		$slug = $this->get_menu_page_slug();
		?>
		<div class="wrap">
			<div class="ystdtb-settings-v2">
				<!-- <?php echo esc_html( $slug ); ?> -->
				<div id="<?php echo esc_attr( $slug ); ?>" class="ystdtb-settings-v2__detail"></div>
			</div>
		</div>
		<?php
	}


	/**
	 * メニューページスラッグの取得.
	 *
	 * @return string
	 */
	private function get_menu_page_slug() {
		global $hook_suffix;
		$slug = $hook_suffix;

		if ( false !== strpos( $slug, 'toplevel_page_' ) ) {
			$slug = str_replace( 'toplevel_page_', '', $slug );
		}

		return $slug;
	}

	/**
	 * Body Class.
	 *
	 * @param string $classes Classes.
	 *
	 * @return string
	 */
	public function admin_body_class( $classes ) {
		global $hook_suffix;
		if ( false === strpos( $hook_suffix, Config::ADMIN_MENU_PREFIX_V2 ) ) {
			return $classes;
		}
		if ( false === strpos( $classes, 'ystdtb-settings-v2' ) ) {
			$classes = $classes . ' ystdtb-settings-v2';
		}

		return $classes;
	}
}

new Settings();
