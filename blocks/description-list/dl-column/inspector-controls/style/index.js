import { BaseControl, ToggleControl, PanelBody } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import ResponsiveWidthControl from '@ystd/controls/responsive-width-control';
import BorderControl from '@ystd/controls/border-control';

const PanelStyle = ( props ) => {
	const { attributes, setAttributes } = props;

	const {
		isStackedOnMobile,
		isStackedOnTablet,
		dtWidth,
		border,
	} = attributes;

	const isStackedOnMobileOnChange = ( value ) => {
		setAttributes( { isStackedOnMobile: value } );
	};
	const isStackedOnTabletOnChange = ( value ) => {
		setAttributes( { isStackedOnTablet: value } );
	};

	const dtWidthOnChange = ( value ) => {
		setAttributes( { dtWidth: value } );
	};

	const borderOnChange = ( value ) => {
		setAttributes( { border: value } );
	};

	return (
		<PanelBody
			title={ __( 'スタイル設定', 'ystandard-toolbox' ) }
			initialOpen={ true }
		>
			<BaseControl
				id={ 'isStackedOn' }
				label={ __( '縦に並べるタイミング', 'ystandard-toolbox' ) }
			>
				<div>
					<ToggleControl
						label={ __(
							'モバイルで縦に並べる',
							'ystandard-toolbox'
						) }
						onChange={ isStackedOnMobileOnChange }
						checked={ isStackedOnMobile ?? true }
					/>
				</div>
				<div>
					<ToggleControl
						label={ __(
							'タブレットで縦に並べる',
							'ystandard-toolbox'
						) }
						onChange={ isStackedOnTabletOnChange }
						checked={ isStackedOnTablet ?? true }
					/>
				</div>
			</BaseControl>
			<ResponsiveWidthControl
				values={ dtWidth }
				label={ __( '説明(dt)の幅', 'ystandard-toolbox' ) }
				onChange={ dtWidthOnChange }
			/>
			<BorderControl
				label={ __( '枠線', 'ystandard-toolbox' ) }
				value={ border }
				onChange={ borderOnChange }
			/>
		</PanelBody>
	);
};
export default PanelStyle;
