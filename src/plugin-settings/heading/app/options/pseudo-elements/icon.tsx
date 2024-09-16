/**
 * WordPress
 */
import { __ } from '@wordpress/i18n';
/**
 * Plugin Dependencies
 */
import BaseControl from '@aktk/plugin-settings/components/base-control';
import { IconSelect } from '@aktk/block-components/components/icon-select';

interface PseudoElementsIconProps {
	type: 'before' | 'after';
	value: string | undefined;
	onChange: ( newValue: { icon?: string } ) => void;
}

export function PseudoElementsIcon( props: PseudoElementsIconProps ) {
	const { value, onChange, type } = props;

	const handleOnChange = ( newValue: string | undefined ) => {
		onChange( {
			icon: newValue,
		} );
	};
	return (
		<BaseControl
			id={ `${ type }-icon` }
			label={ __( 'アイコン', 'ystandard-toolbox' ) }
			isFullWidth={ true }
		>
			<IconSelect icon={ value || '' } onChange={ handleOnChange } />
		</BaseControl>
	);
}
