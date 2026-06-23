<?php
/**
 * ブロック拡張：画面サイズによる非表示機能
 *
 * @package ystandard-toolbox
 * @author  yosiakatsuki
 * @license GPL-2.0+
 */

namespace ystandard_toolbox;

use ystandard_toolbox\Util\Styles;

defined( 'ABSPATH' ) || die();

/**
 * Class HiddenBySize.
 *
 * 画面サイズによる非表示機能を提供するクラス.
 *
 * @package ystandard_toolbox
 */
class HiddenBySize {

	/**
	 * Instance.
	 *
	 * @var HiddenBySize
	 */
	private static $instance;

	/**
	 * 画面サイズ非表示用属性.
	 *
	 * @return array
	 */
	const ATTRIBUTES = [
		'ystdtbIsHiddenMobile'  => [
			'type'    => 'boolean',
			'default' => false,
		],
		'ystdtbIsHiddenTablet'  => [
			'type'    => 'boolean',
			'default' => false,
		],
		'ystdtbIsHiddenDesktop' => [
			'type'    => 'boolean',
			'default' => false,
		],
	];

	/**
	 * Constructor.
	 */
	private function __construct() {
		add_action( 'init', [ $this, 'register_block' ], 100 );
		// 画面サイズ非表示用属性を追加するフィルターを登録.
		add_filter( 'register_block_type_args', [ $this, 'add_attributes' ], 999, 2 );

		add_action( 'wp_enqueue_scripts', [ $this, 'add_style' ] );
	}

	/**
	 * Instance.
	 *
	 * @return Banner_Link_Block
	 */
	public static function get_instance() {
		if ( ! isset( self::$instance ) ) {
			self::$instance = new self();
		}

		return self::$instance;
	}

	/**
	 * ブロック登録時に画面サイズ非表示用属性を追加
	 *
	 * @param array $args ブロック引数
	 * @param string $name ブロック名
	 *
	 * @return array
	 */
	public function add_attributes( $args, $name ) {

		// 対象ブロックかどうかを判定.
		if ( ! $this->is_enable( $name ) ) {
			return $args;
		}

		return Blocks::merge_attributes(
			$args,
			self::ATTRIBUTES
		);
	}

	/**
	 * ブロックが有効かどうかを判定.
	 *
	 * @param string $block_name ブロック名.
	 *
	 * @return bool
	 */
	private function is_enable( $block_name ) {
		$allowed_namespaces = apply_filters(
			'ystdtb_block_block_hook_hidden_by_size',
			[ 'core', 'ystdb', 'ystdtb' ]
		);

		// ブロック名が許可された名前空間で始まるかチェック.
		foreach ( $allowed_namespaces as $namespace ) {
			if ( strpos( $block_name, $namespace ) === 0 ) {
				return true;
			}
		}

		return false;
	}

	/**
	 * 画面サイズ非表示用スタイル追加
	 *
	 * @return void
	 */
	public function add_style() {

		$handle = 'ystdtb-hidden-by-size-style';
		$css    = '';
		// モバイル非表示スタイル.
		$css .= Styles::add_media_query_only_mobile(
			'.ystdtb-hidden-mobile {display: none !important;}'
		);
		// タブレット非表示スタイル.
		$css .= Styles::add_media_query_only_tablet(
			'.ystdtb-hidden-tablet {display: none !important;}'
		);
		// デスクトップ非表示スタイル.
		$css .= Styles::add_media_query_over_desktop(
			'.ystdtb-hidden-desktop {display: none !important;}'
		);
		wp_register_style( $handle, false );
		wp_enqueue_style( $handle );
		wp_add_inline_style( $handle, $css );
	}

	/**
	 * ブロック登録
	 *
	 * @return void
	 */
	public function register_block() {
		register_block_type( __DIR__ );
	}
}

HiddenBySize::get_instance();
