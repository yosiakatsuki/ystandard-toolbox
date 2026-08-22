<?php
/**
 * 見出しデザイン無効化ブロック拡張のテスト.
 *
 * @package ystandard-toolbox
 */

use ystandard_toolbox\Disable_Heading_Style;

/**
 * 見出しデザイン無効化ブロック拡張のテストクラス.
 */
class Disable_Heading_Style_Test extends WP_UnitTestCase {

	/**
	 * 対象ブロックの初期値を取得できることを確認する.
	 */
	public function test_get_default_target_blocks() {
		$instance = Disable_Heading_Style::get_instance();

		$this->assertSame(
			[
				'core/heading',
				'core/post-title',
			],
			$instance->get_target_blocks()
		);
	}

	/**
	 * PHPフックで対象ブロックを追加できることを確認する.
	 */
	public function test_target_blocks_can_be_extended_by_filter() {
		$callback = static function ( $blocks ) {
			$blocks[] = 'example/heading';

			return $blocks;
		};
		add_filter( 'ystdtb_disable_heading_style_target_blocks', $callback );

		$actual = Disable_Heading_Style::get_instance()->get_target_blocks();

		remove_filter( 'ystdtb_disable_heading_style_target_blocks', $callback );

		$this->assertContains( 'example/heading', $actual );
	}

	/**
	 * 対象ブロックへclassName属性を追加できることを確認する.
	 */
	public function test_add_class_name_attribute_to_target_block() {
		$actual = Disable_Heading_Style::get_instance()->add_class_name_attribute(
			[ 'attributes' => [] ],
			'core/heading'
		);

		$this->assertSame(
			[ 'type' => 'string' ],
			$actual['attributes']['className']
		);
	}

	/**
	 * 既存のclassName属性定義を変更しないことを確認する.
	 */
	public function test_keep_existing_class_name_attribute() {
		$args = [
			'attributes' => [
				'className' => [
					'type'    => 'string',
					'default' => 'test',
				],
			],
		];

		$actual = Disable_Heading_Style::get_instance()->add_class_name_attribute(
			$args,
			'core/heading'
		);

		$this->assertSame( $args, $actual );
	}

	/**
	 * 対象外ブロックの属性定義を変更しないことを確認する.
	 */
	public function test_do_not_add_attribute_to_non_target_block() {
		$args   = [ 'attributes' => [] ];
		$actual = Disable_Heading_Style::get_instance()->add_class_name_attribute(
			$args,
			'core/paragraph'
		);

		$this->assertSame( $args, $actual );
	}
}
