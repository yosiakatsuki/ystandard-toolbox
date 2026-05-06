<?php

class Settings_Heading_Design_CSS_Test extends WP_UnitTestCase {

	public function breakpoints_base_size() {
		return 10;
	}

	public function custom_breakpoints() {
		return [
			'sm'      => 600,
			'mobile'  => 600,
			'md'      => 768,
			'tablet'  => 768,
			'lg'      => 1024,
			'desktop' => 1024,
		];
	}

	function test_get_heading_css_responsive() {

		$heading = [
			'heading-1' => [
				'slug'   => 'heading-1',
				'label'  => '見出し1',
				'enable' => true,
				'style'  => [
					'font-size' => [
						'desktop' => '16px',
						'tablet'  => '17px',
						'mobile'  => '18px',
					],
					'margin'    => [
						'desktop' => [
							'top' => '10px',
						],
					],
				],
				'before' => [
					'enable'    => true,
					'content'   => '"before"',
					'font-size' => [
						'desktop' => '15px',
					],
				],
				'after'  => [
					'enable'    => true,
					'font-size' => [
						'desktop' => '14px',
					],
				],
			],
			'heading-2' => [
				'slug'   => 'heading-2',
				'label'  => '見出し2',
				'enable' => true,
				'style'  => [
					'font-size' => [
						'desktop' => '13px',
					],
					'margin'    => [
						'desktop' => [
							'right' => '11px',
						],
					],
				],
				'after'  => [
					'enable'    => true,
					'font-size' => [
						'desktop' => '11px',
					],
				],
			],
		];

		$level_list = [
			'h1' => 'heading-1',
			'h2' => 'heading-1',
		];
		$expected   = <<<EOD
.ystdtb.ystdtb-heading .is-style-ystdtb-heading-1,
.ystdtb .entry-content h1:where(.wp-block-heading):not([class*="is-style-ystdtb-"]):not([class*="is-clear-style"]),
.ystdtb .entry-content h2:where(.wp-block-heading):not([class*="is-style-ystdtb-"]):not([class*="is-clear-style"]){
font-size:16px;
	margin-top:10px;
	position:relative;
}
@media (min-width: 40rem) AND (max-width: 63.999rem) {
.ystdtb.ystdtb-heading .is-style-ystdtb-heading-1,
.ystdtb .entry-content h1:where(.wp-block-heading):not([class*="is-style-ystdtb-"]):not([class*="is-clear-style"]),
.ystdtb .entry-content h2:where(.wp-block-heading):not([class*="is-style-ystdtb-"]):not([class*="is-clear-style"]){
	font-size:17px;
}
}
@media (max-width: 39.999rem) {
.ystdtb.ystdtb-heading .is-style-ystdtb-heading-1,
.ystdtb .entry-content h1:where(.wp-block-heading):not([class*="is-style-ystdtb-"]):not([class*="is-clear-style"]),
.ystdtb .entry-content h2:where(.wp-block-heading):not([class*="is-style-ystdtb-"]):not([class*="is-clear-style"]){
	font-size:18px;
}
}
.ystdtb.ystdtb-heading .is-style-ystdtb-heading-1::before,
.ystdtb .entry-content h1:where(.wp-block-heading):not([class*="is-style-ystdtb-"]):not([class*="is-clear-style"])::before,
.ystdtb .entry-content h2:where(.wp-block-heading):not([class*="is-style-ystdtb-"]):not([class*="is-clear-style"])::before{
	content:"before";
	font-size:15px;
}
.ystdtb.ystdtb-heading .is-style-ystdtb-heading-1::after,
.ystdtb .entry-content h1:where(.wp-block-heading):not([class*="is-style-ystdtb-"]):not([class*="is-clear-style"])::after,
.ystdtb .entry-content h2:where(.wp-block-heading):not([class*="is-style-ystdtb-"]):not([class*="is-clear-style"])::after{
	font-size:14px;
	content:"";
}

.ystdtb.ystdtb-heading .is-style-ystdtb-heading-2{
	font-size:13px;
	margin-right:11px;
	position:relative;
}
.ystdtb.ystdtb-heading .is-style-ystdtb-heading-2::after{
	font-size:11px;
	content:"";
}
EOD;

		$actual = \ystandard_toolbox\Heading_Helper::get_heading_css( $heading, $level_list );
		$this->assertEquals(
			\ystandard_toolbox\Util\Text::minify( $expected ),
			\ystandard_toolbox\Util\Text::minify( $actual )
		);
		$this->assertTrue( true );
	}

