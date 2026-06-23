import type { TermRecord } from './types';

interface TermOption {
	key: string;
	name: string;
}

/**
 * 階層型タームをインデント付きフラットリストに変換
 *
 * 全角スペースでインデントし、親子関係を視覚的に表現する。
 * @param terms  タームレコード配列
 * @param parent 親タームID
 * @param level  現在のネストレベル
 */
export function buildTermTree(
	terms: TermRecord[],
	parent: number = 0,
	level: number = 0
): TermOption[] {
	let result: TermOption[] = [];

	const children = terms.filter( ( term ) => {
		return ( term.parent ?? 0 ) === parent;
	} );

	for ( const term of children ) {
		const indent = '\u3000'.repeat( level );
		result.push( {
			key: term.slug,
			name: indent + term.name,
		} );
		result = result.concat( buildTermTree( terms, term.id, level + 1 ) );
	}

	return result;
}

/**
 * フラットなタームをオプション形式に変換
 * @param terms タームレコード配列
 */
export function buildTermList( terms: TermRecord[] ): TermOption[] {
	return terms.map( ( term ) => ( {
		key: term.slug,
		name: term.name,
	} ) );
}
