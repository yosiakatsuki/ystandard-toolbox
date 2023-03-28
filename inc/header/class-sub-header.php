<?php
/**
 * Sub Header.
 *
 * @package ystandard-toolbox
 * @author  yosiakatsuki
 * @license GPL-2.0+
 */

namespace ystandard_toolbox;

use ystandard_toolbox\helper\Styles;
use ystandard_toolbox\helper\Version_Compare;

defined( 'ABSPATH' ) || die();

/**
 * Class Sub_Header
 *
 * @package ystandard_toolbox
 */
class Sub_Header {

	/**
	 * Sub_Header constructor.
	 */
	public function __construct() {
		if ( ! Version_Compare::ystandard_version_compare( '4.11.0' ) ) {
			return;
		}
		add_action( 'after_setup_theme', [ $this, 'add_menu' ], 11 );
		add_action( 'ys_site_header_prepend', [ $this, 'sub_header_top' ] );
		add_action( 'ys_global_nav_append', [ $this, 'sub_header_mobile' ] );
		add_filter( 'nav_menu_item_title', 'do_shortcode' );
		add_filter( Config::AFTER_ENQUEUE_CSS_HOOK, [ $this, 'enqueue_css' ] );
	}

	/**
	 * CSS
	 */
	public function enqueue_css() {
		// 設定.
		$bg        = Header_Design::get_option( 'subHeaderBackgroundColorDesktop', '#f1f1f3' );
		$color     = Header_Design::get_option( 'subHeaderColorDesktop', '#666666' );
		$align     = Header_Design::get_option( 'subHeaderAlignDesktop', 'right' );
		$font_size = self::get_font_size();

		$menu_align = 'flex-end';
		if ( 'center' === $align ) {
			$menu_align = 'center';
		}
		if ( 'left' === $align ) {
			$menu_align = 'flex-start';
		}

		$css = '';
		// CSS.
		$css .= ".sub-header.is-top{background-color:${bg};color:${color};}";
		$css .= ".sub-header__nav{justify-content:${menu_align};font-size:${font_size};}";

		wp_add_inline_style(
			Config::CSS_HANDLE,
			Utility::minify( Styles::add_media_query( $css, 'tablet' ) )
		);
	}

	/**
	 * フォントサイズ設定取得
	 *
	 * @return string
	 */
	public static function get_font_size() {
		$font_size = Header_Design::get_option( 'subHeaderFontSize' );
		/**
		 * Deprecated v1.24.0.
		 */
		$size = Header_Design::get_option( 'subHeaderFontSizeDesktop', 0.7 );
		$unit = Header_Design::get_option( 'subHeaderFontSizeUnitDesktop', 'em' );

		if ( is_null( $font_size ) ) {
			return "${size}${unit}";
		}

		return $font_size;
	}

	/**
	 * メニュー追加
	 */
	public function add_menu() {
		register_nav_menus(
			[
				'sub-header' => 'サブヘッダー',
			]
		);
	}

	/**
	 * サブヘッダー
	 */
	public function sub_header_top() {
		if ( ! has_nav_menu( 'sub-header' ) ) {
			return;
		}
		?>
		<div class="sub-header is-top">
			<div class="container">
				<?php
				wp_nav_menu(
					[
						'theme_location' => 'sub-header',
						'menu_class'     => 'sub-header__nav',
						'container'      => false,
						'fallback_cb'    => '',
						'depth'          => 1,
					]
				);
				?>
			</div>
		</div>
		<?php
	}

	/**
	 * サブヘッダー
	 */
	public function sub_header_mobile() {
		if ( ! has_nav_menu( 'sub-header' ) ) {
			return;
		}
		?>
		<div class="sub-header is-mobile">
			<?php
			wp_nav_menu(
				[
					'theme_location' => 'sub-header',
					'menu_class'     => 'sub-header__nav',
					'container'      => false,
					'fallback_cb'    => '',
					'depth'          => 1,
				]
			);
			?>
		</div>
		<?php
	}
}

new Sub_Header();
