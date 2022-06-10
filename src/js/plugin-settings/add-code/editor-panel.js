import CodeMirror from '@uiw/react-codemirror';
import { html } from '@codemirror/lang-html';
/**
 * WordPress
 */
import { useContext } from '@wordpress/element';
/**
 * yStandard
 */
import { AddCodeContext } from './index';
import { getObjectValue } from '@aktk/helper/object.js';
import { getAdminConfig } from '../function/config';
import Stack from '../component/stack';
import SectionLabel from '../component/section-label';
import Notice from '@aktk/components/notice';

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
						<div className="aktk-settings-add-code__editor-input">
							<CodeMirror
								value={ code }
								minHeight="200px"
								maxHeight="500px"
								onChange={ handleCodeOnChange }
								extensions={ [ html() ] }
							/>
						</div>
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
							<div className="aktk-settings-add-code__editor-input">
								<CodeMirror
									value={ codeAmp }
									minHeight="200px"
									maxHeight="500px"
									onChange={ handleCodeAmpOnChange }
									extensions={ [ html() ] }
								/>
							</div>
						</div>
					) }
				</Stack>
			</div>
		</>
	);
};
export default EditorPanel;
