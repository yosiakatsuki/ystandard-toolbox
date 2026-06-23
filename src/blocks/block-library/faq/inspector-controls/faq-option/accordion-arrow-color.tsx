/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
/*
 * Aktk Dependencies
 */
import BaseControl from '@aktk/block-components/wp-controls/base-control';
import { ColorPalette } from '@aktk/block-components/components/color-pallet-control';

/**
 * Block Dependencies.
 */
import type { FaqBlockAttributes } from '../../types';

// @ts-ignore.
export function AccordionArrowColor( props ): JSX.Element {
	const { attributes, setAttributes, updateChildAttributes } = props;
	const { isAccordion, accordionArrowColor, customAccordionArrowColor } =
		attributes as FaqBlockAttributes;

	const handleOnChange = ( newColor?: string, slug?: string ) => {
		setAttributes( {
			accordionArrowColor: slug,
			customAccordionArrowColor: slug ? undefined : newColor,
		} );
		updateChildAttributes( {
			accordionArrowColor: slug,
			customAccordionArrowColor: slug ? undefined : newColor,
		} );
	};

	if ( ! isAccordion ) {
		return <></>;
	}

	return (
		<BaseControl
			id="faq-accordion-arrow-color"
			label={ __( '開閉ボタンの色', 'ystandard-toolbox' ) }
		>
			<ColorPalette
				label={ __( '開閉ボタンの色', 'ystandard-toolbox' ) }
				value={ customAccordionArrowColor || '' }
				slug={ accordionArrowColor }
				onChange={ handleOnChange }
			/>
		</BaseControl>
	);
}
