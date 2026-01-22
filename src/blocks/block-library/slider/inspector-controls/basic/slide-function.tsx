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
		name: __( 'linear', 'ystandard-toolbox' ),
		key: 'linear',
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

export function SlideFunction( props: SliderEditProps ): JSX.Element {
	const { attributes, setAttributes } = props;
	const { slideFunction } = attributes;

	const handleOnChange = ( value: string ) => {
		setAttributes( { slideFunction: value } );
	};

	return (
		<BaseControl
			id="slider-slide-function"
			label={ __( 'スライド効果', 'ystandard-toolbox' ) }
		>
			<CustomSelectControl
				value={ slideFunction || '' }
				onChange={ handleOnChange }
				options={ OPTIONS }
				useEmptyValue={ false }
			/>
		</BaseControl>
	);
}
