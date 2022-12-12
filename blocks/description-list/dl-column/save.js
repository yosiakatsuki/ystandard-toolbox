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
import { getResponsiveWidthStyle } from '@aktk/components/responsive-values';
import { getBorderCustomProperty } from '@aktk/controls/border-control';
import { isResponsive } from '@aktk/helper/responsive';
import { ystdtbConfig } from '@aktk/config';
import { getResponsiveMarginStyle } from '@aktk/components/responsive-spacing';

export default function save( { attributes } ) {
	const { isStackedOnMobile, isStackedOnTablet, dtWidth, border, margin } =
		attributes;
	const hasClasses = ystdtbConfig.hasClasses;
	const borderProperty = getBorderCustomProperty( border, 'dl-column' );
	const dtWidthStyles = isResponsive( dtWidth )
		? dtWidth
		: {
				desktop: dtWidth?.desktop,
				tablet: dtWidth?.desktop,
				mobile: dtWidth?.desktop,
		  };
	const blockProps = useBlockProps.save( {
		className: classnames( config.blockClasses, {
			'is-not-stacked-on-mobile': ! ( isStackedOnMobile ?? true ),
			'is-not-stacked-on-tablet': ! isStackedOnTablet,
			'has-border': !! borderProperty,
			[ hasClasses.margin ]: getResponsiveMarginStyle( margin ),
		} ),
		style: {
			...getResponsiveWidthStyle(
				dtWidthStyles,
				config.responsiveStyleClassPrefix
			),
			...getResponsiveMarginStyle( margin ),
			...borderProperty,
		},
	} );

	return (
		<div { ...blockProps }>
			<InnerBlocks.Content />
		</div>
	);
}
