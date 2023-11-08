import classnames from "classnames";
/**
 * WordPress dependencies
 */
import {rawHandler, createBlock} from '@wordpress/blocks';
import {__} from '@wordpress/i18n';
import {
    RichText,
    useBlockProps,
    getColorClassName,
} from '@wordpress/block-editor';

const blockClassName = 'ystdtb-icon-list';

const iconTypes = [
    {label: __('右矢印', 'ystandard-toolbox'), name: 'chevron-right'},
    {label: __('右二重矢印', 'ystandard-toolbox'), name: 'chevrons-right'},
    {label: __('右矢印', 'ystandard-toolbox'), name: 'arrow-right'},
    {
        label: __('右丸矢印', 'ystandard-toolbox'),
        name: 'arrow-right-circle',
    },
    {label: __('チェック', 'ystandard-toolbox'), name: 'check'},
    {label: __('チェック(円)', 'ystandard-toolbox'), name: 'check-circle'},
    {label: __('いいね', 'ystandard-toolbox'), name: 'thumbs-up'},
    {label: __('よくないね', 'ystandard-toolbox'), name: 'thumbs-down'},
    {label: __('星', 'ystandard-toolbox'), name: 'star'},
    {label: __('ハート', 'ystandard-toolbox'), name: 'heart'},
    {label: __('アワード', 'ystandard-toolbox'), name: 'award'},
    {label: __('ベル', 'ystandard-toolbox'), name: 'bell'},
    {label: __('ブックマーク', 'ystandard-toolbox'), name: 'bookmark'},
    {label: __('アラート(円)', 'ystandard-toolbox'), name: 'alert-circle'},
    {
        label: __('アラート(三角)', 'ystandard-toolbox'),
        name: 'alert-triangle',
    },
    {label: __('リンク', 'ystandard-toolbox'), name: 'link'},
    {label: __('メッセージ', 'ystandard-toolbox'), name: 'message-circle'},
];

export const v1_26 = {
    attributes: {
        values: {
            type: 'string',
            source: 'html',
            selector: 'ul',
            multiline: 'li',
            default: '',
        },
        iconType: {
            type: 'string',
            default: 'chevron-right',
        },
        customIconClass: {
            type: 'string',
        },
        iconBold: {
            type: 'bool',
            default: false,
        },
        iconColor: {
            type: 'string',
        },
        customIconColor: {
            type: 'string',
        },
    },
    supports: {
        align: false,
        className: false,
        lightBlockWrapper: true,
        fontSize: true,
        color: true,
    },
    save({attributes}) {
        const {
            values,
            iconType,
            customIconClass,
            iconBold,
            iconColor,
            customIconColor,
        } = attributes;

        const iconColorClass = getColorClassName('icon-font-color', iconColor);

        const listClassName = classnames(blockClassName, `icon--${iconType}`, {
            'is-bold': iconBold,
            [iconColorClass]: iconColorClass,
            [customIconClass]: customIconClass,
            'has-icon-font-color': iconColor || customIconColor,
        });

        const listStyle = {
            '--icon-font-color': iconColorClass ? undefined : customIconColor,
        };

        return (
            <ul
                {...useBlockProps.save({
                    className: listClassName,
                    style: listStyle,
                })}
            >
                <RichText.Content value={values} multiline="li"/>
            </ul>
        );
    },
    migrate(attributes) {
        const {values, ...otherAttributes} = attributes;

        const list = document.createElement('ul');
        list.innerHTML = values;

        const [listBlock] = rawHandler({HTML: list.outerHTML});

        const newInnerBlocks = listBlock.innerBlocks.map((block) => {

            return createBlock(
                'ystdtb/icon-list-item',
                block.attributes,
            );
        });

        return [
            {...otherAttributes},
            newInnerBlocks,
        ];
    }
}