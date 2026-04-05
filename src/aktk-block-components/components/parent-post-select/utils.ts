import type { PostRecord } from './types';

interface ParentPostOption {
	key: string;
	name: string;
}

/**
 * 子ページを持つ投稿のみ、インデント付きフラットリストに変換
 *
 * @param posts  投稿レコード配列
 * @param parent 親投稿ID
 * @param level  現在のネストレベル
 */
export function buildParentPostOptions(
	posts: PostRecord[],
	parent: number = 0,
	level: number = 0
): ParentPostOption[] {
	let result: ParentPostOption[] = [];

	const children = posts.filter( ( post ) => post.parent === parent );

	for ( const post of children ) {
		const hasChildren = posts.some( ( p ) => p.parent === post.id );
		if ( hasChildren ) {
			const indent = '\u3000'.repeat( level );
			result.push( {
				key: String( post.id ),
				name: indent + post.title.rendered,
			} );
			result = result.concat(
				buildParentPostOptions( posts, post.id, level + 1 )
			);
		}
	}

	return result;
}
