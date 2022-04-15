<?php
/**
 * Block Config : Extension
 *
 * @package ystandard-toolbox
 * @author  yosiakatsuki
 * @license GPL-2.0+
 */

namespace ystandard_toolbox\blocks\extension;

defined( 'ABSPATH' ) || die();

/**
 * 拡張機能.
 */
class Extension {
	/**
	 * Constructor.
	 */
	public function __construct() {
		add_filter( 'register_block_type_args', [ $this, 'add_attributes' ], 999, 2 );
		$this->init();
	}

	/**
	 * 初期化処理.
	 */
	private function init() {
		/**
		 * 各phpのロード.
		 */
		foreach ( glob( __DIR__ . '/*', GLOB_ONLYDIR ) as $dir ) {
			$dir_name = basename( $dir );
			$class    = $dir . '/class-' . $dir_name . '.php';
			if ( is_file( $class ) ) {
				require $class;
			}
		}
	}

	/**
	 * Attributesの追加.
	 *
	 * @param array  $args args.
	 * @param string $name block name.
	 *
	 * @return array
	 */
	public function add_attributes( $args, $name ) {

		$args = Hidden_By_Size::merge_attributes( $args );

		return $args;
	}

	/**
	 * パラメーターをマージする.
	 *
	 * @param array $args       Args.
	 * @param array $attributes Attributes.
	 *
	 * @return array
	 */
	public static function merge_attributes( $args, $attributes ) {
		if ( array_key_exists( 'attributes', $args ) ) {
			$args['attributes'] = array_merge( $args['attributes'], $attributes );
		} else {
			$args['attributes'] = $attributes;
		}

		return $args;
	}
}

new Extension();
