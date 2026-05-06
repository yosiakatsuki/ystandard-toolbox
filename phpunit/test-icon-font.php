<?php
/**
 * アイコンフォント機能ロジックテスト
 *
 * Icon_Font クラスは管理 UI を持たず、フロント / エディターへ
 * @font-face とカラーパレット用 CSS を出力する機能。
 *
 * - add_ys_icon_font(): yStandard 用フィルタ。CSS の前に @font-face を連結
 * - add_icon_font_color(): yStandard 用フィルタ。カラーパレット CSS を後に連結（重複ガード）
 * - add_ys_icon_font_editor(): ブロックエディターへ @font-face をインライン CSS として出力
 * - enqueue_icon_font_style(): 非 yStandard 用。@font-face + カラーパレットをまとめて出力
 * - get_color_palette_css(): theme.json のカラーパレットからアイコン色用 CSS を生成
 *
 * @package ystandard_toolbox
 */

class Icon_Font_Test extends WP_UnitTestCase {

	/**
	 * theme.json のカラーパレット設定を差し込むフィルタを登録するヘルパー。
	 * `wp_theme_json_data_theme` フィルタで theme origin のパレット / defaultPalette を上書きし、
	 * resolver のキャッシュをクリアして wp_get_global_settings() に反映させる。
	 *
	 * @param array $palette          color.palette の配列。
	 * @param bool  $default_palette  color.defaultPalette の値。
	 */
	private function inject_theme_palette( $palette, $default_palette = true ) {
		add_filter(
			'wp_theme_json_data_theme',
			function ( $theme_json ) use ( $palette, $default_palette ) {
				return $theme_json->update_with(
					[
						'version'  => 2,
						'settings' => [
							'color' => [
								'palette'        => $palette,
								'defaultPalette' => $default_palette,
							],
						],
					]
				);
			}
		);
		WP_Theme_JSON_Resolver::clean_cached_data();
	}

	/**
	 * theme.json の default origin（コア提供パレット）を差し込むヘルパー。
	 *
	 * @param array $palette default origin の color.palette 配列。
	 */
	private function inject_default_palette( $palette ) {
		add_filter(
			'wp_theme_json_data_default',
			function ( $theme_json ) use ( $palette ) {
				return $theme_json->update_with(
					[
						'version'  => 2,
						'settings' => [
							'color' => [
								'palette' => $palette,
							],
						],
					]
				);
			}
		);
		WP_Theme_JSON_Resolver::clean_cached_data();
	}

	/**
	 * 指定ハンドルに wp_add_inline_style で書かれた 'after' インライン CSS を文字列で取得。
	 *
	 * @param string $handle スタイルハンドル名。
	 *
	 * @return string
	 */
	private function get_inline_css( $handle ) {
		$styles = wp_styles();
		$extra  = $styles->get_data( $handle, 'after' );
		if ( ! is_array( $extra ) ) {
			return '';
		}
		return implode( '', $extra );
	}

	public function tear_down() {
		// theme.json 関連フィルタとキャッシュを完全リセット。
		remove_all_filters( 'wp_theme_json_data_theme' );
		remove_all_filters( 'wp_theme_json_data_default' );
		WP_Theme_JSON_Resolver::clean_cached_data();
		// 重複出力ガード用フィルタの状態漏れ防止。
		remove_all_filters( 'ys_enqueue_color_palette' );
		// ブロックエディター CSS ハンドルの状態漏れ防止。
		wp_deregister_style( \ystandard_toolbox\Config::BLOCK_CSS_HANDLE );
		wp_deregister_style( 'ystdtb-icon-font' );
		// 管理画面判定をフロント側にリセット。
		set_current_screen( 'front' );
		parent::tear_down();
	}

	/**
	 * add_ys_icon_font() が引数 CSS の「前」に @font-face を連結することを確認。
	 * （ys_get_inline_css フィルタで他の CSS より優先して読み込むため）
	 */
	public function test_add_ys_icon_font_prepends_font_face() {
		$instance = new \ystandard_toolbox\Icon_Font();
		$result   = $instance->add_ys_icon_font( '/* base-css */' );

		// @font-face が結果に含まれる。
		$this->assertStringContainsString( '@font-face', $result );
		// font-family がプラグイン定数（ys-icon-font）と一致。
		$this->assertStringContainsString(
			"font-family: '" . \ystandard_toolbox\Icon_Font::YS_FONT_FAMILY . "'",
			$result
		);
		// 連結順: @font-face → 既存 CSS。
		$this->assertLessThan(
			strpos( $result, '/* base-css */' ),
			strpos( $result, '@font-face' )
		);
	}

