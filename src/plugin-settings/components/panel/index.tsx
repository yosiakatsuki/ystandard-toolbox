/**
 * Akatsuki
 */
import { Panel } from '@aktk/block-components/components/panel';

import './style-editor.scss';

interface PluginSettingsPanelProps {
	title: string;
	initialOpen?: ( () => boolean ) | boolean;
	children: React.ReactNode;
}

export function PluginSettingsPanel( props: PluginSettingsPanelProps ) {
	const { title, initialOpen, children } = props;
	return (
		<Panel
			title={ title }
			initialOpen={ initialOpen }
			className={ 'ystdtb-plugin-settings-panel' }
		>
			{ children }
		</Panel>
	);
}
