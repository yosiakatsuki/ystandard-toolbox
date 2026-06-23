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
};
