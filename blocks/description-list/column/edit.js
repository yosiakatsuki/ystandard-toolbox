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
import { config } from './config';
import { DescriptionListColumnInspectorControls as InspectorControls } from './inspector-controls';

const edit = ( props ) => {
	const { attributes } = props;
	const {
		isStackedOnMobile,
		isStackedOnTablet,
		dtWidth,
		border
	} = attributes
	const blockProps = useBlockProps( {
		className: classnames(
			config.blockClasses,
			'ystdtb-dl-column-editor',
			{
				'is-not-stacked-on-mobile': ! ( isStackedOnMobile ?? true ),
				'is-not-stacked-on-tablet': ! isStackedOnTablet,
			}
		)
	} );

	return (
		<>
			<InspectorControls { ...props } />
			<div { ...blockProps }>
				<InnerBlocks
					allowedBlocks={ config.allowedBlocks }
					template={ [
						[ 'ystdtb/description-list-dt' ],
						[ 'ystdtb/description-list-dd-box' ]
					] }
					templateLock={ true }
				/>
			</div>
		</>
	);
}

export default edit;
