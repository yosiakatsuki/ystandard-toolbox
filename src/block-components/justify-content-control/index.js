import {
	justifyLeft,
	justifyCenter,
	justifyRight,
	justifySpaceBetween,
} from '@wordpress/icons';
import { __ } from '@wordpress/i18n';
import { Button } from '@wordpress/components';

const properties = {
	vertical: 'alignItems',
	horizontal: 'justifyContent',
};

const JustifyContentControl = ( { layout, onChange } ) => {
	const { justifyContent, alignItems, orientation = 'vertical' } = layout;
	const property = properties.hasOwnProperty( orientation )
		? properties[ orientation ]
		: 'justifyContent';
	const selectedValue =
		'vertical' === orientation ? alignItems : justifyContent;
	const onJustifyContentChange = ( newValue ) => {
		onChange( {
			...layout,
			[ property ]: selectedValue === newValue ? undefined : newValue,
		} );
	};
	const getValue = ( value ) => {
		if ( 'horizontal' === orientation ) {
			return value.justifyContent;
		}
		return value.alignItems;
	};
	const options = [
		{
			value: {
				justifyContent: 'left',
				alignItems: 'flex-start',
			},
			icon: justifyLeft,
			label: __( '左揃え', 'ystandard-toolbox' ),
		},
		{
			value: {
				justifyContent: 'center',
				alignItems: 'center',
			},
			icon: justifyCenter,
			label: __( '中央揃え', 'ystandard-toolbox' ),
		},
		{
			value: {
				justifyContent: 'right',
				alignItems: 'flex-end',
			},
			icon: justifyRight,
			label: __( '右揃え', 'ystandard-toolbox' ),
		},
	];
	if ( orientation === 'horizontal' ) {
		options.push( {
			value: {
				justifyContent: 'space-between',
				alignItems: 'flex-start',
			},
			icon: justifySpaceBetween,
			label: __( '両端揃え', 'ystandard-toolbox' ),
		} );
	}

	return (
		<fieldset>
			<legend>{ __( '横配置', 'ystandard-toolbox' ) }</legend>
			<div>
				{ options.map( ( { value, icon, label } ) => {
					return (
						<Button
							key={ value }
							label={ label }
							icon={ icon }
							isPressed={ selectedValue === getValue( value ) }
							onClick={ () =>
								onJustifyContentChange( getValue( value ) )
							}
						/>
					);
				} ) }
			</div>
		</fieldset>
	);
};
export default JustifyContentControl;
