<?php

class Settings_Heading_Test extends WP_UnitTestCase {

	public function set_up() {
		parent::set_up();
		if ( ! class_exists( '\ystandard_toolbox\Heading' ) ) {
			require_once YSTDTB_PATH . '/inc/heading/class-heading.php';
		}
	}

	/**
	 * ystandard テーマがアクティブな場合 is_ystandard_active() は true を返す.
	 */
	public function test_is_ystandard_active_returns_true_when_ystandard_theme_active() {
		switch_theme( 'ystandard' );
		$this->assertTrue( \ystandard_toolbox\Heading::is_ystandard_active() );
	}

	/**
	 * ystandard 以外のテーマがアクティブな場合 is_ystandard_active() は false を返す.
	 */
	public function test_is_ystandard_active_returns_false_when_other_theme_active() {
		switch_theme( 'twentytwentyfour' );
		$this->assertFalse( \ystandard_toolbox\Heading::is_ystandard_active() );
	}

	/**
	 * ystandard テーマがアクティブな場合、get_heading_level_schema() に sidebar / footer が含まれる.
	 */
	public function test_schema_includes_widget_levels_when_ystandard_active() {
		switch_theme( 'ystandard' );
		$schema = \ystandard_toolbox\Heading::get_heading_level_schema();
		$this->assertArrayHasKey( 'sidebar', $schema );
		$this->assertArrayHasKey( 'footer', $schema );
	}

	/**
	 * 非 ystandard テーマでは get_heading_level_schema() に sidebar / footer が含まれない.
	 */
	public function test_schema_excludes_widget_levels_when_not_ystandard() {
		switch_theme( 'twentytwentyfour' );
		$schema = \ystandard_toolbox\Heading::get_heading_level_schema();
		$this->assertArrayNotHasKey( 'sidebar', $schema );
		$this->assertArrayNotHasKey( 'footer', $schema );
	}

	/**
	 * フィルター ystdtb_heading_level_additional で明示的に true を返した場合、
	 * 非 ystandard 環境でも sidebar / footer が schema に含まれる.
	 */
	public function test_filter_can_force_enable_widget_levels() {
		switch_theme( 'twentytwentyfour' );
		add_filter( 'ystdtb_heading_level_additional', '__return_true' );
		$schema = \ystandard_toolbox\Heading::get_heading_level_schema();
		$this->assertArrayHasKey( 'sidebar', $schema );
		$this->assertArrayHasKey( 'footer', $schema );
		remove_filter( 'ystdtb_heading_level_additional', '__return_true' );
	}
}
