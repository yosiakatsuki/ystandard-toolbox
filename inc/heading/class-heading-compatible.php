<?php
/**
 * Heading compatible.
 *
 * @package ystandard-toolbox
 * @author  yosiakatsuki
 * @license GPL-2.0+
 */

namespace ystandard_toolbox;

use ystandard_toolbox\helper\Styles;
use ystandard_toolbox\Util\Types;

defined( 'ABSPATH' ) || die();

/**
 * 見出し機能 互換性
 */
class Heading_Compatible {

	/**
	 * 設定名(旧)
	 */
	const OPTION_NAME = 'ystdtb_heading';

	/**
	 * ブロックスタイル用(旧)
	 */
	const BODY_CLASS_HEADING = 'ystdtb-heading';

	/**
	 * オプション値
	 *
	 * @var array
	 */
	private $option;

	/**
	 * 見出し設定の初期値
	 *
	 * @var array
	 */
	private $schema;

	/**
	 * 見出し設定のプリセット情報
	 *
	 * @var array
	 */
	private $preset;

	/**
	 * CSS
	 *
	 * @var array
	 */
	private $css;

	/**
	 * CSS(Tablet)
	 *
	 * @var array
	 */
	private $css_tablet;

	/**
	 * CSS(PC)
	 *
	 * @var array
	 */
	private $css_pc;

	/**
	 * ブロックエディター用クラス
	 *
	 * @var bool
	 */
	private $editor = false;

	/**
	 * Heading constructor.
	 */
	public function __construct() {
		add_action( Config::AFTER_ENQUEUE_CSS_HOOK, [ $this, 'add_heading_styles' ] );
		add_action( 'enqueue_block_assets', [ $this, 'add_heading_editor_styles' ], 11 );
		add_action( 'enqueue_block_editor_assets', [ $this, 'block_editor_option' ] );
		add_filter( 'body_class', [ $this, 'body_class_heading' ], 20 );
		add_filter( 'ystdtb_plugin_settings', [ $this, 'add_plugin_settings' ] );
		Notice::set_notice( [ $this, 'notice_compatible_mode' ] );
	}


	public function notice_compatible_mode() {
		global $hook_suffix;
		if ( false !== strpos( $hook_suffix, 'ystdtb-settings-v2' ) ) {
			return;
		}
		Notice::warning( '[yStandard Toolbox]見出しデザイン機能は現在互換モードで動作しています。[ys]Toolbox → 見出しデザイン編集 メニューから新方式へ変換してください。' );
	}

	/**
	 * 設定追加
	 *
	 * @param array $options 設定.
	 *
	 * @return array
	 */
	public function add_plugin_settings( $options ) {

		$options['heading-v1'] = self::get_option();

		return $options;
	}

	/**
	 * Body Class.
	 *
	 * @param array $classes classes.
	 *
	 * @return array
	 */
	public function body_class_heading( $classes ) {
		$classes[] = self::BODY_CLASS_HEADING;

		return $classes;
	}

	/**
	 * 見出し用CSS追加
	 */
	public function add_heading_styles() {
		$this->editor = false;
		$css          = $this->get_heading_css();

		if ( empty( $css ) ) {
			return;
		}
		wp_add_inline_style(
			Config::CSS_HANDLE,
			Utility::minify( $css )
		);
	}

	/**
	 * 見出し用CSS追加
	 */
	public function add_heading_editor_styles() {
		$this->editor = true;
		// CSS.
		$css = $this->get_heading_css();

		if ( empty( $css ) || ! is_admin() ) {
			return;
		}
		$wrap        = Config::EDITOR_STYLES_WRAPPER;
		$block_style = "#editor ${wrap}.block-editor-block-preview__container .is-style-default";
		// スタイルパネル用.
		$css .= "${block_style} {border:0;color:#222;background:none;}";
		$css .= "${block_style}:before {display:none;}";
		$css .= "${block_style}:after {display:none;}";

		wp_add_inline_style(
			Config::BLOCK_CSS_HANDLE,
			Utility::minify( $css )
		);
	}

	/**
	 * CSS作成
	 *
	 * @return string
	 */
	private function get_heading_css() {
		$options = self::get_option();
		// 初期値等取得.
		$this->schema = Filesystem::get_json_file_contents(
			YSTDTB_PATH . '/js/admin/heading/schema.json'
		);
		$this->preset = Filesystem::get_json_file_contents(
			YSTDTB_PATH . '/js/admin/heading/preset.json'
		);

		$css = '';
		foreach ( $options as $level => $value ) {
			$this->init_var();
			$this->option = $value;
			if ( ! Types::to_bool( $this->get_value( 'useCustomStyle' ) ) ) {
				continue;
			}
			$this->get_font_css();
			$this->get_background_css();
			$this->get_border_css();
			$this->get_padding_css();
			$this->get_margin_css();
			$this->get_additional_style_css();
			$this->get_pseudo_elements_css();
			// 結合.
			$css .= $this->get_inline_css( $level );
		}

		return $css;
	}

