import { BaseControl, ToggleControl, PanelBody } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import ResponsiveWidthControl from "@ystdtb/controls/responsive-width-control";

const PanelStyle = ( props ) => {
	const {
		attributes,
		setAttributes
	} = props;

	const {
		isStackedOnMobile,
		isStackedOnTablet,
		dtWidth,
	} = attributes;

	const isStackedOnMobileOnChange = ( value ) => {
		setAttributes( { isStackedOnMobile: value } );
	};
	const isStackedOnTabletOnChange = ( value ) => {
		setAttributes( { isStackedOnTablet: value } );
	};

	const dtWidthOnChange = ( value ) => {
		setAttributes( { dtWidth: value } );
	}

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
						label={ __( 'モバイルで縦に並べる', 'ystandard-toolbox' ) }
						onChange={ isStackedOnMobileOnChange }
						checked={ isStackedOnMobile ?? true }
					/>
				</div>
				<div>
					<ToggleControl
						label={ __( 'タブレットで縦に並べる', 'ystandard-toolbox' ) }
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
		</PanelBody>
	);
};
export default PanelStyle;
