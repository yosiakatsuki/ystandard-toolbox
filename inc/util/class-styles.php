<?php
/**
 * スタイル関連
 *
 * @package ystandard-toolbox
 * @author  yosiakatsuki
 * @license GPL-2.0+
 */

namespace ystandard_toolbox\Util;

use ystandard_toolbox\Config;

defined( 'ABSPATH' ) || die();

/**
 * Class Styles.
 */
class Styles {

	/**
	 * CSS作成.
	 *
	 * @param array|string $styles Styles.
	 *
	 * @return string
	 */
	public static function get_styles_css( $styles ) {
		if ( empty( $styles ) ) {
			return '';
		}
		if ( ! is_array( $styles ) ) {
			return $styles;
		}
		$css = [];

		foreach ( $styles as $key => $value ) {
			if ( is_array( $value ) ) {
				$parse_css = self::get_styles_css( $value );
				if ( is_array( $parse_css ) && ! empty( $parse_css ) ) {
					$css = array_merge( $css, $parse_css );
				}
			} else {
				$css[] = "{$key}:{$value}";
			}
		}

		return '{' . implode( ';', $css ) . ';}';
	}


	/**
	 * スタイル設定をCSSとして扱えるように変換.
	 *
	 * @param array  $styles          CSS設定.
	 * @param string $pseudo_elements 疑似要素処理用.
	 *
	 * @return array
	 */
	public static function parse_styles( $styles, $pseudo_elements = '' ) {
		if ( ! is_array( $styles ) || empty( $styles ) ) {
			return [];
		}
		$result  = [];
		$desktop = [];
		$tablet  = [];
		$mobile  = [];

		foreach ( $styles as $key => $value ) {
			$property = Text::camel_to_kebab( $key );

			if ( ! self::is_responsive_style( $value ) ) {
				$value = [ 'desktop' => $value ];
			}

			if ( self::is_border( $property ) ) {
				$value = self::parse_border_style( $value );
			}
			if ( self::is_spacing( $property ) ) {
				$value = self::parse_spacing_style( $property, $value );
			}

			if ( is_array( $value['desktop'] ) ) {
				$desktop = array_merge( $desktop, $value['desktop'] );
			} else {
				$desktop[ $property ] = $value['desktop'];
			}

			// 色関係のカスタム変数追加.
			if ( 'backgroundColor' === $key || 'color' === $key ) {
				if ( is_string( $value['desktop'] ) && false !== strpos( $value['desktop'], '#' ) ) {
					$var_prefix = ! empty( $pseudo_elements ) ? "-{$pseudo_elements}" : '';
					$var_prefix = "--ystdtb-custom-header{$var_prefix}";
					$color_rgb  = self::hex_2_rgb( $value['desktop'] );
					$color_rgb  = implode( ',', $color_rgb );
					$type       = 'backgroundColor' === $key ? 'bg-color' : 'color';
					// 色.
					$color_var[ "{$var_prefix}-{$type}" ]      = $value['desktop'];
					$color_var[ "{$var_prefix}-{$type}-rgb" ]  = "rgb({$color_rgb})";
					$color_var[ "{$var_prefix}-{$type}-rgba" ] = "rgba({$color_rgb},var({$var_prefix}-{$type}-rbga-opacity,1))";
					// マージ.
					$desktop = array_merge( $color_var, $desktop );
				}
			}

			if ( array_key_exists( 'tablet', $value ) ) {
				if ( is_array( $value['tablet'] ) ) {
					$tablet = array_merge( $tablet, $value['tablet'] );
				} else {
					$tablet[ $property ] = $value['tablet'];
				}
			}
			if ( array_key_exists( 'mobile', $value ) ) {
				if ( is_array( $value['mobile'] ) ) {
					$mobile = array_merge( $mobile, $value['mobile'] );
				} else {
					$mobile[ $property ] = $value['mobile'];
				}
			}
		}

		if ( ! empty( $desktop ) ) {
			$result['desktop'] = $desktop;
		}
		if ( ! empty( $tablet ) ) {
			$result['tablet'] = $tablet;
		}
		if ( ! empty( $mobile ) ) {
			$result['mobile'] = $mobile;
		}

		return $result;
	}

