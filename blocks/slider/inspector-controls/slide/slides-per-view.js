import { BaseControl, __experimentalNumberControl as NumberControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { getSlidesOption } from '../../function/slider-option';
import { setSlidesOption } from '../../function/edit';

const SlidesPerView = ( { type, attributes, setAttributes } ) => {
	const optionName = 'slidesPerView';
	const { slides } = attributes;
	const slidesPerView = getSlidesOption( slides, type, optionName );

	const handleOnChange = ( newValue ) => {
		const _newValue = parseFloat( newValue );
		setSlidesOption( {
			setAttributes,
			type,
			slides,
			newValue: { slidesPerView: !_newValue || '' === newValue ? undefined : _newValue},
		} );
	};

	return (
		<>
			<BaseControl
				id={'BaseControl'}
				label={__( '1画面に表示するスライド数', 'ystandard-toolbox' )}
				__nextHasNoMarginBottom
			>
				<NumberControl
					value={'auto' === slidesPerView ? undefined : slidesPerView}
					onChange={handleOnChange}
					min={0.0}
					max={10.0}
					step={"any"}
					__next40pxDefaultSize
					__nextHasNoMarginBottom
				/>
			</BaseControl>
		</>
	);
};

export default SlidesPerView;
