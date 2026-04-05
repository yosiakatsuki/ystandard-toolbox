import type { PostsBlockAttributes } from './types';

/**
 * 全デバイスでシンプルデザインかどうかを判定.
 *
 * @param attributes ブロック属性.
 */
export function isAllSimpleDesign( attributes: PostsBlockAttributes ): boolean {
	const { listType, listTypeMobile } = attributes;
	return (
		'simple' === listType &&
		( ! listTypeMobile || 'simple' === listTypeMobile )
	);
}

/**
 * いずれかのデバイスでシンプルデザインかどうかを判定.
 *
 * @param attributes ブロック属性.
 */
export function isAnySimpleDesign( attributes: PostsBlockAttributes ): boolean {
	const { listType, listTypeMobile } = attributes;
	return 'simple' === listType || 'simple' === listTypeMobile;
}
