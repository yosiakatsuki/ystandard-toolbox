<?php
/**
 * CTA
 *
 * @package ystandard-toolbox
 * @author  yosiakatsuki
 * @license GPL-2.0+
 */

namespace ystandard_toolbox;

use ystandard_toolbox\helper\Version_Compare;
use ystandard_toolbox\helper\Boolean;

defined( 'ABSPATH' ) || die();

/**
 * Class CTA
 *
 * @package ystandard_toolbox
 */
class CTA {

	/**
	 * 設定名
	 */
	const OPTION_NAME = 'cta';

	/**
	 * CTA constructor.
	 */
	public function __construct() {
		if ( ! Version_Compare::ystandard_version_compare( '4.23.0-beta-1' ) ) {
			return;
		}
		add_filter( 'ys_get_content_header_priority', [ $this, 'header_priority' ] );
		add_filter( 'ys_get_content_footer_priority', [ $this, 'footer_priority' ] );

		add_filter( 'ystdtb_plugin_settings', [ $this, 'add_plugin_settings' ] );

		add_action( 'rest_api_init', [ $this, 'register_routes' ] );
		add_action( 'after_setup_theme', [ $this, 'set_sync_cta_option' ] );

		$this->set_customizer_notice();
	}

	/**
	 * ヘッダー側コンテンツ順の取得
	 *
	 * @param array $priority Priority List.
	 *
	 * @return array|mixed
	 */
	public function header_priority( $priority ) {
		if ( ! is_singular() ) {
			return $priority;
		}

		$custom = $this->get_custom_priority( 'header' );

		return $custom ? $custom : $priority;
	}

	/**
	 * フッター側コンテンツ順の取得
	 *
	 * @param array $priority Priority List.
	 *
	 * @return array|mixed
	 */
	public function footer_priority( $priority ) {
		if ( ! is_singular() ) {
			return $priority;
		}

		$custom = $this->get_custom_priority( 'footer' );

		return $custom ? $custom : $priority;
	}

	/**
	 * コンテンツ表示順序の取得
	 *
	 * @param string $type header or footer.
	 *
	 * @return array|false
	 */
	private function get_custom_priority( $type ) {
		$post_type = Utility::get_post_type();
		$option    = $this->get_cta_options();

		if ( ! isset( $option[ $post_type ] ) ) {
			return false;
		}
		if ( ! isset( $option[ $post_type ][ $type ] ) ) {
			return false;
		}
		$result = [];
		foreach ( $option[ $post_type ][ $type ] as $item ) {
			$priority = $item['priority'];
			if ( false === $item['enable'] ) {
				$priority = 'none';
			}
			$result[ $item['id'] ] = $priority;
		}

		return $result;
	}

	/**
	 * CTA設定取得
	 *
	 * @return array
	 */
	private function get_cta_options() {
		$option = Option::get_option( self::OPTION_NAME, '', [] );

		return $this->compatible_option( $option );
	}

	/**
	 * 設定の下位互換.
	 *
	 * @param array $option 設定.
	 * @return array
	 */
	private function compatible_option( $option ) {
		// v1.24.0以前の設定互換処理.
		if ( isset( $option['ctaSort'] ) ) {
			$option = $option['ctaSort'];
		}
		return $option;
	}

	/**
	 * テーマの設定を引き継ぐ
	 *
	 * @param array $default 設定.
	 * @return array
	 */
	private function add_theme_option_default_priority( $default ) {
		$result = [];

		foreach ( $default as $post_type => $priority ) {
			if ( '_default' === $post_type ) {
				$result[ $post_type ] = $priority;
				continue;
			}
			$header = $priority['header'];
			$footer = $priority['footer'];
			foreach ( $header as &$item ) {
				$option_name = $item['id'];
				$enable      = Boolean::to_bool( $item['enable'] );
				switch ( $option_name ) {
					case 'post-thumbnail':
						$theme          = get_option(
							"ys_show_${post_type}_header_thumbnail",
							$enable
						);
						$item['enable'] = Boolean::to_bool( $theme );
						break;
				}
			}
			foreach ( $footer as &$item ) {
				$option_name = $item['id'];
				$enable      = Boolean::to_bool( $item['enable'] );
				switch ( $option_name ) {
					case 'taxonomy':
						$theme          = get_option(
							"ys_show_${post_type}_category",
							$enable
						);
						$item['enable'] = Boolean::to_bool( $theme );
						break;
					case 'author':
						$theme          = get_option(
							"ys_show_${post_type}_author",
							$enable
						);
						$item['enable'] = Boolean::to_bool( $theme );
						break;
					case 'related':
						$theme          = get_option(
							"ys_show_${post_type}_related",
							$enable
						);
						$item['enable'] = Boolean::to_bool( $theme );
						break;
					case 'paging':
						$theme          = get_option(
							"ys_show_${post_type}_paging",
							$enable
						);
						$item['enable'] = Boolean::to_bool( $theme );
						break;

				}
			}
			$result[ $post_type ] = [
				'header' => $header,
				'footer' => $footer,
			];
		}

		return $result;
	}

