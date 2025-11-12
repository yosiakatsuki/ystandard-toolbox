import classnames from 'classnames';
/**
 * WordPress dependencies.
 */
import {
	RichText,
	useBlockProps,
	useInnerBlocksProps,
	store as blockEditorStore,
} from '@wordpress/block-editor';
import { createBlock } from '@wordpress/blocks';
import { useDispatch, useSelect } from '@wordpress/data';
import { useRefEffect } from '@wordpress/compose';
import { ENTER } from '@wordpress/keycodes';
import { __ } from '@wordpress/i18n';

/**
 * Block Dependencies.
 */
import { blockClassName } from './index';

// @ts-ignore.
function Edit( props ): JSX.Element {
	const { attributes, setAttributes, clientId } = props;
	const { content } = attributes;
	const blockProps = useBlockProps( {
		className: classnames( blockClassName ),
	} );
	const innerBlocksProps = useInnerBlocksProps( blockProps, {
		renderAppender: false,
		__unstableDisableDropZone: true,
	} );

	const { removeBlock, selectPreviousBlock, insertBlocks } =
		useDispatch( blockEditorStore );
	const {
		getPreviousBlockClientId,
		getBlockCount,
		getBlockRootClientId,
		getNextBlockClientId,
		getBlockIndex,
	} = useSelect( ( select ) => {
		const blockEditor = select( blockEditorStore );
		return {
			getPreviousBlockClientId: blockEditor.getPreviousBlockClientId,
			getBlockCount: blockEditor.getBlockCount,
			getBlockRootClientId: blockEditor.getBlockRootClientId,
			getNextBlockClientId: blockEditor.getNextBlockClientId,
			getBlockIndex: blockEditor.getBlockIndex,
		};
	}, [] );

	/**
	 * テキストが空の状態でバックスペースを押した際の処理
	 * 現在のブロックを削除し、前のブロックにフォーカスを移動
	 * ただし、親ブロック内に1つしかアイテムがない場合は削除しない
	 */
	const handleRemove = () => {
		// 親ブロック内のアイテム数を取得
		const parentBlockClientId = getBlockRootClientId( clientId );
		const siblingCount = getBlockCount( parentBlockClientId );

		// 1つしかない場合は削除しない
		if ( siblingCount <= 1 ) {
			return;
		}

		const previousBlockClientId = getPreviousBlockClientId( clientId );
		removeBlock( clientId );
		if ( previousBlockClientId ) {
			selectPreviousBlock( clientId );
		}
	};

	/**
	 * エンターキーの処理をカスタマイズ
	 * 最後のアイテムでテキストが空の場合、リストの後に段落ブロックを挿入
	 */
	const onEnterRef = useRefEffect(
		( element ) => {
			const handleKeyDown = ( event: KeyboardEvent ) => {
				if ( event.keyCode !== ENTER ) {
					return;
				}

				// テキストが空で、次のアイテムがない（最後のアイテム）場合
				if ( ! content && ! getNextBlockClientId( clientId ) ) {
					event.preventDefault();
					const parentBlockClientId =
						getBlockRootClientId( clientId );
					const parentIndex = getBlockIndex( parentBlockClientId );
					const grandParentClientId =
						getBlockRootClientId( parentBlockClientId );

					// 現在のブロックを削除
					removeBlock( clientId );
					// 親ブロック（リスト）の後に段落ブロックを挿入
					insertBlocks(
						createBlock( 'core/paragraph' ),
						parentIndex + 1,
						grandParentClientId
					);
				}
			};

			element.addEventListener( 'keydown', handleKeyDown );
			return () => {
				element.removeEventListener( 'keydown', handleKeyDown );
			};
		},
		[
			content,
			clientId,
			getNextBlockClientId,
			getBlockRootClientId,
			getBlockIndex,
			removeBlock,
			insertBlocks,
		]
	);

	return (
		<>
			<li { ...innerBlocksProps }>
				<RichText
					identifier="content"
					tagName="div"
					onChange={ ( nextContent ) =>
						setAttributes( { content: nextContent } )
					}
					value={ content }
					placeholder={ __( 'テキストを入力…', 'ystandard-toolbox' ) }
					aria-label={ __( 'List text' ) }
					onRemove={ handleRemove }
					ref={ onEnterRef }
				/>
				{ innerBlocksProps.children }
			</li>
		</>
	);
}

export default Edit;
