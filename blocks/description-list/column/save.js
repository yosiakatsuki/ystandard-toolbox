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
/**
 * Block
 */
import { config } from "./config";
import { getResponsiveWidthStyle } from "@ystdtb/components/responsive-values";

export default function save( { attributes } ) {
	const {
		isStackedOnMobile,
		isStackedOnTablet,
		dtWidth,
		border,
	} = attributes
	const blockProps = useBlockProps.save( {
		className: classnames(
			config.blockClasses,
			{
				'is-not-stacked-on-mobile': ! ( isStackedOnMobile ?? true ),
				'is-not-stacked-on-tablet': ! isStackedOnTablet,
			}
		),
		style: {
			...getResponsiveWidthStyle( config.responsiveStyleClassPrefix, dtWidth )
		}
	} );

	return (
		<dl { ...blockProps }>
			<InnerBlocks.Content/>
		</dl>
	);
}
