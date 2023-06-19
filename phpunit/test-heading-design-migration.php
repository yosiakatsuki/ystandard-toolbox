<?php

class Heading_Design_Migration_Test extends WP_UnitTestCase {

	public function set_up() {
		parent::set_up();
		update_option( 'ystdtb_heading', [ 'hoge' => 'fuga' ] );
		update_option( 'ystdtb_heading_v2', false );
		if ( ! class_exists( '\ystandard_toolbox\Heading_Compatible' ) ) {
			require_once YSTDTB_PATH . '/inc/heading/class-heading-compatible.php';
		}
		if ( ! class_exists( '\ystandard_toolbox\Heading_Migration' ) ) {
			require_once YSTDTB_PATH . '/inc/heading/class-heading-migration.php';
		}
	}

	public function set_option( $value ) {
		update_option( \ystandard_toolbox\Heading_Compatible::OPTION_NAME, $value );
	}

	public function test_icon_type() {
		$option = json_decode( '{
		"preset": "icons",
		"useCustomStyle": "true",
		"fontSizePc": "1.2",
		"fontSizeTablet": "1.2",
		"fontSizeMobile": "1.2",
		"fontSizeUnit": "em",
		"fontColor": "",
		"fontAlign": "",
		"fontWeight": "bold",
		"fontStyle": "normal",
		"fontAdvanced": "false",
		"fontSizeResponsive": "false",
		"fontFamily": "",
		"lineHeight": "1.3",
		"letterSpacing": "0.05",
		"backgroundColor": "",
		"backgroundImage": "",
		"backgroundPosition": "",
		"backgroundRepeat": "",
		"backgroundSize": "",
		"borderTopWidth": "0",
		"borderTopWidthUnit": "px",
		"borderTopStyle": "solid",
		"borderTopColor": "",
		"borderRightWidth": "0",
		"borderRightWidthUnit": "px",
		"borderRightStyle": "solid",
		"borderRightColor": "",
		"borderBottomWidth": "0",
		"borderBottomWidthUnit": "px",
		"borderBottomStyle": "solid",
		"borderBottomColor": "",
		"borderLeftWidth": "0",
		"borderLeftWidthUnit": "px",
		"borderLeftStyle": "solid",
		"borderLeftColor": "",
		"borderRadius": "",
		"paddingTop": "",
		"paddingTopUnit": "em",
		"paddingRight": "",
		"paddingRightUnit": "em",
		"paddingBottom": "",
		"paddingBottomUnit": "em",
		"paddingLeft": "",
		"paddingLeftUnit": "em",
		"marginTop": "",
		"marginTopUnit": "em",
		"marginBottom": "",
		"marginBottomUnit": "em",
		"beforeColorType": "color",
		"beforeIcon": "award",
		"beforeContent": "<svg xmlns=\"http:\/\/www.w3.org\/2000\/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"#CF4747\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" class=\"feather feather-award\" style=\"width:1.3em;height:1.3em;\"><circle cx=\"12\" cy=\"8\" r=\"7\"><\/circle><polyline points=\"8.21 13.89 7 23 12 20 17 23 15.79 13.88\"><\/polyline><\/svg>",
		"beforeSize": "1.3",
		"beforeColor": "#CF4747",
		"afterColorType": "color",
		"afterIcon": "book-open",
		"afterContent": "<svg xmlns=\"http:\/\/www.w3.org\/2000\/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"#64389D\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" class=\"feather feather-book-open\" style=\"width:0.8em;height:0.8em;\"><path d=\"M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z\"><\/path><path d=\"M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z\"><\/path><\/svg>",
		"afterSize": "0.8",
		"afterColor": "#64389D"
	}', true );

		$input = [
			'h1' => $option,
		];

		$this->set_option( $input );
		$heading  = new \ystandard_toolbox\Heading_Migration();
		$v2       = $heading->migration( $data );
		$expected = [
			'v1-h1' => [
				'slug'   => 'v1-h1',
				'label'  => 'v1:h1',
				'enable' => true,
				'style'  => [
					'fontSize'      => [
						'desktop' => '1.2em',
					],
					'fontWeight'    => [
						'desktop' => 'bold',
					],
					'fontStyle'     => 'normal',
					'lineHeight'    => 1.3,
					'letterSpacing' => '0.05em',
					'display'       => 'flex',
					'gap'           => '0.5em',
					'alignItems'    => 'center',
				],
				'before' => [
					'icon' => 'award',
					'content' => '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#CF4747" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-award" style="width:1.3em;height:1.3em;"><circle cx="12" cy="8" r="7"></circle><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline></svg>',
					'fontSize' => [
						'desktop' => '1.3em',
					],
					'color' => '#CF4747',
					'width' => '1.3em',
					'height' => '1.3em',
				],
				'after' => [
					'icon' => 'book-open',
					'content' => '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#64389D" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-book-open" style="width:0.8em;height:0.8em;"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>',
					'fontSize' => [
						'desktop' => '0.8em',
					],
					'color' => '#64389D',
					'width' => '0.8em',
					'height' => '0.8em',
				],
			],
		];
		$this->assertEquals( $expected, $v2 );
	}

