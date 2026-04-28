<?php
/**
 * 記事一覧ブロック PHPUnit テスト
 *
 * `Posts_Block::render_callback($attributes)` の出力 HTML を DOMDocument + DOMXPath で検証する。
 *
 * @package ystandard-toolbox
 */

class Posts_Block_Test extends WP_UnitTestCase {

	/**
	 * テスト投稿 ID（投稿）
	 *
	 * @var int[]
	 */
	private $post_ids = [];

	/**
	 * テスト固定ページ ID（子ページ）
	 *
	 * @var int[]
	 */
	private $page_ids = [];

	/**
	 * 親固定ページ ID
	 *
	 * @var int
	 */
	private $parent_page_id = 0;

	/**
	 * セットアップ
	 *
	 * テスト投稿 12 件 + 親固定ページ 1 件 + 子固定ページ 3 件を作成する。
	 * post_date を 2026-01-01 〜 2026-01-12 と段階的に設定し、orderby/offset の検証で順序を確定させる。
	 */
	public function set_up() {
		parent::set_up();

		// テスト投稿 12 件作成（タイトル: "テスト投稿 01" 〜 "テスト投稿 12"）.
		for ( $i = 1; $i <= 12; $i++ ) {
			$this->post_ids[] = self::factory()->post->create(
				[
					'post_title'  => sprintf( 'テスト投稿 %02d', $i ),
					'post_name'   => sprintf( 'test-post-%02d', $i ),
					'post_date'   => sprintf( '2026-01-%02d 00:00:00', $i ),
					'post_status' => 'publish',
				]
			);
		}

		// 親固定ページ 1 件 + 子固定ページ 3 件作成.
		$this->parent_page_id = self::factory()->post->create(
			[
				'post_title'  => '親ページ',
				'post_status' => 'publish',
				'post_type'   => 'page',
			]
		);
		for ( $i = 1; $i <= 3; $i++ ) {
			$this->page_ids[] = self::factory()->post->create(
				[
					'post_title'  => sprintf( '子ページ %d', $i ),
					'post_status' => 'publish',
					'post_type'   => 'page',
					'post_parent' => $this->parent_page_id,
				]
			);
		}
	}

	/**
	 * render_callback を呼び出す
	 *
	 * @param array $attributes ブロック属性.
	 *
	 * @return string HTML.
	 */
	private function render( array $attributes ): string {
		$block = \ystandard_toolbox\Posts_Block::get_instance();

		return $block->render_callback( $attributes );
	}

	/**
	 * HTML を DOMXPath として読み込む
	 *
	 * @param string $html HTML.
	 *
	 * @return DOMXPath
	 */
	private function load_dom( string $html ): DOMXPath {
		$dom  = new DOMDocument();
		$prev = libxml_use_internal_errors( true );
		// UTF-8 を正しく扱うためのエンコーディング指定.
		$dom->loadHTML( '<?xml encoding="UTF-8">' . $html );
		libxml_use_internal_errors( $prev );

		return new DOMXPath( $dom );
	}

	/**
	 * クラス属性に特定のクラス名が含まれることを判定する XPath 述語
	 *
	 * 部分一致を避けるため空白パディング後の contains を使う。
	 *
	 * @param string $class クラス名.
	 *
	 * @return string XPath 述語.
	 */
	private function has_class( string $class ): string {
		return "contains(concat(' ', normalize-space(@class), ' '), ' {$class} ')";
	}

	/**
	 * タイトル要素のテキストを順序保持で取得
	 *
	 * @param DOMXPath $xpath XPath.
	 *
	 * @return string[]
	 */
	private function get_titles( DOMXPath $xpath ): array {
		$titles = [];
		foreach ( $xpath->query( "//p[{$this->has_class( 'ystdtb-posts__title' )}]" ) as $node ) {
			$titles[] = trim( $node->textContent );
		}

		return $titles;
	}

	// ============================================================
	// デフォルト / レイアウト
	// ============================================================

	public function test_default_renders_card_layout_with_3_items() {
		$html  = $this->render( [] );
		$xpath = $this->load_dom( $html );

		$this->assertSame(
			1,
			$xpath->query( "//div[{$this->has_class( 'ystdtb-posts' )} and {$this->has_class( 'is-card' )}]" )->length
		);
		$this->assertSame(
			3,
			$xpath->query( "//li[{$this->has_class( 'ystdtb-posts__item' )}]" )->length
		);
	}

	/**
	 * @dataProvider provide_list_types
	 */
	public function test_list_type_outputs_correct_class( string $list_type, string $expected_class ) {
		$html  = $this->render( [ 'listType' => $list_type ] );
		$xpath = $this->load_dom( $html );

		$this->assertSame(
			1,
			$xpath->query( "//div[{$this->has_class( 'ystdtb-posts' )} and {$this->has_class( $expected_class )}]" )->length
		);
	}

