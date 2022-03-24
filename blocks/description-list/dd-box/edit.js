import classnames from 'classnames';
/**
 * WordPress
 */
import {
	InnerBlocks,
	withColors,
	useBlockProps,
	__experimentalUseGradient,
} from '@wordpress/block-editor';
import { compose } from '@wordpress/compose';
/**
 * yStandard
 */
import { getResponsivePaddingStyle } from '@ystdtb/components/responsive-spacing';
import { getBackGroundStyle } from '@ystdtb/helper/color';
import { ystdtbConfig } from '@ystdtb/config';
/**
 * Block
 */
import { DescriptionListDdBoxInspectorControls as InspectorControls } from './inspector-controls';
import { config } from './config';

const Edit = ( props ) => {
	const { attributes, backgroundColor, textColor } = props;

	const { padding } = attributes;

	const hasClasses = ystdtbConfig.hasClasses;
	const { gradientClass, gradientValue } = __experimentalUseGradient();

	const blockProps = useBlockProps( {
		className: classnames( config.blockClasses, 'ystdtb-dd-box-editor', {
			[ hasClasses.background ]: backgroundColor.color || gradientValue,
			[ backgroundColor.class ]: backgroundColor.class,
			[ hasClasses.textColor ]: textColor.color,
			[ textColor.class ]: textColor.class,
			[ hasClasses.backgroundGradient ]: gradientValue,
			[ gradientClass ]: gradientClass,
			[ hasClasses.padding ]: getResponsivePaddingStyle(
				config.responsiveStyleClassPrefix,
				padding
			),
		} ),
		style: {
			background: getBackGroundStyle( backgroundColor, gradientValue ),
			...getResponsivePaddingStyle(
				config.responsiveStyleClassPrefix,
				padding
			),
		},
	} );
	return (
		<>
			<InspectorControls { ...props } />
			<dd { ...blockProps }>
				<InnerBlocks template={ [ [ 'core/paragraph' ] ] } />
			</dd>
		</>
	);
};

export default compose( [
	withColors( {
		backgroundColor: 'background-color',
		textColor: 'color',
	} ),
] )( Edit );
