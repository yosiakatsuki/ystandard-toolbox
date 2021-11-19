const secToMs = ( value, defaultValue = undefined ) => {
	if ( ! value || Number.isNaN( parseFloat( value ) ) ) {
		return defaultValue;
	}

	return parseFloat( value ) * 1000;
}
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
	// 速さ.
	addOptions( 'speed', secToMs( attributes?.speed, 300 ) );
	// ループ再生.
	addOptions( 'loop', attributes?.loop, true );
	// 自動再生.
	if ( false !== attributes?.autoplay ) {
		const autoplayDelay = attributes?.autoplayDelay || 3;
		addOptions( 'autoplay', {
			delay: secToMs( autoplayDelay, 3000 )
		} );
	}


	return JSON.stringify( options );
}
