<?php
/**
 * 片方が追従できるカラムブロック。
 *
 * @package ystandard-toolbox
 */

namespace ystandard_toolbox;

use ystandard_toolbox\Util\Styles;
use ystandard_toolbox\Util\Text;

defined( 'ABSPATH' ) || die();

/**
 * 親ブロックの登録を管理する。
 */
class Sticky_Columns_Block {

	const BLOCK_NAME     = 'ystdtb/sticky-columns';
	const MIN_WP_VERSION = '7.0';

	/**
	 * 登録用インスタンス。
	 *
	 * @var Sticky_Columns_Block
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
	 * @return Sticky_Columns_Block
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
		// コアが登録したブロックのスタイルに、両画面で使う端末条件を添付する。
		if ( $type && ! empty( $type->style_handles ) ) {
			wp_add_inline_style( $type->style_handles[0], Text::minify( $this->device_styles() ) );
		}
		add_filter( 'render_block_' . self::BLOCK_NAME, [ $this, 'apply_layout' ], 10, 2 );
		add_filter( 'block_editor_settings_all', [ $this, 'editor_settings' ] );
	}

	/**
	 * 2列時に同時に変更する宣言。直下の子だけに適用する。
	 *
	 * @param string $key 条件を表す検証済みの値。
	 */
	private function wide_rule( $key ) {
		return [
			'selector'     => '.ystdtb-sticky-columns:where([data-collapse="' . $key . '"]) > :where(.ystdtb-sticky-columns-item)',
			'declarations' => [
				'--ystdtb--columns--basis'     => '0px',
				'--ystdtb--columns--max-width' => 'var(--ystdtb--columns--limit)',
				'--ystdtb--columns--position'  => 'sticky',
				'--ystdtb--columns--order'     => '1',
				'--ystdtb--columns--top'       => 'var(--ystdtb--columns--sticky-offset)',
			],
		];
	}

	/**
	 * コアのlayoutサポートと同じrules_groupでコンテナ条件を組み立てる。
	 *
	 * @param string $size 安全な長さ、または編集用プレースホルダー。
	 */
	private function container_rule( $size ) {
		return [ 'rules_group' => "@container ystdtb-sticky-columns (min-width: {$size})" ] + $this->wide_rule( $size );
	}

	/** Toolboxのフィルターを通した画面幅でレイアウトと端末別寸法を切り替える。 */
	private function device_styles() {
		// 画面幅の場合は親自身にも条件が適用できる。狭い配置先での再折返しを防ぐ。
		$mobile = '.ystdtb-sticky-columns:where([data-collapse="mobile"]){flex-wrap:nowrap;}' . wp_style_engine_get_stylesheet_from_css_rules( [ $this->wide_rule( 'mobile' ) ] );
		$tablet = '.ystdtb-sticky-columns:where([data-collapse="tablet"]){flex-wrap:nowrap;}' . wp_style_engine_get_stylesheet_from_css_rules( [ $this->wide_rule( 'tablet' ) ] );
		$css    = Styles::add_media_query_over_tablet( $mobile ) . Styles::add_media_query_over_desktop( $tablet );

		$rules = [];
		foreach ( [ 'mobile', 'tablet', 'desktop' ] as $device ) {
			$declarations = '';
			foreach ( [ 1, 2 ] as $index ) {
				$name          = "--ystdtb--columns--{$index}";
				$declarations .= "{$name}-current:var({$name}-{$device},var({$name}-width));";
			}
			foreach ( [ 'column', 'row' ] as $axis ) {
				$name          = "--ystdtb--columns--{$axis}-gap";
				$declarations .= "{$name}-device:var({$name}-{$device});";
			}
			$rules[ $device ] = ".ystdtb-sticky-columns{{$declarations}}";
		}
		return $css . Styles::add_media_query_only_mobile( $rules['mobile'] )
			. Styles::add_media_query_only_tablet( $rules['tablet'] )
			. Styles::add_media_query_over_desktop( $rules['desktop'] );
	}

