<?php
/**
 * カスタムCSS（消費側）ロジックテスト
 *
 * 設定値（Custom_Css::OPTION_NAME 配下）→ Custom_Css の各メソッド出力を検証する。
 *
 * - get_option(): デフォルト値返却・wp_unslash
 * - 設定 → 出力先のマッピング検証（add_front_css / add_editor_css をセットで呼ぶ）:
 *   - all のみ      → フロント・エディタの両方に出力
 *   - front のみ    → フロントのみに出力（エディタには混入しない）
 *   - editor のみ   → エディタのみに出力（フロントには混入しない）
 *   - all + front   → フロント側で all → front の順で連結出力
 *   - all + editor  → エディタ側で all → editor の順で連結出力
 *   - すべて空      → どちらにも出力されない
 * - has_wp_custom_css(): WordPress「追加CSS」の有無判定
 * - update_option(): hasWPCustomCss を REST ペイロードから除去して保存
 *
 * @package ystandard_toolbox
 */

class Settings_Custom_Css_Test extends WP_UnitTestCase {

	/**
	 * Custom_Css 設定を更新するヘルパー。
	 *
	 * @param array $value 設定値。
	 */
	private function update_option( $value ) {
		update_option( \ystandard_toolbox\Custom_Css::OPTION_NAME, $value );
	}

	/**
	 * フロント / エディタの両ハンドルをテスト用にリセット登録。
	 * wp_add_inline_style の 'after' データは register_style 済みのハンドルにしか乗らないため、
	 * テストごとに独立した状態を作るために一旦剥がして登録し直す。
	 */
	private function register_css_handles() {
		wp_deregister_style( \ystandard_toolbox\Config::CSS_HANDLE );
		wp_deregister_style( \ystandard_toolbox\Config::BLOCK_CSS_HANDLE );
		wp_register_style( \ystandard_toolbox\Config::CSS_HANDLE, false );
		wp_register_style( \ystandard_toolbox\Config::BLOCK_CSS_HANDLE, false );
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
		delete_option( \ystandard_toolbox\Custom_Css::OPTION_NAME );
		wp_deregister_style( \ystandard_toolbox\Config::CSS_HANDLE );
		wp_deregister_style( \ystandard_toolbox\Config::BLOCK_CSS_HANDLE );
		// WP 追加 CSS の post を削除（has_wp_custom_css のテスト後始末）。
		$post = wp_get_custom_css_post();
		if ( $post ) {
			wp_delete_post( $post->ID, true );
		}
		parent::tear_down();
	}

	/**
	 * 設定が未保存のとき get_option() がデフォルト配列
	 * （all/front/editor='' / hideNotice=false）を返すことを確認。
	 */
	public function test_get_option_returns_defaults_when_unset() {
		delete_option( \ystandard_toolbox\Custom_Css::OPTION_NAME );
		$option = \ystandard_toolbox\Custom_Css::get_option();

		$this->assertSame( '', $option['all'] );
		$this->assertSame( '', $option['front'] );
		$this->assertSame( '', $option['editor'] );
		$this->assertFalse( $option['hideNotice'] );
	}

	/**
	 * get_option() が保存値の all / front / editor を wp_unslash 済みで返すことを確認。
	 */
	public function test_get_option_unslashes_css_fields() {
		$this->update_option(
			[
				'all'    => 'a\\\'b',
				'front'  => 'c\\\'d',
				'editor' => 'e\\\'f',
			]
		);
		$option = \ystandard_toolbox\Custom_Css::get_option();

		$this->assertStringNotContainsString( '\\\\', $option['all'] );
		$this->assertStringNotContainsString( '\\\\', $option['front'] );
		$this->assertStringNotContainsString( '\\\\', $option['editor'] );
	}

	/**
	 * 共通（all）に CSS を設定すると、フロント / エディタ両方に同じセレクタが出力されることを確認。
	 */
	public function test_all_setting_outputs_to_both_front_and_editor() {
		$this->update_option(
			[
				'all'    => '.ystdtb-test-all { color: red; }',
				'front'  => '',
				'editor' => '',
			]
		);
		$this->register_css_handles();

		$instance = new \ystandard_toolbox\Custom_Css();
		$instance->add_front_css();
		$instance->add_editor_css();

		$front_css  = $this->get_inline_css( \ystandard_toolbox\Config::CSS_HANDLE );
		$editor_css = $this->get_inline_css( \ystandard_toolbox\Config::BLOCK_CSS_HANDLE );

		$this->assertStringContainsString( '.ystdtb-test-all', $front_css );
		$this->assertStringContainsString( '.ystdtb-test-all', $editor_css );
	}

	/**
	 * フロント（front）に CSS を設定すると、フロントには出力され、
	 * エディタには混入しないことを確認。
	 */
	public function test_front_setting_outputs_to_front_only_not_editor() {
		$this->update_option(
			[
				'all'    => '',
				'front'  => '.ystdtb-test-front { color: blue; }',
				'editor' => '',
			]
		);
		$this->register_css_handles();

		$instance = new \ystandard_toolbox\Custom_Css();
		$instance->add_front_css();
		$instance->add_editor_css();

		$front_css  = $this->get_inline_css( \ystandard_toolbox\Config::CSS_HANDLE );
		$editor_css = $this->get_inline_css( \ystandard_toolbox\Config::BLOCK_CSS_HANDLE );

		$this->assertStringContainsString( '.ystdtb-test-front', $front_css );
		$this->assertStringNotContainsString( '.ystdtb-test-front', $editor_css );
		// editor 側は all + editor が空なのでハンドルへの 'after' データ自体が無い。
		$this->assertSame( '', $editor_css );
	}

