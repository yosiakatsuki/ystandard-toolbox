/**
 * WordPress
 */
import { __ } from '@wordpress/i18n';
import { ToggleControl } from '@wordpress/components';
/**
 * Plugin Dependencies
 */
import BaseControl from '@aktk/plugin-settings/components/base-control';

interface EnablePseudoElementsProps {
	type: 'before' | 'after';
	value: string | undefined;
	onChange: ( newValue: { content?: string } ) => void;
}

export function EnablePseudoElements( props: EnablePseudoElementsProps ) {
	const { value, onChange, type } = props;

	const handleOnChange = ( check: boolean ) => {
		const newValue = check ? '' : undefined;
		onChange( {
			content: newValue,
		} );
	};
	return (
		<BaseControl
			id={ `${ type }-enable-content` }
			label={ `::${ type }${ __( 'の有効化', 'ystandard-toolbox' ) }` }
			isFullWidth={ true }
		>
			<ToggleControl
				label={ `${ type }${ __(
					'を有効化する',
					'ystandard-toolbox'
				) }` }
				checked={ value !== undefined }
				onChange={ handleOnChange }
			/>
		</BaseControl>
	);
}
