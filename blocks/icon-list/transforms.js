import { createBlock } from '@wordpress/blocks';

const transforms = {
	from: [
		{
			type: 'block',
			blocks: [ 'core/list' ],
			transform: ( attributes, innerBlocks ) => {
				return createBlock(
					'ystdtb/icon-list',
					{
						values: attributes.values,
						backgroundColor: attributes.backgroundColor,
						customBackgroundColor: attributes.customBackgroundColor,
						textColor: attributes.textColor,
						customTextColor: attributes.customTextColor,
						fontSize: attributes.fontSize,
						customFontSize: attributes.customFontSize,
					},
					innerBlocks
				);
			},
		},
	],
	to: [
		{
			type: 'block',
			blocks: [ 'core/list' ],
			transform: ( attributes, innerBlocks ) => {
				return createBlock(
					'core/list',
					{
						values: attributes.values,
						backgroundColor: attributes.backgroundColor,
						customBackgroundColor: attributes.customBackgroundColor,
						textColor: attributes.textColor,
						customTextColor: attributes.customTextColor,
						fontSize: attributes.fontSize,
						customFontSize: attributes.customFontSize,
					},
					innerBlocks
				);
			},
		},
	],
};

export default transforms;
