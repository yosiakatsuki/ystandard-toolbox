<?php
/**
 * 追従カラムの条件別CSSの統合テスト。
 *
 * @package ystandard-toolbox
 */

use ystandard_toolbox\Sticky_Columns_Block;

class Sticky_Columns_Layout_Test extends WP_UnitTestCase {

	/** 異なる任意幅と入れ子に個別のルールを生成し、同じ幅は共有する。 */
	public function test_container_rules_are_scoped_and_shared() {
		$html   = '<div class="ystdtb-sticky-columns"><div class="ystdtb-sticky-columns-item"></div></div>';
		$plugin = Sticky_Columns_Block::get_instance();
		$outer  = [ 'attrs' => [ 'collapseAt' => 'container', 'containerSize' => '49.5rem' ] ];
		$inner  = [ 'attrs' => [ 'collapseAt' => 'container', 'containerSize' => '650px' ] ];
		$nested = $plugin->apply_layout( $html, $inner );
		$result = $plugin->apply_layout( str_replace( '</div></div>', $nested . '</div></div>', $html ), $outer );
		$plugin->apply_layout( $html, $outer );

		$this->assertSame( 1, substr_count( $result, 'data-collapse="49.5rem"' ) );
		$this->assertSame( 1, substr_count( $result, 'data-collapse="650px"' ) );
		$css = wp_style_engine_get_stylesheet_from_context( 'block-supports', [ 'prettify' => false ] );
		foreach ( [ '49.5rem', '650px' ] as $size ) {
			$this->assertSame( 1, substr_count( $css, "@container ystdtb-sticky-columns (min-width: {$size})" ) );
			$this->assertStringContainsString( '.ystdtb-sticky-columns:where([data-collapse="' . $size . '"]) > :where(.ystdtb-sticky-columns-item)', $css );
		}
		foreach ( [ '--ystdtb--columns--basis:0px', '--ystdtb--columns--max-width:var(--ystdtb--columns--limit)', '--ystdtb--columns--position:sticky', '--ystdtb--columns--top:var(--ystdtb--columns--sticky-offset)', '--ystdtb--columns--order:1' ] as $declaration ) {
			$this->assertStringContainsString( $declaration, $css );
		}
	}

	/** 保存された投稿本文を通し、描画時フィルターとCSSストアの接続を確認する。 */
	public function test_render_saved_columns() {
		$file = dirname( __DIR__, 2 ) . '/test/integration/fixtures/blocks/sticky-columns/ystdtb__sticky-columns__dimensions__container-responsive.html';
		$html = do_blocks( file_get_contents( $file ) );
		$tag  = new WP_HTML_Tag_Processor( $html );
		$this->assertTrue( $tag->next_tag() );
		$this->assertSame( '48.5rem', $tag->get_attribute( 'data-collapse' ) );
		$this->assertStringContainsString( '--ystdtb--columns--sticky-offset:3.5rem', $tag->get_attribute( 'style' ) );
		$this->assertStringContainsString( '--ystdtb--columns--1-width:45%', $tag->get_attribute( 'style' ) );
		$this->assertStringContainsString( '--ystdtb--columns--1-tablet:200px', $tag->get_attribute( 'style' ) );
		$css = wp_style_engine_get_stylesheet_from_context( 'block-supports', [ 'optimize' => true ] );
		$this->assertStringContainsString( '(min-width: 48.5rem)', $css );
	}

	/** 親の装飾・端末条件を保持し、直下の安全な幅のみ反映する。 */
	public function test_device_modes_and_widths() {
		$plugin = Sticky_Columns_Block::get_instance();
		$html   = '<div class="ystdtb-sticky-columns" style="color:red"></div>';
		$block  = [
			'attrs'       => [ 'collapseAt' => 'tablet', 'containerSize' => '999px' ],
			'innerBlocks' => [
				[ 'attrs' => [ 'style' => [ 'dimensions' => [ 'width' => '40%' ] ] ] ],
				[ 'attrs' => [ 'style' => [ 'ystdtb' => [ 'stickyColumnsItem' => [ 'responsive' => [ 'width' => [ 'mobile' => '0px', 'desktop' => '1px;color:red' ] ] ] ] ] ] ],
			],
		];
		$result = $plugin->apply_layout( $html, $block );
		$this->assertStringContainsString( 'data-collapse="tablet"', $result );
		$this->assertStringContainsString( 'color:red;--ystdtb--columns--1-width:40%;--ystdtb--columns--2-mobile:0px;', $result );
		$this->assertStringNotContainsString( 'columns--2-desktop', $result );
	}

	/** 初期状態はモバイル条件、コンテナサイズが空または無効なら2列条件を登録しない。 */
	public function test_default_and_empty_container() {
		$plugin = Sticky_Columns_Block::get_instance();
		$html   = '<div class="ystdtb-sticky-columns"></div>';
		$this->assertStringContainsString( 'data-collapse="mobile"', $plugin->apply_layout( $html, [] ) );
		$before = wp_style_engine_get_stylesheet_from_context( 'block-supports' );
		foreach ( [ [], [ 'containerSize' => '100%){body{}' ] ] as $attrs ) {
			$attrs['collapseAt'] = 'container';
			$this->assertSame( $html, $plugin->apply_layout( $html, [ 'attrs' => $attrs ] ) );
		}
		$this->assertSame( $before, wp_style_engine_get_stylesheet_from_context( 'block-supports' ) );
	}

	/** 編集用CSS、コアのスタイルハンドル、対象ブロックだけの寸法設定を確認する。 */
	public function test_editor_and_front_use_matching_conditions() {
		$plugin   = Sticky_Columns_Block::get_instance();
		$settings = $plugin->editor_settings( [] );
		$template = $settings['ystdtbStickyColumnsQuery'];
		$this->assertStringContainsString( '(min-width: CONTAINER_SIZE)', $template );
		$this->assertStringContainsString( '[data-collapse="CONTAINER_SIZE"]', $template );
		$this->assertSame( [], $settings['__experimentalFeatures']['blocks']['ystdtb/sticky-columns-item']['dimensions']['dimensionSizes'] );

		$type = WP_Block_Type_Registry::get_instance()->get_registered( Sticky_Columns_Block::BLOCK_NAME );
		$css  = implode( '', wp_styles()->get_data( $type->style_handles[0], 'after' ) );
		foreach ( [ 'mobile', 'tablet' ] as $key ) {
			$this->assertStringContainsString( '.ystdtb-sticky-columns:where([data-collapse="' . $key . '"]){flex-wrap:nowrap;}', $css );
		}
		$this->assertStringContainsString( '@media (min-width:', $css );
		$this->assertStringContainsString( '--ystdtb--columns--top:var(--ystdtb--columns--sticky-offset)', $css );
		$child = WP_Block_Type_Registry::get_instance()->get_registered( 'ystdtb/sticky-columns-item' );
		$css   = implode( '', wp_styles()->get_data( $child->style_handles[0], 'after' ) );
		$this->assertStringContainsString( '--ystdtb--mobile--columns--min-height', $css );
		$this->assertStringNotContainsString( '--ystdtb--mobile--columns--max-height', $css );
	}
}
