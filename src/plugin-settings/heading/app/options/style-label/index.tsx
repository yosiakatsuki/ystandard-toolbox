/**
 * WordPress
 */
import { __ } from '@wordpress/i18n';
import { useContext } from '@wordpress/element';

/**
 * Aktk Components.
 */
import InputControl from '@aktk/block-components/wp-controls/input-control';

/**
 * Plugin Dependencies
 */
import { PluginSettingsPanel } from '@aktk/plugin-settings/components/panel';
/**
 * Types
 */
import type { HeadingOption } from '@aktk/plugin-settings/heading/types';

import { HeadingContext } from '../../index';

export default function StyleLabel() {
	// @ts-ignore
	const { headingOption, setHeadingOption, setIsEdit } =
		useContext( HeadingContext );

	const label = headingOption?.label;

	return (
		<PluginSettingsPanel
			title={ __( 'スタイル名', 'ystandard-toolbox' ) }
			initialOpen={ true }
		>
			<div>
				<InputControl
					label={ __( 'スタイル名', 'ystandard-toolbox' ) }
					value={ label || '' }
					onChange={ ( value ) => {
						setHeadingOption( {
							...headingOption,
							label: value,
						} as HeadingOption );
						setIsEdit( true );
					} }
				/>
			</div>
		</PluginSettingsPanel>
	);
}
