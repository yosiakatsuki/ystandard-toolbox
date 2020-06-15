<?php
/**
 * @package ystandard-toolbox
 * @author  yosiakatsuki
 * @license GPL-2.0+
 */

namespace ystandard_toolbox\menu;

use ystandard_toolbox\Code;
use ystandard_toolbox\Menu_Page;

defined( 'ABSPATH' ) || die();

/**
 * Class Code
 *
 * @package ystandard_toolbox\menu
 */
class Menu_Code extends Menu_Page_Base {

	/**
	 * Code constructor.
	 */
	public function __construct() {
		parent::__construct();
		$this->menu_slug     = 'code';
		$this->menu_title    = 'head,footer コード追加';
		$this->menu_label    = 'コード追加';
		$this->template_name = 'code';

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
			'.CodeMirror {border: 1px solid #ddd;}'
		);
	}

	/**
	 * 設定保存
	 *
	 * @param array $_post 設定値.
	 */
	public function save( $_post ) {
		if ( ! isset( $_post[ Code::OPTION_NAME ] ) ) {
			return;
		}
		$input               = $_post[ Code::OPTION_NAME ];
		$input['head']       = isset( $input['head'] ) ? $this->sanitize_input( $input['head'] ) : '';
		$input['body_open']  = isset( $input['body_open'] ) ? $this->sanitize_input( $input['body_open'] ) : '';
		$input['body_close'] = isset( $input['body_close'] ) ? $this->sanitize_input( $input['body_close'] ) : '';
		// AMP.
		$input['head_amp']       = isset( $input['head_amp'] ) ? $this->sanitize_input( $input['head_amp'] ) : '';
		$input['body_open_amp']  = isset( $input['body_open_amp'] ) ? $this->sanitize_input( $input['body_open_amp'] ) : '';
		$input['body_close_amp'] = isset( $input['body_close_amp'] ) ? $this->sanitize_input( $input['body_close_amp'] ) : '';

		update_option( Code::OPTION_NAME, $input );
	}

	/**
	 * 入力値のサニタイズ
	 *
	 * @param string $text Text.
	 *
	 * @return string
	 */
	private function sanitize_input( $text ) {
		$text = trim( $text );

		return $text;
	}

}

new Menu_Code();
