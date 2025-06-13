export * from './style';

import './style-editor.scss';

export function PanelGroup( { children }: { children: React.ReactNode } ) {
	return (
		<div className={ 'ystdtb-heading-v2__panel-group' }>{ children }</div>
	);
}
