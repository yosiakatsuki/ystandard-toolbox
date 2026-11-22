/**
 * WordPress dependencies.
 */
import { useInnerBlocksProps, useBlockProps } from '@wordpress/block-editor';

/**
 * Block dependencies.
 */
import {
	getSliderItemBlockClasses,
	getSliderItemDimensions,
	getSliderItemOverflow,
} from './utils';
import { InspectorControls } from './inspector-controls';
import type { SliderItemEditProps } from './types';

/**
 * 子の外枠に寸法とはみ出しの扱いを適用して編集する。
 * @param props スライダーアイテムの編集プロパティ。
 */
export default function Edit( props: SliderItemEditProps ) {
	const blockProps = useBlockProps( {
		className: getSliderItemBlockClasses(),
		style: {
			...getSliderItemDimensions( props.attributes ),
			...getSliderItemOverflow( props.attributes ),
		},
	} );

	const innerBlocksProps = useInnerBlocksProps( blockProps, {} );

	return (
		<>
			<InspectorControls { ...props } />
			<div { ...innerBlocksProps } />
		</>
	);
}
