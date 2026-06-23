/**
 * WordPress
 */
import { __ } from '@wordpress/i18n';
import { useState } from '@wordpress/element';
/**
 * Aktk Dependencies
 */
import {
	FontFamilySelect,
	useFontFamilies,
} from '@aktk/block-components/components/font-family-select';
import { ToggleGroup } from '@aktk/block-components/components/toggle-group';
import type { FontFamilies } from '@aktk/block-components/wp-controls/font-family-control';
import InputControl from '@aktk/block-components/wp-controls/input-control';
/**
 * Plugin Dependencies
 */
import PluginSettingsBaseControl from '@aktk/plugin-settings/components/base-control';
import ClearButton from '@aktk/plugin-settings/components/clear-button';

type FontFamilyInputMode = 'select' | 'custom';

interface FontFamilyControlProps {
	value: string | undefined;
	onChange: ( newValue: { fontFamily: string | undefined } ) => void;
}

/**
 * 指定されたfont-family値が、一覧から選択できるフォントか判定する。
 *
 * @param value        判定するfont-family値。
 * @param fontFamilies 一覧から選択できるフォント情報。
 */
const isSelectableFontFamily = (
	value: string | undefined,
	fontFamilies: FontFamilies
) => {
	if ( ! value ) {
		return false;
	}
	return fontFamilies.some( ( fontFamily ) => {
		return fontFamily.fontFamily === value;
	} );
};

/**
 * 保存済みのfont-family値から、初期表示する入力方法を取得する。
 *
 * @param value        保存済みのfont-family値。
 * @param fontFamilies 一覧から選択できるフォント情報。
 */
const getInputMode = (
	value: string | undefined,
	fontFamilies: FontFamilies
): FontFamilyInputMode => {
	if ( ! value ) {
		return 'select';
	}
	return isSelectableFontFamily( value, fontFamilies ) ? 'select' : 'custom';
};

/**
 * 見出しデザイン設定のfont-family入力コントロールを表示する。
 *
 * @param props コンポーネントのプロパティ。
 */
export default function FontFamily( props: FontFamilyControlProps ) {
	const { value, onChange } = props;
	const fontFamilies = useFontFamilies();
	// ユーザーが切り替えた入力方法だけを保持し、初期表示は現在値から自動判定する。
	const [ inputMode, setInputMode ] = useState<
		FontFamilyInputMode | undefined
	>( undefined );

	// 入力方法をまだ切り替えていない場合は、保存済みの値に合わせて表示を決める。
	const mode = inputMode || getInputMode( value, fontFamilies );

	// font-family値を設定値として保存できる形式へ変換して通知する。
	const handleOnChange = ( newValue: string | undefined ) => {
		onChange( {
			fontFamily: newValue || undefined,
		} );
	};

	// 入力方法だけを切り替え、入力済みのfont-family値は維持する。
	const handleModeChange = ( newMode: string | number | undefined ) => {
		if ( 'select' !== newMode && 'custom' !== newMode ) {
			return;
		}
		setInputMode( newMode );
	};

	return (
		<PluginSettingsBaseControl
			id={ 'font-family' }
			label={ __( 'font-family', 'ystandard-toolbox' ) }
			isFullWidth={ true }
			className="ystdtb-font-family-control"
		>
			<ToggleGroup
				label={ __( '入力方法', 'ystandard-toolbox' ) }
				value={ mode }
				onChange={ handleModeChange }
				isDeselectable={ false }
				className="ystdtb-font-family-input-mode-toggle"
				options={ [
					{
						label: __( '一覧から', 'ystandard-toolbox' ),
						value: 'select',
					},
					{
						label: __( '直接入力', 'ystandard-toolbox' ),
						value: 'custom',
					},
				] }
			/>
			{ 'select' === mode ? (
				<FontFamilySelect
					value={ value }
					onChange={ handleOnChange }
					fontFamilies={ fontFamilies }
				/>
			) : (
				<InputControl
					value={ value || '' }
					onChange={ handleOnChange }
				/>
			) }
			<ClearButton
				onClick={ () => {
					setInputMode( 'select' );
					handleOnChange( undefined );
				} }
			/>
		</PluginSettingsBaseControl>
	);
}
