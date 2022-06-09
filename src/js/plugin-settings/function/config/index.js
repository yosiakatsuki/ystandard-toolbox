export function getAdminConfig( name = undefined ) {
	if ( ! name || ! window?.ystdtbPluginSettings ) {
		return window?.ystdtbPluginSettings;
	}
	if ( ! window.ystdtbPluginSettings.hasOwnProperty( name ) ) {
		return undefined;
	}
	return window.ystdtbPluginSettings[ name ];
}