	/**
	 * 変数初期化
	 */
	private function init_var() {
		$this->css        = [
			'content' => [],
			'before'  => [],
			'after'   => [],
		];
		$this->css_tablet = [
			'content' => [],
			'before'  => [],
			'after'   => [],
		];
		$this->css_pc     = [
			'content' => [],
			'before'  => [],
			'after'   => [],
		];
	}

	/**
	 * 見出し用CSS作成.
	 *
	 * @param string $level 見出しレベル.
	 *
	 * @return bool
	 */
	private function get_inline_css( $level ) {

		$block_style = $this->get_selector( $level, true );
		$selector    = $this->get_selector( $level );

		if ( $this->editor ) {
			$wrap        = Config::EDITOR_STYLES_WRAPPER;
			$block_style = "${wrap} .is-style-ystdtb-${level}";
			if ( in_array( $level, [ 'h1', 'h2', 'h3', 'h4', 'h5', 'h6' ], true ) ) {
				$selector = "${wrap} ${level}:not([class*=\"is-style-ystdtb-\"]):not(.is-clear-style)";
			}
		}

		$content = $this->get_section_selector( "${block_style},${selector}" );
		$before  = $this->get_section_selector( "${block_style},${selector}", '::before' );
		$after   = $this->get_section_selector( "${block_style},${selector}", '::after' );

		// CSS.
		$css      = '';
		$sections = [ 'content', 'before', 'after' ];
		foreach ( $sections as $section ) {
			$style = $this->get_styles( $this->css, $section );
			if ( $style ) {
				$css .= "${$section} { ${style} }";
			}
			// サイズ別.
			$style = $this->get_styles( $this->css_tablet );
			if ( $style ) {
				$css .= Styles::add_media_query(
					"${$section} { ${style} }",
					'tablet'
				);
			}
			$style = $this->get_styles( $this->css_pc );
			if ( $style ) {
				$css .= Styles::add_media_query(
					"${$section} { ${style} }",
					'desktop'
				);

			}
		}

		return $css;
	}

	/**
	 * セレクタの分解と結合・疑似要素追加
	 *
	 * @param string $selectors セレクタ.
	 * @param string $pseudo    疑似要素.
	 *
	 * @return string
	 */
	private function get_section_selector( $selectors, $pseudo = '' ) {
		$result    = '';
		$selectors = explode( ',', $selectors );
		foreach ( $selectors as $selector ) {
			$result .= "${selector}${pseudo},";
		}

		return rtrim( $result, ',' );
	}

	/**
	 * セレクター取得
	 *
	 * @param string $level 見出しレベル.
	 * @param bool   $block ブロック.
	 *
	 * @return string
	 */
	private function get_selector( $level, $block = false ) {
		$body_class = '.' . Config::BODY_CLASS;
		// ブロックスタイル.
		$block_style_class = '.' . self::BODY_CLASS_HEADING;
		if ( $block ) {
			return "${body_class}${block_style_class} .is-style-ystdtb-${level}";
		}
		// レベル別.
		if ( in_array( $level, [ 'h1', 'h2', 'h3', 'h4', 'h5', 'h6' ], true ) ) {
			$level_selector = "${level}:not([class*=\"is-style-ystdtb-\"]):not(.is-clear-style)";
			$class          = apply_filters(
				'ystdtb_heading_selector_content',
				'.entry-content'
			);

			return "${body_class} ${class} ${level_selector}";
		}
		// サイドバー.
		if ( 'sidebar' === $level ) {
			$class = apply_filters(
				'ystdtb_heading_selector_sidebar',
				'.sidebar'
			);

			return "${body_class} ${class} .widget-title,${body_class} ${class} .widgettitle";
		}
		// フッター.
		if ( 'footer' === $level ) {
			$class = apply_filters(
				'ystdtb_heading_selector_footer',
				'.site-footer'
			);

			return "${body_class} ${class} .widget-title,${body_class} ${class} .widgettitle";
		}
		// 投稿タイトル.
		if ( 'post-title' === $level ) {
			$class = apply_filters(
				'ystdtb_heading_selector_post_title',
				'.entry-title'
			);

			return "${body_class}.single ${class}";
		}
		// 固定ページタイトル.
		if ( 'page-title' === $level ) {
			$class = apply_filters(
				'ystdtb_heading_selector_page_title',
				'.entry-title'
			);

			return "${body_class}.page ${class}";
		}
		// アーカイブページタイトル.
		if ( 'archive-title' === $level ) {
			$class = apply_filters(
				'ystdtb_heading_selector_page_title',
				'.archive__header .archive__page-title'
			);

			return "${body_class} ${class}";
		}

		return '';
	}

