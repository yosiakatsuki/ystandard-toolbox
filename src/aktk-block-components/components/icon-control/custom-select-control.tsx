/**
 * Components
 */
import { DesktopControl, TabletControl, MobileControl } from './wrapper';
import { CustomSelectControl } from '@aktk/block-components/components/custom-select-control';

interface IconSelectControlProps {
	onChange: ( value: string ) => void;
	value: string;
	label?: string;
	options: { name: string; key: string }[];
	emptyLabel?: string;
	useEmptyValue?: boolean;
}

function CustomSelectBase( props: IconSelectControlProps ) {
	const {
		onChange,
		value,
		label,
		options,
		emptyLabel = '----',
		useEmptyValue,
	} = props;
	return (
		<CustomSelectControl
			label={ label }
			value={ value }
			options={ options }
			emptyLabel={ emptyLabel }
			onChange={ ( newValue ) => {
				onChange( newValue );
			} }
			useEmptyValue={ useEmptyValue }
		/>
	);
}

function DesktopIconSelectControl( props: IconSelectControlProps ) {
	return (
		<DesktopControl alignToInput={ !! props?.label }>
			<CustomSelectBase { ...props } />
		</DesktopControl>
	);
}

function TabletIconSelectControl( props: IconSelectControlProps ) {
	return (
		<TabletControl alignToInput={ !! props?.label }>
			<CustomSelectBase { ...props } />
		</TabletControl>
	);
}

function MobileIconSelectControl( props: IconSelectControlProps ) {
	return (
		<MobileControl alignToInput={ !! props?.label }>
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
