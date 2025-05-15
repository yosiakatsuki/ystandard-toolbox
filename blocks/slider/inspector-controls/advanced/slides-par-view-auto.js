import { BaseControl, ToggleControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import ResponsiveTab from '@ystd/components/responsive-tab';
import { getSlidesOption } from '../../function/slider-option';
import { setSlidesOption } from '../../function/edit';

const SlidesPerViewAuto = ( { attributes, setAttributes } ) => {
	const optionName = 'slidesPerView';
	const { slides } = attributes;
	const handleOnChangeToggle = ( newValue, type ) => {
		setSlidesOption( {
			setAttributes,
			type,
			slides,
			newValue: { slidesPerView: !newValue ? undefined : 'auto' },
		} );
	};

	return (
		<>
			<BaseControl
				id={'slides-par-view-auto'}
				label={__( '1画面に表示するスライド数(slidesParView)', 'ystandard-toolbox' )}
				__nextHasNoMarginBottom
			>
				<ResponsiveTab>
					{( tab ) => {
						const type = tab.name;
						const slidesPerView = getSlidesOption( slides, type, optionName );
						return (
							<ToggleControl
								label={__(
									'"auto"を指定する',
									'ystandard-toolbox'
								)}
								onChange={( value ) => {
									handleOnChangeToggle(
										value,
										type
									);
								}}
								checked={'auto' === slidesPerView}
								__nextHasNoMarginBottom
							/>
						);
					}}
				</ResponsiveTab>

			</BaseControl>
		</>
	);
};

export default SlidesPerViewAuto;
