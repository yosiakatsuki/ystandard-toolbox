/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
/*
 * Aktk Dependencies
 */
import BaseControl from '@aktk/block-components/wp-controls/base-control';
import { FontStyleControl } from '@aktk/block-components/wp-controls/font-appearance-control';

/**
 * Block Dependencies.
 */
import type { DtBlockProps } from '../../types';

export function FontStyle( props: DtBlockProps ): JSX.Element {
	const { attributes, setAttributes } = props;
	const { fontStyle } = attributes;
	const handleOnChange = ( newFontWeight: string ) => {
		setAttributes( { fontStyle: newFontWeight } );
	};
	return (
		<BaseControl>
			<FontStyleControl
				value={ fontStyle || '' }
				onChange={ handleOnChange }
			/>
		</BaseControl>
	);
}
