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
import { InspectorControls } from './inspector-controls';
import './style-editor.scss';

export default function Edit( props: DtBlockProps ): JSX.Element {
	const { attributes, setAttributes, clientId } = props;
	const { text } = attributes;
	const { gradientClass, gradientValue, setGradient } = useGradient();
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
		// Enterのみの場合は次のブロックへフォーカス移動
		if ( event.key === 'Enter' && ! event.shiftKey ) {
			event.preventDefault();
			// 次のブロックがあれば次を選択
			if ( nextBlockClientId ) {
				selectBlock( nextBlockClientId );
			}
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

	const inspectorControlsProps = {
		...props,
		gradientValue,
		setGradient,
	};

	return (
		<>
			<InspectorControls { ...inspectorControlsProps } />
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
