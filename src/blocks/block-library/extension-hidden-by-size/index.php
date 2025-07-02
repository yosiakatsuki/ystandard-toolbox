<?php
/**
 * ブロック拡張：画面サイズによる非表示機能
 *
 * @package ystandard-toolbox
 * @author  yosiakatsuki
 * @license GPL-2.0+
 */

namespace ystandard_toolbox;

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
	 * コンストラクタ.
	 */
	public function __construct() {
		// 画面サイズ非表示用属性を追加するフィルターを登録.
		add_filter( 'register_block_type_args', [ $this, 'add_attributes' ], 999, 2 );
	}

	/**
	 * ブロック登録時に画面サイズ非表示用属性を追加
	 *
	 * @param array  $args ブロック引数
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
			'ystdtb_block_extension_hidden_by_size',
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
}
