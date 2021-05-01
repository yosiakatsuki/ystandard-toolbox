<?php
/**
 * Class EnqueueTest
 *
 * @package Ystandard_Toolbox
 */

use ystandard_toolbox\Config;

/**
 * Class EnqueueTest
 */
class EnqueueTest extends WP_UnitTestCase {

	/**
	 * Enqueue script
	 */
	public function test_enqueue_script() {
		$enqueue = new \ystandard_toolbox\Enqueue();

		$this->assertSame( 11, has_action( 'wp_enqueue_scripts', [ $enqueue, 'enqueue_css' ] ) );
		$this->assertSame( 11, has_action( 'wp_enqueue_scripts', [ $enqueue, 'enqueue_script' ] ) );
		$this->assertSame( 50, has_action( 'admin_enqueue_scripts', [ $enqueue, 'admin_enqueue_scripts' ] ) );
		$this->assertSame( 11, has_action( Config::AFTER_ENQUEUE_CSS_HOOK, [ $enqueue, 'enqueue_block_style' ] ) );
		$this->assertSame( PHP_INT_MAX, has_action( 'wp_head', [ $enqueue, 'enqueue_no_script_css' ] ) );
	}
}
