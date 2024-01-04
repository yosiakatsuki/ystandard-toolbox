<?php
/**
 * Menu Page Base
 *
 * @package ystandard-toolbox
 * @author  yosiakatsuki
 * @license GPL-2.0+
 */

namespace ystandard_toolbox\menu;

use ystandard_toolbox\Admin_Utility;
use ystandard_toolbox\Config;
use ystandard_toolbox\Notice;
use ystandard_toolbox\Utility;

defined( 'ABSPATH' ) || die();

/**
 * Class Menu_Page_Base
 *
 * @package ystandard_toolbox
 */
abstract class Menu_Page_Base {

	/**
	 * Nonce Action.
	 */
	const NONCE_ACTION = 'ystdtb-action';
	/**
	 * Nonce Name.
	 */
	const NONCE_NAME = 'ystdtb-nonce';
	/**
	 * 設定メニュー追加用フック
	 */
	const MENU_NAV_HOOK = 'ystdtb_nav_menu';

	/**
	 * Ajaxアクションプレフィックス
	 */
	const AJAX_ACTION_PREFIX = 'ystdtb_save_options';

	/**
	 * Ajax用設定追加オブジェクト名
	 */
	const AJAX_LOCALIZE_SCRIPT_OBJECT = 'ystdtbAdminAjaxConfig';

	/**
	 * 設定ページテンプレート
	 *
	 * @var string
	 */
	protected $template_name = '';

	/**
	 * メニュースラッグ
	 *
	 * @var string
	 */
	protected $menu_slug = '';
	/**
	 * メニュータイトル
	 *
	 * @var string
	 */
	protected $menu_title = '';
	/**
	 * メニューラベル
	 *
	 * @var string
	 */
	protected $menu_label = '';

	/**
	 * 追加スクリプト
	 *
	 * @var array
	 */
	protected $enqueue_script = [];

	/**
	 * テーマ専用オプション
	 *
	 * @var bool
	 */
	protected $ystandard_only = false;

	/**
	 * 必要テーマバージョン
	 *
	 * @var string
	 */
	protected $need_ystandard_version = '';

	/**
	 * CodeMirrorの動作タイプ
	 *
	 * @var string
	 */
	protected $codemirror_type = '';

	/**
	 * CodeMirrorの追加CSS
	 *
	 * @var string
	 */
	protected $codemirror_style = '';

	/**
	 * Ajax更新処理結果
	 *
	 * @var array
	 */
	protected $ajax_result;

	/**
	 * オプション名
	 *
	 * @var string
	 */
	protected $option_name = '';

	/**
	 * Menu_Page_Base constructor.
	 */
	public function __construct() {
		$this->enqueue_script = [];
		add_action( 'admin_init', [ $this, 'save_option' ] );
		add_filter( self::MENU_NAV_HOOK, [ $this, 'menu_nav' ] );
		add_action( 'admin_menu', [ $this, 'add_sub_menu_page' ], 51 );
		add_action( 'admin_enqueue_scripts', [ $this, 'admin_enqueue_scripts' ], 50 );
		add_filter( 'admin_body_class', [ $this, 'admin_body_class' ], 20 );
	}

	/**
	 * 設定値の保存
	 *
	 * @param array $_post $_POST array.
	 *
	 * @return bool
	 */
	abstract public function save( $_post );

	/**
	 * Ajax処理アクション名取得
	 *
	 * @return string
	 */
	protected function get_ajax_action_name() {
		return self::AJAX_ACTION_PREFIX . '_' . $this->menu_slug;
	}

	/**
	 * Ajaxアクションフック名取得
	 *
	 * @return string
	 */
	protected function get_ajax_action_hook() {
		return 'wp_ajax_' . self::get_ajax_action_name();
	}

	/**
	 * Ajax用のデータ取得
	 *
	 * @return array
	 */
	public static function get_ajax_response_data() {
		return [
			'status'  => 0,
			'message' => '',
			'data'    => [],
			'error'   => false,
		];
	}

