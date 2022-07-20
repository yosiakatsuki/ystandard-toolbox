import classnames from 'classnames';
import { BaseControl as WPBaseControl } from '@wordpress/components';
import './_editor.scss';

const BaseControl = ( { label, id, children, isFullWidth, ...props } ) => {
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
