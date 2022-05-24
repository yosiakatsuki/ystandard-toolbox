export function getTermTree( terms, parent, level ) {
	let result = [];
	if ( ! terms ) {
		return result;
	}
	const parents = terms.filter( ( term ) => {
		return parent === term.parent;
	} );

	for ( const term of parents ) {
		const label = '　'.repeat( level ) + term.name;
		result.push( { value: term.slug, label } );
		result = result.concat( getTermTree( terms, term.id, level + 1 ) );
	}
	return result;
}
