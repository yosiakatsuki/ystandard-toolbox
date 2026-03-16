/*
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';

/*
 * Aktk Dependencies
 */
import BaseControl from '@aktk/block-components/wp-controls/base-control';
import { TermSelect } from '@aktk/block-components/components/term-select';

/**
 * Block dependencies.
 */
import type { PostsEditProps } from '../../types';

export function Term( props: PostsEditProps ) {
	const { attributes, setAttributes } = props;
	const { taxonomy, termSlug } = attributes;

	const handleOnChange = ( value: string ) => {
		setAttributes( {
			termSlug: value,
			postIn: undefined,
			postNameIn: undefined,
			postParent: undefined,
		} );
	};

	return (
		<BaseControl
			id={ 'term' }
			label={ __( 'カテゴリー・タグ', 'ystandard-toolbox' ) }
		>
			<TermSelect
				value={ termSlug ?? '' }
				taxonomy={ taxonomy }
				onChange={ handleOnChange }
				noOptionsLabel={ __(
					'分類を先に選択してください',
					'ystandard-toolbox'
				) }
			/>
		</BaseControl>
	);
}
