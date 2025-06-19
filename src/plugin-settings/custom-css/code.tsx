/**
 * WordPress
 */
import { useContext } from '@wordpress/element';

/**
 * yStandard
 */
import Notice from '@aktk/components/notice';
import CodeEditor, { css } from '@aktk/controls/code-editor';
import SettingsTab from '@aktk/plugin-settings/components/settings-tab';
import { CustomCssContext } from './index';
import { getObjectValue } from '@aktk/helper/object.js';

const TABS = [
	{
		name: 'all',
		title: '共通',
		help: '公開ページ・ブロックエディターの両方に適用されるCSS',
	},
	{
		name: 'front',
		title: 'フロント',
		help: '公開ページのみ適用されるCSS',
	},
	{
		name: 'editor',
		title: 'ブロックエディター',
		help: 'ブロックエディターのみ適用されるCSS',
	},
];

const Code = () => {
	const { settings, updateSettings } = useContext( CustomCssContext );
	const getCode = ( name ) => {
		return getObjectValue( settings, name, '' );
	};
	const getHelp = ( name ) => {
		const help = TABS.find( ( item ) => {
			return name === item.name;
		} );
		return help?.help || '';
	};
	const handleOnChange = ( name, value ) => {
		updateSettings( {
			[ name ]: value,
		} );
	};

	return (
		<SettingsTab tabs={ TABS }>
			{ ( tab ) => {
				return (
					<>
						<Notice isHelp style={ { fontSize: '12px' } }>
							{ getHelp( tab.name ) }
						</Notice>
						<CodeEditor
							value={ getCode( tab.name ) }
							onChange={ ( value ) => {
								handleOnChange( tab.name, value );
							} }
							extensions={ [ css() ] }
						/>
					</>
				);
			} }
		</SettingsTab>
	);
};
export default Code;
