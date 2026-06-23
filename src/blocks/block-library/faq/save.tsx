/*
 * WordPress Dependencies
 */
import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';

/*
 * Plugin Dependencies
 */
import type { FaqBlockAttributes } from './types';
import {
	getFaqClassNames,
	getFaqStyle,
} from '@aktk/blocks/block-library/faq/utils';

type FaqSaveProps = {
	attributes: FaqBlockAttributes;
};

/**
 * FAQブロック保存コンポーネント
 * @param root0
 * @param root0.attributes
 */
export default function FaqSave( { attributes }: FaqSaveProps ): JSX.Element {
	const blockProps = useBlockProps.save( {
		className: getFaqClassNames( attributes ),
		style: getFaqStyle( attributes ),
	} );

	return (
		<div { ...blockProps }>
			<InnerBlocks.Content />
		</div>
	);
}
