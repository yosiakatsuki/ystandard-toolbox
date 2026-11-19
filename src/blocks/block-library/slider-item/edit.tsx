/**
 * WordPress dependencies.
 */
import { useInnerBlocksProps, useBlockProps } from '@wordpress/block-editor';

/**
 * Block dependencies.
 */
import { getSliderItemBlockClasses, getSliderItemDimensions } from './utils';
import type { SliderItemEditProps } from './types';
import './style-editor.scss';

/**
 * 子の外枠に寸法を適用して編集する。
 * @param props スライダーアイテムの編集プロパティ。
 */
export default function Edit( props: SliderItemEditProps ) {
	const blockProps = useBlockProps( {
		className: getSliderItemBlockClasses(),
		style: getSliderItemDimensions( props.attributes ),
	} );

	const innerBlocksProps = useInnerBlocksProps( blockProps, {} );

	return (
		<>
			<div { ...innerBlocksProps } />
		</>
	);
}