	public function provide_list_types(): array {
		return [
			'card'   => [ 'card', 'is-card' ],
			'list'   => [ 'list', 'is-list' ],
			'simple' => [ 'simple', 'is-simple' ],
		];
	}

	// ============================================================
	// count
	// ============================================================

	/**
	 * @dataProvider provide_count_patterns
	 */
	public function test_count_outputs_correct_item_count( int $count ) {
		$html  = $this->render( [ 'count' => $count ] );
		$xpath = $this->load_dom( $html );

		$this->assertSame(
			$count,
			$xpath->query( "//li[{$this->has_class( 'ystdtb-posts__item' )}]" )->length
		);
	}

	public function provide_count_patterns(): array {
		return [
			'count_1' => [ 1 ],
			'count_6' => [ 6 ],
		];
	}

	// ============================================================
	// col mobile/tablet/pc
	// ============================================================

	public function test_col_classes_are_applied_to_list() {
		$html  = $this->render(
			[
				'colMobile' => 2,
				'colTablet' => 3,
				'colPc'     => 4,
			]
		);
		$xpath = $this->load_dom( $html );

		$ul = $xpath->query( "//ul[{$this->has_class( 'ystdtb-posts__list' )}]" )->item( 0 );
		$this->assertNotNull( $ul );
		$class_attr = $ul->getAttribute( 'class' );
		$this->assertStringContainsString( 'col-mobile--2', $class_attr );
		$this->assertStringContainsString( 'col-tablet--3', $class_attr );
		$this->assertStringContainsString( 'col-desktop--4', $class_attr );
	}

	// ============================================================
	// showImg
	// ============================================================

	public function test_show_img_true_renders_figure() {
		$html  = $this->render( [ 'showImg' => true ] );
		$xpath = $this->load_dom( $html );

		$this->assertGreaterThan(
			0,
			$xpath->query( "//figure[{$this->has_class( 'ystdtb-posts__thumbnail' )}]" )->length
		);
	}

	public function test_show_img_false_no_figure() {
		$html  = $this->render( [ 'showImg' => false ] );
		$xpath = $this->load_dom( $html );

		$this->assertSame(
			0,
			$xpath->query( "//figure[{$this->has_class( 'ystdtb-posts__thumbnail' )}]" )->length
		);
	}

	// ============================================================
	// thumbnailRatio（全 9 種）
	// ============================================================

	/**
	 * @dataProvider provide_thumbnail_ratios
	 */
	public function test_thumbnail_ratio_outputs_correct_class( string $ratio ) {
		$html  = $this->render( [ 'thumbnailRatio' => $ratio ] );
		$xpath = $this->load_dom( $html );

		$expected_class = 'is-' . $ratio;
		$this->assertGreaterThan(
			0,
			$xpath->query( "//figure[{$this->has_class( 'ystdtb-posts__thumbnail' )} and {$this->has_class( $expected_class )}]" )->length
		);
	}

	public function provide_thumbnail_ratios(): array {
		return [
			'16-9' => [ '16-9' ],
			'4-3'  => [ '4-3' ],
			'3-2'  => [ '3-2' ],
			'1-1'  => [ '1-1' ],
			'2-1'  => [ '2-1' ],
			'3-1'  => [ '3-1' ],
			'9-16' => [ '9-16' ],
			'4-5'  => [ '4-5' ],
			'2-3'  => [ '2-3' ],
		];
	}

	// ============================================================
	// メタ情報の表示・非表示
	// ============================================================

	public function test_show_date_false_no_date_element() {
		$html  = $this->render( [ 'showDate' => false ] );
		$xpath = $this->load_dom( $html );

		$this->assertSame(
			0,
			$xpath->query( "//*[{$this->has_class( 'ystdtb-posts__date' )}]" )->length
		);
	}

	public function test_show_category_false_no_cat_element() {
		$html  = $this->render( [ 'showCategory' => false ] );
		$xpath = $this->load_dom( $html );

		$this->assertSame(
			0,
			$xpath->query( "//*[{$this->has_class( 'ystdtb-posts__cat' )}]" )->length
		);
	}

	public function test_show_excerpt_false_no_excerpt_element() {
		$html  = $this->render( [ 'showExcerpt' => false ] );
		$xpath = $this->load_dom( $html );

		$this->assertSame(
			0,
			$xpath->query( "//p[{$this->has_class( 'ystdtb-posts__excerpt' )}]" )->length
		);
	}

	// ============================================================
	// excerpt 行数（バグ再発防止）
	// ============================================================

