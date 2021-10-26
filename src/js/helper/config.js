import { ystdtbConfig } from '@ystdtb/config';

export const getConfig = ( name ) => {
	return ystdtbConfig[ name ];
};

export const getComponentConfig = ( name ) => {
	return ystdtbConfig.component[ name ];
};

export const getBlockEditorConfig = ( name, defaultValue = undefined ) => {
	const config = window.ystdtbBlockEditor;
	if ( ! config || 'object' !== typeof config ) {
		return {};
	}
	if ( ! config.hasOwnProperty( name ) ) {
		return defaultValue;
	}

	return config[ name ];
};
