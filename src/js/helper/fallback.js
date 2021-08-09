export default function getDataFallbackProperty( props ) {
	for ( const key in props ) {
		if ( undefined === props[ key ] || null === props[ key ] ) {
			delete props[ key ];
		}
	}

	return ! Object.keys( props ).length
		? undefined
		: { 'data-ys-ie-styles': `${ JSON.stringify( props ) }` };
}
