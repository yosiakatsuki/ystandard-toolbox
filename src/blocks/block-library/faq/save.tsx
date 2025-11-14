import classnames from 'classnames';
/*
 * WordPress Dependencies
 */
import {
	InnerBlocks,
	useBlockProps,
	// @ts-ignore
	getColorClassName,
} from '@wordpress/block-editor';

/*
 * Plugin Dependencies
 */
import type { FaqBlockAttributes } from './types';

type FaqSaveProps = {
	attributes: FaqBlockAttributes;
};

/**
 * FAQブロック保存コンポーネント
 */
export default function FaqSave( { attributes }: FaqSaveProps ) {
	const {
		isAccordion,
		borderType,
		borderSize,
		backgroundColor,
		customBackgroundColor,
		borderColor,
		customBorderColor,
	} = attributes;

	// 背景色クラス名を取得
	const backgroundColorClass = getColorClassName(
		'background-color',
		backgroundColor
	);

	// 枠線色クラス名を取得
	const borderColorClass = getColorClassName( 'border-color', borderColor );

	// クラス名
	const faqClasses = classnames( 'ystdtb-faq', {
		'is-accordion': isAccordion,
		'has-padding': 'all' === borderType || backgroundColor,
		'has-background': backgroundColor || customBackgroundColor,
		[ backgroundColorClass ]: backgroundColorClass,
		'has-border': borderSize || borderColor || customBorderColor,
		[ borderColorClass ]: borderColorClass,
		[ `border-type--${ borderType }` ]: '' !== borderType,
	} );

	// インラインスタイル
	const faqStyle = {
		backgroundColor: backgroundColorClass
			? undefined
			: customBackgroundColor,
		borderColor: borderColorClass ? undefined : customBorderColor,
		borderWidth: 'all' === borderType ? borderSize : undefined,
		borderBottomWidth:
			'bottom' === borderType || 'all' === borderType
				? borderSize
				: undefined,
	};

	const blockProps = useBlockProps.save( {
		className: faqClasses,
		style: faqStyle,
	} );

	return (
		<div { ...blockProps }>
			<InnerBlocks.Content />
		</div>
	);
}
