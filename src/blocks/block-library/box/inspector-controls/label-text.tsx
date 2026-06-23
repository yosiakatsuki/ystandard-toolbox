/*
 * WordPress Dependencies
 */
import { PlainText } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';

/*
 * Aktk Dependencies
 */
import BaseControl from '@aktk/block-components/wp-controls/base-control';

/*
 * Plugin Dependencies
 */
import type { BoxAttributes } from '../types';

interface LabelTextProps {
	attributes: BoxAttributes;
	setAttributes: ( attributes: Partial< BoxAttributes > ) => void;
}

/**
 * ラベルテキストコントロール
 * @param props
 */
const LabelText = ( props: LabelTextProps ): React.ReactElement => {
	const { attributes, setAttributes } = props;

	const { label } = attributes;

	return (
		<BaseControl
			id="label"
			label={ __( 'ラベルテキスト', 'ystandard-toolbox' ) }
		>
			<PlainText
				value={ label }
				onChange={ ( value ) => {
					setAttributes( {
						label: value,
					} );
				} }
				placeholder={ __( 'ラベルを入力…', 'ystandard-toolbox' ) }
				aria-label={ __( 'ラベルを入力…', 'ystandard-toolbox' ) }
			/>
		</BaseControl>
	);
};

export default LabelText;
