/**
 * WordPress dependencies
 */
import { BaseControl as WPBaseControl } from '@wordpress/components';
// @ts-expect-error
import type { BaseControlProps as WPBaseControlProps } from '@wordpress/components';

/**
 * BaseControl
 * @param props
 */
export default function BaseControl( props: WPBaseControlProps ): JSX.Element {
	return <WPBaseControl { ...props } __nextHasNoMarginBottom />;
}
