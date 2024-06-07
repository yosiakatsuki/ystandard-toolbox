import {
	type FontWeightStyleControlProps,
	FontWeightControl,
} from '@aktk/block-components/wp-controls/font-appearance-control';
/**
 * Components
 */
import { DesktopControl, TabletControl, MobileControl } from './wrapper';

function IconFontWeightControlBase( props: FontWeightStyleControlProps ) {
	return <FontWeightControl { ...props } />;
}

function DesktopFontWeightControl( props: FontWeightStyleControlProps ) {
	return (
		<DesktopControl>
			<IconFontWeightControlBase { ...props } />
		</DesktopControl>
	);
}

function TabletFontWeightControl( props: FontWeightStyleControlProps ) {
	return (
		<TabletControl>
			<IconFontWeightControlBase { ...props } />
		</TabletControl>
	);
}

function MobileFontWeightControl( props: FontWeightStyleControlProps ) {
	return (
		<MobileControl>
			<IconFontWeightControlBase { ...props } />
		</MobileControl>
	);
}

const IconFontWeightControl = ( props: FontWeightStyleControlProps ) => {
	return <IconFontWeightControlBase { ...props } />;
};

IconFontWeightControl.Desktop = DesktopFontWeightControl;
IconFontWeightControl.Tablet = TabletFontWeightControl;
IconFontWeightControl.Mobile = MobileFontWeightControl;

export { IconFontWeightControl };