	/**
	 * add_ys_icon_font() の出力に YSTDTB_URL/assets/icon-fonts/ys-icon-font/ 配下の
	 * フォントファイル URL（ttf / woff / svg）が含まれることを確認。
	 */
	public function test_add_ys_icon_font_includes_font_file_urls() {
		$instance = new \ystandard_toolbox\Icon_Font();
		$result   = $instance->add_ys_icon_font( '' );

		$this->assertStringContainsString( 'assets/icon-fonts/ys-icon-font', $result );
		$this->assertStringContainsString( '.ttf', $result );
		$this->assertStringContainsString( '.woff', $result );
		$this->assertStringContainsString( '.svg', $result );
	}

	/**
	 * add_icon_font_color() の 1 回目呼び出しでカラーパレット CSS が「後」に連結され、
	 * かつ ys_enqueue_color_palette フィルタが true 化することを確認。
	 */
	public function test_add_icon_font_color_appends_palette_on_first_call() {
		$this->inject_theme_palette(
			[
				[
					'slug'  => 'primary',
					'name'  => 'Primary',
					'color' => '#ff0000',
				],
			]
		);
		$instance = new \ystandard_toolbox\Icon_Font();
		$result   = $instance->add_icon_font_color( '/* base-css */' );

		// 既存 CSS は先頭に保持。
		$this->assertStringStartsWith( '/* base-css */', $result );
		// カラーパレット CSS が後に連結される。
		$this->assertStringContainsString( '.has-primary-icon-font-color', $result );
		// 重複出力ガード用フィルタが true 化される。
		$this->assertTrue( apply_filters( 'ys_enqueue_color_palette', false ) );
	}

	/**
	 * add_icon_font_color() を 2 回呼び出すと、2 回目はカラーパレット CSS が
	 * 重複出力されないことを確認（ys_enqueue_color_palette フィルタによる重複ガード）。
	 */
	public function test_add_icon_font_color_skips_palette_on_second_call() {
		$this->inject_theme_palette(
			[
				[
					'slug'  => 'primary',
					'name'  => 'Primary',
					'color' => '#ff0000',
				],
			]
		);
		$instance = new \ystandard_toolbox\Icon_Font();
		$instance->add_icon_font_color( '' );
		// 2 回目: フィルタが既に true なのでカラー CSS は連結されない。
		$result = $instance->add_icon_font_color( '/* second-call */' );

		$this->assertSame( '/* second-call */', $result );
		$this->assertStringNotContainsString( 'icon-font-color', $result );
	}

	/**
	 * add_icon_font_color() がパレット未設定時は何も連結せず、入力 CSS をそのまま返すことを確認。
	 */
	public function test_add_icon_font_color_no_op_when_palette_empty() {
		$this->inject_theme_palette( [], false );
		$instance = new \ystandard_toolbox\Icon_Font();
		$result   = $instance->add_icon_font_color( '/* base-css */' );

		$this->assertSame( '/* base-css */', $result );
	}

	/**
	 * add_ys_icon_font_editor() が is_admin()=false の状況下では
	 * Config::BLOCK_CSS_HANDLE へのインライン CSS 追加を行わないことを確認。
	 */
	public function test_add_ys_icon_font_editor_no_op_when_not_admin() {
		set_current_screen( 'front' );
		wp_register_style( \ystandard_toolbox\Config::BLOCK_CSS_HANDLE, false );

		$instance = new \ystandard_toolbox\Icon_Font();
		$instance->add_ys_icon_font_editor();

		$this->assertSame( '', $this->get_inline_css( \ystandard_toolbox\Config::BLOCK_CSS_HANDLE ) );
	}

	/**
	 * add_ys_icon_font_editor() が is_admin()=true（管理画面）のとき
	 * Config::BLOCK_CSS_HANDLE に @font-face のインライン CSS を追加することを確認。
	 */
	public function test_add_ys_icon_font_editor_outputs_font_face_when_admin() {
		set_current_screen( 'edit-post' );
		wp_register_style( \ystandard_toolbox\Config::BLOCK_CSS_HANDLE, false );

		$instance = new \ystandard_toolbox\Icon_Font();
		$instance->add_ys_icon_font_editor();

		$css = $this->get_inline_css( \ystandard_toolbox\Config::BLOCK_CSS_HANDLE );
		$this->assertStringContainsString( '@font-face', $css );
		$this->assertStringContainsString(
			\ystandard_toolbox\Icon_Font::YS_FONT_FAMILY,
			$css
		);
	}