	/**
	 * ブロックエディター（editor）に CSS を設定すると、エディタには出力され、
	 * フロントには混入しないことを確認。
	 */
	public function test_editor_setting_outputs_to_editor_only_not_front() {
		$this->update_option(
			[
				'all'    => '',
				'front'  => '',
				'editor' => '.ystdtb-test-editor { color: green; }',
			]
		);
		$this->register_css_handles();

		$instance = new \ystandard_toolbox\Custom_Css();
		$instance->add_front_css();
		$instance->add_editor_css();

		$front_css  = $this->get_inline_css( \ystandard_toolbox\Config::CSS_HANDLE );
		$editor_css = $this->get_inline_css( \ystandard_toolbox\Config::BLOCK_CSS_HANDLE );

		$this->assertStringContainsString( '.ystdtb-test-editor', $editor_css );
		$this->assertStringNotContainsString( '.ystdtb-test-editor', $front_css );
		// front 側は all + front が空なのでハンドルへの 'after' データ自体が無い。
		$this->assertSame( '', $front_css );
	}

	/**
	 * all + front を設定すると、フロント CSS に両方のセレクタが含まれ、
	 * かつ連結順が all → front であることを確認。
	 */
	public function test_all_and_front_concatenated_in_front_in_order() {
		$this->update_option(
			[
				'all'    => '.ystdtb-test-all { color: red; }',
				'front'  => '.ystdtb-test-front { color: blue; }',
				'editor' => '',
			]
		);
		$this->register_css_handles();

		$instance = new \ystandard_toolbox\Custom_Css();
		$instance->add_front_css();

		$css = $this->get_inline_css( \ystandard_toolbox\Config::CSS_HANDLE );
		$this->assertStringContainsString( '.ystdtb-test-all', $css );
		$this->assertStringContainsString( '.ystdtb-test-front', $css );
		// 連結順: all → front。
		$this->assertLessThan(
			strpos( $css, '.ystdtb-test-front' ),
			strpos( $css, '.ystdtb-test-all' )
		);
	}

	/**
	 * all + editor を設定すると、エディタ CSS に両方のセレクタが含まれ、
	 * かつ連結順が all → editor であることを確認。
	 */
	public function test_all_and_editor_concatenated_in_editor_in_order() {
		$this->update_option(
			[
				'all'    => '.ystdtb-test-all { color: red; }',
				'front'  => '',
				'editor' => '.ystdtb-test-editor { color: green; }',
			]
		);
		$this->register_css_handles();

		$instance = new \ystandard_toolbox\Custom_Css();
		$instance->add_editor_css();

		$css = $this->get_inline_css( \ystandard_toolbox\Config::BLOCK_CSS_HANDLE );
		$this->assertStringContainsString( '.ystdtb-test-all', $css );
		$this->assertStringContainsString( '.ystdtb-test-editor', $css );
		// 連結順: all → editor。
		$this->assertLessThan(
			strpos( $css, '.ystdtb-test-editor' ),
			strpos( $css, '.ystdtb-test-all' )
		);
	}

	/**
	 * 全項目空のときは、フロント / エディタどちらのハンドルにも
	 * 'after' データが追加されないことを確認。
	 */
	public function test_no_css_setting_does_not_output_anywhere() {
		$this->update_option(
			[
				'all'    => '',
				'front'  => '',
				'editor' => '',
			]
		);
		$this->register_css_handles();

		$instance = new \ystandard_toolbox\Custom_Css();
		$instance->add_front_css();
		$instance->add_editor_css();

		$this->assertSame(
			'',
			$this->get_inline_css( \ystandard_toolbox\Config::CSS_HANDLE )
		);
		$this->assertSame(
			'',
			$this->get_inline_css( \ystandard_toolbox\Config::BLOCK_CSS_HANDLE )
		);
	}

	/**
	 * has_wp_custom_css() が WordPress「追加CSS」未保存時に false を返すことを確認。
	 */
	public function test_has_wp_custom_css_returns_false_when_not_set() {
		// テスト前に既存があれば削除。
		$post = wp_get_custom_css_post();
		if ( $post ) {
			wp_delete_post( $post->ID, true );
		}
		$this->assertFalse( \ystandard_toolbox\Custom_Css::has_wp_custom_css() );
	}

	/**
	 * has_wp_custom_css() が WordPress「追加CSS」保存時に true を返すことを確認。
	 */
	public function test_has_wp_custom_css_returns_true_when_set() {
		wp_update_custom_css_post( '.wp-custom-css-test { color: orange; }' );
		$this->assertTrue( \ystandard_toolbox\Custom_Css::has_wp_custom_css() );
	}

	/**
	 * update_option() が REST リクエストから hasWPCustomCss を除去して保存することを確認。
	 * （hasWPCustomCss は表示専用のフラグで、プラグイン設定として保存しない仕様）
	 */
	public function test_update_option_strips_has_wp_custom_css_before_saving() {
		$request = new \WP_REST_Request( 'POST', '/ystdtb/v1/update_custom_css' );
		$request->set_header( 'Content-Type', 'application/json' );
		$request->set_body(
			wp_json_encode(
				[
					'all'            => '.a {}',
					'front'          => '.f {}',
					'editor'         => '.e {}',
					'hideNotice'     => true,
					'hasWPCustomCss' => true,
				]
			)
		);

		$instance = new \ystandard_toolbox\Custom_Css();
		$instance->update_option( $request );

		$saved = get_option( \ystandard_toolbox\Custom_Css::OPTION_NAME );
		$this->assertIsArray( $saved );
		$this->assertArrayNotHasKey( 'hasWPCustomCss', $saved );
		$this->assertSame( '.a {}', $saved['all'] );
		$this->assertSame( '.f {}', $saved['front'] );
		$this->assertSame( '.e {}', $saved['editor'] );
		$this->assertTrue( $saved['hideNotice'] );
	}
}