	/**
	 * スタイル作成
	 *
	 * @param array  $styles  styles.
	 * @param string $section section.
	 *
	 * @return string
	 */
	private function get_styles( $styles, $section = 'content' ) {
		if ( ! isset( $styles[ $section ] ) || empty( $styles[ $section ] ) ) {
			return '';
		}
		$css = '';
		foreach ( $styles[ $section ] as $key => $value ) {
			if ( 'content' === $key ) {
				$content = empty( $value ) ? '""' : $value;
				// 結合.
				$css .= 'content:' . $content . ';';
			} else {
				if ( ! empty( $key ) && '' !== $value ) {
					if ( preg_match( '/#\{.+?\}/', $value, $matches ) ) {
						$replace  = $matches[0];
						$property = str_replace( [ '#{', '}' ], '', $replace );
						$convert  = '';
						if ( 1 < count( explode( ',', $property ) ) ) {
							$convert  = explode( ',', $property )[1];
							$property = explode( ',', $property )[0];
						}
						if ( isset( $styles[ $section ][ $this->get_css_property( $property ) ] ) ) {
							$style = $styles[ $section ][ $this->get_css_property( $property ) ];
							if ( 'rgb' === $convert ) {
								$rgb   = Styles::hex_2_rgb( $style );
								$style = "{$rgb[0]},{$rgb[1]},{$rgb[2]}";
							}
							$value = str_replace(
								$replace,
								$style,
								$value
							);
						}
					}
					$css .= "${key}:${value};";
				}
			}
		}

		return $css;
	}


	/**
	 * フォント関連
	 */
	private function get_font_css() {
		// font-size.
		$fz_unit = $this->get_unit( 'fontSizeUnit' );
		$default = $this->get_value( 'fontSizePc', 1 );
		if ( Types::to_bool( $this->get_value( 'fontSizeResponsive' ) ) ) {
			$this->set_css(
				'font-size',
				$this->get_value( 'fontSizeMobile', $default ) . $fz_unit
			);
			$this->set_css_tablet(
				'font-size',
				$this->get_value( 'fontSizeTablet', $default ) . $fz_unit
			);
			$this->set_css_pc(
				'font-size',
				$this->get_value( 'fontSizePc', $default ) . $fz_unit
			);
		} else {
			$this->set_css(
				'font-size',
				$this->get_value( 'fontSizePc', $default ) . $fz_unit
			);
		}
		// color.
		$this->set_css(
			'color',
			$this->get_value( 'fontColor' )
		);
		// align.
		$this->set_css(
			'text-align',
			$this->get_value( 'fontAlign' )
		);
		// weight.
		$this->set_css(
			'font-weight',
			$this->get_value( 'fontWeight' )
		);
		// style.
		$this->set_css(
			'font-style',
			$this->get_value( 'fontStyle' )
		);
		// 高度な設定.
		if ( Types::to_bool( $this->get_value( 'fontAdvanced' ) ) ) {
			// family.
			$this->set_css(
				'font-family',
				$this->get_value( 'fontFamily' )
			);
			// line-height.
			$this->set_css(
				'line-height',
				$this->get_value( 'lineHeight' )
			);
			// letter-spacing.
			$this->set_css(
				'letter-spacing',
				$this->get_value( 'letterSpacing' ) . 'em'
			);
		}
	}

	/**
	 * フォント関連
	 */
	private function get_background_css() {
		$this->set_css(
			'background-color',
			$this->get_value( 'backgroundColor' )
		);
		$image = $this->get_value( 'backgroundImage' );
		$image = empty( $image ) ? '' : "url(\"${image}\")";
		$this->set_css(
			'background-image',
			$image
		);
		$this->set_css(
			'background-position',
			str_replace( '-', ' ', $this->get_value( 'backgroundPosition' ) )
		);
		$this->set_css(
			'background-repeat',
			$this->get_value( 'backgroundRepeat' )
		);
		$this->set_css(
			'background-size',
			$this->get_value( 'backgroundSize' )
		);
	}

