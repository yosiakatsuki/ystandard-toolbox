<?php
/**
 * SNSシェアブロック
 *
 * @package ystandard-toolbox
 */

namespace ystandard_toolbox;

defined( 'ABSPATH' ) || die();

/**
 * Class Sns_Share_Block.
 */
class Sns_Share_Block {

	const BLOCK_NAME = 'ystdtb/sns-share';

	/**
	 * Instance.
	 *
	 * @var Sns_Share_Block
	 */
	private static $instance;

	/**
	 * ブロック属性
	 *
	 * @var array
	 */
	private static $attributes;

	/**
	 * Constructor.
	 */
	private function __construct() {
		add_action( 'init', [ $this, 'register_block' ], 100 );
	}

	/**
	 * Instance.
	 *
	 * @return Sns_Share_Block
	 */
	public static function get_instance() {
		if ( ! isset( self::$instance ) ) {
			self::$instance = new self();
		}

		return self::$instance;
	}

	/**
	 * ブロック登録
	 *
	 * @return void
	 */
	public function register_block() {
		// ショートコードが存在する場合のみ登録
		if ( ! shortcode_exists( 'ys_share_button' ) ) {
			return;
		}

		register_block_type(
			__DIR__,
			[
				'render_callback' => [ $this, 'render_callback' ],
			]
		);
	}

	/**
	 * レンダーコールバック
	 *
	 * @param array $attributes ブロック属性.
	 * @param string $content インナーブロック.
	 *
	 * @return string
	 */
	public function render_callback( $attributes, $content = '' ) {
		self::$attributes = $attributes;
		// クラス名作成.
		$classes = $this->get_class_names();

		// テスト.
		$this->get_sns_icon( 'twitter' );

		return sprintf(
			'<div class="%s">%s</div>',
			esc_attr( $classes ),
			''
		);
	}

	/**
	 * クラス名を取得
	 *
	 * @return string
	 */
	private function get_class_names() {
		$class_names = [ 'ystdtb-sns-share' ];

		// 配置クラスの追加
		if ( ! empty( $attributes['align'] ) ) {
			$class_names[] = 'has-align-' . $attributes['align'];
		}

		// カスタムクラスの追加
		if ( ! empty( $attributes['className'] ) ) {
			$class_names[] = $attributes['className'];
		}

		return implode( ' ', $class_names );
	}

	/**
	 *
	 *
	 * @return string
	 */
	private function get_sns_share_buttons_html( $type, $share_button ) {
		if ( empty( $share_button ) ) {
			return '';
		}
		// シェアボタンのタイプに応じたクラス名を設定.
		$type_class        = "is-{$type}";
		$button_color_type = 'icon' === $type ? 'text' : 'bg';

		ob_start();
		?>
		<div class="sns-share is-square">
			<?php if ( isset( $share_button['text']['before'] ) && $share_button['text']['before'] ) : ?>
				<p class="sns-share__before"><?php echo esc_html( $share_button['text']['before'] ); ?></p>
			<?php endif; ?>
			<ul class="sns-share__container">
				<?php foreach ( $share_button['sns'] as $sns => $url ) : ?>
					<li class="sns-share__button sns-bg--<?php echo esc_attr( $sns ); ?> is-<?php echo esc_attr( $sns ); ?>">
						<a class="sns-share__link" href="<?php echo esc_url_raw( $url ); ?>" target="_blank">
							<?php echo $this->get_sns_icon( $sns ); ?>
						</a>
					</li>
				<?php endforeach; ?>
			</ul>
			<?php if ( isset( $share_button['text']['after'] ) && $share_button['text']['after'] ) : ?>
				<p class="sns-share__after"><?php echo esc_html( $share_button['text']['after'] ); ?></p>
			<?php endif; ?>
		</div>
		<?php
		return ob_get_clean();
	}


	private function get_sns_icon( $sns ) {

		$sns_icons = Icon::get_icon( "sns-{$sns}" );

		if ( empty( $sns_icons ) || ! isset( $sns_icons['icon'] ) ) {
			return '';
		}

		return $sns_icons['icon'];
	}


	/**
	 * ブロック属性をショートコード属性に変換
	 *
	 * @param array $attributes ブロック属性.
	 *
	 * @return array
	 */
	private function migrate_attributes( $attributes ) {
		return [
			'type'                 => $attributes['buttonType'] ?? 'circle',
			'x'                    => $attributes['useX'] ?? true,
			'twitter'              => $attributes['useTwitter'] ?? false,
			'facebook'             => $attributes['useFacebook'] ?? true,
			'hatenabookmark'       => $attributes['useHatenaBookmark'] ?? true,
			'pocket'               => false, // サービス終了のため強制的にfalse
			'line'                 => $attributes['useLINE'] ?? true,
			'bluesky'              => $attributes['useBluesky'] ?? false,
			'twitter_via_user'     => $attributes['twitterVia'] ?? '',
			'twitter_related_user' => $attributes['twitterRelatedUser'] ?? '',
			'twitter_hash_tags'    => $attributes['twitterHashTags'] ?? '',
			'before'               => $attributes['labelBefore'] ?? '',
			'after'                => $attributes['labelAfter'] ?? '',
		];
	}


}

Sns_Share_Block::get_instance();
