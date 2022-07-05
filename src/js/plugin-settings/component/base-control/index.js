import { BaseControl as WPBaseControl } from '@wordpress/components';
import './_index.scss';

const BaseControl = ( { label, id, children, ...props } ) => {
	return (
		<WPBaseControl
			{ ...{
				label,
				id,
				...props,
			} }
		>
			<div className={ 'aktk-settings__base-control' }>{ children }</div>
		</WPBaseControl>
	);
};
export default BaseControl;
