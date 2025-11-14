import { useSelect } from '@wordpress/data';
import type { FaqBlockAttributes } from '../types';

/**
 * 色関連のヘルパー関数を返すカスタムフック
 */
export const useFaqColors = (
	attributes: FaqBlockAttributes,
	setAttributes: ( attributes: Partial< FaqBlockAttributes > ) => void
) => {
	const { backgroundColor, borderColor, accordionArrowColor } = attributes;

	// テーマの色設定を取得
	const colors = useSelect( ( select ) => {
		// @ts-ignore
		const settings = select( 'core/block-editor' ).getSettings();
		return settings.colors || [];
	}, [] );

	/**
	 * 色スラッグを取得
	 */
	const getColorSlug = ( color?: string ) => {
		if ( ! color ) {
			return undefined;
		}
		const colorObj = colors.find( ( c: any ) => c.color === color );
		return colorObj?.slug;
	};

	/**
	 * 色コードを取得
	 */
	const getColorCode = ( color?: string ) => {
		if ( ! color ) {
			return undefined;
		}
		const colorObj = colors.find( ( c: any ) => c.color === color );
		return colorObj ? undefined : color;
	};

	return {
		backgroundColor: {
			color: backgroundColor,
			setColor: ( color?: string ) => {
				setAttributes( {
					backgroundColor: getColorSlug( color ),
					customBackgroundColor: getColorCode( color ),
				} );
			},
		},
		borderColor: {
			color: borderColor,
			setColor: ( color?: string ) => {
				setAttributes( {
					borderColor: getColorSlug( color ),
					customBorderColor: getColorCode( color ),
				} );
			},
		},
		accordionArrowColor: {
			color: accordionArrowColor,
			setColor: ( color?: string ) => {
				setAttributes( {
					accordionArrowColor: getColorSlug( color ),
					customAccordionArrowColor: getColorCode( color ),
				} );
			},
			getColorSlug,
			getColorCode,
		},
	};
};
