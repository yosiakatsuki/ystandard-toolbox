<?php
/**
 * タクソノミーアーカイブの並び替え設定テスト.
 *
 * @package ystandard_toolbox
 */

/**
 * Class Taxonomy_Archive_Order_Test
 */
class Taxonomy_Archive_Order_Test extends WP_UnitTestCase {

	/**
	 * テスト用カスタムタクソノミー名.
	 */
	const CUSTOM_TAXONOMY = 'ystdtb_order_test';

	/**
	 * 変更前のToolbox設定.
	 *
	 * @var mixed
	 */
	private $original_option;

	/**
	 * テスト用カテゴリーID.
	 *
	 * @var int
	 */
	private $term_id;

	/**
	 * テスト準備.
	 */
	public function set_up() {
		parent::set_up();
		$this->original_option = get_option( \ystandard_toolbox\Config::OPTION_NAME, null );
		$this->term_id         = self::factory()->term->create(
			[
				'taxonomy' => 'category',
				'name'     => '並び替えテスト',
			]
		);
		$post_ids             = self::factory()->post->create_many( 2 );
		foreach ( $post_ids as $post_id ) {
			wp_set_post_categories( $post_id, [ $this->term_id ] );
		}
	}

	/**
	 * テスト後処理.
	 */
	public function tear_down() {
		$_POST = [];
		wp_set_current_user( 0 );
		// カスタムタクソノミーを登録したテストの後だけ、登録状態を元へ戻す.
		if ( taxonomy_exists( self::CUSTOM_TAXONOMY ) ) {
			unregister_taxonomy( self::CUSTOM_TAXONOMY );
		}
		// テスト前に設定がなかった場合は、一時的に作成した設定を削除する.
		if ( null === $this->original_option ) {
			delete_option( \ystandard_toolbox\Config::OPTION_NAME );
		} else {
			// 既存設定があった場合は、他のテストへ影響しないよう元の値へ戻す.
			update_option( \ystandard_toolbox\Config::OPTION_NAME, $this->original_option );
		}
		parent::tear_down();
	}

	/**
	 * ターム個別設定が全体設定より優先されることを確認.
	 */
	public function test_term_order_overrides_global_order() {
		$this->update_archive_option( 'title/ASC' );
		update_term_meta( $this->term_id, \ystandard_toolbox\Archive::TERM_ORDER_META_KEY, 'modified/DESC' );

		$this->go_to( get_term_link( $this->term_id, 'category' ) );

		$this->assertSame( 'modified', $GLOBALS['wp_query']->get( 'orderby' ) );
		$this->assertSame( 'DESC', $GLOBALS['wp_query']->get( 'order' ) );
	}

	/**
	 * 個別設定がない場合に全体設定へフォールバックすることを確認.
	 */
	public function test_global_order_is_used_when_term_order_is_unset() {
		$this->update_archive_option( 'title/ASC' );

		$this->go_to( get_term_link( $this->term_id, 'category' ) );

		$this->assertSame( 'title', $GLOBALS['wp_query']->get( 'orderby' ) );
		$this->assertSame( 'ASC', $GLOBALS['wp_query']->get( 'order' ) );
	}

	/**
	 * 不正なターム個別設定では全体設定へフォールバックすることを確認.
	 */
	public function test_invalid_term_orderby_falls_back_to_global_order() {
		$this->update_archive_option( 'title/ASC' );
		update_term_meta( $this->term_id, \ystandard_toolbox\Archive::TERM_ORDER_META_KEY, 'meta_value/ASC' );

		$this->go_to( get_term_link( $this->term_id, 'category' ) );

		$this->assertSame( 'title', $GLOBALS['wp_query']->get( 'orderby' ) );
		$this->assertSame( 'ASC', $GLOBALS['wp_query']->get( 'order' ) );
	}

