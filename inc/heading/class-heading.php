<?php
/**
 * Heading
 *
 * @package ystandard-toolbox
 * @author  yosiakatsuki
 * @license GPL-2.0+
 */

namespace ystandard_toolbox;

use ystandard_toolbox\Util\Debug;
use ystandard_toolbox\Util\Styles;
use ystandard_toolbox\Util\Text;

defined( 'ABSPATH' ) || die();

/**
 * Class Heading
 *
 * @package ystandard_toolbox
 */
class Heading {
	/**
	 * 見出し設定メイン
	 */
	const OPTION_MAIN = 'ystdtb_heading_v2';
	/**
	 * 見出しレベル別設定
	 */
	const OPTION_LEVEL = 'ystdtb_heading_level';
	/**
	 * ブロックスタイル用
	 */
	const BODY_CLASS_HEADING = 'ystdtb-heading';
	/**
	 * キャッシュキー.
	 */
	const CSS_CACHE_KEY = 'ystdtb_heading_v2_css';

	const CSS_HANDLE = 'ystdtb_heading_css';

	/**
	 * Heading constructor.
	 */
	public function __construct() {

		require_once __DIR__ . '/class-heading-helper.php';
		add_action( 'ystdtb_plugin_settings', [ $this, 'add_plugin_settings' ] );

		// 設定移行前は下位互換モードで起動する.
		if ( $this->is_compatible_mode() ) {
			require_once __DIR__ . '/class-heading-compatible.php';
			require_once __DIR__ . '/class-heading-migration.php';

			return;
		}
		add_filter( 'body_class', [ $this, 'body_class' ], 20 );
		add_filter( 'admin_body_class', [ $this, 'admin_body_class' ], 20 );
		add_action( 'rest_api_init', [ $this, 'register_routes' ] );

		add_action( 'enqueue_block_assets', [ $this, 'enqueue_block_assets' ], 11 );
		add_action( 'enqueue_block_editor_assets', [ $this, 'enqueue_editor_assets' ], 11 );
		add_action( 'init', [ $this, 'register_block_styles' ], 11 );

	}


	/**
	 * CSS作成.
	 *
	 * @param bool $is_editor エディター用か.
	 *
	 * @return void
	 */
	public function enqueue_block_css( $is_editor = false ) {
		// 設定取得.
		$heading = self::get_heading_design_options();
		$level   = self::get_heading_level_options();
		// CSS作成.
		$css = Heading_Helper::get_heading_css( $heading, $level, $is_editor );
		if ( empty( $css ) ) {
			return;
		}
		// エンキュー.
		wp_register_style( self::CSS_HANDLE, false, [], wp_date( 'YmdHis' ) );
		wp_add_inline_style(
			self::CSS_HANDLE,
			Text::minify( $css )
		);
		wp_enqueue_style( self::CSS_HANDLE );
	}

	/**
	 * CSS追加.
	 *
	 * @return void
	 */
	public function enqueue_block_assets() {
		$this->enqueue_block_css();
	}

	/**
	 * CSS（Editor）追加.
	 *
	 * @return void
	 */
	public function enqueue_editor_assets() {
		$this->enqueue_block_css( true );
	}

	/**
	 * ブロックスタイルとして有効化されているスタイルの追加
	 *
	 * @return void
	 */
	public function register_block_styles() {
		$heading = self::get_heading_design_options();

		if ( empty( $heading ) || ! is_array( $heading ) ) {
			return;
		}

		$heading_items   = [];
		$paragraph_items = [];

		foreach ( $heading as $key => $value ) {

			$slug  = $key;
			$label = isset( $value['label'] ) ? $value['label'] : $slug;

			// 見出しスタイルの判断.
			if ( isset( $value['useHeadingStyle'] ) && true === (bool) $value['useHeadingStyle'] ) {
				$heading_items[] = [
					'name'  => Heading_Helper::get_block_style_selector_name( $slug ),
					'label' => $label,
				];
			}
			// 段落スタイルの判断.
			if ( isset( $value['useParagraphStyle'] ) && true === (bool) $value['useParagraphStyle'] ) {
				$paragraph_items[] = [
					'name'  => Heading_Helper::get_block_style_selector_name( $slug ),
					'label' => $label,
				];
			}
		}

		// 見出しスタイル追加.（ 'ystdb/heading' はいろいろ都合が悪い）
		$this->register_block_style( $heading_items, [ 'core/heading' ] );
		// 段落スタイル追加.
		$this->register_block_style( $paragraph_items, [ 'core/paragraph' ] );
	}

