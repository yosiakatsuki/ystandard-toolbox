/**
 * ツールバー項目 - レスポンシブ改行
 */

/* Block Dependencies */
import { RESPONSIVE_BREAKS } from './config';
import { insertResponsiveBreak } from './utils';
import type {
	FormatEditProps,
	FormatToolbarControl,
	FormatToolbarGroup,
} from '../types';

/**
 * レスポンシブ改行のツールバー項目を作る
 *
 * @param props フォーマットのeditプロパティ.
 *
 * @return ツールバーに表示する項目.
 */
const getControls = ( props: FormatEditProps ): FormatToolbarControl[] => {
	const { value, onChange } = props;

	return RESPONSIVE_BREAKS.map( ( { name, title, icon } ) => {
		return {
			title,
			icon,
			onClick: () => {
				onChange( insertResponsiveBreak( value, name ) );
			},
		};
	} );
};

/**
 * レスポンシブ改行のツールバーグループ
 */
export const RESPONSIVE_BR_TOOLBAR_GROUP: FormatToolbarGroup = {
	name: 'responsive-br',
	getControls,
};
