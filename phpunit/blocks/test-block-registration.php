<?php
/**
 * ブロック登録 PHPUnit テスト
 *
 * @package ystandard-toolbox
 */

/**
 * ブロック登録テスト
 */
class Block_Registration_Test extends WP_UnitTestCase {

	/**
	 * ServerSideRenderを使うブロックに追加CSS用属性が登録されることを確認する
	 *
	 * @return void
	 */
	public function test_server_side_render_blocks_register_custom_css_style_attribute() {
		// WordPress 7.0より前ではブロック単位の追加CSSが提供されないため検証対象外とする.
		if ( ! function_exists( 'wp_register_custom_css_support' ) ) {
			$this->markTestSkipped( 'ブロック単位の追加CSSを利用できないWordPressです。' );
		}

		$block_names = [
			'ystdtb/posts',
			'ystdtb/parts',
			'ystdtb/sns-share',
		];

		foreach ( $block_names as $block_name ) {
			$block_type = WP_Block_Type_Registry::get_instance()->get_registered( $block_name );

			$this->assertInstanceOf( WP_Block_Type::class, $block_type, "{$block_name}が登録されていません。" );
			$this->assertArrayHasKey( 'style', $block_type->attributes, "{$block_name}にstyle属性が登録されていません。" );
			$this->assertSame( 'object', $block_type->attributes['style']['type'] );
		}
	}
}
