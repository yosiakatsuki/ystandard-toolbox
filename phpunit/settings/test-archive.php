<?php
/**
 * アーカイブ（消費側）ロジックテスト
 *
 * 設定値（Archive::OPTION_NAME 配下）→ Archive クラスの各フィルタメソッド出力を検証する。
 * 既存の Archive_Test は mobile_archive_type のみカバーしているため、本テストは
 *   - archive_image_ratio（縦横比のフォールバック / モバイル優先）
 *   - get_archive_detail_date（公開日 / 更新日切替）
 * を中心に担保する。
 *
 * @package ystandard_toolbox
 */

class Settings_Archive_Test extends WP_UnitTestCase {

	/**
	 * Archive 設定を更新するヘルパー。
	 *
	 * @param array $value 設定値。
	 */
	private function update_option( $value ) {
		\ystandard_toolbox\Option::update_plugin_option(
			\ystandard_toolbox\Archive::OPTION_NAME,
			$value
		);
	}

	public function tear_down() {
		delete_option( \ystandard_toolbox\Archive::OPTION_NAME );
		remove_all_filters( 'wp_is_mobile' );
		parent::tear_down();
	}

	/**
	 * archiveImageRatio 未設定時、archive_image_ratio() が引数の元値を
	 * そのまま返すこと（フォールバックで上書きしない）を確認。
	 */
	public function test_archive_image_ratio_returns_original_when_unset() {
		$this->update_option( [] );
		$instance = new \ystandard_toolbox\Archive();
		$this->assertSame( 'is-16-9', $instance->archive_image_ratio( 'is-16-9' ) );
	}

	/**
	 * archiveImageRatio="4-3" 設定時、archive_image_ratio() が "is-4-3" を
	 * 返すこと（接頭辞 is- が自動付与される）を確認。
	 */
	public function test_archive_image_ratio_uses_desktop_setting() {
		$this->update_option( [ 'archiveImageRatio' => '4-3' ] );
		$instance = new \ystandard_toolbox\Archive();
		$this->assertSame( 'is-4-3', $instance->archive_image_ratio( 'is-16-9' ) );
	}

	/**
	 * archiveMobileLayout 設定 + archiveImageRatioMobile="1-1" + モバイル判定 true のとき、
	 * archive_image_ratio() がモバイル設定値を優先して "is-1-1" を返すことを確認。
	 */
	public function test_archive_image_ratio_uses_mobile_setting_when_mobile() {
		$this->update_option(
			[
				'archiveImageRatio'       => '4-3',
				'archiveMobileLayout'     => 'list',
				'archiveImageRatioMobile' => '1-1',
			]
		);
		add_filter( 'wp_is_mobile', '__return_true' );
		$instance = new \ystandard_toolbox\Archive();
		$this->assertSame( 'is-1-1', $instance->archive_image_ratio( 'is-16-9' ) );
	}

	/**
	 * モバイル判定 true でも archiveMobileLayout 未設定なら、デスクトップ設定値が使われることを確認。
	 * （モバイル縦横比 UI が出る前提条件＝archiveMobileLayout の設定が無いと、モバイル分岐は機能しない）
	 */
	public function test_archive_image_ratio_skips_mobile_branch_without_mobile_layout() {
		$this->update_option(
			[
				'archiveImageRatio'       => '4-3',
				'archiveImageRatioMobile' => '1-1',
			]
		);
		add_filter( 'wp_is_mobile', '__return_true' );
		$instance = new \ystandard_toolbox\Archive();
		$this->assertSame( 'is-4-3', $instance->archive_image_ratio( 'is-16-9' ) );
	}

	/**
	 * archiveDisplayDate 未設定時、get_archive_detail_date() が
	 * 引数の元 $date をそのまま返す（更新日に置換しない）ことを確認。
	 */
	public function test_get_archive_detail_date_returns_original_when_unset() {
		$this->update_option( [] );
		$instance = new \ystandard_toolbox\Archive();
		$result   = $instance->get_archive_detail_date( '元の日付HTML', '%s%s%s', '', 'Y-m-d' );
		$this->assertSame( '元の日付HTML', $result );
	}

	/**
	 * archiveDisplayDate="modified" 設定時、get_archive_detail_date() が
	 * sprintf で更新日 HTML を組み立てて返すことを確認。
	 * テスト投稿の post_modified を仕込み、期待 HTML 文字列に含まれることを検証。
	 */
	public function test_get_archive_detail_date_uses_modified_date_when_set_to_modified() {
		$this->update_option( [ 'archiveDisplayDate' => 'modified' ] );

		// テスト投稿を作成（factory では post_modified が post_date と同期されるため、
		// 後段で $wpdb->update で post_modified を独立して上書きする）。
		$post_id = self::factory()->post->create(
			[
				'post_date'     => '2024-01-15 10:00:00',
				'post_date_gmt' => '2024-01-15 01:00:00',
			]
		);
		global $wpdb;
		$wpdb->update(
			$wpdb->posts,
			[
				'post_modified'     => '2024-06-20 12:00:00',
				'post_modified_gmt' => '2024-06-20 03:00:00',
			],
			[ 'ID' => $post_id ]
		);
		clean_post_cache( $post_id );

		$GLOBALS['post'] = get_post( $post_id );
		setup_postdata( $GLOBALS['post'] );

		$instance = new \ystandard_toolbox\Archive();
		// format='%s|%s|%s' / icon='ICON' / date_format='Y-m-d' を渡す。
		$result = $instance->get_archive_detail_date( '元の日付', '%s|%s|%s', 'ICON', 'Y-m-d' );

		// 元の日付ではなく、更新日（2024-06-20）が含まれる。
		$this->assertStringContainsString( '2024-06-20', $result );
		$this->assertStringContainsString( 'ICON', $result );

		wp_reset_postdata();
	}
}
