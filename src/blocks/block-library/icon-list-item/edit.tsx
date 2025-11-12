import classnames from 'classnames';
/**
 * WordPress dependencies.
 */
import {
	RichText,
	useBlockProps,
	useInnerBlocksProps,
} from '@wordpress/block-editor';
import { useDispatch, useSelect } from '@wordpress/data';
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

	const { removeBlock, selectPreviousBlock } =
		useDispatch( 'core/block-editor' );
	const { getPreviousBlockClientId } = useSelect( ( select ) => {
		return {
			getPreviousBlockClientId:
				select( 'core/block-editor' ).getPreviousBlockClientId,
		};
	}, [] );

	/**
	 * テキストが空の状態でバックスペースを押した際の処理
	 * 現在のブロックを削除し、前のブロックにフォーカスを移動
	 */
	const handleRemove = () => {
		const previousBlockClientId = getPreviousBlockClientId( clientId );
		removeBlock( clientId );
		if ( previousBlockClientId ) {
			selectPreviousBlock( clientId );
		}
	};

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
				/>
				{ innerBlocksProps.children }
			</li>
		</>
	);
}

export default Edit;
