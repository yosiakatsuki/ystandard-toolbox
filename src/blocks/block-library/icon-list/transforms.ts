/* WordPress Dependencies */
import { createBlock } from '@wordpress/blocks';

/**
 * block supports（color / typography / spacing 等）で自動追加される
 * 標準属性のうち、変換で引き継ぐ対象。
 */
const SHARED_ATTRIBUTE_KEYS = [
	'className',
	'style',
	'backgroundColor',
	'textColor',
	'gradient',
	'fontSize',
	'fontFamily',
] as const;

type SharedAttributes = Partial<
	Record< ( typeof SHARED_ATTRIBUTE_KEYS )[ number ], unknown >
>;

/**
 * オブジェクトから SHARED_ATTRIBUTE_KEYS に含まれる値のみ抽出する。
 */
const pickSharedAttributes = (
	attributes: Record< string, unknown > = {}
): SharedAttributes => {
	return SHARED_ATTRIBUTE_KEYS.reduce< SharedAttributes >( ( acc, key ) => {
		if ( undefined !== attributes[ key ] ) {
			acc[ key ] = attributes[ key ];
		}
		return acc;
	}, {} );
};

interface InnerBlock {
	name: string;
	attributes: Record< string, unknown >;
	innerBlocks?: InnerBlock[];
}

/**
 * core/list-item を ystdtb/icon-list-item に変換（入れ子 list は展開して平坦化）。
 */
const convertListItemsToIconListItems = (
	innerBlocks: InnerBlock[] = []
): ReturnType< typeof createBlock >[] => {
	const result: ReturnType< typeof createBlock >[] = [];

	innerBlocks.forEach( ( block ) => {
		if ( 'core/list-item' === block.name ) {
			const sharedAttrs = pickSharedAttributes( block.attributes );
			const content =
				'string' === typeof block.attributes?.content
					? block.attributes.content
					: '';
			result.push(
				createBlock( 'ystdtb/icon-list-item', {
					...sharedAttrs,
					content,
				} )
			);
			// list-item 配下の list はフラットに展開する
			if ( block.innerBlocks && block.innerBlocks.length > 0 ) {
				block.innerBlocks.forEach( ( nested ) => {
					if ( 'core/list' === nested.name ) {
						result.push(
							...convertListItemsToIconListItems(
								nested.innerBlocks
							)
						);
					}
				} );
			}
		}
	} );

	return result;
};

/**
 * ystdtb/icon-list-item を core/list-item に変換。
 */
const convertIconListItemsToListItems = (
	innerBlocks: InnerBlock[] = []
): ReturnType< typeof createBlock >[] => {
	return innerBlocks
		.filter( ( block ) => 'ystdtb/icon-list-item' === block.name )
		.map( ( block ) => {
			const sharedAttrs = pickSharedAttributes( block.attributes );
			const content =
				'string' === typeof block.attributes?.content
					? block.attributes.content
					: '';
			return createBlock( 'core/list-item', {
				...sharedAttrs,
				content,
			} );
		} );
};

const transforms = {
	from: [
		{
			type: 'block',
			blocks: [ 'core/list' ],
			transform: (
				attributes: Record< string, unknown >,
				innerBlocks: InnerBlock[]
			) => {
				return createBlock(
					'ystdtb/icon-list',
					pickSharedAttributes( attributes ),
					convertListItemsToIconListItems( innerBlocks )
				);
			},
		},
	],
	to: [
		{
			type: 'block',
			blocks: [ 'core/list' ],
			transform: (
				attributes: Record< string, unknown >,
				innerBlocks: InnerBlock[]
			) => {
				return createBlock(
					'core/list',
					pickSharedAttributes( attributes ),
					convertIconListItemsToListItems( innerBlocks )
				);
			},
		},
	],
};

export default transforms;
