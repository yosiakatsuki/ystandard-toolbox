<?php
/**
 * ボックスブロック
 *
 * @package ystandard-toolbox
 */

namespace ystandard_toolbox;

use ystandard_toolbox\Util\Styles;
use ystandard_toolbox\Util\Text;

defined( 'ABSPATH' ) || die();

/**
 * Class Box_Block.
 */
class Box_Block {

	const BLOCK_NAME = 'ystdtb/box';

	/**
	 * Instance.
	 *
	 * @var Box_Block
	 */
	private static $instance;

	/**
	 * Constructor.
	 */
	private function __construct() {
		add_action( 'init', [ $this, 'register_block' ], 100 );
		add_action( 'enqueue_block_assets', [ $this, 'enqueue_responsive_style' ] );
	}

	/**
	 * Instance.
	 *
	 * @return Box_Block
	 */
	public static function get_instance() {
		if ( ! isset( self::$instance ) ) {
			self::$instance = new self();
		}

		return self::$instance;
	}

	/**
	 * ブロック登録
	 *
	 * @return void
	 */
	public function register_block() {
		register_block_type( __DIR__ );
	}

	/**
	 * レスポンシブスタイルのエンキュー
	 *
	 * インラインスタイルで設定される CSS カスタムプロパティ
	 * （`--ystdtb-box-padding-*-tablet` / `--ystdtb-box-padding-*-mobile`）を
	 * メディアクエリ内で参照する。
	 *
	 * @return void
	 */
	public function enqueue_responsive_style() {
		$handle = 'ystdtb-blocks-box-responsive';

		$tablet_css = <<<'CSS'
.ystdtb-box__content {
	padding-top: var(--ystdtb-box-padding-top-tablet, var(--ystdtb-box-padding-top));
	padding-right: var(--ystdtb-box-padding-right-tablet, var(--ystdtb-box-padding-right));
	padding-bottom: var(--ystdtb-box-padding-bottom-tablet, var(--ystdtb-box-padding-bottom));
	padding-left: var(--ystdtb-box-padding-left-tablet, var(--ystdtb-box-padding-left));
}
:where(.ystdtb-box.is-box-style--label-line) .ystdtb-box__content {
	padding-top: calc(var(--ystdtb-box-padding-top-tablet, var(--ystdtb-box-padding-top)) + var(--ystdtb-box-label-font-size));
}
:where(.ystdtb-box.is-box-style--label-line) .ystdtb-box__label {
	left: calc(var(--ystdtb-box-padding-left-tablet, var(--ystdtb-box-padding-left, 1em)) + var(--ystdtb-box-border-width, 1px));
}
CSS;

		$mobile_css = <<<'CSS'
.ystdtb-box__content {
	padding-top: var(--ystdtb-box-padding-top-mobile, var(--ystdtb-box-padding-top));
	padding-right: var(--ystdtb-box-padding-right-mobile, var(--ystdtb-box-padding-right));
	padding-bottom: var(--ystdtb-box-padding-bottom-mobile, var(--ystdtb-box-padding-bottom));
	padding-left: var(--ystdtb-box-padding-left-mobile, var(--ystdtb-box-padding-left));
}
:where(.ystdtb-box.is-box-style--label-line) .ystdtb-box__content {
	padding-top: calc(var(--ystdtb-box-padding-top-mobile, var(--ystdtb-box-padding-top)) + var(--ystdtb-box-label-font-size));
}
:where(.ystdtb-box.is-box-style--label-line) .ystdtb-box__label {
	left: calc(var(--ystdtb-box-padding-left-mobile, var(--ystdtb-box-padding-left, 1em)) + var(--ystdtb-box-border-width, 1px));
}
CSS;

		$css  = Styles::add_media_query_only_tablet( $tablet_css );
		$css .= Styles::add_media_query_only_mobile( $mobile_css );

		wp_register_style( $handle, false );
		wp_add_inline_style( $handle, Text::minify( $css ) );
		wp_enqueue_style( $handle );
	}
}

Box_Block::get_instance();
