<?php
/**
 * Web Font Menu
 *
 * @package ystandard-toolbox
 * @author  yosiakatsuki
 * @license GPL-2.0+
 */

namespace ystandard_toolbox\menu;

use ystandard_toolbox\Font;
use ystandard_toolbox\Option;

defined( 'ABSPATH' ) || die();

/**
 * Class Font
 *
 * @package ystandard_toolbox\menu
 */
class Menu_Font extends Menu_Page_Base {

	/**
	 * Code constructor.
	 */
	public function __construct() {
		parent::__construct();
		$this->menu_slug              = 'font';
		$this->menu_title             = 'Webフォント設定';
		$this->menu_label             = 'Webフォント設定';
		$this->template_name          = 'font';
		$this->ystandard_only         = true;
		$this->need_ystandard_version = '4.8.0';
		$this->codemirror_type        = 'text/html';
		$this->codemirror_style       = 'height:6rem;';
		$this->enqueue_codemirror();
	}

	/**
	 * 設定保存
	 *
	 * @param array $_post 設定値.
	 */
	public function save( $_post ) {
		if ( ! isset( $_post[ Font::OPTION_NAME ] ) ) {
			return false;
		}
		$input           = $_post[ Font::OPTION_NAME ];
		$input['html']   = $this->sanitize_code( $input['html'] );
		$input['family'] = $this->sanitize_code( $input['family'] );

		return Option::update_plugin_option( Font::OPTION_NAME, $input );
	}

	/**
	 * 入力値のサニタイズ
	 *
	 * @param string $text Text.
	 *
	 * @return string
	 */
	private function sanitize_code( $text ) {
		$text = trim( $text );

		return $text;
	}

}

new Menu_Font();
