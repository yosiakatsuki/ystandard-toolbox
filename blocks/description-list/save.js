import classnames from 'classnames';
/**
 * WordPress
 */
import {
	InnerBlocks,
	useBlockProps,
} from '@wordpress/block-editor';
/**
 * yStandard
 */
import { getResponsiveMarginStyle } from "@ystdtb/components/responsive-spacing";
/**
 * Block
 */
import { config } from "./config";

export default function save( { attributes } ) {
	const { margin } = attributes;
	const blockProps = useBlockProps.save( {
		className: classnames(
			config.blockClasses,
			{
				'has-margin': !! getResponsiveMarginStyle( 'dl', margin )
			}
		),
		style: {
			...getResponsiveMarginStyle( 'dl', margin )
		}
	} );

	return (
		<dl { ...blockProps }>
			<InnerBlocks.Content/>
		</dl>
	);
}
