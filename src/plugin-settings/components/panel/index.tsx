import clsx from 'clsx';
/**
 * Akatsuki
 */
import { Panel } from '@aktk/block-components/components/panel';

import './style-editor.scss';

interface PluginSettingsPanelProps {
	title: string;
	initialOpen?: ( () => boolean ) | boolean;
	children: React.ReactNode;
	isNested?: boolean;
}

export function PluginSettingsPanel( props: PluginSettingsPanelProps ) {
	const { title, initialOpen, children, isNested = false } = props;
	const className = clsx( 'ystdtb-plugin-settings-panel', {
		'is-nested': isNested,
	} );
	return (
		<Panel
			title={ title }
			initialOpen={ initialOpen }
			className={ className }
		>
			{ children }
		</Panel>
	);
}
