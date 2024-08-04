/**
 * WordPress
 */
import { __ } from '@wordpress/i18n';

/**
 * Aktk Dependencies
 */
import {
	ResponsiveSelectTab,
	ResponsiveControlGrid,
} from '@aktk/block-components/components/tab-panel';
import type { ResponsiveValues } from '@aktk/block-components/types';
import { deleteUndefined } from '@aktk/block-components/utils/object';
import { IconUnitControl } from '@aktk/block-components/components/icon-control';
/**
 * Plugin Dependencies
 */
import BaseControl from '@aktk/plugin-settings/components/base-control';
import { isResponsiveHeadingOption } from '@aktk/plugin-settings/heading/app/options/util';

interface BorderRadiusControlProps {
	value: ResponsiveValues | undefined;
	onChange: ( newValue: { borderRadius: ResponsiveValues } ) => void;
}

export default function BorderRadius( props: BorderRadiusControlProps ) {
	const { value, onChange } = props;
	const handleOnChange = ( newValue: ResponsiveValues ) => {
		onChange( {
			borderRadius: deleteUndefined( newValue ),
		} );
	};
	return (
		<BaseControl
			id={ 'border-radius' }
			label={ __( '角丸', 'ystandard-toolbox' ) }
			isFullWidth={ true }
		>
			<ResponsiveSelectTab
				isResponsive={ isResponsiveHeadingOption( value ) }
				defaultTabContent={
					<DefaultBorderRadiusEdit
						value={ value?.desktop }
						onChange={ handleOnChange }
					/>
				}
				responsiveTabContent={
					<ResponsiveBorderRadiusEdit
						value={ value || {} }
						onChange={ handleOnChange }
					/>
				}
			/>
		</BaseControl>
	);
}

export function DefaultBorderRadiusEdit( props: {
	value: string | undefined;
	onChange: ( newValue: ResponsiveValues ) => void;
} ) {
	const { value, onChange } = props;
	const handleOnChange = ( newValue: string ) => {
		onChange( {
			desktop: '' === newValue ? undefined : newValue,
			tablet: undefined,
			mobile: undefined,
		} );
	};
	return <IconUnitControl value={ value } onChange={ handleOnChange } />;
}

export function ResponsiveBorderRadiusEdit( props: {
	value: ResponsiveValues;
	onChange: ( newValue: ResponsiveValues ) => void;
} ) {
	const { value, onChange } = props;
	const handleOnChange = ( newValue: ResponsiveValues ) => {
		onChange( {
			...value,
			...newValue,
		} );
	};
	return (
		<ResponsiveControlGrid>
			<div>
				<IconUnitControl.Desktop
					value={ value.desktop }
					onChange={ ( newValue: string ) =>
						handleOnChange( { desktop: newValue || undefined } )
					}
				/>
			</div>
			<div>
				<IconUnitControl.Tablet
					value={ value.tablet }
					onChange={ ( newValue: string ) =>
						handleOnChange( { tablet: newValue || undefined } )
					}
				/>
			</div>
			<div>
				<IconUnitControl.Mobile
					value={ value.mobile }
					onChange={ ( newValue: string ) =>
						handleOnChange( { mobile: newValue || undefined } )
					}
				/>
			</div>
		</ResponsiveControlGrid>
	);
}