	/**
	 * ブロックスタイル追加
	 *
	 * @param array $blocks スタイル追加するブロックの情報
	 * @param array $types 対象となるブロックのタイプ
	 *
	 * @return void
	 */
	private function register_block_style( $blocks, $types ) {
		foreach ( $types as $type ) {
			foreach ( $blocks as $block ) {
				register_block_style(
					$type,
					[
						'name'  => $block['name'],
						'label' => $block['label'],
					]
				);
			}
		}
	}

	/**
	 * 設定画面用データ追加
	 *
	 * @param array $settings Settings.
	 *
	 * @return array
	 */
	public function add_plugin_settings( $settings ) {
		$settings['heading_design']        = self::get_heading_design_options();
		$settings['heading_level']         = self::get_heading_level_options();
		$settings['heading_is_compatible'] = $this->is_compatible_mode();
		$settings['heading_breakpoints']   = Styles::get_breakpoints();

		return $settings;
	}

	/**
	 * Register REST API route
	 *
	 * @return void
	 */
	public function register_routes() {
		Api::register_rest_route( 'add_heading_style', [ $this, 'add_heading_style' ] );
		Api::register_rest_route( 'update_heading_style', [ $this, 'update_heading_style' ] );
		Api::register_rest_route( 'update_heading_level', [ $this, 'update_heading_level' ] );
		Api::register_rest_route( 'get_heading_styles', [ $this, 'get_heading_styles' ], 'GET' );
		Api::register_rest_route( 'get_heading_level', [ $this, 'get_heading_level' ], 'GET' );
		Api::register_rest_route( 'get_heading_level_keys', [ $this, 'get_heading_level_keys' ], 'GET' );
	}

	/**
	 * スタイル定義の追加
	 *
	 * @param \WP_REST_Request $request Request.
	 *
	 * @return \WP_Error|WP_HTTP_Response|\WP_REST_Response
	 */
	public function add_heading_style( $request ) {
		$data   = $request->get_json_params();
		$result = false;
		if ( is_array( $data ) && isset( $data['style'] ) ) {

			$new_style = [
				$data['style']['slug'] => $data['style'],
			];
			$styles    = $this->get_heading_styles();
			$styles    = array_merge( $styles, $new_style );
			$result    = $this->update_heading_design_option( $styles );
		}

		return Api::create_response(
			$result,
			'',
			wp_json_encode( $data )
		);
	}

	/**
	 * スタイル関連の設定追加
	 *
	 * @param \WP_REST_Request $request Request.
	 *
	 * @return \WP_Error|WP_HTTP_Response|\WP_REST_Response
	 */
	public function update_heading_style( $request ) {
		$data   = $request->get_json_params();
		// データチェック
		if ( ! is_array( $data ) || ! isset( $data['style'] ) || ! isset( $data['type'] ) ) {
			return Api::create_response(
				false,
				__( '更新データが不正です。', 'ystandard-toolbox' ),
				wp_json_encode( $data )
			);
		}
		// 更新に必要な情報を抽出.
		$type = $data['type'];
		$slug = $data['style']['slug'];
		// 登録済み設定を取得.
		$styles = $this->get_heading_styles();
		// 更新データ作成.
		if ( 'delete' === $type ) {
			// 削除の場合、該当スタイルを削除.
			if ( isset( $styles[ $slug ] ) ) {
				unset( $styles[ $slug ] );
			}
		} else {
			// 更新の場合、該当スタイルを更新.
			$styles[ $slug ] = $data['style'];
		}
		// 更新実行.
		$result = $this->update_heading_design_option( $styles );

		return Api::create_response(
			$result,
			'',
			wp_json_encode( $data )
		);
	}

	/**
	 * 見出しレベル割り当て設定の保存.
	 *
	 * @param \WP_REST_Request $request Request.
	 *
	 * @return \WP_Error|WP_HTTP_Response|\WP_REST_Response
	 */
	public function update_heading_level( $request ) {
		$data       = $request->get_json_params();
		$new_option = [];
		// データチェック
		if ( ! is_array( $data ) || ! isset( $data['level'] ) || ! is_array( $data['level'] ) ) {
			return Api::create_response(
				false,
				__( '更新データが不正です。', 'ystandard-toolbox' ),
				wp_json_encode( $data )
			);
		}
		// レベル設定の更新.
		$result = Option::update_option( self::OPTION_LEVEL, $data['level'] );

		return Api::create_response(
			$result,
			'',
			wp_json_encode( $data )
		);
	}

