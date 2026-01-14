/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
/*
 * Aktk Dependencies
 */
import BaseControl from '@aktk/block-components/wp-controls/base-control';
import InputControl from '@aktk/block-components/wp-controls/input-control';

/**
 * Block dependencies.
 */
import type { TimeLineItemProps } from '../../types';

export function LabelText( props: TimeLineItemProps ): JSX.Element {
	const { attributes, setAttributes } = props;
	const { labelType, labelContents } = attributes;

	if ( 'text' !== labelType ) {
		return <></>;
	}

	const handleOnChange = ( value?: string ) => {
		setAttributes( {
			labelContents: ( value as string ) || undefined,
		} );
	};

	return (
		<BaseControl
			id="label-text"
			label={ __( 'テキスト', 'ystandard-toolbox' ) }
		>
			<InputControl
				value={ labelContents || '' }
				label=""
				onChange={ handleOnChange }
				placeholder={ __( 'テキスト', 'ystandard-toolbox' ) }
			/>
		</BaseControl>
	);
}
