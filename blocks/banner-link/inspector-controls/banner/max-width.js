import { BaseControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import ResponsiveValues from '@aktk/components/responsive-values';
import { parseSize } from '../../function/edit';

const MaxWidth = ( { attributes, setAttributes } ) => {
	const { size } = attributes;

	const handleOnChange = ( newValue ) => {
		const newSize = parseSize( {
			...size,
			maxWidth: newValue,
		} );
		setAttributes( {
			size: newSize,
		} );
		if ( ! newSize ) {
			setAttributes( {
				blockPosition: undefined,
			} );
		}
	};
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
};
export default MaxWidth;
