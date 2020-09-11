<?php
/**
 * Sub Header.
 *
 * @package ystandard-toolbox
 * @author  yosiakatsuki
 * @license GPL-2.0+
 */

namespace ystandard_toolbox;

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
		if ( ! Utility::ystandard_version_compare( '4.11.0' ) ) {
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
		$bg    = Option::get_option( Header_Design::OPTION_NAME, 'subHeaderBackgroundColorDesktop', '#f1f1f3' );
		$color = Option::get_option( Header_Design::OPTION_NAME, 'subHeaderColorDesktop', '#666666' );
		$align = Option::get_option( Header_Design::OPTION_NAME, 'subHeaderAlignDesktop', 'right' );
		$size  = Option::get_option( Header_Design::OPTION_NAME, 'subHeaderFontSizeDesktop', 0.7 );
		$unit  = Option::get_option( Header_Design::OPTION_NAME, 'subHeaderFontSizeUnitDesktop', 'em' );

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
		$css .= ".sub-header__nav{justify-content:${menu_align};font-size:${size}${unit};}";

		wp_add_inline_style(
			Config::CSS_HANDLE,
			Utility::minify( Utility::add_media_query( $css, 'lg' ) )
		);
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
