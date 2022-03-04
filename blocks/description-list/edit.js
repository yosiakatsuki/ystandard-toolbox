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
import { config } from './config';
import { DescriptionListInspectorControls as InspectorControls } from './inspector-controls';

const edit = ( props ) => {
	const { attributes } = props;
	const { margin } = attributes
	const blockProps = useBlockProps( {
		className: classnames(
			'ystdtb-dl-editor',
			{
				'has-margin': !! getResponsiveMarginStyle( 'dl', margin )
			}
		)
	} );

	const dlProps = {
		className: classnames(
			config.blockClasses,
			{
				'has-margin': !! getResponsiveMarginStyle( 'dl', margin )
			}
		),
		style: {
			...getResponsiveMarginStyle( 'dl', margin )
		}
	}

	return (
		<>
			<InspectorControls { ...props } />
			<div { ...blockProps }>
				<dl { ...dlProps }>
					<InnerBlocks
						allowedBlocks={ config.allowedBlocks }
						template={ [
							[ 'ystdtb/description-list-dt' ],
							[ 'ystdtb/description-list-dd-simple' ]
						] }
					/>
				</dl>
			</div>
		</>
	);
}

export default edit;
