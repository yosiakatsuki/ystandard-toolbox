import hexRgb from "hex-rgb";

export default function _replaceStyles( styles ) {
	const result = {};
	for ( const key of Object.keys( styles ) ) {
		let value = styles[ key ];
		const replace = ( value + '' ).match( /#\{.+?\}/g );
		if ( replace ) {
			for ( const replaceItem of replace ) {
				let property = replaceItem.replace( '#{', '' ).replace( '}', '' );
				let convert = '';
				if ( 1 < property.split( ',' ).length ) {
					convert = property.split( ',' )[ 1 ];
					property = property.split( ',' )[ 0 ];
				}
				if ( styles.hasOwnProperty( property ) ) {
					let newValue = styles[ property ];
					if ( 'rgb' === convert ) {
						const rgb = hexRgb( newValue );
						newValue = `${ rgb.red },${ rgb.green },${ rgb.blue }`;
					}
					value = value.replace( replaceItem, newValue );
				}
			}
		}
		result[ key ] = value;
	}
	return result;
}
