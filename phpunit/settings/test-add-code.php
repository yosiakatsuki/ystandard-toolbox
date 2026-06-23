<?php
/**
 * コード追加（消費側）ロジックテスト
 *
 * 設定値（Code::OPTION_NAME = 'ystdtb_code' 配下）→ Code クラスの各メソッド出力を検証する。
 *
 * - get_option(): 未保存時 ''／設定済みキーの wp_unslash／未定義キーで ''
 * - get_all_code(): 未保存時 false／保存時に全キーが wp_unslash 済みの配列で返る
 * - add_head() / add_body_open() / add_footer():
 *   - 通常時: 設定値 + PHP_EOL を出力
 *   - 空・空白のみ: 何も出力しない
 *   - 前後の空白を trim
 * - update_option(): REST ペイロードの各値を trim して保存
 * - add_plugin_settings(): 引数の配列に code キーを追加（get_all_code 相当）
 *
 * 注意:
 *   AMP 出力経路（Util\AMP::is_amp() == true 時に *_amp キーを採用するルート）は、
 *   テスト環境に AMP プラグイン関連関数（is_amp_endpoint/ys_is_amp）が存在しない前提で
 *   常に false が返るため、本テストでは検証対象外とする。
 *
 * @package ystandard_toolbox
 */

class Settings_Add_Code_Test extends WP_UnitTestCase {

	/**
	 * Code 設定（ystdtb_code）を更新するヘルパー。
	 *
	 * @param array $value 設定値。
	 */
	private function set_code_option( $value ) {
		update_option( \ystandard_toolbox\Code::OPTION_NAME, $value );
	}

	public function tear_down() {
		delete_option( \ystandard_toolbox\Code::OPTION_NAME );
		parent::tear_down();
	}

	/**
	 * 設定が未保存のとき get_option() が空文字を返すことを確認。
	 */
	public function test_get_option_returns_empty_when_unset() {
		delete_option( \ystandard_toolbox\Code::OPTION_NAME );
		$this->assertSame( '', \ystandard_toolbox\Code::get_option( 'head' ) );
	}

	/**
	 * 保存値を持つキーを get_option() で取得した結果が wp_unslash 済みであることを確認。
	 * リテラル `\'` はバックスラッシュ + シングルクオート。wp_unslash でバックスラッシュが剥がれる。
	 */
	public function test_get_option_returns_unslashed_value() {
		$this->set_code_option(
			[
				'head' => "<meta name=\\'x\\' />",
			]
		);
		$value = \ystandard_toolbox\Code::get_option( 'head' );

		$this->assertSame( "<meta name='x' />", $value );
	}

	/**
	 * 設定済みでも未定義キーを get_option() で指定すると空文字を返すことを確認。
	 */
	public function test_get_option_returns_empty_for_undefined_key() {
		$this->set_code_option(
			[
				'head' => 'X',
			]
		);
		$this->assertSame(
			'',
			\ystandard_toolbox\Code::get_option( 'body_open' )
		);
	}

	/**
	 * 未保存のとき get_all_code() が false を返すことを確認。
	 */
	public function test_get_all_code_returns_false_when_unset() {
		delete_option( \ystandard_toolbox\Code::OPTION_NAME );
		$this->assertFalse( \ystandard_toolbox\Code::get_all_code() );
	}

	/**
	 * 保存値の全キーを get_all_code() が wp_unslash 済みで返すことを確認。
	 */
	public function test_get_all_code_returns_all_keys_unslashed() {
		$this->set_code_option(
			[
				'head'       => "A\\'a",
				'body_open'  => "B\\'b",
				'body_close' => "C\\'c",
			]
		);
		$all = \ystandard_toolbox\Code::get_all_code();

		$this->assertIsArray( $all );
		$this->assertSame( "A'a", $all['head'] );
		$this->assertSame( "B'b", $all['body_open'] );
		$this->assertSame( "C'c", $all['body_close'] );
	}

	/**
	 * add_head() で head 設定値が末尾改行付きで出力されることを確認。
	 */
	public function test_add_head_outputs_head_setting_with_eol() {
		$this->set_code_option(
			[
				'head' => '<meta name="X" />',
			]
		);
		$instance = new \ystandard_toolbox\Code();

		ob_start();
		$instance->add_head();
		$output = ob_get_clean();

		$this->assertSame( '<meta name="X" />' . PHP_EOL, $output );
	}

