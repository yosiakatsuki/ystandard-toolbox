<?php
/**
 * Heading Helper
 *
 * @package ystandard-toolbox
 * @author  yosiakatsuki
 * @license GPL-2.0+
 */

namespace ystandard_toolbox;

use ystandard_toolbox\Util\Debug;
use ystandard_toolbox\Util\File;
use ystandard_toolbox\Util\Styles;
use ystandard_toolbox\Util\Types;

defined( 'ABSPATH' ) || die();

/**
 * Class Heading Helper.
 */
class Heading_Helper {

	/**
	 * 見出しCSS作成.
	 *
	 * @param array $heading    見出しスタイル.
	 * @param array $level_list レベル別 スタイル情報.
	 *
	 * @return string
	 */
	public static function get_heading_css( $heading, $level_list ) {
		$result = '';

		$selector_all = self::get_selector_all();
		foreach ( $heading as $name => $item ) {
			$slug   = Types::get_array_value( $item, 'slug', '' );
			$label  = Types::get_array_value( $item, 'label', '' );
			$enable = Types::get_array_value( $item, 'enable', true );
			$styles = Types::get_array_value( $item, 'style', [] );
			$before = Types::get_array_value( $item, 'before', [] );
			$after  = Types::get_array_value( $item, 'after', [] );
			$enable = Types::to_bool( $enable );
			// カスタムCSS.
			$custom_css    = apply_filters(
				'ystdtb_custom_heading_custom_css',
				Types::get_array_value( $item, 'customCss', '' ),
				$slug
			);
			$custom_style  = [];
			$custom_before = [];
			$custom_after  = [];
			if ( ! empty( $custom_css ) && is_array( $custom_css ) ) {
				if ( isset( $custom_css['style'] ) ) {
					$custom_style = $custom_css['style'];
				}
				if ( isset( $custom_css['before'] ) ) {
					$custom_before = $custom_css['before'];
				}
				if ( isset( $custom_css['after'] ) ) {
					$custom_after = $custom_css['after'];
				}
			}

			if ( empty( $slug ) || false === $enable ) {
				continue;
			}
			if ( empty( $label ) ) {
				$label = $slug;
			}

			$block_selector = self::get_block_style_selector( $slug );
			$level_selector = self::get_level_style_selector( $selector_all, $level_list, $slug );

			$css_selector = $block_selector;
			if ( ! empty( $level_selector ) ) {
				$css_selector .= ',' . implode( ',', $level_selector );
			}
			if ( ! empty( $custom_style ) ) {
				$styles = $custom_style;
			} else {
				$styles['position'] = 'relative';
				// desktop,tablet,mobileの形に整形。CSSとして使える形に変換.
				$styles = Styles::parse_styles( $styles );
			}

			$style_css = self::create_css( $styles, $css_selector );
			// before.
			$before_selector = self::add_pseudo_elements( $block_selector, $level_selector, 'before' );
			if ( ! empty( $custom_before ) ) {
				$before = $custom_css['before'];
			} else {
				Debug::debug_var_dump_file(
					[
						'$before'           => $before,
					],
					__DIR__ . '/get_heading_css.html'
				);
				$before = Styles::parse_styles_pseudo_elements( $before, 'before' );
			}
			$before_css = self::create_css( $before, $before_selector );
			// after.
			$after_selector = self::add_pseudo_elements( $block_selector, $level_selector, 'after' );
			if ( ! empty( $custom_after ) ) {
				$after = $custom_css['after'];
			} else {
				$after = Styles::parse_styles_pseudo_elements( $after, 'after' );
			}

			$after_css = self::create_css( $after, $after_selector );
			// 結合.
			$result .= $style_css . $before_css . $after_css;
		}

		return $result;
	}

	/**
	 * CSS作成.
	 *
	 * @param array  $styles   Styles.
	 * @param string $selector CSS Selector.
	 *
	 * @return string
	 */
	public static function create_css( $styles, $selector ) {
		$result = '';
		if ( array_key_exists( 'desktop', $styles ) ) {
			$css = Styles::get_styles_css( $styles['desktop'] );
			if ( ! empty( $css ) ) {
				$result .= $selector . $css;
			}
		}
		if ( array_key_exists( 'tablet', $styles ) ) {
			$css = Styles::get_styles_css( $styles['tablet'] );
			if ( ! empty( $css ) ) {
				$result .= Styles::add_media_query_only_tablet( $selector . $css );
			}
		}
		if ( array_key_exists( 'mobile', $styles ) ) {
			$css = Styles::get_styles_css( $styles['mobile'] );
			if ( ! empty( $css ) ) {
				$result .= Styles::add_media_query_only_mobile( $selector . $css );
			}
		}

		return $result;
	}

