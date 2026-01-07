/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
import { useState } from '@wordpress/element';
/*
 * Aktk Dependencies
 */
import BaseControl from '@aktk/block-components/wp-controls/base-control';
import { HorizonButtonSelect } from '@aktk/block-components/components/buttons';

/**
 * Block dependencies.
 */
import type { TimeLineInspectorProps } from '../../types';

const LABEL_TYPES = [
	{ label: __( 'なし', 'ystandard-toolbox' ), value: '' },
	{ label: __( 'アイコン', 'ystandard-toolbox' ), value: 'icon' },
	{ label: __( '連番', 'ystandard-toolbox' ), value: 'text' },
];

export function LabelType( props: TimeLineInspectorProps ): JSX.Element {
	const { updateChildAttributes, firstChildAttributes } = props;
	const [ labelType, setLabelType ] = useState< string | undefined >(
		firstChildAttributes?.labelType
	);
	const handleOnChange = ( value: string | number | boolean ) => {
		updateChildAttributes( {
			labelType: value || undefined,
		} );
		setLabelType( value as string );
	};

	return (
		<BaseControl
			id="label-type"
			label={ __( 'ラベルタイプ', 'ystandard-toolbox' ) }
		>
			<HorizonButtonSelect
				value={ labelType }
				options={ LABEL_TYPES }
				onChange={ handleOnChange }
			/>
		</BaseControl>
	);
}
