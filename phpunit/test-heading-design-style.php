<?php

class Heading_Design_Style_Test extends WP_UnitTestCase {

	public function test_parse_style_font_family() {
		$input    = [
			'fontFamily' => "'Noto Sans JP', sans-serif",
		];
		$expected = [
			'desktop' => [
				'font-family' => "'Noto Sans JP', sans-serif",
			],
		];
		$this->assertEquals( $expected, \ystandard_toolbox\Util\Styles::parse_styles( $input ) );
	}

	public function test_parse_style_flex_direction() {
		$input    = [
			'flexDirection' => 'row'
		];
		$expected = [
			'desktop' => [
				'flex-direction' => 'row',
			],
		];
		$this->assertEquals( $expected, \ystandard_toolbox\Util\Styles::parse_styles( $input ) );

		$input    = [
			'flexDirection' => 'column-reverse'
		];
		$expected = [
			'desktop' => [
				'flex-direction' => 'column-reverse',
			],
		];
		$this->assertEquals( $expected, \ystandard_toolbox\Util\Styles::parse_styles( $input ) );


	}

	public function test_parse_style_gap() {
		$input    = [
			'gap' => [
				'desktop' => '10px',
			],
		];
		$expected = [
			'desktop' => [
				'gap' => '10px',
			],
		];
		$this->assertEquals( $expected, \ystandard_toolbox\Util\Styles::parse_styles( $input ) );

		$input    = [
			'gap' => [
				'desktop' => '10px',
				'tablet'  => '20px',
				'mobile'  => '30px',
			],
		];
		$expected = [
			'desktop' => [
				'gap' => '10px',
			],
			'tablet'  => [
				'gap' => '20px',
			],
			'mobile'  => [
				'gap' => '30px',
			],
		];
		$this->assertEquals( $expected, \ystandard_toolbox\Util\Styles::parse_styles( $input ) );


	}

	public function test_parse_style_display() {
		$input    = [
			'display' => 'block',
		];
		$expected = [
			'desktop' => [
				'display' => 'block',
			],
		];
		$this->assertEquals( $expected, \ystandard_toolbox\Util\Styles::parse_styles( $input ) );

		$input    = [
			'display' => 'flex',
		];
		$expected = [
			'desktop' => [
				'display' => 'flex',
			],
		];
		$this->assertEquals( $expected, \ystandard_toolbox\Util\Styles::parse_styles( $input ) );

		$input    = [
			'display' => 'inline-flex',
		];
		$expected = [
			'desktop' => [
				'display' => 'inline-flex',
			],
		];
		$this->assertEquals( $expected, \ystandard_toolbox\Util\Styles::parse_styles( $input ) );
	}

	public function test_parse_style_height_min_height_responsive() {
		$input    = [
			'height'    => [
				'desktop' => '100px',
				'tablet'  => '200em',
				'mobile'  => '300vw',
			],
			'minHeight' => [
				'desktop' => '120em',
				'tablet'  => '220vw',
				'mobile'  => '320px',
			],
			'maxHeight' => [
				'desktop' => '130rem',
				'tablet'  => '230vh',
				'mobile'  => '330ch',
			],
		];
		$expected = [
			'desktop' => [
				'height'     => '100px',
				'min-height' => '120em',
				'max-height' => '130rem',
			],
			'tablet'  => [
				'height'     => '200em',
				'min-height' => '220vw',
				'max-height' => '230vh',
			],
			'mobile'  => [
				'height'     => '300vw',
				'min-height' => '320px',
				'max-height' => '330ch',
			],
		];
		$this->assertEquals( $expected, \ystandard_toolbox\Util\Styles::parse_styles( $input ) );
	}

	public function test_parse_style_height_min_height() {
		$input    = [
			'height'    => [
				'desktop' => '100px',
			],
			'minHeight' => [
				'desktop' => '120em',
			],
			'maxHeight' => [
				'desktop' => '130rem',
			],
		];
		$expected = [
			'desktop' => [
				'height'     => '100px',
				'min-height' => '120em',
				'max-height' => '130rem',
			],
		];
		$this->assertEquals( $expected, \ystandard_toolbox\Util\Styles::parse_styles( $input ) );
	}

