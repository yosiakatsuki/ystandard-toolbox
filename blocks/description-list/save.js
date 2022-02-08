import {
	InnerBlocks,
	useBlockProps,
} from '@wordpress/block-editor';
import classnames from 'classnames';
import { getDLMarginStyle } from "./function/style";
import { config } from "./config";

export default function save( { attributes } ) {
	const { margin } = attributes;
	const blockProps = useBlockProps.save( {
		className: classnames(
			config.blockClasses,
			{
				'has-margin': !! getDLMarginStyle( margin )
			}
		),
		style: {
			...getDLMarginStyle( margin )
		}
	} );

	return (
		<dl { ...blockProps }>
			<InnerBlocks.Content/>
		</dl>
	);
}
