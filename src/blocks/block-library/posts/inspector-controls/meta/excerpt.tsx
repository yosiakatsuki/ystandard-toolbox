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

export function Excerpt( props: PostsEditProps ) {
	const { attributes, setAttributes } = props;
	const { showExcerpt } = attributes;

	return (
		<BaseControl>
			<ToggleControl
				label={ __( '概要文を表示する', 'ystandard-toolbox' ) }
				checked={ showExcerpt }
				onChange={ ( value ) =>
					setAttributes( { showExcerpt: value } )
				}
			/>
		</BaseControl>
	);
}
