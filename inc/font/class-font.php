<?php
/**
 * Web Font.
 *
 * @package ystandard-toolbox
 * @author  yosiakatsuki
 * @license GPL-2.0+
 */

namespace ystandard_toolbox;

use ystandard_toolbox\Util\Text;
use ystandard_toolbox\Util\Version;

defined( 'ABSPATH' ) || die();

/**
 * Class Font
 *
 * @package ystandard_toolbox
 */
class Font {

	/**
	 * 設定名
	 */
	const OPTION_NAME = 'font_edit';

	/**
	 * Font constructor.
	 */
	public function __construct() {
		if ( ! wp_is_block_theme() ) {
			// ブロックテーマ以外なら設定画面を表示する.
			// サブメニュー追加.
			add_filter( 'ystdtb_plugin_settings_submenus', [ $this, 'add_submenu' ] );
			// 設定画面周りの準備.
			add_action( 'rest_api_init', [ $this, 'register_routes' ] );
			add_action( 'ystdtb_plugin_settings', [ $this, 'add_plugin_settings' ] );
		}

		// テーマ共通の出力.
		add_action( 'wp_head', [ $this, 'output_font_html' ], 11 );
		add_action( 'admin_head', [ $this, 'output_font_html' ], 11 );
		add_filter( 'wp_resource_hints', [ $this, 'add_resource_hints' ], 10, 2 );
		add_action( 'enqueue_block_assets', [ $this, 'add_editor_font_styles' ], 11 );

		if ( Version::ystandard_version_compare() ) {
			// yStandard テーマ固有の処理.
			add_filter( 'ys_css_vars', [ $this, 'add_font_family' ], 20 );
			add_action( 'ys_customizer_parse_args__ys_design_font_type', [ $this, 'remove_customizer_font_setting' ] );
		} else {
			// 非yStandard: font-family をインラインスタイルで出力.
			add_action( 'wp_enqueue_scripts', [ $this, 'output_font_family_style' ], 11 );
		}
	}

	/**
	 * HTML出力
	 *
	 * 設定に保存されたHTMLを出力する.
	 * Google Fonts 関連の preconnect はプラグイン側で自動出力するため、
	 * 設定値からは除去して出力する.
	 */
	public function output_font_html() {
		$option = trim( wp_unslash( Option::get_option( self::OPTION_NAME, 'html' ) ) );
		if ( empty( $option ) ) {
			return;
		}
		// Google Fonts 関連の preconnect タグを除去（フック経由で自動出力するため）.
		$option = self::remove_google_fonts_preconnect( $option );
		$option = trim( $option );
		if ( empty( $option ) ) {
			return;
		}
		echo $option . PHP_EOL;
	}

	/**
	 * Google Fonts 関連の preconnect タグを除去
	 *
	 * @param string $html HTML文字列.
	 *
	 * @return string
	 */
	private static function remove_google_fonts_preconnect( $html ) {
		return preg_replace(
			'/<link[^>]+rel=["\']preconnect["\'][^>]+href=["\']https:\/\/fonts\.(googleapis|gstatic)\.com["\'][^>]*>\s*/i',
			'',
			$html
		);
	}

	/**
	 * Google Fonts 利用時にリソースヒントを追加
	 *
	 * @param array  $urls          リソースヒントURL一覧.
	 * @param string $relation_type リレーションタイプ.
	 *
	 * @return array
	 */
	public function add_resource_hints( $urls, $relation_type ) {
		if ( 'preconnect' !== $relation_type ) {
			return $urls;
		}
		if ( ! self::has_google_fonts_stylesheet() ) {
			return $urls;
		}
		$urls[] = 'https://fonts.googleapis.com';
		$urls[] = [
			'href'        => 'https://fonts.gstatic.com',
			'crossorigin' => 'anonymous',
		];

		return $urls;
	}

	/**
	 * Google Fonts の stylesheet が設定されているか判定
	 *
	 * @return bool
	 */
	private static function has_google_fonts_stylesheet() {
		$html = trim( wp_unslash( Option::get_option( self::OPTION_NAME, 'html' ) ) );
		if ( empty( $html ) ) {
			return false;
		}

		return false !== strpos( $html, 'fonts.googleapis.com' );
	}

	/**
	 * 非yStandard環境用の font-family CSS 出力
	 */
	public function output_font_family_style() {
		$family = self::get_font_family();
		if ( empty( $family ) ) {
			return;
		}
		$css = 'body{font-family:' . $family . ';}';
		wp_register_style( 'ystdtb-font-family', false );
		wp_enqueue_style( 'ystdtb-font-family' );
		wp_add_inline_style( 'ystdtb-font-family', $css );
	}

	/**
	 * CSS変数追加
	 *
	 * @param array $css_vars vars.
	 *
	 * @return array
	 */
	public function add_font_family( $css_vars ) {
		$font_family = self::get_font_family();

		if ( empty( $font_family ) ) {
			return $css_vars;
		}

		return array_merge(
			$css_vars,
			[ 'font-family' => $font_family ]
		);
	}


