import { __experimentalLinkControl as WPLinkControl } from '@wordpress/block-editor';

const LinkControl = ( { value, onChange, showSuggestions, ...props } ) => {
	return (
		<WPLinkControl
			value={ value }
			onChange={ onChange }
			showSuggestions={ showSuggestions }
			{ ...props }
		/>
	);
};
export default LinkControl;
