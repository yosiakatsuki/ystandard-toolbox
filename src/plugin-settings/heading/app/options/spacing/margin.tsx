/**
 * WordPress
 */
import { __ } from '@wordpress/i18n';
/**
 * Aktk Dependencies
 */
import { ResponsiveSelectTab } from '@aktk/block-components/components/tab-panel';
import type { CustomSpacing } from '@aktk/block-components/components/custom-spacing-select';
import { useThemeSpacingSizes } from '@aktk/block-components/hooks';
import { deleteUndefined } from '@aktk/block-components/utils/object';
/**
 * Plugin Dependencies
 */
import BaseControl from '@aktk/plugin-settings/components/base-control';
import ClearButton from '@aktk/plugin-settings/components/clear-button';
import { isResponsiveHeadingOption } from '@aktk/plugin-settings/heading/app/options/util';
/**
 * Block.
 */
import { filterSpacingSizes } from './function';
import { DefaultSpacingEdit, ResponsiveSpacingEdit } from './control';

interface MarginControlProps {
	value: CustomSpacing | undefined;
	onChange: ( newValue: { margin?: CustomSpacing } ) => void;
}

export default function Margin( props: MarginControlProps ) {
	const { value, onChange } = props;
	const handleOnChange = ( newValue: CustomSpacing ) => {
		onChange( {
			margin: deleteUndefined( newValue ),
		} );
	};
	// 余白設定のフィルタ.
	const spacingSizes = useThemeSpacingSizes();
	filterSpacingSizes( spacingSizes );
	return (
		<BaseControl
			id={ 'margin' }
			label={ __( '外側余白(Margin)', 'ystandard-toolbox' ) }
			isFullWidth={ true }
			className={ '[&_.components-range-control]:hidden' }
		>
			<ResponsiveSelectTab
				isResponsive={ isResponsiveHeadingOption( value ) }
				defaultTabContent={
					<DefaultSpacingEdit
						value={ value?.desktop }
						onChange={ handleOnChange }
						spacingSizes={ spacingSizes }
						label={ __( '外側余白', 'ystandard-toolbox' ) }
					/>
				}
				responsiveTabContent={
					<ResponsiveSpacingEdit
						value={ value || {} }
						onChange={ handleOnChange }
						spacingSizes={ spacingSizes }
					/>
				}
			/>
			<ClearButton onClick={ () => onChange( { margin: undefined } ) } />
		</BaseControl>
	);
}
