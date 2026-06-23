/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
/*
 * Aktk Dependencies
 */
import BaseControl from '@aktk/block-components/wp-controls/base-control';
import { HorizonButtonSelect } from '@aktk/block-components/components/buttons';

/**
 * Block dependencies.
 */
import type { TimeLineItemProps } from '../../types';

const LABEL_TYPES = [
	{ label: __( 'なし', 'ystandard-toolbox' ), value: '' },
	{ label: __( 'アイコン', 'ystandard-toolbox' ), value: 'icon' },
	{ label: __( 'テキスト', 'ystandard-toolbox' ), value: 'text' },
];

export function LabelType( props: TimeLineItemProps ): JSX.Element {
	const { attributes, setAttributes } = props;
	const { labelType } = attributes;

	const handleOnChange = ( value: string | number | boolean ) => {
		if ( value === labelType ) {
			return;
		}
		const defaultContents = 'icon' === value ? 'bookmark' : '';

		setAttributes( {
			labelType: ( value as string ) || undefined,
			labelContents: defaultContents || undefined,
		} );
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
