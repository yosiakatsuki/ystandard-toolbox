<?php
/**
 * SNSシェアブロック
 *
 * @package ystandard-toolbox
 */

namespace ystandard_toolbox;

use ystandard_toolbox\Util\Post;
use ystandard_toolbox\Util\Types;
use ystandard_toolbox\Util\URL;

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
		// 設定値の初期化.
		self::$attributes = array_merge(
			[
				'buttonType'         => 'circle',
				'useX'               => true,
				'useTwitter'         => false,
				'useFacebook'        => true,
				'useHatenaBookmark'  => true,
				'useLINE'            => true,
				'useBluesky'         => false,
				'twitterVia'         => '',
				'twitterRelatedUser' => '',
				'twitterHashTags'    => '',
				'labelBefore'        => '',
				'labelAfter'         => '',
			],
			$attributes,
		);
		// クラス名作成.
		$classes = self::get_wrap_class_names();

		// シェアボタンHTML取得.
		$share_button = '';
		if ( 'official' === self::$attributes['buttonType'] ) {

		} else {
			$share_button = $this->get_sns_share_buttons_html(
				self::$attributes['buttonType'],
				self::get_share_button_param( self::$attributes )
			);
		}
		
		return sprintf(
			'<div class="%s">%s</div>',
			esc_attr( $classes ),
			$share_button
		);
	}

	/**
	 * クラス名を取得
	 *
	 * @return string
	 */
	public static function get_wrap_class_names() {
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
		$button_color_type = 'icon' === $type ? 'sns-text--' : 'sns-bg--';

		ob_start();
		?>
		<div class="sns-share <?php echo esc_attr( $type_class ); ?>">
			<?php if ( isset( $share_button['text']['before'] ) && $share_button['text']['before'] ) : ?>
				<p class="sns-share__before"><?php echo esc_html( $share_button['text']['before'] ); ?></p>
			<?php endif; ?>
			<ul class="sns-share__container">
				<?php foreach ( $share_button['sns'] as $sns => $url ) : ?>
					<li class="sns-share__button <?php echo esc_attr( $button_color_type ) . esc_attr( $sns ); ?> is-<?php echo esc_attr( $sns ); ?>">
						<a class="sns-share__link" href="<?php echo esc_url_raw( $url ); ?>" target="_blank">
							<?php echo self::get_sns_icon( $sns ); ?>
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


	public static function get_share_button_param( $attribute ) {
		$result = [];
		// URL情報.
		$url         = apply_filters( 'ystdtb/blocks/sns_share/share_btn_url', URL::get_page_url() );
		$title       = apply_filters( 'ystdtb/blocks/sns_share/share_btn_title', Post::get_page_title() );
		$share_url   = rawurlencode( $url );
		$share_title = rawurlencode( html_entity_decode( $title ) );
		// URL情報のセット.
		$result['official']['url-encode']   = $share_url;
		$result['official']['title-encode'] = $share_title;
		$result['official']['url']          = $url;
		$result['official']['title']        = $title;

		// 「x」「Twitter」共通.
		$twitter_via        = $attribute['twitterVia'];
		$twitter_related    = $attribute['twitterRelatedUser'];
		$twitter_hash_tags  = $attribute['twitterHashTags'];
		$twitter_url_option = '';
		if ( ! empty( $twitter_via ) ) {
			$result['official']['twitter-via'] = $twitter_via;
			$twitter_url_option                .= "&via={$twitter_via}";
		}
		if ( ! empty( $twitter_related ) ) {
			$result['official']['twitter-related'] = $twitter_related;
			$twitter_url_option                    .= "&related={$twitter_related}";
		}
		if ( ! empty( $twitter_hash_tags ) ) {
			$result['official']['twitter-hash-tags'] = $twitter_hash_tags;
			$twitter_url_option                      .= "&hashtags={$twitter_hash_tags}";
		}
		$twitter_share_url = "https://twitter.com/intent/tweet?text={$share_title}&url={$share_url}{$twitter_url_option}";

		// 「X」の情報.
		if ( Types::to_bool( $attribute['useX'] ) ) {
			/**
			 * URL作成
			 */
			$result['sns']['x'] = $twitter_share_url;
		}
		// 「Twitter」の情報.
		if ( Types::to_bool( $attribute['useTwitter'] ) ) {
			/**
			 * URL作成
			 */
			$result['sns']['twitter'] = $twitter_share_url;
		}

		// 「Facebook」の情報.
		if ( Types::to_bool( $attribute['useFacebook'] ) ) {
			$result['sns']['facebook'] = "https://www.facebook.com/sharer.php?src=bm&u={$share_url}&t={$share_title}";
		}

		//「Bluesky」の情報.
		if ( Types::to_bool( $attribute['useBluesky'] ) ) {
			$result['sns']['bluesky'] = "https://bsky.app/intent/compose?text\"={$share_url} {$share_title}\"";
		}

		// 「はてなブックマーク」の情報.
		if ( Types::to_bool( $attribute['useHatenaBookmark'] ) ) {
			$result['sns']['hatenabookmark'] = "https://b.hatena.ne.jp/add?mode=confirm&url={$share_url}";
		}

		//「LINE」の情報.
		if ( Types::to_bool( $attribute['useLINE'] ) ) {
			$result['sns']['line'] = "https://social-plugins.line.me/lineit/share?url={$share_url}";
		}

		$result['text']['before'] = $attribute['labelBefore'];
		$result['text']['after']  = $attribute['labelAfter'];

		return $result;
	}


	/**
	 * SNSアイコンを取得
	 *
	 * @param string $sns SNSの種類（例: 'twitter', 'facebook' など）
	 *
	 * @return mixed|string
	 */
	public static function get_sns_icon( $sns ) {

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
