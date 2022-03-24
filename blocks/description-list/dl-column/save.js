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
import { getBorderCustomProperty } from "@ystdtb/controls/border-control";

export default function save( { attributes } ) {
	const {
		isStackedOnMobile,
		isStackedOnTablet,
		dtWidth,
		border,
	} = attributes

	const borderProperty = getBorderCustomProperty( border, 'dl-column' );

	const blockProps = useBlockProps.save( {
		className: classnames(
			config.blockClasses,
			{
				'is-not-stacked-on-mobile': ! ( isStackedOnMobile ?? true ),
				'is-not-stacked-on-tablet': ! isStackedOnTablet,
				'has-border': !! borderProperty
			}
		),
		style: {
			...getResponsiveWidthStyle( config.responsiveStyleClassPrefix, dtWidth ),
			...borderProperty
		}
	} );

	return (
		<div { ...blockProps }>
			<InnerBlocks.Content/>
		</div>
	);
}
