<?php
/**
 * @package ystandard-toolbox
 * @author  yosiakatsuki
 * @license GPL-2.0+
 */

namespace ystandard_toolbox;

defined( 'ABSPATH' ) || die();

/**
 * Class Dynamic_Block
 *
 * @package ystandard_toolbox
 */
abstract class Dynamic_Block {

	/**
	 * ブロック有効化フックのプレフィックス
	 */
	const REGISTER_DYNAMIC_BLOCK_HOOK = 'ystdtb_register_dynamic_block_';

	/**
	 * ブロック名
	 *
	 * @var string
	 */
	protected $block_name = '';

	/**
	 * ブロックパラメーター
	 *
	 * @var array
	 */
	protected $block_attributes = [];

	/**
	 * Dynamic_Block constructor.
	 */
	public function __construct() {
	}

	/**
	 * Render
	 *
	 * @param array  $attributes block attributes.
	 * @param string $content    innerBlocks.
	 *
	 * @return false|string
	 */
	abstract public function render( $attributes, $content = null );

	/**
	 * Render
	 *
	 * @param array  $attributes block attributes.
	 * @param string $content    innerBlocks.
	 *
	 * @return false|string
	 */
	public function _render( $attributes, $content = null ) {
		$attributes = $this->parse_default( $attributes );

		return $this->render( $attributes, $content );
	}

	/**
	 * Register Dynamic Block
	 */
	public function register_block() {
		if ( ! apply_filters( self::REGISTER_DYNAMIC_BLOCK_HOOK . $this->block_name, true ) ) {
			return;
		}
		register_block_type(
			"ystdtb/{$this->block_name}",
			[
				'editor_script'   => "ystandard-toolbox-{$this->block_name}",
				'attributes'      => $this->block_attributes,
				'render_callback' => [ $this, '_render' ],
			]
		);
	}

	/**
	 * 初期値の解析
	 *
	 * @param array $attributes Attributes.
	 *
	 * @return array
	 */
	protected function parse_default( $attributes ) {
		foreach ( $this->block_attributes as $key => $item ) {
			if ( ! isset( $attributes[ $key ] ) && isset( $item['default'] ) ) {
				$attributes[ $key ] = $item['default'];
			}
			if ( 'bool' === $item['type'] ) {
				$attributes[ $key ] = Utility::to_bool( $attributes[ $key ] );
			}
		}

		return $attributes;
	}
}
