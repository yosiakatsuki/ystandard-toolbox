/**
 * Aktk
 */
import { isEmpty } from '@aktk/block-components/utils/object';

import type {
	HeadingPseudoElementsStyle,
	HeadingStyle,
} from '@aktk/plugin-settings/heading/types';

type MergePresetProp = HeadingStyle | HeadingPseudoElementsStyle | undefined;

export function mergePreset(
	presetStyle: MergePresetProp,
	userStyle: MergePresetProp
) {
	const newStyle = { ...presetStyle };

	if ( isEmpty( newStyle ) ) {
		return undefined;
	}
	console.log( { mergePresetNewStyle: newStyle } );

	const copyProps = [
		'fontSize',
		'fontStyle',
		'letterSpacing',
		'lineHeight',
	];

	// @ts-expect-error
	Object.keys( userStyle ).forEach( ( value ) => {
		if ( copyProps.includes( value ) ) {
			// @ts-expect-error
			newStyle[ value ] = userStyle[ value ];
		}
	} );

	return newStyle;
}
