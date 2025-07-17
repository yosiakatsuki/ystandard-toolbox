import { parseObject } from '@ystd/helper/object';

export const parseSize = ( size ) => {
	if ( ! size ) {
		return undefined;
	}
	if ( size.hasOwnProperty( 'maxWidth' ) && ! size?.maxWidth ) {
		delete size.maxWidth;
	}
	if ( size.hasOwnProperty( 'minHeight' ) && ! size?.minHeight ) {
		delete size.minHeight;
	}

	return parseObject( size );
};
