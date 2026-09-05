/**
 * Aktk Dependencies.
 */
import type { Spacing } from '@aktk/block-components/components/custom-spacing-select';

export type FaqItemEditProps = {
	attributes: FaqItemBlockAttributes;
	setAttributes: ( attributes: Partial< FaqItemBlockAttributes > ) => void;
	isSelected?: boolean;
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
	textColor?: string;
	backgroundColor?: string;
	gradient?: string;
	/** v2.3.0以前の移行処理用. */
	faqTextColor?: string;
	/** v2.3.0以前の移行処理用. */
	customFaqTextColor?: string;
	/** v2.3.0以前の移行処理用. */
	faqBackgroundColor?: string;
	/** v2.3.0以前の移行処理用. */
	customFaqBackgroundColor?: string;
	faqBorderType: string;
	faqBorderSize?: string;
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
	labelBorderSize?: string;
	labelBorderRadius?: string;
	labelBorderColor?: string;
	customLabelBorderColor?: string;
	accordionArrowColor?: string;
	customAccordionArrowColor?: string;
	style?: {
		color?: {
			text?: string;
			background?: string;
			gradient?: string;
		};
		ystdtb?: {
			faqItem?: {
				arrow?: {
					color?: {
						text?: string;
					};
					spacing?: {
						margin?: Spacing;
					};
				};
			};
		};
	};
};

/**
 * ボーダータイプ選択肢の型定義
 */
export type BorderTypeOption = {
	key: string;
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
