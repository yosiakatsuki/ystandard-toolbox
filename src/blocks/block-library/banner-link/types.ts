/**
 * Banner-Link ブロック 型定義
 */

export interface BannerLinkAttributes {
	link?: object;
	backgroundImage?: object;
	backgroundImageFocalPoint?: object;
	backgroundColor?: string;
	customBackgroundColor?: string;
	gradient?: string;
	customGradient?: string;
	backgroundOpacity?: number;
	ratio?: string;
	size?: object;
	borderRadius?: string;
	border?: object;
	mainText?: string;
	mainTextFontSize?: object;
	mainTextColor?: string;
	customMainTextColor?: string;
	mainTextLineHeight?: number;
	mainTextLetterSpacing?: string;
	mainTextHtml?: string;
	mainTextStyleClear?: boolean;
	subText?: string;
	subTextFontSize?: object;
	subTextColor?: string;
	customSubTextColor?: string;
	subTextLineHeight?: number;
	subTextLetterSpacing?: string;
	subTextHtml?: string;
	subTextStyleClear?: boolean;
	subTextMargin?: object;
	padding?: object;
	boxShadow?: object;
	contentPosition?: object;
	blockPosition?: string;
}

export interface BannerLinkEditProps {
	attributes: BannerLinkAttributes;
	setAttributes: (attributes: Partial<BannerLinkAttributes>) => void;
	backgroundColor?: {
		color?: string;
		class?: string;
	};
	mainTextColor?: {
		color?: string;
		class?: string;
	};
	subTextColor?: {
		color?: string;
		class?: string;
	};
}