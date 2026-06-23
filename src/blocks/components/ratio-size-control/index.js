import { __ } from '@wordpress/i18n';
import { SelectControl } from '@wordpress/components';
import { getComponentConfig } from '@aktk/helper/config';

/**
 * @param {Object}   props
 * @param {string}   props.label
 * @param {string}   props.value
 * @param {Function} props.onChange
 * @param {Object}   props.options
 * @deprecated
 */
const RatioSizeControl = ( {
	label,
	value,
	onChange,
	options = undefined,
} ) => {
	const _options = options ?? [
		{ value: '', label: __( '指定なし', 'ystandard-toolbox' ) },
		{ value: '1-1', label: '1-1' },
		{ value: '2-1', label: '2-1' },
		{ value: '3-1', label: '3-1' },
		{ value: '3-2', label: '3-2' },
		{ value: '4-3', label: '4-3' },
		{ value: '16-9', label: '16-9' },
	];

	const handleOnChange = ( newValue ) => {
		onChange( !! newValue ? newValue : undefined );
	};
	return (
		<div className="ystdtb-component-ratio-size-control">
			<SelectControl
				label={ label }
				value={ value }
				onChange={ handleOnChange }
				options={ _options }
				__next40pxDefaultSize
				__nextHasNoMarginBottom
			/>
		</div>
	);
};
export default RatioSizeControl;
