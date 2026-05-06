<?php
/**
 * スライダーブロック（親)
 *
 * @package ystandard-toolbox
 */

namespace ystandard_toolbox;

use ystandard_toolbox\Util\Styles;
use ystandard_toolbox\Util\Text;
use ystandard_toolbox\Util\Version;

defined( 'ABSPATH' ) || die();


/**
 * Class Slider_Block.
 */
class Slider_Block {

	/**
	 * ブロック名.
	 */
	const BLOCK_NAME = 'ystdtb/slider';

	/**
	 * Instance.
	 *
	 * @var Slider_Block
	 */
	private static $instance;

	/**
	 * Constructor.
	 */
	private function __construct() {
		add_action( 'init', [ $this, 'register_block' ], 100 );
		add_action( 'enqueue_block_assets', [ $this, 'enqueue_responsive_style' ] );
		add_action( 'enqueue_block_assets', [ $this, 'enqueue_compat_style' ] );
		add_action( 'enqueue_block_assets', [ $this, 'enqueue_frontend_settings' ] );
	}

	/**
	 * レスポンシブ高さ用スタイルの出力
	 *
	 * @return void
	 */
	public function enqueue_responsive_style() {
		$selector = '.ystdtb-slider__slider.is-fixed-height';

		$desktop = <<<CSS
		{$selector}[style*="--ystdtb--desktop--slider--height"] {
			height: var(--ystdtb--desktop--slider--height);
		}
		CSS;

		$tablet = <<<CSS
		{$selector}[style*="--ystdtb--tablet--slider--height"] {
			height: var(--ystdtb--tablet--slider--height);
		}
		CSS;

		$mobile = <<<CSS
		{$selector}[style*="--ystdtb--mobile--slider--height"] {
			height: var(--ystdtb--mobile--slider--height);
		}
		CSS;

		$css  = '';
		$css .= Styles::add_media_query_over_desktop( $desktop );
		$css .= Styles::add_media_query_only_tablet( $tablet );
		$css .= Styles::add_media_query_only_mobile( $mobile );

		$handle = 'ystdtb-slider-responsive';
		wp_register_style( $handle, false );
		wp_add_inline_style( $handle, Text::minify( $css ) );
		wp_enqueue_style( $handle );
	}

	/**
	 * yStandard v4系向けの全幅paddingリセット
	 *
	 * @return void
	 */
	public function enqueue_compat_style() {
		if ( ! $this->is_ystandard_v4() ) {
			return;
		}

		$css = <<<CSS
		.ystdtb-slider.alignfull,
		.ystdtb-slider.alignwide,
		body.has-background .ystdtb-slider.alignfull,
		body.has-background .ystdtb-slider.alignwide {
			padding-right: 0;
			padding-left: 0;
		}
		CSS;

		$handle = 'ystdtb-slider-compat';
		wp_register_style( $handle, false );
		wp_add_inline_style( $handle, Text::minify( $css ) );
		wp_enqueue_style( $handle );
	}

	/**
	 * フロントエンド用設定を出力.
	 *
	 * @return void
	 */
	public function enqueue_frontend_settings() {
		$breakpoints = $this->get_slider_breakpoints();
		if ( empty( $breakpoints ) ) {
			return;
		}

		$handle = generate_block_asset_handle( self::BLOCK_NAME, 'viewScript' );
		$config = [
			'breakpoints' => $breakpoints,
		];
		$script = sprintf(
			'window.ystdtbSliderSettings = %s;',
			wp_json_encode( $config )
		);

		wp_add_inline_script( $handle, $script, 'before' );
	}

	/**
	 * スライダー用ブレークポイントを取得.
	 *
	 * Swiperのtabletキーは、Toolboxのタブレット範囲開始値に合わせる.
	 *
	 * @return array
	 */
	private function get_slider_breakpoints() {
		$breakpoints = Styles::get_breakpoints();
		if ( ! is_array( $breakpoints ) ) {
			return [];
		}
		if ( ! array_key_exists( 'mobile', $breakpoints ) || ! array_key_exists( 'desktop', $breakpoints ) ) {
			return [];
		}

		$unit    = Styles::get_breakpoint_unit();
		$tablet  = $this->convert_breakpoint_to_px( $breakpoints['mobile'], $unit );
		$desktop = $this->convert_breakpoint_to_px( $breakpoints['desktop'], $unit );
		if ( ! $tablet || ! $desktop ) {
			return [];
		}

		return [
			'tablet'  => $tablet,
			'desktop' => $desktop,
		];
	}

	/**
	 * ブレークポイント値をpxに変換.
	 *
	 * CSSメディアクエリのem/remは初期フォントサイズ基準として扱う.
	 *
	 * @param int|float|string $value ブレークポイント値.
	 * @param string           $unit  単位.
	 *
	 * @return int|float|null
	 */
	private function convert_breakpoint_to_px( $value, $unit ) {
		if ( ! is_numeric( $value ) ) {
			return null;
		}

		$value = (float) $value;
		$unit  = strtolower( $unit );
		$rates = [
			'px'  => 1,
			'rem' => 16,
			'em'  => 16,
			'in'  => 96,
			'cm'  => 96 / 2.54,
			'mm'  => 96 / 25.4,
			'q'   => 96 / 101.6,
			'pt'  => 96 / 72,
			'pc'  => 16,
		];

		if ( ! array_key_exists( $unit, $rates ) ) {
			return null;
		}

		$result = $value * $rates[ $unit ];

		return floor( $result ) === $result ? (int) $result : $result;
	}

	/**
	 * yStandard v4系かどうかを判定
	 *
	 * @return bool
	 */
	private function is_ystandard_v4() {
		if ( ! Version::ystandard_version_compare() ) {
			return false;
		}
		$theme         = wp_get_theme( get_template() );
		$theme_version = Version::remove_beta_version( $theme->version );

		return version_compare( $theme_version, '5.0.0', '<' );
	}

	/**
	 * Instance.
	 *
	 * @return Slider_Block
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
		register_block_type( __DIR__ );
	}
}

Slider_Block::get_instance();
