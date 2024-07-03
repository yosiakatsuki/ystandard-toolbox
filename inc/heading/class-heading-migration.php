<?php
/**
 * Heading Setting Migration
 *
 * @package ystandard-toolbox
 * @author  yosiakatsuki
 * @license GPL-2.0+
 */

namespace ystandard_toolbox;

use ystandard_toolbox\Util\Styles;
use ystandard_toolbox\Util\Types;

defined( 'ABSPATH' ) || die();

/**
 * Class Heading_Migration.
 */
class Heading_Migration {

	const RESPONSIVE_PROPERTY = [ 'fontSize', 'textAlign', 'fontWeight', 'padding', 'margin', 'border' ];

	/**
	 * 新設定.
	 *
	 * @var array
	 */
	private $new_option = [];

	/**
	 * 旧設定.
	 *
	 * @var array
	 */
	private $old_option = [];

	/**
	 * レベルに対応する見出しの設定.
	 *
	 * @var array
	 */
	private $heading_level = [];

	/**
	 *  Constructor.
	 */
	public function __construct() {
		add_action( 'rest_api_init', [ $this, 'register_routes' ] );
	}

	/**
	 * 設定変換 v1 -> v2
	 *
	 * @param array $data 設定(v1).
	 *
	 * @return array
	 */
	public function migration( &$data ) {
		$v1_options          = Heading_Compatible::get_option();
		$data['v1']          = $v1_options;
		$v2_options          = [];
		$this->heading_level = [];

		if ( is_array( $v1_options ) && ! empty( $v1_options ) ) {

			foreach ( $v1_options as $level => $option ) {
				// 初期化.
				$this->new_option = [];
				$this->old_option = $option;
				$option_slug      = $this->get_option_slug( $level );
				// 基本.
				$this->set_basic_option( $level );
				$this->set_preset();
				$this->set_typography();
				$this->set_background();
				$this->set_border();
				$this->set_spacing();
				// 疑似要素.
				$this->set_pseudo_elements();

				// 追加.
				$v2_options[ $option_slug ] = $this->new_option;
			}
		}

		$data['v2']    = $v2_options;
		$data['level'] = $this->heading_level;

		return $v2_options;
	}

	/**
	 * 疑似要素のセット.
	 *
	 * @return void
	 */
	private function set_pseudo_elements() {
		$types = [ 'before', 'after' ];
		foreach ( $types as $type ) {
			$preset_name = $this->get_old_option( 'preset', '' );
			$preset      = Heading_Helper::get_preset( $preset_name );
			// プリセットの展開.
			$this->set_pseudo_elements_preset( $type, $preset_name );

			$color_type = $this->get_old_option( "{$type}ColorType", '' );
			$color      = $this->get_old_option( "{$type}Color", '' );
			$content    = $this->get_old_option( "{$type}Content", null );
			$icon       = $this->get_pseudo_elements_icon( $type );
			$size       = $this->get_old_option( "{$type}Size", '' );
			$size_unit  = 'px';
			$icon_size  = '';

			// content.
			if ( $this->has_pseudo_elements( $type ) ) {
				$this->new_option[ $type ]['content'] = ! empty( $content ) ? $content : '""';
			}
			// 色設定.
			$color_type = 'background' === $color_type ? 'backgroundColor' : $color_type;
			$this->add_pseudo_elements_style( $type, $color_type, $color );

			if ( ! empty( $icon ) ) {
				$this->new_option[ $type ]['icon']       = $icon;
				$this->new_option['style']['display']    = 'flex';
				$this->new_option['style']['gap']        = '0.5em';
				$this->new_option['style']['alignItems'] = 'center';

				$font_size = "{$size}em";
				$icon_size = ! empty( $size ) ? "{$size}em" : '';
				if ( empty( $size ) && isset( $preset[ $type ]['fontSize'] ) && ! empty( $preset[ $type ]['fontSize'] ) ) {
					$font_size = $preset[ $type ]['fontSize'];
				}

				// サイズ変更.
				$this->add_pseudo_elements_responsive_style( $type, 'fontSize', "{$font_size}" );
				$size_unit = 'em';
			}

			if ( ! empty( $size ) ) {
				if ( isset( $preset[ $type ]['height'] ) && 0 !== $preset[ $type ]['height'] ) {
					$this->add_pseudo_elements_style( $type, 'height', "{$size}{$size_unit}" );
				}
				if ( isset( $preset[ $type ]['width'] ) && 0 !== $preset[ $type ]['width'] ) {
					$this->add_pseudo_elements_style( $type, 'width', "{$size}{$size_unit}" );
				}
				if ( isset( $preset[ $type ]['fontSize'] ) && 0 !== $preset[ $type ]['fontSize'] ) {
					$this->add_pseudo_elements_responsive_style( $type, 'fontSize', "{$size}{$size_unit}" );
				}
			}
			// アイコンの場合.
			if ( ! empty( $icon_size ) ) {
				$this->add_pseudo_elements_style( $type, 'height', $icon_size );
				$this->add_pseudo_elements_style( $type, 'width', $icon_size );
			}
		}
	}