	public function test_margin_right_left() {
		$input = [
			'h1' => [
				'preset'           => 'custom',
				'useCustomStyle'   => true,
				'marginTop'        => '',
				'marginTopUnit'    => 'px',
				'marginRight'      => '0',
				'marginRightUnit'  => 'em',
				'marginBottom'     => '',
				'marginBottomUnit' => 'rem',
				'marginLeft'       => '3',
				'marginLeftUnit'   => 'vw',
			],
		];
		$this->set_option( $input );
		$heading  = new \ystandard_toolbox\Heading_Migration();
		$v2       = $heading->migration( $data );
		$expected = [
			'v1-h1' => [
				'slug'   => 'v1-h1',
				'label'  => 'v1:h1',
				'enable' => true,
				'style'  => [
					'margin' => [
						'desktop' => [
							'right' => 0,
							'left'  => '3vw',
						],
					],
				],
			],
		];
		$this->assertEquals( $expected, $v2 );
	}

	public function test_margin_all() {
		$input = [
			'h1' => [
				'preset'           => 'custom',
				'useCustomStyle'   => true,
				'marginTop'        => '0',
				'marginTopUnit'    => 'px',
				'marginRight'      => '1',
				'marginRightUnit'  => 'em',
				'marginBottom'     => '2',
				'marginBottomUnit' => 'rem',
				'marginLeft'       => '3',
				'marginLeftUnit'   => 'vw',
			],
		];
		$this->set_option( $input );
		$heading  = new \ystandard_toolbox\Heading_Migration();
		$v2       = $heading->migration( $data );
		$expected = [
			'v1-h1' => [
				'slug'   => 'v1-h1',
				'label'  => 'v1:h1',
				'enable' => true,
				'style'  => [
					'margin' => [
						'desktop' => [
							'top'    => 0,
							'right'  => '1em',
							'bottom' => '2rem',
							'left'   => '3vw',
						],
					],
				],
			],
		];
		$this->assertEquals( $expected, $v2 );
	}

	public function test_padding_top_bottom() {
		$input = [
			'h1' => [
				'preset'            => 'custom',
				'useCustomStyle'    => true,
				'paddingTop'        => '1',
				'paddingTopUnit'    => 'px',
				'paddingRight'      => '',
				'paddingRightUnit'  => 'em',
				'paddingBottom'     => '3',
				'paddingBottomUnit' => 'rem',
				'paddingLeft'       => '',
				'paddingLeftUnit'   => 'vw',
			],
		];
		$this->set_option( $input );
		$heading  = new \ystandard_toolbox\Heading_Migration();
		$v2       = $heading->migration( $data );
		$expected = [
			'v1-h1' => [
				'slug'   => 'v1-h1',
				'label'  => 'v1:h1',
				'enable' => true,
				'style'  => [
					'padding' => [
						'desktop' => [
							'top'    => '1px',
							'bottom' => '3rem',
						],
					],
				],
			],
		];
		$this->assertEquals( $expected, $v2 );
	}


	public function test_padding_all() {
		$input = [
			'h1' => [
				'preset'            => 'custom',
				'useCustomStyle'    => true,
				'paddingTop'        => '0',
				'paddingTopUnit'    => 'px',
				'paddingRight'      => '2',
				'paddingRightUnit'  => 'em',
				'paddingBottom'     => '3',
				'paddingBottomUnit' => 'rem',
				'paddingLeft'       => '4',
				'paddingLeftUnit'   => 'vw',
			],
		];
		$this->set_option( $input );
		$heading  = new \ystandard_toolbox\Heading_Migration();
		$v2       = $heading->migration( $data );
		$expected = [
			'v1-h1' => [
				'slug'   => 'v1-h1',
				'label'  => 'v1:h1',
				'enable' => true,
				'style'  => [
					'padding' => [
						'desktop' => [
							'top'    => 0,
							'right'  => '2em',
							'bottom' => '3rem',
							'left'   => '4vw',
						],
					],
				],
			],
		];
		$this->assertEquals( $expected, $v2 );
	}


