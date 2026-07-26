/**
 * フォーマット登録 - インラインフォーマット共通
 */

/* WordPress Dependencies */
import { registerFormatType } from '@wordpress/rich-text';

/* Block Dependencies */
import { FORMAT_TAG_NAME, INLINE_FORMATS } from './config';
import { InlineFormatToolbar } from './toolbar';

/**
 * インラインフォーマットを登録する
 *
 * ツールバーは1つのドロップダウンにまとめるため、
 * 共通ツールバーの edit は先頭のフォーマットにのみ渡す.
 * edit に渡される value / onChange はRichText全体のものなので、
 * 1つの edit から全フォーマットを操作できる.
 */
export const registerInlineFormats = () => {
	INLINE_FORMATS.forEach( ( { name, className, title }, index ) => {
		registerFormatType( name, {
			title,
			tagName: FORMAT_TAG_NAME,
			className,
			edit: 0 === index ? InlineFormatToolbar : undefined,
		} );
	} );
};