	public function test_parse_style_width_min_width_responsive() {
		$input    = [
			'width'    => [
				'desktop' => '100px',
				'tablet'  => '200em',
				'mobile'  => '300vw',
			],
			'minWidth' => [
				'desktop' => '120em',
				'tablet'  => '220vw',
				'mobile'  => '320px',
			],
			'maxWidth' => [
				'desktop' => '130rem',
				'tablet'  => '230vh',
				'mobile'  => '330ch',
			],
		];
		$expected = [
			'desktop' => [
				'width'     => '100px',
				'min-width' => '120em',
				'max-width' => '130rem',
			],
			'tablet'  => [
				'width'     => '200em',
				'min-width' => '220vw',
				'max-width' => '230vh',
			],
			'mobile'  => [
				'width'     => '300vw',
				'min-width' => '320px',
				'max-width' => '330ch',
			],
		];
		$this->assertEquals( $expected, \ystandard_toolbox\Util\Styles::parse_styles( $input ) );
	}

	public function test_parse_style_width() {
		$input    = [
			'width'    => [
				'desktop' => '100px',
			],
			'minWidth' => [
				'desktop' => '120em',
			],
			'maxWidth' => [
				'desktop' => '130em',
			],
		];
		$expected = [
			'desktop' => [
				'width'     => '100px',
				'min-width' => '120em',
				'max-width' => '130em',
			],
		];
		$this->assertEquals( $expected, \ystandard_toolbox\Util\Styles::parse_styles( $input ) );
	}

	public function test_parse_style_border_radius_responsive() {
		$input    = [
			'borderRadius' => [
				'desktop' => '1em',
				'tablet'  => '0.5vw',
				'mobile'  => '0rem',
			],
		];
		$expected = [
			'desktop' => [
				'border-radius' => '1em',
			],
			'tablet'  => [
				'border-radius' => '0.5vw',
			],
			'mobile'  => [
				'border-radius' => '0rem',
			],
		];
		$this->assertEquals( $expected, \ystandard_toolbox\Util\Styles::parse_styles( $input ) );
	}

	public function test_parse_style_border_radius() {
		$input    = [
			'borderRadius' => [
				'desktop' => '1em',
			],
		];
		$expected = [
			'desktop' => [
				'border-radius' => '1em',
			],
		];
		$this->assertEquals( $expected, \ystandard_toolbox\Util\Styles::parse_styles( $input ) );

		$input    = [
			'borderRadius' => [
				'desktop' => '0vw',
			],
		];
		$expected = [
			'desktop' => [
				'border-radius' => '0vw',
			],
		];
		$this->assertEquals( $expected, \ystandard_toolbox\Util\Styles::parse_styles( $input ) );
	}

	public function test_parse_style_border_zero() {
		$input    = [
			'border' => [
				'desktop' => [
					'top'    => [
						'width' => '10px',
						'style' => 'solid',
						'color' => '#000000',
					],
					'right'  => [
						'width' => '0',
						'style' => 'double',
						'color' => '#111111',
					],
					'bottom' => [
						'width' => '0px',
						'style' => 'dotted',
						'color' => '#222222',
					],
				],
			],
		];
		$expected = [
			'desktop' => [
				'border-top'    => '10px solid #000000',
				'border-right'  => 0,
				'border-bottom' => 0,
			],
		];
		$this->assertEquals( $expected, \ystandard_toolbox\Util\Styles::parse_styles( $input ) );
	}

