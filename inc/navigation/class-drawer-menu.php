<?php
/**
 * ドロワーメニュー
 *
 * @package ystandard-toolbox
 * @author  yosiakatsuki
 * @license GPL-2.0+
 */

namespace ystandard_toolbox;

use ystandard_toolbox\Util\Version;

defined( 'ABSPATH' ) || die();

/**
 * Class Drawer_Menu
 *
 * @package ystandard_toolbox
 */
class Drawer_Menu {

	/**
	 * ドロワーナビ専用フックに対応するyStandardの最低バージョン.
	 */
	const YSTANDARD_DRAWER_NAV_HOOK_MIN_VERSION = '5.0.0-alpha-1';

	/**
	 * Mobile_Nav constructor.
	 */
	public function __construct() {
		// 機能が無効な場合はウィジェットと表示処理を登録しない.
		if ( ! Option::get_option_by_bool( Navigation::OPTION_NAME, 'mobileMenuEnable', false ) ) {
			return;
		}
		$menu_hooks = $this->get_menu_hooks();
		add_action( 'widgets_init', [ $this, 'widget_init' ], 11 );
		add_action( $menu_hooks['before'], [ $this, 'drawer_menu_top' ] );
		add_action( $menu_hooks['after'], [ $this, 'drawer_menu_bottom' ] );
		add_filter( 'ys_get_inline_css', [ $this, 'inline_css' ], 100 );
		// V5ではドロワー専用HTMLを生成前に止めるため専用フィルターを登録する.
		if ( $this->is_ystandard_v5() ) {
			$this->register_v5_visibility_hooks();
		}
	}

	/**
	 * yStandard V5以降か判定する.
	 *
	 * @return bool 判定結果.
	 */
	private function is_ystandard_v5() {
		return (bool) Version::ystandard_version_compare( self::YSTANDARD_DRAWER_NAV_HOOK_MIN_VERSION );
	}

	/**
	 * yStandardのバージョンに対応するメニューフックを取得する.
	 *
	 * @return array メニュー前後のフック名.
	 */
	private function get_menu_hooks() {
		// V5ではグローバルナビとドロワーナビが分離されているため専用フックを使用する.
		if ( $this->is_ystandard_v5() ) {
			return [
				'before' => 'ys_before_drawer_nav_menu',
				'after'  => 'ys_after_drawer_nav_menu',
			];
		}

		// V4にはドロワーナビ専用フックがないため従来の共通フックを維持する.
		return [
			'before' => 'ys_before_global_nav_menu',
			'after'  => 'ys_after_global_nav_menu',
		];
	}

	/**
	 * yStandard V5用の表示制御フックを登録する.
	 */
	private function register_v5_visibility_hooks() {
		// ドロワー内のメニューだけを生成前に除外し、ヘッダー側のメニューは維持する.
		if ( Option::get_option_by_bool( Navigation::OPTION_NAME, 'mobileMenuHideGlobalMenu', false ) ) {
			add_filter( 'pre_wp_nav_menu', [ $this, 'hide_drawer_nav_menu' ], 10, 2 );
		}
		// yStandard側が検索フォームの出力処理を登録する前にフック名を無効化する.
		if ( Option::get_option_by_bool( Navigation::OPTION_NAME, 'mobileMenuHideSearch', false ) ) {
			add_filter( 'ys_drawer_menu_search_form_hook', [ $this, 'hide_drawer_search_form' ] );
		}
	}

	/**
	 * yStandard V5のドロワーメニューHTML生成を停止する.
	 *
	 * @param string|null $output メニューHTML.
	 * @param \stdClass   $args   メニュー引数.
	 *
	 * @return string|null メニューHTML.
	 */
	public function hide_drawer_nav_menu( $output, $args ) {
		// ドロワー内のメニューだけを除外し、同じロケーションのヘッダーメニューは残す.
		if ( isset( $args->menu_id ) && 'drawer-nav__menu' === $args->menu_id ) {
			return '';
		}

		return $output;
	}

	/**
	 * yStandard V5のドロワー検索フォーム用フックを無効化する.
	 *
	 * @param string $hook_name 検索フォーム出力先フック.
	 *
	 * @return false
	 */
	public function hide_drawer_search_form( $hook_name ) {
		return false;
	}

	/**
	 * ドロワーメニューウィジェット追加
	 */
	public function widget_init() {
		register_sidebar(
			[
				'name'          => 'ドロワーメニュー(上)',
				'id'            => 'mobile-nav-top',
				'description'   => 'ドロワーメニュー内に表示されるウィジェット(上側)',
				'before_widget' => '<div id="%1$s" class="widget %2$s">',
				'after_widget'  => '</div>',
				'before_title'  => '<h2 class="widget-title">',
				'after_title'   => '</h2>',
			]
		);
		register_sidebar(
			[
				'name'          => 'ドロワーメニュー(下)',
				'id'            => 'mobile-nav-bottom',
				'description'   => 'ドロワーメニュー内に表示されるウィジェット（下側）',
				'before_widget' => '<div id="%1$s" class="widget %2$s">',
				'after_widget'  => '</div>',
				'before_title'  => '<h2 class="widget-title">',
				'after_title'   => '</h2>',
			]
		);
	}

	/**
	 * ドロワーメニュー上
	 */
	public function drawer_menu_top() {
		if ( is_active_sidebar( 'mobile-nav-top' ) ) {
			echo '<div class="widget-mobile-nav widget-mobile-nav__top">';
			dynamic_sidebar( 'mobile-nav-top' );
			echo '</div>';
		}
	}

	/**
	 * ドロワーメニュー下
	 */
	public function drawer_menu_bottom() {
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
	public function inline_css( $css ) {

		$close  = Navigation::get_drawer_menu_start();
		$expand = $close + 1;

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
		@media (min-width: {$expand}px) {
			.widget-mobile-nav {
				display:none;
			}
		}
		";

		// V4ではデスクトップと共通のHTMLを使うためモバイル表示だけCSSで隠す.
		if ( ! $this->is_ystandard_v5() && Option::get_option_by_bool( Navigation::OPTION_NAME, 'mobileMenuHideGlobalMenu', false ) ) {
			$style .= "
			@media (max-width: {$close}px) {
				.global-nav__menu:not(#global-nav__menu-amp) {
					display:none;
				}
			}
			";
		}
		// V4では検索フォームも共通HTMLのためモバイル表示だけCSSで隠す.
		if ( ! $this->is_ystandard_v5() && Option::get_option_by_bool( Navigation::OPTION_NAME, 'mobileMenuHideSearch', false ) ) {
			$style .= "
			@media (max-width: {$close}px) {
				.global-nav__search {
					display:none;
				}
			}
			";
		}

		return $css . $style;
	}

}

new Drawer_Menu();
