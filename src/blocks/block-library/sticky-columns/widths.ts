/* Plugin Dependencies */
import {
	sizeSettings,
	type ColumnItemAttributes,
} from '../sticky-columns-item/dimensions';

/**
 * 兄弟の指定幅から残幅を求めるため、直下の2個の幅だけを親へ公開する。
 * @param columns 直下の子属性。
 */
export function getColumnWidthVariables( columns: ColumnItemAttributes[] ) {
	const variables: Record< string, string > = {};
	columns.slice( 0, 2 ).forEach( ( column, index ) => {
		const prefix = `--ystdtb--columns--${ index + 1 }`;
		const width = column?.style?.dimensions?.width;
		// 未設定時はCSSの残幅または均等割りに任せる。
		if ( width ) {
			variables[ prefix + '-width' ] = width;
		}
		if ( ! sizeSettings.width ) {
			return;
		}
		const responsive =
			column?.style?.ystdtb?.stickyColumnsItem?.responsive?.width;
		for ( const device of [ 'mobile', 'tablet', 'desktop' ] as const ) {
			const size = responsive?.[ device ];
			// 指定のある端末だけ通常値を上書きする。
			if ( size ) {
				variables[ prefix + '-' + device ] = size;
			}
		}
	} );
	return variables;
}
