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
import { isResponsiveHeadingOption } from '@aktk/plugin-settings/heading/app/options/util';
import { DefaultSpacingEdit, ResponsiveSpacingEdit } from './control';
import { filterSpacingSizes } from './function';

interface PaddingControlProps {
	value: CustomSpacing | undefined;
	onChange: ( newValue: { padding: CustomSpacing } ) => void;
}

export default function Padding( props: PaddingControlProps ) {
	const { value, onChange } = props;
	const handleOnChange = ( newValue: CustomSpacing ) => {
		onChange( {
			padding: deleteUndefined( newValue ),
		} );
	};
	// 余白設定のフィルタ.
	const spacingSizes = useThemeSpacingSizes();
	filterSpacingSizes( spacingSizes );
	return (
		<BaseControl
			id={ 'padding' }
			label={ __( '内側余白(Padding)', 'ystandard-toolbox' ) }
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
						label={ __( '内側余白', 'ystandard-toolbox' ) }
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
		</BaseControl>
	);
}