	/**
	 * Get font-family option.
	 *
	 * @return string
	 */
	public static function get_font_family() {
		$family = wp_unslash( Option::get_option( self::OPTION_NAME, 'family', '' ) );

		return rtrim( $family, ';' );
	}

	/**
	 * エディターにフォント設定反映
	 *
	 * enqueue_block_assets フック経由で呼ばれるため、
	 * iframe 内のエディターにも CSS が反映される.
	 */
	public function add_editor_font_styles() {
		$family = self::get_font_family();
		if ( empty( $family ) ) {
			return;
		}
		// Google Fonts 等の外部フォント読み込み用HTMLからURLを抽出してエンキュー.
		$this->enqueue_editor_font_url();
		// font-family CSS を反映.
		$css = "
		.editor-styles-wrapper,
		.editor-styles-wrapper .editor-post-title__block .editor-post-title__input {
			font-family:{$family};
		}";
		wp_add_inline_style(
			Config::BLOCK_CSS_HANDLE,
			Text::minify( $css )
		);
	}

	/**
	 * エディター用にフォントURLをエンキュー
	 *
	 * 設定に保存されたHTMLから link タグの href を抽出し、
	 * wp_enqueue_style で登録することで iframe 内にも読み込む.
	 */
	private function enqueue_editor_font_url() {
		$html = trim( wp_unslash( Option::get_option( self::OPTION_NAME, 'html' ) ) );
		if ( empty( $html ) ) {
			return;
		}
		// rel="stylesheet" を含む link タグを抽出.
		if ( ! preg_match_all( '/<link[^>]+rel=["\']stylesheet["\'][^>]*>/i', $html, $tags ) ) {
			return;
		}
		// 各タグから href を取得してエンキュー.
		foreach ( $tags[0] as $index => $tag ) {
			if ( preg_match( '/href=["\']([^"\']+)["\']/', $tag, $href ) ) {
				wp_enqueue_style(
					'ystdtb-editor-font-' . $index,
					$href[1]
				);
			}
		}
	}

	/**
	 * テーマ設定表示用
	 *
	 * @return string
	 */
	public static function get_sample_font_family() {

		return esc_attr( self::get_theme_font() );
	}

	/**
	 * 現在のテーマ設定で取得できるfont-familyの指定
	 *
	 * @return string
	 */
	public static function get_theme_font() {
		if ( ! method_exists( '\ystandard\Font', 'get_usable_fonts' ) ) {
			return '';
		}
		$option = get_option( 'ys_design_font_type', 'meihiragino' );
		$fonts  = \ystandard\Font::get_usable_fonts();
		if ( ! isset( $fonts[ $option ] ) ) {
			return '';
		}

		return $fonts[ $option ]['family'];
	}

	/**
	 * フォント設定削除
	 *
	 * @param array $args 設定.
	 */
	public function remove_customizer_font_setting( $args ) {
		$font_family = self::get_font_family();

		if ( empty( $font_family ) ) {
			return $args;
		}
		$args['control_type'] = 'hidden';
		$args['description']  = Notice::customizer_notice( '※ yStandard Toolboxのフォント設定でフォントが指定されています。' );

		return $args;
	}

	/**
	 * 設定取得
	 *
	 * @return array
	 */
	public static function get_option() {
		$default = [
			'html'        => '',
			'family'      => '',
			'customFonts' => [],
		];
		$option  = Option::get_option( self::OPTION_NAME );
		if ( ! is_array( $option ) ) {
			return $default;
		}
		$option                     = array_merge( $default, $option );
		$option['html']             = wp_unslash( $option['html'] );
		$option['family']           = wp_unslash( $option['family'] );
		$option['customFonts']      = stripslashes_deep( $option['customFonts'] );
		$option['themeFontSetting'] = self::get_theme_font();

		return $option;
	}

	/**
	 * 設定画面用データ追加
	 *
	 * @param array $settings Settings.
	 *
	 * @return array
	 */
	public function add_plugin_settings( $settings ) {
		$settings['font'] = self::get_option();

		return $settings;
	}

	/**
	 * Register REST API route
	 */
	public function register_routes() {
		Api::register_rest_route( 'update_font', [ $this, 'update_option' ] );
	}

	/**
	 * 設定更新
	 *
	 * @param \WP_REST_Request $request Request.
	 *
	 * @return \WP_Error|\WP_HTTP_Response|\WP_REST_Response
	 */
	public function update_option( $request ) {
		$data = $request->get_json_params();
		unset( $data['themeFontSetting'] );
		$result = Option::update_plugin_option( self::OPTION_NAME, $data );

		return Api::create_response(
			$result,
			'',
			json_encode( $data )
		);
	}

	/**
	 * サブメニュー登録
	 *
	 * @param array $submenus サブメニュー一覧.
	 *
	 * @return array
	 */
	public function add_submenu( $submenus ) {
		$submenus[] = [
			'slug'       => 'font',
			'page-title' => 'フォント設定',
			'menu-title' => 'フォント設定',
			'priority'   => 40,
		];

		return $submenus;
	}
}

new Font();
