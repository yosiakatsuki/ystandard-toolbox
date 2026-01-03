/**
 * WordPress dependencies.
 */
import { RichText, useBlockProps } from '@wordpress/block-editor';
/**
 * Block Dependencies.
 */
import type { DtBlockProps } from './types';
import { getDtBlockClasses, getDtBlockStyles } from './utils';

export default function Save( props: DtBlockProps ): JSX.Element {
	const { attributes } = props;
	const { text } = attributes;
	// ブロックProps.
	const blockProps = useBlockProps.save( {
		className: getDtBlockClasses( attributes ),
		style: getDtBlockStyles( attributes ),
	} );
	return (
		<dt { ...blockProps }>
			<RichText.Content value={ text || '' } />
		</dt>
	);
}
