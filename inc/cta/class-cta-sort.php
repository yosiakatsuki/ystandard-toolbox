<?php
/**
 * CTA 並び替え
 *
 * @package ystandard-toolbox
 * @author  yosiakatsuki
 * @license GPL-2.0+
 */

namespace ystandard_toolbox;

defined( 'ABSPATH' ) || die();

/**
 * Class CTA_Sort
 *
 * @package ystandard_toolbox
 */
class CTA_Sort {

	/**
	 * 設定名
	 */
	const OPTION_NAME = 'ctaSort';

	/**
	 * CTA_Sort constructor.
	 */
	public function __construct() {
		if ( ! Utility::ystandard_version_compare( '4.23.0-beta-1' ) ) {
			return;
		}
		add_filter( 'ys_get_content_header_priority', [ $this, 'header_priority' ] );
		add_filter( 'ys_get_content_footer_priority', [ $this, 'footer_priority' ] );
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
		$option    = Option::get_option( CTA::OPTION_NAME, self::OPTION_NAME, [] );
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
				'index'    => 0,
				'enable'   => true,
			],
			[
				'id'       => 'title',
				'label'    => __( 'Post Title', 'ystandard-toolbox' ),
				'priority' => 20,
				'index'    => 0,
				'enable'   => true,
			],
			[
				'id'       => 'meta',
				'label'    => _x( 'Post Meta', 'cta', 'ystandard-toolbox' ),
				'priority' => 30,
				'index'    => 0,
				'enable'   => true,
			],
			[
				'id'       => 'sns-share',
				'label'    => __( 'Share Buttons', 'ystandard-toolbox' ),
				'priority' => 40,
				'index'    => 0,
				'enable'   => true,
			],
			[
				'id'       => 'ad',
				'label'    => __( 'Advertisement', 'ystandard-toolbox' ),
				'priority' => 50,
				'index'    => 0,
				'enable'   => true,
			],
			[
				'id'       => 'widget',
				'label'    => __( 'Widget', 'ystandard-toolbox' ),
				'priority' => 60,
				'index'    => 0,
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
				'index'    => 0,
				'enable'   => true,
			],
			[
				'id'       => 'ad',
				'label'    => __( 'Advertisement', 'ystandard-toolbox' ),
				'priority' => 20,
				'index'    => 0,
				'enable'   => true,
			],
			[
				'id'       => 'sns-share',
				'label'    => __( 'Share Buttons', 'ystandard-toolbox' ),
				'priority' => 30,
				'index'    => 0,
				'enable'   => true,
			],
			[
				'id'       => 'taxonomy',
				'label'    => __( 'Category & Tag', 'ystandard-toolbox' ),
				'priority' => 40,
				'index'    => 0,
				'enable'   => true,
			],
			[
				'id'       => 'author',
				'label'    => _x( 'Author', 'cta', 'ystandard-toolbox' ),
				'priority' => 50,
				'index'    => 0,
				'enable'   => true,
			],
			[
				'id'       => 'related',
				'label'    => __( 'Related Posts', 'ystandard-toolbox' ),
				'priority' => 60,
				'index'    => 0,
				'enable'   => true,
			],
			[
				'id'       => 'comment',
				'label'    => __( 'Comments', 'ystandard-toolbox' ),
				'priority' => 70,
				'index'    => 0,
				'enable'   => true,
			],
			[
				'id'       => 'paging',
				'label'    => __( 'Paging', 'ystandard-toolbox' ),
				'priority' => 80,
				'index'    => 0,
				'enable'   => true,
			],
		];
	}


}

new CTA_Sort();