	public function test_parse_style_border_responsive() {
		$input    = [
			'border' => [
				'desktop' => [
					'top'    => [
						'width' => '10px',
						'style' => 'solid',
						'color' => '#000000',
					],
					'right'  => [
						'width' => '20px',
						'style' => 'double',
						'color' => '#111111',
					],
					'bottom' => [
						'width' => '30px',
						'style' => 'dotted',
						'color' => '#222222',
					],
					'left'   => [
						'width' => '40px',
						'style' => 'dashed',
						'color' => '#333333',
					],
				],
				'tablet'  => [
					'top'    => [
						'width' => '11px',
						'style' => 'dashed',
						'color' => '#000111',
					],
					'right'  => [
						'width' => '22px',
						'style' => 'dotted',
						'color' => '#111222',
					],
					'bottom' => [
						'width' => '33px',
						'style' => 'double',
						'color' => '#222333',
					],
					'left'   => [
						'width' => '44px',
						'style' => 'solid',
						'color' => '#333444',
					],
				],
				'mobile'  => [
					'top'    => [
						'width' => '12px',
						'style' => 'double',
						'color' => '#000222',
					],
					'right'  => [
						'width' => '24px',
						'style' => 'solid',
						'color' => '#111333',
					],
					'bottom' => [
						'width' => '36px',
						'style' => 'dashed',
						'color' => '#222444',
					],
					'left'   => [
						'width' => '48px',
						'style' => 'dotted',
						'color' => '#333555',
					],
				],
			],
		];
		$expected = [
			'desktop' => [
				'border-top'    => '10px solid #000000',
				'border-right'  => '20px double #111111',
				'border-bottom' => '30px dotted #222222',
				'border-left'   => '40px dashed #333333',
			],
			'tablet'  => [
				'border-top'    => '11px dashed #000111',
				'border-right'  => '22px dotted #111222',
				'border-bottom' => '33px double #222333',
				'border-left'   => '44px solid #333444',
			],
			'mobile'  => [
				'border-top'    => '12px double #000222',
				'border-right'  => '24px solid #111333',
				'border-bottom' => '36px dashed #222444',
				'border-left'   => '48px dotted #333555',
			],
		];
		$this->assertEquals( $expected, \ystandard_toolbox\Util\Styles::parse_styles( $input ) );

		$input    = [
			'border' => [
				'desktop' => [
					'top'    => [
						'width' => '10px',
						'style' => 'solid',
						'color' => '#000000',
					],
					'bottom' => [
						'width' => '30px',
						'style' => 'dotted',
						'color' => '#222222',
					],
				],
				'tablet'  => [
					'left'  => [
						'width' => '11px',
						'style' => 'dashed',
						'color' => '#000111',
					],
					'right' => [
						'width' => '33px',
						'style' => 'double',
						'color' => '#222333',
					],
				],
				'mobile'  => [
					'top'  => [
						'width' => '12px',
						'style' => 'double',
						'color' => '#000222',
					],
					'left' => [
						'width' => '36px',
						'style' => 'dashed',
						'color' => '#222444',
					],
				],
			],
		];
		$expected = [
			'desktop' => [
				'border-top'    => '10px solid #000000',
				'border-bottom' => '30px dotted #222222',
			],
			'tablet'  => [
				'border-left'  => '11px dashed #000111',
				'border-right' => '33px double #222333',
			],
			'mobile'  => [
				'border-top'  => '12px double #000222',
				'border-left' => '36px dashed #222444',
			],
		];
		$this->assertEquals( $expected, \ystandard_toolbox\Util\Styles::parse_styles( $input ) );
	}

	public function test_parse_style_border() {
		$input    = [
			'border' => [
				'desktop' => [
					'top'    => [
						'width' => '10px',
						'style' => 'solid',
						'color' => '#000000',
					],
					'right'  => [
						'width' => '20px',
						'style' => 'double',
						'color' => '#111111',
					],
					'bottom' => [
						'width' => '30px',
						'style' => 'dotted',
						'color' => '#222222',
					],
					'left'   => [
						'width' => '40px',
						'style' => 'dashed',
						'color' => '#333333',
					],
				],
			],
		];
		$expected = [
			'desktop' => [
				'border-top'    => '10px solid #000000',
				'border-right'  => '20px double #111111',
				'border-bottom' => '30px dotted #222222',
				'border-left'   => '40px dashed #333333',
			],
		];
		$this->assertEquals( $expected, \ystandard_toolbox\Util\Styles::parse_styles( $input ) );

		$input    = [
			'border' => [
				'desktop' => [
					'top'    => [
						'width' => '10px',
						'style' => 'solid',
						'color' => '#000000',
					],
					'bottom' => [
						'width' => '30px',
						'style' => 'dotted',
						'color' => '#222222',
					],
				],
			],
		];
		$expected = [
			'desktop' => [
				'border-top'    => '10px solid #000000',
				'border-bottom' => '30px dotted #222222',
			],
		];
		$this->assertEquals( $expected, \ystandard_toolbox\Util\Styles::parse_styles( $input ) );
	}

	public function test_parse_style_padding_responsive() {
		$input    = [
			'padding' => [
				'desktop' => [
					'top'    => '10px',
					'right'  => '20px',
					'bottom' => '30px',
					'left'   => '40px',
				],
				'tablet'  => [
					'top'    => '11px',
					'right'  => '21px',
					'bottom' => '31px',
					'left'   => '41px',
				],
				'mobile'  => [
					'top'    => '12px',
					'right'  => '22px',
					'bottom' => '32px',
					'left'   => '42px',
				],
			],
		];
		$expected = [
			'desktop' => [
				'padding-top'    => '10px',
				'padding-right'  => '20px',
				'padding-bottom' => '30px',
				'padding-left'   => '40px',
			],
			'tablet'  => [
				'padding-top'    => '11px',
				'padding-right'  => '21px',
				'padding-bottom' => '31px',
				'padding-left'   => '41px',
			],
			'mobile'  => [
				'padding-top'    => '12px',
				'padding-right'  => '22px',
				'padding-bottom' => '32px',
				'padding-left'   => '42px',
			],
		];
		$this->assertEquals( $expected, \ystandard_toolbox\Util\Styles::parse_styles( $input ) );

		$input    = [
			'padding' => [
				'desktop' => [
					'right' => '20px',
					'left'  => '40px',
				],
				'tablet'  => [
					'top'    => '21px',
					'bottom' => '41px',
				],
				'mobile'  => [
					'top'   => '22px',
					'right' => '42px',
				],
			],
		];
		$expected = [
			'desktop' => [
				'padding-right' => '20px',
				'padding-left'  => '40px',
			],
			'tablet'  => [
				'padding-top'    => '21px',
				'padding-bottom' => '41px',
			],
			'mobile'  => [
				'padding-top'   => '22px',
				'padding-right' => '42px',
			],
		];
		$this->assertEquals( $expected, \ystandard_toolbox\Util\Styles::parse_styles( $input ) );
	}

