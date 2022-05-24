export function getParentPages( pages, parent, level ) {
	let result = [];
	if ( ! pages ) {
		return result;
	}
	const parents = pages.filter( ( page ) => {
		return parent === page.parent;
	} );

	for ( const page of parents ) {
		const label = '　'.repeat( level ) + page.title.rendered;
		const child = pages.filter( ( filterPage ) => {
			return page.id === filterPage.parent;
		} );
		if ( 0 < child.length ) {
			result.push( { value: page.id, label } );
			result = result.concat(
				getParentPages( pages, page.id, level + 1 )
			);
		}
	}

	return result;
}
