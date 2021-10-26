import {
	BaseControl,
} from '@wordpress/components';
import {
	PlainText,
} from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';

const LabelText = ( props ) => {

	const {
		attributes,
		setAttributes,
	} = props;

	const {
		label,
	} = attributes;

	return (
		<BaseControl
			id={ 'label' }
			label={ __( 'ラベルテキスト', 'ystandard-toolbox' ) }
		>
			<PlainText
				value={ label }
				onChange={ ( value ) => {
					setAttributes( {
						label: value,
					} );
				} }
				placeholder={ __( 'ラベルを入力...', 'ystandard-toolbox' ) }
				aria-label={ __( 'ラベルを入力...', 'ystandard-toolbox' ) }
			/>
		</BaseControl>
	);
}

export default LabelText;
