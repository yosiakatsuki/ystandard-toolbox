import classnames from 'classnames';
/**
 * WordPress
 */
import {
	useInnerBlocksProps,
	useBlockProps,
	RichText,
} from '@wordpress/block-editor';
/**
 * Plugin
 */
import SVGIcon from '@aktk/components/svg-icon';

/**
 * Block
 */
export const blockClass = 'ystdtb-accordion';

const Save = ( { attributes } ) => {
	const { isDefaultOpen, summaryText } = attributes;
	const icon = 'chevron-down';

	const blockProps = useBlockProps.save( {
		className: classnames( blockClass, {} ),
		open: isDefaultOpen,
	} );

	const innerBlockProps = useInnerBlocksProps.save( {
		className: classnames( 'ystdtb-accordion-content' ),
	} );

	const summaryTextProps = {
		value: summaryText,
		tagName: 'span',
		className: 'ystdtb-accordion__summary-text',
	};

	return (
		<details { ...blockProps }>
			<summary className="ystdtb-accordion__summary">
				<RichText.Content { ...summaryTextProps } />
				<SVGIcon
					name={ icon }
					className={ 'ystdtb-accordion__summary-icon' }
				/>
			</summary>
			<div { ...innerBlockProps } />
		</details>
	);
};

export default Save;
