/**
 * WordPress.
 */
import { SelectControl } from '@wordpress/components';
import { useSelect } from '@wordpress/data';
import { addDefaultSelect } from '@aktk/helper/select-control';

const TaxonomySelect = ( { label, value, postType, onChange } ) => {
	const { selectedPostType, taxonomy } = useSelect( ( select ) => {
		const { getTaxonomy, getPostType } = select( 'core' );
		const _taxonomy = getTaxonomy() || [];
		return {
			selectedPostType: getPostType( postType ),
			taxonomy: _taxonomy,
		};
	} );
	const taxonomies = selectedPostType?.taxonomies || [];
	const options = addDefaultSelect( [
		...taxonomies.map( ( item ) => {
			if ( taxonomy.hasOwnProperty( item ) ) {
				return {
					value: taxonomy[ item ].slug,
					label: taxonomy[ item ].name,
				};
			}
			return {};
		} ),
	] );
	const handleOnChange = ( newValue ) => {
		onChange( newValue );
	};
	return (
		<SelectControl
			label={ label }
			value={ value }
			options={ options }
			onChange={ handleOnChange }
			__next40pxDefaultSize
			__nextHasNoMarginBottom
		/>
	);
};
export default TaxonomySelect;
