/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * Aktk
 */
import { IconSelectControl } from '@aktk/block-components/components/icon-control';

import { TEXT_ALIGNMENT_OPTIONS } from './const';

function getOptions() {
	return TEXT_ALIGNMENT_OPTIONS.map( ( { title, align } ) => ( {
		name: title,
		key: align,
	} ) );
}

interface TextAlignSelectProps {
	onChange: ( align: string ) => void;
	value: string;
	label?: string;
}

export function TextAlignSelect( props: TextAlignSelectProps ) {
	return <IconSelectControl { ...props } options={ getOptions() } />;
}

export function DesktopTextAlignSelect( props: TextAlignSelectProps ) {
	return <IconSelectControl.Desktop { ...props } options={ getOptions() } />;
}

export function TabletTextAlignSelect( props: TextAlignSelectProps ) {
	return <IconSelectControl.Tablet { ...props } options={ getOptions() } />;
}

export function MobileTextAlignSelect( props: TextAlignSelectProps ) {
	return <IconSelectControl.Mobile { ...props } options={ getOptions() } />;
}
