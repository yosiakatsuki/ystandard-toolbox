/**
 * WordPress dependencies.
 */
import { useContext, useState, useMemo } from '@wordpress/element';
import { __ } from '@wordpress/i18n';

/**
 * Plugin.
 */
import { Modal } from '@aktk/block-components/modal';
import InputControl from '@aktk/components/input-controls';
import { apiPost, getEndpoint, SUCCESS } from '@aktk/api';

/**
 * Components.
 */
import { HeadingContext } from '../index';
import { getNewOption } from '../../util/setting';
import { notifyError, notifySuccess } from '@aktk/components/toast-message';

interface AddStyleProps {
	isOpen: boolean;
	onSuccess: () => void;
	onCancel: () => void;
}

export default function AddStyle( props: AddStyleProps ) {
	const { isOpen, onSuccess, onCancel } = props;

	const { headingStyles, initApp, setSelectedStyle } =
		// @ts-ignore
		useContext( HeadingContext );
	const headingStylesIds = useMemo(
		// @ts-ignore
		() => Object.values( headingStyles ).map( ( style ) => style.slug ),
		[ headingStyles ]
	);

	const [ id, setId ] = useState( '' );
	const [ isIdErrorMessage, setIsIdErrorMessage ] = useState( '' );
	const [ label, setLabel ] = useState( '' );
	const [ isLabelErrorMessage, setIsLabelErrorMessage ] = useState( '' );

	const initInput = () => {
		setId( '' );
		setLabel( '' );
		setIsIdErrorMessage( '' );
		setIsLabelErrorMessage( '' );
	};

	const checkId = ( value: string, checkEmpty: boolean = false ): boolean => {
		if ( ! value.trim() ) {
			if ( checkEmpty ) {
				setIsIdErrorMessage(
					__( '入力されていません。', 'ystandard-toolbox' )
				);
				return false;
			}
			setIsIdErrorMessage( '' );
			return true;
		}
		const regexWord = /^[a-zA-Z0-9-]*$/;
		if ( ! regexWord.test( value ) ) {
			setIsIdErrorMessage(
				__( '英数字とハイフンのみ使用できます。', 'ystandard-toolbox' )
			);
			return false;
		}
		const regexStart = /^[a-zA-Z][a-zA-Z0-9-]*$/;
		if ( ! regexStart.test( value ) ) {
			setIsIdErrorMessage(
				__( '最初の文字は英字のみ使用できます。', 'ystandard-toolbox' )
			);
			return false;
		}
		const regex = /^[a-zA-Z][a-zA-Z0-9]*-?[a-zA-Z0-9]*$/;
		if ( ! regex.test( value ) ) {
			setIsIdErrorMessage(
				__( 'ハイフンは1回のみ使用可能です。', 'ystandard-toolbox' )
			);
			return false;
		}

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

	const checkLabel = ( value: string, checkEmpty: boolean = false ) => {
		if ( ! value.trim() ) {
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

	const handleIDOnChange = ( value: string ) => {
		checkId( value );
		setId( value );
	};

	const handleLabelOnChange = ( value: string ) => {
		checkLabel( value );
		setLabel( value );
	};

	const handleOnOk = () => {
		const checkIdResult = checkId( id, true );
		const checkLabelResult = checkLabel( label, true );

		if ( ! checkLabelResult || ! checkIdResult ) {
			return;
		}

		const newStyle = getNewOption( id, label );
		apiPost( {
			endpoint: getEndpoint( 'add_heading_style' ),
			data: { style: newStyle },
			callback: ( response ) => {
				if ( SUCCESS === response.status ) {
					if ( initApp ) {
						initApp();
					}
					if ( setSelectedStyle ) {
						setSelectedStyle( id );
					}
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

	const handleOnCancel = () => {
		setIsIdErrorMessage( '' );
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
