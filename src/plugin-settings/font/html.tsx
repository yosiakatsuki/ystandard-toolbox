/**
 * WordPress Dependencies
 */
import { useContext } from '@wordpress/element';
import { __ } from '@wordpress/i18n';

/**
 * Aktk Dependencies
 */
import { NoticeSecondaryText } from '@aktk/block-components/components/notice';

/**
 * Plugin Dependencies
 */
import {
	PluginSettingsPanel,
	PanelInner,
} from '@aktk/plugin-settings/components/panel';
import { CodeInput } from '@aktk/components/code-input';
import { FontContext } from './index';

/**
 * フォント追加用HTMLコンポーネント
 * Google Fontsなどから取得したフォント読み込み用HTMLを設定する
 */
export default function Html(): JSX.Element {
	// フォント設定のコンテキストから必要な値と関数を取得
	const { settings, updateSettings } = useContext( FontContext );

	/**
	 * HTMLコード変更時の処理
	 * @param newValue - 新しいHTMLコード
	 */
	const handleOnChange = ( newValue: string ) => {
		updateSettings( {
			html: newValue,
		} );
	};
	return (
		<PluginSettingsPanel
			title={ __( 'フォント追加用HTML', 'ystandard-toolbox' ) }
		>
			<CodeInput
				minHeight={ '100px' }
				maxHeight={ '100px' }
				value={ settings?.html || '' }
				onChange={ handleOnChange }
			/>
			<NoticeSecondaryText>
				<a
					href="https://fonts.google.com/"
					target="_blank"
					rel="noreferrer nofollow noopener"
				>
					{ __( 'Google Fonts', 'ystandard-toolbox' ) }
				</a>
				{ __(
					'などで発行したフォント読み込み用のHTMLを貼り付けてください。',
					'ystandard-toolbox'
				) }
			</NoticeSecondaryText>
		</PluginSettingsPanel>
	);
}