	function test_get_heading_css() {

		$heading = [
			'heading-1' => [
				'slug'   => 'heading-1',
				'label'  => '見出し1',
				'enable' => true,
				'style'  => [
					'font-size' => [
						'desktop' => '16px',
					],
					'margin'    => [
						'desktop' => [
							'top' => '10px',
						],
					],
				],
				'before' => [
					'enable'    => true,
					'content'   => '"before"',
					'font-size' => [
						'desktop' => '15px',
					],
				],
				'after'  => [
					'enable'    => true,
					'font-size' => [
						'desktop' => '14px',
					],
				],
			],
			'heading-2' => [
				'slug'   => 'heading-2',
				'label'  => '見出し2',
				'enable' => true,
				'style'  => [
					'font-size' => [
						'desktop' => '13px',
					],
					'margin'    => [
						'desktop' => [
							'right' => '11px',
						],
					],
				],
				'after'  => [
					'enable'    => true,
					'font-size' => [
						'desktop' => '11px',
					],
				],
			],
		];

		$level_list = [
			'h1' => 'heading-1',
			'h2' => 'heading-1',
		];
		$expected   = <<<EOD
.ystdtb.ystdtb-heading .is-style-ystdtb-heading-1,
.ystdtb .entry-content h1:where(.wp-block-heading):not([class*="is-style-ystdtb-"]):not([class*="is-clear-style"]),
.ystdtb .entry-content h2:where(.wp-block-heading):not([class*="is-style-ystdtb-"]):not([class*="is-clear-style"]){
font-size:16px;
	margin-top:10px;
	position:relative;
}
.ystdtb.ystdtb-heading .is-style-ystdtb-heading-1::before,
.ystdtb .entry-content h1:where(.wp-block-heading):not([class*="is-style-ystdtb-"]):not([class*="is-clear-style"])::before,
.ystdtb .entry-content h2:where(.wp-block-heading):not([class*="is-style-ystdtb-"]):not([class*="is-clear-style"])::before{
	content:"before";
	font-size:15px;
}
.ystdtb.ystdtb-heading .is-style-ystdtb-heading-1::after,
.ystdtb .entry-content h1:where(.wp-block-heading):not([class*="is-style-ystdtb-"]):not([class*="is-clear-style"])::after,
.ystdtb .entry-content h2:where(.wp-block-heading):not([class*="is-style-ystdtb-"]):not([class*="is-clear-style"])::after{
	font-size:14px;
	content:"";
}

.ystdtb.ystdtb-heading .is-style-ystdtb-heading-2{
	font-size:13px;
	margin-right:11px;
	position:relative;
}
.ystdtb.ystdtb-heading .is-style-ystdtb-heading-2::after{
	font-size:11px;
	content:"";
}
EOD;

		$actual = \ystandard_toolbox\Heading_Helper::get_heading_css( $heading, $level_list );
		$this->assertEquals(
			\ystandard_toolbox\Util\Text::minify( $expected ),
			\ystandard_toolbox\Util\Text::minify( $actual )
		);
		$this->assertTrue( true );
	}

