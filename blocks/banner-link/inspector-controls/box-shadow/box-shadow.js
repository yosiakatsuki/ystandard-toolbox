import BoxShadowControl from "@ystdtb/components/box-shadow-control";

const BoxShadow = ( props ) => {
	const {
		attributes,
		setAttributes,
	} = props;
	const { boxShadow } = attributes;
	const handleOnChange = ( value ) => {
		console.log( {
			boxShadowAttributes: value
		} );
		setAttributes( {
			boxShadow: value,
		} );
	}
	return (
		<BoxShadowControl
			onChange={ handleOnChange }
			value={ boxShadow }
		/>
	);
}
export default BoxShadow;
