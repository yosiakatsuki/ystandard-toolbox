/**
 * WordPress dependencies
 */
import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';
/**
 * Aktk Dependencies.
 */
import { SvgIcon } from '@aktk/block-components/components/svg-icon';
/**
 * Block dependencies.
 */
import type { TimeLineItemProps } from './types';
import {
	getLabelClasses,
	getLabelContentClasses,
	getLabelStyles,
	getTimelineContentClasses,
	getTimelineContentStyles,
	getTimelineItemClasses,
	getTimelineItemStyles,
} from './utils';

export default function Save( props: TimeLineItemProps ) {
	const { attributes } = props;
	const { labelType, labelContents } = attributes;

	const _labelType = labelType || '';

	const blockProps = useBlockProps.save( {
		className: getTimelineItemClasses( attributes ),
		style: getTimelineItemStyles( attributes ),
	} );

	const labelClasses = getLabelClasses( attributes );
	const labelStyles = getLabelStyles( attributes );

	const labelContentsClasses = getLabelContentClasses( attributes );

	const contentsClass = getTimelineContentClasses( attributes );
	const contentsStyle = getTimelineContentStyles( attributes );

	return (
		<div { ...blockProps }>
			<div className={ labelClasses } style={ labelStyles }>
				<span className={ labelContentsClasses }>
					{ 'text' === _labelType && <>{ labelContents }</> }
					{ 'icon' === _labelType && (
						<SvgIcon.Content name={ labelContents } />
					) }
				</span>
			</div>
			<div className={ contentsClass } style={ contentsStyle }>
				<InnerBlocks.Content />
			</div>
		</div>
	);
}
