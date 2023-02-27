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

export function getEditorColors() {
	return getAdminConfig( 'editorColors' );
}

export function getPluginAssetsUrl() {
	const pluginUrl = getAdminConfig( 'pluginUrl' );
	return `${ pluginUrl }/assets/settings`;
}
