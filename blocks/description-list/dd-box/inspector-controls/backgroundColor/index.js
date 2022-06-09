import { PanelBody } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import BackgroundColorControl from '@aktk/controls/background-color-control';

const PanelBackgroundColor = ( props ) => {
	const { backgroundColor, setBackgroundColor } = props;
	return (
		<PanelBody
			title={ __( '背景色', 'ystandard-toolbox' ) }
			initialOpen={ true }
		>
			<BackgroundColorControl
				value={ backgroundColor }
				onChange={ setBackgroundColor }
			/>
		</PanelBody>
	);
};
export default PanelBackgroundColor;
