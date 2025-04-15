/**
 * WordPress.
 */
import { SelectControl } from '@wordpress/components';
import { useSelect } from '@wordpress/data';
import { getTermTree } from '@ystd/helper/terms';
import { addDefaultSelect } from '@ystd/helper/select-control';

const TermSelect = ( { label, value, taxonomy, onChange } ) => {
	const { terms } = useSelect( ( select ) => {
		if ( ! taxonomy ) {
			return { terms: undefined };
		}
		const { getEntityRecords, getTaxonomy } = select( 'core' );
		const selectedTaxonomy = getTaxonomy( taxonomy );
		const _terms =
			getEntityRecords( 'taxonomy', taxonomy, {
				per_page: -1,
			} ) || [];
		let tree;
		if ( selectedTaxonomy?.hierarchical ) {
			tree = getTermTree( _terms, 0, 0 );
		} else {
			tree = _terms.map( ( item ) => {
				return {
					value: item.slug,
					label: item.name,
				};
			} );
		}

		return { terms: tree };
	} );
	const options = addDefaultSelect( terms );
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
export default TermSelect;
