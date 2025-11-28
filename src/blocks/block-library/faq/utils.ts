import classnames from 'classnames';
/**
 * WordPress dependencies.
 */
import { getColorClassName } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';

/**
 * Block dependencies.
 */
import type { FaqBlockAttributes } from '@aktk/blocks/block-library/faq/types';

export function getFaqClassNames( attributes: FaqBlockAttributes ) {
	const {
		isAccordion,
		borderType,
		borderSize,
		backgroundColor,
		customBackgroundColor,
		borderColor,
		customBorderColor,
	} = attributes;

	const backgroundColorClass =
		getColorClassName( 'background-color', backgroundColor ) || '';
	const borderColorClass =
		getColorClassName( 'border-color', borderColor ) || '';

	return classnames( 'ystdtb-faq', {
		'is-accordion': isAccordion,
		'has-padding':
			'all' === borderType || backgroundColor || customBackgroundColor,
		'has-background': backgroundColor || customBackgroundColor,
		[ backgroundColorClass ]: backgroundColorClass,
		'has-border': borderSize || borderColor || customBorderColor,
		[ borderColorClass ]: borderColorClass,
		[ `border-type--${ borderType }` ]: '' !== borderType,
	} );
}

export function getFaqStyle( attributes: FaqBlockAttributes ) {
	const {
		borderType,
		borderSize,
		backgroundColor,
		customBackgroundColor,
		borderColor,
		customBorderColor,
	} = attributes;

	const backgroundColorClass =
		getColorClassName( 'background-color', backgroundColor ) || '';
	const borderColorClass =
		getColorClassName( 'border-color', borderColor ) || '';

	return {
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
}
