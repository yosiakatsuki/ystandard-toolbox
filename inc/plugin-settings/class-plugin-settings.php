<?php
/**
 * Plugin Settings
 *
 * @package ystandard-toolbox
 * @author  yosiakatsuki
 * @license GPL-2.0+
 */

namespace ystandard_toolbox;

use ystandard_toolbox\Util\Admin;
use ystandard_toolbox\Util\AMP;
use ystandard_toolbox\Util\Version;

defined( 'ABSPATH' ) || die();

/**
 * Class Settings.
 */
class Plugin_Settings {

	/**
	 * サブメニュー.
	 */
	const SUBMENU = [
		[
			'slug'       => '',
			'page-title' => 'yStandard Toolbox',
			'menu-title' => 'yStandard Toolbox',
		],
		[
			'slug'       => 'heading-v2',
			'page-title' => '見出しデザイン編集',
			'menu-title' => '見出しデザイン編集',
		],
		[
			'slug'       => 'design',
			'page-title' => 'サイトデザイン拡張',
			'menu-title' => 'サイトデザイン拡張',
		],
		[
			'slug'       => 'cta',
			'page-title' => '投稿詳細ページ上下拡張',
			'menu-title' => '投稿詳細ページ拡張',
		],
		[
			'slug'       => 'font',
			'page-title' => 'フォント設定',
			'menu-title' => 'フォント設定',
		],
		[
			'slug'       => 'custom-css',
			'page-title' => 'カスタムCSS',
			'menu-title' => 'カスタムCSS',
		],
		[
			'slug'       => 'add-code',
			'page-title' => 'コード追加',
			'menu-title' => 'コード追加',
		],
	];

	/**
	 * Constructor.
	 */
	public function __construct() {
		add_action( 'admin_menu', [ $this, 'add_menu_page' ], 50 );
		add_filter( 'admin_body_class', [ $this, 'admin_body_class' ], 20 );
		add_action( 'admin_enqueue_scripts', [ $this, 'admin_enqueue_scripts' ], 50 );
		add_action( 'rest_api_init', [ $this, 'register_routes' ] );
	}

	/**
	 * Register REST API route
	 */
	public function register_routes() {
		// プラグイン設定取得.
		Api::register_rest_route(
			'get_plugin_settings',
			[ $this, 'get_plugin_settings' ],
			'GET'
		);
		Api::register_rest_route(
			'update_plugin_settings_all',
			[ $this, 'update_plugin_settings_all' ],
		);
	}

	/**
	 * プラグイン設定取得.
	 *
	 * @return \WP_Error|\WP_HTTP_Response|\WP_REST_Response
	 */
	public function get_plugin_settings() {
		return rest_ensure_response(
			[
				'plugin' => Option::get_all_option(),
			]
		);
	}

	/**
	 * 設定更新
	 *
	 * @param \WP_REST_Request $request Request.
	 *
	 * @return \WP_Error|\WP_HTTP_Response|\WP_REST_Response
	 */
	public function update_plugin_settings_all( $request ) {
		$data = apply_filters(
			'ystdtb_update_plugin_settings_all_data',
			$request->get_json_params()
		);
		if ( is_array( $data ) ) {
			$result = [];
			foreach ( $data as $section => $value ) {
				$result[] = Option::update_plugin_option( $section, $value );
			}
			$result = 1 === count( array_values( array_unique( $result ) ) ) ? $result[0] : false;
		} else {
			$result = Option::update_option(
				Config::OPTION_NAME,
				$data
			);
		}

		return Api::create_response(
			$result,
			'',
			json_encode( $data )
		);
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
		self::enqueue_setting_base_scripts();
		$this->enqueue_setting_page_scripts( $hook_suffix );
	}

