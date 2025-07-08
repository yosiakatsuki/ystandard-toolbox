import { BaseControl, RangeControl, __experimentalNumberControl as NumberControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { getSlidesOption } from '../../function/slider-option';
import { setSlidesOption } from '../../function/edit';

const SlidesPerGroup = ( { type, attributes, setAttributes } ) => {
	const optionName = 'slidesPerGroup';
	const { slides } = attributes;
	const slidesPerGroup = getSlidesOption( slides, type, optionName );

	const handleOnChange = ( newValue ) => {
		const _newValue = parseFloat( newValue );
		setSlidesOption( {
			setAttributes,
			type,
			slides,
			newValue: { slidesPerGroup: !_newValue || '' === newValue ? undefined : _newValue },
		} );
	};

	return (
		<BaseControl
			id={'BaseControl'}
			label={__( 'グループ化するスライド数', 'ystandard-toolbox' )}
			__nextHasNoMarginBottom
		>
			<NumberControl
				value={slidesPerGroup}
				onChange={handleOnChange}
				min={0}
				max={10.0}
				step={"any"}
				__next40pxDefaultSize
				__nextHasNoMarginBottom
			/>
		</BaseControl>
	);
};

export default SlidesPerGroup;
