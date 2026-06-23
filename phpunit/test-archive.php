<?php


class Archive_Test extends WP_UnitTestCase {

	private function create_posts() {
		$this->factory->post->create_many( 5 );
		$this->go_to( home_url( '/' ) );
	}

	public function set_up() {
		parent::set_up();
		$this->create_posts();
	}

	private function update_option( $value ) {
		\ystandard_toolbox\Option::update_plugin_option(
			\ystandard_toolbox\Archive::OPTION_NAME,
			$value
		);
	}

	public function test_mobile_archive_type() {

		$this->update_option(
			[
				'archiveMobileLayout' => 'list',
			]
		);
		$archive = new \ystandard_toolbox\Archive();
		$actual  = $archive->mobile_archive_type( 'card' );
		$this->assertSame( 'card', $actual );

		add_filter( 'wp_is_mobile', '__return_true' );
		$actual = $archive->mobile_archive_type( 'card' );
		$this->assertSame( 'list', $actual );
		remove_filter( 'wp_is_mobile', '__return_true' );
	}


	public function test_archive_image_ratio() {
		$archive = new \ystandard_toolbox\Archive();
		// 設定なし
		$actual = $archive->archive_image_ratio( 'is-4-3' );
		$this->assertSame( 'is-4-3', $actual );

		// PC・モバイル設定あり-PCアクセス
		$this->update_option(
			[
				'archiveImageRatio' => '3-2',
				'archiveImageRatioMobile' => '16-9',
			]
		);
		$actual = $archive->archive_image_ratio( 'is-4-3' );
		$this->assertSame( 'is-3-2', $actual );

		add_filter( 'wp_is_mobile', '__return_true' );
		// PC・モバイル設定あり-モバイルアクセス
		$this->update_option(
			[
				'archiveImageRatio' => '3-2',
				'archiveImageRatioMobile' => '16-9',
				'archiveMobileLayout' => 'list',
			]
		);
		$actual = $archive->archive_image_ratio( 'is-4-3' );
		$this->assertSame( 'is-16-9', $actual );

		// PC・モバイル設定あり-モバイルアクセス - レイアウト設定なし
		$this->update_option(
			[
				'archiveImageRatio' => '3-2',
				'archiveImageRatioMobile' => '16-9',
				'archiveMobileLayout' => '',
			]
		);
		$actual = $archive->archive_image_ratio( 'is-4-3' );
		$this->assertSame( 'is-3-2', $actual );

		remove_filter( 'wp_is_mobile', '__return_true' );
	}
}
