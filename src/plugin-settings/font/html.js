/**
 * WordPress
 */
import { useContext } from '@wordpress/element';
import { PanelBody } from '@wordpress/components';

/**
 * yStandard
 */
import Notice from '@aktk/components/notice';
import CodeEditor from '@aktk/controls/code-editor';
import { FontContext } from './index';

const Html = () => {
	const { settings, updateSettings } = useContext( FontContext );

	const handleOnChange = ( newValue ) => {
		updateSettings( {
			html: newValue,
		} );
	};
	return (
		<PanelBody title={ 'フォント追加用HTML' }>
			<CodeEditor
				value={ settings?.html }
				onChange={ handleOnChange }
				height={ '100px' }
			/>
			<Notice isHelp isTextSmall>
				<a
					href={ 'https://fonts.google.com/' }
					target={ '_blank' }
					rel={ 'noreferrer nofollow noopener' }
				>
					Google Fonts
				</a>
				などで発行したフォント読み込み用のHTMLを貼り付けてください。
			</Notice>
		</PanelBody>
	);
};
export default Html;
