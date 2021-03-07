<?php
/**
 * モバイルナビゲーション
 *
 * @package ystandard-toolbox
 * @author  yosiakatsuki
 * @license GPL-2.0+
 */

namespace ystandard_toolbox;

defined( 'ABSPATH' ) || die();

/**
 * Class Mobile_Nav
 *
 * @package ystandard_toolbox
 */
class Mobile_Nav {

	/**
	 * Mobile_Nav constructor.
	 */
	public function __construct() {
		if ( ! Option::get_option_by_bool( Navigation::OPTION_NAME, 'mobileMenuEnable', false ) ) {
			return;
		}
		add_action( 'widgets_init', [ $this, 'widget_init' ], 11 );
		add_action( 'ys_before_global_nav_menu', [ $this, 'mobile_nav_menu_top' ] );
		add_action( 'ys_after_global_nav_menu', [ $this, 'mobile_nav_menu_bottom' ] );
		add_filter( 'ys_get_inline_css', [ $this, 'mobile_nav_styles' ] );
	}

	/**
	 * モバイルメニューウィジェット追加
	 */
	public function widget_init() {
		register_sidebar(
			[
				'name'          => 'モバイルメニュー(上)',
				'id'            => 'mobile-nav-top',
				'description'   => 'モバイルメニュー内に表示されるウィジェット(上側)',
				'before_widget' => '<div id="%1$s" class="widget %2$s">',
				'after_widget'  => '</div>',
				'before_title'  => '<h2 class="widget-title">',
				'after_title'   => '</h2>',
			]
		);
		register_sidebar(
			[
				'name'          => 'モバイルメニュー(下)',
				'id'            => 'mobile-nav-bottom',
				'description'   => 'モバイルメニュー内に表示されるウィジェット（下側）',
				'before_widget' => '<div id="%1$s" class="widget %2$s">',
				'after_widget'  => '</div>',
				'before_title'  => '<h2 class="widget-title">',
				'after_title'   => '</h2>',
			]
		);
	}

	/**
	 * モバイルナビゲーション上
	 */
	public function mobile_nav_menu_top() {
		if ( is_active_sidebar( 'mobile-nav-top' ) ) {
			echo '<div class="widget-mobile-nav widget-mobile-nav__top">';
			dynamic_sidebar( 'mobile-nav-top' );
			echo '</div>';
		}
	}

	/**
	 * モバイルナビゲーション下
	 */
	public function mobile_nav_menu_bottom() {
		if ( is_active_sidebar( 'mobile-nav-bottom' ) ) {
			echo '<div class="widget-mobile-nav widget-mobile-nav__bottom">';
			dynamic_sidebar( 'mobile-nav-bottom' );
			echo '</div>';
		}
	}

	/**
	 * モバイルメニュー用CSS追加
	 *
	 * @param string $css CSS.
	 *
	 * @return string
	 */
	public function mobile_nav_styles( $css ) {

		$expand = 769;
		$close  = $expand - 1;

		$style = "
		.widget-mobile-nav {
		  margin-bottom:1.5em;
		}
		.widget-mobile-nav > * {
		  margin-top:1.5em;
		}
		.widget-mobile-nav > *:first-child {
		  margin-top:0;
		}
		.ystdtb .widget-mobile-nav .alignfull {
		  margin-right:-2.5em;
		  margin-left:-2.5em;
		  padding-right: 2.5em;
          padding-left: 2.5em;
		}
		@media (min-width: ${expand}px) {
			.widget-mobile-nav {
				display:none;
			}
		}
		";

		if ( Option::get_option_by_bool( Navigation::OPTION_NAME, 'mobileMenuHideGlobalMenu', false ) ) {
			$style .= "
			@media (max-width: ${close}px) {
				.global-nav__menu {
					display:none;
				}
			}
			";
		}
		if ( Option::get_option_by_bool( Navigation::OPTION_NAME, 'mobileMenuHideSearch', false ) ) {
			$style .= "
			@media (max-width: ${close}px) {
				.global-nav__search {
					display:none;
				}
			}
			";
		}

		return $css . $style;
	}

}

new Mobile_Nav();

