<?php
/**
 * 投稿設定メタ.
 *
 * @package ystandard-toolbox
 * @author  yosiakatsuki
 * @license GPL-2.0+
 */

namespace ystandard_toolbox;

use ystandard_toolbox\Util\Version;

defined( 'ABSPATH' ) || die();

/**
 * Class Post_Settings_Meta
 *
 * @package ystandard-toolbox
 */
class Post_Settings_Meta {

	/**
	 * 対応するyStandardの最低バージョン.
	 */
	const YSTANDARD_MIN_VERSION = '4.59.0-alpha-1';

	/**
	 * オーバーレイ設定のメタキー.
	 */
	const OVERLAY_META_KEY = 'ystdtb-overlay';

	/**
	 * メニュー切り替え設定のメタキー.
	 */
	const MENU_REPLACE_META_KEY = 'ystdtb-menu-replace';

	/**
	 * Post_Settings_Meta constructor.
	 */
	public function __construct() {
		add_action( 'init', [ $this, 'register_meta' ], 20 );
	}

	/**
	 * 投稿設定メタを登録する.
	 */
	public function register_meta() {
		if ( ! self::is_ystandard_available() ) {
			return;
		}

		foreach ( [ 'post', 'page' ] as $post_type ) {
			add_post_type_support( $post_type, 'custom-fields' );
		}

		$post_types = get_post_types(
			[
				'public'       => true,
				'show_in_rest' => true,
			],
			'names'
		);
		unset( $post_types['attachment'], $post_types['ys-parts'] );

		foreach ( $post_types as $post_type ) {
			if ( ! self::is_post_type_supported( $post_type ) ) {
				continue;
			}
			register_post_meta(
				$post_type,
				self::OVERLAY_META_KEY,
				[
					'type'              => 'string',
					'single'            => true,
					'default'           => '',
					'show_in_rest'      => true,
					'sanitize_callback' => [ __CLASS__, 'sanitize_overlay' ],
					'auth_callback'     => [ __CLASS__, 'can_edit_post_meta' ],
				]
			);
			register_post_meta(
				$post_type,
				self::MENU_REPLACE_META_KEY,
				[
					'type'              => 'object',
					'single'            => true,
					'default'           => [],
					'show_in_rest'      => [
						'schema' => self::get_menu_replace_schema(),
					],
					'sanitize_callback' => [ __CLASS__, 'sanitize_menu_replace' ],
					'auth_callback'     => [ __CLASS__, 'can_edit_post_meta' ],
				]
			);
		}
	}

	/**
	 * yStandard連携を利用できるか判定する.
	 *
	 * @return bool
	 */
	public static function is_ystandard_available() {
		return (bool) Version::ystandard_version_compare( self::YSTANDARD_MIN_VERSION );
	}

	/**
	 * 投稿タイプで新しい投稿設定を利用できるか判定する.
	 *
	 * @param string $post_type 投稿タイプ.
	 *
	 * @return bool
	 */
	public static function is_available_for_post_type( $post_type ) {
		return self::is_ystandard_available() && self::is_post_type_supported( $post_type );
	}

	/**
	 * 投稿タイプがREST API経由の投稿設定に対応しているか判定する.
	 *
	 * @param string $post_type 投稿タイプ.
	 *
	 * @return bool
	 */
	public static function is_post_type_supported( $post_type ) {
		$post_type_object = get_post_type_object( $post_type );
		if ( ! $post_type_object || ! $post_type_object->show_in_rest ) {
			return false;
		}
		if ( ! post_type_supports( $post_type, 'custom-fields' ) ) {
			return false;
		}

		return use_block_editor_for_post_type( $post_type );
	}

	/**
	 * オーバーレイ設定をサニタイズする.
	 *
	 * @param mixed $value 入力値.
	 *
	 * @return string
	 */
	public static function sanitize_overlay( $value ) {
		$value = is_string( $value ) ? $value : '';

		return in_array( $value, [ 'none', 'on', 'off' ], true ) ? $value : 'none';
	}

	/**
	 * メニュー切り替え設定をサニタイズする.
	 *
	 * @param mixed $value 入力値.
	 *
	 * @return array
	 */
	public static function sanitize_menu_replace( $value ) {
		if ( ! is_array( $value ) ) {
			return [];
		}

		$result    = [];
		$locations = get_registered_nav_menus();
		foreach ( $locations as $location => $label ) {
			if ( ! array_key_exists( $location, $value ) || ! is_scalar( $value[ $location ] ) ) {
				continue;
			}
			$menu_id = (string) $value[ $location ];
			if ( '' === $menu_id ) {
				$result[ $location ] = '';
				continue;
			}
			if ( ! ctype_digit( $menu_id ) || ! wp_get_nav_menu_object( (int) $menu_id ) ) {
				continue;
			}
			$result[ $location ] = (string) (int) $menu_id;
		}

		return $result;
	}

	/**
	 * 投稿メタを編集できるか判定する.
	 *
	 * @param bool   $allowed   許可状態.
	 * @param string $meta_key  メタキー.
	 * @param int    $object_id 投稿ID.
	 *
	 * @return bool
	 */
	public static function can_edit_post_meta( $allowed, $meta_key, $object_id ) {
		return current_user_can( 'edit_post', $object_id );
	}

	/**
	 * メニュー切り替え設定のRESTスキーマを取得する.
	 *
	 * @return array
	 */
	public static function get_menu_replace_schema() {
		$properties = [];
		foreach ( get_registered_nav_menus() as $location => $label ) {
			$properties[ $location ] = [
				'type'    => 'string',
				'default' => '',
			];
		}

		return [
			'type'                 => 'object',
			'properties'           => $properties,
			'additionalProperties' => [
				'type' => 'string',
			],
		];
	}
}

new Post_Settings_Meta();
