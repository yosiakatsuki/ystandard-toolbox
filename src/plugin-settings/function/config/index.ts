/**
 * @deprecated use utils/config
 */
export function getAdminConfig(
	name: string | undefined = undefined,
	defaultValue: any = undefined
) {
	if ( ! name || ! window?.ystdtbAdminConfig ) {
		return window?.ystdtbAdminConfig;
	}
	if ( ! window.ystdtbAdminConfig.hasOwnProperty( name ) ) {
		return defaultValue;
	}
	return window.ystdtbAdminConfig[ name ];
}

/**
 * @deprecated use utils/config
 */
export function getEditorColors() {
	return getAdminConfig( 'editorColors' );
}

