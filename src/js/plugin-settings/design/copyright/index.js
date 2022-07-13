/**
 * WordPress
 */
import { PanelBody, BaseControl } from '@wordpress/components';
import { useContext, useState, useEffect } from '@wordpress/element';
/**
 * yStandard
 */
import Notice from '@aktk/components/notice';
import { DesignContext } from '../index';
import CodeInput from '@aktk/components/code-input';
import HorizonButtons from '@aktk/components/horizon-buttons';
import { getObjectValue } from '@aktk/helper/object.js';
import { getAdminConfig } from '../../function/config';

const TAB_NAME = 'copyright';
const SECTION_NAME = 'copyright';

const POWERED_BY_BUTTONS = [
	{
		name: true,
		label: '削除する',
	},
	{
		name: false,
		label: '表示する',
	},
];

const Copyright = ( { tab } ) => {
	const [ sectionSettings, setSectionSettings ] = useState( {} );
	const { getSettings, updateSettings, settings } =
		useContext( DesignContext );
	// 設定取得.
	const getCopyrightSettings = () => {
		const defaultCopyright = getAdminConfig( 'copyrightDefault' );
		const _settings = getSettings( SECTION_NAME );
		setSectionSettings( {
			copyright: _settings?.copyright ?? defaultCopyright,
			poweredBy: _settings?.disable_theme_info ?? false,
		} );
		return sectionSettings;
	};
	useEffect( getCopyrightSettings, [ settings ] );
	// タブチェック.
	if ( TAB_NAME !== tab?.name ) {
		return <></>;
	}
	// 設定更新.
	const updateSection = ( value ) => {
		updateSettings( SECTION_NAME, {
			...getSettings( SECTION_NAME ),
			...value,
		} );
	};

	const handleCopyrightOnChange = ( value ) => {
		updateSection( { copyright: value } );
	};

	const handlePoweredByOnChange = ( value ) => {
		updateSection( { disable_theme_info: value?.name || false } );
	};

	return (
		<div>
			<PanelBody title={ 'Copyright編集' }>
				<BaseControl label={ 'Copyrightの編集' } id={ 'copyright' }>
					<CodeInput
						minHeight={ '63px' }
						maxHeight={ '100px' }
						value={ sectionSettings.copyright }
						onChange={ handleCopyrightOnChange }
					/>
					<Notice isHelp style={ { fontSize: '12px' } }>
						※次のHTMLタグが使用できます。<code>a</code>,
						<code>strong</code>,<code>span</code>,<code>br</code>
						<br />
						※本文内に以下の文字を入力すると、表示時にそれぞれ変換されます。
						<ul>
							<li>{ '{year}' } : 現在の年</li>
							<li>{ '{site}' } : サイト名</li>
							<li>{ '{url}' } : サイトURL</li>
						</ul>
					</Notice>
				</BaseControl>
				<BaseControl label={ 'Powered by の削除' } id={ 'powered-by' }>
					<HorizonButtons
						onChange={ handlePoweredByOnChange }
						items={ POWERED_BY_BUTTONS }
						primary={ sectionSettings.poweredBy }
					/>
				</BaseControl>
			</PanelBody>
		</div>
	);
};
export default Copyright;
