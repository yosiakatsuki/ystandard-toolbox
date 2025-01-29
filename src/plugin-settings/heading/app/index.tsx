import clsx from 'clsx';
import type { Context } from 'react';
/**
 * WordPress
 */
import {
	useState,
	useEffect,
	createContext,
	useContext,
} from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { brush, cog, Icon as WPIcon } from '@wordpress/icons';
/**
 * Aktk dependencies
 */
import { deleteUndefined } from '@aktk/block-components/utils/object';
import { ConfirmModal } from '@aktk/block-components/components/modal';
/**
 * Plugin dependencies
 */
import { getHeadingStyles, getLevelList, getLevelKeys } from './api';
import type {
	HeadingOption,
	HeadingPseudoElementsStyle,
	HeadingStyle,
} from '../types';
import { StyleEditContainer, LevelEditContainer } from './editor';
import {
	PrimaryButton,
	SecondaryButton,
} from '@aktk/block-components/components/buttons';

interface HeadingAppProps {
	setIsLoading: ( value: boolean ) => void;
}

type AppMode = 'select' | 'add' | 'update';

type AppTabType = 'style' | 'level';

interface HeadingContextProps {
	initApp: () => void;
	appMode: AppMode;
	setAppMode: ( value: AppMode ) => void;
	appTab: AppTabType;
	setAppTab: ( value: AppTabType ) => void;
	selectedStyle: string;
	setSelectedStyle: ( value: string ) => void;
	levelList: {};
	initLevelList: () => void;
	levelKeys: {};
	initLevelKeys: () => void;
	headingStyles: { [ key: string ]: HeadingOption };
	setHeadingStyles: ( value: { [ key: string ]: HeadingOption } ) => void;
	initHeadingStyles: () => void;
	isEdit: boolean;
	setIsEdit: ( value: boolean ) => void;
	previewText: string;
	setPreviewText: ( value: string ) => void;
	headingOption?: HeadingOption;
	setHeadingOption: ( value: HeadingOption ) => void;
	updateStyle: ( value: HeadingStyle ) => void;
	updateBeforeStyle: ( value: HeadingPseudoElementsStyle ) => void;
	updateAfterStyle: ( value: HeadingPseudoElementsStyle ) => void;
}

// @ts-ignore
export const HeadingContext: Context< HeadingContextProps > =
	// @ts-ignore
	createContext< HeadingContextProps >();

export default function HeadingApp( props: HeadingAppProps ) {
	const { setIsLoading } = props;
	// ステート関連.
	const [ appMode, setAppMode ] = useState< AppMode >( 'select' );
	const [ appTab, setAppTab ] = useState< AppTabType >( 'style' );
	const [ isEdit, setIsEdit ] = useState( false );
	// データ関連.
	const [ selectedStyle, setSelectedStyle ] = useState< string >( '' );
	const [ levelList, setLevelList ] = useState( {} );
	const [ levelKeys, setLevelKeys ] = useState( [] );
	const [ headingStyles, setHeadingStyles ] = useState( {} );
	const [ headingOption, setHeadingOption ] = useState< HeadingOption >();
	const [ previewText, setPreviewText ] = useState(
		__( 'プレビューテキスト', 'ystandard-toolbox' )
	);

	/**
	 * 見出しレベルのリスト取得.
	 */
	const initLevelList = async () => {
		const level = await getLevelList();
		// @ts-expect-error
		setLevelList( level );
	};
	const initLevelKeys = async () => {
		const keys = await getLevelKeys();
		// @ts-expect-error
		setLevelKeys( keys );
	};
	/**
	 * 登録されている見出しスタイルの取得とセット
	 */
	const initHeadingStyles = async () => {
		const styles = await getHeadingStyles();
		// @ts-expect-error
		setHeadingStyles( styles );
	};

	/**
	 * 見出しリストとスタイルの初期化.
	 */
	const initApp = async () => {
		setIsLoading( true );
		await initLevelList();
		await initLevelKeys();
		await initHeadingStyles();
		setIsLoading( false );
	};

	/**
	 * スタイル(メイン)の更新.
	 * @param value
	 */
	const updateStyle = ( value: HeadingStyle ) => {
		if ( ! headingOption ) {
			return;
		}
		const newStyles = deleteUndefined( {
			...headingOption.style,
			...value,
		} );
		const newOption = { ...headingOption, style: newStyles };

		setHeadingOption( newOption );
	};
	/**
	 * Beforeスタイルの更新.
	 * @param value
	 */
	const updateBeforeStyle = ( value: HeadingPseudoElementsStyle ) => {
		if ( ! headingOption ) {
			return;
		}
		const newStyles = deleteUndefined( {
			...headingOption.before,
			...value,
		} );
		const newOption = { ...headingOption, before: newStyles };

		setHeadingOption( newOption );
	};
	/**
	 * Afterスタイルの更新.
	 * @param value
	 */
	const updateAfterStyle = ( value: HeadingPseudoElementsStyle ) => {
		if ( ! headingOption ) {
			return;
		}
		const newStyles = deleteUndefined( {
			...headingOption.after,
			...value,
		} );
		const newOption = { ...headingOption, after: newStyles };

		setHeadingOption( newOption );
	};

	/**
	 * 初期化
	 */
	useEffect( () => {
		initApp();
	}, [] );

	/**
	 * スタイルの選択が変わったとき、選択中オプションを更新.
	 */
	useEffect( () => {
		if ( ! selectedStyle ) {
			setHeadingOption( undefined );
		}
		if ( ! headingStyles ) {
			return;
		}
		const option =
			headingStyles[ selectedStyle as keyof typeof headingStyles ];
		setHeadingOption( option );
	}, [ selectedStyle ] );

	return (
		<div>
			{ /* @ts-ignore */ }
			<HeadingContext.Provider
				value={ {
					initApp,
					appMode,
					setAppMode,
					appTab,
					setAppTab,
					selectedStyle,
					setSelectedStyle,
					levelList,
					initLevelList,
					levelKeys,
					initLevelKeys,
					headingStyles,
					setHeadingStyles,
					initHeadingStyles,
					isEdit,
					setIsEdit,
					previewText,
					setPreviewText,
					headingOption,
					setHeadingOption,
					updateStyle,
					updateBeforeStyle,
					updateAfterStyle,
				} }
			>
				<div className={ 'pb-5' }>
					<ModeSelect
						selectedType={ appTab }
						onChange={ setAppTab }
					/>
					<div className="mt-4">
						{ appTab === 'level' ? (
							<LevelEditContainer />
						) : (
							<StyleEditContainer />
						) }
					</div>
				</div>
			</HeadingContext.Provider>
		</div>
	);
}

