/**
 * WordPress Dependencies
 */
import { createBlock } from '@wordpress/blocks';

/**
 * Block Dependencies
 */
import transforms from '../transforms';

jest.mock( '@wordpress/blocks', () => ( {
	createBlock: jest.fn( ( name, attributes = {}, innerBlocks = [] ) => ( {
		name,
		attributes,
		innerBlocks,
	} ) ),
} ) );

const transformFromCoreList = (
	attributes: Record< string, unknown > = {},
	innerBlocks: unknown[] = []
) => {
	return transforms.from[ 0 ].transform( attributes, innerBlocks as any );
};

describe( 'icon-list transforms', () => {
	beforeEach( () => {
		jest.clearAllMocks();
	} );

	it( 'core/list-item の originalContent からテキストを引き継ぐ', () => {
		const block = transformFromCoreList( {}, [
			{
				name: 'core/list-item',
				attributes: {},
				originalContent: '<li>16:9</li>',
				innerBlocks: [],
			},
			{
				name: 'core/list-item',
				attributes: {},
				originalContent: '<li>4:3</li>',
				innerBlocks: [],
			},
		] );

		expect( block.innerBlocks ).toHaveLength( 2 );
		expect( block.innerBlocks[ 0 ].attributes.content ).toBe( '16:9' );
		expect( block.innerBlocks[ 1 ].attributes.content ).toBe( '4:3' );
		expect( createBlock ).toHaveBeenCalledWith(
			'ystdtb/icon-list',
			{},
			block.innerBlocks
		);
	} );

	it( 'core/list-item の装飾済みHTMLを保持して変換する', () => {
		const block = transformFromCoreList( {}, [
			{
				name: 'core/list-item',
				attributes: {},
				originalContent:
					'<li><strong>太字</strong>と<a href="https://example.com">リンク</a></li>',
				innerBlocks: [],
			},
		] );

		expect( block.innerBlocks[ 0 ].attributes.content ).toBe(
			'<strong>太字</strong>と<a href="https://example.com">リンク</a>'
		);
	} );

	it( 'core/list-item の RichTextData 由来 content をHTML文字列として引き継ぐ', () => {
		const block = transformFromCoreList( {}, [
			{
				name: 'core/list-item',
				attributes: {
					content: {
						toHTMLString: () =>
							'<strong>16:9</strong><br>追加テキスト',
						toString: () => '16:9追加テキスト',
					},
				},
				innerBlocks: [],
			},
		] );

		expect( block.innerBlocks[ 0 ].attributes.content ).toBe(
			'<strong>16:9</strong><br>追加テキスト'
		);
	} );

	it( '入れ子リストは親アイテムの本文から除外し、子アイテムとして平坦化する', () => {
		const block = transformFromCoreList( {}, [
			{
				name: 'core/list-item',
				attributes: {},
				originalContent: '<li>親<ul><li>子</li></ul></li>',
				innerBlocks: [
					{
						name: 'core/list',
						attributes: {},
						innerBlocks: [
							{
								name: 'core/list-item',
								attributes: {},
								originalContent: '<li>子</li>',
								innerBlocks: [],
							},
						],
					},
				],
			},
		] );

		expect( block.innerBlocks ).toHaveLength( 2 );
		expect( block.innerBlocks[ 0 ].attributes.content ).toBe( '親' );
		expect( block.innerBlocks[ 1 ].attributes.content ).toBe( '子' );
	} );
} );
