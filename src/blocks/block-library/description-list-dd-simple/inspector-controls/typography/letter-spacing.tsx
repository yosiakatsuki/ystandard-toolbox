/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
/*
 * Aktk Dependencies
 */
import BaseControl from '@aktk/block-components/wp-controls/base-control';
import { LetterSpacingControl } from '@aktk/block-components/components/letter-spacing-control';

/**
 * Block Dependencies.
 */
import type { DtBlockProps } from '../../types';

export function LetterSpacing( props: DtBlockProps ): JSX.Element {
	const { attributes, setAttributes } = props;
	const { letterSpacing } = attributes;
	const handleOnChange = ( newLetterSpacing: string ) => {
		setAttributes( { letterSpacing: newLetterSpacing } );
	};
	return (
		<BaseControl>
			<LetterSpacingControl
				value={ letterSpacing || '' }
				onChange={ handleOnChange }
			/>
		</BaseControl>
	);
}
