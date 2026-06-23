/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
/*
 * Aktk Dependencies
 */
import BaseControl from '@aktk/block-components/wp-controls/base-control';
import UnitControl from '@aktk/block-components/wp-controls/unit-control';
import { ColorPalette } from '@aktk/block-components/components/color-pallet-control';
import {
	CustomSelectControl,
	type CustomSelectControlOption,
} from '@aktk/block-components/components/custom-select-control';
import { normalizeSizeValue } from '@aktk/block-components/utils/size';

/**
 * Block dependencies.
 */
const BORDER_TYPES: CustomSelectControlOption[] = [
	{ name: __( 'なし', 'ystandard-toolbox' ), key: '' },
	{ name: __( '下区切り線', 'ystandard-toolbox' ), key: 'bottom' },
];

// @ts-ignore.
export function ContentsBorder( props ): JSX.Element {
	const { attributes, setAttributes, faqBorderColor, setFaqBorderColor } =
		props;
	const { faqBorderType, faqBorderSize } = attributes;

	// 区切り線タイプ変更時の処理.
	const handleOnBorderTypeChange = ( value: string ) => {
		if ( ! value ) {
			setAttributes( { faqBorderType: value, faqBorderSize: undefined } );
			setFaqBorderColor( undefined );
		} else {
			setAttributes( { faqBorderType: value, faqBorderSize: '1px' } );
			setFaqBorderColor( '#eeeeee' );
		}
	};

	// 区切り線サイズ変更時の処理.
	const handleOnBorderSizeChange = ( value: string ) => {
		setAttributes( { faqBorderSize: normalizeSizeValue( value ) } );
	};

	return (
		<>
			<BaseControl
				id="faq-item-contents-border-type"
				label={ __( '区切り線タイプ', 'ystandard-toolbox' ) }
			>
				<CustomSelectControl
					value={ faqBorderType }
					options={ BORDER_TYPES }
					onChange={ handleOnBorderTypeChange }
					useEmptyValue={ false }
				/>
			</BaseControl>
			{ faqBorderType && (
				<>
					<BaseControl
						id="faq-item-contents-border-size"
						label={ __( '区切り線サイズ', 'ystandard-toolbox' ) }
					>
						<UnitControl
							value={ faqBorderSize }
							onChange={ handleOnBorderSizeChange }
							min={0}
						/>
					</BaseControl>
					<BaseControl
						id="faq-item-contents-border-color"
						label={ __( '区切り線色', 'ystandard-toolbox' ) }
					>
						<ColorPalette
							label={ __( '区切り線色', 'ystandard-toolbox' ) }
							value={ faqBorderColor?.color || '' }
							onChange={ setFaqBorderColor }
						/>
					</BaseControl>
				</>
			) }
		</>
	);
}
