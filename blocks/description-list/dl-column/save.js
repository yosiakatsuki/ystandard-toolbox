import classnames from 'classnames';
/**
 * WordPress
 */
import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';
/**
 * yStandard
 */
/**
 * Block
 */
import { config } from './config';
import { getResponsiveWidthStyle } from '@ystdtb/components/responsive-values';
import { getBorderCustomProperty } from '@ystdtb/controls/border-control';
import { isResponsive } from "@ystdtb/helper/responsive";
import { ystdtbConfig } from "@ystdtb/config";
import { getResponsiveMarginStyle } from "@ystdtb/components/responsive-spacing";

export default function save( { attributes } ) {
	const {
		isStackedOnMobile,
		isStackedOnTablet,
		dtWidth,
		border,
		margin,
	} = attributes;
	const hasClasses = ystdtbConfig.hasClasses;
	const borderProperty = getBorderCustomProperty( border, 'dl-column' );
	const dtWidthStyles = isResponsive( dtWidth ) ? dtWidth : {
		desktop: dtWidth?.desktop,
		tablet: dtWidth?.desktop,
		mobile: dtWidth?.desktop,
	}
	const blockProps = useBlockProps.save( {
		className: classnames( config.blockClasses, {
			'is-not-stacked-on-mobile': ! ( isStackedOnMobile ?? true ),
			'is-not-stacked-on-tablet': ! isStackedOnTablet,
			'has-border': !! borderProperty,
			[ hasClasses.margin ]: getResponsiveMarginStyle(
				config.responsiveStyleClassPrefix,
				margin
			),
		} ),
		style: {
			...getResponsiveWidthStyle(
				config.responsiveStyleClassPrefix,
				dtWidthStyles
			),
			...getResponsiveMarginStyle(
				config.responsiveStyleClassPrefix,
				margin
			),
			...borderProperty,
		},
	} );

	return (
		<div { ...blockProps }>
			<InnerBlocks.Content />
		</div>
	);
}
