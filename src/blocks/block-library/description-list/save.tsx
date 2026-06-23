/**
 * WordPress
 */
import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';
/**
 * Block dependencies.
 */
import type { DlBlockAttributes } from './types';
import { getDlClassNames, getDlStyles } from './utils';

type DlSaveProps = {
	attributes: DlBlockAttributes;
};

export default function Save( { attributes }: DlSaveProps ): JSX.Element {
	const blockProps = useBlockProps.save( {
		className: getDlClassNames( attributes ),
		style: getDlStyles( attributes ),
	} );
	return (
		<dl { ...blockProps }>
			<InnerBlocks.Content />
		</dl>
	);
}
