import { BaseControl, ToggleControl, PanelBody } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

const PanelStyle = ( props ) => {
	const { attributes, setAttributes } = props;

	const { isStackedOnMobile, isStackedOnTablet } = attributes;

	const isStackedOnMobileOnChange = ( value ) => {
		setAttributes( { isStackedOnMobile: value } );
	};
	const isStackedOnTabletOnChange = ( value ) => {
		setAttributes( { isStackedOnTablet: value } );
	};

	return (
		<PanelBody
			title={__( '横並び設定', 'ystandard-toolbox' )}
			initialOpen={true}
		>
			<BaseControl
				id={'isStackedOn'}
				label={__( '縦に並べるタイミング', 'ystandard-toolbox' )}
				__nextHasNoMarginBottom
			>
				<ToggleControl
					label={__(
						'モバイルで縦に並べる',
						'ystandard-toolbox'
					)}
					onChange={isStackedOnMobileOnChange}
					checked={isStackedOnMobile ?? true}
					__nextHasNoMarginBottom
				/>
				<ToggleControl
					label={__(
						'タブレットで縦に並べる',
						'ystandard-toolbox'
					)}
					onChange={isStackedOnTabletOnChange}
					checked={isStackedOnTablet ?? false}
					__nextHasNoMarginBottom
				/>
			</BaseControl>
		</PanelBody>
	);
};
export default PanelStyle;
