import { registerBlockStyle } from '@wordpress/blocks';
import _getHeadingTypes from "../../../src/js/admin/heading/_getHeadingTypes";
import _toBool from "../../../src/js/admin/function/_toBool";
import { __ } from '@wordpress/i18n';

const types = _getHeadingTypes();
const option = window.ystdtbBlockEditorHeading;

for ( let item of types ) {
	if ( !! option[ item.level ] && _toBool( option[ item.level ][ 'useCustomStyle' ] ) ) {
		const style = {
			name: `ystdtb-${ item.level }`,
			label: item.label,
		};
		registerBlockStyle( 'core/heading', style );
		registerBlockStyle( 'ystdb/heading', style );
	}
}


