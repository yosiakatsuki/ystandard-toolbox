/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
/*
 * Aktk Dependencies
 */
import BaseControl from '@aktk/block-components/wp-controls/base-control';
import ToggleControl from '@aktk/block-components/wp-controls/toggle-control';

// @ts-ignore.
export function LabelWeight( props ): JSX.Element {
	const { attributes, setAttributes } = props;
	const { labelBold } = attributes;

	const handleOnChange = ( value: boolean ) => {
		setAttributes( {
			labelBold: value,
		} );
	};

	return (
		<BaseControl
			id="faq-item-label-weight"
			label={ __( 'FAQラベル表示位置', 'ystandard-toolbox' ) }
		>
			<ToggleControl
				label={ __( '太字にする', 'ystandard-toolbox' ) }
				checked={ labelBold }
				onChange={ handleOnChange }
			/>
		</BaseControl>
	);
}
