import classnames from 'classnames';
/**
 * WordPress dependencies.
 */
import { useInnerBlocksProps, useBlockProps } from '@wordpress/block-editor';
import { useEffect } from '@wordpress/element';
/**
 * Block dependencies.
 */
import { InspectorControls } from './inspector-controls';
import { BlockControls } from './block-controls';
import {
	getSliderBlockClasses,
	getSliderContainerClasses,
	getSliderWrapClasses,
} from './utils';
import type { SliderEditProps } from './types';
import './style-editor.scss';

const ALLOWED_BLOCKS = [
	'core/image',
	'core/cover',
	'core/video',
	'ystdtb/slider-item',
];

export default function Edit( props: SliderEditProps ): JSX.Element {
	const { attributes, setAttributes, clientId } = props;
	const { previewType, sliderId } = attributes;

	// sliderIdを設定
	useEffect( () => {
		if ( ! sliderId ) {
			const splitId = clientId.split( '-' );
			setAttributes( {
				sliderId: splitId.length ? splitId[ 0 ] : clientId,
			} );
		}
	}, [] );

	// 編集ブロック
	const blockProps = useBlockProps( {
		className: classnames(
			'ystdtb-slider-edit',
			`is-preview--${ previewType || 'grid' }`
		),
	} );

	const sliderBlockProps = {
		className: getSliderBlockClasses( attributes ),
	};
	const sliderWrapProps = {
		className: getSliderWrapClasses( attributes ),
	};

	const innerBlocksProps = useInnerBlocksProps(
		{
			className: getSliderContainerClasses( attributes ),
		},
		{
			allowedBlocks: ALLOWED_BLOCKS,
			template: [ [ 'core/image' ] ],
			orientation: 'horizontal',
		}
	);

	return (
		<>
			<BlockControls { ...props } />
			<InspectorControls { ...props } />
			<div { ...blockProps }>
				<div { ...sliderBlockProps }>
					<div { ...sliderWrapProps }>
						<div { ...innerBlocksProps } />
					</div>
				</div>
			</div>
		</>
	);
}
