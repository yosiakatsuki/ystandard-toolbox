import classnames from 'classnames';
import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';
import { blockClasses } from './config';

const save = () => {
	const blockProps = useBlockProps.save( {
		className: classnames( blockClasses.blockClass ),
	} );

	return (
		<div { ...blockProps }>
			<InnerBlocks.Content />
		</div>
	);
};

export default save;
