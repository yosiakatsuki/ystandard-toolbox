/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * Aktk Dependencies
 */
import { ResponsiveSelectTab } from '@aktk/block-components/components/tab-panel';
import type { ResponsiveValues } from '@aktk/block-components/types';
import { deleteUndefined } from '@aktk/block-components/utils/object';

/**
 * Plugin Dependencies
 */
import BaseControl from '@aktk/plugin-settings/components/base-control';
import ClearButton from '@aktk/plugin-settings/components/clear-button';
import { isResponsiveHeadingOption } from '@aktk/plugin-settings/heading/app/options/util';
import {
	DefaultSizeEdit,
	ResponsiveSizeEdit,
} from '@aktk/plugin-settings/heading/app/options/size/control';

interface MaxHeightControlProps {
	value: ResponsiveValues | undefined;
	onChange: ( newValue: { maxHeight?: ResponsiveValues } ) => void;
}

export default function MaxHeight( props: MaxHeightControlProps ) {
	const { value, onChange } = props;
	const handleOnChange = ( newValue: ResponsiveValues ) => {
		onChange( { maxHeight: deleteUndefined( newValue ) } );
	};

	return (
		<BaseControl
			id={ 'max-height' }
			label={ __( '最大高さ(max-height)', 'ystandard-toolbox' ) }
			isFullWidth={ true }
		>
			<ResponsiveSelectTab
				isResponsive={ isResponsiveHeadingOption( value ) }
				defaultTabContent={
					<DefaultSizeEdit
						value={ value?.desktop }
						onChange={ handleOnChange }
					/>
				}
				responsiveTabContent={
					<ResponsiveSizeEdit
						value={ value || {} }
						onChange={ handleOnChange }
					/>
				}
			/>
			<ClearButton
				onClick={ () => onChange( { maxHeight: undefined } ) }
			/>
		</BaseControl>
	);
}
