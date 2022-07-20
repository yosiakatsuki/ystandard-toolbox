/**
 * WordPress
 */
import EditorPanel from './editor-panel';
import SettingsTab from '@aktk/plugin-settings/components/settings-tab';

const EditorTab = () => {
	return (
		<SettingsTab
			tabs={ [
				{
					name: 'head',
					title: '<head>内に追加するコード',
				},
				{
					name: 'body_open',
					title: '<body>直後に追加するコード',
				},
				{
					name: 'body_close',
					title: '</body>直前に追加するコード',
				},
			] }
		>
			{ ( tab ) => <EditorPanel tab={ tab } /> }
		</SettingsTab>
	);
};
export default EditorTab;