	public function test_border_top_bottom() {
		$input = [
			'h1' => [
				'preset'                => 'custom',
				'useCustomStyle'        => true,
				'borderTopWidth'        => 1,
				'borderTopWidthUnit'    => 'px',
				'borderTopStyle'        => 'solid',
				'borderTopColor'        => '#aaaaaa',
				'borderRightWidth'      => 0,
				'borderRightWidthUnit'  => 'em',
				'borderRightStyle'      => 'dotted',
				'borderRightColor'      => '',
				'borderBottomWidth'     => 3,
				'borderBottomWidthUnit' => 'vw',
				'borderBottomStyle'     => 'dashed',
				'borderBottomColor'     => '#222222',
				'borderLeftWidth'       => 0,
				'borderLeftWidthUnit'   => 'vh',
				'borderLeftStyle'       => 'double',
				'borderLeftColor'       => '',
			],
		];
		$this->set_option( $input );
		$heading  = new \ystandard_toolbox\Heading_Migration();
		$v2       = $heading->migration( $data );
		$expected = [
			'v1-h1' => [
				'slug'   => 'v1-h1',
				'label'  => 'v1:h1',
				'enable' => true,
				'style'  => [
					'border' => [
						'desktop' => [
							'top'    => [
								'width' => '1px',
								'style' => 'solid',
								'color' => '#aaaaaa',
							],
							'bottom' => [
								'width' => '3vw',
								'style' => 'dashed',
								'color' => '#222222',
							],
						],
					],
				],
			],
		];
		$this->assertEquals( $expected, $v2 );
	}


	public function test_border_all() {
		$input = [
			'h1' => [
				'preset'                => 'custom',
				'useCustomStyle'        => true,
				'borderTopWidth'        => 1,
				'borderTopWidthUnit'    => 'px',
				'borderTopStyle'        => 'solid',
				'borderTopColor'        => '#aaaaaa',
				'borderRightWidth'      => 2,
				'borderRightWidthUnit'  => 'em',
				'borderRightStyle'      => 'dotted',
				'borderRightColor'      => '#111111',
				'borderBottomWidth'     => 3,
				'borderBottomWidthUnit' => 'vw',
				'borderBottomStyle'     => 'dashed',
				'borderBottomColor'     => '#222222',
				'borderLeftWidth'       => 4,
				'borderLeftWidthUnit'   => 'vh',
				'borderLeftStyle'       => 'double',
				'borderLeftColor'       => '#333333',
			],
		];
		$this->set_option( $input );
		$heading  = new \ystandard_toolbox\Heading_Migration();
		$v2       = $heading->migration( $data );
		$expected = [
			'v1-h1' => [
				'slug'   => 'v1-h1',
				'label'  => 'v1:h1',
				'enable' => true,
				'style'  => [
					'border' => [
						'desktop' => [
							'top'    => [
								'width' => '1px',
								'style' => 'solid',
								'color' => '#aaaaaa',
							],
							'right'  => [
								'width' => '2em',
								'style' => 'dotted',
								'color' => '#111111',
							],
							'bottom' => [
								'width' => '3vw',
								'style' => 'dashed',
								'color' => '#222222',
							],
							'left'   => [
								'width' => '4vh',
								'style' => 'double',
								'color' => '#333333',
							],
						],
					],
				],
			],
		];
		$this->assertEquals( $expected, $v2 );
	}

	public function test_background() {
		$input = [
			'h1' => [
				'preset'             => 'custom',
				'useCustomStyle'     => true,
				'backgroundColor'    => '#fafafa',
				'backgroundImage'    => 'https://example.com/image.jpg',
				'backgroundPosition' => 'center center',
				'backgroundRepeat'   => 'no-repeat',
				'backgroundSize'     => 'cover',
			],
		];
		$this->set_option( $input );
		$heading  = new \ystandard_toolbox\Heading_Migration();
		$v2       = $heading->migration( $data );
		$expected = [
			'v1-h1' => [
				'slug'   => 'v1-h1',
				'label'  => 'v1:h1',
				'enable' => true,
				'style'  => [
					"backgroundColor"    => "#fafafa",
					"backgroundImage"    => "url('https://example.com/image.jpg')",
					"backgroundPosition" => "center center",
					"backgroundRepeat"   => "no-repeat",
					"backgroundSize"     => "cover",
				],
			],
		];
		$this->assertEquals( $expected, $v2 );
	}

