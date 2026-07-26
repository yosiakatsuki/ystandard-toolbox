<?php
/**
 * インラインフォーマット：レスポンシブ改行
 *
 * @package ystandard-toolbox
 * @author  yosiakatsuki
 * @license GPL-2.0+
 */

namespace ystandard_toolbox;

use ystandard_toolbox\Util\Styles;
use ystandard_toolbox\Util\Text;

defined( 'ABSPATH' ) || die();

/**
 * Class Format_Responsive_Br.
 *
 * 画面サイズ別の改行を提供するクラス.
 *
 * @package ystandard_toolbox
 */
class Format_Responsive_Br {

	/**
	 * Instance.
	 *
	 * @var Format_Responsive_Br
	 */
	private static $instance;

	/**
	 * スタイルのハンドル名
	 */
	const STYLE_HANDLE = 'ystdtb-format-responsive-br-style';

	/**
	 * Constructor.
	 */
	private function __construct() {
		add_action( 'init', [ $this, 'register_block' ], 100 );
		add_action( 'wp_enqueue_scripts', [ $this, 'add_style' ] );
	}

	/**
	 * Instance.
	 *
	 * @return Format_Responsive_Br
	 */
	public static function get_instance() {
		if ( ! isset( self::$instance ) ) {
			self::$instance = new self();
		}

		return self::$instance;
	}

	/**
	 * レスポンシブ改行用スタイル追加
	 *
	 * エディター側では改行を常に表示するため、フロントのみで読み込む.
	 *
	 * @return void
	 */
	public function add_style() {
		// 既定では改行しない.
		$css = '.ystdtb-br--mobile > br,.ystdtb-br--tablet > br,.ystdtb-br--desktop > br {display: none;}';
		// 対象の画面サイズのみ改行する.
		$css .= Styles::add_media_query_only_mobile(
			'.ystdtb-br--mobile > br {display: inline;}'
		);
		$css .= Styles::add_media_query_only_tablet(
			'.ystdtb-br--tablet > br {display: inline;}'
		);
		$css .= Styles::add_media_query_over_desktop(
			'.ystdtb-br--desktop > br {display: inline;}'
		);

		wp_register_style( self::STYLE_HANDLE, false );
		wp_enqueue_style( self::STYLE_HANDLE );
		wp_add_inline_style( self::STYLE_HANDLE, Text::minify( $css ) );
	}

	/**
	 * ブロック登録
	 *
	 * エディター用アセットを読み込むためにブロックとして登録する.
	 * ブロック自体はエディター側で registerBlockType しないためインサーターには表示されない.
	 *
	 * @return void
	 */
	public function register_block() {
		register_block_type( __DIR__ );
	}
}

Format_Responsive_Br::get_instance();
