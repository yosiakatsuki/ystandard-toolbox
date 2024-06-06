import classnames from 'classnames';
/**
 * WordPress dependencies
 */
import { BaseControl as WPBaseControl } from '@wordpress/components';
// @ts-expect-error
import type { BaseControlProps as WPBaseControlProps } from '@wordpress/components';

/**
 * CSS
 */
import './style-editor.scss';

type BaseControlProps = WPBaseControlProps & {
	isFullWidth?: boolean;
};

const BaseControl = ( {
	label,
	id,
	children,
	isFullWidth = false,
	...props
}: BaseControlProps ) => {
	const className = classnames( 'aktk-settings__base-control', {
		'is-full-width': isFullWidth,
	} );
	return (
		<WPBaseControl
			{ ...{
				label,
				id,
				...props,
			} }
		>
			<div className={ className }>{ children }</div>
		</WPBaseControl>
	);
};
export default BaseControl;