	public function test_excerpt_default_lines_outputs_empty_inline_style() {
		$html  = $this->render( [ 'showExcerpt' => true ] );
		$xpath = $this->load_dom( $html );

		$excerpt = $xpath->query( "//p[{$this->has_class( 'ystdtb-posts__excerpt' )}]" )->item( 0 );
		$this->assertNotNull( $excerpt );
		$this->assertSame( '', $excerpt->getAttribute( 'style' ) );
	}

	public function test_excerpt_lines_1_outputs_css_variable() {
		$html  = $this->render(
			[
				'showExcerpt'  => true,
				'excerptLines' => 1,
			]
		);
		$xpath = $this->load_dom( $html );

		$excerpt = $xpath->query( "//p[{$this->has_class( 'ystdtb-posts__excerpt' )}]" )->item( 0 );
		$this->assertNotNull( $excerpt );
		$this->assertSame( '--ystdtb--posts--excerpt-line-clamp:1', $excerpt->getAttribute( 'style' ) );
	}

	public function test_excerpt_lines_4_outputs_css_variable() {
		$html  = $this->render(
			[
				'showExcerpt'  => true,
				'excerptLines' => 4,
			]
		);
		$xpath = $this->load_dom( $html );

		$excerpt = $xpath->query( "//p[{$this->has_class( 'ystdtb-posts__excerpt' )}]" )->item( 0 );
		$this->assertNotNull( $excerpt );
		$this->assertSame( '--ystdtb--posts--excerpt-line-clamp:4', $excerpt->getAttribute( 'style' ) );
	}

	// ============================================================
	// 投稿タイプ・絞り込み
	// ============================================================

	public function test_post_type_page_returns_only_pages() {
		$html  = $this->render(
			[
				'postType' => 'page',
				'count'    => 10,
			]
		);
		$xpath = $this->load_dom( $html );

		$titles = $this->get_titles( $xpath );
		$this->assertNotEmpty( $titles );
		foreach ( $titles as $title ) {
			$is_page = ( '親ページ' === $title || str_starts_with( $title, '子ページ' ) );
			$this->assertTrue( $is_page, "期待外のタイトルが含まれている: {$title}" );
		}
	}

	public function test_post_in_returns_specified_ids_only() {
		$ids   = [ $this->post_ids[0], $this->post_ids[2] ];
		$html  = $this->render(
			[
				'postIn' => implode( ',', $ids ),
				'count'  => 10,
			]
		);
		$xpath = $this->load_dom( $html );

		$this->assertSame(
			2,
			$xpath->query( "//li[{$this->has_class( 'ystdtb-posts__item' )}]" )->length
		);
	}

	public function test_post_name_in_returns_specified_slugs_only() {
		$html  = $this->render(
			[
				'postNameIn' => 'test-post-01,test-post-03',
				'count'      => 10,
			]
		);
		$xpath = $this->load_dom( $html );

		$this->assertSame(
			2,
			$xpath->query( "//li[{$this->has_class( 'ystdtb-posts__item' )}]" )->length
		);
	}

	public function test_post_parent_returns_only_children() {
		$html  = $this->render(
			[
				'postType'   => 'page',
				'postParent' => (string) $this->parent_page_id,
				'count'      => 10,
			]
		);
		$xpath = $this->load_dom( $html );

		$this->assertSame(
			3,
			$xpath->query( "//li[{$this->has_class( 'ystdtb-posts__item' )}]" )->length
		);
	}

	public function test_taxonomy_term_slug_filter() {
		// 専用カテゴリを作って 2 件にだけ付与.
		$cat_id = self::factory()->category->create( [ 'slug' => 'news' ] );
		wp_set_object_terms( $this->post_ids[0], [ $cat_id ], 'category' );
		wp_set_object_terms( $this->post_ids[1], [ $cat_id ], 'category' );

		$html  = $this->render(
			[
				'taxonomy' => 'category',
				'termSlug' => 'news',
				'count'    => 10,
			]
		);
		$xpath = $this->load_dom( $html );

		$this->assertSame(
			2,
			$xpath->query( "//li[{$this->has_class( 'ystdtb-posts__item' )}]" )->length
		);
	}

	// ============================================================
	// offset / orderby
	// ============================================================

	public function test_offset_skips_initial_posts() {
		// offset 無し: post_date DESC で先頭は "テスト投稿 12".
		$html  = $this->render( [ 'count' => 1 ] );
		$xpath = $this->load_dom( $html );
		$this->assertSame( 'テスト投稿 12', $this->get_titles( $xpath )[0] );

		// offset 3: 12,11,10 をスキップ → 先頭は "テスト投稿 09".
		$html  = $this->render(
			[
				'count'  => 1,
				'offset' => 3,
			]
		);
		$xpath = $this->load_dom( $html );
		$this->assertSame( 'テスト投稿 09', $this->get_titles( $xpath )[0] );
	}

