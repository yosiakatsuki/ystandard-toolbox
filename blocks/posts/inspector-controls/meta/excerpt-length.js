import { __ } from '@wordpress/i18n';
import NumberControl from '@ystd/components/number-control';

const ExcerptLength = ( { attributes, setAttributes } ) => {
	const { excerptLength } = attributes;
	const handleOnChange = ( newValue ) => {
		const parsedValue = newValue === '' ? undefined : Number(newValue);
		setAttributes( {
			excerptLength: parsedValue,
		} );
	};
	return (
		<>
			<NumberControl
				label={ __( '概要文長さ', 'ystandard-toolbox' ) }
				value={ excerptLength }
				onChange={ handleOnChange }
				__next40pxDefaultSize
			/>
		</>
	);
};
export default ExcerptLength;
