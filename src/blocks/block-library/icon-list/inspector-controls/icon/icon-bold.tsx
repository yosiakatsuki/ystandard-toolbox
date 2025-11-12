/**
 * WordPress Dependencies.
 */
import { __ } from '@wordpress/i18n';
/**
 * Aktk Component Dependencies.
 */
import BaseControl from '@aktk/block-components/wp-controls/base-control';
import ToggleControl from '@aktk/block-components/wp-controls/toggle-control';

/**
 * Block Dependencies.
 */
import type { IconListAttributes, IconListEditProps } from '../../types';

export function IconBold( props: IconListEditProps ): JSX.Element {
	const { attributes, setAttributes } = props;
	const { iconBold } = attributes as IconListAttributes;

	return (
		<BaseControl
			id={ 'icon-bold' }
			label={ __( 'アイコン太さ', 'ystandard-toolbox' ) }
		>
			<ToggleControl
				label={ __( 'アイコンを太くする', 'ystandard-toolbox' ) }
				checked={ iconBold || false }
				onChange={ ( value: boolean ) =>
					setAttributes( { iconBold: value } )
				}
			/>
		</BaseControl>
	);
}
