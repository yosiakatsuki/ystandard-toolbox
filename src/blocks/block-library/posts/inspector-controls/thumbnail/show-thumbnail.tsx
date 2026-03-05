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

export function ShowThumbnail( props: PostsEditProps ) {
	const { attributes, setAttributes } = props;
	const { showImg } = attributes;

	return (
		<BaseControl>
			<ToggleControl
				label={ __( '画像を表示する', 'ystandard-toolbox' ) }
				checked={ showImg }
				onChange={ ( value ) => setAttributes( { showImg: value } ) }
			/>
		</BaseControl>
	);
}
