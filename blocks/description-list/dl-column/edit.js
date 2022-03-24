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
import { getResponsiveWidthStyle } from '@ystdtb/components/responsive-values';
import { getBorderCustomProperty } from '@ystdtb/controls/border-control';

const Edit = ( props ) => {
	const { attributes } = props;
	const {
		isStackedOnMobile,
		isStackedOnTablet,
		dtWidth,
		border,
	} = attributes;

	const borderProperty = getBorderCustomProperty( border, 'dl-column' );

	const blockProps = useBlockProps( {
		className: classnames( config.blockClasses, 'ystdtb-dl-column-editor', {
			'is-not-stacked-on-mobile': ! ( isStackedOnMobile ?? true ),
			'is-not-stacked-on-tablet': ! isStackedOnTablet,
			'has-border': !! borderProperty,
		} ),
		style: {
			...getResponsiveWidthStyle(
				config.responsiveStyleClassPrefix,
				dtWidth
			),
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
