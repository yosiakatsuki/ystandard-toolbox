import { useSelect } from '@wordpress/data';
import type { FaqItemBlockAttributes } from '../../faq/types';

/**
 * FAQアイテムのフォントサイズ関連のヘルパー関数を返すカスタムフック
 */
export const useFaqItemFontSize = (
	attributes: FaqItemBlockAttributes,
	setAttributes: ( attributes: Partial< FaqItemBlockAttributes > ) => void
) => {
	const { labelSize, customLabelSize } = attributes;

	// テーマのフォントサイズ設定を取得
	const fontSizes = useSelect( ( select ) => {
		// @ts-ignore
		const settings = select( 'core/block-editor' ).getSettings();
		return settings?.typography?.fontSizes || [];
	}, [] );

	/**
	 * フォントサイズスラッグを取得
	 */
	const getFontSizeSlug = ( size?: string ) => {
		if ( ! size ) {
			return undefined;
		}
		const fontSizeObj = fontSizes.find( ( fs: any ) => fs.size === size );
		return fontSizeObj?.slug;
	};

	/**
	 * カスタムフォントサイズを取得
	 */
	const getCustomFontSize = ( size?: string ) => {
		if ( ! size ) {
			return undefined;
		}
		const fontSizeObj = fontSizes.find( ( fs: any ) => fs.size === size );
		return fontSizeObj ? undefined : size;
	};

	/**
	 * 実際のフォントサイズ値を取得
	 */
	const getActualSize = () => {
		if ( customLabelSize ) {
			return customLabelSize;
		}
		if ( labelSize ) {
			const fontSizeObj = fontSizes.find(
				( fs: any ) => fs.slug === labelSize
			);
			return fontSizeObj?.size;
		}
		return undefined;
	};

	return {
		labelSize: {
			size: getActualSize(),
			setSize: ( size?: string ) => {
				setAttributes( {
					labelSize: getFontSizeSlug( size ),
					customLabelSize: getCustomFontSize( size ),
				} );
			},
		},
	};
};