	/**
	 * enqueue_icon_font_style() が独自ハンドル（ystdtb-icon-font）を登録し、
	 * @font-face とカラーパレット CSS の両方をインライン CSS として追加することを確認。
	 * （非 yStandard 環境でのフロント出力経路）
	 */
	public function test_enqueue_icon_font_style_registers_handle_with_font_face_and_palette() {
		$this->inject_theme_palette(
			[
				[
					'slug'  => 'primary',
					'name'  => 'Primary',
					'color' => '#ff0000',
				],
			]
		);

		$instance = new \ystandard_toolbox\Icon_Font();
		$instance->enqueue_icon_font_style();

		// ハンドルが登録される。
		$this->assertTrue( wp_style_is( 'ystdtb-icon-font', 'registered' ) );
		// インライン CSS に @font-face と カラーパレットの両方が含まれる。
		$css = $this->get_inline_css( 'ystdtb-icon-font' );
		$this->assertStringContainsString( '@font-face', $css );
		$this->assertStringContainsString( '.has-primary-icon-font-color', $css );
	}

	/**
	 * get_color_palette_css() がパレット未設定時に空文字を返すことを確認。
	 */
	public function test_get_color_palette_css_returns_empty_when_no_palette() {
		// theme / default 両方をクリア。
		$this->inject_theme_palette( [], false );

		$this->assertSame( '', \ystandard_toolbox\Icon_Font::get_color_palette_css() );
	}

	/**
	 * get_color_palette_css() がパレット内の各 slug について
	 * `.has-{slug}-icon-font-color` セレクタと `--icon-font-color:{color}` 変数を含む
	 * CSS を生成することを確認。
	 */
	public function test_get_color_palette_css_generates_rule_per_slug() {
		$this->inject_theme_palette(
			[
				[
					'slug'  => 'primary',
					'name'  => 'Primary',
					'color' => '#ff0000',
				],
				[
					'slug'  => 'secondary',
					'name'  => 'Secondary',
					'color' => '#00ff00',
				],
			],
			false
		);

		$css = \ystandard_toolbox\Icon_Font::get_color_palette_css();

		$this->assertStringContainsString( '.has-primary-icon-font-color', $css );
		$this->assertStringContainsString( '--icon-font-color:#ff0000', $css );
		$this->assertStringContainsString( '.has-secondary-icon-font-color', $css );
		$this->assertStringContainsString( '--icon-font-color:#00ff00', $css );
	}

	/**
	 * get_color_palette_css($prefix) が指定したプレフィックスを各セレクタの先頭に付与することを確認。
	 */
	public function test_get_color_palette_css_prepends_prefix_to_selectors() {
		$this->inject_theme_palette(
			[
				[
					'slug'  => 'primary',
					'name'  => 'Primary',
					'color' => '#ff0000',
				],
			],
			false
		);

		$css = \ystandard_toolbox\Icon_Font::get_color_palette_css( '.editor-styles-wrapper' );

		$this->assertStringContainsString(
			'.editor-styles-wrapper .has-primary-icon-font-color',
			$css
		);
	}

	/**
	 * get_color_palette_css() が同一 slug に対して複数の色定義が並ぶ場合、
	 * 配列の後ろ側にある定義が前を上書きすること（後勝ちロジック）を確認。
	 *
	 * 実装は origin 順（default → theme → custom）に array_merge した後、
	 * `$unique[$slug] = $color` で slug 重複を後勝ちにしている。
	 * origin を跨ぐ階層テスト（default + theme）はテストインフラ側で
	 * 多 origin 注入が安定しないため、同 origin 内の重複で等価ロジックを検証する。
	 */
	public function test_get_color_palette_css_later_color_overrides_earlier_for_same_slug() {
		$this->inject_theme_palette(
			[
				[
					'slug'  => 'primary',
					'name'  => 'Earlier',
					'color' => '#000000',
				],
				[
					'slug'  => 'primary',
					'name'  => 'Later',
					'color' => '#ff0000',
				],
			],
			false
		);

		$css = \ystandard_toolbox\Icon_Font::get_color_palette_css();

		// 後ろの定義（#ff0000）が採用される。
		$this->assertStringContainsString( '--icon-font-color:#ff0000', $css );
		// 前の定義（#000000）は採用されない。
		$this->assertStringNotContainsString( '--icon-font-color:#000000', $css );
	}

	/**
	 * color.defaultPalette = false のとき、default origin のパレットが除外されることを確認。
	 * （theme.json の defaultPalette 設定の尊重）
	 */
	public function test_get_color_palette_css_excludes_default_when_default_palette_disabled() {
		$this->inject_default_palette(
			[
				[
					'slug'  => 'core-only',
					'name'  => 'Core Only',
					'color' => '#abcdef',
				],
			]
		);
		// theme 側のパレットは空、defaultPalette を false にする。
		$this->inject_theme_palette( [], false );

		$css = \ystandard_toolbox\Icon_Font::get_color_palette_css();

		// default origin の slug は出力されない。
		$this->assertStringNotContainsString( 'core-only', $css );
	}
}
