/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
/*
 * Aktk Dependencies
 */
import BaseControl from '@aktk/block-components/wp-controls/base-control';
import LineHeightControl from '@aktk/block-components/wp-controls/line-height-control';

/**
 * Block Dependencies.
 */
import type { DtBlockProps } from '../../types';

export function LineHeight( props: DtBlockProps ): JSX.Element {
	const { attributes, setAttributes } = props;
	const { lineHeight } = attributes;
	const handleOnChange = ( newlineHeight: string ) => {
		setAttributes( { lineHeight: newlineHeight } );
	};
	return (
		<BaseControl>
			<LineHeightControl
				value={ lineHeight || '' }
				onChange={ handleOnChange }
			/>
		</BaseControl>
	);
}
