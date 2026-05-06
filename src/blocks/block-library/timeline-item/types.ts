export interface TimeLineItemAttributes {
	labelType?: string;
	labelContents?: string;
	labelSize?: string;
	labelBold?: boolean;
	labelColor?: string;
	customLabelColor?: string;
	labelBackgroundColor?: string;
	customLabelBackgroundColor?: string;
	labelFontSize?: string;
	customLabelFontSize?: string;
	labelBorderSize?: string;
	labelBorderRadius?: string;
	labelBorderColor?: string;
	customLabelBorderColor?: string;
	contentsInnerMargin?: string;
	contentsBorderSize?: string;
	contentMarginTop?: string;
	contentsBorderColor?: string;
	customContentsBorderColor?: string;
}

export interface TimeLineItemProps {
	attributes: TimeLineItemAttributes;
	setAttributes: ( attributes: TimeLineItemAttributes ) => void;
	className?: string;
	clientId: string;
	isSelected: boolean;
	name?: string;
}
