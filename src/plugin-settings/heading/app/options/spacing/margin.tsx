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
/**
 * Block.
 */
import { DefaultSpacingEdit, ResponsiveSpacingEdit } from './control';

const SPACING_KEYS = [ 'top', 'right', 'bottom', 'left' ] as const;

interface MarginControlProps {
	value: Spacing | undefined;
	responsiveValue: ResponsiveSpacing | undefined;
	onChange: ( newValue: {
		margin?: Spacing;
		responsiveMargin?: ResponsiveSpacing;
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

export default function Margin( props: MarginControlProps ) {
	const { value, responsiveValue, onChange } = props;
	const handleDefaultChange = ( newValue: Spacing | undefined ) => {
		onChange( {
			margin: newValue,
			responsiveMargin: undefined,
		} );
	};
	const handleResponsiveChange = ( newValue: ResponsiveSpacing ) => {
		onChange( {
			margin: undefined,
			responsiveMargin: stripUndefined( newValue ),
		} );
	};
	const spacingSizes = useThemeSpacingSizes();

	return (
		<PluginSettingsBaseControl
			id={ 'margin' }
			label={ __( '外側余白(Margin)', 'ystandard-toolbox' ) }
			isFullWidth={ true }
			className={ 'ystdtb--plugin-settings--spacing-panel' }
		>
			<ResponsiveSelectTab
				isResponsive={ isResponsiveValue( responsiveValue ) }
				defaultTabContent={
					<DefaultSpacingEdit
						value={ getDefaultSpacingValue( value ) }
						onChange={ handleDefaultChange }
						spacingSizes={ spacingSizes }
						label={ __( '外側余白', 'ystandard-toolbox' ) }
						minimumCustomValue={ -9999 }
					/>
				}
				responsiveTabContent={
					<ResponsiveSpacingEdit
						value={ responsiveValue || {} }
						onChange={ handleResponsiveChange }
						spacingSizes={ spacingSizes }
						minimumCustomValue={ -9999 }
					/>
				}
			/>
			<ClearButton
				onClick={ () =>
					onChange( {
						margin: undefined,
						responsiveMargin: undefined,
					} )
				}
			/>
		</PluginSettingsBaseControl>
	);
}
