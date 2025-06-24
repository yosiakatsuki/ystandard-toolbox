import React from 'react';
/**
 * WordPress Dependencies
 */
import { useContext } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
/**
 * Aktk Dependencies
 */
import { HorizonButtonSelect } from '@aktk/block-components/components/buttons';
import { toBool } from '@aktk/block-components/utils/boolean';
/**
 * Plugin Dependencies
 */
import PluginSettingsBaseControl from '@aktk/plugin-settings/components/base-control';
import { BlockPatternsContext } from '../index';

/**
 * ボタンオプションの型定義
 */
interface ButtonOption {
	value: boolean;
	label: string;
}

/**
 * WordPressコアブロックパターンの無効化設定コンポーネント
 * WordPress本体のブロックパターンの表示・非表示を制御する
 */
export default function DisableCorePattern(): JSX.Element {
	const { settings, setSettings, getSetting } = useContext( BlockPatternsContext );

	/**
	 * 設定変更時のハンドラー
	 * @param newValue 新しい設定値（boolean）
	 */
	const handleOnChange = ( newValue: string | number | boolean ) => {
		setSettings( {
			...settings,
			disable_core_pattern: newValue,
		} );
	};

	/**
	 * ボタンオプションの配列
	 */
	const options: ButtonOption[] = [
		{
			value: false,
			label: __( '有効', 'ystandard-toolbox' ),
		},
		{
			value: true,
			label: __( '無効', 'ystandard-toolbox' ),
		},
	];

	// 現在の設定値を取得
	const currentValue = toBool( getSetting( 'disable_core_pattern' ) );

	return (
		<PluginSettingsBaseControl
			id="disable_core_pattern"
			label={ __( 'WordPress本体のブロックパターンの有効・無効', 'ystandard-toolbox' ) }
		>
			<HorizonButtonSelect
				value={ currentValue }
				onChange={ handleOnChange }
				options={ options }
			/>
		</PluginSettingsBaseControl>
	);
}