	public function test_parse_style_padding() {
		$input    = [
			'padding' => [
				'desktop' => [
					'top'    => '10px',
					'right'  => '20px',
					'bottom' => '30px',
					'left'   => '40px',
				],
			],
		];
		$expected = [
			'desktop' => [
				'padding-top'    => '10px',
				'padding-right'  => '20px',
				'padding-bottom' => '30px',
				'padding-left'   => '40px',
			],
		];
		$this->assertEquals( $expected, \ystandard_toolbox\Util\Styles::parse_styles( $input ) );

		$input    = [
			'padding' => [
				'desktop' => [
					'right' => '20px',
					'left'  => '40px',
				],
			],
		];
		$expected = [
			'desktop' => [
				'padding-right' => '20px',
				'padding-left'  => '40px',
			],
		];
		$this->assertEquals( $expected, \ystandard_toolbox\Util\Styles::parse_styles( $input ) );

		$input    = [
			'padding' => [
				'desktop' => [
					'right' => '0',
					'left'  => '0px',
				],
			],
		];
		$expected = [
			'desktop' => [
				'padding-right' => 0,
				'padding-left'  => 0,
			],
		];
		$this->assertEquals( $expected, \ystandard_toolbox\Util\Styles::parse_styles( $input ) );
	}


	public function test_parse_style_margin_responsive() {
		$input    = [
			'margin' => [
				'desktop' => [
					'top'    => '10px',
					'right'  => '20px',
					'bottom' => '30px',
					'left'   => '40px',
				],
				'tablet'  => [
					'top'    => '11px',
					'right'  => '21px',
					'bottom' => '31px',
					'left'   => '41px',
				],
				'mobile'  => [
					'top'    => '12px',
					'right'  => '22px',
					'bottom' => '32px',
					'left'   => '42px',
				],
			],
		];
		$expected = [
			'desktop' => [
				'margin-top'    => '10px',
				'margin-right'  => '20px',
				'margin-bottom' => '30px',
				'margin-left'   => '40px',
			],
			'tablet'  => [
				'margin-top'    => '11px',
				'margin-right'  => '21px',
				'margin-bottom' => '31px',
				'margin-left'   => '41px',
			],
			'mobile'  => [
				'margin-top'    => '12px',
				'margin-right'  => '22px',
				'margin-bottom' => '32px',
				'margin-left'   => '42px',
			],
		];
		$this->assertEquals( $expected, \ystandard_toolbox\Util\Styles::parse_styles( $input ) );

		$input    = [
			'margin' => [
				'desktop' => [
					'right' => '20px',
					'left'  => '40px',
				],
				'tablet'  => [
					'top'    => '21px',
					'bottom' => '41px',
				],
				'mobile'  => [
					'top'   => '22px',
					'right' => '42px',
				],
			],
		];
		$expected = [
			'desktop' => [
				'margin-right' => '20px',
				'margin-left'  => '40px',
			],
			'tablet'  => [
				'margin-top'    => '21px',
				'margin-bottom' => '41px',
			],
			'mobile'  => [
				'margin-top'   => '22px',
				'margin-right' => '42px',
			],
		];
		$this->assertEquals( $expected, \ystandard_toolbox\Util\Styles::parse_styles( $input ) );
	}

