/**
 * Aktk dependencies.
 */
import { stripUndefined } from '@aktk/block-components/utils/object';

import type { Spacing } from './types';
import { presetTokenToCssVar } from '@aktk/block-components/utils/style-engine';

type SpacingSize = {
	slug?: string | number;
	size?: string | number;
};

export function getCustomSpacingValueFromPreset(
	value: string | undefined,
	spacingSizes: SpacingSize[]
) {
	if ( '0' === value ) {
		return value;
	}
	if ( ! value?.includes( 'var:preset|spacing|' ) ) {
		return value;
	}

	const slug = value.match( /var:preset\|spacing\|(.+)/ )?.[ 1 ];
	const spacingSize = spacingSizes.find(
		( size ) => String( size.slug ) === slug
	);

	return undefined === spacingSize?.size
		? undefined
		: String( spacingSize.size );
}

export function getCustomSpacingValues(
	spacing: Spacing | undefined,
	type: string
) {
	const value = {
		[ `${ type }Top` ]: presetTokenToCssVar( spacing?.top ) || undefined,
		[ `${ type }Right` ]:
			presetTokenToCssVar( spacing?.right ) || undefined,
		[ `${ type }Bottom` ]:
			presetTokenToCssVar( spacing?.bottom ) || undefined,
		[ `${ type }Left` ]: presetTokenToCssVar( spacing?.left ) || undefined,
	};
	return stripUndefined( value );
}
