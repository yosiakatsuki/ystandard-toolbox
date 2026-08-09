<?php
/**
 * インラインフォーマット
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
 * Class Inline_Formats.
 *
 * yStandard Toolbox独自のインラインフォーマットを提供するクラス.
 *
 * @package ystandard_toolbox
 */
class Inline_Formats {

	/**
	 * Instance.
	 *
	 * @var Inline_Formats
	 */
	private static $instance;

	/**
	 * スタイルのハンドル名
	 */
	const STYLE_HANDLE = 'ystdtb-inline-formats-style';

	/**
	 * Constructor.
	 */
	private function __construct() {
		add_action( 'init', [ $this, 'register_block' ], 100 );
		// enqueue_block_assets はフロントとエディターキャンバス(iframe)の両方で実行される.
		add_action( 'enqueue_block_assets', [ $this, 'add_style' ] );
	}

	/**
	 * Instance.
	 *
	 * @return Inline_Formats
	 */
	public static function get_instance() {
		if ( ! isset( self::$instance ) ) {
			self::$instance = new self();
		}

		return self::$instance;
	}

	/**
	 * インラインフォーマット用スタイル追加
	 *
	 * エディターキャンバスはiframeのため、同じCSSを読み込むことで
	 * デバイスプレビューの幅に合わせて改行が切り替わる.
	 * フォーマットを追加する場合はここにCSSを追加する.
	 *
	 * @return void
	 */
	public function add_style() {
		$css = $this->get_responsive_br_css();
		if ( is_admin() ) {
			$css .= $this->get_responsive_br_editor_label_css();
		}

		if ( empty( $css ) ) {
			return;
		}

		wp_register_style( self::STYLE_HANDLE, false );
		wp_enqueue_style( self::STYLE_HANDLE );
		wp_add_inline_style( self::STYLE_HANDLE, Text::minify( $css ) );
	}

	/**
	 * レスポンシブ改行用CSS取得
	 *
	 * @return string
	 */
	private function get_responsive_br_css() {
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

		return $css;
	}

	/**
	 * レスポンシブ改行のエディター用ラベルCSS取得
	 *
	 * @return string
	 */
	private function get_responsive_br_editor_label_css() {
		$break_label   = wp_json_encode( __( '改行', 'ystandard-toolbox' ), JSON_UNESCAPED_UNICODE );
		$mobile_label  = wp_json_encode( __( 'スマホ', 'ystandard-toolbox' ), JSON_UNESCAPED_UNICODE );
		$tablet_label  = wp_json_encode( __( 'タブレット', 'ystandard-toolbox' ), JSON_UNESCAPED_UNICODE );
		$desktop_label = wp_json_encode( __( 'PC', 'ystandard-toolbox' ), JSON_UNESCAPED_UNICODE );

		$css  = sprintf(
			'.ystdtb-br--mobile,.ystdtb-br--tablet,.ystdtb-br--desktop{--ystdtb--format-responsive-br--label-break:%s;}',
			$break_label
		);
		$css .= sprintf(
			'.ystdtb-br--mobile{--ystdtb--format-responsive-br--label-device:%s;}',
			$mobile_label
		);
		$css .= sprintf(
			'.ystdtb-br--tablet{--ystdtb--format-responsive-br--label-device:%s;}',
			$tablet_label
		);
		$css .= sprintf(
			'.ystdtb-br--desktop{--ystdtb--format-responsive-br--label-device:%s;}',
			$desktop_label
		);

		return $css;
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

Inline_Formats::get_instance();
