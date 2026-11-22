/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
/*
 * Aktk Dependencies
 */
import BaseControl from '@aktk/block-components/wp-controls/base-control';
import { CustomSelectControl } from '@aktk/block-components/components/custom-select-control';

/**
 * Block dependencies.
 */
import type { SliderEditProps } from '../../types';

// 「指定なし」はCSS側でlinearになる. スライド効果とは「指定なし」の意味が違うため、選択肢を分ける.
const OPTIONS = [
	{
		name: __( '指定なし', 'ystandard-toolbox' ),
		key: '',
		style: {},
	},
	{
		name: __( 'ease', 'ystandard-toolbox' ),
		key: 'ease',
		style: {},
	},
	{
		name: __( 'ease-in', 'ystandard-toolbox' ),
		key: 'ease-in',
		style: {},
	},
	{
		name: __( 'ease-out', 'ystandard-toolbox' ),
		key: 'ease-out',
		style: {},
	},
	{
		name: __( 'ease-in-out', 'ystandard-toolbox' ),
		key: 'ease-in-out',
		style: {},
	},
];

export function ZoomEasing( props: SliderEditProps ): JSX.Element {
	const { attributes, setAttributes } = props;
	const { zoomAnimationEasing } = attributes;

	const handleOnChange = ( value: string ) => {
		// 「指定なし」は値を保存しない.
		setAttributes( { zoomAnimationEasing: value || undefined } );
	};

	return (
		<BaseControl
			id="slider-zoom-animation-easing"
			label={ __( '動き方', 'ystandard-toolbox' ) }
		>
			<CustomSelectControl
				value={ zoomAnimationEasing || '' }
				onChange={ handleOnChange }
				options={ OPTIONS }
				useEmptyValue={ false }
			/>
		</BaseControl>
	);
}
