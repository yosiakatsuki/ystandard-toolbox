/**
 * WordPress.
 */
import { __ } from '@wordpress/i18n';
import { BaseControl } from '@wordpress/components';
import TaxonomySelect from '@ystd/components/taxonomy-select';

const Taxonomy = ( { attributes, setAttributes } ) => {
	const { taxonomy, postType } = attributes;
	const handleOnChange = ( newValue ) => {
		setAttributes( {
			taxonomy: newValue,
			termSlug: undefined,
			postIn: undefined,
			postNameIn: undefined,
			postParent: undefined,
		} );
	};
	return (
		<BaseControl __nextHasNoMarginBottom>
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
