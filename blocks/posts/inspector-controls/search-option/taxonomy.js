/**
 * WordPress.
 */
import { __ } from '@wordpress/i18n';
import { BaseControl } from '@wordpress/components';
import TaxonomySelect from '@aktk/components/taxonomy-select';

const Taxonomy = ( { attributes, setAttributes } ) => {
	const { taxonomy, postType } = attributes;
	const handleOnChange = ( newValue ) => {
		setAttributes( {
			taxonomy: newValue,
			postIn: undefined,
			postNameIn: undefined,
			postParent: undefined,
		} );
	};
	return (
		<BaseControl>
			<TaxonomySelect
				label={ __( '分類', 'ystandard-toolbox' ) }
				value={ taxonomy }
				postType={ postType }
				onChange={ handleOnChange }
			/>
		</BaseControl>
	);
};
export default Taxonomy;
