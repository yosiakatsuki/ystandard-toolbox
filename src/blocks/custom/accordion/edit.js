import classnames from 'classnames';
/**
 * WordPress
 */
import {
	InnerBlocks,
	useBlockProps,
	useInnerBlocksProps,
	RichText,
	store as blockEditorStore,
} from '@wordpress/block-editor';
import { useSelect } from '@wordpress/data';
import { __ } from '@wordpress/i18n';
/**
 * Plugin.
 */
import SVGIcon from '@aktk/components/svg-icon';
/**
 * Block.
 */
import { blockClass } from './save';
import './editor.scss';

const Edit = ( props ) => {
	const { attributes, setAttributes, clientId } = props;
	const { isDefaultOpen, summaryText } = attributes;
	const icon = 'chevron-down';

	const { hasInnerBlocks } = useSelect(
		( select ) => {
			const { getBlock } = select( blockEditorStore );
			const block = getBlock( clientId );
			return {
				hasInnerBlocks: !! ( block && block.innerBlocks.length ),
			};
		},
		[ clientId ]
	);

	const blockProps = useBlockProps( {
		className: classnames( blockClass, 'ystdtb-accordion-editor', {} ),
		open: isDefaultOpen,
	} );

	const innerBlockProps = useInnerBlocksProps(
		{
			className: classnames( 'ystdtb-accordion-content' ),
		},
		{
			renderAppender: hasInnerBlocks
				? undefined
				: InnerBlocks.ButtonBlockAppender,
			template: [ [ 'core/paragraph', {} ] ],
		}
	);

	const handleOnSummaryTextChange = ( newValue ) => {
		setAttributes( {
			summaryText: newValue,
		} );
	};

	return (
		<div { ...blockProps }>
			<div className="ystdtb-accordion__summary">
				<RichText
					tagName={ 'span' }
					className={ 'ystdtb-accordion__summary-text' }
					value={ summaryText }
					onChange={ handleOnSummaryTextChange }
					identifier="summaryText"
					placeholder={ __( '見出しテキスト', 'ystandard-toolbox' ) }
					withoutInteractiveFormatting
				/>
				<SVGIcon
					name={ icon }
					className={ 'ystdtb-accordion__summary-icon' }
				/>
			</div>
			<div { ...innerBlockProps } />
		</div>
	);
};

export default Edit;
