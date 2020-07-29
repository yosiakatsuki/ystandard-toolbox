<?php
/**
 * @package ystandard-toolbox
 * @author  yosiakatsuki
 * @license GPL-2.0+
 */

namespace ystandard_toolbox\menu;

defined( 'ABSPATH' ) || die();

/**
 * Class Custom CSS
 *
 * @package ystandard_toolbox\menu
 */
class Menu_Custom_CSS extends Menu_Page_Base {

	/**
	 * Code constructor.
	 */
	public function __construct() {
		parent::__construct();
		$this->menu_slug        = 'css';
		$this->menu_title       = '追加CSS編集（大）';
		$this->menu_label       = '追加CSS編集（大）';
		$this->template_name    = 'css';
		$this->codemirror_type  = 'text/css';
		$this->codemirror_style = 'height:500px;min-height:60vh;';
		$this->enqueue_codemirror();
	}

	public static function get_custom_css() {
		if ( empty( $stylesheet ) ) {
			$stylesheet = get_stylesheet();
		}

		$post = wp_get_custom_css_post( $stylesheet );
		if ( $post ) {
			return $post->post_content;
		}

		return '';
	}

	/**
	 * 設定保存
	 *
	 * @param array $_post 設定値.
	 */
	public function save( $_post ) {
		if ( ! isset( $_post['custom-css'] ) ) {
			return false;
		}

		return ! is_wp_error( wp_update_custom_css_post( $_post['custom-css'] ) );
	}
}

new Menu_Custom_CSS();
