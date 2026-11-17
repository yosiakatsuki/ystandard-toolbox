<?php
/**
 * 片方が追従できるカラムブロック。
 *
 * @package ystandard-toolbox
 */

namespace ystandard_toolbox;

defined( 'ABSPATH' ) || die();

/**
 * 親ブロックの登録を管理する。
 */
class Sticky_Columns_Block {

	const BLOCK_NAME     = 'ystdtb/sticky-columns';
	const MIN_WP_VERSION = '7.0';

	/**
	 * 登録用インスタンス。
	 *
	 * @var Sticky_Columns_Block
	 */
	private static $instance;

	/**
	 * ブロックサポートの属性登録より前に初期化する。
	 */
	private function __construct() {
		add_action( 'init', [ $this, 'register_block' ], 20 );
	}

	/**
	 * 登録用インスタンスを取得する。
	 *
	 * @return Sticky_Columns_Block
	 */
	public static function get_instance() {
		// 登録フックの重複を防ぐため、初回だけ生成する。
		if ( ! isset( self::$instance ) ) {
			self::$instance = new self();
		}

		return self::$instance;
	}

	/**
	 * 対象バージョンで静的ブロックを登録する。
	 *
	 * @return void
	 */
	public function register_block() {
		// 旧版向けの互換UIは作らず、親子とも同じ条件で登録を止める。
		if ( ! is_wp_version_compatible( self::MIN_WP_VERSION ) ) {
			return;
		}

		register_block_type( __DIR__ );
	}
}

Sticky_Columns_Block::get_instance();
