<?php
/**
 * 移行対象ブロック検索 PHPUnit テスト
 *
 * @package ystandard-toolbox
 */

use ystandard_toolbox\Legacy_Content_Search;

/**
 * 移行対象ブロック検索テスト
 */
class Legacy_Content_Search_Test extends WP_UnitTestCase {

	/**
	 * FAQ親ブロックの旧枠線クラスが検索対象として定義されていることを確認する
	 *
	 * @return void
	 */
	public function test_faq_parent_legacy_border_classes_are_registered() {
		$patterns = Legacy_Content_Search::get_patterns();

		$this->assertArrayHasKey( 'faq-parent-legacy-border-class', $patterns );
		$this->assertSame( 'ystdtb/faq', $patterns['faq-parent-legacy-border-class']['block_name'] );
		$this->assertSame(
			[
				'border-type--all',
				'border-type--bottom',
			],
			$patterns['faq-parent-legacy-border-class']['target_strings']
		);
	}

	/**
	 * FAQ親ブロックの旧枠線クラスを含む投稿だけが検索結果に含まれることを確認する
	 *
	 * @return void
	 */
	public function test_search_faq_parent_legacy_border_classes() {
		$border_all_post_id = self::factory()->post->create(
			[
				'post_status'  => 'publish',
				'post_content' => '<!-- wp:ystdtb/faq --><div class="ystdtb-faq has-border border-type--all"></div><!-- /wp:ystdtb/faq -->',
			]
		);
		$border_bottom_post_id = self::factory()->post->create(
			[
				'post_status'  => 'publish',
				'post_content' => '<!-- wp:ystdtb/faq --><div class="ystdtb-faq has-border border-type--bottom"></div><!-- /wp:ystdtb/faq -->',
			]
		);
		$faq_item_post_id = self::factory()->post->create(
			[
				'post_status'  => 'publish',
				'post_content' => '<!-- wp:ystdtb/faq-item --><div class="ystdtb-faq-item has-border"></div><!-- /wp:ystdtb/faq-item -->',
			]
		);
		$other_block_post_id = self::factory()->post->create(
			[
				'post_status'  => 'publish',
				'post_content' => '<!-- wp:paragraph --><p class="border-type--all">本文</p><!-- /wp:paragraph -->',
			]
		);

		$patterns      = Legacy_Content_Search::get_patterns();
		$search_method = new ReflectionMethod( Legacy_Content_Search::class, 'search_pattern' );
		$search_method->setAccessible( true );
		$results  = $search_method->invoke( new Legacy_Content_Search(), $patterns['faq-parent-legacy-border-class'] );
		$post_ids = wp_list_pluck( $results, 'post_id' );

		$this->assertContains( $border_all_post_id, $post_ids );
		$this->assertContains( $border_bottom_post_id, $post_ids );
		$this->assertNotContains( $faq_item_post_id, $post_ids );
		$this->assertNotContains( $other_block_post_id, $post_ids );
	}
}
