/**
 * WordPress
 */
import { __ } from '@wordpress/i18n';
import { ToggleControl } from '@wordpress/components';
/**
 * Plugin Dependencies
 */
import BaseControl from '@aktk/plugin-settings/components/base-control';

interface EnablePseudoElementsContentProps {
	type: 'before' | 'after';
	value: boolean | undefined;
	onChange: ( newValue: { enable?: boolean } ) => void;
}

export function EnablePseudoElements(
	props: EnablePseudoElementsContentProps
) {
	const { value, onChange, type } = props;
	const handleOnChange = ( check: boolean ) => {
		const newValue = check ? true : undefined;
		onChange( {
			enable: newValue,
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
				checked={ value }
				onChange={ handleOnChange }
			/>
		</BaseControl>
	);
}
