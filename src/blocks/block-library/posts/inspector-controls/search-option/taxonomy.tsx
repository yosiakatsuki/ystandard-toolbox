/*
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';

/*
 * Aktk Dependencies
 */
import BaseControl from '@aktk/block-components/wp-controls/base-control';
import { TaxonomySelect } from '@aktk/block-components/components/taxonomy-select';

/**
 * Block dependencies.
 */
import type { PostsEditProps } from '../../types';

export function Taxonomy( props: PostsEditProps ) {
	const { attributes, setAttributes } = props;
	const { taxonomy, postType } = attributes;

	const handleOnChange = ( value: string ) => {
		setAttributes( {
			taxonomy: value,
			termSlug: undefined,
			postIn: undefined,
			postNameIn: undefined,
			postParent: undefined,
		} );
	};

	return (
		<BaseControl
			id={ 'taxonomy' }
			label={ __( '分類', 'ystandard-toolbox' ) }
		>
			<TaxonomySelect
				value={ taxonomy ?? '' }
				postType={ postType }
				onChange={ handleOnChange }
				noOptionsLabel={ __(
					'選択できる分類がありません',
					'ystandard-toolbox'
				) }
			/>
		</BaseControl>
	);
}
