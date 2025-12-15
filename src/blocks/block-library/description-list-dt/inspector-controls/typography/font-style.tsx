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
	const handleOnChange = ( newFontStyle: string ) => {
		setAttributes( { fontStyle: newFontStyle } );
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
