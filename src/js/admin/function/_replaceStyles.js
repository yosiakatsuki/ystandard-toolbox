export default function _replaceStyles( styles ) {
	let result = {};
	for ( let key of Object.keys( styles ) ) {
		let value = styles[ key ];
		const replace = ( value + '' ).match( /#\{.+?\}/g );
		if ( replace ) {
			const property = replace[ 0 ].replace( '#{', '' ).replace( '}', '' );
			if ( styles.hasOwnProperty( property ) ) {
				value = value.replace( replace, styles[ property ] );
			}
		}
		result[ key ] = value;
	}

	return result;
}