	/**
	 * 線
	 */
	private function get_border_css() {
		$pos = $this->get_position_list();
		foreach ( $pos as $value ) {
			$unit  = $this->get_unit( "border${value}WidthUnit" );
			$width = $this->get_value( "border${value}Width" );
			$style = $this->get_value( "border${value}Style" );
			$color = $this->get_value( "border${value}Color" );
			if ( '0' === $width ) {
				$unit  = '';
				$style = '';
				$color = '';
			}
			$property = strtolower( $value );
			// CSS.
			$this->set_css(
				"border-${property}",
				trim( "${width}${unit} ${style} ${color}" )
			);
		}
		$radius = $this->get_value( 'borderRadius' );
		if ( '' !== $radius ) {
			$this->set_css(
				'border-radius',
				$radius . 'px'
			);
		}
	}

	/**
	 * Padding.
	 */
	private function get_padding_css() {
		$pos = $this->get_position_list();
		foreach ( $pos as $value ) {
			$num = $this->get_value( "padding${value}" );
			if ( ! is_numeric( $num ) && empty( $num ) ) {
				continue;
			}
			$unit = $this->get_unit( "padding${value}Unit" );
			if ( 0 === $num || '0' === $num ) {
				$unit = '';
			}
			$property = strtolower( $value );
			// CSS.
			$this->set_css(
				"padding-${property}",
				"${num}${unit}"
			);
		}
	}

	/**
	 * Margin.
	 */
	private function get_margin_css() {
		$pos = [ 'Top', 'Bottom' ];
		foreach ( $pos as $value ) {
			$num = $this->get_value( "margin${value}" );
			if ( ! is_numeric( $num ) && empty( $num ) ) {
				continue;
			}
			$unit = $this->get_unit( "margin${value}Unit" );
			if ( 0 === $num || '0' === $num ) {
				$unit = '';
			}
			$property = strtolower( $value );
			// CSS.
			$this->set_css(
				"margin-${property}",
				"${num}${unit}"
			);
		}
	}

	/**
	 * 追加CSS.
	 */
	private function get_additional_style_css() {
		$preset = $this->get_preset();
		// 追加スタイル.
		if ( isset( $preset['additionalStyle'] ) ) {
			if ( isset( $preset['additionalStyle']['content'] ) ) {
				foreach ( $preset['additionalStyle']['content'] as $key => $value ) {
					$this->set_css( $key, $value );
				}
			}
			if ( isset( $preset['additionalStyle']['before'] ) ) {
				foreach ( $preset['additionalStyle']['before'] as $key => $value ) {
					$this->set_css( $key, $value, 'before' );
				}
			}
			if ( isset( $preset['additionalStyle']['after'] ) ) {
				foreach ( $preset['additionalStyle']['after'] as $key => $value ) {
					$this->set_css( $key, $value, 'after' );
				}
			}
		}
	}

	/**
	 * 疑似要素.
	 */
	private function get_pseudo_elements_css() {
		$preset = $this->get_preset();
		// クリア.
		if ( isset( $preset['clearPseudoElements'] ) && Types::to_bool( $preset['clearPseudoElements'] ) ) {
			$this->set_css( 'display', 'none', 'before' );
			$this->set_css( 'display', 'none', 'after' );
		}
		// 疑似要素.
		if ( ! isset( $preset['enablePseudoElements'] ) ) {
			return;
		}
		$pseudo_elements = [ 'before', 'after' ];
		foreach ( $pseudo_elements as $pos ) {
			$size = $this->get_value( "${pos}Size" );
			if ( '0' !== $size && '' !== $size ) {
				$content = stripslashes( $this->get_value( "${pos}Content" ) );
				if ( false !== strpos( $content, '<svg' ) ) {
					$content = str_replace( '\'', '"', $content );
					$content = str_replace( '#', '%23', $content );
					$content = "url('data:image/svg+xml;charset=UTF-8,${content}')";
				}
				$this->set_css(
					'content',
					$content,
					$pos
				);
			}
			// size.
			if ( isset( $preset['usePseudoElementsSize'] ) ) {
				foreach ( $preset['usePseudoElementsSize'] as $item ) {
					$this->set_css(
						$item,
						$this->get_value( "${pos}Size" ) . 'px',
						$pos
					);
				}
			}
			// color.
			$this->set_css(
				$this->get_value( "${pos}ColorType" ),
				$this->get_value( "${pos}Color" ),
				$pos
			);
		}
	}

	/**
	 * 設定値取得.
	 *
	 * @param string $key     Key.
	 * @param mixed  $default Default.
	 *
	 * @return mixed|string
	 */
	private function get_value( $key, $default = '' ) {
		if ( ! isset( $this->option[ $key ] ) ) {
			return $default;
		}

		return $this->option[ $key ];
	}

