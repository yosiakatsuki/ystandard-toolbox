<?php
/**
 * @package ystandard-toolbox
 * @author  yosiakatsuki
 * @license GPL-2.0+
 */

namespace ystandard_toolbox;

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
	 * 現在ページ
	 *
	 * @var string
	 */
	protected $current_page = '';

	/**
	 * 設定ページテンプレート
	 * @var string
	 */
	protected $template_name = '';

	/**
	 * Menu_Page_Base constructor.
	 */
	public function __construct() {
		add_action( 'admin_init', [ $this, 'save_option' ] );
	}

	/**
	 * 設定値の保存
	 *
	 * @param array $_post $_POST array.
	 */
	abstract protected function save( $_post );

	/**
	 * 設定ページ表示
	 */
	public function menu_page() {
		if ( ! current_user_can( 'manage_options' ) ) {
			wp_die( __( 'You do not have sufficient permissions to access this page.' ) );
		}
		?>
		<div class="wrap ystdtb-menu-page">
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
			$current = $item['name'] === $this->current_page ? 'is-current' : '';
			?>
			<li class="ystdtb-menu__nav-item <?php echo $current; ?>">
				<a href="<?php echo Menu_Page::get_menu_page_url( $item['name'] ); ?>"></a>
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
