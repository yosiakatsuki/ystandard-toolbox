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
