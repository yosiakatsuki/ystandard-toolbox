/**
 * WordPress dependencies.
 */
import { RichText, useBlockProps } from '@wordpress/block-editor';
/**
 * Block Dependencies.
 */
import type { DdSimpleBlockProps } from './types';
import { getDdSimpleBlockClasses, getDdSimpleBlockStyles } from './utils';

export default function Save( props: DdSimpleBlockProps ): JSX.Element {
	const { attributes } = props;
	const { text } = attributes;
	// ブロックProps.
	const blockProps = useBlockProps.save( {
		className: getDdSimpleBlockClasses( attributes ),
		style: getDdSimpleBlockStyles( attributes ),
	} );
	return (
		<dd { ...blockProps }>
			<RichText.Content value={ text || '' } />
		</dd>
	);
}
