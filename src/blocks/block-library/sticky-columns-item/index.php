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
		// 登録したブロックのスタイルに編集・フロント共通の端末条件を追加する。
		if ( ! $type || empty( $type->style_handles ) ) {
			return;
		}
		$css = $this->responsive_styles( $type->supports['ystdtbResponsiveSize'] ?? [] );
		// 子自身に適用する寸法がすべて無効なら、メディアクエリも追加しない。
		if ( '' !== $css ) {
			wp_add_inline_style( $type->style_handles[0], Text::minify( $css ) );
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

		$enabled_properties = array_intersect_key( $properties, array_filter( $settings ) );
		// 幅だけが有効な場合も、子の寸法を上書きするCSSは不要。
		if ( empty( $enabled_properties ) ) {
			return '';
		}
		$css  = Styles::add_media_query_only_mobile( $this->dimension_rules( $enabled_properties, 'mobile' ) );
		$css .= Styles::add_media_query_only_tablet( $this->dimension_rules( $enabled_properties, 'tablet' ) );
		$css .= Styles::add_media_query_over_desktop( $this->dimension_rules( $enabled_properties, 'desktop' ) );
		return $css;
	}

	/**
	 * 対象端末の値が保存されている子だけ、通常の寸法を上書きする。
	 *
	 * @param array  $properties 有効なCSSプロパティ名。
	 * @param string $device     対象端末。
	 */
	private function dimension_rules( $properties, $device ) {
		$css = '';
		foreach ( $properties as $property ) {
			$css .= Styles::get_responsive_custom_prop_css(
				[
					'selector'  => '.ystdtb-sticky-columns-item',
					'prop_name' => 'columns--' . $property,
					'property'  => $property,
					'type'      => $device,
				]
			);
		}
		return $css;
	}
}

Sticky_Columns_Item_Block::get_instance();
