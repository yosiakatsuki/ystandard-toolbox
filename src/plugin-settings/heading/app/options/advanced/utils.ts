/**
 * Plugin Dependencies
 */
import type { ResponsiveValues } from '@aktk/block-components/types';

export function isUseFlex( display: ResponsiveValues | undefined ) {
	const desktop = display?.desktop || '';
	const tablet = display?.tablet || '';
	const mobile = display?.mobile || '';
	const isFlex = [ 'flex', 'inline-flex' ];
	// どこかの設定でflexが選択されていたら使っている判断.
	return (
		isFlex.includes( desktop ) ||
		isFlex.includes( tablet ) ||
		isFlex.includes( mobile )
	);
}
