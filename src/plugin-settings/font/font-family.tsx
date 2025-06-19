/**
 * WordPress Dependencies
 */
import { useContext } from '@wordpress/element';
import { __ } from '@wordpress/i18n';

/**
 * Aktk Dependencies
 */
import { SecondaryButton } from '@aktk/block-components/components/buttons/buttons';
import { NoticeSecondaryText } from '@aktk/block-components/components/notice';
import InputControl from '@aktk/block-components/wp-controls/input-control';

/**
 * Plugin Dependencies
 */
import {
	PluginSettingsPanel,
	PanelInner,
} from '@aktk/plugin-settings/components/panel';
import PluginSettingsBaseControl from '@aktk/plugin-settings/components/base-control';
import { FontContext } from './index';

/**
 * フォントファミリー設定コンポーネント
 * Webフォントを含めたfont-familyの設定とテーマ設定のコピー機能を提供
 */
export default function FontFamily(): JSX.Element {
	// フォント設定のコンテキストから必要な値と関数を取得
	const { settings, updateSettings } = useContext( FontContext );
	// プレースホルダーテキストの設定（値が入力されていない場合はテーマ設定を表示）
	const placeholder = !! settings?.family ? '' : settings?.themeFontSetting;
	/**
	 * フォントファミリー値変更時の処理
	 * @param newValue - 新しいフォントファミリー値
	 */
	const handleOnChange = ( newValue?: string ) => {
		updateSettings( {
			family: newValue,
		} );
	};
	/**
	 * テーマフォント設定をコピーするボタンクリック時の処理
	 * 現在のテーマフォント設定をフォントファミリー欄にコピーする
	 */
	const handleOnClickCopyFontFamily = () => {
		updateSettings( {
			family: settings?.themeFontSetting || '',
		} );
	};
	return (
		<PluginSettingsPanel
			title={ __( 'フォント指定の編集', 'ystandard-toolbox' ) }
		>
			<PanelInner>
				<PluginSettingsBaseControl
					label={ __( 'font-family :', 'ystandard-toolbox' ) }
					labelPosition="side"
					id="font-family-input"
					isFullWidth
				>
					<InputControl
						value={ settings?.family || '' }
						onChange={ handleOnChange }
						placeholder={ placeholder }
						id="font-family-input"
						className="w-full !max-w-full"
					/>
					<NoticeSecondaryText>
						{ __(
							'※追加したWebフォント等を含めた font-family を入力してください。',
							'ystandard-toolbox'
						) }
					</NoticeSecondaryText>
				</PluginSettingsBaseControl>
				{ ! settings?.family && (
					<PluginSettingsBaseControl
						label={ __(
							'フォント設定のコピー',
							'ystandard-toolbox'
						) }
						id="copy-font-family"
						isFullWidth
					>
						<NoticeSecondaryText>
							{ __( '※現在の設定では', 'ystandard-toolbox' ) }
							<code style={ { fontSize: '1em' } }>
								{ settings?.themeFontSetting || '' }
							</code>
							{ __(
								'が有効になっています。',
								'ystandard-toolbox'
							) }
							<br />
							{ __(
								'※現在のフォント設定をコピーして、追加したフォントの指定を追記してください。',
								'ystandard-toolbox'
							) }
						</NoticeSecondaryText>
						<div className="mt-4">
							<SecondaryButton
								isSmall
								onClick={ handleOnClickCopyFontFamily }
							>
								{ __(
									'現在のフォント設定をコピーする',
									'ystandard-toolbox'
								) }
							</SecondaryButton>
						</div>
					</PluginSettingsBaseControl>
				) }
			</PanelInner>
		</PluginSettingsPanel>
	);
}
