<?php
/**
 * @package ystandard-toolbox
 * @author  yosiakatsuki
 * @license GPL-2.0+
 */

namespace ystandard_toolbox;

defined( 'ABSPATH' ) || die();

/**
 * Class Code
 *
 * @package ystandard_toolbox
 */
class Code {

	/**
	 * 設定名
	 */
	const OPTION_NAME = 'ystdtb_code';

	/**
	 * Code constructor.
	 */
	public function __construct() {
		add_action( 'wp_head', [ $this, 'add_head' ] );
		add_action( 'wp_body_open', [ $this, 'add_body_open' ] );
		add_action( 'wp_footer', [ $this, 'add_footer' ] );
	}

	/**
	 * Headに追加
	 */
	public function add_head() {
		$this->echo_code( 'head', 'head_amp' );
	}

	/*
	 * Body開始位置に追加
	 */
	public function add_body_open() {
		$this->echo_code( 'body_open', 'body_open_amp' );
	}

	/*
	 * Body終了位置に追加
	 */
	public function add_footer() {
		$this->echo_code( 'body_close', 'body_close_amp' );
	}

	/**
	 * コード出力
	 *
	 * @param string $option     Option Name.
	 * @param string $option_amp Option Name(AMP).
	 */
	private function echo_code( $option, $option_amp ) {
		$normal = self::get_option( $option );
		$amp    = self::get_option( $option_amp );
		$code   = Utility::is_amp() ? $amp : $normal;
		if ( ! empty( trim( $code ) ) ) {
			echo trim( $code ) . PHP_EOL;
		}
	}

	/**
	 * 設定取得
	 *
	 * @param string $name 設定名.
	 *
	 * @return string
	 */
	public static function get_option( $name ) {
		$option = get_option( self::OPTION_NAME, null );
		if ( ! is_array( $option ) ) {
			return '';
		}
		if ( ! isset( $option[ $name ] ) ) {
			return '';
		}

		return wp_unslash( $option[ $name ] );
	}


}

new Code();
