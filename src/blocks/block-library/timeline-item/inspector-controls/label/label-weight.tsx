/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
/*
 * Aktk Dependencies
 */
import BaseControl from '@aktk/block-components/wp-controls/base-control';
import ToggleControl from '@aktk/block-components/wp-controls/toggle-control';

/**
 * Block dependencies.
 */
import type { TimeLineItemProps } from '../../types';

export function LabelWeight( props: TimeLineItemProps ): JSX.Element {
	const { attributes, setAttributes } = props;
	const { labelType, labelBold } = attributes;

	if ( 'text' !== labelType ) {
		return <></>;
	}

	const handleOnChange = ( value: boolean ) => {
		setAttributes( {
			labelBold: value || undefined,
		} );
	};

	return (
		<BaseControl
			id="label-weight"
			label={ __( 'ラベル太さ', 'ystandard-toolbox' ) }
		>
			<ToggleControl
				checked={ labelBold }
				onChange={ handleOnChange }
				label={ __( '太字にする', 'ystandard-toolbox' ) }
			/>
		</BaseControl>
	);
}