	/**
	 * 疑似要素のアイコン設定を取得.
	 *
	 * @param string $type before/after.
	 *
	 * @return string.
	 */
	private function get_pseudo_elements_icon( $type ) {
		$icon = $this->get_old_option( "{$type}Icon", '' );
		// 設定にアイコンがない場合、プリセットを参照.
		if ( empty( $icon ) && isset( $this->new_option[ $type ]['icon'] ) ) {
			$icon = $this->new_option[ $type ]['icon'];
		}

		return $icon;
	}

	/**
	 * プリセットの展開.
	 *
	 * @param string $type   before/after.
	 * @param string $preset preset name.
	 *
	 * @return void
	 */
	private function set_pseudo_elements_preset( $type, $preset ) {
		$preset_value = Heading_Helper::get_preset( $preset );
		if ( is_array( $preset_value ) && ! empty( $preset_value ) && isset( $preset_value[ $type ] ) ) {
			foreach ( $preset_value[ $type ] as $key => $value ) {
				// --ystdtb-custom-header -> --ystdtb-custom-heading へ変換.
				$key   = $this->replace_custom_property( $key );
				$value = $this->replace_custom_property( $value );
				if ( in_array( $key, self::RESPONSIVE_PROPERTY, true ) ) {
					$this->add_pseudo_elements_responsive_style( $type, $key, $value );
				} else {
					$this->add_pseudo_elements_style( $type, $key, $value );
				}
			}
		}
	}

	/**
	 * 余白関連設定.
	 *
	 * @return void
	 */
	private function set_spacing() {
		$pos     = [ 'Top', 'Right', 'Bottom', 'Left' ];
		$padding = [];
		$margin  = [];

		// padding.
		foreach ( $pos as $position ) {
			$size = $this->get_old_option( "padding{$position}", '' );
			$unit = $this->get_old_option( "padding{$position}Unit", 'em' );

			if ( '' !== $size ) {
				$size = ! empty( $size ) ? "{$size}{$unit}" : 0;
				// 追加.
				$padding[ strtolower( $position ) ] = $size;
			}
		}
		if ( ! empty( $padding ) ) {
			$this->add_responsive_style( 'padding', [ 'desktop' => $padding ] );
		}

		// margin.
		foreach ( $pos as $position ) {
			$size = $this->get_old_option( "margin{$position}", '' );
			$unit = $this->get_old_option( "margin{$position}Unit", 'em' );

			if ( '' !== $size ) {
				$size = ! empty( $size ) ? "{$size}{$unit}" : 0;
				// 追加.
				$margin[ strtolower( $position ) ] = $size;
			}
		}
		if ( ! empty( $margin ) ) {
			$this->add_responsive_style( 'margin', [ 'desktop' => $margin ] );
		}
	}


