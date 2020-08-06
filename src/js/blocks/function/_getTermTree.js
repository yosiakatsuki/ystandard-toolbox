export default function _getTermTree( terms, parent, level ) {
	let result = [];
	if ( null === terms || undefined === terms || ! terms ) {
		return result;
	}
	const parents = terms.filter( ( term ) => {
		return parent === term.parent;
	} );

	for ( let term of parents ) {
		const label = '　'.repeat( level ) + term.name;
		result.push( { value: term.slug, label: label } );
		result = result.concat( _getTermTree( terms, term.id, level + 1 ) );
	}
	return result;
}
