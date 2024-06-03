import classnames from 'classnames';
/**
 * WordPress
 */
import { useInnerBlocksProps, useBlockProps } from '@wordpress/block-editor';

/**
 * Plugin.
 */
import { hasClasses } from '@aktk/config';
import {
	getResponsiveMarginStyle,
	getResponsivePaddingStyle,
	getResponsiveGapStyle,
} from '@aktk/components/responsive-spacing';
import {
	getResponsiveWidthStyle,
	getResponsiveHeightStyle,
} from '@aktk/components/responsive-values';
import { getResponsiveRatioStyle } from '@aktk/components/responsive-ratio';
import { getResponsiveLayoutStyle } from '@aktk/components/responsive-layout';

/**
 * Block
 */
export const blockClassName = 'ystdtb-layout-frame';

const Save = ( { attributes } ) => {
	const { layout, gap, width, height, ratio, padding, margin, zIndex } =
		attributes;
	const blockProps = useBlockProps.save( {
		className: classnames( blockClassName, {
			[ hasClasses.padding ]: getResponsivePaddingStyle( padding ),
			[ hasClasses.margin ]: getResponsiveMarginStyle( margin ),
		} ),
		style: {
			zIndex,
			...getResponsivePaddingStyle( padding ),
			...getResponsiveMarginStyle( margin ),
			...getResponsiveWidthStyle( width ),
			...getResponsiveHeightStyle( height ),
			...getResponsiveRatioStyle( ratio ),
			...getResponsiveGapStyle( gap ),
			...getResponsiveLayoutStyle( layout ),
		},
	} );
	return <div { ...useInnerBlocksProps.save( blockProps ) } />;
};
export default Save;
