export const getSliderOptions = ( attributes ) => {

	let options = {};

	const addOptions = ( name, value, defaultValue = undefined ) => {
		if ( undefined === value && undefined === defaultValue ) {
			return;
		}
		options = {
			...options,
			[ name ]: value ?? defaultValue,
		}
	}
	// エフェクト.
	addOptions( 'effect', attributes?.effect );


	return JSON.stringify( options );
}
