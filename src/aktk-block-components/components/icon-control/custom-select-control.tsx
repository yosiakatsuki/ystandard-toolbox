/**
 * WordPress dependencies
 */
import { CustomSelectControl } from '@wordpress/components';
/**
 * Components
 */
import { DesktopControl, TabletControl, MobileControl } from './wrapper';

interface IconSelectControlProps {
	onChange: ( value: string ) => void;
	value: string;
	label?: string;
	options: { name: string; key: string }[];
}

function CustomSelectBase( props: IconSelectControlProps ) {
	const { onChange, value, label, options } = props;
	return (
		<CustomSelectControl
			label={ label }
			value={ options.find( ( option ) => option.key === value ) }
			options={ options }
			// @ts-ignore
			onChange={ ( { selectedItem } ) => {
				onChange( selectedItem?.key );
			} }
		/>
	);
}

function DesktopIconSelectControl( props: IconSelectControlProps ) {
	return (
		<DesktopControl>
			<CustomSelectBase { ...props } />
		</DesktopControl>
	);
}

function TabletIconSelectControl( props: IconSelectControlProps ) {
	return (
		<TabletControl>
			<CustomSelectBase { ...props } />
		</TabletControl>
	);
}

function MobileIconSelectControl( props: IconSelectControlProps ) {
	return (
		<MobileControl>
			<CustomSelectBase { ...props } />
		</MobileControl>
	);
}

const IconSelectControl = ( props: IconSelectControlProps ) => {
	return <CustomSelectBase { ...props } />;
};

IconSelectControl.Desktop = DesktopIconSelectControl;
IconSelectControl.Tablet = TabletIconSelectControl;
IconSelectControl.Mobile = MobileIconSelectControl;

export { IconSelectControl };