	/**
	 * Ajax更新用データ取得
	 *
	 * @return array|null
	 */
	public static function get_ajax_save_data() {
		// 認証.
		if ( ! self::verify_nonce_ajax() ) {
			self::response_ajax( self::response_ajax_forbidden() );

			return null;
		}
		// 設定確認.
		if ( ! isset( $_POST['options'] ) ) {
			self::response_ajax( self::response_ajax_not_found() );

			return null;
		}

		$result = json_decode( stripslashes( $_POST['options'] ), true );
		if ( ! is_array( $result ) ) {
			return null;
		}

		return $result;
	}

	/**
	 * 認証エラーの返却
	 */
	public static function response_ajax_forbidden() {
		$response            = self::get_ajax_response_data();
		$response['status']  = 403;
		$response['message'] = '認証出来ませんでした。ページを再読み込みしてください。';
		$response['error']   = true;

		return $response;
	}

	/**
	 * 必要データ無しエラーの返却
	 */
	public static function response_ajax_not_found() {
		$response            = self::get_ajax_response_data();
		$response['status']  = 404;
		$response['message'] = '必要なデータが送信されていません';
		$response['error']   = true;

		return $response;
	}

	/**
	 * 成功ステータスの返却
	 */
	public static function response_ajax_success() {
		$response            = self::get_ajax_response_data();
		$response['status']  = 200;
		$response['message'] = '更新しました';

		return $response;
	}

	/**
	 * エラーステータスの返却
	 */
	public static function response_ajax_error() {
		$response            = self::get_ajax_response_data();
		$response['status']  = 500;
		$response['message'] = '更新に失敗しました';
		$response['error']   = true;

		return $response;
	}

	/**
	 * Ajax認証
	 *
	 * @return bool
	 */
	public static function verify_nonce_ajax() {

		if ( ! isset( $_POST['nonce'] ) || ! isset( $_POST['nonceAction'] ) ) {
			return false;
		}

		if ( ! wp_verify_nonce( $_POST['nonce'], $_POST['nonceAction'] ) ) {
			return false;
		}

		return true;
	}

	/**
	 * Ajax返却
	 *
	 * @param array $response response data.
	 */
	public static function response_ajax( $response ) {
		header( 'Content-Type: application/json; charset=utf-8' );
		echo json_encode( $response );
		die();
	}

	/**
	 * Ajax URL 取得.
	 *
	 * @return string
	 */
	protected function get_ajax_url() {

		return admin_url( 'admin-ajax.php?action=' . $this->get_ajax_action_name() );
	}


	/**
	 * メニューを有効化できるか
	 *
	 * @return bool
	 */
	protected function enable_menu() {
		if ( ! $this->menu_slug ) {
			return false;
		}
		if ( $this->ystandard_only && ! Utility::ystandard_version_compare( $this->need_ystandard_version ) ) {
			return false;
		}

		return true;
	}

	/**
	 * ナビゲーションの追加
	 *
	 * @param array $item Item.
	 *
	 * @return array
	 */
	public function menu_nav( $item ) {
		if ( ! $this->enable_menu() ) {
			return $item;
		}
		$item[] = $this->get_menu_nav_args(
			$this->menu_slug,
			$this->menu_label
		);

		return $item;
	}

	/**
	 * サブメニューページ追加
	 */
	public function add_sub_menu_page() {
		if ( ! $this->enable_menu() ) {
			return;
		}
		add_submenu_page(
			Config::ADMIN_MENU_PARENT_SLUG,
			$this->menu_title,
			$this->menu_label,
			'manage_options',
			Config::ADMIN_MENU_PAGE_PREFIX . '-' . $this->menu_slug,
			[ $this, 'menu_page' ]
		);
	}

