/**
 * WordPress Dependencies
 */
import { ToggleControl as WPToggleControl } from '@wordpress/components';
import type { ToggleControlProps } from '@wordpress/components/src/toggle-control/types';

/**
 * ToggleControlコンポーネント
 * WordPressのToggleControlを単純にラップしたコンポーネント
 * @param props
 */
export default function ToggleControl( props: ToggleControlProps ) {
	return <WPToggleControl { ...props } __nextHasNoMarginBottom />;
}
