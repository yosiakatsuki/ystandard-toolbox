<?php
/**
 * @package ystandard-toolbox
 * @author  yosiakatsuki
 * @license GPL-2.0+
 */

namespace ystandard_toolbox\menu;

use ystandard_toolbox\Config;
use ystandard_toolbox\Menu_Page;
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
		$this->menu_slug     = 'font';
		$this->menu_title    = 'フォント指定の追加';
		$this->menu_label    = 'フォント指定の追加';
		$this->template_name = 'font';

		add_action( 'admin_enqueue_scripts', [ $this, 'codemirror_enqueue' ] );
	}

	/**
	 * 管理画面-スクリプトの読み込み
	 *
	 * @param string $hook_suffix suffix.
	 *
	 * @return void
	 */
	public function codemirror_enqueue( $hook_suffix ) {
		if ( false === strpos( $hook_suffix, Menu_Page::MENU_PAGE_PREFIX . $this->menu_slug ) ) {
			return;
		}
		$settings['codeEditor'] = wp_enqueue_code_editor( [ 'type' => 'text/html' ] );
		if ( false === $settings ) {
			return;
		}
		wp_localize_script( 'jquery', 'codeEditorSettings', $settings );
		wp_enqueue_script( 'wp-theme-plugin-editor' );
		wp_enqueue_style( 'wp-codemirror' );
		wp_add_inline_script(
			'wp-theme-plugin-editor',
			'jQuery(document).ready(function($) { 
				var input = $(\'.code-input\');
				$(\'.code-input\').each(function(index, element) {
					wp.codeEditor.initialize(element, codeEditorSettings );
				})
			})'
		);
		wp_add_inline_style(
			'wp-codemirror',
			'.CodeMirror {border: 1px solid #ddd;height:6rem;}'
		);
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

		return Option::update_option( Font::OPTION_NAME, $input );
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