	/**
	 * 設定追加.
	 *
	 * @param array $settings 設定.
	 */
	public function add_plugin_settings( $settings ) {
		// デフォルト値.
		$default_priority = [
			'_default' => [
				'header' => self::get_header_priority(),
				'footer' => self::get_footer_priority(),
			],
		];

		// 投稿タイプ.
		$post_types = [];
		$types      = Utility::get_post_types( [], [ 'ys-parts' ] );
		if ( ! empty( $types ) ) {
			foreach ( $types as $key => $value ) {
				$post_type_object = get_post_type_object( $key );
				$cap_type         = $post_type_object->capability_type;

				// デフォルト値のセット.
				$default_priority[ $key ] = [
					'header' => self::get_header_priority( $cap_type ),
					'footer' => self::get_footer_priority( $cap_type ),
				];
				// 投稿タイプのセット.
				$post_types[] = [
					'key'  => $key,
					'name' => $value,
				];
			}
		} else {
			$post_types[] = [
				'key'  => '',
				'name' => _x( '選択できる投稿タイプがありません', 'cta', 'ystandard-toolbox' ),
			];
		}

		// セット.
		$settings['settings']['ctaSelectPostType'] = $post_types;
		$settings['settings']['ctaDefault']        = $this->add_theme_option_default_priority( $default_priority );
		return $settings;
	}

	/**
	 * 設定更新
	 *
	 * @param \WP_REST_Request $request Request.
	 *
	 * @return \WP_Error|\WP_HTTP_Response|\WP_REST_Response
	 */
	public function update_option( $request ) {
		$data   = $request->get_json_params();
		$result = Option::update_plugin_option( self::OPTION_NAME, $data );
		$this->sync_theme_option( $data );
		return Api::create_response(
			$result,
			'',
			json_encode( $data )
		);
	}

	/**
	 * テーマ設定の同期追加
	 *
	 * @return void
	 */
	public function set_sync_cta_option() {
		$post_types = apply_filters( 'ystdtb_sync_cta_option_post_types', [ 'post', 'page' ] );
		foreach ( $post_types as $type ) {
			add_action( "ystdtb_sync_cta_option__${type}", [ __CLASS__, 'update_cta_theme_option' ], 10, 2 );
		}
	}

	/**
	 * テーマの設定と同期をとる
	 *
	 * @param array $data CTA設定.
	 * @return void
	 */
	private function sync_theme_option( $data ) {
		if ( ! is_array( $data ) ) {
			return;
		}
		foreach ( $data as $post_type => $cta ) {
			do_action( "ystdtb_sync_cta_option__${post_type}", $cta, $post_type );
		}
	}


	/**
	 * テーマの設定を同期する（投稿）
	 *
	 * @param array  $cta CTA情報.
	 * @param string $post_type 島弧タイプ.
	 * @return void
	 */
	public static function update_cta_theme_option( $cta, $post_type ) {
		if ( ! is_array( $cta ) ) {
			return;
		}
		$header = isset( $cta['header'] ) ? $cta['header'] : [];
		$footer = isset( $cta['footer'] ) ? $cta['footer'] : [];

		foreach ( $header as $item ) {
			$option_name = $item['id'];
			$enable      = Helper\Boolean::to_bool( $item['enable'] );
			switch ( $option_name ) {
				case 'post-thumbnail':
					update_option( "ys_show_${post_type}_header_thumbnail", $enable );
					break;
				case 'meta':
					$show_date = get_option( "ys_show_${post_type}_publish_date", 'both' );
					if ( 'none' === $show_date && $enable ) {
						update_option( "ys_show_${post_type}_publish_date", 'both' );
					}
					if ( 'none' !== $show_date && ! $enable ) {
						update_option( "ys_show_${post_type}_publish_date", 'none' );
					}
					update_option( "ys_show_${post_type}_header_category", $enable );
					break;
			}
		}
		foreach ( $footer as $item ) {
			$option_name = $item['id'];
			$enable      = Helper\Boolean::to_bool( $item['enable'] );
			switch ( $option_name ) {
				case 'taxonomy':
					update_option( "ys_show_${post_type}_category", $enable );
					break;
				case 'author':
					update_option( "ys_show_${post_type}_author", $enable );
					break;
				case 'related':
					update_option( "ys_show_${post_type}_related", $enable );
					break;
				case 'paging':
					update_option( "ys_show_${post_type}_paging", $enable );
					break;
			}
		}
	}

	/**
	 * Register REST API route
	 *
	 * @return void
	 */
	public function register_routes() {
		Api::register_rest_route( 'update_cta', [ $this, 'update_option' ] );
	}

