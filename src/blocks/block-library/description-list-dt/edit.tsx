/**
 * WordPress dependencies.
 */
import {
	RichText,
	useBlockProps,
	// @ts-ignore.
	__experimentalUseGradient as useGradient,
} from '@wordpress/block-editor';
import { useDispatch, useSelect } from '@wordpress/data';
import { __ } from '@wordpress/i18n';
/**
 * Block Dependencies.
 */
import type { DtBlockProps } from './types';
import { getDtBlockClasses, getDtBlockStyles } from './utils';
import './style-editor.scss';

export default function Edit( props: DtBlockProps ): JSX.Element {
	const { attributes, setAttributes, clientId } = props;
	const { text } = attributes;
	const { gradientClass, gradientValue } = useGradient();
	const { selectBlock } = useDispatch( 'core/block-editor' );

	// 次のブロックのclientIdを取得
	const nextBlockClientId = useSelect(
		( select ) => {
			const blockEditorStore = select( 'core/block-editor' ) as any;
			return blockEditorStore.getNextBlockClientId( clientId );
		},
		[ clientId ]
	);

	/**
	 * Enterキー押下時の処理
	 * Shift+Enter: 改行（デフォルト動作）
	 * Enter: 次のブロックへフォーカス移動
	 *
	 * @param {Object} event - キーボードイベント
	 */
	const handleKeyDown = ( event: any ) => {
		console.log( { nextBlockClientId } );
		// Shift+Enterの場合は改行（デフォルト動作）
		if ( event.key === 'Enter' && event.shiftKey ) {
			return;
		}

		// Enterのみの場合は次のブロックへフォーカス移動
		if ( event.key === 'Enter' && nextBlockClientId ) {
			event.preventDefault();
			// 次のブロックを選択
			selectBlock( nextBlockClientId );
		}
	};

	const blockProps = useBlockProps( {
		className: getDtBlockClasses( {
			...attributes,
			gradient: gradientClass,
			customGradient: gradientValue,
		} ),
		style: getDtBlockStyles( {
			...attributes,
			gradient: gradientClass,
			customGradient: gradientValue,
		} ),
	} );
	return (
		<>
			<RichText
				tagName="dt"
				value={ text || '' }
				onChange={ ( value ) => setAttributes( { text: value } ) }
				onKeyDown={ handleKeyDown }
				identifier="text"
				placeholder={ __( '説明タイトル', 'ystandard-toolbox' ) }
				{ ...blockProps }
			/>
		</>
	);
}
