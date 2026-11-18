/* Aktk Dependencies */
import { presetTokenToCssVar } from '@aktk/block-components/utils/style-engine';

/* Plugin Dependencies */
import type { StickyColumnsAttributes } from './types';

const gapKeys = [ 'base', 'desktop', 'tablet', 'mobile' ] as const;
const gapLength = /^(?:0|(?:\d+(?:\.\d+)?|\.\d+)(?:[a-z]+|%))$/i;
const spacingPreset = /^var:preset\|spacing\|[\w-]+$/;

/**
 * コアの通常値と端末別の間隔を、同じ親要素のCSS変数にする。
 * @param attributes 親ブロックの設定。
 */
export function getGapVariables( attributes: StickyColumnsAttributes ) {
	const normal = attributes.style?.spacing?.blockGap;
	const responsive =
		attributes.style?.ystdtb?.stickyColumns?.responsive?.blockGap;
	const variables: Record< string, string > = {};
	for ( const axis of [ 'row', 'column' ] as const ) {
		const side = axis === 'row' ? 'top' : 'left';
		const base = typeof normal === 'string' ? normal : normal?.[ side ];
		const name = `--ystdtb--columns--${ axis }-gap`;
		for ( const key of gapKeys ) {
			const value = key === 'base' ? base : responsive?.[ axis ]?.[ key ];
			// 単位入力の値とコアの余白トークンだけを宣言に渡す。
			if (
				typeof value !== 'string' ||
				! ( gapLength.test( value ) || spacingPreset.test( value ) )
			) {
				continue;
			}
			// 単位なしの0も、min()や残幅の計算では長さとして扱う。
			variables[ `${ name }-${ key }` ] =
				value === '0'
					? '0px'
					: ( presetTokenToCssVar( value ) ?? value );
		}
	}
	return variables;
}
