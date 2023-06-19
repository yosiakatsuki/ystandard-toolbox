import { getPluginSettings } from '@aktk/plugin-settings/function/setting';
import type { HeadingOption, HeadingStyle } from '../types';

export function getHeadingOptions() {
	return {
		design: getPluginSettings( 'heading_design' ),
		level: getPluginSettings( 'heading_level' ),
		isCompatible: getPluginSettings( 'heading_is_compatible' ),
		breakpoints: getPluginSettings( 'heading_breakpoints' ),
	};
}

export function getNewOption( slug: string, label: string ): HeadingOption {
	return {
		slug,
		label,
		enable: true,
		enableParagraph: false,
		style: {} as HeadingStyle,
	};
}
