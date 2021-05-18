<?php
/**
 * Icon Font.
 *
 * @package ystandard-toolbox
 * @author  yosiakatsuki
 * @license GPL-2.0+
 */

namespace ystandard_toolbox;

defined( 'ABSPATH' ) || die();

/**
 * Class Icon_Font
 *
 * @package ystandard_toolbox
 */
class Icon_Font {

	/**
	 * プラグインで使用するアイコンフォントのfont family
	 */
	const YS_FONT_FAMILY = 'ys-icon-font';

	/**
	 * Font constructor.
	 */
	public function __construct() {
		if ( ! Utility::ystandard_version_compare() ) {
			return;
		}
		add_filter( 'ys_get_inline_css', [ $this, 'add_ys_icon_font' ], 1 );
		add_filter( 'ys_get_inline_css', [ $this, 'add_icon_font_color' ] );
		add_action( 'enqueue_block_editor_assets', [ $this, 'add_ys_icon_font_editor' ] );
	}

	/**
	 * プラグイン(yStandard Toolbox)で使用するアイコンフォントの追加
	 *
	 * @param string $css CSS.
	 *
	 * @return string
	 */
	public function add_ys_icon_font( $css ) {

		return $this->get_font_face() . $css;
	}

	/**
	 * アイコンフォント用色指定CSSの追加
	 *
	 * @param string $css CSS.
	 *
	 * @return string
	 */
	public function add_icon_font_color( $css ) {

		$color = '';
		if ( ! apply_filters( 'ys_enqueue_color_palette', false ) ) {
			$color = self::get_color_palette_css();
			add_filter( 'ys_enqueue_color_palette', '__return_true' );
		}

		return $css . $color;
	}

	/**
	 * ブロックエディターにアイコンフォントCSSを追加
	 */
	public function add_ys_icon_font_editor() {
		wp_add_inline_style(
			Config::BLOCK_CSS_HANDLE,
			$this->get_font_face()
		);
	}

	/**
	 * プラグイン(yStandard Toolbox)で使用するアイコンフォントのCSS取得
	 *
	 * @return string
	 */
	private function get_font_face() {
		$font_family = self::YS_FONT_FAMILY;
		$font_url    = YSTDTB_URL . '/assets/icon-fonts/ys-icon-font';

		return "
		@font-face {
		  font-family: '${font_family}';
		  src:
		    url('${font_url}/${font_family}.ttf?subg4m') format('truetype'),
		    url('${font_url}/${font_family}.woff?subg4m') format('woff'),
		    url('${font_url}/${font_family}.svg?subg4m#${font_family}') format('svg');
		  font-weight: normal;
		  font-style: normal;
		  font-display: block;
		}";
	}

	/**
	 * カラーパレットCSS
	 *
	 * @param string $prefix プレフィックス.
	 *
	 * @return string
	 */
	public static function get_color_palette_css( $prefix = '' ) {
		$palette = get_theme_support( 'editor-color-palette' );
		if ( empty( $palette ) ) {
			return '';
		}
		$css = '';
		foreach ( $palette[0] as $value ) {
			/**
			 * icon-color
			 */
			$class_name = "has-{$value['slug']}-icon-font-color";
			/**
			 * 結合
			 */
			$css .= "${prefix} .${class_name},
				${prefix} .has-icon-font-color.${class_name}{
				--icon-font-color:${value['color']};
			}";
		}

		return Utility::minify( $css );
	}
}

new Icon_Font();
