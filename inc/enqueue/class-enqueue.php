<?php
/**
 * Enqueue
 *
 * @package ystandard-toolbox
 * @author  yosiakatsuki
 * @license GPL-2.0+
 */

namespace ystandard_toolbox;

defined( 'ABSPATH' ) || die();

/**
 * Class Enqueue
 *
 * @package ystandard_toolbox
 */
class Enqueue {


	/**
	 * Enqueue constructor.
	 */
	public function __construct() {
		add_action( 'wp_enqueue_scripts', [ $this, 'enqueue_css' ], 11 );
		add_action( 'admin_enqueue_scripts', [ $this, 'admin_enqueue_scripts' ], 50 );
		if ( ! Utility::ystandard_blocks_version_compare() ) {
			add_action( Config::AFTER_ENQUEUE_CSS_HOOK, [ $this, 'enqueue_block_style' ], 11 );
		}
	}

	/**
	 * Enqueue Styles
	 */
	public function enqueue_css() {
		wp_enqueue_style(
			Config::CSS_HANDLE,
			self::get_css_uri(),
			[],
			filemtime( YSTDTB_PATH . '/css/ystandard-toolbox.css' )
		);
		do_action( Config::AFTER_ENQUEUE_CSS_HOOK );
	}

	/**
	 * CSS URL取得
	 *
	 * @return string
	 */
	public static function get_css_uri() {
		return YSTDTB_URL . '/css/ystandard-toolbox.css';
	}

	/**
	 * 管理画面-スクリプトの読み込み
	 *
	 * @param string $hook_suffix suffix.
	 *
	 * @return void
	 */
	public function admin_enqueue_scripts( $hook_suffix ) {
		wp_enqueue_style(
			'ystdtb-admin-all',
			YSTDTB_URL . '/css/ystandard-toolbox-admin-all.css',
			[],
			filemtime( YSTDTB_PATH . '/css/ystandard-toolbox-admin-all.css' )
		);
	}

	/**
	 * ブロック用CSS出力
	 */
	public function enqueue_block_style() {
		wp_add_inline_style(
			Config::CSS_HANDLE,
			self::get_color_palette_css()
		);
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
			 * Border-color
			 */
			$class_name = "has-{$value['slug']}-border-color";
			/**
			 * 結合
			 */
			$css .= "${prefix} .${class_name},
				${prefix} .has-border.${class_name}{
				border-color:${value['color']};
			}";
		}

		return Utility::minify( $css );
	}
}

new Enqueue();
