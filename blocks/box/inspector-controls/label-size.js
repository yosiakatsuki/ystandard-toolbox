import {
	BaseControl,
} from '@wordpress/components';
import {
	FontSizePicker,
} from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';

const LabelSize = ( props ) => {

	const {
		labelFontSize,
		setLabelFontSize,
	} = props;

	return (
		<BaseControl
			id={ 'label-size' }
			label={ __( '文字サイズ', 'ystandard-toolbox' ) }
		>
			<FontSizePicker
				value={ labelFontSize.size }
				onChange={ ( font ) => {
					setLabelFontSize( font );
				} }
			/>
		</BaseControl>
	);
}

export default LabelSize;