	/**
	 * タグアーカイブにも個別設定が適用されることを確認.
	 */
	public function test_term_order_is_applied_to_tag_archive() {
		$term_id = self::factory()->term->create(
			[
				'taxonomy' => 'post_tag',
				'name'     => 'タグ並び替えテスト',
			]
		);
		update_term_meta( $term_id, \ystandard_toolbox\Archive::TERM_ORDER_META_KEY, 'title/ASC' );

		$this->go_to( get_term_link( $term_id, 'post_tag' ) );

		$this->assertSame( 'title', $GLOBALS['wp_query']->get( 'orderby' ) );
		$this->assertSame( 'ASC', $GLOBALS['wp_query']->get( 'order' ) );
	}

	/**
	 * カスタムタクソノミーにも個別設定が適用されることを確認.
	 */
	public function test_term_order_is_applied_to_custom_taxonomy_archive() {
		register_taxonomy(
			self::CUSTOM_TAXONOMY,
			'post',
			[
				'public'       => true,
				'query_var'    => true,
				'rewrite'      => false,
				'show_in_rest' => true,
			]
		);
		$term_id = self::factory()->term->create(
			[
				'taxonomy' => self::CUSTOM_TAXONOMY,
				'name'     => 'カスタム分類テスト',
			]
		);
		$term    = get_term( $term_id, self::CUSTOM_TAXONOMY );
		update_term_meta( $term_id, \ystandard_toolbox\Archive::TERM_ORDER_META_KEY, 'modified/ASC' );

		$this->go_to( home_url( '/?' . self::CUSTOM_TAXONOMY . '=' . $term->slug ) );

		$this->assertSame( 'modified', $GLOBALS['wp_query']->get( 'orderby' ) );
		$this->assertSame( 'ASC', $GLOBALS['wp_query']->get( 'order' ) );
	}

	/**
	 * 個別設定と全体設定がない場合に既定クエリを維持することを確認.
	 */
	public function test_query_is_unchanged_when_order_settings_are_unset() {
		$this->update_archive_option( '' );

		$this->go_to( get_term_link( $this->term_id, 'category' ) );

		$this->assertSame( '', $GLOBALS['wp_query']->get( 'orderby' ) );
		$this->assertSame( 'DESC', $GLOBALS['wp_query']->get( 'order' ) );
	}

	/**
	 * ランダム設定ではorderを追加しないことを確認.
	 */
	public function test_random_order_does_not_set_order_direction() {
		$this->update_archive_option( '' );
		update_term_meta( $this->term_id, \ystandard_toolbox\Archive::TERM_ORDER_META_KEY, 'rand/ASC' );

		$this->go_to( get_term_link( $this->term_id, 'category' ) );

		$this->assertSame( 'rand', $GLOBALS['wp_query']->get( 'orderby' ) );
		$this->assertSame( '', $GLOBALS['wp_query']->get( 'order' ) );
	}

	/**
	 * 全体設定があってもサブクエリを変更しないことを確認.
	 */
	public function test_secondary_query_is_not_changed() {
		$this->update_archive_option( 'title/ASC' );

		$query = new WP_Query( [ 'post_type' => 'post' ] );

		$this->assertSame( '', $query->get( 'orderby' ) );
		$this->assertSame( 'DESC', $query->get( 'order' ) );
	}

	/**
	 * 有効な入力値をタームメタへ保存できることを確認.
	 */
	public function test_valid_order_is_saved() {
		$this->set_term_edit_request( 'title/ASC' );

		$taxonomy = new \ystandard_toolbox\Taxonomy();
		$taxonomy->update_term_meta( $this->term_id );

		$this->assertSame( 'title/ASC', get_term_meta( $this->term_id, \ystandard_toolbox\Archive::TERM_ORDER_META_KEY, true ) );
	}

	/**
	 * 全体設定に従う選択でタームメタが削除されることを確認.
	 */
	public function test_empty_order_deletes_term_meta() {
		update_term_meta( $this->term_id, \ystandard_toolbox\Archive::TERM_ORDER_META_KEY, 'title/ASC' );
		$this->set_term_edit_request( '' );

		$taxonomy = new \ystandard_toolbox\Taxonomy();
		$taxonomy->update_term_meta( $this->term_id );

		$this->assertSame( '', get_term_meta( $this->term_id, \ystandard_toolbox\Archive::TERM_ORDER_META_KEY, true ) );
	}

