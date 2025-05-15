import { PanelBody } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import ResponsiveWidthControl from '@aktk/controls/responsive-width-control';
import ResponsiveHeightControl from '@aktk/controls/responsive-height-control';
import ResponsiveRatioControl from '@aktk/controls/responsive-ratio-control';

const PanelSize = ( { attributes, setAttributes } ) => {
	const { width, height, ratio } = attributes;
	const handleOnChangeWidth = ( newValue ) => {
		setAttributes( {
			width: newValue,
		} );
	};
	const handleOnChangeHeight = ( newValue ) => {
		setAttributes( {
			height: newValue,
		} );
	};
	const handleOnChangeRatio = ( newValue ) => {
		setAttributes( {
			ratio: newValue,
		} );
	};
	return (
		<PanelBody title={ __( 'サイズ', 'ystandard-blocks' ) }>
			<ResponsiveWidthControl
				label={ __( '横幅', 'ystandard-blocks' ) }
				onChange={ handleOnChangeWidth }
				values={ width }
			/>
			<ResponsiveHeightControl
				label={ __( '高さ', 'ystandard-blocks' ) }
				values={ height }
				onChange={ handleOnChangeHeight }
			/>
			<ResponsiveRatioControl
				label={ __( '縦横比', 'ystandard-blocks' ) }
				values={ ratio }
				onChange={ handleOnChangeRatio }
			/>
		</PanelBody>
	);
};

export default PanelSize;
