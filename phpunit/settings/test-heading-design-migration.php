<?php

class Settings_Heading_Design_Migration_Test extends WP_UnitTestCase {

	public function set_up() {
		parent::set_up();
		// v2 設定はマイグレーション前提として常に未設定状態にする.
		update_option( 'ystdtb_heading_v2', false );
		if ( ! class_exists( '\ystandard_toolbox\Heading_Compatible' ) ) {
			require_once YSTDTB_PATH . '/inc/heading/class-heading-compatible.php';
		}
		if ( ! class_exists( '\ystandard_toolbox\Heading_Migration' ) ) {
			require_once YSTDTB_PATH . '/inc/heading/class-heading-migration.php';
		}
	}

	/**
	 * v1 設定を保存するヘルパ.
	 *
	 * @param array $value v1 設定値.
	 */
	private function set_v1_option( $value ) {
		update_option( \ystandard_toolbox\Heading_Compatible::OPTION_NAME, $value );
	}

	/**
	 * preset:icons でアイコンタイプの疑似要素設定が v2 に正しく移行される.
	 */
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

		$this->set_v1_option( $input );
		$data    = [];
		$heading = new \ystandard_toolbox\Heading_Migration();
		$v2      = $heading->migration( $data );
		$expected = [
			'v1-h1' => [
				'slug'   => 'v1-h1',
				'label'  => 'v1:h1',
				'style'  => [
					'fontSize'      => [
						'desktop' => '1.2em',
					],
					'fontWeight'    => 'bold',
					'fontStyle'     => 'normal',
					'lineHeight'    => 1.3,
					'letterSpacing' => '0.05em',
					'display'       => 'flex',
					'gap'           => '0.5em',
					'alignItems'    => 'center',
				],
				'before' => [
					'enable' => true,
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
					'enable' => true,
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

	/**
	 * margin の一部の方向のみ指定された場合、指定方向のみが v2 に出力される.
	 */
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
		$this->set_v1_option( $input );
		$data    = [];
		$heading = new \ystandard_toolbox\Heading_Migration();
		$v2      = $heading->migration( $data );
		$expected = [
			'v1-h1' => [
				'slug'   => 'v1-h1',
				'label'  => 'v1:h1',
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

	/**
	 * margin の全方向（top/right/bottom/left）が v2 に正しく移行される.
	 */
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
		$this->set_v1_option( $input );
		$data    = [];
		$heading = new \ystandard_toolbox\Heading_Migration();
		$v2      = $heading->migration( $data );
		$expected = [
			'v1-h1' => [
				'slug'   => 'v1-h1',
				'label'  => 'v1:h1',
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

	/**
	 * padding の一部の方向のみ指定された場合、指定方向のみが v2 に出力される.
	 */
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
		$this->set_v1_option( $input );
		$data    = [];
		$heading = new \ystandard_toolbox\Heading_Migration();
		$v2      = $heading->migration( $data );
		$expected = [
			'v1-h1' => [
				'slug'   => 'v1-h1',
				'label'  => 'v1:h1',
				'style'  => [
					'padding' => [
						'top'    => '1px',
						'bottom' => '3rem',
					],
				],
			],
		];
		$this->assertEquals( $expected, $v2 );
	}


	/**
	 * padding の全方向（top/right/bottom/left）が v2 に正しく移行される.
	 */
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
		$this->set_v1_option( $input );
		$data    = [];
		$heading = new \ystandard_toolbox\Heading_Migration();
		$v2      = $heading->migration( $data );
		$expected = [
			'v1-h1' => [
				'slug'   => 'v1-h1',
				'label'  => 'v1:h1',
				'style'  => [
					'padding' => [
						'top'    => 0,
						'right'  => '2em',
						'bottom' => '3rem',
						'left'   => '4vw',
					],
				],
			],
		];
		$this->assertEquals( $expected, $v2 );
	}


	/**
	 * border の一部の方向のみ指定された場合、指定方向のみが v2 に出力される.
	 */
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
		$this->set_v1_option( $input );
		$data    = [];
		$heading = new \ystandard_toolbox\Heading_Migration();
		$v2      = $heading->migration( $data );
		$expected = [
			'v1-h1' => [
				'slug'   => 'v1-h1',
				'label'  => 'v1:h1',
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


	/**
	 * border の全方向（top/right/bottom/left）が v2 に正しく移行される.
	 */
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
		$this->set_v1_option( $input );
		$data    = [];
		$heading = new \ystandard_toolbox\Heading_Migration();
		$v2      = $heading->migration( $data );
		$expected = [
			'v1-h1' => [
				'slug'   => 'v1-h1',
				'label'  => 'v1:h1',
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

	/**
	 * background 関連の各設定が v2 に正しく移行される.
	 */
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
		$this->set_v1_option( $input );
		$data    = [];
		$heading = new \ystandard_toolbox\Heading_Migration();
		$v2      = $heading->migration( $data );
		$expected = [
			'v1-h1' => [
				'slug'   => 'v1-h1',
				'label'  => 'v1:h1',
				'style'  => [
					"backgroundColor"    => "#fafafa",
					"backgroundImage"    => "https://example.com/image.jpg",
					"backgroundPosition" => "center center",
					"backgroundRepeat"   => "no-repeat",
					"backgroundSize"     => "cover",
				],
			],
		];
		$this->assertEquals( $expected, $v2 );
	}

	/**
	 * フォントサイズのレスポンシブ設定が desktop/tablet/mobile 別に v2 へ移行される.
	 */
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
		$this->set_v1_option( $input );
		$data    = [];
		$heading = new \ystandard_toolbox\Heading_Migration();
		$v2      = $heading->migration( $data );
		$expected = [
			'v1-h1' => [
				'slug'   => 'v1-h1',
				'label'  => 'v1:h1',
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

	/**
	 * 文字関連の基本設定（色・揃え・太さ・行間など）が v2 に正しく移行される.
	 */
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
		$this->set_v1_option( $input );
		$data    = [];
		$heading = new \ystandard_toolbox\Heading_Migration();
		$v2      = $heading->migration( $data );
		$expected = [
			'v1-h1' => [
				'slug'   => 'v1-h1',
				'label'  => 'v1:h1',
				'style'  => [
					"fontSize"      => [
						"desktop" => "1.4em",
					],
					"color"         => "#222222",
					"textAlign"     => "center",
					"fontWeight"    => "bold",
					"fontStyle"     => "normal",
					"fontFamily"    => "'Noto Sans JP', sans-serif",
					"lineHeight"    => "1.3",
					"letterSpacing" => "0.05em",
				],
			],
		];
		$this->assertEquals( $expected, $v2 );
	}

	/**
	 * preset:icons のアイコン設定が疑似要素として v2 に展開される.
	 */
	public function test_preset_icons() {
		$input = [
			'h1' => [
				'preset'         => 'icons',
				'useCustomStyle' => false,
			],
		];
		$this->set_v1_option( $input );
		$data    = [];
		$heading = new \ystandard_toolbox\Heading_Migration();
		$v2      = $heading->migration( $data );
		$expected = [
			'v1-h1' => [
				'slug'   => 'v1-h1',
				'label'  => 'v1:h1',
				'style'  => [
					"display"    => "flex",
					"gap"        => "0.5em",
					"alignItems" => "center",
				],
				'before' => [
					'enable'   => true,
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

	/**
	 * preset:balloon の吹き出し三角（after 疑似要素）が v2 に展開される.
	 */
	public function test_preset_balloon() {
		$input = [
			'h1' => [
				'preset'         => 'balloon',
				'useCustomStyle' => false,
			],
		];
		$this->set_v1_option( $input );
		$data    = [];
		$heading = new \ystandard_toolbox\Heading_Migration();
		$v2      = $heading->migration( $data );
		$expected = [
			'v1-h1' => [
				'slug'   => 'v1-h1',
				'label'  => 'v1:h1',
				'style'  => [
					"backgroundColor" => "#d4e7f2",
					'padding'         => [
						"top"    => "0.5em",
						"right"  => "0.7em",
						"bottom" => "0.5em",
						"left"   => "0.7em",
					],
					"position"        => "relative",
				],
				'after'  => [
					'border'   => [
						'desktop' => [
							"top"    => [
								"width" => "0.9em",
								"style" => "solid",
								"color" => "#d4e7f2",
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
					'height'   => '0',
					'width'    => '0',
					'position' => 'absolute',
					'top'      => '100%',
					'left'     => '1.5em',
				],
			],
		];
		$this->assertEquals( $expected, $v2 );
	}

	/**
	 * preset:double-border-bottom の after 疑似要素（下線2種類目）が v2 に展開される.
	 */
	public function test_preset_after() {
		$input = [
			'h1' => [
				'preset'         => 'double-border-bottom',
				'useCustomStyle' => false,
			],
		];
		$this->set_v1_option( $input );
		$data    = [];
		$heading = new \ystandard_toolbox\Heading_Migration();
		$v2      = $heading->migration( $data );
		$expected = [
			'v1-h1' => [
				'slug'   => 'v1-h1',
				'label'  => 'v1:h1',
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
						'bottom' => '0.5em',
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

	/**
	 * preset:border-bottom（基本プリセット）が v2 にスタイルとして展開される.
	 */
	public function test_preset() {
		$input = [
			'h1' => [
				'preset'         => 'border-bottom',
				'useCustomStyle' => false,
			],
		];
		$this->set_v1_option( $input );
		$data    = [];
		$heading = new \ystandard_toolbox\Heading_Migration();
		$v2      = $heading->migration( $data );
		$expected = [
			'v1-h1' => [
				'slug'   => 'v1-h1',
				'label'  => 'v1:h1',
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
						'bottom' => '0.5em',
					],
				],
			],
		];
		$this->assertEquals( $expected, $v2 );
	}

	/**
	 * 見出しレベル名（sidebar / footer / *-title）が v2 で日本語ラベルに変換される.
	 */
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
		$this->set_v1_option( $input );
		$data    = [];
		$heading = new \ystandard_toolbox\Heading_Migration();
		$v2      = $heading->migration( $data );
		$expected = [
			'v1-sidebar'       => [
				'slug'   => 'v1-sidebar',
				'label'  => 'v1:サイドバー',
				'style'  => [],
			],
			'v1-footer'        => [
				'slug'   => 'v1-footer',
				'label'  => 'v1:フッター',
				'style'  => [],
			],
			'v1-post-title'    => [
				'slug'   => 'v1-post-title',
				'label'  => 'v1:投稿タイトル',
				'style'  => [],
			],
			'v1-page-title'    => [
				'slug'   => 'v1-page-title',
				'label'  => 'v1:固定ページタイトル',
				'style'  => [],
			],
			'v1-archive-title' => [
				'slug'   => 'v1-archive-title',
				'label'  => 'v1:一覧ページタイトル',
				'style'  => [],
			],
		];
		$this->assertEquals( $expected, $v2 );
	}

	/**
	 * 複数レベル（h1, h2）の基本構造（slug / label / 空style）が v2 に正しく作成される.
	 */
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
		$this->set_v1_option( $input );
		$data    = [];
		$heading = new \ystandard_toolbox\Heading_Migration();
		$v2      = $heading->migration( $data );
		$expected = [
			'v1-h1' => [
				'slug'   => 'v1-h1',
				'label'  => 'v1:h1',
				'style'  => [],
			],
			'v1-h2' => [
				'slug'   => 'v1-h2',
				'label'  => 'v1:h2',
				'style'  => [],
			],
		];
		$this->assertEquals( $expected, $v2 );
	}

	/**
	 * useCustomStyle:true のレベルは heading_level マップに登録される（手動割当不要で自動有効化）.
	 */
	public function test_heading_level_mapped_when_use_custom_style_true() {
		$input = [
			'h1' => [ 'preset' => 'custom', 'useCustomStyle' => true ],
		];
		$this->set_v1_option( $input );
		$data    = [];
		$heading = new \ystandard_toolbox\Heading_Migration();
		$heading->migration( $data );
		$this->assertEquals( [ 'h1' => 'v1-h1' ], $data['level'] );
	}

	/**
	 * useCustomStyle:false のレベルは heading_level マップに登録されない（手動割当待ち）.
	 */
	public function test_heading_level_not_mapped_when_use_custom_style_false() {
		$input = [
			'h1' => [ 'preset' => 'custom', 'useCustomStyle' => false ],
		];
		$this->set_v1_option( $input );
		$data    = [];
		$heading = new \ystandard_toolbox\Heading_Migration();
		$heading->migration( $data );
		$this->assertEquals( [], $data['level'] );
	}

	/**
	 * useCustomStyle が文字列 "true" / "false" でも boolean として正しく解釈される.
	 */
	public function test_heading_level_with_string_boolean() {
		$input = [
			'h1' => [ 'preset' => 'custom', 'useCustomStyle' => 'true' ],
			'h2' => [ 'preset' => 'custom', 'useCustomStyle' => 'false' ],
		];
		$this->set_v1_option( $input );
		$data    = [];
		$heading = new \ystandard_toolbox\Heading_Migration();
		$heading->migration( $data );
		$this->assertEquals( [ 'h1' => 'v1-h1' ], $data['level'] );
	}

	/**
	 * 複数レベル混在で useCustomStyle:true のものだけが heading_level マップに登録される.
	 */
	public function test_heading_level_mixed() {
		$input = [
			'h1' => [ 'preset' => 'custom', 'useCustomStyle' => true ],
			'h2' => [ 'preset' => 'custom', 'useCustomStyle' => false ],
			'h3' => [ 'preset' => 'custom', 'useCustomStyle' => true ],
		];
		$this->set_v1_option( $input );
		$data    = [];
		$heading = new \ystandard_toolbox\Heading_Migration();
		$heading->migration( $data );
		$this->assertEquals(
			[
				'h1' => 'v1-h1',
				'h3' => 'v1-h3',
			],
			$data['level']
		);
	}

	/**
	 * migration() の参照引数 $data に v1 / v2 / level の3キーが書き込まれる.
	 */
	public function test_migration_writes_to_data_reference() {
		$input = [
			'h1' => [ 'preset' => 'custom', 'useCustomStyle' => true ],
		];
		$this->set_v1_option( $input );
		$data    = [];
		$heading = new \ystandard_toolbox\Heading_Migration();
		$v2      = $heading->migration( $data );

		// v1 が参照引数経由で保持される.
		$this->assertEquals( $input, $data['v1'] );
		// v2 は戻り値と一致する.
		$this->assertEquals( $v2, $data['v2'] );
		// level マップが書き込まれる.
		$this->assertEquals( [ 'h1' => 'v1-h1' ], $data['level'] );
	}

	/**
	 * api_route() がパラメータ不正（migration キーなし）でエラー応答を返す.
	 */
	public function test_api_route_invalid_param() {
		$request = new \WP_REST_Request();
		$request->set_body( wp_json_encode( [ 'foo' => 'bar' ] ) );
		$request->set_header( 'content-type', 'application/json' );

		$heading  = new \ystandard_toolbox\Heading_Migration();
		$response = $heading->api_route( $request );
		$body     = $response->get_data();

		$this->assertEquals( \ystandard_toolbox\Api::STATUS_ERROR, $body['status'] );
	}

	/**
	 * api_route() が migration:false のときエラー応答を返す.
	 */
	public function test_api_route_migration_false() {
		$request = new \WP_REST_Request();
		$request->set_body( wp_json_encode( [ 'migration' => false ] ) );
		$request->set_header( 'content-type', 'application/json' );

		$heading  = new \ystandard_toolbox\Heading_Migration();
		$response = $heading->api_route( $request );
		$body     = $response->get_data();

		$this->assertEquals( \ystandard_toolbox\Api::STATUS_ERROR, $body['status'] );
	}

	/**
	 * api_route() が migration:true で v1 設定を v2 / level option に書き込み、成功応答を返す.
	 *
	 * 両方の保存に成功した場合は v1 設定（ystdtb_heading）が削除されることも検証する.
	 */
	public function test_api_route_success() {
		$input = [
			'h1' => [ 'preset' => 'custom', 'useCustomStyle' => true ],
		];
		$this->set_v1_option( $input );

		$request = new \WP_REST_Request();
		$request->set_body( wp_json_encode( [ 'migration' => true ] ) );
		$request->set_header( 'content-type', 'application/json' );

		$heading  = new \ystandard_toolbox\Heading_Migration();
		$response = $heading->api_route( $request );
		$body     = $response->get_data();

		$this->assertEquals( \ystandard_toolbox\Api::STATUS_SUCCESS, $body['status'] );
		// v2 設定が保存されている.
		$this->assertArrayHasKey( 'v1-h1', get_option( \ystandard_toolbox\Heading::OPTION_MAIN ) );
		// level マップが保存されている.
		$this->assertEquals(
			[ 'h1' => 'v1-h1' ],
			get_option( \ystandard_toolbox\Heading::OPTION_LEVEL )
		);
		// v1 設定（ystdtb_heading）は削除されている.
		$this->assertFalse(
			get_option( \ystandard_toolbox\Heading_Compatible::OPTION_NAME )
		);
	}

	/**
	 * v1 設定が未保存（option 未登録）の場合、migration() は空配列を返す.
	 */
	public function test_migration_with_empty_v1() {
		delete_option( \ystandard_toolbox\Heading_Compatible::OPTION_NAME );
		$data    = [];
		$heading = new \ystandard_toolbox\Heading_Migration();
		$v2      = $heading->migration( $data );
		$this->assertEquals( [], $v2 );
	}

	/**
	 * v1 設定が空配列の場合、migration() は空配列を返す.
	 */
	public function test_migration_with_empty_array_v1() {
		$this->set_v1_option( [] );
		$data    = [];
		$heading = new \ystandard_toolbox\Heading_Migration();
		$v2      = $heading->migration( $data );
		$this->assertEquals( [], $v2 );
	}

	/**
	 * borderRadius は px 単位を付加されて単一値で v2 へ移行される.
	 */
	public function test_border_radius() {
		$input = [
			'h1' => [
				'preset'         => 'custom',
				'useCustomStyle' => true,
				'borderRadius'   => '5',
			],
		];
		$this->set_v1_option( $input );
		$data    = [];
		$heading = new \ystandard_toolbox\Heading_Migration();
		$v2      = $heading->migration( $data );

		$this->assertEquals( '5px', $v2['v1-h1']['style']['borderRadius'] );
	}

	/**
	 * preset 値に含まれる旧プロパティ名 --ystdtb-custom-header-* が --ystdtb-custom-heading-* に置換される.
	 *
	 * library/ystandard-toolbox-heading/preset.json の stitch プリセット boxShadow に旧名が含まれる.
	 */
	public function test_custom_property_rename() {
		$input = [
			'h1' => [
				'preset'         => 'stitch',
				'useCustomStyle' => true,
			],
		];
		$this->set_v1_option( $input );
		$data    = [];
		$heading = new \ystandard_toolbox\Heading_Migration();
		$v2      = $heading->migration( $data );

		$box_shadow = $v2['v1-h1']['style']['boxShadow'] ?? '';
		$this->assertStringContainsString( '--ystdtb-custom-heading', $box_shadow );
		$this->assertStringNotContainsString( '--ystdtb-custom-header', $box_shadow );
	}

	/**
	 * 同一の v1 設定に対して migration() を 2 回実行しても結果が一致する（冪等性）.
	 */
	public function test_migration_is_idempotent() {
		$input = [
			'h1' => [ 'preset' => 'border-bottom', 'useCustomStyle' => true ],
		];
		$this->set_v1_option( $input );

		$heading = new \ystandard_toolbox\Heading_Migration();

		$data_first = [];
		$v2_first   = $heading->migration( $data_first );

		$data_second = [];
		$v2_second   = $heading->migration( $data_second );

		$this->assertEquals( $v2_first, $v2_second );
		$this->assertEquals( $data_first['level'], $data_second['level'] );
	}

	/**
	 * ラベル定義表にないレベル名（h7 など）でも v1-{level} スラッグで生成され、ラベルは slug がそのまま使われる.
	 */
	public function test_unknown_level() {
		$input = [
			'h7' => [ 'preset' => 'custom', 'useCustomStyle' => true ],
		];
		$this->set_v1_option( $input );
		$data    = [];
		$heading = new \ystandard_toolbox\Heading_Migration();
		$v2      = $heading->migration( $data );

		$this->assertArrayHasKey( 'v1-h7', $v2 );
		$this->assertEquals( 'v1-h7', $v2['v1-h7']['slug'] );
		$this->assertEquals( 'v1-h7', $v2['v1-h7']['label'] );
	}

	/**
	 * preset:ribbon で afterColor / afterSize のみ指定された場合、
	 * preset 由来の after 定義（吹き出し三角）があるため after.enable=true となる.
	 *
	 * 旧ロジックでは afterContent が空だと enable=false に上書きされていたバグの回帰テスト.
	 */
	public function test_pseudo_elements_enable_with_preset_after_color_only() {
		$input = [
			'h1' => [
				'preset'          => 'ribbon',
				'useCustomStyle'  => true,
				'afterColorType'  => 'color',
				'afterSize'       => '20',
				'afterColor'      => '#aaaaaa',
			],
		];
		$this->set_v1_option( $input );
		$data    = [];
		$heading = new \ystandard_toolbox\Heading_Migration();
		$v2      = $heading->migration( $data );

		$this->assertTrue( $v2['v1-h1']['after']['enable'] );
	}

	/**
	 * preset:text-center-border で before / after の色サイズが両方指定された場合、
	 * preset 由来の before / after 定義（左右の線）があるため両方 enable=true となる.
	 */
	public function test_pseudo_elements_enable_with_preset_both_sides() {
		$input = [
			'h1' => [
				'preset'          => 'text-center-border',
				'useCustomStyle'  => true,
				'beforeColorType' => 'background',
				'beforeSize'      => '2',
				'beforeColor'     => '#222222',
				'afterColorType'  => 'background',
				'afterSize'       => '2',
				'afterColor'      => '#222222',
			],
		];
		$this->set_v1_option( $input );
		$data    = [];
		$heading = new \ystandard_toolbox\Heading_Migration();
		$v2      = $heading->migration( $data );

		$this->assertTrue( $v2['v1-h1']['before']['enable'] );
		$this->assertTrue( $v2['v1-h1']['after']['enable'] );
	}

	/**
	 * preset:icons では preset 側に after 定義がないため、
	 * v1 で afterColor のみ指定（content / icon なし）のとき after.enable=false となる.
	 */
	public function test_pseudo_elements_disabled_when_color_only_without_preset() {
		$input = [
			'h1' => [
				'preset'         => 'icons',
				'useCustomStyle' => true,
				'afterColorType' => 'color',
				'afterColor'     => '#222222',
			],
		];
		$this->set_v1_option( $input );
		$data    = [];
		$heading = new \ystandard_toolbox\Heading_Migration();
		$v2      = $heading->migration( $data );

		$this->assertFalse( $v2['v1-h1']['after']['enable'] );
	}

	/**
	 * preset:ribbon を移行した結果、style.position が 'relative' になる.
	 *
	 * after を position:absolute で配置するために親に position:relative が必要なので、
	 * preset 側にこの指定が抜けているとリボン三角の位置が崩れる回帰防止.
	 */
	public function test_ribbon_preset_has_position_relative() {
		$input = [
			'h1' => [ 'preset' => 'ribbon', 'useCustomStyle' => true ],
		];
		$this->set_v1_option( $input );
		$data    = [];
		$heading = new \ystandard_toolbox\Heading_Migration();
		$v2      = $heading->migration( $data );

		$this->assertEquals( 'relative', $v2['v1-h1']['style']['position'] );
	}

	/**
	 * preset:stitch を移行した結果、boxShadow が `--ystdtb-custom-heading-background-color` を参照する.
	 *
	 * 旧名 `--ystdtb-custom-header-bg-color` のままでは Styles::parse_styles で定義される
	 * 変数名と一致せず、CSS 変数が未定義となりボックスシャドウが描画されない回帰防止.
	 */
	public function test_stitch_preset_box_shadow_uses_correct_var() {
		$input = [
			'h1' => [ 'preset' => 'stitch', 'useCustomStyle' => true ],
		];
		$this->set_v1_option( $input );
		$data    = [];
		$heading = new \ystandard_toolbox\Heading_Migration();
		$v2      = $heading->migration( $data );

		$this->assertStringContainsString(
			'--ystdtb-custom-heading-background-color',
			$v2['v1-h1']['style']['boxShadow']
		);
		$this->assertStringNotContainsString(
			'--ystdtb-custom-heading-bg-color',
			$v2['v1-h1']['style']['boxShadow']
		);
	}

	/**
	 * preset:ribbon の after.border は px 単位で出力される（em 単位だと font-size 依存で三角の形が崩れる）.
	 */
	public function test_ribbon_after_border_uses_pixel_width() {
		$input = [
			'h1' => [ 'preset' => 'ribbon', 'useCustomStyle' => true ],
		];
		$this->set_v1_option( $input );
		$data    = [];
		$heading = new \ystandard_toolbox\Heading_Migration();
		$v2      = $heading->migration( $data );

		$this->assertEquals( '20px', $v2['v1-h1']['after']['border']['desktop']['right']['width'] );
		$this->assertEquals( '10px', $v2['v1-h1']['after']['border']['desktop']['bottom']['width'] );
	}

	/**
	 * preset:repeating-linear-gradient の透明度カスタムプロパティが
	 * `rgba-opacity`（タイポなし）で出力される.
	 *
	 * Styles::parse_styles 側の rgba 値生成と名前を一致させ、半透明グラデーションが
	 * 正しく描画される回帰防止.
	 */
	public function test_repeating_linear_gradient_opacity_var_no_typo() {
		$input = [
			'h1' => [ 'preset' => 'repeating-linear-gradient', 'useCustomStyle' => true ],
		];
		$this->set_v1_option( $input );
		$data    = [];
		$heading = new \ystandard_toolbox\Heading_Migration();
		$v2      = $heading->migration( $data );

		$this->assertArrayHasKey( '--ystdtb-custom-heading-after-color-rgba-opacity', $v2['v1-h1']['after'] );
		$this->assertArrayNotHasKey( '--ystdtb-custom-heading-after-color-rbga-opacity', $v2['v1-h1']['after'] );
	}

	/**
	 * preset:ribbon の after.border.right.color は具体的な色値で出力される.
	 *
	 * CSS 変数 var(...) を直接 preset に書くと UI のカラーピッカーで認識できず
	 * 色選択が機能しなくなるため、preset には固定色を使う.
	 */
	public function test_ribbon_after_border_right_uses_solid_color() {
		$input = [
			'h1' => [ 'preset' => 'ribbon', 'useCustomStyle' => true ],
		];
		$this->set_v1_option( $input );
		$data    = [];
		$heading = new \ystandard_toolbox\Heading_Migration();
		$v2      = $heading->migration( $data );

		$this->assertEquals(
			'#aaaaaa',
			$v2['v1-h1']['after']['border']['desktop']['right']['color']
		);
	}

	/**
	 * preset:balloon の after.border.top.color は具体的な色値（balloon の背景色と同色）で出力される.
	 *
	 * preset に CSS 変数を残すとフロントで未定義変数を参照して三角が描画されない問題が発生する.
	 */
	public function test_balloon_preset_after_border_uses_solid_color() {
		$input = [
			'h1' => [ 'preset' => 'balloon', 'useCustomStyle' => true ],
		];
		$this->set_v1_option( $input );
		$data    = [];
		$heading = new \ystandard_toolbox\Heading_Migration();
		$v2      = $heading->migration( $data );

		$this->assertEquals(
			'#d4e7f2',
			$v2['v1-h1']['after']['border']['desktop']['top']['color']
		);
	}

	/**
	 * preset:repeating-linear-gradient で afterSize 指定があっても、preset の width=100%/height=5px が上書きされない.
	 *
	 * v1 の preset 仕様では `usePseudoElementsSize` フラグ未指定の preset は size を適用しない動作だった.
	 * この preset は `usePseudoElementsSize: []` を持ち、size 適用先がない（=上書きしない）ことを表す.
	 */
	public function test_repeating_linear_gradient_does_not_overwrite_size() {
		$input = [
			'h1' => [
				'preset'         => 'repeating-linear-gradient',
				'useCustomStyle' => true,
				'afterColorType' => 'color',
				'afterColor'     => '#cccccc',
				'afterSize'      => '2',
			],
		];
		$this->set_v1_option( $input );
		$data    = [];
		$heading = new \ystandard_toolbox\Heading_Migration();
		$v2      = $heading->migration( $data );

		$this->assertEquals( '100%', $v2['v1-h1']['after']['width'] );
		$this->assertEquals( '5px', $v2['v1-h1']['after']['height'] );
	}

}
