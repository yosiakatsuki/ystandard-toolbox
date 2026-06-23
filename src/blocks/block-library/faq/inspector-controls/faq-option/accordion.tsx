/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
/*
 * Aktk Dependencies
 */
import BaseControl from '@aktk/block-components/wp-controls/base-control';
import ToggleControl from '@aktk/block-components/wp-controls/toggle-control';

// @ts-ignore.
export function Accordion( props ): JSX.Element {
	const { attributes, setAttributes } = props;
	const { isAccordion } = attributes;

	const handleOnChange = ( value: boolean ) => {
		setAttributes( {
			isAccordion: value,
		} );
	};

	return (
		<BaseControl
			id="faq-accordion-control"
			label={ __( '開閉式', 'ystandard-toolbox' ) }
		>
			<ToggleControl
				label={ __( '開閉式にする', 'ystandard-toolbox' ) }
				checked={ isAccordion }
				onChange={ handleOnChange }
			/>
		</BaseControl>
	);
}
