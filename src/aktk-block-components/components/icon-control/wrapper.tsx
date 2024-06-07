import { Monitor, Tablet, Smartphone } from 'react-feather';

const ICON_SIZE = 20;

// @ts-ignore
function IconUnitControlWrap( { children } ) {
	return (
		<div
			className={
				'flex items-center gap-1 [&>*:not(svg)]:grow [&>svg]:shrink-0 [&>svg]:text-gray-500 [&_label:empty]:hidden'
			}
		>
			{ children }
		</div>
	);
}

interface WithIconControlProps {
	children: React.ReactNode;
	size?: number;
}

export function DesktopControl( props: WithIconControlProps ) {
	const { children, size } = props;
	return (
		<IconUnitControlWrap>
			<Monitor size={ size || ICON_SIZE } />
			{ children }
		</IconUnitControlWrap>
	);
}

export function TabletControl( props: WithIconControlProps ) {
	const { children, size } = props;
	return (
		<IconUnitControlWrap>
			<Tablet size={ size || ICON_SIZE } />
			{ children }
		</IconUnitControlWrap>
	);
}

export function MobileControl( props: WithIconControlProps ) {
	const { children, size } = props;
	return (
		<IconUnitControlWrap>
			<Smartphone size={ size || ICON_SIZE } />
			{ children }
		</IconUnitControlWrap>
	);
}