	function test_get_level() {
		$level_selector = \ystandard_toolbox\Heading_Helper::get_selector_all();
		$level          = [
			'h1'         => 'heading-1',
			'h2'         => 'heading-1',
			'h3'         => 'heading-3',
			'post-title' => 'heading-2',
			'sidebar'    => 'heading-3',
		];
		$expected       = [
			'.ystdtb .entry-content h1:where(.wp-block-heading):not([class*="is-style-ystdtb-"]):not([class*="is-clear-style"])',
			'.ystdtb .entry-content h2:where(.wp-block-heading):not([class*="is-style-ystdtb-"]):not([class*="is-clear-style"])',
		];
		$actual         = \ystandard_toolbox\Heading_Helper::get_level_style_selector(
			$level_selector,
			$level,
			'heading-1'
		);
		$this->assertEquals( $expected, $actual );

		$expected = [
			'.ystdtb.single .entry-title',
		];
		$actual   = \ystandard_toolbox\Heading_Helper::get_level_style_selector(
			$level_selector,
			$level,
			'heading-2'
		);
		$this->assertEquals( $expected, $actual );

		$expected = [
			'.ystdtb .entry-content h3:where(.wp-block-heading):not([class*="is-style-ystdtb-"]):not([class*="is-clear-style"])',
			'.ystdtb .sidebar .widget-title',
			'.ystdtb .sidebar .widgettitle',
		];
		$actual   = \ystandard_toolbox\Heading_Helper::get_level_style_selector(
			$level_selector,
			$level,
			'heading-3'
		);
		$this->assertEquals( $expected, $actual );

		$expected = [];
		$actual   = \ystandard_toolbox\Heading_Helper::get_level_style_selector(
			$level_selector,
			$level,
			'heading-4'
		);
		$this->assertEquals( $expected, $actual );
	}

	function test_create_css_desktop_mobile() {
		$selector = '.block-selector';
		$styles   = [
			'desktop' => [
				'font-size'  => '16px',
				'margin-top' => '10px',
			],
			'mobile'  => [
				'font-size'   => '12px',
				'margin-left' => '10px',
			],
		];
		$expected = <<<EOD
.block-selector{
	font-size:16px;
	margin-top:10px;
}
@media (max-width: 39.999rem) {
.block-selector{
	font-size:12px;
	margin-left:10px;
}
}
EOD;

		$actual = \ystandard_toolbox\Heading_Helper::create_css( $styles, $selector );
		$this->assertEquals(
			\ystandard_toolbox\Util\Text::minify( $expected ),
			\ystandard_toolbox\Util\Text::minify( $actual )
		);
	}

	function test_create_css() {
		$selector = '.block-selector';
		$styles   = [
			'desktop' => [
				'font-size'  => '16px',
				'margin-top' => '10px',
			],
			'tablet'  => [
				'font-size'     => '14px',
				'margin-bottom' => '10px',
			],
			'mobile'  => [
				'font-size'   => '12px',
				'margin-left' => '10px',
			],
		];
		$expected = <<<EOD
.block-selector{
	font-size:16px;
	margin-top:10px;
}
@media (min-width: 40rem) AND (max-width: 63.999rem) {
.block-selector{
	font-size:14px;
	margin-bottom:10px;
}
}
@media (max-width: 39.999rem) {
.block-selector{
	font-size:12px;
	margin-left:10px;
}
}
EOD;

		$actual = \ystandard_toolbox\Heading_Helper::create_css( $styles, $selector );
		$this->assertEquals(
			\ystandard_toolbox\Util\Text::minify( $expected ),
			\ystandard_toolbox\Util\Text::minify( $actual )
		);
	}

