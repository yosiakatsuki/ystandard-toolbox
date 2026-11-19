/**
 * WordPress dependencies.
 */
import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';

/**
 * Block dependencies.
 */
import { getSliderItemBlockClasses, getSliderItemDimensions } from './utils';
import type { SliderItemSaveProps } from './types';

/**
 * 子の外枠に寸法を適用して保存する。
 * @param props スライダーアイテムの保存プロパティ。
 */
export default function Save( props: SliderItemSaveProps ) {
	const blockProps = useBlockProps.save( {
		className: getSliderItemBlockClasses(),
		style: getSliderItemDimensions( props.attributes ),
	} );

	return (
		<>
			<div { ...blockProps }>
				<InnerBlocks.Content />
			</div>
		</>
	);
}
