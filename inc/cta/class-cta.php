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
		add_filter( 'ystdtb_update_plugin_settings_all_data', [ $this, 'delete_setting' ] );
	}

	/**
	 * ヘッダー側コンテンツ順の取得
	 *
	 * @param array $priority Priority List.
	 *
	 * @return array|mixed
	 */
	public function header_priority( $priority ) {
		if ( ! is_singular() || is_page() ) {
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
		if ( ! is_singular() || is_page() ) {
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
		// v1.24.0以前の設定互換処理.
		if ( isset( $option['ctaSort'] ) ) {
			$option = $option['ctaSort'];
		}

		return $option;
	}

	public function add_plugin_settings( $settings ) {
		// デフォルト値.
		$settings['settings']['ctaDefault'] = [
			'header' => self::get_header_priority_post(),
			'footer' => self::get_footer_priority_post(),
		];
		// 投稿タイプ.
		$post_types = [];
		$types      = Utility::get_post_types(
			[ 'capability_type' => 'post' ],
			[ 'ys-parts' ]
		);
		if ( ! empty( $types ) ) {
			foreach ( $types as $key => $value ) {
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

		return $settings;
	}

	public function delete_setting( $settings ) {

		if ( ! array_key_exists( self::OPTION_NAME, $settings ) ) {
			return $settings;
		}
		unset( $settings[ self::OPTION_NAME ]['ctaDefault'] );
		unset( $settings[ self::OPTION_NAME ]['ctaSelectPostType'] );

		return $settings;
	}

	/**
	 * ヘッダーの優先度初期値取得
	 *
	 * @return array[]
	 */
	public static function get_header_priority_post() {
		return [
			[
				'id'       => 'post-thumbnail',
				'label'    => _x( 'Post Thumbnail', 'cta', 'ystandard-toolbox' ),
				'priority' => 10,
				'enable'   => true,
			],
			[
				'id'       => 'title',
				'label'    => __( 'Post Title', 'ystandard-toolbox' ),
				'priority' => 20,
				'enable'   => true,
			],
			[
				'id'       => 'meta',
				'label'    => _x( 'Post Meta', 'cta', 'ystandard-toolbox' ),
				'priority' => 30,
				'enable'   => true,
			],
			[
				'id'       => 'sns-share',
				'label'    => __( 'Share Buttons', 'ystandard-toolbox' ),
				'priority' => 40,
				'enable'   => true,
			],
			[
				'id'       => 'ad',
				'label'    => __( 'Advertisement', 'ystandard-toolbox' ),
				'priority' => 50,
				'enable'   => true,
			],
			[
				'id'       => 'widget',
				'label'    => __( 'Widget', 'ystandard-toolbox' ),
				'priority' => 60,
				'enable'   => true,
			],
		];
	}

	/**
	 * フッターの優先度初期値取得
	 *
	 * @return array[]
	 */
	public static function get_footer_priority_post() {
		return [
			[
				'id'       => 'widget',
				'label'    => __( 'Widget', 'ystandard-toolbox' ),
				'priority' => 10,
				'enable'   => true,
			],
			[
				'id'       => 'ad',
				'label'    => __( 'Advertisement', 'ystandard-toolbox' ),
				'priority' => 20,
				'enable'   => true,
			],
			[
				'id'       => 'sns-share',
				'label'    => __( 'Share Buttons', 'ystandard-toolbox' ),
				'priority' => 30,
				'enable'   => true,
			],
			[
				'id'       => 'taxonomy',
				'label'    => __( 'Category & Tag', 'ystandard-toolbox' ),
				'priority' => 40,
				'enable'   => true,
			],
			[
				'id'       => 'author',
				'label'    => _x( 'Author', 'cta', 'ystandard-toolbox' ),
				'priority' => 50,
				'enable'   => true,
			],
			[
				'id'       => 'related',
				'label'    => __( 'Related Posts', 'ystandard-toolbox' ),
				'priority' => 60,
				'enable'   => true,
			],
			[
				'id'       => 'comment',
				'label'    => __( 'Comments', 'ystandard-toolbox' ),
				'priority' => 70,
				'enable'   => true,
			],
			[
				'id'       => 'paging',
				'label'    => __( 'Paging', 'ystandard-toolbox' ),
				'priority' => 80,
				'enable'   => true,
			],
		];
	}
}

new CTA();
