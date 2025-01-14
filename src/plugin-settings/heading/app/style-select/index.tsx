/**
 * WordPress
 */
import { useContext, useState, useEffect, useMemo } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
/**
 * Plugin
 */
import CustomSelectControl, {
	CustomSelectControlOption,
} from '@aktk/block-components/wp-controls/custom-select-control';
import {
	AddButton,
	DestructiveButton,
} from '@aktk/block-components/components/buttons';
/**
 * Component.
 */
import { HeadingContext } from '../index';
import ConfirmSelectModal from './confirm-select-modal';
import AddStyle from './add-style';

export default function LevelSelect() {
	const [ levelSelect, setLevelSelect ] = useState( [] );
	const [ isConfirmModalOpen, setIsConfirmModalOpen ] = useState( false );
	const [ tempSelectedStyle, setTempSelectedStyle ] = useState( '' );

	const {
		selectedStyle,
		setSelectedStyle,
		headingStyles,
		setAppMode,
		appMode,
		isEdit,
		setIsEdit,
		// @ts-ignore
	} = useContext( HeadingContext );

	// セレクトボックスの選択肢.
	const selectOptions = useMemo( () => {
		// @ts-ignore
		return Object.keys( headingStyles ).map( ( key: string ) => {
			// @ts-ignore
			const style = headingStyles[ key ];
			return {
				key: style?.slug,
				name: style?.label,
			};
		} );
	}, [ headingStyles ] );

	const initLevel = () => {
		// @ts-ignore.
		setLevelSelect( selectOptions );
	};
	useEffect( () => {
		initLevel();
	}, [ headingStyles ] );

	// スタイル変更処理メイン.
	const changeSelectedStyle = (
		value: string,
		checkEdit: boolean = true
	) => {
		if ( checkEdit && isEdit ) {
			return;
		}
		setSelectedStyle( value );
		setAppMode( value ? 'update' : 'select' );
		setTempSelectedStyle( '' );
	};

	// スタイル変更 プルダウン変更.
	const handleOnChange = ( value: string ) => {
		if ( isEdit ) {
			setTempSelectedStyle( value );
			setIsConfirmModalOpen( true );
			return;
		}
		changeSelectedStyle( value );
	};

	// スタイル追加ボタンクリック.
	const handleOnAddButtonClick = () => {
		setAppMode( 'add' );
	};

	// キャンセルボタンクリック.
	const handleOnCancel = () => {
		handleOnChange( '' );
	};

	return (
		<>
			<div className={ '' }>
				<div className={ 'flex justify-between' }>
					<div className={ 'flex items-end justify-between gap-3' }>
						<CustomSelectControl
							value={ selectedStyle || '' }
							options={
								levelSelect as CustomSelectControlOption[]
							}
							onChange={ handleOnChange }
							className={ 'min-w-[170px] whitespace-nowrap' }
						/>
						{ ! selectedStyle ? (
							<AddButton
								className={ 'mb-1' }
								onClick={ handleOnAddButtonClick }
								isSmall={ true }
							>
								<>
									{ __(
										'スタイル追加',
										'ystandard-toolbox'
									) }
								</>
							</AddButton>
						) : (
							<DestructiveButton
								className={ 'mb-1' }
								onClick={ handleOnCancel }
								isSmall={ true }
							>
								{ __( 'キャンセル', 'ystandard-toolbox' ) }
							</DestructiveButton>
						) }
					</div>
				</div>
			</div>
			<ConfirmSelectModal
				isOpen={ isConfirmModalOpen }
				onCancel={ () => {
					setIsConfirmModalOpen( false );
					setTempSelectedStyle( '' );
				} }
				onSuccess={ () => {
					changeSelectedStyle( tempSelectedStyle, false );
					setIsConfirmModalOpen( false );
					setIsEdit( false );
				} }
			/>
			<AddStyle
				isOpen={ 'add' === appMode }
				onCancel={ () => setAppMode( 'select' ) }
				onSuccess={ () => setAppMode( 'select' ) }
			/>
		</>
	);
}