	/**
	 * 疑似要素用スタイルのパース.
	 *
	 * @param array  $styles          Styles.
	 * @param string $pseudo_elements Pseudo Elements.
	 *
	 * @return array
	 */
	public static function parse_styles_pseudo_elements( $styles, $pseudo_elements ) {
		if ( ! is_array( $styles ) || empty( $styles ) ) {
			return [];
		}
		if ( isset( $styles['icon'] ) ) {
			unset( $styles['icon'] );
		}
		if ( isset( $styles['content'] ) ) {
			$content = stripslashes( $styles['content'] );
			$content = str_replace( '\'', '"', $content );
			if ( false !== strpos( $content, '<svg' ) ) {
				$content                   = rawurlencode( $content );
				$styles['content']         = '""';
				$styles['backgroundImage'] = "url('data:image/svg+xml;charset=UTF-8,{$content}')";
				$styles['backgroundSize']  = 'contain';
			}
		}

		return self::parse_styles( $styles, $pseudo_elements );
	}

	/**
	 * Borderプロパティ判定
	 *
	 * @param string $property Property Name.
	 *
	 * @return bool
	 */
	public static function is_border( $property ) {
		return 'border' === $property;
	}

	/**
	 * Border 展開
	 *
	 * @param array $border value.
	 *
	 * @return array
	 */
	public static function parse_border_style( $border ) {
		$result = [];
		if ( ! self::is_responsive_style( $border ) ) {
			$border = [ 'desktop' => $border ];
		}
		$parse = function ( $list ) {
			$parse_result = [];
			foreach ( $list as $position => $border_value ) {
				foreach ( $border_value as $key => $value ) {
					$parse_result[ "border-{$position}-{$key}" ] = $value;
				}
			}

			return $parse_result;
		};

		$result['desktop'] = $parse( $border['desktop'] );

		if ( array_key_exists( 'tablet', $border ) ) {
			$result['tablet'] = $parse( $border['tablet'] );
		}
		if ( array_key_exists( 'mobile', $border ) ) {
			$result['mobile'] = $parse( $border['mobile'] );
		}

		return $result;
	}

	/**
	 * Spacingプロパティ判定
	 *
	 * @param string $property Property Name.
	 *
	 * @return bool
	 */
	public static function is_spacing( $property ) {
		return in_array( $property, [ 'padding', 'margin' ], true );
	}

	/**
	 * Spacing 展開
	 *
	 * @param string $name    property name.
	 * @param array  $spacing value.
	 *
	 * @return array
	 */
	public static function parse_spacing_style( $name, $spacing ) {
		$result = [];
		if ( ! self::is_responsive_style( $spacing ) ) {
			$spacing = [ 'desktop' => $spacing ];
		}
		$parse = function ( $name, $list ) {
			$parse_result = [];
			foreach ( $list as $position => $value ) {
				$parse_result[ "{$name}-{$position}" ] = $value;
			}

			return $parse_result;
		};

		$result['desktop'] = $parse( $name, $spacing['desktop'] );

		if ( array_key_exists( 'tablet', $spacing ) ) {
			$result['tablet'] = $parse( $name, $spacing['tablet'] );
		}
		if ( array_key_exists( 'mobile', $spacing ) ) {
			$result['mobile'] = $parse( $name, $spacing['mobile'] );
		}

		return $result;
	}

	/**
	 * レスポンシブ設定か.
	 *
	 * @param mixed $value 設定値.
	 *
	 * @return bool
	 */
	public static function is_responsive_style( $value ) {
		if ( ! is_array( $value ) ) {
			return false;
		}
		foreach ( array_keys( Config::RESPONSIVE_TYPE ) as $key ) {
			if ( array_key_exists( $key, $value ) ) {
				return true;
			}
		}

		return false;
	}

