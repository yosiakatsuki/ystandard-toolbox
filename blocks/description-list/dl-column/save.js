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

export default function save( { attributes } ) {
	const {
		isStackedOnMobile,
		isStackedOnTablet,
		dtWidth,
		border,
	} = attributes;

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
		} ),
		style: {
			...getResponsiveWidthStyle(
				config.responsiveStyleClassPrefix,
				dtWidthStyles
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
