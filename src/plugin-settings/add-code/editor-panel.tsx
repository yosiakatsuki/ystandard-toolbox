/**
 * WordPress
 */
import { useContext } from '@wordpress/element';
/**
 * yStandard
 */
import CodeEditor from '@aktk/controls/code-editor';
import Notice from '@aktk/components/notice';
import { getObjectValue } from '@aktk/helper/object.js';
import { AddCodeContext } from './index';
import { getAdminConfig } from '@aktk/plugin-settings/function/config';
import Stack from '@aktk/plugin-settings/components/stack';
import SectionLabel from '@aktk/plugin-settings/components/section-label';

const EditorPanel = ( { tab } ) => {
	const { settings, setSettings } = useContext( AddCodeContext );
	const settingKey = tab.name;
	const settingKeyAmp = `${ tab.name }_amp`;
	const code = getObjectValue( settings, settingKey, '' );
	const codeAmp = getObjectValue( settings, settingKeyAmp, '' );
	const handleCodeOnChange = ( newValue ) => {
		setSettings( {
			...settings,
			...{
				[ settingKey ]: newValue,
			},
		} );
	};
	const handleCodeAmpOnChange = ( newValue ) => {
		setSettings( {
			...settings,
			...{
				[ settingKeyAmp ]: newValue,
			},
		} );
	};
	const useAmp = getAdminConfig( 'isAmpEnable', false );

	return (
		<>
			<div className="aktk-settings-add-code__editor-panel">
				<Stack>
					<div>
						<CodeEditor
							value={ code }
							onChange={ handleCodeOnChange }
						/>
						{ useAmp && (
							<Notice isHelp style={ { fontSize: '12px' } }>
								入力したコードはAMPページでは出力されません。
								<br />
								AMPページに出力したい内容は「AMP用コード追加」に追記してください。
							</Notice>
						) }
					</div>
					{ useAmp && (
						<div>
							<SectionLabel>AMP用コード追加</SectionLabel>
							<CodeEditor
								value={ codeAmp }
								onChange={ handleCodeAmpOnChange }
							/>
						</div>
					) }
				</Stack>
			</div>
		</>
	);
};
export default EditorPanel;
