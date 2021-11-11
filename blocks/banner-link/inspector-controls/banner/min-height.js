import { BaseControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import ResponsiveValues from "@ystdtb/components/responsive-values";

const MinHeight = ( { attributes, setAttributes } ) => {
	const {
		size,
		ratio,
	} = attributes;

	const handleOnChange = ( newValue ) => {
		setAttributes( {
			size: {
				...size,
				minHeight: newValue,
			}
		} );
	}
	return (
		<>
			{ ( ! ratio &&
				<BaseControl>
					<ResponsiveValues
						label={ __( '最小高さ', 'ystandard-toolbox' ) }
						values={ size?.minHeight }
						onChange={ handleOnChange }
					/>
				</BaseControl>
			) }
		</>
	);
};
export default MinHeight;
