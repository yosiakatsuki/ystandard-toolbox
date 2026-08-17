/**
 * WordPress Dependencies
 */
import { PluginMoreMenuItem as WPPluginMoreMenuItem } from '@wordpress/editor';

/**
 * PluginMoreMenuItemコンポーネント.
 *
 * @param props - PluginMoreMenuItemコンポーネントに渡すprops.
 * @return WordPressのPluginMoreMenuItemコンポーネント.
 */
export default function PluginMoreMenuItem(
	props: React.ComponentProps< typeof WPPluginMoreMenuItem >
) {
	return <WPPluginMoreMenuItem { ...props } />;
}
