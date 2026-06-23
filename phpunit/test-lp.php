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
	 * LPテンプレート
	 *
	 * @var string
	 */
	private $lp_template_path;

	/**
	 * LPテンプレート（ワイド）
	 *
	 * @var string
	 */
	private $lp_wide_template_path;

	/**
	 * テンプレートパスのセット
	 */
	public function set_template_path() {
		$this->lp_template_path      = YSTDTB_PATH . '/page-template/lp/lp.php';
		$this->lp_wide_template_path = YSTDTB_PATH . '/page-template/lp/lp-wide.php';
	}

	/**
	 * 初期化
	 */
	public function init() {
		add_filter( 'template', function () {
			return 'ystandard';
		} );
		add_filter( 'ys_ystandard_version', function () {
			return '100.0.0';
		} );
		$lp = new \ystandard_toolbox\LP();
	}

	/**
	 * Test is_lp_template.
	 */
	public function test_is_lp() {
		$this->init();
		$this->set_template_path();

		$post_id = $this->factory->post->create();
		$this->go_to( get_the_permalink( $post_id ) );

		$this->assertFalse( \ystandard_toolbox\LP::is_lp_template( get_page_template_slug( $post_id ) ) );

		update_post_meta( $post_id, '_wp_page_template', 'toolbox-template-dir/lp/lp-wide.php' );
		$this->assertTrue( \ystandard_toolbox\LP::is_lp_template( get_page_template_slug( $post_id ) ) );

		update_post_meta( $post_id, '_wp_page_template', 'toolbox-template-dir/lp/lp.php' );
		$this->assertTrue( \ystandard_toolbox\LP::is_lp_template( get_page_template_slug( $post_id ) ) );

		update_post_meta( $post_id, '_wp_page_template', 'page-template/template-one-column.php' );
		$this->assertFalse( \ystandard_toolbox\LP::is_lp_template( get_page_template_slug( $post_id ) ) );
	}

	/**
	 * Test load_template
	 */
	public function test_load_template_singular() {
		$this->init();
		$this->set_template_path();

		$post_id = $this->factory->post->create();
		$this->go_to( get_the_permalink( $post_id ) );

		$this->assertNotSame(
			$this->lp_template_path,
			apply_filters( 'template_include', get_single_template() )
		);
		$this->assertNotSame(
			$this->lp_wide_template_path,
			apply_filters( 'template_include', get_single_template() )
		);

		update_post_meta( $post_id, '_wp_page_template', 'toolbox-template-dir/lp/lp.php' );
		$this->go_to( get_the_permalink( $post_id ) );
		$this->assertSame(
			$this->lp_template_path,
			apply_filters( 'template_include', get_single_template() )
		);
		$this->assertNotSame(
			$this->lp_wide_template_path,
			apply_filters( 'template_include', get_single_template() )
		);

		update_post_meta( $post_id, '_wp_page_template', 'toolbox-template-dir/lp/lp-wide.php' );
		$this->go_to( get_the_permalink( $post_id ) );
		$this->assertNotSame(
			$this->lp_template_path,
			apply_filters( 'template_include', get_single_template() )
		);
		$this->assertSame(
			$this->lp_wide_template_path,
			apply_filters( 'template_include', get_single_template() )
		);

		$page_id = $this->factory->post->create(
			[ 'post_type' => 'page' ]
		);
		$this->go_to( get_the_permalink( $page_id ) );
		$this->assertNotSame(
			$this->lp_template_path,
			apply_filters( 'template_include', get_page_template() )
		);
		$this->assertNotSame(
			$this->lp_wide_template_path,
			apply_filters( 'template_include', get_page_template() )
		);

		update_post_meta( $page_id, '_wp_page_template', 'toolbox-template-dir/lp/lp.php' );
		$this->go_to( get_the_permalink( $page_id ) );
		$this->assertSame(
			$this->lp_template_path,
			apply_filters( 'template_include', get_single_template() )
		);
		$this->assertNotSame(
			$this->lp_wide_template_path,
			apply_filters( 'template_include', get_single_template() )
		);

		update_post_meta( $page_id, '_wp_page_template', 'toolbox-template-dir/lp/lp-wide.php' );
		$this->go_to( get_the_permalink( $page_id ) );
		$this->assertNotSame(
			$this->lp_template_path,
			apply_filters( 'template_include', get_single_template() )
		);
		$this->assertSame(
			$this->lp_wide_template_path,
			apply_filters( 'template_include', get_single_template() )
		);
	}

	/**
	 * Test load_template
	 */
	public function test_load_template_front_page() {
		$this->init();
		$this->set_template_path();

		$post_id = $this->factory->post->create();
		update_post_meta( $post_id, '_wp_page_template', 'toolbox-template-dir/lp/lp.php' );
		update_option( 'show_on_front', 'posts' );
		$this->go_to( home_url( '/' ) );
		$this->assertTrue( is_front_page() );

		$this->assertNotSame(
			$this->lp_template_path,
			apply_filters( 'template_include', get_home_template() )
		);
		$this->assertNotSame(
			$this->lp_wide_template_path,
			apply_filters( 'template_include', get_home_template() )
		);

		$page_id = $this->factory->post->create(
			[ 'post_type' => 'page' ]
		);
		update_post_meta( $page_id, '_wp_page_template', 'toolbox-template-dir/lp/lp.php' );
		update_option( 'show_on_front', 'page' );
		update_option( 'page_on_front', $page_id );
		$this->go_to( home_url( '/' ) );
		$this->assertTrue( is_front_page() );
		$this->assertSame(
			$this->lp_template_path,
			apply_filters( 'template_include', get_front_page_template() )
		);
	}

	/**
	 * Test load_template
	 */
	public function test_load_template_archive() {
		$this->init();
		$this->set_template_path();

		$front_page   = $this->factory->post->create(
			[ 'post_type' => 'page' ]
		);
		$archive_page = $this->factory->post->create(
			[ 'post_type' => 'page' ]
		);
		update_option( 'show_on_front', 'page' );
		update_option( 'page_on_front', $front_page );
		update_option( 'page_for_posts', $archive_page );

		$cat_a   = $this->factory->term->create(
			[
				'taxonomy' => 'category',
				'name'     => 'cat-a',
			]
		);
		$post_id = $this->factory->post->create(
			[
				'post_date'     => '2020-01-01 00:00:00',
				'post_category' => [ $cat_a ],
			]
		);
		update_post_meta( $post_id, '_wp_page_template', 'toolbox-template-dir/lp/lp.php' );

		$this->go_to( get_the_permalink( $archive_page ) );
		$this->assertTrue( is_home() );
		$this->assertNotSame(
			$this->lp_template_path,
			apply_filters( 'template_include', get_home_template() )
		);
		$this->assertSame(
			get_home_template(),
			apply_filters( 'template_include', get_home_template() )
		);

		$this->go_to( get_category_link( $cat_a ) );
		$this->assertTrue( is_category() );
		$this->assertNotSame(
			$this->lp_template_path,
			apply_filters( 'template_include', get_category_template() )
		);
		$this->assertSame(
			get_category_template(),
			apply_filters( 'template_include', get_category_template() )
		);

		$this->go_to( get_day_link( 2020, 01, 01 ) );
		$this->assertTrue( is_date() );
		$this->assertNotSame(
			$this->lp_template_path,
			apply_filters( 'template_include', get_date_template() )
		);
		$this->assertSame(
			get_date_template(),
			apply_filters( 'template_include', get_date_template() )
		);

	}

	/**
	 * Test Title.
	 */
	public function test_title() {
		$this->init();
		update_option( 'blogname', 'yStandard' );
		$cat_a   = $this->factory->term->create(
			[
				'taxonomy' => 'category',
				'name'     => 'cat-a',
			]
		);
		$post_id = $this->factory->post->create(
			[
				'post_title'    => 'LP Test',
				'post_date'     => '2020-01-01 00:00:00',
				'post_category' => [ $cat_a ],
			]
		);
		$this->go_to( get_the_permalink( $post_id ) );
		$this->assertSame(
			wptexturize( 'LP Test - yStandard' ),
			wp_get_document_title()
		);
		update_post_meta( $post_id, '_wp_page_template', 'toolbox-template-dir/lp/lp.php' );
		$this->assertTrue( \ystandard_toolbox\LP::is_lp_template() );
		$this->assertSame(
			'LP Test',
			wp_get_document_title()
		);
		$post_seo = new \ystandard_toolbox\Post_Meta_SEO();
		update_post_meta( $post_id, '_wp_page_template', 'default' );
		update_post_meta( $post_id, 'ystdtb_seo_title', 'SEO Title' );
		$this->assertSame(
			wptexturize( 'SEO Title - yStandard' ),
			wp_get_document_title()
		);
		update_post_meta( $post_id, '_wp_page_template', 'toolbox-template-dir/lp/lp.php' );
		$this->assertSame(
			'SEO Title',
			wp_get_document_title()
		);

		$this->go_to( get_category_link( $cat_a ) );
		$this->assertSame(
			wptexturize( 'cat-a - yStandard' ),
			wp_get_document_title()
		);
	}
}
