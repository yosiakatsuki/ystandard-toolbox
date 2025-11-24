/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
/*
 * Aktk Dependencies
 */
import BaseControl from '@aktk/block-components/wp-controls/base-control';
import { ColorPalette } from '@aktk/block-components/components/color-pallet-control';

// @ts-ignore.
export function ContentsColor( props ): JSX.Element {
	const { faqTextColor, setFaqTextColor } = props;

	return (
		<BaseControl
			id="faq-item-contents-color"
			label={ __( '文字色', 'ystandard-toolbox' ) }
		>
			<ColorPalette
				label={ __( '文字色', 'ystandard-toolbox' ) }
				value={ faqTextColor?.color || '' }
				onChange={ setFaqTextColor }
			/>
		</BaseControl>
	);
}
