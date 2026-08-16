<?php
/**
 * 投稿設定の表示先選択.
 *
 * @package ystandard-toolbox
 * @author  yosiakatsuki
 * @license GPL-2.0+
 */

namespace ystandard_toolbox;

use ystandard_toolbox\Util\Version;

defined( 'ABSPATH' ) || die();

/**
 * Class Post_Settings_Registry
 *
 * @package ystandard-toolbox
 */
class Post_Settings_Registry {

	/**
	 * 従来のメタボックスへ表示する.
	 */
	const DISPLAY_LEGACY_META_BOX = 'legacy-meta-box';

	/**
	 * Toolboxモーダルへ表示する.
	 */
	const DISPLAY_TOOLBOX_MODAL = 'toolbox-modal';

	/**
	 * yStandard投稿設定パネルへ表示する.
	 */
	const DISPLAY_YSTANDARD_PANEL = 'ystandard-panel';

	/**
	 * yStandardモーダルへ表示する.
	 */
	const DISPLAY_YSTANDARD_MODAL = 'ystandard-modal';

	/**
	 * yStandard投稿設定パネルの対応バージョン.
	 */
	const YSTANDARD_PANEL_MIN_VERSION = '4.59.0-alpha-1';

	/**
	 * yStandard投稿設定モーダルの対応バージョン.
	 */
	const YSTANDARD_MODAL_MIN_VERSION = '5.0.0-alpha-1';

	/**
	 * 共通コンテキストを作成する.
	 *
	 * @param string $post_type 投稿タイプ.
	 * @param int    $post_id   投稿ID.
	 *
	 * @return array
	 */
	public static function get_context( $post_type, $post_id = 0 ) {
		return [
			'post_type' => (string) $post_type,
			'post_id'   => (int) $post_id,
		];
	}

	/**
	 * 投稿設定の表示先を取得する.
	 *
	 * @param array $context 共通コンテキスト.
	 *
	 * @return string|false
	 */
	public static function get_display_mode( $context ) {
		if ( ! Version::ystandard_version_compare() ) {
			// yStandard以外ではToolboxモーダルを使用する.
			$display_mode = self::DISPLAY_TOOLBOX_MODAL;
		} elseif ( Version::ystandard_version_compare( self::YSTANDARD_MODAL_MIN_VERSION ) ) {
			// yStandard v5以降ではyStandardモーダルを使用する.
			$display_mode = self::DISPLAY_YSTANDARD_MODAL;
		} elseif ( Version::ystandard_version_compare( self::YSTANDARD_PANEL_MIN_VERSION ) ) {
			// yStandard 4.59以上かつv5未満では投稿設定パネルを使用する.
			$display_mode = self::DISPLAY_YSTANDARD_PANEL;
		} else {
			// yStandard 4.59未満では従来のメタボックスを使用する.
			$display_mode = self::DISPLAY_LEGACY_META_BOX;
		}

		return apply_filters( 'ys_post_settings_display_mode', $display_mode, $context );
	}
}
