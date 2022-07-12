export function getAdminConfig( name = undefined, defaultValue = undefined ) {
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
