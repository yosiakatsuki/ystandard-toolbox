export {};

declare global {
	interface Window {
		ystdtbPluginSettings: {
			[ key: string ]: any;
		};
		ystdtbAdminConfig: {
			[ key: string ]: any;
		};
	}
}