	/**
	 * 設定ページ表示
	 */
	public function menu_page() {
		if ( ! current_user_can( 'manage_options' ) ) {
			wp_die( __( 'You do not have sufficient permissions to access this page.' ) );
		}
		?>
		<div class="wrap">
			<div class="ystdtb-menu">
				<ul class="ystdtb-menu__nav">
					<?php $this->create_menu_nav(); ?>
				</ul>
				<div class="ystdtb-menu__detail">
					<form id="ystdtb-menu" method="post" action="">
						<?php
						wp_nonce_field( self::NONCE_ACTION, self::NONCE_NAME );
						$this->load_detail();
						?>
					</form>
				</div>
			</div>
		</div>
		<?php
	}

	/**
	 * メニューナビゲーション作成
	 */
	private function create_menu_nav() {
		$nav = apply_filters( self::MENU_NAV_HOOK, [] );
		foreach ( $nav as $item ) {
			$current = $item['name'] === $this->menu_slug ? 'is-current' : '';
			?>
			<li class="ystdtb-menu__nav-item <?php echo $current; ?>">
				<a href="<?php echo Admin_Utility::get_menu_page_url( $item['name'] ); ?>"><?php echo esc_html( $item['label'] ); ?></a>
			</li>
			<?php
		}
	}

	/**
	 * ナビゲーション作成用配列作成
	 *
	 * @param string $name  Name.
	 * @param string $label Label.
	 *
	 * @return array
	 */
	protected function get_menu_nav_args( $name, $label ) {
		return [
			'name'  => $name,
			'label' => $label,
		];
	}

	/**
	 * 管理画面-スクリプトの読み込み
	 *
	 * @param string $hook_suffix suffix.
	 *
	 * @return void
	 */
	public function admin_enqueue_scripts( $hook_suffix ) {
		if ( false === strpos( $hook_suffix, Config::ADMIN_MENU_PAGE_PREFIX ) ) {
			return;
		}
		wp_enqueue_style(
			'ystdtb-admin',
			YSTDTB_URL . '/css/ystandard-toolbox-admin.css',
			[],
			filemtime( YSTDTB_PATH . '/css/ystandard-toolbox-admin.css' )
		);
		wp_enqueue_script(
			'ystdtb-admin',
			YSTDTB_URL . '/js/admin/admin.js',
			[],
			filemtime( YSTDTB_PATH . '/js/admin/admin.js' ),
			true
		);

		wp_localize_script(
			'ystdtb-admin',
			'ystdtbAdminConfig',
			[
				'siteUrl'     => esc_url_raw( home_url() ),
				'pluginUrl'   => YSTDTB_URL,
				'nonceAction' => self::NONCE_ACTION,
				'nonceValue'  => wp_create_nonce( self::NONCE_ACTION ),
			]
		);
		foreach ( $this->enqueue_script as $item ) {
			wp_enqueue_style(
				'ystdtb-' . $item['name'],
				$item['url'],
				$item['deps'],
				$item['version']
			);
		}
	}

	/**
	 * Body Class.
	 *
	 * @param string $classes Classes.
	 *
	 * @return string
	 */
	public function admin_body_class( $classes ) {
		global $hook_suffix;
		if ( false === strpos( $hook_suffix, Config::ADMIN_MENU_PAGE_PREFIX ) ) {
			return $classes;
		}
		if ( false === strpos( $classes, 'ystdtb-menu-page' ) ) {
			$classes = $classes . ' ystdtb-menu-page';
		}

		return $classes;
	}

	/**
	 * CodeMirrorの読み込み
	 */
	protected function enqueue_codemirror() {
		add_action( 'admin_enqueue_scripts', [ $this, 'enqueue_codemirror_scripts' ] );
	}

