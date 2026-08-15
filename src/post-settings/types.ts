/**
 * WordPress Dependencies
 */
import type { ComponentType } from '@wordpress/element';

export const SECTION_FILTER = 'ystandard.hooks.postSettingsModal.sections';
export const ITEM_FILTER = 'ystandard.hooks.postSettingsModal.items';

export interface PostSettingsContext {
	apiVersion: 1;
	postType: string;
	postId: number;
}

export interface PostSettingsSection {
	id: string;
	title: string;
	order: number;
}

export interface PostSettingsItemProps {
	postType: string;
	postId: number;
}

export interface PostSettingsItem {
	id: string;
	section: string;
	order: number;
	Component: ComponentType< PostSettingsItemProps >;
}

export interface PostSettingsMenuLocation {
	name: string;
	label: string;
}

export interface PostSettingsMenuOption {
	value: string;
	label: string;
}

export interface PostSettingsProviderConfig extends PostSettingsContext {
	overlay: {
		enabled: boolean;
	};
	menuReplace: {
		enabled: boolean;
		locations: PostSettingsMenuLocation[];
		menus: PostSettingsMenuOption[];
	};
}

export type PostMeta = Record< string, unknown >;

declare global {
	interface Window {
		ystdtbPostSettingsHost?: PostSettingsContext;
		ystdtbPostSettingsProvider?: PostSettingsProviderConfig;
	}
}
