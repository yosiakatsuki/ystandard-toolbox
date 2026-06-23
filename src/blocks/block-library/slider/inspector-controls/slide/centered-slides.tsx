/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
/*
 * Aktk Dependencies
 */
import BaseControl from '@aktk/block-components/wp-controls/base-control';
import ToggleControl from '@aktk/block-components/wp-controls/toggle-control';
/**
 * Block dependencies.
 */
import type { SlideOptionEditProps } from '../../types';

export function CenteredSlides( props: SlideOptionEditProps ) {
	const { value, onChange, type } = props;
	const { centeredSlides } = value || {};

	const handleOnChange = ( newValue?: boolean ) => {
		onChange( { centeredSlides: newValue || undefined } );
	};

	return (
		<BaseControl
			id={ `slide-${ type }-CenteredSlides` }
			label={ __( 'スライドの中央表示', 'ystandard-toolbox' ) }
		>
			<ToggleControl
				label={ __(
					'中央からスライドを表示する',
					'ystandard-toolbox'
				) }
				checked={ centeredSlides }
				onChange={ handleOnChange }
			/>
		</BaseControl>
	);
}
