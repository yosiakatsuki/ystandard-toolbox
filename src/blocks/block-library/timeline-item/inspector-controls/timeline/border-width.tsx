/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
/*
 * Aktk Dependencies
 */
import BaseControl from '@aktk/block-components/wp-controls/base-control';
import UnitControl from '@aktk/block-components/wp-controls/unit-control';
/**
 * Block dependencies.
 */
import type { TimeLineItemProps } from '../../types';

export function BorderWidth( props: TimeLineItemProps ): JSX.Element {
	const { attributes, setAttributes } = props;
	const { contentsBorderSize } = attributes;

	const handleOnChange = ( value: string | number | boolean ) => {
		setAttributes( {
			contentsBorderSize: '' === value ? undefined : ( value as string ),
		} );
	};
	return (
		<BaseControl
			id="border-width"
			label={ __( '枠線の太さ', 'ystandard-toolbox' ) }
		>
			<UnitControl
				value={ contentsBorderSize }
				onChange={ handleOnChange }
				min={ 0 }
				placeholder="2px"
			/>
		</BaseControl>
	);
}
