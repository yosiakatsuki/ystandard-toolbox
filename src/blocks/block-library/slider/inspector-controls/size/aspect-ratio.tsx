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
		name: __( '1:1', 'ystandard-toolbox' ),
		key: '1-1',
		style: {},
	},
	{
		name: __( '2:1', 'ystandard-toolbox' ),
		key: '2-1',
		style: {},
	},
	{
		name: __( '3:1', 'ystandard-toolbox' ),
		key: '3-1',
		style: {},
	},
	{
		name: __( '3:2', 'ystandard-toolbox' ),
		key: '3-2',
		style: {},
	},
	{
		name: __( '4:3', 'ystandard-toolbox' ),
		key: '4-3',
		style: {},
	},
	{
		name: __( '16:9', 'ystandard-toolbox' ),
		key: '16-9',
		style: {},
	},
	{
		name: __( '2:3', 'ystandard-toolbox' ),
		key: '2-3',
		style: {},
	},
	{
		name: __( '9:16', 'ystandard-toolbox' ),
		key: '9-16',
		style: {},
	},
];

export function AspectRatio( props: SliderEditProps ): JSX.Element {
	const { attributes, setAttributes } = props;
	const { ratio = '' } = attributes;

	const handleOnChange = ( value: string ) => {
		setAttributes( {
			ratio: value || undefined ,
			height: undefined,
			responsiveHeight: undefined,
		} );
	};

	return (
		<BaseControl
			id="slider-AspectRatio"
			label={ __( '縦横比', 'ystandard-toolbox' ) }
		>
			<CustomSelectControl
				value={ ratio || '' }
				onChange={ handleOnChange }
				options={ OPTIONS }
				useEmptyValue={ false }
			/>
		</BaseControl>
	);
}
