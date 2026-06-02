<?php
/**
 * Class test - Styles（ブレークポイント・メディアクエリ生成）
 *
 * @package ystandard_toolbox
 */

use ystandard_toolbox\Util\Styles;

class Styles_Test extends WP_UnitTestCase {

	/**
	 * get_breakpoints() がフラットな連想配列を返すこと。
	 *
	 * 過去に [ self::BREAKPOINTS ] と二重配列でラップしてしまい、
	 * array_key_exists( 'desktop', ... ) 等が機能せずメディアクエリが
	 * 一切付かなくなる不具合があったため、その回帰防止を兼ねる。
	 */
	public function test_get_breakpoints_returns_flat_associative_array() {
		$breakpoints = Styles::get_breakpoints();

		$this->assertIsArray( $breakpoints );
		$this->assertArrayHasKey( 'mobile', $breakpoints );
		$this->assertArrayHasKey( 'tablet', $breakpoints );
		$this->assertArrayHasKey( 'desktop', $breakpoints );
		// 二重配列だと 0 番キーになってしまうため、存在しないことを確認.
		$this->assertArrayNotHasKey( 0, $breakpoints );
	}

	/**
	 * get_breakpoints() の各キーがデフォルト定義値を返すこと。
	 */
	public function test_get_breakpoints_keys_have_default_values() {
		$breakpoints = Styles::get_breakpoints();

		$this->assertSame( 40, $breakpoints['mobile'] );
		$this->assertSame( 48, $breakpoints['tablet'] );
		$this->assertSame( 64, $breakpoints['desktop'] );
		$this->assertSame( 75, $breakpoints['large'] );
	}

	/**
	 * add_media_query_over_desktop() が min-width のメディアクエリで包むこと。
	 */
	public function test_add_media_query_over_desktop_wraps_with_min_width() {
		$css    = '.foo{color:red;}';
		$result = Styles::add_media_query_over_desktop( $css );

		$this->assertStringContainsString( '@media', $result );
		$this->assertStringContainsString( '(min-width: 64rem)', $result );
		$this->assertStringContainsString( $css, $result );
	}

	/**
	 * add_media_query_only_tablet() が min-width / max-width 両方で包むこと。
	 */
	public function test_add_media_query_only_tablet_wraps_with_min_and_max() {
		$css    = '.foo{color:red;}';
		$result = Styles::add_media_query_only_tablet( $css );

		$this->assertStringContainsString( '@media', $result );
		$this->assertStringContainsString( '(min-width: 40rem)', $result );
		$this->assertStringContainsString( '(max-width: 63.999rem)', $result );
		$this->assertStringContainsString( $css, $result );
	}

	/**
	 * add_media_query_only_mobile() が max-width のメディアクエリで包むこと。
	 */
	public function test_add_media_query_only_mobile_wraps_with_max_width() {
		$css    = '.foo{color:red;}';
		$result = Styles::add_media_query_only_mobile( $css );

		$this->assertStringContainsString( '@media', $result );
		$this->assertStringContainsString( '(max-width: 39.999rem)', $result );
		$this->assertStringContainsString( $css, $result );
	}

	/**
	 * 存在しないブレークポイント指定時は、CSSをそのまま返すこと（メディアクエリで包まない）。
	 */
	public function test_add_media_query_returns_css_as_is_for_unknown_breakpoint() {
		$css    = '.foo{color:red;}';
		$result = Styles::add_media_query( $css, 'unknown', 'invalid' );

		$this->assertSame( $css, $result );
	}

	/**
	 * get_breakpoints_max_width_size() が定義値から調整値を引いた値を返すこと。
	 */
	public function test_get_breakpoints_max_width_size() {
		// rem 単位の調整値は 0.001.
		$this->assertSame( 63.999, Styles::get_breakpoints_max_width_size( 'desktop' ) );
		$this->assertSame( 39.999, Styles::get_breakpoints_max_width_size( 'mobile' ) );
	}
}
