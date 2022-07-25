import { __ } from '@wordpress/i18n';
import { Button } from '@wordpress/components';
import { alignBottom, alignCenter, alignTop } from '@aktk/components/icons';

const AlignItemsControl = ( { layout, onChange } ) => {
	const { alignItems } = layout;
	const onAlignItemsChange = ( newValue ) => {
		onChange( {
			...layout,
			alignItems: newValue,
		} );
	};

	const AlignItemsOptions = [
		{
			value: 'flex-start',
			icon: alignTop,
			label: __( 'Align items top' ),
		},
		{
			value: 'center',
			icon: alignCenter,
			label: __( 'Align items center' ),
		},
		{
			value: 'flex-end',
			icon: alignBottom,
			label: __( 'Align items bottom' ),
		},
	];

	return (
		<fieldset>
			<legend>{ __( 'Vertical alignment' ) }</legend>
			<div>
				{ AlignItemsOptions.map( ( { value, icon, label } ) => {
					return (
						<Button
							key={ value }
							label={ label }
							icon={ icon }
							isPressed={ alignItems === value }
							onClick={ () => onAlignItemsChange( value ) }
						/>
					);
				} ) }
			</div>
		</fieldset>
	);
};
export default AlignItemsControl;
