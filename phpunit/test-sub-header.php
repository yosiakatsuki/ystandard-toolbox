<?php
/**
 * Class migration test - sub header
 *
 * @package ystandard_toolbox
 */

class Sub_Header_Test extends WP_UnitTestCase {

	public function update_option( $value ) {
		\ystandard_toolbox\Option::update_plugin_option(
			\ystandard_toolbox\Header_Design::OPTION_NAME,
			$value,
		);
	}

	public function test_old_2_new() {
		$this->update_option( [
			'subHeaderFontSizeDesktop'     => 14,
			'subHeaderFontSizeUnitDesktop' => 'px',
		] );
		$this->assertSame(
			'14px',
			\ystandard_toolbox\Sub_Header::get_font_size()
		);
	}

	public function test_new_setting() {
		$this->update_option( [
			'subHeaderFontSize'            => '0.5em',
			'subHeaderFontSizeDesktop'     => 14,
			'subHeaderFontSizeUnitDesktop' => 'px',
		] );
		$this->assertSame(
			'0.5em',
			\ystandard_toolbox\Sub_Header::get_font_size()
		);
	}

	public function test_default_value() {
		$this->update_option( [] );
		$this->assertSame(
			'0.7em',
			\ystandard_toolbox\Sub_Header::get_font_size()
		);
	}
}
