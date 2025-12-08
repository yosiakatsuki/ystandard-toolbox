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
	 * @param array $heading 見出しスタイル.
	 * @param array $level_list レベル別 スタイル情報.
	 * @param bool $is_editor エディター用CSSかどうか.
	 *
	 * @return string
	 */
	public static function get_heading_css( $heading, $level_list, $is_editor = false ) {
		$result = '';

		$selector_all = self::get_selector_all( $is_editor );
		// 見出しスタイルごとに処理.
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
			// カスタムCSSが設定されていて、配列の場合、style,before,afterに分割.
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
			// スラッグ不明 or 無効の場合はスキップ.
			if ( empty( $slug ) || false === $enable ) {
				continue;
			}
			// ラベルが未設定の場合はスラッグを使用.
			if ( empty( $label ) ) {
				$label = $slug;
			}

			// セレクター（CSSクラス）の作成.
			$block_selector = self::get_block_style_selector( $slug, $is_editor );
			$level_selector = self::get_level_style_selector( $selector_all, $level_list, $slug );

			$css_selector = $block_selector;
			// レベル別のセレクター作成.
			if ( ! empty( $level_selector ) ) {
				$css_selector .= ',' . implode( ',', $level_selector );
			}
			// カスタムスタイル.
			if ( ! empty( $custom_style ) ) {
				$styles = $custom_style;
			} else {
				$styles['position'] = 'relative';
				// desktop,tablet,mobileの形に整形。CSSとして使える形に変換.
				$styles = Styles::parse_styles( $styles );
			}
			// CSS作成.
			$style_css = self::create_css( $styles, $css_selector );

			// before.
			$before_selector = self::add_pseudo_elements( $block_selector, $level_selector, 'before' );
			if ( ! empty( $custom_before ) ) {
				$before = $custom_css['before'];
			} else {
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

			// 各スタイルを結合.
			$result .= $style_css . $before_css . $after_css;
		}


		return $result;
	}

	/**
	 * CSS作成.
	 *
	 * @param array $styles Styles.
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
	 * @param array $level_selector Level Selector.
	 * @param string $type Before / After.
	 *
	 * @return string
	 */
	public static function add_pseudo_elements( $block_selector, $level_selector, $type ) {
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
	 * Bodyクラス取得.
	 *
	 * @param bool $is_editor エディター用か.
	 *
	 * @return string
	 */
	public static function get_body_class( $is_editor = false ) {
		$class_name = '.' . Config::BODY_CLASS;

		// 編集画面の時.
		if ( $is_editor ) {
			$class_name = '';
		}

		return $class_name;
	}

	/**
	 * 見出し反映用クラス取得.
	 *
	 * @param bool $is_editor エディター用か.
	 *
	 * @return string
	 */
	public static function get_heading_selector( $is_editor = false ) {
		$class_name = '.' . Heading::BODY_CLASS_HEADING;

		// 編集画面の時.
		if ( $is_editor ) {
			$class_name = '.editor-styles-wrapper';
		}

		return $class_name;
	}

	/**
	 * ブロックスタイル用セレクター名取得.
	 *
	 * @param string $slug Slug.
	 *
	 * @return string
	 */
	public static function get_block_style_selector_name( $slug ) {
		return "ystdtb-{$slug}";
	}

	/**
	 * ブロックスタイル用セレクター取得.
	 *
	 * @param string $level Level.
	 * @param bool $is_editor Is Editor.
	 *
	 * @return string
	 */
	public static function get_block_style_selector( $level, $is_editor = false ) {
		// 各セレクター取得.
		$body             = self::get_body_class( $is_editor );
		$heading_selector = self::get_heading_selector( $is_editor );
		$selector_name    = self::get_block_style_selector_name( $level );

		return "{$body}{$heading_selector} .is-style-{$selector_name}";
	}

	/**
	 * レベル別のセレクター取得.
	 *
	 * @param array $level_selector レベル別セレクター.
	 * @param array $level_list レベルリスト.
	 * @param string $slug 設定名.
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
	 * @param bool $is_editor エディター用か.
	 *
	 * @return array
	 */
	public static function get_selector_all( $is_editor = false ) {
		$body   = self::get_body_class( $is_editor );
		$result = [];

		// *************************************************************
		// レベル別.
		// *************************************************************
		$content = apply_filters( 'ystdtb_heading_selector_content', '.entry-content' );
		$content = $is_editor ? '.editor-styles-wrapper' : $content;
		foreach ( [ 'h1', 'h2', 'h3', 'h4', 'h5', 'h6' ] as $level ) {
			$selector = "{$level}:where(.wp-block-heading):not([class*=\"is-style-ystdtb-\"]):not([class*=\"is-clear-style\"])";
			// エディター側で細かく制御する用フック。配列で渡されるので注意！.
			$css_selector     = apply_filters(
				'ystdtb_heading_css_selector_content',
				[ "{$body} {$content} {$selector}" ],
				$is_editor
			);
			$result[ $level ] = $css_selector;
		}

		// *************************************************************
		// サイドバー クラシックウィジェット.
		// *************************************************************
		$area     = apply_filters( 'ystdtb_heading_selector_classic_widget', '.sidebar' );
		$area     = $is_editor ? 'body.widgets-php :where(.wp-block-widget-area__panel-body-content)' : $area;
		$target   = [];
		$target[] = "{$body} {$area} .widget-title";
		$target[] = "{$body} {$area} .widgettitle";
		// エディター側で細かく制御する用フック。配列で渡されるので注意！.
		$css_selector = apply_filters(
			'ystdtb_heading_css_selector_classic_widget',
			$target,
			$is_editor
		);
		// 結合.
		$result['sidebar'] = $css_selector;

		// *************************************************************
		// フッター クラシックウィジェット.
		// *************************************************************
		$area = apply_filters( 'ystdtb_heading_selector_footer_classic_widget', '.site-footer' );
		// エディター用のセレクター.
		$editor_selector = implode(
			',',
			[
				'body.widgets-php :where(.wp-block-widget-area__panel-body-content) div[data-widget-area-id="footer-left"]',
				'body.widgets-php :where(.wp-block-widget-area__panel-body-content) div[data-widget-area-id="footer-center"]',
				'body.widgets-php :where(.wp-block-widget-area__panel-body-content) div[data-widget-area-id="footer-right"]',
			]
		);
		$area            = $is_editor ? $editor_selector : $area;
		$target          = [];
		$target[]        = "{$body} {$area} .widget-title";
		$target[]        = "{$body} {$area} .widgettitle";
		// エディター側で細かく制御する用フック。配列で渡されるので注意！.
		$css_selector = apply_filters(
			'ystdtb_heading_css_selector_footer_classic_widget',
			$target,
			$is_editor
		);
		// 結合.
		$result['footer'] = $css_selector;

		// *************************************************************
		// 投稿タイトル.
		// *************************************************************
		$title = apply_filters( 'ystdtb_heading_selector_post_title', '.entry-title' );
		$title = $is_editor ? ':where(.wp-block-post-title)' : $title;
		$area  = $is_editor ? 'body.post-type-post' : '.single';
		// エディター側で細かく制御する用フック。配列で渡されるので注意！.
		$css_selector = apply_filters(
			'ystdtb_heading_css_selector_post_title',
			[ "{$body}{$area} {$title}" ],
			$is_editor
		);
		// 結合.
		$result['post-title'] = $css_selector;

		// *************************************************************
		// 固定ページタイトル.
		// *************************************************************
		$title = apply_filters( 'ystdtb_heading_selector_page_title', '.entry-title' );
		$title = $is_editor ? ':where(.wp-block-post-title)' : $title;
		$area  = $is_editor ? 'body.post-type-page' : '.page';
		// エディター側で細かく制御する用フック。配列で渡されるので注意！.
		$css_selector = apply_filters(
			'ystdtb_heading_css_selector_page_title',
			[ "{$body}{$area} {$title}" ],
			$is_editor
		);
		// 結合.
		$result['page-title'] = $css_selector;

		// *************************************************************
		// アーカイブページタイトル.
		// *************************************************************
		$title = apply_filters( 'ystdtb_heading_selector_page_title', '.archive__header .archive__page-title' );
		// 結合。アーカイブに関してはエディター側の制御は不要なはず….
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
