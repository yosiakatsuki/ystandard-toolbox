<?php
/**
 * ブロック拡張：見出しデザイン無効化
 *
 * @package ystandard-toolbox
 * @author  yosiakatsuki
 * @license GPL-2.0+
 */

namespace ystandard_toolbox;

defined( 'ABSPATH' ) || die();

/**
 * Class Disable_Heading_Style.
 *
 * ブロック単位でToolboxの見出しデザインを無効化する機能を提供するクラス.
 *
 * @package ystandard_toolbox
 */
class Disable_Heading_Style {

	/**
	 * Instance.
	 *
	 * @var Disable_Heading_Style
	 */
	private static $instance;

	/**
	 * 初期状態で設定を追加するブロック.
	 */
	const DEFAULT_TARGET_BLOCKS = [
		'core/heading',
		'core/post-title',
	];

	/**
	 * Constructor.
	 */
	private function __construct() {
		add_action( 'init', [ $this, 'register_block' ], 20 );
		add_filter( 'register_block_type_args', [ $this, 'add_class_name_attribute' ], 999, 2 );
	}

	/**
	 * Instance.
	 *
	 * @return Disable_Heading_Style
	 */
	public static function get_instance() {
		// 初回呼び出し時だけインスタンスを生成する.
		if ( ! isset( self::$instance ) ) {
			self::$instance = new self();
		}

		return self::$instance;
	}

	/**
	 * 見出しデザイン無効化設定の対象ブロックを取得する.
	 *
	 * @return array
	 */
	public function get_target_blocks() {
		$blocks = apply_filters(
			'ystdtb_disable_heading_style_target_blocks',
			self::DEFAULT_TARGET_BLOCKS
		);

		// 不正なフック戻り値で既定ブロックの設定が消えないようにする.
		if ( ! is_array( $blocks ) ) {
			return self::DEFAULT_TARGET_BLOCKS;
		}

		return array_values(
			array_unique(
				array_filter(
					$blocks,
					static function ( $block_name ) {
						return is_string( $block_name ) && '' !== $block_name;
					}
				)
			)
		);
	}

	/**
	 * 対象ブロックへclassName属性を追加する.
	 *
	 * @param array  $args ブロック引数.
	 * @param string $name ブロック名.
	 * @return array
	 */
	public function add_class_name_attribute( $args, $name ) {
		// 対象外ブロックの属性定義を変更しない.
		if ( ! in_array( $name, $this->get_target_blocks(), true ) ) {
			return $args;
		}

		// WordPressまたはブロック側のclassName定義を優先する.
		if ( isset( $args['attributes']['className'] ) ) {
			return $args;
		}

		return Blocks::merge_attributes(
			$args,
			[
				'className' => [
					'type' => 'string',
				],
			]
		);
	}

	/**
	 * ブロック拡張用スクリプトを登録する.
	 *
	 * @return void
	 */
	public function register_block() {
		register_block_type( __DIR__ );
	}
}

Disable_Heading_Style::get_instance();
