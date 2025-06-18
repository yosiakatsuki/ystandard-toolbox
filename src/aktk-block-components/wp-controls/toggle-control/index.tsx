/**
 * WordPress Dependencies
 */
import { ToggleControl as WPToggleControl } from '@wordpress/components';

/**
 * ToggleControlコンポーネントのプロパティ型定義
 */
interface ToggleControlProps {
	checked: boolean;
	onChange: ( value: boolean ) => void;
	label?: string;
	help?: string;
	className?: string;
	disabled?: boolean;
	__nextHasNoMarginBottom?: boolean;
}

/**
 * ToggleControlコンポーネント
 * WordPressのToggleControlを単純にラップしたコンポーネント
 */
export default function ToggleControl( props: ToggleControlProps ) {
	return <WPToggleControl { ...props } __nextHasNoMarginBottom />;
}
