/**
 * WordPress Dependencies
 */
import { useContext, useState, useEffect } from '@wordpress/element';
import { __ } from '@wordpress/i18n';

/**
 * Aktk Dependencies
 */
import { NoticeSecondaryText } from '@aktk/block-components/components/notice';
import { HorizonButtonSelect } from '@aktk/block-components/components/buttons';
import { toBool } from '@aktk/block-components/utils/boolean';

/**
 * Plugin Dependencies
 */
import {
	PluginSettingsPanel,
	PanelInner,
} from '@aktk/plugin-settings/components/panel';
import PluginSettingsBaseControl from '@aktk/plugin-settings/components/base-control';
import CodeInput from '@aktk/components/code-input';
import { getAdminConfig } from '@aktk/plugin-settings/function/config';
/**
 * Components
 */
import { DesignContext } from '../index';
import { DesignSettingsTab } from '../types';

/**
 * タブ名とセクション名
 */
const TAB_NAME = 'copyright';
const SECTION_NAME = 'copyright';

/**
 * Powered by ボタンオプション
 */
interface PoweredByOption {
	value: boolean;
	label: string;
}

const POWERED_BY_BUTTONS: PoweredByOption[] = [
	{
		value: true,
		label: '削除する',
	},
	{
		value: false,
		label: '表示する',
	},
];

/**
 * コピーライト設定
 */
interface CopyrightSettings {
	copyright?: string;
	poweredBy?: boolean;
}

/**
 * Props型定義
 */
interface CopyrightProps {
	tab: DesignSettingsTab;
}

/**
 * コピーライト設定コンポーネント
 */
export default function Copyright( { tab }: CopyrightProps ): JSX.Element {
	const [ sectionSettings, setSectionSettings ] =
		useState< CopyrightSettings >( {} );
	const { getSettings, updateSettings, settings } =
		useContext( DesignContext );
	/**
	 * 設定取得
	 */
	const getCopyrightSettings = (): void => {
		const defaultCopyright = getAdminConfig( 'copyrightDefault' ) as string;
		const _settings = getSettings( SECTION_NAME );
		setSectionSettings( {
			copyright: _settings?.copyright ?? defaultCopyright,
			poweredBy: _settings?.disable_theme_info ?? false,
		} );
	};
	useEffect( getCopyrightSettings, [ settings ] );
	/**
	 * タブチェック
	 */
	if ( TAB_NAME !== tab?.name ) {
		return <></>;
	}
	/**
	 * 設定更新
	 */
	const updateSection = ( value: Record< string, any > ): void => {
		updateSettings( SECTION_NAME, {
			...getSettings( SECTION_NAME ),
			...value,
		} );
	};

	/**
	 * コピーライト変更時の処理
	 */
	const handleCopyrightOnChange = ( value: string ): void => {
		updateSection( { copyright: value } );
	};

	/**
	 * Powered by変更時の処理
	 */
	const handlePoweredByOnChange = (
		value: string | number | boolean
	): void => {
		updateSection( { disable_theme_info: toBool( value ) } );
	};

	return (
		<PluginSettingsPanel
			title={ __( 'Copyright編集', 'ystandard-toolbox' ) }
		>
			<PanelInner>
				<PluginSettingsBaseControl
					label={ __( 'Copyrightの編集', 'ystandard-toolbox' ) }
					id={ 'copyright' }
					isFullWidth
				>
					<CodeInput
						minHeight={ '63px' }
						maxHeight={ '100px' }
						value={ sectionSettings.copyright || '' }
						onChange={ handleCopyrightOnChange }
					/>
					<NoticeSecondaryText className="mt-2 text-sm">
						※次のHTMLタグが使用できます。<code>a</code>,
						<code>strong</code>,<code>span</code>,<code>br</code>
						<br />
						※本文内に以下の文字を入力すると、表示時にそれぞれ変換されます。
						<ul className="list-disc list-inside mt-1">
							<li>{ '{year}' } : 現在の年</li>
							<li>{ '{site}' } : サイト名</li>
							<li>{ '{url}' } : サイトURL</li>
						</ul>
					</NoticeSecondaryText>
				</PluginSettingsBaseControl>
				<PluginSettingsBaseControl
					label={ __( 'Powered by の削除', 'ystandard-toolbox' ) }
					id={ 'powered-by' }
				>
					<HorizonButtonSelect
						value={ toBool( sectionSettings.poweredBy ) }
						onChange={ handlePoweredByOnChange }
						options={ POWERED_BY_BUTTONS }
					/>
				</PluginSettingsBaseControl>
			</PanelInner>
		</PluginSettingsPanel>
	);
}
