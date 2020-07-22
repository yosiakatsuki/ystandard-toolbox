<?php
/**
 * @package ystandard-toolbox
 * @author  yosiakatsuki
 * @license GPL-2.0+
 */

namespace ystandard_toolbox;

defined( 'ABSPATH' ) || die();

/**
 * Class Abstract_Blocks
 *
 * @package ystandard_toolbox
 */
abstract class Abstract_Blocks {

	/**
	 * Name.
	 *
	 * @var string
	 */
	protected $name;

	/**
	 * Dynamic Block.
	 *
	 * @var bool
	 */
	protected $dynamic = false;

	/**
	 * Register.
	 */
	public function register() {
		add_action( 'enqueue_block_editor_assets', [ $this, 'register_block' ] );
	}

	/**
	 * Register Blocks.
	 */
	public function register_block() {

		$asset_file = include( YSTDTB_PATH . '/js/blocks/' . $this->name . '.asset.php' );
		wp_enqueue_script(
			'ystdtb-blocks-' . $this->name,
			YSTDTB_PATH . '/js/blocks/' . $this->name . '.js',
			$asset_file['dependencies'],
			$asset_file['version']
		);
	}
}
