<?php

class Heading_Design_Pseudo_Elements_Style_Test extends WP_UnitTestCase {

	function test_parse_styles_pseudo_elements_icon() {
		$input    = [
			'content'  => '<svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M100 50C100 77.6142 77.6142 100 50 100C22.3858 100 0 77.6142 0 50C0 22.3858 22.3858 0 50 0C77.6142 0 100 22.3858 100 50Z" fill="#D9D9D9"/></svg>',
			'icon'     => 'circle',
			'fontSize' => [
				'desktop' => '16px',
			],
		];
		$encode_svg = rawurlencode('<svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M100 50C100 77.6142 77.6142 100 50 100C22.3858 100 0 77.6142 0 50C0 22.3858 22.3858 0 50 0C77.6142 0 100 22.3858 100 50Z" fill="#D9D9D9"/></svg>');
		$expected = [
			'desktop' => [
				'content'           => '""',
				'font-size'         => '16px',
				'background-image'  => "url('data:image/svg+xml;charset=UTF-8,{$encode_svg}')",
				'background-size'   => 'contain',
			],
		];
		$this->assertEquals( $expected, \ystandard_toolbox\Util\Styles::parse_styles_pseudo_elements( $input, 'before' ) );
	}

	function test_parse_styles_pseudo_elements_content() {
		$input    = [
			'content'  => '""',
			'fontSize' => [
				'desktop' => '16px',
			],
		];
		$expected = [
			'desktop' => [
				'content'   => '""',
				'font-size' => '16px',
			],
		];
		$this->assertEquals( $expected, \ystandard_toolbox\Util\Styles::parse_styles_pseudo_elements( $input, 'before' ) );

		$input    = [
			'content'  => '新着',
			'fontSize' => [
				'desktop' => '16px',
			],
		];
		$expected = [
			'desktop' => [
				'content'   => '"新着"',
				'font-size' => '16px',
			],
		];
		$this->assertEquals( $expected, \ystandard_toolbox\Util\Styles::parse_styles_pseudo_elements( $input, 'before' ) );

		$input    = [
			'content'  => '"新着2"',
			'fontSize' => [
				'desktop' => '16px',
			],
		];
		$expected = [
			'desktop' => [
				'content'   => '"新着2"',
				'font-size' => '16px',
			],
		];
		$this->assertEquals( $expected, \ystandard_toolbox\Util\Styles::parse_styles_pseudo_elements( $input, 'before' ) );
	}

	function test_parse_styles_pseudo_elements_color() {
		$input    = [
			'color'           => '#222222',
			'backgroundColor' => '#ffffff',
		];
		$expected = [
			'desktop' => [
				'content'                                     => '""',
				'color'                                       => '#222222',
				'--ystdtb-custom-heading-after-color'         => '#222222',
				'--ystdtb-custom-heading-after-color-rgb'     => 'rgb(34,34,34)',
				'--ystdtb-custom-heading-after-color-rgba'    => 'rgba(34,34,34,var(--ystdtb-custom-heading-after-color-rbga-opacity,1))',
				'background-color'                            => '#ffffff',
				'--ystdtb-custom-heading-after-bg-color'      => '#ffffff',
				'--ystdtb-custom-heading-after-bg-color-rgb'  => 'rgb(255,255,255)',
				'--ystdtb-custom-heading-after-bg-color-rgba' => 'rgba(255,255,255,var(--ystdtb-custom-heading-after-bg-color-rbga-opacity,1))',
			],
		];
		$this->assertEquals( $expected, \ystandard_toolbox\Util\Styles::parse_styles_pseudo_elements( $input, 'after' ) );
	}

	function test_parse_styles_pseudo_elements_base() {
		$input = [
			'fontSize'        => [
				'desktop' => '16px',
			],
			'color'           => '#222222',
			'backgroundColor' => '#ffffff',
			'margin'          => [
				'desktop' => [
					'top'    => '10px',
					'bottom' => '20px',
				],
				'tablet'  => [
					'top'    => '11px',
					'bottom' => '21px',
				],
			],
		];

		$expected = [
			'desktop' => [
				'content'                                      => '""',
				'font-size'                                    => '16px',
				'color'                                        => '#222222',
				'--ystdtb-custom-heading-before-color'         => '#222222',
				'--ystdtb-custom-heading-before-color-rgb'     => 'rgb(34,34,34)',
				'--ystdtb-custom-heading-before-color-rgba'    => 'rgba(34,34,34,var(--ystdtb-custom-heading-before-color-rbga-opacity,1))',
				'background-color'                             => '#ffffff',
				'--ystdtb-custom-heading-before-bg-color'      => '#ffffff',
				'--ystdtb-custom-heading-before-bg-color-rgb'  => 'rgb(255,255,255)',
				'--ystdtb-custom-heading-before-bg-color-rgba' => 'rgba(255,255,255,var(--ystdtb-custom-heading-before-bg-color-rbga-opacity,1))',
				'margin-top'                                   => '10px',
				'margin-bottom'                                => '20px',
			],
			'tablet'  => [
				'margin-top'    => '11px',
				'margin-bottom' => '21px',
			],
		];
		$this->assertEquals( $expected, \ystandard_toolbox\Util\Styles::parse_styles_pseudo_elements( $input, 'before' ) );
	}
}
