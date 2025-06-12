import classnames from 'classnames';
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
	const className = classnames( 'ystdtb-plugin-settings-panel', {
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
