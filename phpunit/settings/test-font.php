<?php
/**
 * フォント設定（消費側）ロジックテスト
 *
 * 設定値（Font::OPTION_NAME 配下）→ Font クラスの各メソッド出力を検証する。
 * - get_option(): デフォルト値マージ・wp_unslash・themeFontSetting 付与
 * - get_font_family(): 末尾セミコロン除去
 * - output_font_html(): Google Fonts preconnect の除去
 * - add_resource_hints(): preconnect 判定と Google Fonts URL 追加
 * - add_font_family(): CSS 変数への font-family 追加
 * - output_font_family_style(): 非 yStandard 環境向け body{} インライン CSS
 * - update_option(): themeFontSetting を REST ペイロードから除去して保存
 *
 * @package ystandard_toolbox
 */

class Settings_Font_Test extends WP_UnitTestCase {

	/**
	 * Font 設定を更新するヘルパー。
	 *
	 * @param array $value 設定値。
	 */
	private function update_option( $value ) {
		\ystandard_toolbox\Option::update_plugin_option(
			\ystandard_toolbox\Font::OPTION_NAME,
			$value
		);
	}

	/**
	 * output_font_family_style() で利用する独自スタイルハンドルをリセット登録。
	 * 既存登録があれば一旦剥がし、テストごとに独立した状態にする。
	 */
	private function reset_font_family_handle() {
		wp_deregister_style( 'ystdtb-font-family' );
	}

	/**
	 * wp_add_inline_style で追加された 'after' インライン CSS を文字列で取得。
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
		delete_option( \ystandard_toolbox\Font::OPTION_NAME );
		wp_deregister_style( 'ystdtb-font-family' );
		parent::tear_down();
	}

	/**
	 * 設定が完全に未保存（is_array チェックで false）のとき、
	 * get_option() が html / family / customFonts のデフォルト値のみを返し、
	 * themeFontSetting キーは付与されないことを確認。
	 */
	public function test_get_option_returns_defaults_when_unset() {
		delete_option( \ystandard_toolbox\Font::OPTION_NAME );
		$option = \ystandard_toolbox\Font::get_option();

		$this->assertSame( '', $option['html'] );
		$this->assertSame( '', $option['family'] );
		$this->assertSame( [], $option['customFonts'] );
		// 完全未保存時は早期 return パスで themeFontSetting は付与されない仕様。
		$this->assertArrayNotHasKey( 'themeFontSetting', $option );
	}

	/**
	 * 設定が保存されている場合、get_option() が themeFontSetting キーを付与して
	 * 返すことを確認。値はテーマ依存のため、ここではキーの存在のみを検証する。
	 */
	public function test_get_option_includes_theme_font_setting_when_saved() {
		$this->update_option( [ 'family' => 'serif' ] );
		$option = \ystandard_toolbox\Font::get_option();

		$this->assertArrayHasKey( 'themeFontSetting', $option );
	}

	/**
	 * 一部のキーのみ保存している場合、get_option() が未設定キーをデフォルト値で
	 * 補完したうえで返すことを確認。
	 */
	public function test_get_option_merges_saved_values_with_defaults() {
		$this->update_option( [ 'family' => 'serif' ] );
		$option = \ystandard_toolbox\Font::get_option();

		$this->assertSame( 'serif', $option['family'] );
		// 未設定キーはデフォルトで補完される。
		$this->assertSame( '', $option['html'] );
		$this->assertSame( [], $option['customFonts'] );
	}

	/**
	 * get_option() の html / family が wp_unslash 済みで返ることを確認。
	 * （update_option() 経由の保存ではエスケープが残らない点を担保）
	 */
	public function test_get_option_unslashes_html_and_family() {
		// wp_slash 相当でバックスラッシュを混ぜた値を保存。
		$this->update_option(
			[
				'html'   => 'a\\\'b',
				'family' => 'c\\\'d',
			]
		);
		$option = \ystandard_toolbox\Font::get_option();

		$this->assertStringNotContainsString( '\\\\', $option['html'] );
		$this->assertStringNotContainsString( '\\\\', $option['family'] );
	}

