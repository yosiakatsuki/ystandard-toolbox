/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
/*
 * Aktk Dependencies
 */
import BaseControl from '@aktk/block-components/wp-controls/base-control';
import { FontWeightControl } from '@aktk/block-components/wp-controls/font-appearance-control';

/**
 * Block Dependencies.
 */
import type { DtBlockProps } from '../../types';

export function FontWeight( props: DtBlockProps ): JSX.Element {
	const { attributes, setAttributes } = props;
	const { fontWeight } = attributes;
	const handleOnChange = ( newFontWeight: string ) => {
		setAttributes( { fontWeight: newFontWeight } );
	};
	return (
		<BaseControl>
			<FontWeightControl
				value={ fontWeight || '' }
				onChange={ handleOnChange }
			/>
		</BaseControl>
	);
}