	/**
	 * add_body_open() で body_open 設定値が末尾改行付きで出力されることを確認。
	 */
	public function test_add_body_open_outputs_body_open_setting_with_eol() {
		$this->set_code_option(
			[
				'body_open' => '<div id="bo">',
			]
		);
		$instance = new \ystandard_toolbox\Code();

		ob_start();
		$instance->add_body_open();
		$output = ob_get_clean();

		$this->assertSame( '<div id="bo">' . PHP_EOL, $output );
	}

	/**
	 * add_footer() で body_close 設定値が末尾改行付きで出力されることを確認。
	 */
	public function test_add_footer_outputs_body_close_setting_with_eol() {
		$this->set_code_option(
			[
				'body_close' => '<script>x</script>',
			]
		);
		$instance = new \ystandard_toolbox\Code();

		ob_start();
		$instance->add_footer();
		$output = ob_get_clean();

		$this->assertSame( '<script>x</script>' . PHP_EOL, $output );
	}

	/**
	 * 出力対象が空文字（trim 後 0 文字）のとき何も出力されないことを確認。
	 */
	public function test_add_head_outputs_nothing_when_empty() {
		$this->set_code_option(
			[
				'head' => '',
			]
		);
		$instance = new \ystandard_toolbox\Code();

		ob_start();
		$instance->add_head();
		$output = ob_get_clean();

		$this->assertSame( '', $output );
	}

	/**
	 * 出力対象が空白のみの場合、trim 後 0 文字となり何も出力されないことを確認。
	 */
	public function test_add_head_outputs_nothing_when_whitespace_only() {
		$this->set_code_option(
			[
				'head' => "   \n  \t",
			]
		);
		$instance = new \ystandard_toolbox\Code();

		ob_start();
		$instance->add_head();
		$output = ob_get_clean();

		$this->assertSame( '', $output );
	}

	/**
	 * 設定値の前後空白が trim されて出力されることを確認。
	 */
	public function test_add_head_trims_surrounding_whitespace() {
		$this->set_code_option(
			[
				'head' => "  \n<meta />\n  ",
			]
		);
		$instance = new \ystandard_toolbox\Code();

		ob_start();
		$instance->add_head();
		$output = ob_get_clean();

		$this->assertSame( '<meta />' . PHP_EOL, $output );
	}

	/**
	 * update_option() が REST リクエストの 6 キー（head/body_open/body_close と各 _amp）を
	 * trim して保存することを確認。
	 */
	public function test_update_option_saves_trimmed_values() {
		$request = new \WP_REST_Request( 'POST', '/ystdtb/v1/update_code' );
		$request->set_header( 'Content-Type', 'application/json' );
		$request->set_body(
			wp_json_encode(
				[
					'head'           => "  <meta name=\"x\" />\n",
					'head_amp'       => '<amp1>',
					'body_open'      => '  <div>  ',
					'body_open_amp'  => '<amp2>',
					'body_close'     => "<script></script>\n\n",
					'body_close_amp' => '<amp3>',
				]
			)
		);

		$instance = new \ystandard_toolbox\Code();
		$instance->update_option( $request );

		$saved = get_option( \ystandard_toolbox\Code::OPTION_NAME );
		$this->assertIsArray( $saved );
		$this->assertSame( '<meta name="x" />', $saved['head'] );
		$this->assertSame( '<amp1>', $saved['head_amp'] );
		$this->assertSame( '<div>', $saved['body_open'] );
		$this->assertSame( '<amp2>', $saved['body_open_amp'] );
		$this->assertSame( '<script></script>', $saved['body_close'] );
		$this->assertSame( '<amp3>', $saved['body_close_amp'] );
	}

	/**
	 * add_plugin_settings() が引数配列に code キーを追加し、
	 * 値が get_all_code() 相当（保存値の wp_unslash 済み配列）になることを確認。
	 * 既存キー（foo）が破壊されないことも併せて確認する。
	 */
	public function test_add_plugin_settings_appends_code_key() {
		$this->set_code_option(
			[
				'head'       => '<meta />',
				'body_open'  => '',
				'body_close' => '',
			]
		);
		$instance = new \ystandard_toolbox\Code();
		$result   = $instance->add_plugin_settings( [ 'foo' => 'bar' ] );

		$this->assertSame( 'bar', $result['foo'] );
		$this->assertIsArray( $result['code'] );
		$this->assertSame( '<meta />', $result['code']['head'] );
	}
}
