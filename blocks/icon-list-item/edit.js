import classnames from 'classnames';
import {
	RichText,
	InspectorControls,
	useBlockProps,
} from '@wordpress/block-editor';
import { PanelBody, BaseControl } from '@wordpress/components';
import { createBlock } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';
import { blockClassName } from './config';

function IconListItem( props ) {
	const { attributes, setAttributes, mergeBlocks, onReplace } = props;
	const { content } = attributes;
	const blockProps = useBlockProps( {
		className: classnames( blockClassName ),
	} );

	return (
		<>
			<InspectorControls>
				<PanelBody
					title={ __( 'リスト', 'ystandard-toolbox' ) }
					initialOpen={ true }
				>
					<BaseControl>
						<p>
							リストアイテムに設定はありません。アイコンリストブロック（親ブロック）から設定を変更してください。
						</p>
					</BaseControl>
				</PanelBody>
			</InspectorControls>
			<RichText
				className={ blockClassName }
				tagName="li"
				onChange={ ( nextContent ) =>
					setAttributes( { content: nextContent } )
				}
				value={ content }
				placeholder={ __( 'テキストを入力…', 'ystandard-toolbox' ) }
				onMerge={ mergeBlocks }
				onSplit={ ( value ) =>
					createBlock( 'ystdtb/icon-list-item', {
						...attributes,
						content: value,
					} )
				}
				onReplace={ onReplace }
				onRemove={ () => onReplace( [] ) }
				type="li"
				{ ...blockProps }
			/>
		</>
	);
}

export default IconListItem;
