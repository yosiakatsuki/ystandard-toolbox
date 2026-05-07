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
import { isUseFlex } from './utils';

interface ResponsiveDisplayProps {
	value: string | undefined;
	responsiveValue: ResponsiveValues | undefined;
	onChange: ( newValue: {
		display?: string;
		responsiveDisplay?: ResponsiveValues;
		flexDirection?: string;
		responsiveFlexDirection?: ResponsiveValues;
		alignItems?: string;
		responsiveAlignItems?: ResponsiveValues;
		justifyContent?: string;
		responsiveJustifyContent?: ResponsiveValues;
		gap?: string;
		responsiveGap?: ResponsiveValues;
	} ) => void;
}

const SELECT_OPTIONS = [
	{
		key: 'block',
		name: __( 'block', 'ystandard-toolbox' ),
	},
	{
		key: 'inline',
		name: __( 'inline', 'ystandard-toolbox' ),
	},
	{
		key: 'inline-block',
		name: __( 'inline-block', 'ystandard-toolbox' ),
	},
	{
		key: 'flex',
		name: __( 'flex', 'ystandard-toolbox' ),
	},
	{
		key: 'inline-flex',
		name: __( 'inline-flex', 'ystandard-toolbox' ),
	},
];

// flex 関連のサブプロパティを全部クリアする更新オブジェクト.
const clearFlexRelated = {
	flexDirection: undefined,
	responsiveFlexDirection: undefined,
	alignItems: undefined,
	responsiveAlignItems: undefined,
	justifyContent: undefined,
	responsiveJustifyContent: undefined,
	gap: undefined,
	responsiveGap: undefined,
};

export function ResponsiveDisplay( props: ResponsiveDisplayProps ) {
	const { value, responsiveValue, onChange } = props;
	// 単一値モード: 単一値を更新、レスポンシブは削除.
	const handleDefaultChange = ( newValue: string | undefined ) => {
		const isFlex =
			newValue === 'flex' || newValue === 'inline-flex';
		onChange( {
			display: newValue,
			responsiveDisplay: undefined,
			...( isFlex ? {} : clearFlexRelated ),
		} );
	};
	// レスポンシブモード: レスポンシブを更新、単一値は削除.
	const handleResponsiveChange = ( newValue: ResponsiveValues ) => {
		const cleanedValue = deleteUndefined( newValue );
		onChange( {
			display: undefined,
			responsiveDisplay: cleanedValue,
			...( isUseFlex( cleanedValue ) ? {} : clearFlexRelated ),
		} );
	};
	return (
		<AdvancedResponsiveSelectControl
			id={ 'display' }
			label={ __( 'display', 'ystandard-toolbox' ) }
			value={ value }
			responsiveValue={ responsiveValue }
			onDefaultChange={ handleDefaultChange }
			onResponsiveChange={ handleResponsiveChange }
			onClear={ () =>
				onChange( {
					display: undefined,
					responsiveDisplay: undefined,
					...clearFlexRelated,
				} )
			}
			options={ SELECT_OPTIONS }
		/>
	);
}
