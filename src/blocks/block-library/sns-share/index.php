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
	 * @param array  $attributes ブロック属性.
	 * @param string $content    インナーブロック.
	 *
	 * @return string
	 */
	public function render_callback( $attributes, $content = '' ) {
		$class_names = [ 'ystdtb-sns-share' ];

		// 配置クラスの追加
		if ( ! empty( $attributes['align'] ) ) {
			$class_names[] = 'has-align-' . $attributes['align'];
		}

		// カスタムクラスの追加
		if ( ! empty( $attributes['className'] ) ) {
			$class_names[] = $attributes['className'];
		}

		$classes = implode( ' ', $class_names );

		// ブロック属性をショートコード属性に変換
		$shortcode_attributes = $this->migrate_attributes( $attributes );
		$shortcode_params = $this->build_shortcode_params( $shortcode_attributes );

		return sprintf(
			'<div class="%s">%s</div>',
			esc_attr( $classes ),
			do_shortcode( "[ys_share_button {$shortcode_params}]" )
		);
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

	/**
	 * ショートコードパラメータ文字列を構築
	 *
	 * @param array $attributes 属性配列.
	 *
	 * @return string
	 */
	private function build_shortcode_params( $attributes ) {
		$params = [];

		foreach ( $attributes as $key => $value ) {
			if ( is_bool( $value ) ) {
				$params[] = $key . '="' . ( $value ? 'true' : 'false' ) . '"';
			} elseif ( ! empty( $value ) ) {
				$params[] = $key . '="' . esc_attr( $value ) . '"';
			}
		}

		return implode( ' ', $params );
	}
}

Sns_Share_Block::get_instance();