/* WordPress Dependencies */
import { addFilter, removeFilter } from '@wordpress/hooks';

/* Block Dependencies */
import {
	addClassNameAttribute,
	addDisableHeadingStyleSaveProps,
	DEFAULT_TARGET_BLOCKS,
	DISABLE_HEADING_STYLE_CLASS,
	getTargetBlocks,
	isHeadingStyleDisabled,
	isTargetBlock,
	TARGET_BLOCKS_FILTER,
	updateHeadingStyleClassName,
} from './utils';
import type { ExtendedBlockConfiguration } from './types';

const TEST_FILTER_NAMESPACE = 'ystandard-toolbox/test-target-blocks';

describe( '見出しデザイン無効化ブロック拡張', () => {
	afterEach( () => {
		removeFilter( TARGET_BLOCKS_FILTER, TEST_FILTER_NAMESPACE );
	} );

	it( '初期対象として2種類のコア見出しブロックを返す', () => {
		expect( getTargetBlocks() ).toEqual( DEFAULT_TARGET_BLOCKS );
	} );

	it( 'JavaScriptフックで対象ブロックを追加できる', () => {
		addFilter(
			TARGET_BLOCKS_FILTER,
			TEST_FILTER_NAMESPACE,
			( blocks: string[] ) => [ ...blocks, 'example/heading' ]
		);

		expect( isTargetBlock( 'example/heading' ) ).toBe( true );
	} );

	it( '対象ブロックへclassName属性を追加する', () => {
		const settings = {
			name: 'core/heading',
			attributes: {},
		} as ExtendedBlockConfiguration;

		expect(
			addClassNameAttribute( settings, 'core/heading' ).attributes
				.className
		).toEqual( { type: 'string' } );
	} );

	it( '既存のclassName属性定義を維持する', () => {
		const classNameAttribute = { type: 'string', default: 'test' };
		const settings = {
			name: 'core/heading',
			attributes: {
				className: classNameAttribute,
			},
		} as ExtendedBlockConfiguration;

		expect(
			addClassNameAttribute( settings, 'core/heading' ).attributes
				.className
		).toBe( classNameAttribute );
	} );

	it( '状態クラスを追加して既存クラスを保持する', () => {
		const className = updateHeadingStyleClassName( 'test-class', true );

		expect( className ).toBe(
			`test-class ${ DISABLE_HEADING_STYLE_CLASS }`
		);
		expect( isHeadingStyleDisabled( className ) ).toBe( true );
	} );

	it( '状態クラスだけを削除して他のクラスを保持する', () => {
		const className = updateHeadingStyleClassName(
			`test-class ${ DISABLE_HEADING_STYLE_CLASS } another-class`,
			false
		);

		expect( className ).toBe( 'test-class another-class' );
		expect( isHeadingStyleDisabled( className ) ).toBe( false );
	} );

	it( '対象ブロックの保存要素へ状態クラスを追加する', () => {
		const result = addDisableHeadingStyleSaveProps(
			{ className: 'wp-block-heading' },
			{
				name: 'core/heading',
				attributes: {},
			} as ExtendedBlockConfiguration,
			{ className: DISABLE_HEADING_STYLE_CLASS }
		);

		expect( result.className ).toBe(
			`wp-block-heading ${ DISABLE_HEADING_STYLE_CLASS }`
		);
	} );

	it( '対象外ブロックの保存要素を変更しない', () => {
		const extraProps = { className: 'wp-block-paragraph' };
		const result = addDisableHeadingStyleSaveProps(
			extraProps,
			{
				name: 'core/paragraph',
				attributes: {},
			} as ExtendedBlockConfiguration,
			{ className: DISABLE_HEADING_STYLE_CLASS }
		);

		expect( result ).toBe( extraProps );
	} );
} );
