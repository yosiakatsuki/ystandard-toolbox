/**
 * フォーマット登録 - インラインフォーマット：レスポンシブ改行
 */

/* WordPress Dependencies */
import { registerFormatType } from '@wordpress/rich-text';

/* Block Dependencies */
import { FORMAT_TAG_NAME, RESPONSIVE_BREAKS } from './config';
import { ResponsiveBreakToolbar } from './toolbar';

/**
 * レスポンシブ改行のフォーマットを登録する
 *
 * ツールバーのUIは1つのドロップダウンにまとめるため、
 * edit は先頭のフォーマットにのみ渡す.
 * edit に渡される value / onChange はRichText全体のものなので、
 * 1つの edit から全種類の改行を挿入できる.
 */
export const registerResponsiveBreakFormats = () => {
	RESPONSIVE_BREAKS.forEach( ( { name, className, title }, index ) => {
		registerFormatType( name, {
			title,
			tagName: FORMAT_TAG_NAME,
			className,
			edit: 0 === index ? ResponsiveBreakToolbar : undefined,
		} );
	} );
};