	/**
	 * 疑似要素追加.
	 *
	 * @param string $block_selector Block Selector.
	 * @param array  $level_selector Level Selector.
	 * @param string $type           Before / After.
	 *
	 * @return string
	 */
	public static function add_pseudo_elements( $block_selector, $level_selector, $type = 'before' ) {
		$result          = '';
		$pseudo_elements = "::{$type}";
		// 結合.
		if ( $block_selector ) {
			$result .= "{$block_selector}{$pseudo_elements}";
		}
		if ( ! empty( $level_selector ) ) {
			$result .= ',';
			$result .= implode( "{$pseudo_elements},", $level_selector ) . "{$pseudo_elements}";
		}

		return $result;
	}

	/**
	 * ブロックスタイル用セレクター取得.
	 *
	 * @param string $level Level.
	 *
	 * @return string
	 */
	public static function get_block_style_selector( $level ) {
		$body             = '.' . Config::BODY_CLASS;
		$heading_selector = '.' . Heading::BODY_CLASS_HEADING;

		return "{$body}{$heading_selector} .is-style-ystdtb-{$level}";
	}

	/**
	 * レベル別のセレクター取得.
	 *
	 * @param array  $level_selector レベル別セレクター.
	 * @param array  $level_list     レベルリスト.
	 * @param string $slug           設定名.
	 *
	 * @return array
	 */
	public static function get_level_style_selector( $level_selector, $level_list, $slug ) {
		$result = [];
		foreach ( $level_list as $key => $value ) {
			// レベル別スタイルに設定されている時.
			if ( $value === $slug ) {
				if ( isset( $level_selector[ $key ] ) ) {
					$result = array_merge( $result, $level_selector[ $key ] );
				}
			}
		}

		return $result;
	}

	/**
	 * レベル別のセレクター取得
	 *
	 * @return array
	 */
	public static function get_selector_all() {
		$body   = '.' . Config::BODY_CLASS;
		$result = [];

		// レベル別.
		$content = apply_filters( 'ystdtb_heading_selector_content', '.entry-content' );
		foreach ( [ 'h1', 'h2', 'h3', 'h4', 'h5', 'h6' ] as $level ) {
			$selector         = "{$level}:not([class*=\"is-style-ystdtb-\"]):not([class*=\".is-clear-style\"])";
			$result[ $level ] = [ "{$body} {$content} {$selector}" ];
		}

		// サイドバー クラシックウィジェット.
		$area     = apply_filters( 'ystdtb_heading_selector_sidebar', '.sidebar' );
		$target   = [];
		$target[] = "{$body} {$area} .widget-title";
		$target[] = "{$body} {$area} .widgettitle";
		// 結合.
		$result['sidebar'] = $target;

		// フッター クラシックウィジェット.
		$area     = apply_filters( 'ystdtb_heading_selector_footer', '.site-footer' );
		$target   = [];
		$target[] = "{$body} {$area} .widget-title";
		$target[] = "{$body} {$area} .widgettitle";
		// 結合.
		$result['footer'] = $target;

		// 投稿タイトル.
		$title = apply_filters( 'ystdtb_heading_selector_post_title', '.entry-title' );
		// 結合.
		$result['post-title'] = [ "{$body}.single {$title}" ];

		// 固定ページタイトル.
		$title = apply_filters( 'ystdtb_heading_selector_page_title', '.entry-title' );
		// 結合.
		$result['page-title'] = [ "{$body}.page {$title}" ];

		// アーカイブページタイトル.
		$title = apply_filters( 'ystdtb_heading_selector_page_title', '.archive__header .archive__page-title' );
		// 結合.
		$result['archive-title'] = [ "{$body} {$title}" ];

		return $result;
	}

	/**
	 * プリセット取得.
	 *
	 * @param string $name Name.
	 *
	 * @return array
	 */
	public static function get_preset( $name ) {
		$presets = self::get_presets_all();
		if ( ! array_key_exists( $name, $presets ) ) {
			return [];
		}

		return $presets[ $name ];
	}

	/**
	 * プリセット取得.
	 *
	 * @return array
	 */
	public static function get_presets_all() {
		return File::get_json_file_contents( YSTDTB_PATH . '/library/ystandard-toolbox-heading/preset.json' );
	}
}
