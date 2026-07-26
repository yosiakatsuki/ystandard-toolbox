/**
 * ユーティリティ - インラインフォーマット：レスポンシブ改行
 */

/* WordPress Dependencies */
import { applyFormat, create, insert } from '@wordpress/rich-text';
import type { RichTextValue } from '@wordpress/rich-text';

/**
 * レスポンシブ改行を挿入したRichTextの値を返す
 *
 * 改行文字( \n )にフォーマットを適用することで
 * <span class="ystdtb-br--mobile"><br></span> の形で保存される.
 *
 * @param value      RichTextの値.
 * @param formatName フォーマット名.
 *
 * @return レスポンシブ改行を挿入したRichTextの値.
 */
export const insertResponsiveBreak = (
	value: RichTextValue,
	formatName: string
): RichTextValue => {
	// 選択範囲がない場合は挿入位置が決まらないため何もしない.
	const index: number | undefined = value.end ?? value.start;
	if ( undefined === index ) {
		return value;
	}

	// 改行文字1文字にフォーマットを適用した挿入用の値を作る.
	const lineBreak = applyFormat(
		create( { text: '\n' } ),
		{ type: formatName },
		0,
		1
	);

	// 選択範囲があるときは文字を消さないよう末尾に挿入する.
	return insert( value, lineBreak, index, index );
};
