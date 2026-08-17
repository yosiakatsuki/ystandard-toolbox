<?php
/**
 * 投稿設定モーダル連携テスト.
 *
 * @package ystandard-toolbox
 */

class Post_Settings_Test extends WP_UnitTestCase {

	/**
	 * テスト用メニューID.
	 *
	 * @var int
	 */
	private $menu_id;

	/**
	 * テスト用投稿ID.
	 *
	 * @var int
	 */
	private $post_id;

	/**
	 * テストで返すyStandardバージョン.
	 *
	 * @var string
	 */
	private $theme_version = '4.59.0-alpha-1';

	/**
	 * テストデータを準備する.
	 */
	public function set_up() {
		parent::set_up();
		register_nav_menu( 'primary', 'メインメニュー' );
		register_nav_menu( 'footer', 'フッターメニュー' );
		$this->menu_id = wp_create_nav_menu( 'テストメニュー' );
		$this->post_id = $this->factory->post->create(
			[
				'post_type' => 'page',
			]
		);
	}

	/**
	 * テストデータを破棄する.
	 */
	public function tear_down() {
		remove_filter( 'pre_option_template', [ $this, 'filter_template' ] );
		remove_filter( 'ys_ystandard_version', [ $this, 'filter_ystandard_version' ] );
		remove_all_filters( 'ys_post_settings_display_mode' );
		remove_all_filters( 'ystdtb_can_replace_menu' );
		unregister_nav_menu( 'primary' );
		unregister_nav_menu( 'footer' );
		unregister_post_meta( 'page', \ystandard_toolbox\Post_Settings_Meta::SEO_TITLE_META_KEY );
		unregister_post_meta( 'page', \ystandard_toolbox\Post_Settings_Meta::SEO_DESCRIPTION_META_KEY );
		unregister_post_meta( 'page', \ystandard_toolbox\Post_Settings_Meta::OVERLAY_META_KEY );
		unregister_post_meta( 'page', \ystandard_toolbox\Post_Settings_Meta::MENU_REPLACE_META_KEY );
		wp_delete_nav_menu( $this->menu_id );
		parent::tear_down();
	}

	/**
	 * オーバーレイ設定が許可値へ正規化されることを確認する.
	 */
	public function test_sanitize_overlay() {
		$this->assertSame( 'on', \ystandard_toolbox\Post_Settings_Meta::sanitize_overlay( 'on' ) );
		$this->assertSame( 'off', \ystandard_toolbox\Post_Settings_Meta::sanitize_overlay( 'off' ) );
		$this->assertSame( 'none', \ystandard_toolbox\Post_Settings_Meta::sanitize_overlay( 'invalid' ) );
		$this->assertSame( 'none', \ystandard_toolbox\Post_Settings_Meta::sanitize_overlay( [] ) );
	}

	/**
	 * SEO用テキストからHTMLタグと改行が除去されることを確認する.
	 */
	public function test_sanitize_seo_text() {
		$this->assertSame(
			'SEO Title Next',
			\ystandard_toolbox\Post_Settings_Meta::sanitize_seo_text( "<strong>SEO Title</strong>\nNext" )
		);
		$this->assertSame( '', \ystandard_toolbox\Post_Settings_Meta::sanitize_seo_text( [] ) );
	}

	/**
	 * メニュー切り替え設定が現在有効な値だけへ正規化されることを確認する.
	 */
	public function test_sanitize_menu_replace() {
		$actual = \ystandard_toolbox\Post_Settings_Meta::sanitize_menu_replace(
			[
				'primary' => (string) $this->menu_id,
				'footer'  => '',
				'unknown' => '999',
			]
		);

		$this->assertSame(
			[
				'primary' => (string) $this->menu_id,
				'footer'  => '',
			],
			$actual
		);
	}

	/**
	 * メニュー設定のRESTスキーマが既存位置の読み取り互換を持つことを確認する.
	 */
	public function test_menu_replace_schema() {
		$schema = \ystandard_toolbox\Post_Settings_Meta::get_menu_replace_schema();

		$this->assertSame( 'object', $schema['type'] );
		$this->assertArrayHasKey( 'primary', $schema['properties'] );
		$this->assertSame( [ 'type' => 'string' ], $schema['additionalProperties'] );
		$this->assertTrue(
			rest_validate_value_from_schema(
				[ 'removed-location' => '10' ],
				$schema
			)
		);
	}

