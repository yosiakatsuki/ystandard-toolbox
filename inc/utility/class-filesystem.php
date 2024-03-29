<?php
/**
 * File System
 *
 * @package ystandard-toolbox
 * @author  yosiakatsuki
 * @license GPL-2.0+
 */

namespace ystandard_toolbox;

defined( 'ABSPATH' ) || die();

/**
 * Class File_System
 *
 * @package ystandard_toolbox
 */
class Filesystem {
	/**
	 * 変数 wp_filesystem の退避用
	 *
	 * @var \WP_Filesystem_Base
	 */
	private static $filesystem;

	/**
	 * ファイル内容の取得
	 *
	 * @param string $file ファイルパス.
	 *
	 * @return string
	 */
	public static function file_get_contents( $file ) {
		$filesystem_direct = self::init_filesystem();
		$content           = false;
		if ( $filesystem_direct ) {
			$content = $filesystem_direct->get_contents( $file );
		}
		global $wp_filesystem;
		$wp_filesystem = self::$filesystem;

		return $content;
	}

	/**
	 * Jsonファイルの中身を取得
	 *
	 * @param string $path json file path.
	 *
	 * @return array|mixed
	 */
	public static function get_json_file_contents( $path ) {
		$contents = self::file_get_contents( $path );
		if ( ! $contents ) {
			return [];
		}
		$json = json_decode( $contents, true );
		if ( is_null( $json ) ) {
			return [];
		}

		return $json;
	}

	/**
	 * ファイルシステムの初期化
	 *
	 * @return \WP_Filesystem_Direct
	 */
	public static function init_filesystem() {
		global $wp_filesystem;
		self::$filesystem = $wp_filesystem;

		if ( empty( $wp_filesystem ) ) {
			require_once ABSPATH . '/wp-admin/includes/file.php';
		}

		add_filter( 'filesystem_method', [ '\ystandard_toolbox\Filesystem', 'filesystem_direct' ] );

		WP_Filesystem();

		remove_filter( 'filesystem_method', [ '\ystandard_toolbox\Filesystem', 'filesystem_direct' ] );

		return $wp_filesystem;
	}

	/**
	 * WP_Filesystem_Directを使用
	 *
	 * @return string
	 */
	public static function filesystem_direct() {
		return 'direct';
	}
}
