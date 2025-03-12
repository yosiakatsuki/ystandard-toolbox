/**
 * Aktk
 */
import { isEmpty } from '@aktk/block-components/utils/object';

import type {
	HeadingPseudoElementsStyle,
	HeadingStyle,
} from '@aktk/plugin-settings/heading/types';

type MergePresetProp = HeadingStyle | HeadingPseudoElementsStyle | undefined;

/**
 * プリセットと編集中のスタイルをマージする.
 *
 * @param presetStyle
 * @param userStyle
 * @returns
 */
export function mergePreset(
	presetStyle: MergePresetProp,
	userStyle: MergePresetProp
) {
	const newStyle = { ...presetStyle };

	if ( isEmpty( newStyle ) ) {
		return undefined;
	}

	if ( isEmpty( userStyle as unknown as object ) ) {
		return newStyle;
	}

	// 編集中のスタイル引き継ぐプロパティ.
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
