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

export function Date( props: PostsEditProps ) {
	const { attributes, setAttributes } = props;
	const { showDate } = attributes;

	return (
		<BaseControl>
			<ToggleControl
				label={ __( '日付を表示する', 'ystandard-toolbox' ) }
				checked={ showDate }
				onChange={ ( value ) => setAttributes( { showDate: value } ) }
			/>
		</BaseControl>
	);
}
