/* Block Dependencies */
import attributes from './attributes.json';
import save from './save';
import { migrateFaqItemAttributes } from './migrate';
import type { FaqItemBlockAttributes } from '../../types';

/**
 * 保存HTMLが同じ場合も、旧文字色・背景色・枠線属性を標準属性へ移行する.
 *
 * @param value ブロック属性.
 */
function isEligible( value: FaqItemBlockAttributes ) {
	return (
		undefined !== value.faqTextColor ||
		undefined !== value.customFaqTextColor ||
		undefined !== value.faqBackgroundColor ||
		undefined !== value.customFaqBackgroundColor ||
		!! value.faqBorderType ||
		undefined !== value.faqBorderSize ||
		undefined !== value.faqBorderColor ||
		undefined !== value.customFaqBorderColor ||
		undefined !== value.labelColor ||
		undefined !== value.customLabelColor ||
		false === value.labelBold
	);
}

export const deprecated230 = [
	{
		attributes,
		supports: { align: false, className: false, reusable: false },
		isEligible,
		migrate: migrateFaqItemAttributes,
		save,
	},
];
