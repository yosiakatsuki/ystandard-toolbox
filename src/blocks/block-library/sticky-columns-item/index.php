<?php
/**
 * 片方が追従できるカラムの子ブロック。
 *
 * @package ystandard-toolbox
 */

namespace ystandard_toolbox;

use ystandard_toolbox\Util\Styles;
use ystandard_toolbox\Util\Text;

defined( 'ABSPATH' ) || die();

/**
 * 子ブロックの登録を管理する。
 */
class Sticky_Columns_Item_Block {

	const BLOCK_NAME     = 'ystdtb/sticky-columns-item';
	const MIN_WP_VERSION = '7.0';

	/**
	 * 登録用インスタンス。
	 *
	 * @var Sticky_Columns_Item_Block
	 */
	private static $instance;

	/**
	 * ブロックサポートの属性登録より前に初期化する。
	 */
	private function __construct() {
		add_action( 'init', [ $this, 'register_block' ], 20 );
	}

	/**
	 * 登録用インスタンスを取得する。
	 *
	 * @return Sticky_Columns_Item_Block
	 */
	public static function get_instance() {
		// 登録フックの重複を防ぐため、初回だけ生成する。
		if ( ! isset( self::$instance ) ) {
			self::$instance = new self();
		}

		return self::$instance;
	}

	/**
	 * 対象バージョンで静的ブロックを登録する。
	 *
	 * @return void
	 */
	public function register_block() {
		// 旧版向けの互換UIは作らず、親子とも同じ条件で登録を止める。
		if ( ! is_wp_version_compatible( self::MIN_WP_VERSION ) ) {
			return;
		}

		$type = register_block_type( __DIR__ );
		if ( $type && ! empty( $type->style_handles ) ) {
			$css = $this->responsive_styles( $type->supports['ystdtbResponsiveSize'] ?? [] );
			if ( '' !== $css ) {
				wp_add_inline_style( $type->style_handles[0], Text::minify( $css ) );
			}
		}
	}

	/**
	 * 子自身が扱う寸法のうち、有効な項目だけを端末別スタイルに登録する。
	 *
	 * @param array $settings メタデータで有効にした寸法。
	 */
	private function responsive_styles( $settings ) {
		// 幅は親のFlexで配分する。
		$properties = [
			'minWidth'  => 'min-width',
			'maxWidth'  => 'max-width',
			'height'    => 'height',
			'minHeight' => 'min-height',
			'maxHeight' => 'max-height',
		];
		$rules      = [
			'mobile'  => '',
			'tablet'  => '',
			'desktop' => '',
		];
		foreach ( $properties as $key => $property ) {
			if ( empty( $settings[ $key ] ) ) {
				continue;
			}
			foreach ( array_keys( $rules ) as $device ) {
				$rules[ $device ] .= Styles::get_responsive_custom_prop_css(
					[
						'selector'  => '.ystdtb-sticky-columns-item',
						'prop_name' => 'columns--' . $property,
						'property'  => $property,
						'type'      => $device,
					]
				);
			}
		}
		if ( '' === $rules['mobile'] ) {
			return '';
		}
		return Styles::add_media_query_only_mobile( $rules['mobile'] )
			. Styles::add_media_query_only_tablet( $rules['tablet'] )
			. Styles::add_media_query_over_desktop( $rules['desktop'] );
	}
}

Sticky_Columns_Item_Block::get_instance();
