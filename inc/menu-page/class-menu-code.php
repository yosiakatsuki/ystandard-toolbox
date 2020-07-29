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
		$this->codemirror_type  = 'text/html';
		$this->enqueue_codemirror();
	}

	/**
	 * 設定保存
	 *
	 * @param array $_post 設定値.
	 */
	public function save( $_post ) {
		if ( ! isset( $_post[ Code::OPTION_NAME ] ) ) {
			return false;
		}
		$input               = $_post[ Code::OPTION_NAME ];
		$input['head']       = isset( $input['head'] ) ? $this->sanitize_input( $input['head'] ) : '';
		$input['body_open']  = isset( $input['body_open'] ) ? $this->sanitize_input( $input['body_open'] ) : '';
		$input['body_close'] = isset( $input['body_close'] ) ? $this->sanitize_input( $input['body_close'] ) : '';
		// AMP.
		$input['head_amp']       = isset( $input['head_amp'] ) ? $this->sanitize_input( $input['head_amp'] ) : '';
		$input['body_open_amp']  = isset( $input['body_open_amp'] ) ? $this->sanitize_input( $input['body_open_amp'] ) : '';
		$input['body_close_amp'] = isset( $input['body_close_amp'] ) ? $this->sanitize_input( $input['body_close_amp'] ) : '';

		return update_option( Code::OPTION_NAME, $input );
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