	/**
	 * 登録した投稿メタをWordPress標準REST APIから読み出せることを確認する.
	 */
	public function test_registered_meta_is_available_in_rest_response() {
		$this->use_ystandard_theme();
		$meta = new \ystandard_toolbox\Post_Settings_Meta();
		$meta->register_meta();
		update_post_meta(
			$this->post_id,
			\ystandard_toolbox\Post_Settings_Meta::SEO_TITLE_META_KEY,
			'SEOタイトル'
		);
		update_post_meta(
			$this->post_id,
			\ystandard_toolbox\Post_Settings_Meta::SEO_DESCRIPTION_META_KEY,
			'SEO description'
		);
		update_post_meta( $this->post_id, \ystandard_toolbox\Post_Settings_Meta::OVERLAY_META_KEY, 'on' );
		update_post_meta(
			$this->post_id,
			\ystandard_toolbox\Post_Settings_Meta::MENU_REPLACE_META_KEY,
			[ 'primary' => (string) $this->menu_id ]
		);

		$user_id = $this->factory->user->create( [ 'role' => 'administrator' ] );
		wp_set_current_user( $user_id );
		$request  = new WP_REST_Request( 'GET', "/wp/v2/pages/{$this->post_id}" );
		$request->set_param( 'context', 'edit' );
		$response = rest_do_request( $request );
		$data     = $response->get_data();

		$this->assertSame( 200, $response->get_status() );
		$this->assertSame(
			'SEOタイトル',
			$data['meta'][ \ystandard_toolbox\Post_Settings_Meta::SEO_TITLE_META_KEY ]
		);
		$this->assertSame(
			'SEO description',
			$data['meta'][ \ystandard_toolbox\Post_Settings_Meta::SEO_DESCRIPTION_META_KEY ]
		);
		$this->assertSame( 'on', $data['meta'][ \ystandard_toolbox\Post_Settings_Meta::OVERLAY_META_KEY ] );
		$this->assertSame(
			[ 'primary' => (string) $this->menu_id ],
			$data['meta'][ \ystandard_toolbox\Post_Settings_Meta::MENU_REPLACE_META_KEY ]
		);
	}

	/**
	 * SEO用投稿メタをWordPress標準REST APIから更新できることを確認する.
	 */
	public function test_registered_seo_meta_can_be_updated_via_rest_api() {
		$this->use_ystandard_theme();
		$meta = new \ystandard_toolbox\Post_Settings_Meta();
		$meta->register_meta();

		$user_id = $this->factory->user->create( [ 'role' => 'administrator' ] );
		wp_set_current_user( $user_id );
		$request = new WP_REST_Request( 'POST', "/wp/v2/pages/{$this->post_id}" );
		$request->set_param(
			'meta',
			[
				\ystandard_toolbox\Post_Settings_Meta::SEO_TITLE_META_KEY       => '<strong>SEO Title</strong>',
				\ystandard_toolbox\Post_Settings_Meta::SEO_DESCRIPTION_META_KEY => "SEO description\nNext",
			]
		);
		$response = rest_do_request( $request );

		$this->assertSame( 200, $response->get_status() );
		$this->assertSame(
			'SEO Title',
			get_post_meta( $this->post_id, \ystandard_toolbox\Post_Settings_Meta::SEO_TITLE_META_KEY, true )
		);
		$this->assertSame(
			'SEO description Next',
			get_post_meta( $this->post_id, \ystandard_toolbox\Post_Settings_Meta::SEO_DESCRIPTION_META_KEY, true )
		);
	}

	/**
	 * yStandard対応版でオーバーレイ設定プロバイダーを有効にすることを確認する.
	 */
	public function test_provider_enables_overlay_for_supported_ystandard() {
		$this->use_ystandard_theme();
		$config = \ystandard_toolbox\Post_Settings_Provider::get_config( 'page', $this->post_id );

		$this->assertTrue( \ystandard_toolbox\Post_Settings_Provider::is_available( 'page' ) );
		$this->assertTrue( $config['overlay']['enabled'] );
		$this->assertSame( 1, $config['apiVersion'] );
		$this->assertSame( 'page', $config['postType'] );
		$this->assertSame( $this->post_id, $config['postId'] );
	}

	/**
	 * yStandard 4.59.0-alpha-1未満では従来のメタボックスを使用することを確認する.
	 */
	public function test_ystandard_before_459_uses_legacy_meta_box() {
		$this->theme_version = '4.58.0';
		$this->use_ystandard_theme();
		$meta = new \ystandard_toolbox\Post_Settings_Meta();
		$meta->register_meta();
		$config  = \ystandard_toolbox\Post_Settings_Provider::get_config( 'page', $this->post_id );
		$context = \ystandard_toolbox\Post_Settings_Registry::get_context( 'page', $this->post_id );

		$this->assertFalse( \ystandard_toolbox\Post_Settings_Provider::is_available( 'page' ) );
		$this->assertFalse( $config['overlay']['enabled'] );
		$this->assertFalse( $config['menuReplace']['enabled'] );
		$this->assertFalse(
			registered_meta_key_exists(
				'post',
				\ystandard_toolbox\Post_Settings_Meta::SEO_TITLE_META_KEY,
				'page'
			)
		);
		$this->assertSame(
			\ystandard_toolbox\Post_Settings_Registry::DISPLAY_LEGACY_META_BOX,
			\ystandard_toolbox\Post_Settings_Registry::get_display_mode( $context )
		);
	}

