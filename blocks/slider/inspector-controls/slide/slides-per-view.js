import { BaseControl, __experimentalNumberControl as NumberControl, ToggleControl } from '@wordpress/components';
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

	const handleOnChangeToggle = ( newValue ) => {
		setSlidesOption( {
			setAttributes,
			type,
			slides,
			newValue: { slidesPerView: !newValue ? undefined : 'auto' },
		} );
	};

	return (
		<div style={{ marginBottom: '40px' }}>
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
			<BaseControl
				__nextHasNoMarginBottom
			>
				<ToggleControl
					label={__(
						'"auto"を指定する（上級者向け）',
						'ystandard-toolbox'
					)}
					onChange={handleOnChangeToggle}
					checked={'auto' === slidesPerView}
					__nextHasNoMarginBottom
				/>
			</BaseControl>
		</div>
	);
};

export default SlidesPerView;
