/**
 * Aktk Dependencies.
 */
import type { ResponsiveFontSize } from '@aktk/block-components/components/responsive-font-size-control';
import type { Spacing } from '@aktk/block-components/components/custom-spacing-select';

export type FaqEditProps = {
	attributes: FaqBlockAttributes;
	setAttributes: ( attributes: Partial< FaqBlockAttributes > ) => void;
	clientId: string;
	updateChildAttributes: (
		childAttributes:
			| Record< string, any >
			| ( ( attributes: Record< string, any > ) => Record< string, any > )
	) => void;
};

export type FaqBorderSide = {
	color?: string;
	style?: string;
	width?: string;
};

export type FaqBorder = FaqBorderSide & {
	top?: FaqBorderSide;
	right?: FaqBorderSide;
	bottom?: FaqBorderSide;
	left?: FaqBorderSide;
	radius?:
		| string
		| {
				topLeft?: string;
				topRight?: string;
				bottomRight?: string;
				bottomLeft?: string;
		  };
};

/**
 * FAQブロックの属性型定義
 */
export type FaqBlockAttributes = {
	isAccordion: boolean;
	backgroundColor?: string;
	gradient?: string;
	borderColor?: string;
	accordionArrowColor?: string;
	customAccordionArrowColor?: string;
	fontSize?: string;
	fontFamily?: string;
	style?: {
		border?: FaqBorder;
		color?: {
			background?: string;
			gradient?: string;
		};
		spacing?: {
			margin?: Spacing | string;
			padding?: Spacing | string;
		};
		typography?: {
			fontSize?: string;
			fontFamily?: string;
			fontStyle?: string;
			fontWeight?: string;
			lineHeight?: string | number;
			letterSpacing?: string;
			textDecoration?: string;
			textTransform?: string;
			writingMode?: string;
		};
		ystdtb?: {
			faq?: {
				arrow?: {
					color?: {
						text?: string;
					};
					spacing?: {
						margin?: Spacing;
					};
				};
				responsive?: {
					typography?: {
						fontSize?: ResponsiveFontSize;
					};
				};
			};
		};
	};
};