	/**
	 * CodeMirrorスクリプトの読み込み
	 *
	 * @param string $hook_suffix suffix.
	 *
	 * @return void
	 */
	public function enqueue_codemirror_scripts( $hook_suffix ) {
		if ( ! $this->is_toolbox_menu_page( $hook_suffix ) ) {
			return;
		}
		if ( ! $this->codemirror_type ) {
			return;
		}
		$settings['codeEditor'] = wp_enqueue_code_editor(
			[ 'type' => $this->codemirror_type ]
		);
		if ( false === $settings ) {
			return;
		}
		// Scripts.
		wp_enqueue_script( 'wp-theme-plugin-editor' );
		wp_localize_script( 'wp-theme-plugin-editor', 'codeEditorSettings', $settings );
		wp_add_inline_script(
			'wp-theme-plugin-editor',
			'jQuery(document).ready(function($) { 
				var input = $(\'.code-input\');
				$(\'.code-input\').each(function(index, element) {
					wp.codeEditor.initialize(element, codeEditorSettings );
				})
			})'
		);
		// Style.
		wp_enqueue_style( 'wp-codemirror' );
		wp_add_inline_style(
			'wp-codemirror',
			".CodeMirror {border: 1px solid #ddd;{$this->codemirror_style}}"
		);
	}

	/**
	 * 保存処理
	 */
	public function save_option() {
		if ( ! isset( $_POST[ self::NONCE_NAME ] ) ) {
			return;
		}
		if ( ! wp_verify_nonce( $_POST[ self::NONCE_NAME ], self::NONCE_ACTION ) ) {
			Notice::set_notice( [ $this, 'notice_save_error' ] );

			return;
		}

		if ( $this->save( $_POST ) ) {
			Notice::set_notice( [ $this, 'notice_save_success' ] );
		};
	}

	/**
	 * 設定更新エラー
	 */
	public function notice_save_error() {
		Notice::error( '設定を更新できませんでした。' );
	}

	/**
	 * 設定更新完了
	 */
	public function notice_save_success() {
		Notice::success( '設定を更新しました。' );
	}

	/**
	 * 設定内容読み込み
	 */
	protected function load_detail() {
		require_once __DIR__ . '/template/' . $this->template_name . '.php';
	}

	/**
	 * 管理画面用スクリプト読み込み
	 *
	 * @param string $name      Name.
	 * @param array  $deps      Deps.
	 * @param bool   $in_footer In Footer.
	 */
	protected function enqueue_admin_script( $name, $deps = [], $in_footer = true ) {
		$ver = gmdate( 'YmdHis' );
		if ( file_exists( YSTDTB_PATH . "/js/admin/{$name}.js" ) ) {
			$ver = filemtime( YSTDTB_PATH . "/js/admin/{$name}.js" );
		}
		wp_enqueue_script(
			"ystdtb-{$name}",
			YSTDTB_URL . "/js/admin/{$name}.js",
			$deps,
			$ver,
			$in_footer
		);
	}

	/**
	 * 管理画面用スクリプトデータ追加
	 *
	 * @param string $name        Name.
	 * @param string $object_name Object Name.
	 * @param array  $args        Args.
	 */
	protected function enqueue_admin_localize_script( $name, $object_name, $args ) {
		$args['site-url']   = esc_url_raw( home_url() );
		$args['plugin-url'] = YSTDTB_URL;
		wp_localize_script( "ystdtb-{$name}", $object_name, $args );
	}

	/**
	 * 管理画面用スクリプトデータ追加(Ajax処理用)
	 *
	 * @param string $name        Name.
	 * @param string $object_name Object Name.
	 * @param string $option_name Option Name.
	 * @param array  $options     Options.
	 * @param array  $config      Config.
	 */
	protected function enqueue_admin_localize_script_ajax( $name, $object_name, $option_name, $options, $config = [] ) {
		$config = array_merge(
			[
				'optionName' => $option_name,
				'ajaxUrl'    => $this->get_ajax_url(),
			],
			$config
		);
		wp_localize_script(
			"ystdtb-{$name}",
			$object_name,
			[
				'config'  => $config,
				'options' => $options,
			]
		);
	}

	/**
	 * Toolboxの管理画面チェック
	 *
	 * @param string $hook_suffix Page Suffix.
	 *
	 * @return bool
	 */
	protected function is_toolbox_menu_page( $hook_suffix ) {
		if ( false === strpos( $hook_suffix, Config::ADMIN_MENU_PAGE_PREFIX . '-' . $this->menu_slug ) ) {
			return false;
		}

		return true;
	}
}