	public function test_orderby_title_asc() {
		$html  = $this->render(
			[
				'orderby' => 'title',
				'order'   => 'ASC',
				'count'   => 12,
			]
		);
		$xpath = $this->load_dom( $html );

		$titles = $this->get_titles( $xpath );
		$this->assertSame( 'テスト投稿 01', $titles[0] );
		$this->assertSame( 'テスト投稿 12', $titles[ count( $titles ) - 1 ] );
	}

	public function test_orderby_date_asc_returns_oldest_first() {
		$html  = $this->render(
			[
				'orderby' => 'date',
				'order'   => 'ASC',
				'count'   => 1,
			]
		);
		$xpath = $this->load_dom( $html );

		$this->assertSame( 'テスト投稿 01', $this->get_titles( $xpath )[0] );
	}

	// ============================================================
	// 投稿が無い場合
	// ============================================================

	public function test_no_matching_posts_returns_empty_string() {
		$html = $this->render( [ 'postIn' => '99999' ] );
		$this->assertSame( '', $html );
	}

	// ============================================================
	// モバイル切替
	// ============================================================

	public function test_list_type_mobile_overrides_on_mobile() {
		add_filter( 'ystdtb_blocks_posts_is_mobile', '__return_true' );

		$html  = $this->render(
			[
				'listType'       => 'card',
				'listTypeMobile' => 'list',
			]
		);
		$xpath = $this->load_dom( $html );

		$this->assertSame(
			1,
			$xpath->query( "//div[{$this->has_class( 'ystdtb-posts' )} and {$this->has_class( 'is-list' )}]" )->length
		);

		remove_filter( 'ystdtb_blocks_posts_is_mobile', '__return_true' );
	}

	public function test_count_mobile_overrides_on_mobile() {
		add_filter( 'ystdtb_blocks_posts_is_mobile', '__return_true' );

		$html  = $this->render(
			[
				'count'       => 6,
				'countMobile' => 2,
			]
		);
		$xpath = $this->load_dom( $html );

		$this->assertSame(
			2,
			$xpath->query( "//li[{$this->has_class( 'ystdtb-posts__item' )}]" )->length
		);

		remove_filter( 'ystdtb_blocks_posts_is_mobile', '__return_true' );
	}

	public function test_thumbnail_ratio_mobile_overrides_on_mobile() {
		add_filter( 'ystdtb_blocks_posts_is_mobile', '__return_true' );

		$html  = $this->render(
			[
				'thumbnailRatio'       => '16-9',
				'thumbnailRatioMobile' => '1-1',
			]
		);
		$xpath = $this->load_dom( $html );

		$this->assertGreaterThan(
			0,
			$xpath->query( "//figure[{$this->has_class( 'is-1-1' )}]" )->length
		);
		$this->assertSame(
			0,
			$xpath->query( "//figure[{$this->has_class( 'is-16-9' )}]" )->length
		);

		remove_filter( 'ystdtb_blocks_posts_is_mobile', '__return_true' );
	}

	public function test_offset_mobile_overrides_on_mobile() {
		add_filter( 'ystdtb_blocks_posts_is_mobile', '__return_true' );

		// offsetMobile=6: post_date DESC で 12,11,10,09,08,07 をスキップ → 先頭は "テスト投稿 06".
		$html  = $this->render(
			[
				'count'        => 1,
				'offset'       => 3,
				'offsetMobile' => 6,
			]
		);
		$xpath = $this->load_dom( $html );

		$this->assertSame( 'テスト投稿 06', $this->get_titles( $xpath )[0] );

		remove_filter( 'ystdtb_blocks_posts_is_mobile', '__return_true' );
	}

	// ============================================================
	// simple レイアウト（画像非表示）
	// ============================================================

	public function test_simple_layout_no_figure() {
		$html  = $this->render( [ 'listType' => 'simple' ] );
		$xpath = $this->load_dom( $html );

		$this->assertSame( 0, $xpath->query( '//figure' )->length );
	}

	// ============================================================
	// className 追加
	// ============================================================

	public function test_custom_class_name_applied_to_wrapper() {
		$html  = $this->render( [ 'className' => 'my-custom-class' ] );
		$xpath = $this->load_dom( $html );

		$this->assertSame(
			1,
			$xpath->query( "//div[{$this->has_class( 'ystdtb-posts' )} and {$this->has_class( 'my-custom-class' )}]" )->length
		);
	}

	// ============================================================
	// is_singular 時の現在投稿の自動除外
	// ============================================================

	public function test_singular_excludes_current_post() {
		$current_id = $this->post_ids[0];
		$this->go_to( get_permalink( $current_id ) );

		$html  = $this->render( [ 'count' => 12 ] );
		$xpath = $this->load_dom( $html );

		$titles        = $this->get_titles( $xpath );
		$current_title = get_the_title( $current_id );

		$this->assertNotContains( $current_title, $titles );
	}
}
