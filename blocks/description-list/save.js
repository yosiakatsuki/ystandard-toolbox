import classnames from 'classnames';
/**
 * WordPress
 */
import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';
/**
 * yStandard
 */
import { getResponsiveMarginStyle } from '@aktk/components/responsive-spacing';
/**
 * Block
 */
import { config } from './config';

export default function save( { attributes } ) {
	const { margin } = attributes;
	const blockProps = useBlockProps.save( {
		className: classnames( config.blockClasses, {
			'has-margin': !! getResponsiveMarginStyle( margin ),
		} ),
		style: {
			...getResponsiveMarginStyle( margin ),
		},
	} );

	return (
		<dl { ...blockProps }>
			<InnerBlocks.Content />
		</dl>
	);
}
