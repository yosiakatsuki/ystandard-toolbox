/**
 * @param      name
 * @param      defaultValue
 * @deprecated use getBlockEditorConfig(src/blocks/utils/config)
 */
export const getBlockConfig = ( name, defaultValue ) => {
	if ( ! window.ystdtbBlockEditor ) {
		return defaultValue;
	}
	if ( ! window.ystdtbBlockEditor.hasOwnProperty( name ) ) {
		return defaultValue;
	}
	return window.ystdtbBlockEditor[ name ];
};
