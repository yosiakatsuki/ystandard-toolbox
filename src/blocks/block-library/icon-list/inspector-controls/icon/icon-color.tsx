/**
 * WordPress Dependencies.
 */
import { __ } from '@wordpress/i18n';
/**
 * Aktk Component Dependencies.
 */
import BaseControl from '@aktk/block-components/wp-controls/base-control';
import { ColorPalette } from '@aktk/block-components/components/color-pallet-control';

/**
 * Block Dependencies.
 */
import type { IconListEditProps } from '../../types';

export function IconColor( props: IconListEditProps ): JSX.Element {
	const { iconColor, setIconColor } = props;
	return (
		<BaseControl
			id={ 'icon-color' }
			label={ __( 'アイコン色', 'ystandard-toolbox' ) }
		>
			<ColorPalette
				label={ __( 'アイコン色', 'ystandard-toolbox' ) }
				value={ iconColor?.color || '' }
				onChange={ setIconColor }
			/>
		</BaseControl>
	);
}
