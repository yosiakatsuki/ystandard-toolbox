/**
 * Aktk Dependencies.
 */
import type { Spacing } from '@aktk/block-components/components/custom-spacing-select';
import type { ResponsiveFontSize } from '@aktk/block-components/components/responsive-font-size-control';
import type { ResponsiveSpacing } from '@aktk/block-components/components/responsive-spacing-control';
import type { FaqBorder } from '../faq/types';

export type FaqItemEditProps = {
	attributes: FaqItemBlockAttributes;
	setAttributes: ( attributes: Partial< FaqItemBlockAttributes > ) => void;
	isSelected?: boolean;
};

/**
 * FAQアイテムブロックの属性型定義
 */
export type FaqItemBlockAttributes = {
	faqType: 'q' | 'a';
	textColor?: string;
	backgroundColor?: string;
	gradient?: string;
	borderColor?: string;
	/** v2.3.0以前の移行処理用. */
	faqTextColor?: string;
	/** v2.3.0以前の移行処理用. */
	customFaqTextColor?: string;
	/** v2.3.0以前の移行処理用. */
	faqBackgroundColor?: string;
	/** v2.3.0以前の移行処理用. */
	customFaqBackgroundColor?: string;
	/** v2.3.0以前の移行処理用. */
	faqBorderType?: string;
	faqBorderSize?: string;
	faqBorderColor?: string;
	customFaqBorderColor?: string;
	labelPosition?: string;
	fontSize?: string;
	labelSize?: string;
	customLabelSize?: string;
	/** v2.3.0以前の移行処理用. */
	labelColor?: string;
	/** v2.3.0以前の移行処理用. */
	customLabelColor?: string;
	/** v2.3.0以前の移行処理用. */
	labelBold?: boolean;
	labelBackgroundColor?: string;
	customLabelBackgroundColor?: string;
	labelBorderSize?: string;
	labelBorderRadius?: string;
	labelBorderColor?: string;
	customLabelBorderColor?: string;
	/** v2.3.0以前の移行処理用。 */
	accordionArrowColor?: string;
	/** v2.3.0以前の移行処理用。 */
	customAccordionArrowColor?: string;
	style?: {
		spacing?: { padding?: Spacing | string };
		border?: FaqBorder;
		color?: {
			text?: string;
			background?: string;
			gradient?: string;
		};
		typography?: {
			fontSize?: string;
		};
		ystdtb?: {
			faqItem?: {
				item?: FaqItemLayoutStyle;
				contents?: {
					responsive?: {
						spacing?: { padding?: ResponsiveSpacing };
						typography?: { fontSize?: ResponsiveFontSize };
					};
				};
				label?: {
					border?: {
						color?: string;
						width?: string;
						radius?: string;
						style?: string;
					};
					dimensions?: { size?: string };
					spacing?: { margin?: Spacing };
					responsive?: {
						typography?: { fontSize?: ResponsiveFontSize };
						dimensions?: { size?: ResponsiveFontSize };
						spacing?: { margin?: ResponsiveSpacing };
					};
					color?: {
						text?: string;
						background?: string;
					};
					typography?: {
						fontSize?: string;
						fontFamily?: string;
						fontStyle?: string;
						fontWeight?: string;
						lineHeight?: string;
						textTransform?: string;
					};
				};
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
 * デザインプリセットの型定義
 */
export type DesignPreset = {
	name: string;
	label: string;
	labelTextColor?: string;
	itemStyles: Record< string, any >;
	labelStyles: Record< string, any >;
	attributes: Partial< FaqItemBlockAttributes >;
};

export type FaqItemLayoutStyle = {
	layout?: { alignItems?: string };
	spacing?: { gap?: string };
	responsive?: {
		spacing?: { gap?: ResponsiveFontSize };
	};
};

export type FaqItemStyle = NonNullable<
	NonNullable<
		NonNullable< FaqItemBlockAttributes[ 'style' ] >[ 'ystdtb' ]
	>[ 'faqItem' ]
>;
export type FaqLabelStyle = NonNullable< FaqItemStyle[ 'label' ] >;
