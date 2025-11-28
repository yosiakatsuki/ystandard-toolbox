/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
/*
 * Aktk Dependencies
 */
import BaseControl from '@aktk/block-components/wp-controls/base-control';
import {
	CustomSelectControl,
	type CustomSelectControlOption,
} from '@aktk/block-components/components/custom-select-control';

/**
 * Block dependencies.
 */
/**
 * FAQブロックのボーダータイプ選択肢
 */
export const BORDER_TYPES: CustomSelectControlOption[] = [
	{ name: __( 'なし', 'ystandard-toolbox' ), key: '' },
	{ name: __( '上下左右', 'ystandard-toolbox' ), key: 'all' },
	{ name: __( '下のみ', 'ystandard-toolbox' ), key: 'bottom' },
];

// @ts-ignore
export function BorderType( props ): JSX.Element {
	const { attributes, setAttributes } = props;
	const { borderType } = attributes;

	const handleOnChange = ( value: string ) => {
		if ( value ) {
			setAttributes( {
				borderType: value,
			} );
		} else {
			setAttributes( {
				borderType: value,
				borderSize: undefined,
				borderColor: undefined,
			} );
		}
	};

	return (
		<BaseControl
			id="faq-border-type"
			label={ __( '枠線タイプ', 'ystandard-toolbox' ) }
		>
			<CustomSelectControl
				value={ borderType }
				options={ BORDER_TYPES }
				onChange={ handleOnChange }
				useEmptyValue={ false }
			/>
		</BaseControl>
	);
}