	/**
	 * 単位を取得
	 *
	 * @param string $key Key.
	 *
	 * @return string
	 */
	private function get_unit( $key ) {
		return 'em' === $this->get_value( $key ) ? 'em' : 'px';
	}

	/**
	 * プリセットの内容を取得.
	 *
	 * @return array|mixed
	 */
	private function get_preset() {
		$select = $this->get_value( 'preset' );
		if ( ! isset( $this->preset[ $select ] ) ) {
			return [];
		}

		return $this->preset[ $select ];
	}

	/**
	 * 上下左右の配列
	 *
	 * @return array
	 */
	private function get_position_list() {
		return [ 'Top', 'Right', 'Left', 'Bottom' ];
	}

	/**
	 * CSSプロパティ名を取得
	 *
	 * @param string $name name.
	 *
	 * @return string
	 */
	private function get_css_property( $name ) {
		// できればサクッと変換したい.
		$list = [
			'alignSelf'         => 'align-self',
			'alignItems'        => 'align-items',
			'flexGrow'          => 'flex-grow',
			'minWidth'          => 'min-width',
			'maxWidth'          => 'max-width',
			'backgroundColor'   => 'background-color',
			'marginTop'         => 'margin-top',
			'marginRight'       => 'margin-right',
			'marginBottom'      => 'margin-bottom',
			'marginLeft'        => 'margin-left',
			'paddingTop'        => 'padding-top',
			'paddingRight'      => 'padding-right',
			'paddingBottom'     => 'padding-bottom',
			'paddingLeft'       => 'padding-left',
			'borderTop'         => 'border-top',
			'borderRight'       => 'border-right',
			'borderBottom'      => 'border-bottom',
			'borderLeft'        => 'border-left',
			'borderWidth'       => 'border-width',
			'borderTopWidth'    => 'border-top-width',
			'borderRightWidth'  => 'border-right-width',
			'borderBottomWidth' => 'border-bottom-width',
			'borderLeftWidth'   => 'border-left-width',
			'borderStyle'       => 'border-style',
			'borderTopStyle'    => 'border-top-style',
			'borderRightStyle'  => 'border-right-style',
			'borderBottomStyle' => 'border-bottom-style',
			'borderLeftStyle'   => 'border-left-style',
			'borderColor'       => 'border-color',
			'borderTopColor'    => 'border-top-color',
			'borderRightColor'  => 'border-right-color',
			'borderBottomColor' => 'border-bottom-color',
			'borderLeftColor'   => 'border-left-color',
			'borderRadius'      => 'border-radius',
			'lineHeight'        => 'line-height',
			'verticalAlign'     => 'vertical-align',
			'boxShadow'         => 'box-shadow',
			'iconSize'          => '',
			'zIndex'            => 'z-index',
		];
		if ( isset( $list[ $name ] ) ) {
			return $list[ $name ];
		}

		return $name;
	}

	/**
	 * CSSセット
	 *
	 * @param string $property property name.
	 * @param mixed  $value    value.
	 * @param string $section  section name.
	 */
	private function set_css( $property, $value, $section = 'content' ) {
		$this->css[ $section ][ $this->get_css_property( $property ) ] = $value;
	}

	/**
	 * CSSセット
	 *
	 * @param string $property property name.
	 * @param mixed  $value    value.
	 * @param string $section  section name.
	 */
	private function set_css_tablet( $property, $value, $section = 'content' ) {
		$this->css_tablet[ $section ][ $this->get_css_property( $property ) ] = $value;
	}

	/**
	 * CSSセット
	 *
	 * @param string $property property name.
	 * @param mixed  $value    value.
	 * @param string $section  section name.
	 */
	private function set_css_pc( $property, $value, $section = 'content' ) {
		$this->css_pc[ $section ][ $this->get_css_property( $property ) ] = $value;
	}

	/**
	 * ブロックエディターに渡す設定作成
	 */
	public function block_editor_option() {
		wp_localize_script(
			'ystandard-toolbox-styles',
			'ystdtbBlockEditorHeading',
			self::get_option()
		);

	}

	/**
	 * 設定取得
	 *
	 * @return array
	 */
	public static function get_option() {
		$option = get_option( self::OPTION_NAME, null );

		return is_array( $option ) ? stripslashes_deep( $option ) : [];
	}

	/**
	 * 設定削除
	 *
	 * @return void
	 */
	public static function delete_option() {
		delete_option( self::OPTION_NAME );
	}

}

new Heading_Compatible();
