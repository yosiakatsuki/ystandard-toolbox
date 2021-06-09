<?php
/**
 * Class EnqueueTest
 *
 * @package ystandard_toolbox
 */

/**
 * Class LPTest
 */
class LPTest extends WP_UnitTestCase {

	/**
	 * Test is_lp_template.
	 */
	public function test_is_lp() {
		$post_id = $this->factory->post->create();
		$this->go_to( get_the_permalink( $post_id ) );

		$this->assertFalse( \ystandard_toolbox\LP::is_lp_template( get_page_template_slug( $post_id ) ) );

		update_post_meta( $post_id, '_wp_page_template', 'toolbox-template-dir//lp/lp-wide.php' );
		$this->assertTrue( \ystandard_toolbox\LP::is_lp_template( get_page_template_slug( $post_id ) ) );

		update_post_meta( $post_id, '_wp_page_template', 'toolbox-template-dir//lp/lp.php' );
		$this->assertTrue( \ystandard_toolbox\LP::is_lp_template( get_page_template_slug( $post_id ) ) );

		update_post_meta( $post_id, '_wp_page_template', 'page-template/template-one-column.php' );
		$this->assertFalse( \ystandard_toolbox\LP::is_lp_template( get_page_template_slug( $post_id ) ) );
	}
}