	/**
	 * レスポンシブタイプの値として取得.
	 *
	 * @param mixed $value Value.
	 *
	 * @return array
	 */
	public static function get_responsive_value( $value ) {
		$result = [];
		if ( ! is_array( $value ) ) {
			$value = [ 'desktop' => $value ];
		}
		if ( array_key_exists( 'desktop', $value ) ) {
			$result['desktop'] = $value['desktop'];
		}
		if ( array_key_exists( 'tablet', $value ) ) {
			$result['tablet'] = $value['tablet'];
		}
		if ( array_key_exists( 'mobile', $value ) ) {
			$result['mobile'] = $value['mobile'];
		}

		return $result;
	}


	/**
	 * ブレークポイント取得.
	 *
	 * @return array|null
	 */
	public static function get_breakpoints() {
		return apply_filters( 'ystdtb_css_breakpoints', Config::BREAKPOINTS );
	}

	/**
	 * メディアクエリを追加
	 *
	 * @param string $css Styles.
	 * @param string $min Breakpoint.
	 * @param string $max Breakpoint.
	 *
	 * @return string
	 */
	public static function add_media_query( $css, $min = '', $max = '' ) {
		$breakpoints = self::get_breakpoints();
		if ( ! array_key_exists( $min, $breakpoints ) && ! array_key_exists( $max, $breakpoints ) ) {
			return $css;
		}
		if ( array_key_exists( $min, $breakpoints ) ) {
			$breakpoint = $breakpoints[ $min ];
			if ( $breakpoint === (int) $breakpoint ) {
				$breakpoint .= 'px';
			}
			$min = "(min-width: {$breakpoint})";
		}
		if ( array_key_exists( $max, $breakpoints ) ) {
			$breakpoint = $breakpoints[ $max ];
			if ( $breakpoint === (int) $breakpoint ) {
				$breakpoint = ( (int) $breakpoint - 1 ) . 'px';
			}
			if ( (string) ( (int) $breakpoint ) !== (string) ( (float) $breakpoint ) ) {
				$float_value = (float) $breakpoint;
				$unit        = str_replace( (string) $float_value, '', $breakpoint );
				$base        = apply_filters( 'ystdtb_css_breakpoints_base_size', 16 );
				$breakpoint  = ( $float_value - ( 1 / $base ) ) . $unit;
				$breakpoint  = apply_filters( 'ystdtb_css_breakpoints_max_width', $breakpoint, $max );
			}
			$max = "(max-width: {$breakpoint})";
		}
		$breakpoint = $min . $max;
		if ( '' !== $min && '' !== $max ) {
			$breakpoint = $min . ' AND ' . $max;
		}

		if ( empty( $breakpoint ) ) {
			return $css;
		}

		return sprintf(
			'@media %s {%s}',
			$breakpoint,
			$css
		);
	}

	/**
	 * モバイル用メディアクエリ取得.
	 *
	 * @param string $css CSS.
	 *
	 * @return string
	 */
	public static function add_media_query_only_mobile( $css ) {
		return self::add_media_query( $css, '', 'mobile' );
	}

	/**
	 * タブレットサイズ以上用メディアクエリ取得.
	 *
	 * @param string $css CSS.
	 *
	 * @return string
	 */
	public static function add_media_query_over_tablet( $css ) {
		return self::add_media_query( $css, 'mobile' );
	}

	/**
	 * タブレットサイズ用メディアクエリ取得.
	 *
	 * @param string $css CSS.
	 *
	 * @return string
	 */
	public static function add_media_query_only_tablet( $css ) {
		return self::add_media_query( $css, 'mobile', 'desktop' );
	}

	/**
	 * PCサイズ以上用メディアクエリ取得.
	 *
	 * @param string $css CSS.
	 *
	 * @return string
	 */
	public static function add_media_query_over_desktop( $css ) {
		return self::add_media_query( $css, 'desktop' );
	}

	/**
	 * カラーコードをrgbに変換
	 *
	 * @param string $color カラーコード.
	 *
	 * @return array
	 */
	public static function hex_2_rgb( $color ) {
		return [
			hexdec( substr( $color, 1, 2 ) ),
			hexdec( substr( $color, 3, 2 ) ),
			hexdec( substr( $color, 5, 2 ) ),
		];
	}
}
