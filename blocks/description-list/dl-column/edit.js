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
import { DescriptionListColumnInspectorControls as InspectorControls } from './inspector-controls';
import { getResponsiveWidthStyle } from '@ystd/components/responsive-values';
import { getBorderCustomProperty } from '@ystd/controls/border-control';
import { isResponsive } from '@ystd/helper/responsive';
import { getResponsiveMarginStyle } from '@ystd/components/responsive-spacing';
import { ystdtbConfig } from '@ystd/config';

const Edit = ( props ) => {
	const { attributes } = props;
	const hasClasses = ystdtbConfig.hasClasses;
	const {
		isStackedOnMobile,
		isStackedOnTablet,
		dtWidth,
		border,
		margin,
	} = attributes;

	const borderProperty = getBorderCustomProperty( border, 'dl-column' );

	const dtWidthStyles = isResponsive( dtWidth )
		? dtWidth
		: {
				desktop: dtWidth?.desktop,
				tablet: dtWidth?.desktop,
				mobile: dtWidth?.desktop,
		  };

	const blockProps = useBlockProps( {
		className: classnames( config.blockClasses, 'ystdtb-dl-column-editor', {
			'is-not-stacked-on-mobile': ! ( isStackedOnMobile ?? true ),
			'is-not-stacked-on-tablet': ! isStackedOnTablet,
			'has-border': !! borderProperty,
			[ hasClasses.margin ]: getResponsiveMarginStyle( margin ),
		} ),
		style: {
			...getResponsiveWidthStyle(
				config.responsiveStyleClassPrefix,
				dtWidthStyles
			),
			...getResponsiveMarginStyle( margin ),
			...borderProperty,
		},
	} );

	return (
		<>
			<InspectorControls { ...props } />
			<div { ...blockProps }>
				<InnerBlocks
					allowedBlocks={ config.allowedBlocks }
					template={ [
						[ 'ystdtb/description-list-dt' ],
						[ 'ystdtb/description-list-dd-box' ],
					] }
					templateLock={ true }
				/>
			</div>
		</>
	);
};

export default Edit;
