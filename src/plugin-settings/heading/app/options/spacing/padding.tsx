/**
 * WordPress
 */
import { __ } from '@wordpress/i18n';
/**
 * Aktk Dependencies
 */
import { ResponsiveSelectTab } from '@aktk/block-components/components/tab-panel';
import type {
	Spacing,
	ResponsiveSpacing,
} from '@aktk/block-components/components/custom-spacing-select';
import { useThemeSpacingSizes } from '@aktk/block-components/hooks';
import { stripUndefined } from '@aktk/block-components/utils/object';
import { isResponsiveValue } from '@aktk/block-components/utils/responsive-value';

/**
 * Plugin Dependencies
 */
import PluginSettingsBaseControl from '@aktk/plugin-settings/components/base-control';
import ClearButton from '@aktk/plugin-settings/components/clear-button';
import { DefaultSpacingEdit, ResponsiveSpacingEdit } from './control';
import { filterSpacingSizes } from './function';

const SPACING_KEYS = [ 'top', 'right', 'bottom', 'left' ] as const;

interface PaddingControlProps {
	value: Spacing | undefined;
	responsiveValue: ResponsiveSpacing | undefined;
	onChange: ( newValue: {
		padding?: Spacing;
		responsivePadding?: ResponsiveSpacing;
	} ) => void;
}

function getDefaultSpacingValue( value: Spacing | undefined ) {
	if ( ! value ) {
		return undefined;
	}
	const result = SPACING_KEYS.reduce< Spacing >( ( spacing, key ) => {
		if ( value.hasOwnProperty( key ) ) {
			spacing[ key ] = value[ key ];
		}
		return spacing;
	}, {} );
	if ( 0 < Object.keys( result ).length ) {
		return result;
	}
	if ( 'desktop' in value ) {
		return ( value as unknown as ResponsiveSpacing ).desktop;
	}
	return undefined;
}

export default function Padding( props: PaddingControlProps ) {
	const { value, responsiveValue, onChange } = props;
	const handleDefaultChange = ( newValue: Spacing | undefined ) => {
		onChange( {
			padding: newValue,
			responsivePadding: undefined,
		} );
	};
	const handleResponsiveChange = ( newValue: ResponsiveSpacing ) => {
		onChange( {
			padding: undefined,
			responsivePadding: stripUndefined( newValue ),
		} );
	};
	// 余白設定のフィルタ.
	const spacingSizes = useThemeSpacingSizes();
	filterSpacingSizes( spacingSizes );
	return (
		<PluginSettingsBaseControl
			id={ 'padding' }
			label={ __( '内側余白(Padding)', 'ystandard-toolbox' ) }
			isFullWidth={ true }
			className={ '[&_.components-range-control]:hidden' }
		>
			<ResponsiveSelectTab
				isResponsive={ isResponsiveValue( responsiveValue ) }
				defaultTabContent={
					<DefaultSpacingEdit
						value={ getDefaultSpacingValue( value ) }
						onChange={ handleDefaultChange }
						spacingSizes={ spacingSizes }
						label={ __( '内側余白', 'ystandard-toolbox' ) }
					/>
				}
				responsiveTabContent={
					<ResponsiveSpacingEdit
						value={ responsiveValue || {} }
						onChange={ handleResponsiveChange }
						spacingSizes={ spacingSizes }
					/>
				}
			/>
			<ClearButton
				onClick={ () =>
					onChange( {
						padding: undefined,
						responsivePadding: undefined,
					} )
				}
			/>
		</PluginSettingsBaseControl>
	);
}
