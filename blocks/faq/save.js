import { InnerBlocks } from '@wordpress/block-editor';
import classnames from 'classnames';

export default function({ attributes }) {
	const { className } = attributes;

	const classes = classnames('ystdtb-faq', className, {});

	return (
		<div className={classes}>
			<InnerBlocks.Content />
		</div>
	);
}
