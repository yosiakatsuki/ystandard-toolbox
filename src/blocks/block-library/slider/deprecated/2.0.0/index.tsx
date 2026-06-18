/*
 * Block dependencies.
 */
import metadata from '../../block.json';
import Save from '../../save';
import type { SliderBlockAttributes } from '../../types';

const attributesWithoutEffectDefault = { ...metadata.attributes };
delete attributesWithoutEffectDefault.effect;

export const deprecated200WithoutEffect = [
	{
		attributes: {
			...attributesWithoutEffectDefault,
			effect: {
				type: 'string',
			},
		},
		supports: metadata.supports,
		migrate: ( attributes: SliderBlockAttributes ) => ( {
			...attributes,
			effect: attributes.effect ?? 'slide',
		} ),
		save: Save,
	},
];
