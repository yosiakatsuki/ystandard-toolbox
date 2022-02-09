import classnames from 'classnames';
import {
	InnerBlocks,
	useBlockProps,
} from '@wordpress/block-editor';
import { config } from './config';
import { DescriptionListInspectorControls as InspectorControls } from './inspector-controls';
import { getDLMarginStyle } from "./function/style";


const edit = ( props ) => {
	const { attributes } = props;
	const { margin } = attributes
	const blockProps = useBlockProps( {
		className: classnames(
			'ystdtb-dl-editor',
			{
				'has-margin': !! getDLMarginStyle( margin )
			}
		)
	} );

	const dlProps = {
		className: classnames(
			config.blockClasses,
			{
				'has-margin': !! getDLMarginStyle( margin )
			}
		),
		style: {
			...getDLMarginStyle( margin )
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
							[ 'ystdtb/description-list-dt' ]
						] }
					/>
				</dl>
			</div>
		</>
	);
}

export default edit;
