/**
 * WordPress
 */
import { __ } from '@wordpress/i18n';
/**
 * Aktk Dependencies
 */
import { BorderControl } from '@aktk/block-components/components/custom-border-select';
import type {
	FlatBorder,
	SplitBorders,
} from '@aktk/block-components/components/custom-border-select';
/**
 * Plugin Dependencies
 */
import BaseControl from '@aktk/plugin-settings/components/base-control';
import ClearButton from '@aktk/plugin-settings/components/clear-button';
import { getFlatValue } from '@aktk/block-components/utils/responsive-value';

interface BorderProps {
	value?: SplitBorders | FlatBorder;
	onChange: ( newValue: { border?: SplitBorders | FlatBorder } ) => void;
}

export default function Border( props: BorderProps ) {
	const { value, onChange } = props;

	// 枠線設定更新.
	const handleOnChange = (
		newValue: SplitBorders | FlatBorder | undefined
	) => {
		onChange( {
			border: getNewBorderOption( newValue ),
		} );
	};

	return (
		<BaseControl
			id={ 'border' }
			label={ __( '枠線', 'ystandard-toolbox' ) }
			isFullWidth={ true }
		>
			<BorderControl
				value={
					getFlatValue( value, undefined ) as unknown as
						| SplitBorders
						| FlatBorder
				}
				onChange={ handleOnChange }
			/>
			<ClearButton onClick={ () => handleOnChange( undefined ) } />
		</BaseControl>
	);
}

function getNewBorderOption(
	border?: SplitBorders | FlatBorder
): SplitBorders | FlatBorder | undefined {
	if ( ! border ) {
		return border;
	}
	// @ts-ignore
	if ( border?.color || border?.style || border?.width ) {
		return sanitizeBorder( border as FlatBorder );
	}

	// 上下左右の分割バージョン.
	Object.keys( border as SplitBorders ).forEach( ( key ) => {
		// @ts-ignore
		border[ key ] = sanitizeBorder( border[ key ] );
	} );

	return border;
}

function sanitizeBorder( border: FlatBorder ): FlatBorder {
	if ( border && border?.color && border?.width ) {
		if ( ! border?.style ) {
			// 色と幅のみの指定の場合はsolidを自動で設定する.
			border.style = 'solid';
		}
	}
	return border;
}
