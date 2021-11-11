import { BaseControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import ResponsiveValues from "@ystdtb/components/responsive-values";


const MaxWidth = ( { attributes, setAttributes } ) => {
	const {
		size,
	} = attributes;


	const handleOnChange = ( newValue ) => {
		setAttributes( {
			size: {
				...size,
				maxWidth: newValue,
			}
		} );
	}
	return (
		<>
			<BaseControl>
				<ResponsiveValues
					label={ __( '最大幅', 'ystandard-toolbox' ) }
					values={ size?.maxWidth }
					onChange={ handleOnChange }
				/>
			</BaseControl>
		</>
	);
}
export default MaxWidth;
