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
export function ContentsBackgroundColor( props ): JSX.Element {
	const { faqBackgroundColor, setFaqBackgroundColor } = props;

	return (
		<BaseControl
			id="faq-item-contents-background-color"
			label={ __( '背景色', 'ystandard-toolbox' ) }
		>
			<ColorPalette
				label={ __( '背景色', 'ystandard-toolbox' ) }
				value={ faqBackgroundColor?.color || '' }
				onChange={ setFaqBackgroundColor }
			/>
		</BaseControl>
	);
}
