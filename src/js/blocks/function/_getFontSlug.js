import { select } from '@wordpress/data';

export function getFontSlug(size) {
	const { fontSizes } = select('core/block-editor').getSettings();
	const selected = fontSizes.filter((data) => data.size === size);
	if (0 < selected.length) {
		return selected[0].slug;
	}
	return undefined;
}

export function getFontSize(size) {
	const sizeClass = getFontSlug(size);
	if (undefined !== sizeClass) {
		return undefined;
	}
	return size;
}
