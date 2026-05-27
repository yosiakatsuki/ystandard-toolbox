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

		wp_enqueue_style( Shared_Styles::AKTK_COMPONENTS_EDITOR_HANDLE );
		wp_enqueue_style( 'wp-components' );
		wp_enqueue_style( 'wp-block-editor' );
		wp_enqueue_media();

		$asset_file                 = include( YSTDTB_PATH . '/build/plugin-settings/plugin-settings.asset.php' );
		$asset_file['dependencies'] = array_merge(
			$asset_file['dependencies'],
			[ 'jquery' ]
		);

		$script_handle = 'ystdtb-plugin-settings';
		wp_enqueue_script(
			$script_handle,
			YSTDTB_URL . '/build/plugin-settings/plugin-settings.js',
			$asset_file['dependencies'],
			$asset_file['version'],
			true
		);
		wp_localize_script(
			$script_handle,
			'ystdtbAdminConfig',
			apply_filters(
				'ystdtb_admin_config',
				[
					'siteUrl'            => esc_url_raw( home_url() ),
					'pluginUrl'          => YSTDTB_URL,
					'adminUrl'           => esc_url_raw( admin_url() ),
					'isYStandard'        => Version::ystandard_version_compare(),
					'isAmpEnable'        => AMP::is_amp_enable(),
					'editorSettings'     => self::get_editor_settings(),
					'editorColors'       => self::get_editor_colors(),
					'editorFontSizes'    => self::get_editor_font_sizes(),
					'editorFontFamilies' => self::get_editor_font_families(),
					'editorSpacingSizes' => self::get_editor_spacing_sizes(),
				]
			)
		);
		wp_localize_script(
			$script_handle,
			'ystdtbPluginSettings',
			apply_filters(
				'ystdtb_plugin_settings',
				[
					'settings' => Option::get_all_option(),
				]
			)
		);
		do_action( 'ystdtb_enqueue_plugin_settings_base_scripts', $script_handle );
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
			do_action( 'ystdtb_enqueue_plugin_settings_page_scripts', $name );
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
		// トップページ（WordPress が自動生成する重複メニューを置き換え）.
		add_submenu_page(
			Config::ADMIN_MENU_SLUG_V2,
			'yStandard Toolbox',
			'yStandard Toolbox',
			'manage_options',
			Config::ADMIN_MENU_SLUG_V2,
			[ '\ystandard_toolbox\Plugin_Settings', 'menu_page' ],
		);
		/**
		 * プラグイン設定画面のサブメニュー一覧をフィルターする（内部用）.
		 *
		 * 各機能クラスのコンストラクタからサブメニューを登録する.
		 * 配列の各要素は以下のキーを持つ:
		 * - slug      (string) サブメニューのスラッグ.
		 * - page-title (string) ページタイトル.
		 * - menu-title (string) メニュータイトル.
		 * - priority   (int)    表示順（小さいほど先に表示、デフォルト: 50）.
		 *
		 * @param array $submenus サブメニュー定義の配列.
		 */
		$submenus = apply_filters( 'ystdtb_plugin_settings_submenus', [] );
		usort(
			$submenus,
			function ( $a, $b ) {
				$a_priority = $a['priority'] ?? 50;
				$b_priority = $b['priority'] ?? 50;

				return $a_priority - $b_priority;
			}
		);
		foreach ( $submenus as $menu ) {
			$slug = Config::ADMIN_MENU_SLUG_V2 . '-' . $menu['slug'];
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
	 * エディター設定を取得
	 *
	 * @return array エディター設定の配列
	 */
	private static function get_editor_settings() {
		if ( ! function_exists( 'wp_get_global_settings' ) ) {
			return [];
		}

		return wp_get_global_settings();
	}

	/**
	 * カラーパレットの取得
	 *
	 * theme.jsonとadd_theme_support()の両方からカラーパレットを取得してマージする
	 *
	 * @return array カラーパレットの配列
	 */
	private static function get_editor_colors() {
		$colors = [];

		// theme.jsonからカラーパレットを取得
		if ( class_exists( 'WP_Theme_JSON_Resolver' ) ) {
			$theme_json = \WP_Theme_JSON_Resolver::get_merged_data();
			$settings   = $theme_json->get_settings();

			if ( isset( $settings['color']['palette']['theme'] ) ) {
				$theme_colors = $settings['color']['palette']['theme'];
				if ( is_array( $theme_colors ) ) {
					$colors = array_merge( $colors, $theme_colors );
				}
			}
		}

		// add_theme_support('editor-color-palette')からカラーパレットを取得
		$theme_support_colors = get_theme_support( 'editor-color-palette' );
		if ( is_array( $theme_support_colors ) && ! empty( $theme_support_colors ) ) {
			$theme_support_colors = $theme_support_colors[0];
			if ( is_array( $theme_support_colors ) ) {
				$colors = array_merge( $colors, $theme_support_colors );
			}
		}

		// 重複を除去（slugをキーとして使用）
		$unique_colors = [];
		foreach ( $colors as $color ) {
			if ( isset( $color['slug'] ) ) {
				$unique_colors[ $color['slug'] ] = $color;
			}
		}

		return array_values( $unique_colors );
	}

	/**
	 * エディターで使用可能なフォントサイズを取得
	 *
	 * theme.jsonとadd_theme_support()の両方からフォントサイズを取得する.
	 *
	 * @return array フォントサイズの配列
	 */
	private static function get_editor_font_sizes() {
		// useSettings()で参照するoriginごとに値を保持する.
		$font_sizes = [
			'default' => [],
			'theme'   => [],
			'custom'  => [],
		];

		// theme.jsonのtypography.fontSizesをoriginごとに取得する.
		if ( class_exists( 'WP_Theme_JSON_Resolver' ) ) {
			$theme_json = \WP_Theme_JSON_Resolver::get_merged_data();
			$settings   = $theme_json->get_settings();

			foreach ( array_keys( $font_sizes ) as $origin ) {
				if ( isset( $settings['typography']['fontSizes'][ $origin ] ) && is_array( $settings['typography']['fontSizes'][ $origin ] ) ) {
					$font_sizes[ $origin ] = $settings['typography']['fontSizes'][ $origin ];
				}
			}
		}

		// add_theme_support('editor-font-sizes')はtheme originとして扱う.
		$theme_support_sizes = get_theme_support( 'editor-font-sizes' );
		if ( is_array( $theme_support_sizes ) && ! empty( $theme_support_sizes ) ) {
			$theme_support_sizes = $theme_support_sizes[0];
			if ( is_array( $theme_support_sizes ) ) {
				$font_sizes['theme'] = array_merge( $font_sizes['theme'], $theme_support_sizes );
			}
		}

		// slugをキーにして重複を除去する.
		foreach ( $font_sizes as $origin => $sizes ) {
			$unique_font_sizes = [];
			foreach ( $sizes as $font_size ) {
				if ( isset( $font_size['slug'] ) ) {
					$unique_font_sizes[ $font_size['slug'] ] = $font_size;
				}
			}
			$font_sizes[ $origin ] = array_values( $unique_font_sizes );
		}

		return $font_sizes;
	}

	/**
	 * エディターで使用可能なフォントファミリーを取得
	 *
	 * theme.json から typography.fontFamilies を取得する.
	 *
	 * @return array フォントファミリーの配列
	 */
	private static function get_editor_font_families() {
		// useSettings()で参照するoriginごとに値を保持する.
		$font_families = [
			'default' => [],
			'theme'   => [],
			'custom'  => [],
		];

		if ( class_exists( 'WP_Theme_JSON_Resolver' ) ) {
			$theme_json = \WP_Theme_JSON_Resolver::get_merged_data();
			$settings   = $theme_json->get_settings();

			// theme.jsonのtypography.fontFamiliesをoriginごとに取得する.
			foreach ( array_keys( $font_families ) as $origin ) {
				if ( isset( $settings['typography']['fontFamilies'][ $origin ] ) && is_array( $settings['typography']['fontFamilies'][ $origin ] ) ) {
					$font_families[ $origin ] = $settings['typography']['fontFamilies'][ $origin ];
				}
			}
		}

		// slugまたはfontFamilyをキーにして重複を除去する.
		foreach ( $font_families as $origin => $families ) {
			$unique_font_families = [];
			foreach ( $families as $font_family ) {
				if ( isset( $font_family['slug'] ) ) {
					$unique_font_families[ $font_family['slug'] ] = $font_family;
					continue;
				}
				if ( isset( $font_family['fontFamily'] ) ) {
					$unique_font_families[ $font_family['fontFamily'] ] = $font_family;
				}
			}
			$font_families[ $origin ] = array_values( $unique_font_families );
		}

		return $font_families;
	}

	/**
	 * 余白サイズ（spacingSizes）の取得
	 *
	 * theme.json の typography.fontSizes と同パターンで spacing.spacingSizes.theme を取得する.
	 *
	 * @return array 余白サイズの配列
	 */
	private static function get_editor_spacing_sizes() {
		$spacing_sizes = [];

		// theme.json から余白サイズを取得.
		if ( class_exists( 'WP_Theme_JSON_Resolver' ) ) {
			$theme_json = \WP_Theme_JSON_Resolver::get_merged_data();
			$settings   = $theme_json->get_settings();

			if ( isset( $settings['spacing']['spacingSizes']['theme'] ) ) {
				$theme_spacing_sizes = $settings['spacing']['spacingSizes']['theme'];
				if ( is_array( $theme_spacing_sizes ) ) {
					$spacing_sizes = $theme_spacing_sizes;
				}
			}
		}

		// 重複を除去（slugをキーとして使用）.
		$unique_spacing_sizes = [];
		foreach ( $spacing_sizes as $spacing_size ) {
			if ( isset( $spacing_size['slug'] ) ) {
				$unique_spacing_sizes[ $spacing_size['slug'] ] = $spacing_size;
			}
		}

		return array_values( $unique_spacing_sizes );
	}

}

new Plugin_Settings();
