<?php
/**
 * SNSシェアブロック
 *
 * @package ystandard-toolbox
 */

namespace ystandard_toolbox;

use ystandard_toolbox\Util\Post;
use ystandard_toolbox\Util\Scripts;
use ystandard_toolbox\Util\Types;
use ystandard_toolbox\Util\URL;
use ystandard_toolbox\Util\Version;

defined( 'ABSPATH' ) || die();

/**
 * Class Sns_Share_Block.
 */
class Sns_Share_Block {

	const BLOCK_NAME = 'ystdtb/sns-share';

	/**
	 * Facebook API Version
	 */
	const FACEBOOK_API_VERSION = 'v23.0';

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

		$share_button_param = self::get_share_button_param( self::$attributes );
		// シェアボタンHTML取得.
		if ( 'official' === self::$attributes['buttonType'] ) {
			// 公式ボタンのHTML取得.
			self::enqueue_script( self::$attributes );
			$share_button_html = $this->get_sns_share_buttons_official_html( $share_button_param );
		} else {
			// カスタムボタンのHTML取得.
			$share_button_html = $this->get_sns_share_buttons_html(
				self::$attributes['buttonType'],
				$share_button_param
			);
		}

		return $share_button_html;
	}

	/**
	 * クラス名を取得
	 *
	 * @param array $attributes ブロック属性.
	 *
	 * @return string
	 */
	public static function get_wrap_class_names( $attributes ) {
		$class_names = [ 'ystdtb-sns-share' ];

		// 配置クラスの追加
		if ( ! empty( $attributes['align'] ) ) {
			$class_names[] = 'has-align-' . $attributes['align'];
		}

		// カスタムクラスの追加
		if ( ! empty( $attributes['className'] ) ) {
			$class_names[] = $attributes['className'];
		}

		$type          = $attributes['buttonType'] ?? 'circle';
		$class_names[] = "is-{$type}";

		return implode( ' ', $class_names );
	}

	/**
	 * シェアボタンのHTMLを取得
	 *
	 * @return string
	 */
	private function get_sns_share_buttons_html( $type, $share_button ) {
		if ( empty( $share_button ) ) {
			return '';
		}

		// クラス名作成.
		$classes = self::get_wrap_class_names( self::$attributes );
		// シェアボタンのタイプに応じたクラス名を設定.
		$button_color_type = 'icon' === $type ? 'ystdtb-sns-share-text--' : 'ystdtb-sns-share-bg--';

		ob_start();
		?>
		<div class="<?php echo esc_attr( $classes ); ?>">
			<?php if ( isset( $share_button['text']['before'] ) && $share_button['text']['before'] ) : ?>
				<p class="ystdtb-sns-share__before-text"><?php echo esc_html( $share_button['text']['before'] ); ?></p>
			<?php endif; ?>
			<ul class="ystdtb-sns-share__container">
				<?php foreach ( $share_button['sns'] as $sns => $url ) : ?>
					<li class="ystdtb-sns-share__button <?php echo esc_attr( $button_color_type ) . esc_attr( $sns ); ?> is-<?php echo esc_attr( $sns ); ?>">
						<a class="ystdtb-sns-share__link" href="<?php echo esc_url_raw( $url ); ?>" target="_blank">
							<?php echo self::get_sns_icon( $sns ); ?>
						</a>
					</li>
				<?php endforeach; ?>
			</ul>
			<?php if ( isset( $share_button['text']['after'] ) && $share_button['text']['after'] ) : ?>
				<p class="ystdtb-sns-share__after-text"><?php echo esc_html( $share_button['text']['after'] ); ?></p>
			<?php endif; ?>
		</div>
		<?php

		return apply_filters(
			'ystdtb/blocks/sns_share/get_sns_share_buttons_html',
			ob_get_clean(),
			$share_button
		);
	}


	/**
	 * 公式シェアボタンのHTMLを取得
	 *
	 * @param array $share_button シェアボタンのパラメータ.
	 *
	 * @return false|string
	 */
	private function get_sns_share_buttons_official_html( $share_button ) {
		if ( empty( $share_button ) ) {
			return '';
		}

		// X,Twitter関連の属性作成.
		$url          = $share_button['official']['url'];
		$title        = $share_button['official']['title'];
		$twitter_attr = '';
		if ( isset( $share_button['official']['twitter-via'] ) && $share_button['official']['twitter-via'] ) {
			$twitter_attr .= ' data-via="' . $share_button['official']['twitter-via'] . '"';
		}
		if ( isset( $share_button['official']['twitter-related'] ) && $share_button['official']['twitter-related'] ) {
			$twitter_attr .= ' data-related="' . $share_button['official']['twitter-related'] . '"';
		}
		// クラス名作成.
		$classes = self::get_wrap_class_names( self::$attributes );

		ob_start();
		?>
		<div class="<?php echo esc_attr( $classes ); ?>">
			<?php if ( isset( $share_button['text']['before'] ) && $share_button['text']['before'] ) : ?>
				<p class="ystdtb-sns-share__before"><?php echo esc_html( $share_button['text']['before'] ); ?></p>
			<?php endif; ?>
			<ul class="ystdtb-sns-share__container">
				<?php if ( isset( $share_button['sns']['twitter'] ) || isset( $share_button['sns']['x'] ) ) : ?>
					<li class="ystdtb-sns-share__button is-twitter">
						<a href="https://twitter.com/share?ref_src=twsrc%5Etfw" class="twitter-share-button" data-text="<?php echo esc_attr( $title ); ?>" data-url="<?php echo esc_url_raw( $url ); ?>"<?php echo $twitter_attr; ?> data-show-count="false">Tweet</a>
					</li>
				<?php endif; ?>
				<?php if ( isset( $share_button['sns']['facebook'] ) ) : ?>
					<li class="ystdtb-sns-share__button is-facebook">
						<div class="fb-share-button" data-href="<?php echo esc_url_raw( $url ); ?>" data-width="" data-layout="button" data-action="like"></div>
					</li>
				<?php endif; ?>
				<?php if ( isset( $share_button['sns']['hatenabookmark'] ) ) : ?>
					<li class="ystdtb-sns-share__button is-hatenabookmark">
						<a href="https://b.hatena.ne.jp/entry/" class="hatena-bookmark-button" data-hatena-bookmark-layout="basic-label-counter" data-hatena-bookmark-lang="ja" title="このエントリーをはてなブックマークに追加"><img src="https://b.st-hatena.com/images/v4/public/entry-button/button-only@2x.png" alt="このエントリーをはてなブックマークに追加" width="20" height="20" style="border: none;"/></a>
					</li>
				<?php endif; ?>
				<?php if ( isset( $share_button['sns']['line'] ) ) : ?>
					<li class="ystdtb-sns-share__button is-line">
						<div class="line-it-button" data-lang="ja" data-type="share-a" data-ver="3" data-url="<?php echo esc_url_raw( $url ); ?>" data-color="default" data-size="small" data-count="false" style="display: none;"></div>
					</li>
				<?php endif; ?>
			</ul>
			<?php if ( isset( $share_button['text']['after'] ) && $share_button['text']['after'] ) : ?>
				<p class="ystdtb-sns-share__after"><?php echo esc_html( $share_button['text']['after'] ); ?></p>
			<?php endif; ?>
		</div>
		<?php

		return apply_filters(
			'ystdtb/blocks/sns_share/get_sns_share_buttons_official_html',
			ob_get_clean(),
			$share_button
		);
	}

	/**
	 * シェアボタンのパラメータを取得
	 *
	 * @param array $attribute ブロック属性.
	 *
	 * @return array
	 */
	public static function get_share_button_param( $attributes ) {
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
		$twitter_via        = $attributes['twitterVia'];
		$twitter_related    = $attributes['twitterRelatedUser'];
		$twitter_hash_tags  = $attributes['twitterHashTags'];
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
		if ( Types::to_bool( $attributes['useX'] ) ) {
			/**
			 * URL作成
			 */
			$result['sns']['x'] = $twitter_share_url;
		}
		// 「Twitter」の情報.
		if ( Types::to_bool( $attributes['useTwitter'] ) ) {
			/**
			 * URL作成
			 */
			$result['sns']['twitter'] = $twitter_share_url;
		}

		// 「Facebook」の情報.
		if ( Types::to_bool( $attributes['useFacebook'] ) ) {
			$result['sns']['facebook'] = "https://www.facebook.com/sharer.php?src=bm&u={$share_url}&t={$share_title}";
		}

		//「Bluesky」の情報.
		if ( Types::to_bool( $attributes['useBluesky'] ) ) {
			$result['sns']['bluesky'] = "https://bsky.app/intent/compose?text\"={$share_url} {$share_title}\"";
		}

		// 「はてなブックマーク」の情報.
		if ( Types::to_bool( $attributes['useHatenaBookmark'] ) ) {
			$result['sns']['hatenabookmark'] = "https://b.hatena.ne.jp/add?mode=confirm&url={$share_url}";
		}

		//「LINE」の情報.
		if ( Types::to_bool( $attributes['useLINE'] ) ) {
			$result['sns']['line'] = "https://social-plugins.line.me/lineit/share?url={$share_url}";
		}

		$result['text']['before'] = $attributes['labelBefore'];
		$result['text']['after']  = $attributes['labelAfter'];

		$result['className']  = $attributes['className'] ?? '';
		$result['buttonType'] = $attributes['buttonType'] ?? '';

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
	 * SNSシェア用スクリプトの読み込み
	 *
	 * @param array $attributes ブロック属性.
	 *
	 * @return void
	 */
	public static function enqueue_script( $attributes ) {
		if ( Types::to_bool( $attributes['useX'] ) || Types::to_bool( $attributes['useTwitter'] ) ) {
			$handle = 'ystdtb-sns-share-script-twitter';
			wp_enqueue_script(
				$handle,
				'https://platform.twitter.com/widgets.js',
				[],
				null,
				true
			);
			Scripts::add_defer( $handle );
			Scripts::add_async( $handle );
		}

		if ( Types::to_bool( $attributes['useFacebook'] ) ) {
			$sdk_ver = apply_filters( 'ystdtb/blocks/sns_share/facebook_sdk_version', self::FACEBOOK_API_VERSION );
			$handle  = 'ystdtb-sns-share-script-facebook';
			wp_enqueue_script(
				$handle,
				"https://connect.facebook.net/ja_JP/sdk.js#xfbml=1&version={$sdk_ver}",
				[],
				null,
				true
			);
			Scripts::add_defer( $handle );
			Scripts::add_async( $handle );
			Scripts::add_crossorigin( $handle, 'anonymous' );
		}

		if ( Types::to_bool( $attributes['useHatenaBookmark'] ) ) {
			$handle = 'ystdtb-sns-share-script-hatenabookmark';
			wp_enqueue_script(
				$handle,
				'https://b.st-hatena.com/js/bookmark_button.js',
				[],
				null,
				true
			);
			Scripts::add_defer( $handle );
			Scripts::add_async( $handle );
		}

		if ( Types::to_bool( $attributes['useLINE'] ) ) {
			$handle = 'ystdtb-sns-share-script-line';
			wp_enqueue_script(
				$handle,
				'https://d.line-scdn.net/r/web/social-plugin/js/thirdparty/loader.min.js',
				[],
				null,
				true
			);
			Scripts::add_defer( $handle );
			Scripts::add_async( $handle );
		}
	}
}

Sns_Share_Block::get_instance();