	function test_add_media_query() {
		$css      = '.css{color:#222;}';
		$expected = '.css{color:#222;}';
		$actual   = \ystandard_toolbox\Util\Styles::add_media_query( $css );
		$this->assertEquals(
			\ystandard_toolbox\Util\Text::minify( $expected ),
			\ystandard_toolbox\Util\Text::minify( $actual )
		);

		// デフォルト: rem単位.
		$expected = '@media (min-width: 48rem) {.css{color:#222;}}';
		$actual   = \ystandard_toolbox\Util\Styles::add_media_query( $css, 'tablet' );
		$this->assertEquals(
			\ystandard_toolbox\Util\Text::minify( $expected ),
			\ystandard_toolbox\Util\Text::minify( $actual )
		);

		// max-width: rem単位では-0.001の調整.
		$expected = '@media (max-width: 39.999rem) {.css{color:#222;}}';
		$actual   = \ystandard_toolbox\Util\Styles::add_media_query( $css, '', 'mobile' );
		$this->assertEquals(
			\ystandard_toolbox\Util\Text::minify( $expected ),
			\ystandard_toolbox\Util\Text::minify( $actual )
		);

		// min-width AND max-width.
		$expected = '@media (min-width: 48rem) AND (max-width: 63.999rem) {.css{color:#222;}}';
		$actual   = \ystandard_toolbox\Util\Styles::add_media_query( $css, 'tablet', 'desktop' );
		$this->assertEquals(
			\ystandard_toolbox\Util\Text::minify( $expected ),
			\ystandard_toolbox\Util\Text::minify( $actual )
		);

		// フックでpx単位に切り替え.
		$to_px_breakpoints = function () {
			return [
				'mobile'  => 640,
				'tablet'  => 768,
				'desktop' => 1024,
				'large'   => 1200,
			];
		};
		$to_px_unit        = function () {
			return 'px';
		};
		add_filter( 'ystdtb_css_breakpoints', $to_px_breakpoints );
		add_filter( 'ystdtb_css_breakpoint_unit', $to_px_unit );

		// px単位では-0.02の調整.
		$expected = '@media (min-width: 768px) {.css{color:#222;}}';
		$actual   = \ystandard_toolbox\Util\Styles::add_media_query( $css, 'tablet' );
		$this->assertEquals(
			\ystandard_toolbox\Util\Text::minify( $expected ),
			\ystandard_toolbox\Util\Text::minify( $actual )
		);

		$expected = '@media (max-width: 639.98px) {.css{color:#222;}}';
		$actual   = \ystandard_toolbox\Util\Styles::add_media_query( $css, '', 'mobile' );
		$this->assertEquals(
			\ystandard_toolbox\Util\Text::minify( $expected ),
			\ystandard_toolbox\Util\Text::minify( $actual )
		);

		$expected = '@media (min-width: 640px) AND (max-width: 1023.98px) {.css{color:#222;}}';
		$actual   = \ystandard_toolbox\Util\Styles::add_media_query( $css, 'mobile', 'desktop' );
		$this->assertEquals(
			\ystandard_toolbox\Util\Text::minify( $expected ),
			\ystandard_toolbox\Util\Text::minify( $actual )
		);

		remove_filter( 'ystdtb_css_breakpoints', $to_px_breakpoints );
		remove_filter( 'ystdtb_css_breakpoint_unit', $to_px_unit );
	}

	function test_add_pseudo_elements() {
		$block    = '.block-selector';
		$level    = [
			'.level-selector-1',
			'.entry-content h2',
		];
		$expected = '.block-selector::before,.level-selector-1::before,.entry-content h2::before';
		$actual   = \ystandard_toolbox\Heading_Helper::add_pseudo_elements( $block, $level, 'before' );
		$this->assertEquals( $expected, $actual );

		$expected = '.block-selector::after,.level-selector-1::after,.entry-content h2::after';
		$actual   = \ystandard_toolbox\Heading_Helper::add_pseudo_elements( $block, $level, 'after' );
		$this->assertEquals( $expected, $actual );
	}

	function test_get_styles_css() {
		$input    = [
			'font-size'                     => '16px',
			'color'                         => '#222222',
			'--ystdtb-custom-heading-color' => '#222222',
			'margin-top'                    => '12px',
			'margin-left'                   => '42px',
		];
		$expected = '{font-size:16px;
	color:#222222;
	--ystdtb-custom-heading-color:#222222;
	margin-top:12px;
	margin-left:42px;}';

		$actual = \ystandard_toolbox\Util\Styles::get_styles_css( $input );
		$this->assertEquals(
			\ystandard_toolbox\Util\Text::minify( $expected ),
			\ystandard_toolbox\Util\Text::minify( $actual )
		);

	}
}
