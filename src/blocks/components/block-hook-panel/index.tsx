import classnames from 'classnames';
/**
 * WordPress Dependencies.
 */
import { PanelBody } from '@wordpress/components';
/**
 * Plugin Dependencies
 */
import { PanelIcon } from '@aktk/components/ystandard-icon';
/**
 * Components Dependencies.
 */
import './style-editor.scss';

interface BlockHookPanelProps {
	title: string;
	children: React.ReactNode;
	className?: string;
	isEnabled?: boolean;
}

export function BlockHookPanel(
	props: BlockHookPanelProps
): React.ReactElement {
	const { title, className, isEnabled = false, children } = props;

	const panelClassName = classnames( 'ystdtb-hook-panel', className, {
		'is-enabled': isEnabled,
	} );

	return (
		<PanelBody
			className={ panelClassName }
			title={ title }
			initialOpen={ false }
			icon={ <PanelIcon /> }
		>
			{ children }
		</PanelBody>
	);
}
