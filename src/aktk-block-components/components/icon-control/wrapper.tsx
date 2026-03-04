import clsx from 'clsx';

import { Monitor, Tablet, Smartphone } from 'react-feather';

import './style-editor.css';

const ICON_SIZE = 20;

interface IconUnitControlWrapProps {
	children: React.ReactNode;
	className?: string;
	alignToInput?: boolean;
}

// @ts-ignore
function IconUnitControlWrap( props: IconUnitControlWrapProps ) {
	const { children, className = '', alignToInput = false } = props;

	const classes = clsx( 'ystdtb-icon-unit-control-wrap', className, {
		'is-align-to-input': alignToInput,
	} );

	return <div className={ classes }>{ children }</div>;
}

interface WithIconControlProps {
	children: React.ReactNode;
	size?: number;
	className?: string;
	alignToInput?: boolean;
}

export function DesktopControl( props: WithIconControlProps ) {
	const { children, size, className = '', alignToInput } = props;
	return (
		<IconUnitControlWrap
			className={ className }
			alignToInput={ alignToInput }
		>
			<Monitor size={ size || ICON_SIZE } />
			{ children }
		</IconUnitControlWrap>
	);
}

export function TabletControl( props: WithIconControlProps ) {
	const { children, size, className = '', alignToInput } = props;
	return (
		<IconUnitControlWrap
			className={ className }
			alignToInput={ alignToInput }
		>
			<Tablet size={ size || ICON_SIZE } />
			{ children }
		</IconUnitControlWrap>
	);
}

export function MobileControl( props: WithIconControlProps ) {
	const { children, size, className = '', alignToInput } = props;
	return (
		<IconUnitControlWrap
			className={ className }
			alignToInput={ alignToInput }
		>
			<Smartphone size={ size || ICON_SIZE } />
			{ children }
		</IconUnitControlWrap>
	);
}
