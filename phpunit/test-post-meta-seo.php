<?php
/**
 * Post_Meta_SEO テスト
 *
 * @package ystandard-toolbox
 */

class Post_Meta_SEO_Test extends WP_UnitTestCase {

	/**
	 * テスト対象インスタンス
	 *
	 * @var \ystandard_toolbox\Post_Meta_SEO
	 */
	private $seo;

	/**
	 * テスト用投稿 ID
	 *
	 * @var int
	 */
	private $post_id;

	public function set_up() {
		parent::set_up();
		$this->seo     = new \ystandard_toolbox\Post_Meta_SEO();
		$this->post_id = $this->factory->post->create(
			[
				'post_title' => 'デフォルトの投稿タイトル',
			]
		);
		$this->go_to( get_permalink( $this->post_id ) );
	}

	public function tear_down() {
		delete_post_meta( $this->post_id, 'ys_ogp_title' );
		delete_post_meta( $this->post_id, 'ystdtb_seo_title' );
		parent::tear_down();
	}

	/**
	 * yStandard 側の OGP 用タイトル（ys_ogp_title）が設定されていれば、
	 * フィルタは渡された値をそのまま返すこと。
	 */
	public function test_ogp_title_singular_uses_ystandard_ogp_title_when_set() {
		update_post_meta( $this->post_id, 'ys_ogp_title', 'OGP 用タイトル' );
		update_post_meta( $this->post_id, 'ystdtb_seo_title', 'SEO 用タイトル' );

		$actual = $this->seo->ogp_title_singular( 'OGP 用タイトル' );

		$this->assertSame( 'OGP 用タイトル', $actual );
	}

	/**
	 * ys_ogp_title が未設定で ystdtb_seo_title が設定されている場合、
	 * フォールバックして SEO 用タイトルを返すこと。
	 */
	public function test_ogp_title_singular_falls_back_to_seo_title_when_ogp_title_empty() {
		update_post_meta( $this->post_id, 'ystdtb_seo_title', 'SEO 用タイトル' );

		// yStandard 側のフィルタ発火時の挙動に合わせ、$title には投稿タイトルが入る。
		$actual = $this->seo->ogp_title_singular( 'デフォルトの投稿タイトル' );

		$this->assertSame( 'SEO 用タイトル', $actual );
	}

	/**
	 * ys_ogp_title も ystdtb_seo_title も未設定の場合、
	 * フィルタに渡された投稿タイトルをそのまま返すこと。
	 */
	public function test_ogp_title_singular_returns_default_title_when_both_empty() {
		$actual = $this->seo->ogp_title_singular( 'デフォルトの投稿タイトル' );

		$this->assertSame( 'デフォルトの投稿タイトル', $actual );
	}

	/**
	 * ys_ogp_title が空白文字のみの場合、
	 * 未設定とみなして ystdtb_seo_title へフォールバックすること。
	 */
	public function test_ogp_title_singular_treats_whitespace_only_ogp_title_as_empty() {
		update_post_meta( $this->post_id, 'ys_ogp_title', "  \n " );
		update_post_meta( $this->post_id, 'ystdtb_seo_title', 'SEO 用タイトル' );

		$actual = $this->seo->ogp_title_singular( 'デフォルトの投稿タイトル' );

		$this->assertSame( 'SEO 用タイトル', $actual );
	}

	/**
	 * ystdtb_seo_title が空白文字のみの場合、
	 * 未設定とみなして既定のタイトルを返すこと。
	 */
	public function test_ogp_title_singular_treats_whitespace_only_seo_title_as_empty() {
		update_post_meta( $this->post_id, 'ystdtb_seo_title', "   \n" );

		$actual = $this->seo->ogp_title_singular( 'デフォルトの投稿タイトル' );

		$this->assertSame( 'デフォルトの投稿タイトル', $actual );
	}
}
