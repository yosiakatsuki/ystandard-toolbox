/**
 * WordPress
 */
import { __ } from '@wordpress/i18n';

/**
 * Plugin Dependencies
 */
import type { ResponsiveValues } from '@aktk/block-components/types';
import { deleteUndefined } from '@aktk/block-components/utils/object';
/**
 * Internal Dependencies
 */
import { AdvancedResponsiveSelectControl } from './controls';
import { isUseFlex } from '@aktk/plugin-settings/heading/app/options/advanced/utils';

interface FlexDirectionProps {
	value: string | undefined;
	responsiveValue: ResponsiveValues | undefined;
	displayValue: string | undefined;
	responsiveDisplayValue: ResponsiveValues | undefined;
	onChange: ( newValue: {
		flexDirection?: string;
		responsiveFlexDirection?: ResponsiveValues;
	} ) => void;
}

const SELECT_OPTIONS = [
	{
		key: 'row',
		name: __( 'row', 'ystandard-toolbox' ),
	},
	{
		key: 'row-reverse',
		name: __( 'row-reverse', 'ystandard-toolbox' ),
	},
	{
		key: 'column',
		name: __( 'column', 'ystandard-toolbox' ),
	},
	{
		key: 'column-reverse',
		name: __( 'column-reverse', 'ystandard-toolbox' ),
	},
];

export default function FlexDirection( props: FlexDirectionProps ) {
	const {
		value,
		responsiveValue,
		onChange,
		displayValue,
		responsiveDisplayValue,
	} = props;
	// 単一値モード: 単一値を更新、レスポンシブは削除.
	const handleDefaultChange = ( newValue: string | undefined ) => {
		onChange( {
			flexDirection: newValue,
			responsiveFlexDirection: undefined,
		} );
	};
	// レスポンシブモード: レスポンシブを更新、単一値は削除.
	const handleResponsiveChange = ( newValue: ResponsiveValues ) => {
		onChange( {
			flexDirection: undefined,
			responsiveFlexDirection: deleteUndefined( newValue ),
		} );
	};
	// flex が選択されていない場合は非表示（単一値モード or レスポンシブモードで判定）.
	const isFlex =
		displayValue === 'flex' ||
		displayValue === 'inline-flex' ||
		isUseFlex( responsiveDisplayValue );
	if ( ! isFlex ) {
		return <></>;
	}
	return (
		<AdvancedResponsiveSelectControl
			id={ 'flex-direction' }
			label={ __( 'flex-direction', 'ystandard-toolbox' ) }
			value={ value }
			responsiveValue={ responsiveValue }
			onDefaultChange={ handleDefaultChange }
			onResponsiveChange={ handleResponsiveChange }
			onClear={ () =>
				onChange( {
					flexDirection: undefined,
					responsiveFlexDirection: undefined,
				} )
			}
			options={ SELECT_OPTIONS }
		/>
	);
}
