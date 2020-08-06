export default function _getParentPages( posts, parent, level ) {
	let result = [];
	if ( null === posts || undefined === posts || ! posts ) {
		return result;
	}
	const parents = posts.filter( ( post ) => {
		return parent === post.parent;
	} );

	for ( let post of parents ) {
		const label = '　'.repeat( level ) + post.title.rendered;
		const child = posts.filter( ( filterPost ) => {
			return post.id === filterPost.parent;
		} );
		if ( 0 < child.length ) {
			result.push( { value: post.id, label: label } );
			result = result.concat( _getParentPages( posts, post.id, level + 1 ) );
		}
	}

	return result;
}