	/**
	 * 枠線関連設定.
	 *
	 * @return void
	 */
	private function set_border() {
		// 角丸.
		$radius = $this->get_old_option( 'borderRadius', '' );
		if ( $radius ) {
			$this->add_responsive_style( 'borderRadius', "{$radius}px" );
		}

		$border = [];
		$pos    = [ 'Top', 'Right', 'Bottom', 'Left' ];
		foreach ( $pos as $position ) {
			$border_color = $this->get_old_option( "border{$position}Color", '' );
			$border_width = $this->get_old_option( "border{$position}Width", '' );
			$border_unit  = $this->get_old_option( "border{$position}WidthUnit", 'px' );
			$border_style = $this->get_old_option( "border{$position}Style", '' );

			$border_width = ! empty( $border_width ) && '0' !== $border_width ? "{$border_width}{$border_unit}" : 0;

			if ( $border_width ) {
				$border[ strtolower( $position ) ] = [
					'color' => $border_color,
					'style' => $border_style,
					'width' => $border_width,
				];
			}
		}
		if ( ! empty( $border ) ) {
			$this->add_responsive_style( 'border', $border );
		}
	}

	/**
	 * 背景関連設定.
	 *
	 * @return void
	 */
	private function set_background() {
		// 背景色.
		$bg_color = $this->get_old_option( 'backgroundColor', '' );
		if ( $bg_color ) {
			$this->add_style( 'backgroundColor', $bg_color );
		}
		// 画像.
		$bg_image = $this->get_old_option( 'backgroundImage', '' );
		if ( $bg_image ) {
			$this->add_style( 'backgroundImage', "{$bg_image}" );
		}
		// 背景 位置.
		$bg_pos = $this->get_old_option( 'backgroundPosition', '' );
		if ( $bg_pos ) {
			$this->add_style( 'backgroundPosition', $bg_pos );
		}
		// 背景 繰り返し.
		$bg_repeat = $this->get_old_option( 'backgroundRepeat', '' );
		if ( $bg_repeat ) {
			$this->add_style( 'backgroundRepeat', $bg_repeat );
		}
		// 背景 サイズ.
		$bg_size = $this->get_old_option( 'backgroundSize', '' );
		if ( $bg_size ) {
			$this->add_style( 'backgroundSize', $bg_size );
		}
	}

	/**
	 * プリセットコピー.
	 *
	 * @return void
	 */
	private function set_preset() {
		$preset = Heading_Helper::get_preset( $this->get_old_option( 'preset' ) );
		if ( ! isset( $preset['style'] ) ) {
			return;
		}
		foreach ( $preset['style'] as $key => $value ) {
			// --ystdtb-custom-header -> --ystdtb-custom-heading へ変換.
			$key   = $this->replace_custom_property( $key );
			$value = $this->replace_custom_property( $value );
			// スタイルのセット.
			if ( in_array( $key, self::RESPONSIVE_PROPERTY, true ) ) {
				$this->add_responsive_style( $key, $value );
			} else {
				$this->add_style( $key, $value );
			}
		}
	}

	/**
	 * カスタムプロパティ置換.
	 *
	 * @param string|array $value 名前.
	 *
	 * @return string|array
	 */
	private function replace_custom_property( $value ) {
		if ( ! is_array( $value ) ) {
			return str_replace( '--ystdtb-custom-header', '--ystdtb-custom-heading', $value );
		}

		$new_value = [];
		foreach ( $value as $key => $val ) {
			$new_value[ $key ] = $this->replace_custom_property( $val );
		}

		return $new_value;
	}

