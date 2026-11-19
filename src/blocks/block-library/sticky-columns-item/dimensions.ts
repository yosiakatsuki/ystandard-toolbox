/* WordPress Dependencies */
import type { BlockEditProps } from '@wordpress/blocks';

/* Aktk Dependencies */
import type {
	ResponsiveDimensions,
	ResponsiveSizeSettings,
} from '@aktk/block-components/components/responsive-size-panel';
import { stripUndefined } from '@aktk/block-components/utils/object';

/* Plugin Dependencies */
import metadata from './block.json';

export const sizeSettings: ResponsiveSizeSettings =
	metadata.supports.ystdtbResponsiveSize;

export type ColumnItemAttributes = {
	style?: {
		dimensions?: { width?: string; minHeight?: string };
		ystdtb?: { stickyColumnsItem?: { responsive?: ResponsiveDimensions } };
	};
};
export type ColumnItemEditProps = BlockEditProps< ColumnItemAttributes >;

/**
 * 更新した端末別寸法だけを保存し、空になった階層を除く。
 * @param style   子のスタイル属性。
 * @param changes 更新する寸法。
 */
export function updateDimensions(
	style: ColumnItemAttributes[ 'style' ],
	changes: ResponsiveDimensions
) {
	const item = style?.ystdtb?.stickyColumnsItem;
	return stripUndefined( {
		...style,
		ystdtb: {
			...style?.ystdtb,
			stickyColumnsItem: {
				...item,
				responsive: { ...item?.responsive, ...changes },
			},
		},
	} ) as ColumnItemAttributes[ 'style' ];
}

/**
 * 子自身に適用する端末別寸法を、編集・保存共通のCSS変数へ変換する。
 * @param attributes 子の属性。
 */
export function getItemSizeVariables( attributes: ColumnItemAttributes ) {
	const responsive = attributes.style?.ystdtb?.stickyColumnsItem?.responsive;
	const variables: Record< string, string > = {};
	for ( const key of Object.keys(
		sizeSettings
	) as ( keyof ResponsiveDimensions )[] ) {
		// 幅は左右の残幅計算に使うため、親へ渡す。
		if ( key === 'width' || ! sizeSettings[ key ] ) {
			continue;
		}
		const property = key.replace(
			/[A-Z]/g,
			( char ) => '-' + char.toLowerCase()
		);
		for ( const device of [ 'desktop', 'tablet', 'mobile' ] as const ) {
			const size = responsive?.[ key ]?.[ device ];
			if ( size ) {
				variables[ `--ystdtb--${ device }--columns--${ property }` ] =
					size;
			}
		}
	}
	return variables;
}
