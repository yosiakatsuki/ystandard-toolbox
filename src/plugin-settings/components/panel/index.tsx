import classnames from 'classnames';
/**
 * Aktk dependencies
 */
import { Panel } from '@aktk/block-components/components/panel';

import './style-editor.scss';

interface PluginSettingsPanelProps {
	title: string;
	initialOpen?: boolean;
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

export function PanelInner( { children }: { children: React.ReactNode } ) {
	return <div className={ 'flex flex-col gap-8' }>{ children }</div>;
}
