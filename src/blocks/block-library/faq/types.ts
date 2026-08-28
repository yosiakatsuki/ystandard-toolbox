/**
 * Aktk Dependencies.
 */
import type { ResponsiveFontSize } from '@aktk/block-components/components/responsive-font-size-control';
import type {
	ResponsiveTextAlign,
	TextAlign,
} from '@aktk/block-components/components/responsive-text-align-control';

export type FaqEditProps = {
	attributes: FaqBlockAttributes;
	setAttributes: ( attributes: Partial< FaqBlockAttributes > ) => void;
	clientId: string;
	updateChildAttributes: ( childAttributes: Record< string, any > ) => void;
};

/**
 * FAQブロックの属性型定義
 */
export type FaqBlockAttributes = {
	isAccordion: boolean;
	backgroundColor?: string;
	customBackgroundColor?: string;
	borderType: string;
	borderSize: number;
	borderColor?: string;
	customBorderColor?: string;
	accordionArrowColor?: string;
	customAccordionArrowColor?: string;
	fontSize?: string;
	fontFamily?: string;
	style?: {
		typography?: {
			fontSize?: string;
			fontFamily?: string;
			fontStyle?: string;
			fontWeight?: string;
			lineHeight?: string | number;
			letterSpacing?: string;
			textAlign?: TextAlign;
			textDecoration?: string;
			textTransform?: string;
			writingMode?: string;
		};
		ystdtb?: {
			faq?: {
				responsive?: {
					typography?: {
						fontSize?: ResponsiveFontSize;
						textAlign?: ResponsiveTextAlign;
					};
				};
			};
		};
	};
};
