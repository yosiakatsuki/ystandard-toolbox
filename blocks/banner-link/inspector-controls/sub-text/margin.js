import { BaseControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import ResponsiveValues from '@ystdtb/components/responsive-values';

const Margin = ( { attributes, setAttributes } ) => {
	const { subTextMargin } = attributes;
	const handleOnChange = ( value ) => {
		setAttributes( {
			subTextMargin: value,
		} );
	};
	return (
		<BaseControl
			id={ subTextMargin }
			label={ __( 'テキスト(上段)との間隔', 'ystandard-toolbox' ) }
		>
			<ResponsiveValues
				values={ subTextMargin }
				onChange={ handleOnChange }
			/>
		</BaseControl>
	);
};
export default Margin;
