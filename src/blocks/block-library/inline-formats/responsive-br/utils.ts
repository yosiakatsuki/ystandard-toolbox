/**
 * ユーティリティ - レスポンシブ改行
 */

/* WordPress Dependencies */
import { insertObject } from '@wordpress/rich-text';
import type { RichTextValue } from '@wordpress/rich-text';

/**
 * レスポンシブ改行を挿入したRichTextの値を返す
 *
 * 改行を非編集の置換オブジェクトとして挿入することで
 * <span class="ystdtb-br--mobile"><br></span>の形で保存される.
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

	// contentEditable: falseのフォーマットとして扱うため、
	// 改行をRichTextの置換オブジェクトとして挿入する.
	const lineBreak = {
		type: formatName,
		innerHTML: '<br>',
	};

	// 選択範囲があるときは文字を消さないよう末尾に挿入する.
	return insertObject( value, lineBreak, index, index );
};