	/**
	 * get_font_family() が末尾セミコロンを除去して返すことを確認。
	 */
	public function test_get_font_family_strips_trailing_semicolon() {
		$this->update_option( [ 'family' => 'serif;' ] );
		$this->assertSame( 'serif', \ystandard_toolbox\Font::get_font_family() );
	}

	/**
	 * get_font_family() が未設定時に空文字を返すことを確認。
	 */
	public function test_get_font_family_returns_empty_when_unset() {
		delete_option( \ystandard_toolbox\Font::OPTION_NAME );
		$this->assertSame( '', \ystandard_toolbox\Font::get_font_family() );
	}

	/**
	 * output_font_html() が html 未設定時に何も出力しないことを確認。
	 */
	public function test_output_font_html_outputs_nothing_when_empty() {
		$this->update_option( [ 'html' => '' ] );
		$instance = new \ystandard_toolbox\Font();
		ob_start();
		$instance->output_font_html();
		$output = ob_get_clean();

		$this->assertSame( '', $output );
	}

	/**
	 * output_font_html() が googleapis / gstatic の preconnect link タグを除去することを確認。
	 * （preconnect は add_resource_hints 経由で自動出力するためダブり防止）
	 */
	public function test_output_font_html_strips_google_fonts_preconnect() {
		$this->update_option(
			[
				'html' => '<link rel="preconnect" href="https://fonts.googleapis.com">'
					. '<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>'
					. '<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Roboto">',
			]
		);
		$instance = new \ystandard_toolbox\Font();
		ob_start();
		$instance->output_font_html();
		$output = ob_get_clean();

		// preconnect は除去される。
		$this->assertStringNotContainsString( 'rel="preconnect"', $output );
		// stylesheet link は残る。
		$this->assertStringContainsString( 'rel="stylesheet"', $output );
		$this->assertStringContainsString( 'family=Roboto', $output );
	}

	/**
	 * output_font_html() が preconnect のみで構成された html に対して、
	 * 除去後に空となるため何も出力しないことを確認。
	 */
	public function test_output_font_html_outputs_nothing_when_only_preconnect() {
		$this->update_option(
			[
				'html' => '<link rel="preconnect" href="https://fonts.googleapis.com">'
					. '<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>',
			]
		);
		$instance = new \ystandard_toolbox\Font();
		ob_start();
		$instance->output_font_html();
		$output = ob_get_clean();

		$this->assertSame( '', trim( $output ) );
	}

	/**
	 * add_resource_hints() が preconnect 以外の relation_type に対して
	 * 引数 URL をそのまま返す（早期 return）ことを確認。
	 */
	public function test_add_resource_hints_passes_through_for_non_preconnect() {
		$this->update_option(
			[ 'html' => '<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Roboto">' ]
		);
		$instance = new \ystandard_toolbox\Font();
		$urls     = $instance->add_resource_hints( [ 'http://example.com' ], 'dns-prefetch' );

		$this->assertSame( [ 'http://example.com' ], $urls );
	}

	/**
	 * add_resource_hints() が html に Google Fonts stylesheet を含まないとき、
	 * preconnect 用 URL を追加せず引数をそのまま返すことを確認。
	 */
	public function test_add_resource_hints_no_op_when_no_googleapis() {
		$this->update_option( [ 'html' => '<link rel="stylesheet" href="https://example.com/font.css">' ] );
		$instance = new \ystandard_toolbox\Font();
		$urls     = $instance->add_resource_hints( [], 'preconnect' );

		$this->assertSame( [], $urls );
	}

