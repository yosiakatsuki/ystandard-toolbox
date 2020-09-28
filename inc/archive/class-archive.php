<?php
/**
 * Archive
 *
 * @package ystandard-toolbox
 * @author  yosiakatsuki
 * @license GPL-2.0+
 */

namespace ystandard_toolbox;

defined( 'ABSPATH' ) || die();

/**
 * Class Archive
 *
 * @package ystandard_toolbox
 */
class Archive {

	/**
	 * 設定名
	 */
	const OPTION_NAME = 'archive';

	/**
	 * Archive constructor.
	 */
	public function __construct() {
		$this->load_files();

		if ( Utility::ystandard_version_compare( '4.13.1' ) ) {
			add_filter( 'ys_get_archive_default_image', [ $this, 'get_archive_default_image' ], 10, 4 );
		}
	}

	/**
	 * 必要ファイルの読み込み
	 */
	private function load_files() {

	}

	/**
	 * 一覧ページデフォルト画像
	 *
	 * @param string $image          Image.
	 * @param string $class          Css class.
	 * @param string $icon_class     Icon Class.
	 * @param string $thumbnail_size Thumbnail size.
	 *
	 * @return string
	 */
	public function get_archive_default_image( $image, $class, $icon_class, $thumbnail_size ) {
		$default = Option::get_option( self::OPTION_NAME, 'archiveDefaultImage', '' );
		if ( $default ) {
			$id = attachment_url_to_postid( $default );
			if ( $id ) {
				$image = wp_get_attachment_image(
					$id,
					$thumbnail_size,
					false,
					[
						'class' => $class,
						'alt'   => get_the_title(),
					]
				);
			}
		}

		return $image;
	}

}

new Archive();
