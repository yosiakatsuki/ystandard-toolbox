/*
 * WordPress Dependencies
 */
import { useSelect } from '@wordpress/data';
import { store as coreStore } from '@wordpress/core-data';

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

	// タクソノミー名を取得
	const taxonomyName = useSelect(
		( select ) => {
			if ( ! taxonomy ) {
				return '';
			}
			// @ts-ignore -- getTaxonomy の型定義が不完全なため
			const taxonomyInfo = select( coreStore ).getTaxonomy( taxonomy );
			return taxonomyInfo?.name ?? '';
		},
		[ taxonomy ]
	);

	if ( ! taxonomy ) {
		return null;
	}

	const handleOnChange = ( value: string ) => {
		setAttributes( {
			termSlug: value,
			postIn: undefined,
			postNameIn: undefined,
			postParent: undefined,
		} );
	};

	return (
		<BaseControl id={ 'term' } label={ taxonomyName }>
			<TermSelect
				value={ termSlug ?? '' }
				taxonomy={ taxonomy }
				onChange={ handleOnChange }
			/>
		</BaseControl>
	);
}