	/**
	 * 設定ページに必要な基本スクリプト読み込み
	 *
	 * @return void
	 */
	public static function enqueue_setting_base_scripts() {
		if ( ! Version::ystandard_version_compare() ) {
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
		wp_enqueue_style( 'wp-block-editor' );
		wp_enqueue_media();

		$asset_file                 = include( YSTDTB_PATH . '/build/plugin-settings/plugin-settings.asset.php' );
		$asset_file['dependencies'] = array_merge(
			$asset_file['dependencies'],
			[ 'jquery' ]
		);

		wp_enqueue_script(
			'ystdtb-plugin-settings',
			YSTDTB_URL . '/build/plugin-settings/plugin-settings.js',
			$asset_file['dependencies'],
			$asset_file['version'],
			true
		);
		wp_localize_script(
			'ystdtb-plugin-settings',
			'ystdtbAdminConfig',
			apply_filters(
				'ystdtb_admin_config',
				[
					'siteUrl'      => esc_url_raw( home_url() ),
					'pluginUrl'    => YSTDTB_URL,
					'adminUrl'     => esc_url_raw( admin_url() ),
					'isAmpEnable'  => AMP::is_amp_enable(),
					'editorColors' => self::get_editor_colors(),
				]
			)
		);
		wp_localize_script(
			'ystdtb-plugin-settings',
			'ystdtbPluginSettings',
			apply_filters(
				'ystdtb_plugin_settings',
				[
					'settings' => Option::get_all_option(),
				]
			)
		);
	}

	/**
	 * 設定ページ用スクリプト読み込み
	 *
	 * @param string $hook_suffix Hook Suffix.
	 *
	 * @return void
	 */
	private function enqueue_setting_page_scripts( $hook_suffix ) {
		foreach ( glob( YSTDTB_PATH . '/build/plugin-settings/*.js' ) as $file ) {
			if ( ! is_file( $file ) ) {
				continue;
			}
			$name = basename( $file, '.js' );
			if ( 'plugin-settings' === $name ) {
				continue;
			}
			if ( $name !== $this->get_menu_page_slug( $hook_suffix ) ) {
				continue;
			}
			if ( false === strpos( $hook_suffix, Config::ADMIN_MENU_PREFIX_V2 ) ) {
				return;
			}
			$asset = include( YSTDTB_PATH . "/build/plugin-settings/{$name}.asset.php" );
			wp_enqueue_script(
				"ystdtb-plugin-settings-{$name}",
				YSTDTB_URL . "/build/plugin-settings/{$name}.js",
				$asset['dependencies'],
				$asset['version'],
				true
			);
			if ( file_exists( YSTDTB_PATH . "/build/plugin-settings/{$name}.css" ) ) {
				wp_enqueue_style(
					"ystdtb-plugin-settings-{$name}",
					YSTDTB_URL . "/build/plugin-settings/{$name}.css",
					[],
					$asset['version'],
				);
			}
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
			Admin::get_menu_icon(),
			59
		);
		foreach ( self::SUBMENU as $menu ) {
			$slug = Config::ADMIN_MENU_SLUG_V2;
			if ( ! empty( $menu['slug'] ) ) {
				$slug .= '-' . $menu['slug'];
			}
			add_submenu_page(
				Config::ADMIN_MENU_SLUG_V2,
				$menu['page-title'],
				$menu['menu-title'],
				'manage_options',
				$slug,
				[ '\ystandard_toolbox\Plugin_Settings', 'menu_page' ],
			);
		}
	}

	/**
	 * メニューページHTML
	 *
	 * @return void
	 */
	public static function menu_page() {
		if ( ! current_user_can( 'manage_options' ) ) {
			wp_die( __( 'You do not have sufficient permissions to access this page.' ) );
		}
		$slug = self::get_menu_page_slug();
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
	 * @param string $_hook_suffix Hook Suffix.
	 *
	 * @return string
	 */
	public static function get_menu_page_slug( $_hook_suffix = '' ) {
		global $hook_suffix;
		$slug = ! $_hook_suffix ? $hook_suffix : $_hook_suffix;

		if ( false !== strpos( $slug, 'toplevel_page_' ) ) {
			$slug = str_replace( 'toplevel_page_', '', $slug );
		}
		if ( false !== strpos( $slug, 'page_ystdtb-settings-v2-' ) ) {
			$slug = preg_replace( '/^.+page_ystdtb-settings-v2-/i', '', $slug );
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

	/**
	 * カラーパレットの取得
	 *
	 * @return array
	 */
	private static function get_editor_colors() {
		$palette = get_theme_support( 'editor-color-palette' );
		if ( ! is_array( $palette ) || empty( $palette ) ) {
			return [];
		}

		return $palette[0];
	}
}

new Plugin_Settings();
