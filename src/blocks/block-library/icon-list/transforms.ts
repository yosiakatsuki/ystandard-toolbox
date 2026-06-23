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
 *
 * @param attributes 対象属性.
 * @return 変換で引き継ぐ共有属性.
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
	innerHTML?: string;
	originalContent?: string;
}

/**
 * RichText系属性からHTML文字列を取得する。
 *
 * @param value 属性値.
 * @return HTML文字列.
 */
const getRichTextHtml = ( value: unknown ): string => {
	if ( 'string' === typeof value ) {
		return value;
	}

	if ( ! value || 'object' !== typeof value ) {
		return '';
	}

	if ( 'toHTMLString' in value && 'function' === typeof value.toHTMLString ) {
		return value.toHTMLString();
	}

	if ( 'toString' in value && 'function' === typeof value.toString ) {
		const content = value.toString();
		return '[object Object]' === content ? '' : content;
	}

	return '';
};

/**
 * list-item の保存HTMLから li 直下の内容を取得する。
 *
 * @param html list-item の保存HTML.
 * @return li 直下のHTML.
 */
const extractListItemContentFromHtml = ( html: string ): string => {
	const template = document.createElement( 'template' );
	template.innerHTML = html.trim();
	const listItem = template.content.querySelector( 'li' );

	if ( ! listItem ) {
		return html.trim();
	}

	Array.from( listItem.children ).forEach( ( child ) => {
		if ( 'UL' === child.tagName || 'OL' === child.tagName ) {
			child.remove();
		}
	} );

	return listItem.innerHTML.trim();
};

/**
 * list-item ブロックのテキスト内容を取得する。
 *
 * @param block 変換元の list-item ブロック.
 * @return list-item のテキスト内容.
 */
const getListItemContent = ( block: InnerBlock ): string => {
	const attributeContent = getRichTextHtml( block.attributes?.content );
	if ( '' !== attributeContent ) {
		return attributeContent;
	}

	const html =
		'string' === typeof block.originalContent && block.originalContent
			? block.originalContent
			: block.innerHTML;

	if ( 'string' !== typeof html || ! html ) {
		return '';
	}

	return extractListItemContentFromHtml( html );
};

/**
 * core/list-item を ystdtb/icon-list-item に変換（入れ子 list は展開して平坦化）。
 *
 * @param innerBlocks 変換元の子ブロック.
 * @return 変換後の icon-list-item ブロック配列.
 */
const convertListItemsToIconListItems = (
	innerBlocks: InnerBlock[] = []
): ReturnType< typeof createBlock >[] => {
	const result: ReturnType< typeof createBlock >[] = [];

	innerBlocks.forEach( ( block ) => {
		if ( 'core/list-item' === block.name ) {
			const sharedAttrs = pickSharedAttributes( block.attributes );
			const content = getListItemContent( block );
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
 *
 * @param innerBlocks 変換元の子ブロック.
 * @return 変換後の core/list-item ブロック配列.
 */
const convertIconListItemsToListItems = (
	innerBlocks: InnerBlock[] = []
): ReturnType< typeof createBlock >[] => {
	return innerBlocks
		.filter( ( block ) => 'ystdtb/icon-list-item' === block.name )
		.map( ( block ) => {
			const sharedAttrs = pickSharedAttributes( block.attributes );
			const content = getListItemContent( block );
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
