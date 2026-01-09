/**
 * WordPress
 */
import { __ } from '@wordpress/i18n';
import { useInnerBlocksProps, useBlockProps } from '@wordpress/block-editor';
/**
 * Aktk Dependencies.
 */
import { SvgIcon } from '@aktk/block-components/components/svg-icon';
/**
 * Block dependencies.
 */
import { InspectorControls } from './inspector-controls';
import type { TimeLineItemProps } from './types';
import './style-editor.scss';
import {
	getLabelClasses,
	getLabelContentClasses,
	getLabelStyles,
	getTimelineContentClasses,
	getTimelineContentStyles,
	getTimelineItemClasses,
	getTimelineItemStyles,
} from '@aktk/blocks/block-library/timeline-item/utils';

const TEMPLATE = [
	[
		'core/paragraph',
		{ placeholder: __( 'タイムラインコンテンツ…', 'ystandard-toolbox' ) },
	],
];

export default function Edit( props: TimeLineItemProps ) {
	const { attributes } = props;

	const { labelType, labelContents } = attributes;

	const _labelType = labelType || '';

	const blockProps = useBlockProps( {
		className: getTimelineItemClasses( attributes ),
		style: getTimelineItemStyles( attributes ),
	} );

	const labelClasses = getLabelClasses( attributes );
	const labelStyles = getLabelStyles( attributes );

	const labelContentsClasses = getLabelContentClasses( attributes );

	const contentsClass = getTimelineContentClasses( attributes );
	const contentsStyle = getTimelineContentStyles( attributes );

	// InnerBlocks Props.
	const innerBlocksProps = useInnerBlocksProps(
		{
			className: contentsClass,
			style: contentsStyle,
		},
		{
			// @ts-ignore
			template: TEMPLATE,
		}
	);

	return (
		<>
			<InspectorControls { ...props } />
			<div { ...blockProps }>
				<div className={ labelClasses } style={ labelStyles }>
					<span className={ labelContentsClasses }>
						{ 'text' === _labelType && <>{ labelContents }</> }
						{ 'icon' === _labelType && (
							<SvgIcon name={ labelContents } />
						) }
					</span>
				</div>
				<div { ...innerBlocksProps } />
			</div>
		</>
	);
}
