/**
 * WordPress dependencies.
 */
import { useContext, useState, useMemo } from '@wordpress/element';
import { __ } from '@wordpress/i18n';

/**
 * Aktk Components.
 */
import { Modal } from '@aktk/block-components/components/modal';
import InputControl from '@aktk/block-components/wp-controls/input-control';
import {
	notifyError,
	notifySuccess,
} from '@aktk/block-components/components/toast-message';

/**
 * Plugin.
 */
import { apiPost, getEndpoint, SUCCESS } from '@aktk/api';

/**
 * Components.
 */
import { HeadingContext } from '../index';
import { getNewOption } from '../../util/setting';
import type { HeadingOption } from '@aktk/plugin-settings/heading/types';

interface AddStyleProps {
	isOpen: boolean;
	onSuccess: () => void;
	onCancel: () => void;
}

/**
 * スタイル追加.
 *
 * @param props
 */
export default function AddStyle( props: AddStyleProps ) {
	const { isOpen, onSuccess, onCancel } = props;

	const { headingStyles, setHeadingStyles, setSelectedStyle } =
		// @ts-ignore
		useContext( HeadingContext );

	// スタイルのIDリスト.
	const headingStylesIds = useMemo(
		// @ts-ignore
		() => Object.values( headingStyles ).map( ( style ) => style.slug ),
		[ headingStyles ]
	);

	const [ id, setId ] = useState( '' );
	const [ isIdErrorMessage, setIsIdErrorMessage ] = useState( '' );
	const [ label, setLabel ] = useState( '' );
	const [ isLabelErrorMessage, setIsLabelErrorMessage ] = useState( '' );

	// 入力の初期化.
	const initInput = () => {
		setId( '' );
		setLabel( '' );
		setIsIdErrorMessage( '' );
		setIsLabelErrorMessage( '' );
	};

	// IDの入力チェック.
	const checkId = ( value: string, checkEmpty: boolean = false ): boolean => {
		// 空白チェック.
		if ( ! value.trim() ) {
			// 空白チェックありならエラーを表示.
			if ( checkEmpty ) {
				setIsIdErrorMessage(
					__( '入力されていません。', 'ystandard-toolbox' )
				);
				return false;
			}
			setIsIdErrorMessage( '' );
			return true;
		}
		// 入力規則チェック.
		const regexWord = /^[a-zA-Z0-9-]*$/;
		if ( ! regexWord.test( value ) ) {
			setIsIdErrorMessage(
				__( '英数字とハイフンのみ使用できます。', 'ystandard-toolbox' )
			);
			return false;
		}
		// 「先頭に数字が入ってたらエラー」チェック.
		const regexStart = /^[a-zA-Z][a-zA-Z0-9-]*$/;
		if ( ! regexStart.test( value ) ) {
			setIsIdErrorMessage(
				__( '最初の文字は英字のみ使用できます。', 'ystandard-toolbox' )
			);
			return false;
		}
		// 「ハイフンは1回まで」チェック.
		const regex = /^[a-zA-Z][a-zA-Z0-9]*-?[a-zA-Z0-9]*$/;
		if ( ! regex.test( value ) ) {
			setIsIdErrorMessage(
				__( 'ハイフンは1回のみ使用可能です。', 'ystandard-toolbox' )
			);
			return false;
		}

		// 重複チェック.
		const exists = headingStylesIds.find( ( style ) => style === value );
		if ( exists ) {
			setIsIdErrorMessage(
				__(
					'入力されたIDは既に登録されています。',
					'ystandard-toolbox'
				)
			);
			return false;
		}

		setIsIdErrorMessage( '' );
		return true;
	};

	// ラベルの入力チェック.
	const checkLabel = ( value: string, checkEmpty: boolean = false ) => {
		// 空白チェック.
		if ( ! value.trim() ) {
			// 空白チェックありならエラーを表示.
			if ( checkEmpty ) {
				setIsLabelErrorMessage(
					__( '入力されていません。', 'ystandard-toolbox' )
				);
				return false;
			}
			setIsLabelErrorMessage( '' );
			return true;
		}
		setIsLabelErrorMessage( '' );
		return true;
	};

	// IDの入力チェック.
	const handleIDOnChange = ( value?: string ) => {
		checkId( value || '' );
		setId( value || '' );
	};

	// ラベルの入力チェック.
	const handleLabelOnChange = ( value?: string ) => {
		checkLabel( value || '' );
		setLabel( value || '' );
	};

	// 追加したスタイルをスタイル一覧オブジェクトへ追加.
	const addNewStyleData = ( styleId: string, style: HeadingOption ) => {
		const newStyles = {
			...headingStyles,
			...{ [ styleId ]: style },
		};
		setHeadingStyles( newStyles );
		setSelectedStyle( styleId );
	};

	// OKボタン押下時.
	const handleOnOk = () => {
		// 入力チェック実行.
		const checkIdResult = checkId( id, true );
		const checkLabelResult = checkLabel( label, true );
		// エラーがあればストップ.
		if ( ! checkLabelResult || ! checkIdResult ) {
			return;
		}

		// 新しいスタイルの作成.
		const newStyle = getNewOption( id, label );
		// データ登録
		apiPost( {
			endpoint: getEndpoint( 'add_heading_style' ),
			data: { style: newStyle },
			callback: async ( response ) => {
				if ( SUCCESS === response.status ) {
					addNewStyleData( id, newStyle );
					initInput();
					onSuccess();
				}
			},
			// @ts-ignore
			messageSuccess: notifySuccess,
			// @ts-ignore
			messageError: notifyError,
		} );
	};

	// キャンセルボタン押下時.
	const handleOnCancel = () => {
		setIsIdErrorMessage( '' );
		setIsLabelErrorMessage( '' );
		onCancel();
	};

	return (
		<>
			<Modal
				isOpen={ isOpen }
				title={ __( '見出しスタイルの追加', 'ystandard-toolbox' ) }
				onCancel={ handleOnCancel }
				onOk={ handleOnOk }
			>
				<div className={ 'flex w-full flex-col gap-5' }>
					<div>
						<InputControl
							label={ __( 'スタイルID', 'ystandard-toolbox' ) }
							value={ id }
							onChange={ handleIDOnChange }
						/>
						{ isIdErrorMessage && (
							<p className={ 'mt-1 text-xs text-notice-error' }>
								{ isIdErrorMessage }
							</p>
						) }
					</div>
					<div>
						<InputControl
							label={ __( 'スタイル名', 'ystandard-toolbox' ) }
							value={ label }
							onChange={ handleLabelOnChange }
						/>
						{ isLabelErrorMessage && (
							<p className={ 'mt-1 text-xs text-notice-error' }>
								{ isLabelErrorMessage }
							</p>
						) }
					</div>
				</div>
			</Modal>
		</>
	);
}
