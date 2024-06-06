import { Monitor, Tablet, Smartphone } from 'react-feather';

/**
 * Aktk
 */
import UnitControl, {
	UnitControlProps,
	UnitType,
} from '@aktk/block-components/wp-controls/unit-control';

type IconUnitControlProps = UnitControlProps & {
	unitType?: 'fontSize' | 'spacing' | 'length';
};

const UNITS = {
	fontSize: [
		{ value: 'px', label: 'px', default: 0 },
		{ value: 'em', label: 'em', default: 0 },
		{ value: 'rem', label: 'rem', default: 0 },
	] as UnitType[],
	spacing: [
		{ value: 'px', label: 'px', default: 0 },
		{ value: 'em', label: 'em', default: 0 },
		{ value: 'rem', label: 'rem', default: 0 },
		{ value: '%', label: '%', default: 0 },
		{ value: 'vw', label: 'vw', default: 0 },
		{ value: 'vh', label: 'vh', default: 0 },
		{ value: 'ch', label: 'ch', default: 0 },
	] as UnitType[],
	length: [
		{ value: 'px', label: 'px', default: 0 },
		{ value: 'em', label: 'em', default: 0 },
		{ value: 'rem', label: 'rem', default: 0 },
		{ value: '%', label: '%', default: 0 },
		{ value: 'vw', label: 'vw', default: 0 },
		{ value: 'vh', label: 'vh', default: 0 },
		{ value: 'ch', label: 'ch', default: 0 },
	] as UnitType[],
} as const;

type UnitTypes = keyof typeof UNITS | string | undefined;

const ICON_SIZE = 20;

export function IconUnitControl( props: IconUnitControlProps ) {
	return <IconUnitControlBase { ...props } />;
}

// @ts-ignore
function IconUnitControlWrap( { children } ) {
	return (
		<div
			className={
				'flex items-center gap-1 [&>svg]:shrink-0 [&>svg]:text-gray-500'
			}
		>
			{ children }
		</div>
	);
}

function MobileUnitControl( props: IconUnitControlProps ) {
	return (
		<IconUnitControlWrap>
			<Smartphone size={ ICON_SIZE } />
			<IconUnitControl { ...props } />
		</IconUnitControlWrap>
	);
}

function TabletUnitControl( props: IconUnitControlProps ) {
	return (
		<IconUnitControlWrap>
			<Tablet size={ ICON_SIZE } />
			<IconUnitControl { ...props } />
		</IconUnitControlWrap>
	);
}

function DesktopUnitControl( props: IconUnitControlProps ) {
	return (
		<IconUnitControlWrap>
			<Monitor size={ ICON_SIZE } />
			<IconUnitControl { ...props } />
		</IconUnitControlWrap>
	);
}

IconUnitControl.Mobile = MobileUnitControl;
IconUnitControl.Tablet = TabletUnitControl;
IconUnitControl.Desktop = DesktopUnitControl;

function getUnits( type: UnitTypes ): UnitType[] | undefined {
	if ( ! type ) {
		return undefined;
	}
	return UNITS.hasOwnProperty( type )
		? UNITS[ type as keyof typeof UNITS ]
		: undefined;
}

function IconUnitControlBase( props: IconUnitControlProps ) {
	return <UnitControl { ...props } units={ getUnits( props?.unitType ) } />;
}