	/**
	 * 文字関連設定.
	 *
	 * @return void
	 */
	private function set_typography() {
		// フォントサイズ.
		$unit         = $this->get_old_option( 'fontSizeUnit', 'em' );
		$responsive   = Types::to_bool(
			$this->get_old_option( 'fontSizeResponsive', false )
		);
		$size_desktop = $this->get_old_option( 'fontSizePc', '' );
		$size_tablet  = $this->get_old_option( 'fontSizeTablet', '' );
		$size_mobile  = $this->get_old_option( 'fontSizeMobile', '' );

		$v2_fz = [];
		if ( $size_desktop ) {
			$v2_fz['desktop'] = "{$size_desktop}{$unit}";
		}
		if ( $responsive && $size_tablet ) {
			$v2_fz['tablet'] = "{$size_tablet}{$unit}";
		}
		if ( $responsive && $size_mobile ) {
			$v2_fz['mobile'] = "{$size_mobile}{$unit}";
		}
		if ( ! empty( $v2_fz ) ) {
			$this->add_style( 'fontSize', $v2_fz );
		}
		// 文字色.
		$color = $this->get_old_option( 'fontColor', '' );
		if ( $color ) {
			$this->add_style( 'color', $color );
		}
		// 揃え位置.
		$align = $this->get_old_option( 'fontAlign', '' );
		if ( $align ) {
			$this->add_responsive_style( 'textAlign', $align );
		}
		// 太さ.
		$weight = $this->get_old_option( 'fontWeight', '' );
		if ( $weight ) {
			$this->add_responsive_style( 'fontWeight', $weight );
		}
		// スタイル.
		$font_style = $this->get_old_option( 'fontStyle', '' );
		if ( $font_style ) {
			$this->add_style( 'fontStyle', $font_style );
		}
		// family.
		$family = $this->get_old_option( 'fontFamily', '' );
		if ( $family ) {
			$this->add_style( 'fontFamily', $family );
		}
		// line height.
		$line_height = $this->get_old_option( 'lineHeight', '' );
		if ( $line_height ) {
			$this->add_style( 'lineHeight', $line_height );
		}
		// letter spacing.
		$letter_spacing = $this->get_old_option( 'letterSpacing', '' );
		if ( $letter_spacing ) {
			$this->add_style( 'letterSpacing', "{$letter_spacing}em" );
		}
	}

	/**
	 * 基本設定.
	 *
	 * @param string $level 見出しレベル.
	 *
	 * @return void
	 */
	private function set_basic_option( $level ) {
		$this->new_option['slug']  = $this->get_option_slug( $level );
		$this->new_option['label'] = $this->get_option_label( $level );
		$this->new_option['style'] = [];
		// 有効化.
		$is_enable                  = Types::to_bool( $this->get_old_option( 'useCustomStyle', false ) );
		$this->new_option['enable'] = $is_enable;

		if ( $is_enable ) {
			$this->heading_level[ $level ] = $this->new_option['slug'];
		}
	}

	/**
	 * 疑似要素を持っているか.
	 *
	 * @param string $type before/after.
	 *
	 * @return bool
	 */
	private function has_pseudo_elements( $type ) {
		$color = $this->get_old_option( "{$type}Color", '' );
		$size  = $this->get_old_option( "{$type}Size", '' );
		$icon  = $this->get_pseudo_elements_icon( $type );

		return ! empty( $color ) || ! empty( $size ) || ! empty( $icon );
	}

	/**
	 * 疑似要素スタイルセット.
	 *
	 * @param string $pos   before/after.
	 * @param string $name  Prop Name.
	 * @param mixed  $value value.
	 *
	 * @return void
	 */
	private function add_pseudo_elements_style( $pos, $name, $value ) {
		if ( empty( $name ) && empty( $value ) ) {
			return;
		}
		$this->new_option[ $pos ][ $name ] = $value;
	}

