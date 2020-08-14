<?php
/**
 * @package ystandard-toolbox
 * @author  yosiakatsuki
 * @license GPL-2.0+
 */

namespace ystandard_toolbox\menu;

use ystandard_toolbox\Copyright;
use ystandard_toolbox\Menu_Page;
use ystandard_toolbox\Option;
use ystandard_toolbox\Utility;

defined( 'ABSPATH' ) || die();

/**
 * Class Menu_Copyright
 *
 * @package ystandard_toolbox\menu
 */
class Menu_Copyright extends Menu_Page_Base {

	/**
	 * Code constructor.
	 */
	public function __construct() {
		parent::__construct();
		$this->menu_slug        = 'copyright';
		$this->menu_title       = 'Copyright編集';
		$this->menu_label       = 'Copyright編集';
		$this->template_name    = 'copyright';
		$this->codemirror_type  = 'text/html';
		$this->codemirror_style = 'height:6rem;';
		$this->enqueue_codemirror();
	}

	/**
	 * 設定保存
	 *
	 * @param array $_post 設定値.
	 */
	public function save( $_post ) {
		if ( ! isset( $_post[ Copyright::OPTION_NAME ] ) ) {
			return false;
		}
		$input                       = $_post[ Copyright::OPTION_NAME ];
		$input['copyright']          = isset( $input['copyright'] ) ? $this->sanitize_copyright( $input['copyright'] ) : '';
		$input['disable_theme_info'] = isset( $input['disable_theme_info'] ) ? Utility::to_bool( $input['disable_theme_info'] ) : false;

		return Option::update_option( Copyright::OPTION_NAME, $input );
	}

	/**
	 * 入力値のサニタイズ
	 *
	 * @param string $text Text.
	 *
	 * @return string
	 */
	private function sanitize_copyright( $text ) {
		$allowed_html     = wp_kses_allowed_html( 'post' );
		$new_allowed_html = [];
		if ( isset( $allowed_html['a'] ) ) {
			$new_allowed_html['a'] = $allowed_html['a'];
		}
		if ( isset( $allowed_html['span'] ) ) {
			$new_allowed_html['span'] = $allowed_html['span'];
		}
		if ( isset( $allowed_html['br'] ) ) {
			$new_allowed_html['br'] = $allowed_html['br'];
		}
		if ( isset( $allowed_html['strong'] ) ) {
			$new_allowed_html['strong'] = $allowed_html['strong'];
		}

		$text = wp_kses( $text, $new_allowed_html );

		return $text;
	}

}

new Menu_Copyright();
