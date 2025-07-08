import {createBlock} from '@wordpress/blocks';

const transforms = {
    from: [
        {
            type: 'block',
            blocks: ['core/list'],
            transform: (attributes, innerBlocks) => {
                const newInnerBlocks = innerBlocks.map((block) => {
                    return createBlock(
                        'ystdtb/icon-list-item',
                        block.attributes,
                    );
                });

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
                    newInnerBlocks
                );
            },
        },
    ],
    to: [
        {
            type: 'block',
            blocks: ['core/list'],
            transform: (attributes, innerBlocks) => {
                const newInnerBlocks = innerBlocks.map((block) => {
                    return createBlock(
                        'core/list-item',
                        block.attributes,
                    );
                });
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
                    newInnerBlocks
                );
            },
        },
    ],
};

export default transforms;
