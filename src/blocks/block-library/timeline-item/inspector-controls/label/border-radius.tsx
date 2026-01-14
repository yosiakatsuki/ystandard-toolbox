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

export function BorderRadius( props: TimeLineItemProps ): JSX.Element {
	const { attributes, setAttributes } = props;
	const { labelBorderRadius } = attributes;

	const handleOnChange = ( value: string ) => {
		setAttributes( {
			labelBorderRadius: value || undefined,
		} );
	};

	return (
		<BaseControl
			id="border-radius"
			label={ __( '角丸', 'ystandard-toolbox' ) }
		>
			<UnitControl
				value={ labelBorderRadius }
				onChange={ handleOnChange }
				min={ 0 }
			/>
		</BaseControl>
	);
}