	/**
	 * 疑似要素スタイルセット(レスポンシブ).
	 *
	 * @param string $pos   before/after.
	 * @param string $name  Prop Name.
	 * @param mixed  $value value.
	 *
	 * @return void
	 */
	private function add_pseudo_elements_responsive_style( $pos, $name, $value ) {
		if ( empty( $name ) && empty( $value ) ) {
			return;
		}

		if ( is_array( $value ) && ! isset( $value['desktop'] ) ) {
			$value = [
				'desktop' => $value,
			];
		}

		$value = Styles::get_responsive_value( $value );

		// セット.
		$this->new_option[ $pos ][ $name ] = $value;
	}

	/**
	 * スタイル設定追加.
	 *
	 * @param string $name  Name.
	 * @param mixed  $value Value.
	 *
	 * @return void
	 */
	private function add_style( $name, $value ) {
		$this->new_option['style'][ $name ] = $value;
	}

	/**
	 * スタイル設定追加.
	 *
	 * @param string $name  Name.
	 * @param mixed  $value Responsive Value.
	 *
	 * @return void
	 */
	private function add_responsive_style( $name, $value ) {
		if ( is_array( $value ) && ! isset( $value['desktop'] ) ) {
			$value = [
				'desktop' => $value,
			];
		}

		$value = Styles::get_responsive_value( $value );
		// セット.
		$this->new_option['style'][ $name ] = $value;
	}

	/**
	 * 新設定スラッグ取得.
	 *
	 * @param string $level 見出しレベル.
	 *
	 * @return string
	 */
	private function get_option_slug( $level ) {
		return "v1-{$level}";
	}

	/**
	 * 新設定名取得.
	 *
	 * @param string $level 見出しレベル.
	 *
	 * @return string
	 */
	private function get_option_label( $level ) {
		$names = [
			'h1'            => 'h1',
			'h2'            => 'h2',
			'h3'            => 'h3',
			'h4'            => 'h4',
			'h5'            => 'h5',
			'h6'            => 'h6',
			'sidebar'       => 'サイドバー',
			'footer'        => 'フッター',
			'post-title'    => '投稿タイトル',
			'page-title'    => '固定ページタイトル',
			'archive-title' => '一覧ページタイトル',
		];
		$name  = $this->get_option_slug( $level );

		if ( array_key_exists( $level, $names ) ) {
			$name = 'v1:' . $names[ $level ];
		}

		return $name;
	}

	/**
	 * 旧設定取得
	 *
	 * @param string $key     キー.
	 * @param mixed  $default デフォルト値.
	 *
	 * @return mixed
	 */
	private function get_old_option( $key, $default = '' ) {
		if ( ! array_key_exists( $key, $this->old_option ) ) {
			return $default;
		}

		return $this->old_option[ $key ];
	}

	/**
	 * Register REST API route
	 *
	 * @return void
	 */
	public function register_routes() {
		Api::register_rest_route( 'migration_heading_v1_v2', [ $this, 'api_route' ] );
	}

	/**
	 * 見出しレベル関連の設定追加
	 *
	 * @param \WP_REST_Request $request Request.
	 *
	 * @return \WP_Error|\WP_HTTP_Response|\WP_REST_Response
	 */
	public function api_route( $request ) {
		$data = $request->get_json_params();
		if ( ! is_array( $data ) || ! array_key_exists( 'migration', $data ) ) {
			return Api::create_response(
				false,
				'パラメーターが正しくありません。',
				wp_json_encode( $data )
			);
		}
		if ( ! Types::to_bool( $data['migration'] ) ) {
			return Api::create_response(
				false,
				'パラメーターが正しくありません。',
				wp_json_encode( $data )
			);
		}

		$update       = false;
		$update_level = false;
		$result       = $this->migration( $data );
		if ( ! empty( $result ) ) {
			$update       = Heading::update_heading_design_option( $result );
			$update_level = Heading::update_heading_level_option( $data['level'] );
			// if ( $update && $update_level ) {
			// Heading_Compatible::delete_option();
			// }
		}

		return Api::create_response(
			$update && $update_level,
			'',
			wp_json_encode( $data )
		);
	}
}

new Heading_Migration();
