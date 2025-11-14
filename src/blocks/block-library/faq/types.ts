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

/**
 * FAQアイテムブロックの属性型定義
 */
export type FaqItemBlockAttributes = {
	faqType: 'q' | 'a';
	faqTextColor?: string;
	customFaqTextColor?: string;
	faqBackgroundColor?: string;
	customFaqBackgroundColor?: string;
	faqBorderType: string;
	faqBorderSize: number;
	faqBorderColor?: string;
	customFaqBorderColor?: string;
	labelPosition: string;
	labelSize?: string;
	customLabelSize?: string;
	labelColor?: string;
	customLabelColor?: string;
	labelBold: boolean;
	labelBackgroundColor?: string;
	customLabelBackgroundColor?: string;
	labelBorderSize: number;
	labelBorderRadius: number;
	labelBorderColor?: string;
	customLabelBorderColor?: string;
	accordionArrowColor?: string;
	customAccordionArrowColor?: string;
};

/**
 * ボーダータイプ選択肢の型定義
 */
export type BorderTypeOption = {
	label: string;
	name: string;
};

/**
 * ラベル位置選択肢の型定義
 */
export type LabelPositionOption = {
	label: string;
	name: string;
};

/**
 * デザインプリセットの型定義
 */
export type DesignPreset = {
	name: string;
	label: string;
	itemStyles: Record< string, any >;
	labelStyles: Record< string, any >;
	attributes: Partial< FaqItemBlockAttributes >;
};
