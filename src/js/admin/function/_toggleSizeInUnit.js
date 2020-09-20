export default function _toggleSizeInUnit( size, unit ) {
	if ( 'px' === unit ) {
		return parseInt( size * 16 );
	}
	return Math.round( ( size / 16 ) * 10 ) / 10;
}