	/**
	 * ヘッダーの優先度初期値取得
	 *
	 * @param string|null $type 絞り込みするタイプ.
	 *
	 * @return array[]
	 */
	public static function get_header_priority( $type = null ) {

		$priority = [
			[
				'id'       => 'post-thumbnail',
				'label'    => _x( 'Post Thumbnail', 'cta', 'ystandard-toolbox' ),
				'priority' => 10,
				'enable'   => true,
				'type'     => [ 'post', 'page' ],
			],
			[
				'id'       => 'title',
				'label'    => __( 'Post Title', 'ystandard-toolbox' ),
				'priority' => 20,
				'enable'   => true,
				'type'     => [ 'post', 'page' ],
			],
			[
				'id'       => 'meta',
				'label'    => _x( 'Post Meta', 'cta', 'ystandard-toolbox' ),
				'priority' => 30,
				'enable'   => true,
				'type'     => [ 'post', 'page' ],
			],
			[
				'id'       => 'sns-share',
				'label'    => __( 'Share Buttons', 'ystandard-toolbox' ),
				'priority' => 40,
				'enable'   => true,
				'type'     => [ 'post', 'page' ],
			],
			[
				'id'       => 'ad',
				'label'    => __( 'Advertisement', 'ystandard-toolbox' ),
				'priority' => 50,
				'enable'   => true,
				'type'     => [ 'post', 'page' ],
			],
			[
				'id'       => 'widget',
				'label'    => __( 'Widget', 'ystandard-toolbox' ),
				'priority' => 60,
				'enable'   => true,
				'type'     => [ 'post', 'page' ],
			],
		];

		if ( null !== $type ) {
			$priority = array_filter(
				$priority,
				function( $value ) use ( $type ) {
					return in_array( $type, $value['type'], true );
				}
			);
			$priority = array_values( $priority );
		}

		return $priority;
	}

	/**
	 * フッターの優先度初期値取得
	 *
	 * @param string|null $type 絞り込みするタイプ.
	 *
	 * @return array[]
	 */
	public static function get_footer_priority( $type = null ) {
		$priority = [
			[
				'id'       => 'widget',
				'label'    => __( 'Widget', 'ystandard-toolbox' ),
				'priority' => 10,
				'enable'   => true,
				'type'     => [ 'post', 'page' ],
			],
			[
				'id'       => 'ad',
				'label'    => __( 'Advertisement', 'ystandard-toolbox' ),
				'priority' => 20,
				'enable'   => true,
				'type'     => [ 'post', 'page' ],
			],
			[
				'id'       => 'sns-share',
				'label'    => __( 'Share Buttons', 'ystandard-toolbox' ),
				'priority' => 30,
				'enable'   => true,
				'type'     => [ 'post', 'page' ],
			],
			[
				'id'       => 'taxonomy',
				'label'    => __( 'Category & Tag', 'ystandard-toolbox' ),
				'priority' => 40,
				'enable'   => true,
				'type'     => [ 'post' ],
			],
			[
				'id'       => 'author',
				'label'    => _x( 'Author', 'cta', 'ystandard-toolbox' ),
				'priority' => 50,
				'enable'   => true,
				'type'     => [ 'post', 'page' ],
			],
			[
				'id'       => 'related',
				'label'    => __( 'Related Posts', 'ystandard-toolbox' ),
				'priority' => 60,
				'enable'   => true,
				'type'     => [ 'post' ],
			],
			[
				'id'       => 'comment',
				'label'    => __( 'Comments', 'ystandard-toolbox' ),
				'priority' => 70,
				'enable'   => true,
				'type'     => [ 'post' ],
			],
			[
				'id'       => 'paging',
				'label'    => __( 'Paging', 'ystandard-toolbox' ),
				'priority' => 80,
				'enable'   => true,
				'type'     => [ 'post' ],
			],
		];
		if ( null !== $type ) {
			$priority = array_filter(
				$priority,
				function( $value ) use ( $type ) {
					return in_array( $type, $value['type'], true );
				}
			);
			$priority = array_values( $priority );
		}

		return $priority;
	}

	/**
	 * カスタマイザーの注意書きを追加する場所を取得
	 *
	 * @return void
	 */
	private function set_customizer_notice() {
		$controls = [
			[
				'label'   => '記事上部',
				'section' => 'ys_design_post',
			],
			[
				'label'   => '記事下部',
				'section' => 'ys_design_post',
			],
			[
				'label'   => '記事上部',
				'section' => 'ys_design_page',
			],
			[
				'label'   => '記事下部',
				'section' => 'ys_design_page',
			],
		];
		foreach ( $controls as $item ) {
			$id = 'ys_' . substr( md5( $item['label'] . $item['section'] ), 0, 40 );
			add_filter( 'ys_customize_get_control_args__' . $id, [ $this, 'add_customizer_notice' ] );
		}
	}

	/**
	 * カスタマイザーに注意書き追加.
	 *
	 * @param array $args 設定.
	 * @return array
	 */
	public function add_customizer_notice( $args ) {
		$notice = __( '※ yStandard Toolboxが有効化されています。<br>表示・非表示の切り替えは「投稿詳細ページ上下拡張」で設定を更新してください。', 'ystandard-toolbox' );
		// 設定上書き.
		$args['description'] = Notice::customizer_notice( $notice );
		return $args;
	}
}

new CTA();
