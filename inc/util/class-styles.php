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
	 * ブレークポイント
	 * memo: WordPress 7.0のブレークポイント
	 *   mobile: width <= 480px
	 *   tablet: 480px < width <= 782px
	 *   desktop: 782px < width
	 *
	 * @var array
	 */
	const BREAKPOINTS = [
		'mobile'  => 40,  // 640px / 16.
		'tablet'  => 48,  // 768px / 16.
		'desktop' => 64,  // 1024px / 16.
		'large'   => 75,  // 1200px / 16.
	];

	/**
	 * ブレークポイントの単位
	 *
	 * @var string
	 */
	const BREAKPOINT_UNIT = 'rem';

	/**
	 * Axis Position.
	 *
	 * @var array
	 */
	const AXIS_POSITION = [
		'top',
		'right',
		'bottom',
		'left',
	];

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

		// CSSプロパティの展開.
		foreach ( $styles as $key => $value ) {
			if ( is_array( $value ) ) {
				$parse_css = self::get_styles_css( $value );
				if ( is_array( $parse_css ) && ! empty( $parse_css ) ) {
					$css = array_merge( $css, $parse_css );
				}
			} else {
				// 空の場合はスキップ.
				if ( '' !== $value ) {
					$css[] = "{$key}:{$value}";
				}
			}
		}

		return '{' . implode( ';', $css ) . ';}';
	}


	/**
	 * スタイル設定をCSSとして扱えるように変換.
	 *
	 * @param array $styles CSS設定.
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
			// responsiveXxx キーは元プロパティ名（xxx）として扱い、CSS プロパティ名を導出する.
			if ( 0 === strpos( $key, 'responsive' ) && strlen( $key ) > 10 ) {
				$key = lcfirst( substr( $key, 10 ) );
			}
			$property = Text::camel_to_kebab( $key );

			if ( 'font-size' === $property ) {
				$value = self::parse_font_size_style( $value );
			}

			// レスポンシブではない設定をDesktopの設定として扱う.
			if ( ! self::is_responsive_style( $value ) ) {
				$value = [ 'desktop' => $value ];
			}

			// borderの処理.
			if ( self::is_border( $property ) ) {
				$value = self::parse_border_style( $value );
			}
			// 余白の処理
			if ( self::is_spacing( $property ) ) {
				$value = self::parse_spacing_style( $property, $value );
			}

			if ( array_key_exists( 'desktop', $value ) ) {
				if ( is_array( $value['desktop'] ) ) {
					$desktop = array_merge( $desktop, $value['desktop'] );
				} else {
					$desktop[ $property ] = $value['desktop'];
				}

				// 画像の処理.
				if ( 'backgroundImage' === $key && is_string( $value['desktop'] ) && ! empty( $value['desktop'] ) ) {
					$desktop[ $property ] = "url('{$value['desktop']}')";
				}
				// 画像の処理.
				if ( ( 'maskImage' === $key || '-webkit-mask-image' === $key ) && is_string( $value['desktop'] ) && ! empty( $value['desktop'] ) ) {
					$desktop[ $property ] = "url('{$value['desktop']}')";
				}
			}

			// 色関係のカスタム変数追加.
			if ( 'backgroundColor' === $key || 'color' === $key ) {
				if ( isset( $value['desktop'] ) && is_string( $value['desktop'] ) && false !== strpos( $value['desktop'], '#' ) ) {
					// カスタムプロパティ名のプレフィックスを作成。疑似要素がある場合はbefore,afterを追加.
					$var_prefix = ! empty( $pseudo_elements ) ? "-{$pseudo_elements}" : '';
					$var_prefix = "--ystdtb-custom-heading{$var_prefix}";
					// RGB値を作成.
					$color_rgb = self::hex_2_rgb( $value['desktop'] );
					$color_rgb = implode( ',', $color_rgb );
					// カスタムプロパティの値を作成.
					$type = 'backgroundColor' === $key ? 'background-color' : 'color';
					/**
					 * 色のカスタムプロパティとRGB/RGBAのカスタムプロパティをセット
					 * （例：--ystdtb-custom-heading-background-color, --ystdtb-custom-heading-background-color-rgb, --ystdtb-custom-heading-background-color-rgba）.
					 */
					$color_var[ "{$var_prefix}-{$type}" ]      = $value['desktop'];
					$color_var[ "{$var_prefix}-{$type}-rgb" ]  = "rgb({$color_rgb})";
					$color_var[ "{$var_prefix}-{$type}-rgba" ] = "rgba({$color_rgb},var({$var_prefix}-{$type}-rgba-opacity,1))";
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
	 * @param array $styles Styles.
	 * @param string $pseudo_elements Pseudo Elements.
	 *
	 * @return array
	 */
	public static function parse_styles_pseudo_elements( $styles, $pseudo_elements ) {
		if ( ! is_array( $styles ) || empty( $styles ) ) {
			return [];
		}
		// 有効化確認.
		if ( ! isset( $styles['enable'] ) || ! $styles['enable'] ) {
			return [];
		}
		// 有効化オプションは削除.
		unset( $styles['enable'] );

		// アイコン設定の確認・削除.
		if ( isset( $styles['icon'] ) ) {
			unset( $styles['icon'] );
		}
		// contentの処理.
		if ( ! isset( $styles['content'] ) ) {
			$styles['content'] = '""';
		}
		$content = stripslashes( $styles['content'] );
		$content = str_replace( '\'', '"', $content );
		// SVGアイコンの処理.
		if ( false !== strpos( $content, '<svg' ) ) {
			$svg_icon = rawurlencode( $content );
			// 背景色を現在の文字色に設定.
			$styles['backgroundColor'] = ! empty( $styles['iconColor'] ) ? $styles['iconColor'] : 'currentColor';
			// マスク関連.
			$icon_content                 = "data:image/svg+xml;charset=UTF-8,{$svg_icon}";
			$styles['-webkit-mask-image'] = $icon_content;
			$styles['maskImage']          = $icon_content;
			$styles['maskSize']           = 'contain';
			$styles['maskRepeat']         = 'no-repeat';
			$styles['maskPosition']       = 'center';
			// アイコンを背景画像として表示するので諸々調整.
			unset( $styles['backgroundImage'] );
			$styles['backgroundSize']     = 'contain';
			$styles['backgroundRepeat']   = 'no-repeat';
			$styles['backgroundPosition'] = 'center';
			$styles['verticalAlign']      = '-0.125em';
			$styles['display']            = empty( $styles['display'] ) ? 'inline-flex' : $styles['display'];
			// fontSize の指定がなければ width/height を 1em で設定.
			if ( empty( $styles['fontSize'] ) ) {
				$default_size     = [ 'desktop' => '1em' ];
				$styles['width']  = $default_size;
				$styles['height'] = $default_size;
			}
			// contentは空に.
			$content = '';
		}
		$content           = trim( $content, '"' );
		$styles['content'] = "\"{$content}\"";

		unset( $styles['iconColor'] );

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
	 * Font Size 展開.
	 *
	 * @param mixed $font_size Font Size.
	 *
	 * @return mixed
	 */
	public static function parse_font_size_style( $font_size ) {
		if ( ! is_array( $font_size ) ) {
			return $font_size;
		}
		if ( isset( $font_size['size'] ) ) {
			return self::parse_font_size_value( $font_size['size'] );
		}
		if ( isset( $font_size['fontSize']['size'] ) ) {
			return self::parse_font_size_value( $font_size['fontSize']['size'] );
		}

		return $font_size;
	}

	/**
	 * Font Size Value 展開.
	 *
	 * @param mixed $font_size Font Size.
	 *
	 * @return mixed
	 */
	private static function parse_font_size_value( $font_size ) {
		return is_numeric( $font_size ) ? "{$font_size}px" : $font_size;
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

		// 上下左右の設定分割.
		$parse = function ( $list ) {
			$parse_result = [];
			foreach ( $list as $position => $border_value ) {
				if ( in_array( $position, array_keys( Config::RESPONSIVE_TYPE ), true ) ) {
					continue;
				}

				if ( in_array( $position, self::AXIS_POSITION, true ) ) {
					// 上下左右に分かれての指定の場合.
					$border_width = isset( $border_value['width'] ) ? $border_value['width'] : '';
					$border_style = isset( $border_value['style'] ) ? $border_value['style'] : '';
					$border_color = isset( $border_value['color'] ) ? $border_value['color'] : '';
					$value        = "{$border_width} {$border_style} {$border_color}";
					// width=0の場合は0のみセット（"0.9em" 等の小数点 em を 0 と誤判定しないよう float キャストで判定）.
					if ( '' !== $border_width && 0.0 === (float) $border_width ) {
						$value = 0;
					}
				} else {
					$value = $border_value;
				}

				// セット.
				$parse_result[ "border-{$position}" ] = $value;
			}

			return $parse_result;
		};

		if ( array_key_exists( 'desktop', $border ) ) {
			$result['desktop'] = $parse( $border['desktop'] );
		}

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
	 * @param string $name property name.
	 * @param array $spacing value.
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
				if ( ! in_array( $position, self::AXIS_POSITION, true ) ) {
					continue;
				}
				// 0pxなど0の場合は単位なしの0をセット.
				if ( '' !== $value && 'auto' !== $value && 0 == (float) $value ) {
					$value = 0;
				}
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
		// 配列でない場合はレスポンシブ設定ではないと判断.
		if ( ! is_array( $value ) ) {
			return false;
		}
		$keys = array_keys( $value );
		if ( empty( $keys ) ) {
			return false;
		}

		return empty( array_diff( $keys, array_keys( Config::RESPONSIVE_TYPE ) ) );
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
		return apply_filters(
			'ystdtb_css_breakpoints',
			apply_filters( 'ys_get_break_points', self::BREAKPOINTS )
		);
	}

	/**
	 * ブレークポイントの単位を取得
	 *
	 * @return string
	 */
	public static function get_breakpoint_unit() {

		return apply_filters(
			'ystdtb_css_breakpoint_unit',
			apply_filters( 'ys_get_breakpoint_unit', self::BREAKPOINT_UNIT )
		);
	}

	/**
	 * max-width計算用の調整値を取得.
	 *
	 * postcss-media-minmax に倣い、pxは0.02、それ以外は0.001を使用.
	 *
	 * @return float
	 */
	public static function get_max_width_step() {
		$unit = self::get_breakpoint_unit();
		$step = 'px' === $unit ? 0.02 : 0.001;

		return apply_filters( 'ystdtb_css_max_width_step', $step, $unit );
	}

	/**
	 * ブレークポイントのmax-width値を取得.
	 *
	 * @param string $type mobile/tablet/desktop.
	 *
	 * @return int|float
	 */
	public static function get_breakpoints_max_width_size( $type ) {
		$breakpoints = self::get_breakpoints();

		// チェック.
		if ( ! is_array( $breakpoints ) || ! array_key_exists( $type, $breakpoints ) ) {
			return 0;
		}

		// 定義にはmin側のサイズが入るので、maxの計算は調整値を引く.
		$step   = self::get_max_width_step();
		$result = $breakpoints[ $type ] - $step;

		return apply_filters(
			'ystdtb_css_breakpoints_max_width_size',
			apply_filters( 'ys_get_breakpoints_max_width_size', $result, $breakpoints, $type )
		);
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
		$unit        = self::get_breakpoint_unit();

		if ( ! array_key_exists( $min, $breakpoints ) && ! array_key_exists( $max, $breakpoints ) ) {
			return $css;
		}

		$conditions = [];

		// min側.
		if ( array_key_exists( $min, $breakpoints ) ) {
			$value        = apply_filters( 'ystdtb_breakpoints_min_width', $breakpoints[ $min ], $min, $breakpoints );
			$conditions[] = "(min-width: {$value}{$unit})";
		}

		// max側.
		if ( array_key_exists( $max, $breakpoints ) ) {
			$value        = self::get_breakpoints_max_width_size( $max );
			$value        = apply_filters( 'ystdtb_breakpoints_max_width', $value, $max, $breakpoints );
			$conditions[] = "(max-width: {$value}{$unit})";
		}

		$query = implode( ' AND ', $conditions );

		if ( empty( $query ) ) {
			return $css;
		}

		return sprintf( '@media %s {%s}', $query, $css );
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
	 * レスポンシブ指定のカスタムプロパティ名を取得.
	 *
	 * @param string $name カスタムプロパティ名.
	 * @param string $type タイプ(mobile,tablet,desktop).
	 *
	 * @return string
	 */
	public static function get_responsive_custom_prop_name( $name, $type ) {
		return "--ystdtb--{$type}--{$name}";
	}

	/**
	 * レスポンシブ指定のCSSを作成.
	 *
	 * @param array $args {
	 *                    selector : string,
	 *                    prop_name : string,
	 *                    property : string,
	 *                    type : string
	 *                    } オプション.
	 *
	 * @return string
	 */
	public static function get_responsive_custom_prop_css( $args ) {
		$selector  = $args['selector'];
		$prop_name = $args['prop_name'];
		$property  = $args['property'];
		$type      = $args['type'];
		// カスタムプロパティ作成.
		$custom_prop = self::get_responsive_custom_prop_name( $prop_name, $type );

		return "{$selector}:where([style*=\"{$custom_prop}\"]){{$property}:var({$custom_prop}) !important;}";
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

	/**
	 * 物理方向を論理方向に変換
	 *
	 * @param string $direction 物理方向（top/right/bottom/left）.
	 *
	 * @return string 論理方向（block-start/inline-end/block-end/inline-start）.
	 */
	public static function get_logical_direction( $direction ) {
		$map = [
			'top'    => 'block-start',
			'right'  => 'inline-end',
			'bottom' => 'block-end',
			'left'   => 'inline-start',
		];

		return isset( $map[ $direction ] ) ? $map[ $direction ] : $direction;
	}
}
