/**
 * WordPress
 */
import { PanelBody, BaseControl } from '@wordpress/components';

import { __ } from '@wordpress/i18n';
/**
 * Plugin
 */
import InputControl from '@aktk/components/input-controls';

const PanelZIndex = ( { attributes, setAttributes } ) => {
	const { zIndex } = attributes;
	const handleOnChange = ( newValue ) => {
		setAttributes( {
			zIndex: '' !== newValue ? newValue : undefined,
		} );
	};
	return (
		<PanelBody title={ __( '重なり順', 'ystandard-blocks' ) }>
			<BaseControl>
				<InputControl
					label={ __( '重なり順', 'ystandard-toolbox' ) }
					onChange={ handleOnChange }
					value={ zIndex }
				/>
			</BaseControl>
		</PanelBody>
	);
};
export default PanelZIndex;
