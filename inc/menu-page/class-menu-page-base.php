<?php
/**
 * @package ystandard-toolbox
 * @author  yosiakatsuki
 * @license GPL-2.0+
 */

namespace ystandard_toolbox\menu;

use ystandard_toolbox\Menu_Page;

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
	 * 設定ページテンプレート
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
	 * Menu_Page_Base constructor.
	 */
	public function __construct() {
		$this->enqueue_script = [];
		add_action( 'admin_init', [ $this, 'save_option' ] );
		add_filter( self::MENU_NAV_HOOK, [ $this, 'menu_nav' ] );
		add_action( 'admin_menu', [ $this, 'add_sub_menu_page' ], 51 );
		add_action( 'admin_enqueue_scripts', [ $this, 'admin_enqueue_scripts' ], 50 );
		add_filter( 'admin_body_class', [ $this, 'admin_body_class' ] );
	}

	/**
	 * 設定値の保存
	 *
	 * @param array $_post $_POST array.
	 */
	abstract public function save( $_post );

	/**
	 * ナビゲーションの追加
	 *
	 * @param array $item Item.
	 *
	 * @return array
	 */
	public function menu_nav( $item ) {
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
		add_submenu_page(
			Menu_Page::MENU_SLUG,
			$this->menu_title,
			$this->menu_label,
			'manage_options',
			Menu_Page::MENU_PAGE_PREFIX . $this->menu_slug,
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
					<form method="post" action="">
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
				<a href="<?php echo Menu_Page::get_menu_page_url( $item['name'] ); ?>"><?php echo esc_html( $item['label'] ); ?></a>
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
		if ( false === strpos( $hook_suffix, Menu_Page::MENU_PAGE_PREFIX ) ) {
			return;
		}
		wp_enqueue_style(
			'ystdtb-admin',
			YSTDTB_URL . '/css/ystandard-toolbox-admin.css',
			[],
			filemtime( YSTDTB_PATH . '/css/ystandard-toolbox-admin.css' )
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
		if ( false === strpos( $hook_suffix, Menu_Page::MENU_PAGE_PREFIX ) ) {
			return $classes;
		}

		return $classes . ' ystdtb-menu-page';
	}

	/**
	 * 保存処理
	 */
	public function save_option() {
		if ( ! isset( $_POST[ self::NONCE_NAME ] ) ) {
			return;
		}
		if ( ! wp_verify_nonce( $_POST[ self::NONCE_NAME ], self::NONCE_ACTION ) ) {
			return;
		}

		$this->save( $_POST );
	}

	/**
	 * 設定内容読み込み
	 */
	protected function load_detail() {
		require_once __DIR__ . '/template/' . $this->template_name . '.php';
	}
}
