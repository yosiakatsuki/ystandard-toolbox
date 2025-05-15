/**
 * WordPress.
 */
import { __ } from '@wordpress/i18n';
import { BaseControl, SelectControl } from '@wordpress/components';

const thumbnailRatioSelect = [
	{ label: __( '16-9', 'ystandard-toolbox' ), value: '16-9' },
	{ label: __( '4-3', 'ystandard-toolbox' ), value: '4-3' },
	{ label: __( '3-2', 'ystandard-toolbox' ), value: '3-2' },
	{ label: __( '3-1', 'ystandard-toolbox' ), value: '3-1' },
	{ label: __( '2-1', 'ystandard-toolbox' ), value: '2-1' },
	{ label: __( '1-1', 'ystandard-toolbox' ), value: '1-1' },
];

const Ratio = ( { attributes, setAttributes } ) => {
	const { thumbnailRatio } = attributes;
	const handleOnChange = ( newValue ) => {
		setAttributes( { thumbnailRatio: newValue } );
	};
	return (
		<BaseControl __nextHasNoMarginBottom>
			<SelectControl
				label={ __( '画像縦横比', 'ystandard-toolbox' ) }
				value={ thumbnailRatio }
				options={ thumbnailRatioSelect }
				onChange={ handleOnChange }
				__next40pxDefaultSize
				__nextHasNoMarginBottom
			/>
		</BaseControl>
	);
};
export default Ratio;