	public function test_parse_style_margin() {
		$input    = [
			'margin' => [
				'desktop' => [
					'top'    => '10px',
					'right'  => '20px',
					'bottom' => '30px',
					'left'   => '40px',
				],
			],
		];
		$expected = [
			'desktop' => [
				'margin-top'    => '10px',
				'margin-right'  => '20px',
				'margin-bottom' => '30px',
				'margin-left'   => '40px',
			],
		];
		$this->assertEquals( $expected, \ystandard_toolbox\Util\Styles::parse_styles( $input ) );

		$input    = [
			'margin' => [
				'desktop' => [
					'right' => '20px',
					'left'  => '40px',
				],
			],
		];
		$expected = [
			'desktop' => [
				'margin-right' => '20px',
				'margin-left'  => '40px',
			],
		];
		$this->assertEquals( $expected, \ystandard_toolbox\Util\Styles::parse_styles( $input ) );
	}

	public function test_parse_style_background() {
		$input    = [
			'backgroundColor'    => '#222222',
			'backgroundImage'    => 'https://example.com/image.jpg',
			'backgroundPosition' => 'center center',
			'backgroundRepeat'   => 'no-repeat',
			'backgroundSize'     => 'cover',
		];
		$expected = [
			'desktop' => [
				'background-color'                      => '#222222',
				'background-image'                      => "url('https://example.com/image.jpg')",
				'background-position'                   => 'center center',
				'background-repeat'                     => 'no-repeat',
				'background-size'                       => 'cover',
				'--ystdtb-custom-heading-bg-color'      => '#222222',
				'--ystdtb-custom-heading-bg-color-rgb'  => 'rgb(34,34,34)',
				'--ystdtb-custom-heading-bg-color-rgba' => 'rgba(34,34,34,var(--ystdtb-custom-heading-bg-color-rbga-opacity,1))',
			],
		];
		$this->assertEquals( $expected, \ystandard_toolbox\Util\Styles::parse_styles( $input ) );
	}


	public function test_parse_style_typography_responsive2() {
		$input    = [
			'fontSize'   => [
				'desktop' => '16px',
				'mobile'  => '14px',
			],
			'textAlign'  => [
				'desktop' => 'center',
				'tablet'  => 'left',
			],
			'fontWeight' => [
				'desktop' => 'bold',
			],
		];
		$expected = [
			'desktop' => [
				'font-size'   => '16px',
				'text-align'  => 'center',
				'font-weight' => 'bold',
			],
			'tablet'  => [
				'text-align' => 'left',
			],
			'mobile'  => [
				'font-size' => '14px',
			],
		];
		$this->assertEquals( $expected, \ystandard_toolbox\Util\Styles::parse_styles( $input ) );
	}

	public function test_parse_style_typography_responsive() {
		$input    = [
			'fontSize'   => [
				'desktop' => '16px',
				'tablet'  => '15px',
				'mobile'  => '14px',
			],
			'textAlign'  => [
				'desktop' => 'center',
				'tablet'  => 'left',
				'mobile'  => 'right',
			],
			'fontWeight' => [
				'desktop' => 'bold',
				'tablet'  => '400',
				'mobile'  => '300',
			],
		];
		$expected = [
			'desktop' => [
				'font-size'   => '16px',
				'text-align'  => 'center',
				'font-weight' => 'bold',
			],
			'tablet'  => [
				'font-size'   => '15px',
				'text-align'  => 'left',
				'font-weight' => '400',
			],
			'mobile'  => [
				'font-size'   => '14px',
				'text-align'  => 'right',
				'font-weight' => '300',
			],
		];
		$this->assertEquals( $expected, \ystandard_toolbox\Util\Styles::parse_styles( $input ) );
	}

	public function test_parse_style_typography() {
		$input    = [
			'fontSize'       => [
				'desktop' => '16px',
			],
			'color'          => '#222222',
			'textAlign'      => [
				'desktop' => 'center',
			],
			'fontWeight'     => [
				'desktop' => 'bold',
			],
			'fontStyle'      => 'italic',
			'lineHeight'     => 1.3,
			'letterSpacing'  => '0.05em',
			'textDecoration' => 'underline',
		];
		$expected = [
			'desktop' => [
				'font-size'                          => '16px',
				'color'                              => '#222222',
				'text-align'                         => 'center',
				'font-weight'                        => 'bold',
				'font-style'                         => 'italic',
				'line-height'                        => 1.3,
				'letter-spacing'                     => '0.05em',
				'text-decoration'                    => 'underline',
				'--ystdtb-custom-heading-color'      => '#222222',
				'--ystdtb-custom-heading-color-rgb'  => 'rgb(34,34,34)',
				'--ystdtb-custom-heading-color-rgba' => 'rgba(34,34,34,var(--ystdtb-custom-heading-color-rbga-opacity,1))',
			],
		];
		$this->assertEquals( $expected, \ystandard_toolbox\Util\Styles::parse_styles( $input ) );
	}
}
