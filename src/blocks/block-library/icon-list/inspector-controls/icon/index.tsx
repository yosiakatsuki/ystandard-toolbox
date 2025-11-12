import { __ } from '@wordpress/i18n';
/**
 * Aktk Component Dependencies.
 */
import { Panel } from '@aktk/block-components/components/panel';

/**
 * Block Dependencies.
 */
import type { IconListEditProps } from '../../types';
import { ListIcon } from './list-icon';

export function Icon( props: IconListEditProps ): JSX.Element {
	return (
		<Panel title={ __( 'アイコン', 'ystandard-toolbox' ) }>
			<ListIcon { ...props } />
		</Panel>
	);
}
