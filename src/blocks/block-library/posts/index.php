<?php
/**
 * 投稿一覧ブロック
 *
 * @package ystandard-toolbox
 */

namespace ystandard_toolbox;

defined( 'ABSPATH' ) || die();


class Posts_Block {

	const BLOCK_NAME = 'ystdtb/posts';

	/**
	 * Instance.
	 *
	 * @var Sns_Share_Block
	 */
	private static $instance;

	/**
	 * ブロック属性
	 *
	 * @var array
	 */
	private static $attributes;

	/**
	 * Constructor.
	 */
	private function __construct() {
		add_action( 'init', [ $this, 'register_block' ], 100 );
	}

	/**
	 * Instance.
	 *
	 * @return Sns_Share_Block
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
		register_block_type(
			__DIR__,
			[
				'render_callback' => [ $this, 'render_callback' ],
			]
		);
	}

	/**
	 * レンダーコールバック
	 *
	 * @param array $attributes ブロック属性.
	 *
	 * @return string
	 */
	public function render_callback( $attributes ) {

		$args = [];

		$template_path = apply_filters(
			'ystdtb/blocks/posts/template_path',
			__DIR__ . '/ystdtb-posts-template.php'
		);
		ob_start();
		load_template( $template_path, false, $args );

		return ob_get_clean();
	}
}

Posts_Block::get_instance();