	/**
	 * add_resource_hints() が html に fonts.googleapis.com を含むとき、
	 * preconnect 用 URL（googleapis / gstatic）を追加することを確認。
	 */
	public function test_add_resource_hints_appends_google_fonts_urls() {
		$this->update_option(
			[ 'html' => '<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Roboto">' ]
		);
		$instance = new \ystandard_toolbox\Font();
		$urls     = $instance->add_resource_hints( [], 'preconnect' );

		$this->assertContains( 'https://fonts.googleapis.com', $urls );
		// gstatic は href + crossorigin の連想配列で追加される。
		$has_gstatic = false;
		foreach ( $urls as $url ) {
			if ( is_array( $url ) && isset( $url['href'] ) && 'https://fonts.gstatic.com' === $url['href'] ) {
				$has_gstatic = true;
				$this->assertSame( 'anonymous', $url['crossorigin'] );
				break;
			}
		}
		$this->assertTrue( $has_gstatic, 'fonts.gstatic.com の preconnect URL が追加されること' );
	}

	/**
	 * add_font_family() が family 未設定時に css_vars をそのまま返すことを確認。
	 */
	public function test_add_font_family_no_op_when_empty() {
		delete_option( \ystandard_toolbox\Font::OPTION_NAME );
		$instance = new \ystandard_toolbox\Font();
		$vars     = $instance->add_font_family( [ 'existing-var' => 'value' ] );

		$this->assertSame( [ 'existing-var' => 'value' ], $vars );
	}

	/**
	 * add_font_family() が family 設定時に css_vars に font-family キーを追加することを確認。
	 */
	public function test_add_font_family_adds_font_family_var() {
		$this->update_option( [ 'family' => '"Noto Sans JP", sans-serif' ] );
		$instance = new \ystandard_toolbox\Font();
		$vars     = $instance->add_font_family( [ 'existing-var' => 'value' ] );

		$this->assertSame( '"Noto Sans JP", sans-serif', $vars['font-family'] );
		// 既存キーは保持される。
		$this->assertSame( 'value', $vars['existing-var'] );
	}

	/**
	 * output_font_family_style() が family 未設定時に何も出力しないことを確認。
	 */
	public function test_output_font_family_style_no_op_when_empty() {
		delete_option( \ystandard_toolbox\Font::OPTION_NAME );
		$this->reset_font_family_handle();

		$instance = new \ystandard_toolbox\Font();
		$instance->output_font_family_style();

		// ハンドル自体が登録されない。
		$this->assertFalse( wp_style_is( 'ystdtb-font-family', 'registered' ) );
	}

	/**
	 * output_font_family_style() が family 設定時に
	 * body { font-family: ...; } のインライン CSS を 'ystdtb-font-family' ハンドルに登録することを確認。
	 */
	public function test_output_font_family_style_outputs_inline_body_css() {
		$this->update_option( [ 'family' => '"Noto Sans JP", sans-serif' ] );
		$this->reset_font_family_handle();

		$instance = new \ystandard_toolbox\Font();
		$instance->output_font_family_style();

		$css = $this->get_inline_css( 'ystdtb-font-family' );
		$this->assertStringContainsString( 'body{font-family:"Noto Sans JP", sans-serif;}', $css );
	}

	/**
	 * update_option() が REST リクエストの themeFontSetting を保存対象から除去することを確認。
	 * （themeFontSetting はテーマ依存の参照値で、プラグイン設定として保存しない仕様）
	 */
	public function test_update_option_strips_theme_font_setting_before_saving() {
		$request = new \WP_REST_Request( 'POST', '/ystdtb/v1/update_font' );
		$request->set_header( 'Content-Type', 'application/json' );
		$request->set_body(
			wp_json_encode(
				[
					'html'             => '<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Roboto">',
					'family'           => 'serif',
					'customFonts'      => [],
					'themeFontSetting' => 'should-not-be-saved',
				]
			)
		);

		$instance = new \ystandard_toolbox\Font();
		$instance->update_option( $request );

		$saved = \ystandard_toolbox\Option::get_option( \ystandard_toolbox\Font::OPTION_NAME );
		$this->assertIsArray( $saved );
		$this->assertArrayNotHasKey( 'themeFontSetting', $saved );
		$this->assertSame( 'serif', $saved['family'] );
		$this->assertStringContainsString( 'fonts.googleapis.com', $saved['html'] );
	}
}
