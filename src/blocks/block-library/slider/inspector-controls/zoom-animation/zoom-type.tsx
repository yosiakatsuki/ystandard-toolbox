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
import type { SliderEditProps, ZoomAnimationType } from '../../types';

const OPTIONS = [
	{
		label: __( 'なし', 'ystandard-toolbox' ),
		value: '',
	},
	{
		label: __( 'ズームイン', 'ystandard-toolbox' ),
		value: 'in',
	},
	{
		label: __( 'ズームアウト', 'ystandard-toolbox' ),
		value: 'out',
	},
];

export function ZoomType( props: SliderEditProps ): JSX.Element {
	const { attributes, setAttributes } = props;
	const { zoomAnimation } = attributes;

	const handleOnChange = ( value: string ) => {
		setAttributes( {
			// 「なし」は値を保存しない.
			zoomAnimation: ( value as ZoomAnimationType ) || undefined,
		} );
	};

	return (
		<BaseControl
			id="slider-zoom-animation"
			label={ __( '種類', 'ystandard-toolbox' ) }
		>
			<RadioControl
				selected={ zoomAnimation ?? '' }
				options={ OPTIONS }
				onChange={ handleOnChange }
			/>
		</BaseControl>
	);
}
