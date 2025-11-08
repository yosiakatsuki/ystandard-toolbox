<?php
/**
 * Icon
 *
 * @package ystandard_toolbox
 * @author  yosiakatsuki
 * @license GPL-2.0+
 */

namespace ystandard_toolbox;

defined( 'ABSPATH' ) || die();

/**
 * Class Icon
 *
 * @package ystandard_toolbox
 */
class Icon {

	/**
	 * カスタムアイコンのプレフィックス
	 */
	const CUSTOM_ICON_PREFIX = 'custom-';
	/**
	 * カスタムアイコンのカテゴリー
	 */
	const CUSTOM_ICON_CATEGORY = 'custom';

	/**
	 * Icon constructor.
	 */
	public function __construct() {
		add_action( 'enqueue_block_assets', [ $this, 'add_icons' ], 100 );
		add_action( 'ystdtb_enqueue_plugin_settings_base_scripts', [ $this, 'admin_add_icons' ], 50 );
	}

	/**
	 * アイコンリストの追加
	 */
	public function add_icons() {
		if( ! is_admin() ) {
			return;
		}
		wp_localize_script(
			Blocks::BLOCK_EDITOR_SCRIPT_HANDLE,
			'ystdtbIconList',
			self::get_icons()
		);
	}

	/**
	 * プラグイン設定画面用
	 *
	 * @param string $script_handle Script handle.
	 */
	public function admin_add_icons( $script_handle ) {
		wp_localize_script(
			$script_handle,
			'ystdtbIconList',
			self::get_icons()
		);
	}

	/**
	 * アイコン取得
	 *
	 * @param string $name アイコン名
	 *
	 * @return array アイコンデータの配列（見つからない場合は空配列）
	 */
	public static function get_icon( $name ) {
		$icons  = self::get_icons();
		$result = [];


		// 直接名前でマッチするアイコンを検索
		if ( is_array( $icons ) && isset( $icons[ $name ] ) ) {
			return $icons[ $name ];
		}

		// nameフィールドでの検索
		foreach ( $icons as $icon_data ) {

			if ( is_array( $icon_data ) && isset( $icon_data['name'] ) ) {

				if ( $icon_data['name'] === $name ) {
					return $icon_data;
				}

				// カスタムアイコンのプレフィックス付きで検索
				$custom_name = self::CUSTOM_ICON_PREFIX . $name;
				if ( $icon_data['name'] === $custom_name ) {
					return $icon_data;
				}
			}
		}

		return [];
	}

	/**
	 * 使えるアイコンの一覧を取得
	 *
	 * @return array
	 */
	public static function get_icons() {

		$icons = include( YSTDTB_PATH . '/library/svg-icons/svg-icons.php' );
		// カスタムアイコン.
		$custom_icons = apply_filters( 'ys_get_custom_icon', [] );

		// TODO:よく使うアイコン機能実装.

		// 結合.
		$icons = array_merge(
			self::sanitize_custom_icon( $custom_icons ),
			$icons
		);

		return apply_filters( 'ys_get_icon_list', $icons );
	}

	/**
	 * カスタムアイコンにプレフィックスを追加
	 *
	 * @param array $icons Icons.
	 *
	 * @return array
	 */
	public static function sanitize_custom_icon( $icons ) {
		if ( ! is_array( $icons ) || empty( $icons ) ) {
			return $icons;
		}
		foreach ( $icons as $icon ) {
			$icon['name'] = self::CUSTOM_ICON_PREFIX . $icon['name'];
			if ( ! isset( $icon['category'] ) ) {
				$icon['category'] = self::CUSTOM_ICON_CATEGORY;
			}
		}

		return $icons;
	}
}

new Icon();
