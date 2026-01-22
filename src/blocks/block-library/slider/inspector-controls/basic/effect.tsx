/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
/*
 * Aktk Dependencies
 */
import BaseControl from '@aktk/block-components/wp-controls/base-control';
import RadioControl from '@aktk/block-components/wp-controls/radio-control';

/**
 * Block dependencies.
 */
import type { SliderEditProps } from '../../types';

const OPTIONS = [
	{
		label: __( 'スライド', 'ystandard-blocks' ),
		value: 'slide',
	},
	{
		label: __( 'フェード', 'ystandard-blocks' ),
		value: 'fade',
	},
	{
		label: __( 'カバー', 'ystandard-blocks' ),
		value: 'coverflow',
	},
	{
		label: __( 'キューブ', 'ystandard-blocks' ),
		value: 'cube',
	},
];

export function Effect( props: SliderEditProps ): JSX.Element {
	const { attributes, setAttributes } = props;
	const { effect = 'slide' } = attributes;

	const handleOnChange = ( value: string ) => {
		setAttributes( { effect: value } );
	};

	return (
		<BaseControl
			id="slider-effect"
			label={ __( 'エフェクト', 'ystandard-toolbox' ) }
		>
			<RadioControl
				className="ystdtb-slider-edit__effect-control"
				selected={ effect }
				options={ OPTIONS }
				onChange={ handleOnChange }
			/>
		</BaseControl>
	);
}
