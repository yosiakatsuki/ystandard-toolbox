/**
 * WordPress
 */
import { __ } from '@wordpress/i18n';
import { useContext } from '@wordpress/element';
import { ToggleControl } from '@wordpress/components';

/**
 * Plugin Dependencies
 */
import { PluginSettingsPanel } from '@aktk/plugin-settings/components/panel';
/**
 * Types
 */
import type { HeadingOption } from '@aktk/plugin-settings/heading/types';

import { HeadingContext } from '../../index';

export default function BlockStyle() {
	// @ts-ignore
	const { headingOption, setHeadingOption, setIsEdit } =
		useContext( HeadingContext );

	const isUseHeadingStyle = headingOption?.useHeadingStyle;
	const isUseParagraphStyle = headingOption?.useParagraphStyle;

	// 見出しスタイルとして使う設定変更
	const handleOnHeadingStyleChange = ( value: boolean ) => {
		setHeadingOption( {
			...headingOption,
			useHeadingStyle: value,
		} as HeadingOption );
		setIsEdit( true );
	};
	// 段落スタイルとして使う設定変更
	const handleOnParagraphStyleChange = ( value: boolean ) => {
		setHeadingOption( {
			...headingOption,
			useParagraphStyle: value,
		} as HeadingOption );
		setIsEdit( true );
	};

	return (
		<PluginSettingsPanel
			title={ __( 'ブロックスタイル', 'ystandard-toolbox' ) }
			initialOpen={ true }
		>
			<div>
				<ToggleControl
					className="mb-2"
					label={ __(
						'見出しブロックのスタイルとして使う',
						'ystandard-toolbox'
					) }
					checked={ isUseHeadingStyle }
					onChange={ handleOnHeadingStyleChange }
					__nextHasNoMarginBottom
				/>
				<ToggleControl
					label={ __(
						'段落ブロックのスタイルとして使う',
						'ystandard-toolbox'
					) }
					checked={ isUseParagraphStyle }
					onChange={ handleOnParagraphStyleChange }
					className={ '!mb-0' }
					__nextHasNoMarginBottom
				/>
			</div>
		</PluginSettingsPanel>
	);
}
