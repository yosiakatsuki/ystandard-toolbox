import { BaseControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import ResponsiveValues from '@ystd/components/responsive-values';
import { parseSize } from '../../function/edit';

const MinHeight = ( { attributes, setAttributes } ) => {
	const { size, ratio } = attributes;

	const handleOnChange = ( newValue ) => {
		setAttributes( {
			size: parseSize( {
				...size,
				minHeight: newValue,
			} ),
		} );
	};
	return (
		<>
			{ ! ratio && (
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
