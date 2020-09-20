import { registerBlockStyle } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';

registerBlockStyle( 'core/column', {
	name: `ystdtb-col-auto`,
	label: __( '幅:auto', 'ystandard-toolbox' ),
} );
registerBlockStyle( 'core/column', {
	name: `ystdtb-no-shrink`,
	label: __( '幅:auto(折返しなし)', 'ystandard-toolbox' ),
} );
