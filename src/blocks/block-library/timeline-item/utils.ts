import classnames from 'classnames';
/**
 * WordPress dependencies.
 */
import { getColorClassName, getFontSizeClass } from '@wordpress/block-editor';
/**
 * Block dependencies.
 */
import type { TimeLineItemAttributes } from './types';

export function getTimelineItemClasses( attributes: TimeLineItemAttributes ) {
	const {
		labelType,
		contentsInnerMargin,
		contentsBorderColor,
		customContentsBorderColor,
	} = attributes;

	const _labelType = labelType || '';
	const _contentMargin = contentsInnerMargin ?? 'normal';
	// 色関連
	const contentsBorderColorClass = getColorClassName(
		'border-color',
		contentsBorderColor || ''
	);
	// クラス名生成.
	return classnames( 'ystdtb-timeline-item', {
		[ `is-margin-${ _contentMargin }` ]: 'normal' !== _contentMargin,
		[ `has-${ _labelType }` ]: !! _labelType,
		'has-border': contentsBorderColor || customContentsBorderColor,
		[ contentsBorderColorClass ]: contentsBorderColorClass,
	} );
}

export function getTimelineItemStyles( attributes: TimeLineItemAttributes ) {
	const { contentsBorderColor, customContentsBorderColor } = attributes;
	// 色関連
	const contentsBorderColorClass = getColorClassName(
		'border-color',
		contentsBorderColor || ''
	);
	return {
		borderColor: contentsBorderColorClass
			? undefined
			: customContentsBorderColor,
	};
}

export function getLabelClasses( attributes: TimeLineItemAttributes ) {
	const {
		labelType,
		labelContents,
		labelColor,
		customLabelColor,
		labelBackgroundColor,
		customLabelBackgroundColor,
		labelBorderColor,
		customLabelBorderColor,
		labelFontSize,
	} = attributes;
	const _labelType = labelType || '';
	const hasLongText =
		'text' === _labelType && !! labelContents && 1 < labelContents.length;
	// 色関連
	const labelColorClass = getColorClassName( 'color', labelColor || '' );
	const labelBgColorClass = getColorClassName(
		'background-color',
		labelBackgroundColor || ''
	);
	const labelBorderColorClass =
		getColorClassName( 'border-color', labelBorderColor ) || '';
	// 文字関連
	const labelFontSizeClass = getFontSizeClass( labelFontSize || '' );
	// クラス名生成.
	return classnames( 'ystdtb-timeline__label', {
		[ `has-${ _labelType }` ]: '' !== _labelType,
		'has-long-text': hasLongText,
		[ labelFontSizeClass ]: labelFontSizeClass,
		'has-text-color': labelColor || customLabelColor,
		[ labelColorClass ]: labelColorClass,
		'has-background': labelBackgroundColor || customLabelBackgroundColor,
		[ labelBgColorClass ]: labelBgColorClass,
		'has-border': labelBorderColor || customLabelBorderColor,
		[ labelBorderColorClass ]: labelBorderColorClass,
	} );
}

export function getLabelStyles( attributes: TimeLineItemAttributes ) {
	const {
		labelFontSize,
		customLabelFontSize,
		labelWeight,
		labelColor,
		customLabelColor,
		labelBackgroundColor,
		customLabelBackgroundColor,
		labelBorderColor,
		customLabelBorderColor,
		labelBorderRadius,
		labelBorderSize,
	} = attributes;
	// 色関連
	const labelColorClass = getColorClassName( 'color', labelColor || '' );
	const labelBgColorClass = getColorClassName(
		'background-color',
		labelBackgroundColor || ''
	);
	const labelBorderColorClass =
		getColorClassName( 'border-color', labelBorderColor ) || '';
	// 文字関連
	const labelFontSizeClass = getFontSizeClass( labelFontSize || '' );
	return {
		fontSize: labelFontSizeClass ? undefined : customLabelFontSize,
		fontWeight: !! labelWeight ? labelWeight : undefined,
		color: labelColorClass ? undefined : customLabelColor,
		backgroundColor: labelBgColorClass
			? undefined
			: customLabelBackgroundColor,
		borderColor: labelBorderColorClass ? undefined : customLabelBorderColor,
		borderRadius: labelBorderRadius ? labelBorderRadius : undefined,
		borderWidth: labelBorderSize ? labelBorderSize : undefined,
		borderStyle: labelBorderSize ? 'solid' : undefined,
	};
}

export function getTimelineContentClasses(
	attributes: TimeLineItemAttributes
) {
	const { contentsInnerMargin } = attributes;
	const _contentMargin = contentsInnerMargin ?? 'normal';
	return classnames( 'ystdtb-timeline__contents', {
		[ `is-margin-${ _contentMargin }` ]: _contentMargin,
	} );
}

export function getTimelineContentStyles( attributes: TimeLineItemAttributes ) {
	const { contentMarginTop } = attributes;
	return { marginTop: contentMarginTop ? contentMarginTop : undefined };
}

export function getLabelContentClasses( attributes: TimeLineItemAttributes ) {
	const { labelType } = attributes;

	const hasLabelTypeClass = [ 'text', 'icon' ].includes( labelType || '' );
	return classnames( {
		[ `ystdtb-timeline__label-${ labelType }` ]: hasLabelTypeClass,
	} );
}
