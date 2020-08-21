import { registerBlockStyle } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';

registerBlockStyle(
	'core/table',
	{
		name: `ystdtb-table-2col`,
		label: __( '2列用', 'ystandard-toolbox' ),
	}
);

registerBlockStyle(
	'core/table',
	{
		name: `ystdtb-table-2col-m`,
		label: __( '2列用(モバイルで1列)', 'ystandard-toolbox' ),
	}
);
registerBlockStyle(
	'core/table',
	{
		name: `ystdtb-table-scroll`,
		label: __( 'モバイルでスクロール', 'ystandard-toolbox' ),
	}
);