	/**
	 * 不正な並び順基準を保存しないことを確認.
	 */
	public function test_invalid_orderby_deletes_term_meta() {
		update_term_meta( $this->term_id, \ystandard_toolbox\Archive::TERM_ORDER_META_KEY, 'date/DESC' );
		$this->set_term_edit_request( 'meta_value/ASC' );

		$taxonomy = new \ystandard_toolbox\Taxonomy();
		$taxonomy->update_term_meta( $this->term_id );

		$this->assertSame( '', get_term_meta( $this->term_id, \ystandard_toolbox\Archive::TERM_ORDER_META_KEY, true ) );
	}

	/**
	 * ターム編集権限がないユーザーは設定を更新できないことを確認.
	 */
	public function test_user_without_edit_term_capability_cannot_save() {
		update_term_meta( $this->term_id, \ystandard_toolbox\Archive::TERM_ORDER_META_KEY, 'date/DESC' );
		$user_id = self::factory()->user->create( [ 'role' => 'subscriber' ] );
		wp_set_current_user( $user_id );
		$_POST = [
			\ystandard_toolbox\Taxonomy::NONCE_NAME           => wp_create_nonce( \ystandard_toolbox\Taxonomy::NONCE_ACTION ),
			\ystandard_toolbox\Archive::TERM_ORDER_META_KEY => 'title/ASC',
		];

		$taxonomy = new \ystandard_toolbox\Taxonomy();
		$taxonomy->update_term_meta( $this->term_id );

		$this->assertSame( 'date/DESC', get_term_meta( $this->term_id, \ystandard_toolbox\Archive::TERM_ORDER_META_KEY, true ) );
	}

	/**
	 * 非yStandard環境ではテーマ専用設定を表示しないことを確認.
	 */
	public function test_non_ystandard_term_form_contains_only_theme_independent_section() {
		$term     = get_term( $this->term_id, 'category' );
		$taxonomy = new \ystandard_toolbox\Taxonomy();

		ob_start();
		$taxonomy->edit_form( $term, 'category' );
		$output = ob_get_clean();

		$this->assertStringContainsString( '一覧表示設定', $output );
		$this->assertStringContainsString( '全体設定に従う', $output );
		$this->assertStringContainsString( 'name="ystdtb-archive-order"', $output );
		$this->assertStringContainsString( 'value="date/DESC"', $output );
		$this->assertStringContainsString( 'value="modified/ASC"', $output );
		$this->assertStringContainsString( 'value="title/DESC"', $output );
		$this->assertStringContainsString( 'value="rand/ASC"', $output );
		$this->assertStringNotContainsString( 'name="ystdtb-archive-orderby"', $output );
		$this->assertStringNotContainsString( 'SEO設定', $output );
		$this->assertStringNotContainsString( 'オーバーレイ設定', $output );
	}

	/**
	 * 全体のアーカイブ並び順を更新.
	 *
	 * @param string $order 並び順設定.
	 */
	private function update_archive_option( $order ) {
		\ystandard_toolbox\Option::update_plugin_option(
			\ystandard_toolbox\Archive::OPTION_NAME,
			[ 'archiveOrder' => $order ]
		);
	}

	/**
	 * ターム編集画面からの保存リクエストを準備.
	 *
	 * @param string $value 並び順設定.
	 */
	private function set_term_edit_request( $value ) {
		$user_id = self::factory()->user->create( [ 'role' => 'administrator' ] );
		wp_set_current_user( $user_id );
		$_POST = [
			\ystandard_toolbox\Taxonomy::NONCE_NAME           => wp_create_nonce( \ystandard_toolbox\Taxonomy::NONCE_ACTION ),
			\ystandard_toolbox\Archive::TERM_ORDER_META_KEY => $value,
		];
	}
}
