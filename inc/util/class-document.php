<?php
/**
 * ページ関連
 *
 * @package ystandard-toolbox
 * @author  yosiakatsuki
 * @license GPL-2.0+
 */

namespace ystandard_toolbox\Util;

defined( 'ABSPATH' ) || die();

class Document {
	/**
	 * タイトルタグ用タイトルの作成
	 *
	 * @param string $title Title.
	 */
	public static function get_document_title( $title ) {

		$title = apply_filters(
			'document_title_parts',
			[
				'title'   => $title,
				'page'    => '',
				'tagline' => '',
				'site'    => get_bloginfo( 'name', 'display' ),
			]
		);
		$sep   = apply_filters( 'document_title_separator', '-' );
		$title = implode( " $sep ", array_filter( $title ) );
		$title = wptexturize( $title );
		$title = convert_chars( $title );
		$title = esc_html( $title );
		$title = capital_P_dangit( $title );

		return $title;
	}
}
