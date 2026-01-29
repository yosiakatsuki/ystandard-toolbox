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
		label: __( 'なし', 'ystandard-blocks' ),
		value: '',
	},
	{
		label: __( 'ドット', 'ystandard-blocks' ),
		value: 'bullets',
	},
	{
		label: __( 'ダイナミック', 'ystandard-blocks' ),
		value: 'dynamicBullets',
	},
	{
		label: __( 'プログレスバー', 'ystandard-blocks' ),
		value: 'progressbar',
	},
	{
		label: __( 'スライド / 総スライド数', 'ystandard-blocks' ),
		value: 'fraction',
	},
];

export function PaginationType( props: SliderEditProps ): JSX.Element {
	const { attributes, setAttributes } = props;
	const { paginationType = '' } = attributes;

	const handleOnChange = ( value: string ) => {
		setAttributes( { paginationType: value || undefined } );
	};

	return (
		<BaseControl
			id="slider-paginationType"
			label={ __( 'ページネーションタイプ', 'ystandard-toolbox' ) }
		>
			<RadioControl
				selected={ paginationType }
				options={ OPTIONS }
				onChange={ handleOnChange }
			/>
		</BaseControl>
	);
}
