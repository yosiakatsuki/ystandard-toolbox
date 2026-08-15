<?php
/**
 * Toolbox投稿設定プロバイダー.
 *
 * @package ystandard-toolbox
 * @author  yosiakatsuki
 * @license GPL-2.0+
 */

namespace ystandard_toolbox;

defined( 'ABSPATH' ) || die();

/**
 * Class Post_Settings_Provider
 *
 * @package ystandard-toolbox
 */
class Post_Settings_Provider {

	/**
	 * 現在の編集対象でToolbox設定を利用できるか判定する.
	 *
	 * @param string $post_type 投稿タイプ.
	 *
	 * @return bool
	 */
	public static function is_available( $post_type ) {
		return Post_Settings_Meta::is_available_for_post_type( $post_type );
	}

	/**
	 * Toolbox設定プロバイダーへ渡す初期データを取得する.
	 *
	 * @param string $post_type 投稿タイプ.
	 * @param int    $post_id   投稿ID.
	 *
	 * @return array
	 */
	public static function get_config( $post_type, $post_id = 0 ) {
		$config = [
			'apiVersion'  => 1,
			'postType'    => (string) $post_type,
			'postId'      => (int) $post_id,
			'overlay'     => [
				'enabled' => self::is_available( $post_type ),
			],
			'menuReplace' => [
				'enabled'   => false,
				'locations' => [],
				'menus'     => [],
			],
		];
		if ( ! $config['overlay']['enabled'] || ! Menu_Replace::can_replace_menu( $post_id ) ) {
			return $config;
		}

		$config['menuReplace']['enabled'] = true;
		$config['menuReplace']['menus'][] = [
			'label' => __( '- 変更なし -', 'ystandard-toolbox' ),
			'value' => '',
		];
		foreach ( wp_get_nav_menus() as $menu ) {
			$config['menuReplace']['menus'][] = [
				'label' => $menu->name,
				'value' => (string) $menu->term_id,
			];
		}
		foreach ( get_registered_nav_menus() as $location => $location_label ) {
			$config['menuReplace']['locations'][] = [
				'name'  => $location,
				'label' => $location_label,
			];
		}

		return $config;
	}
}
