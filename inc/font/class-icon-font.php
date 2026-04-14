<?php
/**
 * Icon Font.
 *
 * @package ystandard-toolbox
 * @author  yosiakatsuki
 * @license GPL-2.0+
 */

namespace ystandard_toolbox;

use ystandard_toolbox\Util\Text;
use ystandard_toolbox\Util\Version;

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
		// エディター向けCSSはテーマ非依存で常に登録.
		add_action( 'enqueue_block_assets', [ $this, 'add_ys_icon_font_editor' ] );

		if ( Version::ystandard_version_compare() ) {
			// yStandard: 既存のインラインCSSフックに乗せる.
			add_filter( 'ys_get_inline_css', [ $this, 'add_ys_icon_font' ], 1 );
			add_filter( 'ys_get_inline_css', [ $this, 'add_icon_font_color' ] );
		} else {
			// 非yStandard: wp_enqueue_scripts で個別スタイルとして登録.
			add_action( 'wp_enqueue_scripts', [ $this, 'enqueue_icon_font_style' ], 11 );
		}
	}

	/**
	 * 非yStandard環境用のアイコンフォントCSS出力
	 */
	public function enqueue_icon_font_style() {
		$css = $this->get_font_face() . self::get_color_palette_css();
		wp_register_style( 'ystdtb-icon-font', false );
		wp_enqueue_style( 'ystdtb-icon-font' );
		wp_add_inline_style( 'ystdtb-icon-font', Text::minify( $css ) );
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
		if ( ! is_admin() ) {
			return;
		}
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
		  font-family: '{$font_family}';
		  src:
		    url('{$font_url}/{$font_family}.ttf?subg4m') format('truetype'),
		    url('{$font_url}/{$font_family}.woff?subg4m') format('woff'),
		    url('{$font_url}/{$font_family}.svg?subg4m#{$font_family}') format('svg');
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
		$palette_settings = wp_get_global_settings( [ 'color', 'palette' ] );
		// theme.json の color.defaultPalette 設定を尊重（デフォルト true）.
		$use_default = false !== wp_get_global_settings( [ 'color', 'defaultPalette' ] );
		$origins     = $use_default
			? [ 'default', 'theme', 'custom' ]
			: [ 'theme', 'custom' ];
		$colors      = [];
		foreach ( $origins as $origin ) {
			if ( ! empty( $palette_settings[ $origin ] ) && is_array( $palette_settings[ $origin ] ) ) {
				$colors = array_merge( $colors, $palette_settings[ $origin ] );
			}
		}
		// slug 重複は後勝ち（custom > theme > default の順に上書き）.
		$unique = [];
		foreach ( $colors as $color ) {
			if ( ! empty( $color['slug'] ) ) {
				$unique[ $color['slug'] ] = $color;
			}
		}
		if ( empty( $unique ) ) {
			return '';
		}
		$css = '';
		foreach ( $unique as $value ) {
			/**
			 * Class : icon-font-color.
			 */
			$class_name = "has-{$value['slug']}-icon-font-color";
			/**
			 * 結合
			 */
			$css .= "{$prefix} .{$class_name},
				{$prefix} .has-icon-font-color.{$class_name}{
				--icon-font-color:{$value['color']};
			}";
		}

		return Text::minify( $css );
	}
}

new Icon_Font();
