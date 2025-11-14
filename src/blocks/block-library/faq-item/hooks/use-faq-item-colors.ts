import { useSelect } from '@wordpress/data';
import type { FaqItemBlockAttributes } from '../../faq/types';

/**
 * FAQアイテムの色関連のヘルパー関数を返すカスタムフック
 */
export const useFaqItemColors = (
	attributes: FaqItemBlockAttributes,
	setAttributes: ( attributes: Partial< FaqItemBlockAttributes > ) => void
) => {
	const {
		faqTextColor,
		faqBackgroundColor,
		faqBorderColor,
		labelColor,
		labelBackgroundColor,
		labelBorderColor,
	} = attributes;

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
		faqTextColor: {
			color: faqTextColor,
			setColor: ( color?: string ) => {
				setAttributes( {
					faqTextColor: getColorSlug( color ),
					customFaqTextColor: getColorCode( color ),
				} );
			},
		},
		faqBackgroundColor: {
			color: faqBackgroundColor,
			setColor: ( color?: string ) => {
				setAttributes( {
					faqBackgroundColor: getColorSlug( color ),
					customFaqBackgroundColor: getColorCode( color ),
				} );
			},
		},
		faqBorderColor: {
			color: faqBorderColor,
			setColor: ( color?: string ) => {
				setAttributes( {
					faqBorderColor: getColorSlug( color ),
					customFaqBorderColor: getColorCode( color ),
				} );
			},
		},
		labelColor: {
			color: labelColor,
			setColor: ( color?: string ) => {
				setAttributes( {
					labelColor: getColorSlug( color ),
					customLabelColor: getColorCode( color ),
				} );
			},
		},
		labelBackgroundColor: {
			color: labelBackgroundColor,
			setColor: ( color?: string ) => {
				setAttributes( {
					labelBackgroundColor: getColorSlug( color ),
					customLabelBackgroundColor: getColorCode( color ),
				} );
			},
		},
		labelBorderColor: {
			color: labelBorderColor,
			setColor: ( color?: string ) => {
				setAttributes( {
					labelBorderColor: getColorSlug( color ),
					customLabelBorderColor: getColorCode( color ),
				} );
			},
		},
	};
};
