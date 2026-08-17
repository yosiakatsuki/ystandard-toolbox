/**
 * WordPress Dependencies
 */
import { TextareaControl as WPTextareaControl } from '@wordpress/components';
import type { TextareaControlProps } from '@wordpress/components/src/textarea-control/types';

/**
 * WordPressのTextareaControlを共通設定付きで表示する.
 *
 * @param props TextareaControlのprops.
 */
export default function TextareaControl( props: TextareaControlProps ) {
	return <WPTextareaControl { ...props } __nextHasNoMarginBottom />;
}
