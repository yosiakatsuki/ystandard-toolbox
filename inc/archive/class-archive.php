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
		if ( Option::get_option( self::OPTION_NAME, 'archiveMobileLayout', '' ) ) {
			add_filter( 'ys_get_archive_type', [ $this, 'mobile_archive_type' ] );
		}
		if ( Option::get_option( self::OPTION_NAME, 'archiveOrder', '' ) ) {
			add_action( 'pre_get_posts', [ $this, 'change_archive_order' ] );
		}
		if ( Option::get_option( self::OPTION_NAME, 'archiveImageRatio', '' ) ) {
			add_filter( 'ys_archive_image_ratio', [ $this, 'archive_image_ratio' ] );
		}
		if ( Utility::ystandard_version_compare( '4.13.2' ) ) {
			add_filter( 'ys_get_archive_detail_date', [ $this, 'get_archive_detail_date' ], 10, 4 );
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

	/**
	 * モバイルでの一覧レイアウト
	 *
	 * @param string $type Type.
	 *
	 * @return string
	 */
	public function mobile_archive_type( $type ) {
		$mobile = Option::get_option( self::OPTION_NAME, 'archiveMobileLayout', '' );
		if ( $mobile && Utility::is_mobile() ) {
			$type = $mobile;
		}

		return $type;
	}

	/**
	 * アーカイブページの縦横比変更
	 *
	 * @param string $ratio Ratio Class.
	 *
	 * @return string
	 */
	public function archive_image_ratio( $ratio ) {
		$new_ratio = '';

		$ratio_option = Option::get_option( self::OPTION_NAME, 'archiveImageRatio', '' );
		$new_ratio    = ! empty( $ratio_option ) ? $ratio_option : $new_ratio;
		if ( Option::get_option( self::OPTION_NAME, 'archiveMobileLayout', '' ) ) {
			if ( Utility::is_mobile() ) {
				$mobile_ratio = Option::get_option( self::OPTION_NAME, 'archiveImageRatioMobile', '' );

				$new_ratio = ! empty( $mobile_ratio ) ? $mobile_ratio : $new_ratio;
			}
		}

		if ( empty( $new_ratio ) ) {
			return $ratio;
		}

		return "is-${new_ratio}";
	}


	/**
	 * 日付情報の変更
	 *
	 * @param string $date        日付情報.
	 * @param string $format      HTMLフォーマット.
	 * @param string $icon        アイコン.
	 * @param string $date_format 日付フォーマット.
	 *
	 * @return string
	 */
	public function get_archive_detail_date( $date, $format, $icon, $date_format ) {
		if ( 'modified' === Option::get_option( self::OPTION_NAME, 'archiveDisplayDate', '' ) ) {
			return sprintf(
				$format,
				$icon,
				get_the_modified_date( 'Y-m-d' ),
				get_the_modified_date( $date_format )
			);
		}

		return $date;
	}


	/**
	 * アーカイブページの並び順変更
	 *
	 * @param \WP_Query $query query.
	 */
	public function change_archive_order( $query ) {
		if ( is_admin() || ! $query->is_main_query() ) {
			return;
		}
		if ( $query->is_archive() || $query->is_search() ) {
			$order = Option::get_option( self::OPTION_NAME, 'archiveOrder', '' );
			if ( $order ) {
				$order = explode( '/', $order );
				if ( is_array( $order ) && 0 < count( $order ) ) {
					$query->set( 'orderby', $order[0] );
					$query->set( 'order', $order[1] );
				}
			}
		}
	}

}

new Archive();
