/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
import { useState } from '@wordpress/element';
import { useDispatch } from '@wordpress/data';
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
	const { updateBlockAttributes } = useDispatch( 'core/block-editor' );
	const { updateChildAttributes, firstChildAttributes, innerBlockClientIds } =
		props;
	const [ labelType, setLabelType ] = useState< string | undefined >(
		firstChildAttributes?.labelType
	);
	// ラベルタイプ変更時の処理.
	const handleOnChange = ( value: string | number | boolean ) => {
		const defaultContents = 'icon' === value ? 'bookmark' : '';
		if ( 'text' === value ) {
			innerBlockClientIds.forEach( ( innerBlockClientId, index ) => {
				updateBlockAttributes( innerBlockClientId, {
					labelType: value || undefined,
					labelContents: ( index + 1 ).toString(),
				} );
			} );
		} else {
			updateChildAttributes( {
				labelType: value || undefined,
				labelContents: defaultContents,
			} );
		}
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
