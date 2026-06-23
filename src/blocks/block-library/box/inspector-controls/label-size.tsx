/*
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';

/*
 * Aktk Dependencies
 */
import BaseControl from '@aktk/block-components/wp-controls/base-control';
import FontSizePicker from '@aktk/block-components/wp-controls/font-size-picker';

/*
 * Plugin Dependencies
 */
import type { BoxEditProps } from '../types';

interface LabelSizeProps {
	labelFontSize: BoxEditProps['labelFontSize'];
	setLabelFontSize: BoxEditProps['setLabelFontSize'];
}

/**
 * ラベル文字サイズコントロール
 * @param props
 */
const LabelSize = ( props: LabelSizeProps ): React.ReactElement => {
	const { labelFontSize, setLabelFontSize } = props;

	return (
		<BaseControl
			id="label-size"
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
};

export default LabelSize;
