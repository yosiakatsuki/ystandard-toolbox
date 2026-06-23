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

export function LabelSize( props: TimeLineItemProps ): JSX.Element {
	const { attributes, setAttributes } = props;
	const { labelSize } = attributes;

	const handleOnChange = ( value: string | number | boolean ) => {
		setAttributes( {
			labelSize: '' === value ? undefined : ( value as string ),
		} );
	};
	return (
		<BaseControl
			id="label-size"
			label={ __( 'ラベルサイズ（縦・横）', 'ystandard-toolbox' ) }
		>
			<UnitControl
				value={ labelSize }
				onChange={ handleOnChange }
				min={ 0 }
			/>
		</BaseControl>
	);
}
