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
import CustomSpacingSelect, {
	type CustomSpacing,
} from '@aktk/block-components/components/custom-spacing-select';
import type { SpacingSizeValues } from '@aktk/block-components/wp-controls/spacing-size-control';
import { useThemeSpacingSizes } from '@aktk/block-components/hooks';
import { deleteUndefined } from '@aktk/block-components/utils/object';
/**
 * Plugin Dependencies
 */
import BaseControl from '@aktk/plugin-settings/components/base-control';
import { isResponsiveHeadingOption } from '@aktk/plugin-settings/heading/app/options/util';
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
					<DefaultPaddingEdit
						value={ value?.desktop }
						onChange={ handleOnChange }
						spacingSizes={ spacingSizes }
					/>
				}
				responsiveTabContent={
					<ResponsivePaddingEdit
						value={ value || {} }
						onChange={ handleOnChange }
						spacingSizes={ spacingSizes }
					/>
				}
			/>
		</BaseControl>
	);
}

export function DefaultPaddingEdit( props: {
	value: SpacingSizeValues | undefined;
	onChange: ( newValue: CustomSpacing ) => void;
	spacingSizes: object[];
} ) {
	const { value, onChange, spacingSizes } = props;
	const handleOnChange = ( newValue: SpacingSizeValues ) => {
		onChange( {
			desktop: newValue,
		} );
	};
	return (
		<CustomSpacingSelect.CustomValue
			label={ __( '内側余白', 'ystandard-toolbox' ) }
			values={ value }
			onChange={ handleOnChange }
			spacingSizes={ spacingSizes }
		/>
	);
}

export function ResponsivePaddingEdit( props: {
	value: CustomSpacing;
	onChange: ( newValue: CustomSpacing ) => void;
	spacingSizes: object[];
} ) {
	const { value, onChange, spacingSizes } = props;
	const handleOnChange = ( newValue: CustomSpacing ) => {
		onChange( {
			...value,
			...newValue,
		} );
	};
	return (
		<ResponsiveControlGrid customClassName={ { 'md:grid-cols-3': false } }>
			<div>
				<CustomSpacingSelect.CustomValue
					label={ __( 'デスクトップ', 'ystandard-toolbox' ) }
					values={ value?.desktop }
					onChange={ ( newValue: SpacingSizeValues ) => {
						handleOnChange( { desktop: newValue } );
					} }
					spacingSizes={ spacingSizes }
				/>
			</div>
			<div>
				<CustomSpacingSelect.CustomValue
					label={ __( 'タブレット', 'ystandard-toolbox' ) }
					values={ value?.tablet }
					onChange={ ( newValue: SpacingSizeValues ) => {
						handleOnChange( { tablet: newValue } );
					} }
					spacingSizes={ spacingSizes }
				/>
			</div>
			<div>
				<CustomSpacingSelect.CustomValue
					label={ __( 'スマートフォン', 'ystandard-toolbox' ) }
					values={ value?.mobile }
					onChange={ ( newValue: SpacingSizeValues ) => {
						handleOnChange( { mobile: newValue } );
					} }
					spacingSizes={ spacingSizes }
				/>
			</div>
		</ResponsiveControlGrid>
	);
}
