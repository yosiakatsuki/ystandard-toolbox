<?php
/**
 * 片方が追従できるカラムブロック。
 *
 * @package ystandard-toolbox
 */

namespace ystandard_toolbox;

use ystandard_toolbox\Util\File;
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
		$rule                = $this->wide_rule( $size );
		$rule['rules_group'] = "@container ystdtb-sticky-columns (min-width: {$size})";
		return $rule;
	}

	/**
	 * 画面幅が指定の境界以上なら、親の折り返しを止め、直下の子に2列の配置を適用する。
	 *
	 * @param string $mode 1列にするタイミング（mobileまたはtablet）。
	 */
	private function viewport_layout_css( $mode ) {
		$parent_rule = [
			'selector'     => '.ystdtb-sticky-columns:where([data-collapse="' . $mode . '"])',
			'declarations' => [ 'flex-wrap' => 'nowrap' ],
		];
		return wp_style_engine_get_stylesheet_from_css_rules( [ $parent_rule, $this->wide_rule( $mode ) ] );
	}

	/** 固定の端末別CSSを、テーマで変更できる画面幅の条件で包む。 */
	private function device_styles() {
		$directory = YSTDTB_PATH . '/assets/blocks/sticky-columns';

		// 1列にするタイミングが「モバイル」ならタブレット以上、「タブレット」ならPC以上で2列にする。
		$css  = Styles::add_media_query_over_tablet( $this->viewport_layout_css( 'mobile' ) );
		$css .= Styles::add_media_query_over_desktop( $this->viewport_layout_css( 'tablet' ) );

		// 幅と間隔は、選択した端末の範囲だけで上書きする。
		$css .= Styles::add_media_query_only_mobile( File::file_get_contents( $directory . '/mobile.css' ) );
		$css .= Styles::add_media_query_only_tablet( File::file_get_contents( $directory . '/tablet.css' ) );
		$css .= Styles::add_media_query_over_desktop( File::file_get_contents( $directory . '/desktop.css' ) );
		return $css;
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
		$css                  = '';
		$child_type           = \WP_Block_Type_Registry::get_instance()->get_registered( Sticky_Columns_Item_Block::BLOCK_NAME );
		$has_responsive_width = block_has_support( $child_type, [ 'ystdtbResponsiveSize', 'width' ] );
		foreach ( array_slice( $children, 0, 2 ) as $offset => $child ) {
			$style  = $child['attrs']['style'] ?? [];
			$widths = [ 'width' => $style['dimensions']['width'] ?? null ];
			// 子のサイズパネルで使用する幅だけを親のレイアウトへ渡す。
			if ( $has_responsive_width ) {
				$responsive_width  = $style['ystdtb']['stickyColumnsItem']['responsive']['width'] ?? [];
				$widths['desktop'] = $responsive_width['desktop'] ?? null;
				$widths['tablet']  = $responsive_width['tablet'] ?? null;
				$widths['mobile']  = $responsive_width['mobile'] ?? null;
			}
			$column_number = $offset + 1;
			foreach ( $widths as $suffix => $value ) {
				// 属性からは数値と寸法単位だけをCSS宣言へ持ち込む。
				if ( is_string( $value ) && preg_match( '/^(?:0|(?:\d+(?:\.\d+)?|\.\d+)(?:[a-z]+|%))$/iD', $value ) ) {
					$css .= "--ystdtb--columns--{$column_number}-{$suffix}:{$value};";
				}
			}
		}
		return $css;
	}

	/**
	 * 親に切り替え条件を設定し、コンテナ幅を指定した場合だけ個別のクエリを登録する。
	 *
	 * @param \WP_HTML_Tag_Processor $tag        親の開始タグ。
	 * @param array                  $attributes 親ブロックの属性。
	 */
	private function apply_collapse_condition( $tag, $attributes ) {
		$mode = $attributes['collapseAt'] ?? 'mobile';
		// 画面幅による切り替えは、すべての親で共通のCSSを使う。
		if ( 'container' !== $mode ) {
			$tag->set_attribute( 'data-collapse', 'tablet' === $mode ? 'tablet' : 'mobile' );
			return;
		}

		$size = $attributes['containerSize'] ?? '';
		// 未入力または無効な長さなら、既定の1列表示を使う。
		if ( ! is_string( $size ) || ! preg_match( '/^(?:\d+(?:\.\d+)?|\.\d+)(?:px|em|rem|ch|vw|vh)$/D', $size ) ) {
			return;
		}
		$tag->set_attribute( 'data-collapse', $size );
		wp_style_engine_get_stylesheet_from_css_rules( [ $this->container_rule( $size ) ], [ 'context' => 'block-supports' ] );
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
		$this->apply_collapse_condition( $tag, $block['attrs'] ?? [] );

		$widths = $this->column_widths( $block['innerBlocks'] ?? [] );
		// 既存の装飾Supportsのstyleを保持する。
		if ( '' !== $widths ) {
			$style = rtrim( (string) $tag->get_attribute( 'style' ), '; ' );
			// 装飾の末尾に区切りを一つだけ入れて幅の宣言を追加する。
			if ( '' !== $style ) {
				$style .= ';';
			}
			$tag->set_attribute( 'style', $style . $widths );
		}
		return $tag->get_updated_html();
	}

}

Sticky_Columns_Block::get_instance();