	public function test_typography_responsive() {
		$input = [
			'h1' => [
				'preset'             => 'custom',
				'useCustomStyle'     => true,
				'fontSizePc'         => '14',
				'fontSizeTablet'     => '15',
				'fontSizeMobile'     => '16',
				'fontSizeUnit'       => 'px',
				'fontSizeResponsive' => true,
			],
		];
		$this->set_option( $input );
		$heading  = new \ystandard_toolbox\Heading_Migration();
		$v2       = $heading->migration( $data );
		$expected = [
			'v1-h1' => [
				'slug'   => 'v1-h1',
				'label'  => 'v1:h1',
				'enable' => true,
				'style'  => [
					"fontSize" => [
						"desktop" => "14px",
						"tablet"  => "15px",
						"mobile"  => "16px",
					],
				],
			],
		];
		$this->assertEquals( $expected, $v2 );
	}

	public function test_typography_basic() {
		$input = [
			'h1' => [
				'preset'             => 'custom',
				'useCustomStyle'     => true,
				'fontSizePc'         => '1.4',
				'fontSizeTablet'     => '1.4',
				'fontSizeMobile'     => '1.4',
				'fontSizeUnit'       => 'em',
				'fontColor'          => '#222222',
				'fontAlign'          => 'center',
				'fontWeight'         => 'bold',
				'fontStyle'          => 'normal',
				'fontAdvanced'       => false,
				'fontSizeResponsive' => false,
				'fontFamily'         => '\'Noto Sans JP\', sans-serif',
				'lineHeight'         => '1.3',
				'letterSpacing'      => '0.05',
			],
		];
		$this->set_option( $input );
		$heading  = new \ystandard_toolbox\Heading_Migration();
		$v2       = $heading->migration( $data );
		$expected = [
			'v1-h1' => [
				'slug'   => 'v1-h1',
				'label'  => 'v1:h1',
				'enable' => true,
				'style'  => [
					"fontSize"      => [
						"desktop" => "1.4em",
					],
					"color"         => "#222222",
					"textAlign"     => [
						"desktop" => "center",
					],
					"fontWeight"    => [
						"desktop" => "bold",
					],
					"fontStyle"     => "normal",
					"fontFamily"    => "'Noto Sans JP', sans-serif",
					"lineHeight"    => "1.3",
					"letterSpacing" => "0.05em",
				],
			],
		];
		$this->assertEquals( $expected, $v2 );
	}

	public function test_preset_icons() {
		$input = [
			'h1' => [
				'preset'         => 'icons',
				'useCustomStyle' => false,
			],
		];
		$this->set_option( $input );
		$heading  = new \ystandard_toolbox\Heading_Migration();
		$v2       = $heading->migration( $data );
		$expected = [
			'v1-h1' => [
				'slug'   => 'v1-h1',
				'label'  => 'v1:h1',
				'enable' => false,
				'style'  => [
					"display"    => "flex",
					"gap"        => "0.5em",
					"alignItems" => "center",
				],
				'before' => [
					'fontSize' => [
						'desktop' => '1.2em',
					],
					'content'  => '""',
					'height'   => '1.2em',
					'width'    => '1.2em',
					'icon'     => 'award',
				],
			],
		];
		$this->assertEquals( $expected, $v2 );
	}

	public function test_preset_balloon() {
		$input = [
			'h1' => [
				'preset'         => 'balloon',
				'useCustomStyle' => false,
			],
		];
		$this->set_option( $input );
		$heading  = new \ystandard_toolbox\Heading_Migration();
		$v2       = $heading->migration( $data );
		$expected = [
			'v1-h1' => [
				'slug'   => 'v1-h1',
				'label'  => 'v1:h1',
				'enable' => false,
				'style'  => [
					"backgroundColor" => "#d4e7f2",
					'padding'         => [
						'desktop' => [
							"top"    => "0.5em",
							"right"  => "0.7em",
							"bottom" => "0.5em",
							"left"   => "0.7em",
						],
					],
					"position"        => "relative",
				],
				'after'  => [
					'border'   => [
						'desktop' => [
							"top"    => [
								"width" => "0.9em",
								"style" => "solid",
								"color" => "var(--ystdtb-custom-header-after-bg-color,var(--ystdtb-custom-header-bg-color))",
							],
							"right"  => [
								"width" => "0.9em",
								"style" => "solid",
								"color" => "transparent",
							],
							"bottom" => [
								"width" => "0.9em",
								"style" => "solid",
								"color" => "transparent",
							],
							"left"   => [
								"width" => "0.9em",
								"style" => "solid",
								"color" => "transparent",
							],
						],
					],
					'height'   => 0,
					'width'    => 0,
					'position' => 'absolute',
					'top'      => '100%',
					'left'     => '1.5em',
				],
			],
		];
		$this->assertEquals( $expected, $v2 );
	}