type ModeSelectProps = {
	selectedType: AppTabType;
	onChange: ( value: AppTabType ) => void;
};

function ModeSelect( props: ModeSelectProps ) {
	const { onChange, selectedType } = props;
	const {
		setSelectedStyle,
		setAppMode,
		isEdit,
		setIsEdit,
		// @ts-ignore
	} = useContext( HeadingContext );

	// 確認画面.
	const [ isConfirmModalOpen, setIsConfirmModalOpen ] = useState( false );
	const [ tempSelectedType, setTempSelectedType ] = useState( selectedType );

	const handleOnClick = ( value: AppTabType ) => {
		if ( isEdit ) {
			setTempSelectedType( value );
			setIsConfirmModalOpen( true );
			return;
		}
		onChange( value );
	};

	const buttonClass = clsx( 'justify-center gap-2 font-bold' );

	type TabButtonProps = {
		selected: boolean;
		onClick: () => void;
		children: React.ReactNode;
	};

	const TabButton = ( tabButtonProps: TabButtonProps ) => {
		const { selected, onClick, children } = tabButtonProps;

		return (
			<>
				{ selected ? (
					<PrimaryButton
						onClick={ () => onClick() }
						className={ buttonClass }
					>
						{ children }
					</PrimaryButton>
				) : (
					<SecondaryButton
						onClick={ () => onClick() }
						className={ buttonClass }
					>
						{ children }
					</SecondaryButton>
				) }
			</>
		);
	};

	// モード切り替え確認画面でOKしたとき.
	const handleConfirmModalOk = () => {
		onChange( tempSelectedType );
		setIsConfirmModalOpen( false );
		setSelectedStyle( '' );
		setAppMode( 'select' );
		setIsEdit( false );
	};

	return (
		<>
			<div className="grid grid-cols-2 gap-4">
				<TabButton
					selected={ 'style' === selectedType }
					onClick={ () => handleOnClick( 'style' ) }
				>
					<WPIcon icon={ brush } />
					{ __( 'スタイル編集', 'ystandard-toolbox' ) }
				</TabButton>
				<TabButton
					selected={ 'level' === selectedType }
					onClick={ () => handleOnClick( 'level' ) }
				>
					<WPIcon icon={ cog } />
					{ __( '割り当て設定', 'ystandard-toolbox' ) }
				</TabButton>
			</div>
			<ConfirmModal
				title={ __( '編集モード切り替え確認', 'ystandard-toolbox' ) }
				isOpen={ isConfirmModalOpen }
				okText={ __( '編集モードを切り替える', 'ystandard-toolbox' ) }
				onCancel={ () => {
					setIsConfirmModalOpen( false );
					setTempSelectedType( selectedType );
				} }
				onOk={ handleConfirmModalOk }
			>
				<p className="mb-0">
					{ __( '編集中のデータがあります。', 'ystandard-toolbox' ) }
				</p>
				<p className="mt-0">
					{ __(
						'編集モードを切り替えてもよろしいですか。',
						'ystandard-toolbox'
					) }
				</p>
				<p className={ 'mt-1 text-xs text-gray-400' }>
					{ __(
						'※編集中のデータは破棄されます。',
						'ystandard-toolbox'
					) }
				</p>
			</ConfirmModal>
		</>
	);
}
