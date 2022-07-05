import { isObject } from '@aktk/helper/object.js';

export function migrateSubHeaderFontSize( size, defaultValue ) {
	if ( ! isObject( size ) ) {
		return size;
	}
	if ( ! size?.size ) {
		return defaultValue;
	}
	const unit = size?.unit || 'px';
	const fontSize = size?.size || '';
	return `${ fontSize }${ unit }`;
}
