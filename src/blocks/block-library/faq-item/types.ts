export type FaqItemEditProps = {
	attributes: FaqItemBlockAttributes;
	setAttributes: ( attributes: Partial< FaqItemBlockAttributes > ) => void;
	isSelected?: boolean;
	faqTextColor: { color?: string; slug?: string };
	faqBackgroundColor: { color?: string; slug?: string };
	faqBorderColor: { color?: string; slug?: string };
	labelColor: { color?: string; slug?: string };
	labelBackgroundColor: { color?: string; slug?: string };
	labelBorderColor: { color?: string; slug?: string };
	accordionArrowColor: { color?: string; slug?: string };
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