	/**
	 * yStandard以外ではToolboxモーダルを使用することを確認する.
	 */
	public function test_non_ystandard_uses_toolbox_modal() {
		$context = \ystandard_toolbox\Post_Settings_Registry::get_context( 'page', $this->post_id );

		$this->assertSame(
			\ystandard_toolbox\Post_Settings_Registry::DISPLAY_TOOLBOX_MODAL,
			\ystandard_toolbox\Post_Settings_Registry::get_display_mode( $context )
		);
	}

	/**
	 * メニュー切り替え対象では位置とメニューの初期データを追加することを確認する.
	 */
	public function test_provider_adds_menu_config_when_replace_is_available() {
		$this->use_ystandard_theme();
		add_filter( 'ystdtb_can_replace_menu', '__return_true' );
		$config = \ystandard_toolbox\Post_Settings_Provider::get_config( 'page', $this->post_id );

		$this->assertTrue( $config['menuReplace']['enabled'] );
		$this->assertSame(
			[ 'primary', 'footer' ],
			wp_list_pluck( $config['menuReplace']['locations'], 'name' )
		);
		$this->assertContains(
			(string) $this->menu_id,
			wp_list_pluck( $config['menuReplace']['menus'], 'value' )
		);
	}

	/**
	 * ホストへ設定固有情報を渡さないことを確認する.
	 */
	public function test_host_config_contains_only_shared_context() {
		$editor = new \ystandard_toolbox\Post_Settings_Editor();

		$this->assertSame(
			[
				'apiVersion' => 1,
				'postType'   => 'page',
				'postId'     => $this->post_id,
			],
			$editor->get_host_config( 'page', $this->post_id )
		);
		remove_action( 'enqueue_block_editor_assets', [ $editor, 'enqueue_scripts' ] );
	}

	/**
	 * yStandard 4.59系では投稿設定パネルへ表示することを確認する.
	 */
	public function test_459_uses_ystandard_setting_panel() {
		$this->use_ystandard_theme();
		$context = \ystandard_toolbox\Post_Settings_Registry::get_context( 'page', $this->post_id );

		$this->assertSame(
			\ystandard_toolbox\Post_Settings_Registry::DISPLAY_YSTANDARD_PANEL,
			\ystandard_toolbox\Post_Settings_Registry::get_display_mode( $context )
		);
	}

	/**
	 * yStandard v5以降ではyStandardモーダルへ表示することを確認する.
	 */
	public function test_v5_uses_ystandard_modal() {
		$this->theme_version = '5.0.0-alpha-1';
		$this->use_ystandard_theme();
		$context = \ystandard_toolbox\Post_Settings_Registry::get_context( 'page', $this->post_id );

		$this->assertSame(
			\ystandard_toolbox\Post_Settings_Registry::DISPLAY_YSTANDARD_MODAL,
			\ystandard_toolbox\Post_Settings_Registry::get_display_mode( $context )
		);
	}

	/**
	 * フィルターで投稿設定の表示先を変更できることを確認する.
	 */
	public function test_display_mode_can_be_filtered() {
		$this->use_ystandard_theme();
		$context = \ystandard_toolbox\Post_Settings_Registry::get_context( 'page', $this->post_id );
		add_filter(
			'ys_post_settings_display_mode',
			static function () {
				return false;
			}
		);

		$this->assertFalse( \ystandard_toolbox\Post_Settings_Registry::get_display_mode( $context ) );
	}

	/**
	 * テスト環境を対応版yStandardとして扱う.
	 */
	private function use_ystandard_theme() {
		add_filter( 'pre_option_template', [ $this, 'filter_template' ] );
		add_filter( 'ys_ystandard_version', [ $this, 'filter_ystandard_version' ] );
		add_post_type_support( 'page', 'custom-fields' );
	}

	/**
	 * テスト中の親テーマをyStandardとして返す.
	 *
	 * @return string
	 */
	public function filter_template() {
		return 'ystandard';
	}

	/**
	 * テスト中のyStandardバージョンを返す.
	 *
	 * @return string
	 */
	public function filter_ystandard_version() {
		return $this->theme_version;
	}
}
