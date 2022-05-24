export function filterSelectPostTypes( postTypes ) {
	return postTypes.filter( ( type ) => {
		return ! (
			! type.viewable ||
			'ys-parts' === type.slug ||
			'attachment' === type.slug
		);
	} );
}