	public function test_preset_after() {
		$input = [
			'h1' => [
				'preset'         => 'double-border-bottom',
				'useCustomStyle' => false,
			],
		];
		$this->set_option( $input );
		$heading  = new \ystandard_toolbox\Heading_Migration();
		$v2       = $heading->migration( $data );
		$expected = [
			'v1-h1' => [
				'slug'   => 'v1-h1',
				'label'  => 'v1:h1',
				'enable' => false,
				'style'  => [
					'border'   => [
						'desktop' => [
							'bottom' => [
								'width' => '2px',
								'style' => 'solid',
								'color' => '#eeeeee',
							],
						],
					],
					'padding'  => [
						'desktop' => [
							'bottom' => '0.5em',
						],
					],
					'position' => 'relative',
				],
				'after'  => [
					'content'         => '""',
					'height'          => '2px',
					'width'           => '3em',
					'position'        => 'absolute',
					'top'             => '100%',
					'left'            => '0',
					'backgroundColor' => '#222222',
				],
			],
		];
		$this->assertEquals( $expected, $v2 );
	}

	public function test_preset() {
		$input = [
			'h1' => [
				'preset'         => 'border-bottom',
				'useCustomStyle' => false,
			],
		];
		$this->set_option( $input );
		$heading  = new \ystandard_toolbox\Heading_Migration();
		$v2       = $heading->migration( $data );
		$expected = [
			'v1-h1' => [
				'slug'   => 'v1-h1',
				'label'  => 'v1:h1',
				'enable' => false,
				'style'  => [
					'border'  => [
						'desktop' => [
							'bottom' => [
								'width' => '1px',
								'style' => 'solid',
								'color' => '#222222',
							],
						],
					],
					'padding' => [
						'desktop' => [
							'bottom' => '0.5em',
						],
					],
				],
			],
		];
		$this->assertEquals( $expected, $v2 );
	}

	public function test_basic_name() {
		$input = [
			'sidebar'       => [
				'preset'         => 'custom',
				'useCustomStyle' => false,
			],
			'footer'        => [
				'preset'         => 'custom',
				'useCustomStyle' => true,
			],
			'post-title'    => [
				'preset'         => 'custom',
				'useCustomStyle' => true,
			],
			'page-title'    => [
				'preset'         => 'custom',
				'useCustomStyle' => true,
			],
			'archive-title' => [
				'preset'         => 'custom',
				'useCustomStyle' => true,
			],
		];
		$this->set_option( $input );
		$heading  = new \ystandard_toolbox\Heading_Migration();
		$v2       = $heading->migration( $data );
		$expected = [
			'v1-sidebar'       => [
				'slug'   => 'v1-sidebar',
				'label'  => 'v1:サイドバー',
				'enable' => false,
				'style'  => [],
			],
			'v1-footer'        => [
				'slug'   => 'v1-footer',
				'label'  => 'v1:フッター',
				'enable' => true,
				'style'  => [],
			],
			'v1-post-title'    => [
				'slug'   => 'v1-post-title',
				'label'  => 'v1:投稿タイトル',
				'enable' => true,
				'style'  => [],
			],
			'v1-page-title'    => [
				'slug'   => 'v1-page-title',
				'label'  => 'v1:固定ページタイトル',
				'enable' => true,
				'style'  => [],
			],
			'v1-archive-title' => [
				'slug'   => 'v1-archive-title',
				'label'  => 'v1:一覧ページタイトル',
				'enable' => true,
				'style'  => [],
			],
		];
		$this->assertEquals( $expected, $v2 );
	}

	public function test_basic() {
		$input = [
			'h1' => [
				'preset'         => 'custom',
				'useCustomStyle' => false,
			],
			'h2' => [
				'preset'         => 'custom',
				'useCustomStyle' => true,
			],
		];
		$this->set_option( $input );
		$heading  = new \ystandard_toolbox\Heading_Migration();
		$v2       = $heading->migration( $data );
		$expected = [
			'v1-h1' => [
				'slug'   => 'v1-h1',
				'label'  => 'v1:h1',
				'enable' => false,
				'style'  => [],
			],
			'v1-h2' => [
				'slug'   => 'v1-h2',
				'label'  => 'v1:h2',
				'enable' => true,
				'style'  => [],
			],
		];
		$this->assertEquals( $expected, $v2 );
	}
}