	/**
	 * エディターにも同じクエリを渡し、子の標準寸法入力をカスタム値専用にする。
	 *
	 * @param array $settings ブロックエディターの設定。
	 */
	public function editor_settings( $settings ) {
		$settings['ystdtbStickyColumnsQuery'] = wp_style_engine_get_stylesheet_from_css_rules( [ $this->container_rule( 'CONTAINER_SIZE' ) ] );
		$settings['__experimentalFeatures']['blocks']['ystdtb/sticky-columns-item']['dimensions']['dimensionSizes'] = [];
		return $settings;
	}

	/**
	 * 直下の2個の希望幅をFlexの配分に渡す。子属性が正本で、親属性への同期は行わない。
	 *
	 * @param array $children パース済みの子ブロック。
	 */
	private function column_widths( $children ) {
		$css              = '';
		$type             = \WP_Block_Type_Registry::get_instance()->get_registered( Sticky_Columns_Item_Block::BLOCK_NAME );
		$responsive_width = block_has_support( $type, [ 'ystdtbResponsiveSize', 'width' ] );
		foreach ( array_slice( $children, 0, 2 ) as $offset => $child ) {
			$style  = $child['attrs']['style'] ?? [];
			$widths = [ 'width' => $style['dimensions']['width'] ?? null ];
			if ( $responsive_width ) {
				foreach ( [ 'desktop', 'tablet', 'mobile' ] as $device ) {
					$widths[ $device ] = $style['ystdtb']['stickyColumnsItem']['responsive']['width'][ $device ] ?? null;
				}
			}
			foreach ( $widths as $suffix => $value ) {
				// 属性からは数値と寸法単位だけをCSS宣言へ持ち込む。
				if ( is_string( $value ) && preg_match( '/^(?:0|(?:\d+(?:\.\d+)?|\.\d+)(?:[a-z]+|%))$/iD', $value ) ) {
					$css .= '--ystdtb--columns--' . ( $offset + 1 ) . "-{$suffix}:{$value};";
				}
			}
		}
		return $css;
	}

	/**
	 * 静的HTMLの外枠に条件と希望幅を付与し、使用したコンテナ条件だけをコアへ登録する。
	 *
	 * @param string $html  保存済みHTML。
	 * @param array  $block パース済みの親ブロック。
	 */
	public function apply_layout( $html, $block ) {
		$tag = new \WP_HTML_Tag_Processor( $html );
		// 空の出力にスタイルを登録しない。
		if ( ! $tag->next_tag( [ 'class_name' => 'ystdtb-sticky-columns' ] ) ) {
			return $html;
		}
		$mode = $block['attrs']['collapseAt'] ?? 'mobile';
		// 端末条件は共通CSSにあり、任意の配置幅だけが描画時に判明する。
		if ( 'container' === $mode ) {
			$size = $block['attrs']['containerSize'] ?? '';
			if ( is_string( $size ) && preg_match( '/^(?:\d+(?:\.\d+)?|\.\d+)(?:px|em|rem|ch|vw|vh)$/D', $size ) ) {
				$tag->set_attribute( 'data-collapse', $size );
				wp_style_engine_get_stylesheet_from_css_rules( [ $this->container_rule( $size ) ], [ 'context' => 'block-supports' ] );
			}
		} else {
			$tag->set_attribute( 'data-collapse', 'tablet' === $mode ? 'tablet' : 'mobile' );
		}
		$widths = $this->column_widths( $block['innerBlocks'] ?? [] );
		// 既存の装飾Supportsのstyleを保持する。
		if ( '' !== $widths ) {
			$style = rtrim( (string) $tag->get_attribute( 'style' ), '; ' );
			$tag->set_attribute( 'style', ( '' === $style ? '' : $style . ';' ) . $widths );
		}
		return $tag->get_updated_html();
	}

}

Sticky_Columns_Block::get_instance();
