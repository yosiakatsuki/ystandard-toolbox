/**
 * WordPress Dependencies
 */
import { useContext } from '@wordpress/element';
import { __ } from '@wordpress/i18n';

/**
 * Aktk Dependencies
 */
import { NoticeSecondaryText } from '@aktk/block-components/components/notice';
import { CodeInput } from '@aktk/components/code-input';

/**
 * Plugin Dependencies
 */
import { PluginSettingsPanel } from '@aktk/plugin-settings/components/panel';
import { SettingsTab } from '@aktk/plugin-settings/components/settings-tab';
import { CustomCssContext } from './index';

/**
 * CSS編集タブの定義
 */
interface CssTab {
	name: string;
	title: string;
	help: string;
}

const TABS: CssTab[] = [
	{
		name: 'all',
		title: __( '共通', 'ystandard-toolbox' ),
		help: __(
			'公開ページ・ブロックエディターの両方に適用されるCSS',
			'ystandard-toolbox'
		),
	},
	{
		name: 'front',
		title: __( 'フロント', 'ystandard-toolbox' ),
		help: __( '公開ページのみ適用されるCSS', 'ystandard-toolbox' ),
	},
	{
		name: 'editor',
		title: __( 'ブロックエディター', 'ystandard-toolbox' ),
		help: __( 'ブロックエディターのみ適用されるCSS', 'ystandard-toolbox' ),
	},
];

/**
 * カスタムCSSコード編集コンポーネント
 * 共通、フロント、ブロックエディター別のCSSを編集する機能を提供
 */
export default function Code(): JSX.Element {
	// カスタムCSS設定のコンテキストから必要な値と関数を取得
	const { settings, updateSettings } = useContext( CustomCssContext );
	/**
	 * 指定されたタブのCSSコードを取得する
	 * @param name - タブ名（all, front, editor）
	 * @return CSSコード
	 */
	const getCode = ( name: string ): string => {
		return settings?.[ name ] ?? '';
	};
	/**
	 * 指定されたタブのヘルプテキストを取得する
	 * @param name - タブ名（all, front, editor）
	 * @return ヘルプテキスト
	 */
	const getHelp = ( name: string ): string => {
		const help = TABS.find( ( item: CssTab ) => {
			return name === item.name;
		} );
		return help?.help || '';
	};
	/**
	 * CSSコード変更時の処理
	 * @param name - タブ名（all, front, editor）
	 * @param value - 新しいCSSコード
	 */
	const handleOnChange = ( name: string, value: string ) => {
		updateSettings( {
			[ name ]: value,
		} );
	};

	return (
		<PluginSettingsPanel
			title={ __( 'カスタムCSS編集', 'ystandard-toolbox' ) }
		>
			<SettingsTab tabs={ TABS }>
				{ ( tab ) => {
					const cssTab = tab as CssTab;
					return (
						<div className="space-y-4">
							<NoticeSecondaryText>
								{ getHelp( cssTab.name ) }
							</NoticeSecondaryText>
							<CodeInput
								value={ getCode( cssTab.name ) }
								onChange={ ( value: string ) => {
									handleOnChange( cssTab.name, value );
								} }
								language="css"
								minHeight="300px"
							/>
						</div>
					);
				} }
			</SettingsTab>
		</PluginSettingsPanel>
	);
}
