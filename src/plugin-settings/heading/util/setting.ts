import { getPluginSettings } from '@aktk/plugin-settings/function/setting';

export function getHeadingOptions() {
	return {
		design: getPluginSettings( 'heading_design' ),
		level: getPluginSettings( 'heading_level' ),
		isCompatible: getPluginSettings( 'heading_is_compatible' ),
	};
}
