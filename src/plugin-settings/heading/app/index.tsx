import type { Context } from 'react';
/**
 * WordPress
 */
import { useState, useEffect, createContext } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
/**
 * yStandard
 */
import LevelSelect from './select';
import { getHeadingStyles, getLevelList } from './api';
import type {
	HeadingOption,
	HeadingPseudoElementsStyle,
	HeadingStyle,
} from '../types';
import EditContainer from './edit-conteiner';
import { deleteUndefined } from '@aktk/block-components/utils/object';

interface HeadingAppProps {
	setIsLoading: ( value: boolean ) => void;
}

type AppMode = 'select' | 'add' | 'update';

interface HeadingContextProps {
	initApp: () => void;
	appMode: AppMode;
	setAppMode: ( value: AppMode ) => void;
	selectedStyle: string;
	setSelectedStyle: ( value: string ) => void;
	levelList: {};
	initLevelList: () => void;
	headingStyles: { [ key: string ]: HeadingOption };
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
	const [ isEdit, setIsEdit ] = useState( false );
	// データ関連.
	const [ selectedStyle, setSelectedStyle ] = useState< string >( '' );
	const [ levelList, setLevelList ] = useState( {} );
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
					selectedStyle,
					setSelectedStyle,
					levelList,
					initLevelList,
					headingStyles,
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
					<LevelSelect />
					<EditContainer />
				</div>
			</HeadingContext.Provider>
		</div>
	);
}
