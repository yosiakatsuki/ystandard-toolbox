/*
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
/*
 * Aktk Dependencies
 */
import BaseControl from '@aktk/block-components/wp-controls/base-control';
import ToggleControl from '@aktk/block-components/wp-controls/toggle-control';
/**
 * Block dependencies.
 */
import type { PostsEditProps } from '../../types';

export function Category( props: PostsEditProps ) {
	const { attributes, setAttributes } = props;
	const { showCategory } = attributes;

	return (
		<BaseControl>
			<ToggleControl
				label={ __( 'カテゴリーを表示する', 'ystandard-toolbox' ) }
				checked={ showCategory }
				onChange={ ( value ) =>
					setAttributes( { showCategory: value } )
				}
			/>
		</BaseControl>
	);
}