	/**
	 * 設定情報取得.
	 *
	 * @return array
	 */
	public function get_heading_styles() {
		return self::get_heading_design_options();
	}

	/**
	 * レベル情報取得.
	 *
	 * @return array
	 */
	public function get_heading_level() {
		return self::get_heading_level_options();
	}

	/**
	 * レベル定義を取得.
	 *
	 * @return array
	 */
	public function get_heading_level_keys() {
		return self::get_heading_level_schema();
	}

	/**
	 * 互換性モード起動か判定.
	 *
	 * @return bool
	 */
	private function is_compatible_mode() {
		$old = get_option( 'ystdtb_heading', null );
		$v2  = self::get_heading_design_options();

		// 新設定があれば新設定使う.
		if ( ! empty( $v2 ) ) {
			return false;
		}

		if ( ! is_null( $old ) ) {
			return true;
		}

		return false;
	}

	/**
	 * Body Class.
	 *
	 * @param array $classes classes.
	 *
	 * @return array
	 */
	public function body_class( $classes ) {
		$classes[] = self::BODY_CLASS_HEADING;

		return $classes;
	}

	/**
	 * Admin Body Class.
	 *
	 * @return void
	 */
	public function admin_body_class( $classes ) {
		global $pagenow;

		if ( in_array( $pagenow, [ 'post.php', 'post-new.php' ], true ) ) {
			$query = get_post_type_object( get_post_type() );
			if ( $query ) {
				$type = $query->hierarchical ? 'page' : 'post';
				// クラス追加.
				$classes = "{$classes} ystdtb-editor-type-{$type}";
			}
		}

		return $classes;
	}

	/**
	 * 見出しデザイン設定の更新.
	 *
	 * @param array $value 設定.
	 *
	 * @return bool
	 */
	public static function update_heading_design_option( $value ) {
		return Option::update_option( self::OPTION_MAIN, $value );
	}

	/**
	 * 見出しデザイン設定の更新.
	 *
	 * @param array $value 設定.
	 *
	 * @return bool
	 */
	public static function update_heading_level_option( $value ) {
		return Option::update_option( self::OPTION_LEVEL, $value );
	}


	/**
	 * 見出しカスタマイズ機能設定取得
	 *
	 * @return array
	 */
	public static function get_heading_design_options() {
		$option = apply_filters(
			'ystdtb_get_heading_design_options',
			get_option( self::OPTION_MAIN, [] )
		);

		return is_array( $option ) ? stripslashes_deep( $option ) : [];
	}

	/**
	 * 見出しカスタマイズ機能 レベル設定
	 *
	 * @return array
	 */
	public static function get_heading_level_options() {
		$option = apply_filters(
			'ystdtb_get_heading_level_options',
			get_option( self::OPTION_LEVEL, [] )
		);

		return is_array( $option ) ? stripslashes_deep( $option ) : [];
	}

	/**
	 * 見出しカスタマイズ機能 レベル設定の定義取得
	 *
	 * @return array
	 */
	public static function get_heading_level_schema() {
		$keys = [
			'h1'            => _x( 'h1', 'plugin-settings', 'ystandard-toolbox' ),
			'h2'            => _x( 'h2', 'plugin-settings', 'ystandard-toolbox' ),
			'h3'            => _x( 'h3', 'plugin-settings', 'ystandard-toolbox' ),
			'h4'            => _x( 'h4', 'plugin-settings', 'ystandard-toolbox' ),
			'h5'            => _x( 'h5', 'plugin-settings', 'ystandard-toolbox' ),
			'h6'            => _x( 'h6', 'plugin-settings', 'ystandard-toolbox' ),
			'post-title'    => _x( '投稿タイトル', 'plugin-settings', 'ystandard-toolbox' ),
			'page-title'    => _x( '固定ページタイトル', 'plugin-settings', 'ystandard-toolbox' ),
			'archive-title' => _x( '一覧ページタイトル', 'plugin-settings', 'ystandard-toolbox' ),
		];

		// サイドバー・フッターは追加設定.
		if ( apply_filters( 'ystdtb_heading_level_additional', false ) ) {
			$keys = array_merge(
				$keys,
				[
					'sidebar' => _x( 'サイドバーウィジェット', 'plugin-settings', 'ystandard-toolbox' ),
					'footer'  => _x( 'フッターウィジェット', 'plugin-settings', 'ystandard-toolbox' ),
				]
			);
		}

		$option = apply_filters( 'get_heading_level_schema', $keys );

		return is_array( $option ) ? $option : $keys;
	}

}

new Heading();
