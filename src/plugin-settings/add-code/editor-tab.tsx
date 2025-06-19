/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * Plugin Dependencies
 */
import EditorPanel from './editor-panel';
import { SettingsTab } from '@aktk/plugin-settings/components/settings-tab';

/**
 * コード追加タブの定義
 */
interface CodeTab {
	name: string;
	title: string;
}

const TABS: CodeTab[] = [
	{
		name: 'head',
		title: __( '<head>内に追加するコード', 'ystandard-toolbox' ),
	},
	{
		name: 'body_open',
		title: __( '<body>直後に追加するコード', 'ystandard-toolbox' ),
	},
	{
		name: 'body_close',
		title: __( '</body>直前に追加するコード', 'ystandard-toolbox' ),
	},
];

/**
 * コード追加エディタータブコンポーネント
 * ヘッダー、ボディ開始、ボディ終了部分のコード編集タブを提供
 */
export default function EditorTab(): JSX.Element {
	return (
		<SettingsTab tabs={ TABS }>
			{ ( tab ) => {
				const codeTab = tab as CodeTab;
				return <EditorPanel tab={ codeTab } />;
			} }
		</SettingsTab>
	);
}
