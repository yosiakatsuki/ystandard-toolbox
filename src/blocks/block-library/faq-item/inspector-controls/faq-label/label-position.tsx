/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
/*
 * Aktk Dependencies
 */
import BaseControl from '@aktk/block-components/wp-controls/base-control';
import { HorizonButtonSelect } from '@aktk/block-components/components/buttons';

// @ts-ignore.
export function LabelPosition( props ): JSX.Element {
	const { attributes, setAttributes } = props;
	const { labelPosition } = attributes;

	const handleOnChange = ( value: string ) => {
		setAttributes( { labelPosition: value } );
	};
	return (
		<BaseControl
			id="faq-item-label-position"
			label={ __( 'ラベル表示位置', 'ystandard-toolbox' ) }
		>
			<HorizonButtonSelect
				value={ labelPosition }
				// @ts-ignore
				onChange={ handleOnChange }
				options={ [
					{
						label: __( '上', 'ystandard-toolbox' ),
						value: 'flex-start',
					},
					{
						label: __( '中央', 'ystandard-toolbox' ),
						value: 'center',
					},
					{
						label: __( '下', 'ystandard-toolbox' ),
						value: 'flex-end',
					},
				] }
			/>
		</BaseControl>
	);
}
