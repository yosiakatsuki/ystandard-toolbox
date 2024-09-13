/**
 * WordPress
 */
import { __ } from '@wordpress/i18n';
import { useContext, useCallback } from '@wordpress/element';

/**
 * Plugin Dependencies
 */
import { PanelGroup, PanelInner } from './index';
import { PluginSettingsPanel } from '@aktk/plugin-settings/components/panel';

/**
 * Context
 */
import { HeadingContext } from '../../index';
import type { HeadingPseudoElementsStyle } from '@aktk/plugin-settings/heading/types';

/**
 * Controls.
 */
import {
	EnablePseudoElements,
	PseudoElementsContent,
} from '@aktk/plugin-settings/heading/app/options/pseudo-elements';

export function BeforePanel() {
	// @ts-ignore
	const { headingOption, setHeadingOption, setIsEdit } =
		useContext( HeadingContext );
	/**
	 * 設定反映
	 * @param newValue
	 * @param newValue.key
	 */
	const handleOnChange = ( newValue: { [ name: string ]: unknown } ) => {
		// @ts-ignore
		setHeadingOption( {
			...headingOption,
			before: {
				...headingOption?.before,
				...newValue,
			},
		} );
		setIsEdit( true );
	};

	const option = headingOption?.before;

	return (
		<PseudoElements
			panelName={ __( '::before設定', 'ystandard-toolbox' ) }
			option={ option }
			onChange={ handleOnChange }
			type={ 'before' }
		/>
	);
}

interface PseudoElementsProps {
	panelName: string;
	option: HeadingPseudoElementsStyle | undefined;
	onChange: ( newValue: { [ name: string ]: unknown } ) => void;
	type: 'before' | 'after';
}

function PseudoElements( props: PseudoElementsProps ) {
	const { panelName, option, onChange, type } = props;

	const isInitialOpen = useCallback(
		(
			panelOptions: HeadingPseudoElementsStyle | undefined,
			names: string[]
		) => {
			return names.some(
				( name ) => panelOptions?.hasOwnProperty( name )
			);
		},
		[]
	);

	return (
		<PluginSettingsPanel
			title={ panelName }
			initialOpen={ true }
			isNested={ true }
		>
			<EnablePseudoElements
				value={ option?.content }
				onChange={ onChange }
				type={ type }
			/>
			{ undefined !== option?.content && (
				<PanelGroup>
					<PluginSettingsPanel
						title={ 'content' }
						initialOpen={ true }
					>
						<PseudoElementsContent
							value={ option?.content }
							onChange={ onChange }
							type={ type }
						/>
					</PluginSettingsPanel>
				</PanelGroup>
			) }
		</PluginSettingsPanel>
	);
}
