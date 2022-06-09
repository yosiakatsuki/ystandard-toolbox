import { __ } from '@wordpress/i18n';
import NumberControl from '@aktk/components/number-control';

const ExcerptLength = ( { attributes, setAttributes } ) => {
	const { excerptLength } = attributes;
	const handleOnChange = ( newValue ) => {
		setAttributes( {
			excerptLength: newValue || undefined,
		} );
	};
	return (
		<>
			<NumberControl
				label={ __( '概要文長さ', 'ystandard-toolbox' ) }
				value={ excerptLength }
				onChange={ handleOnChange }
			/>
		</>
	);
};
export default ExcerptLength;
