/**
 * WordPress dependencies
 */
import { BaseControl as WPBaseControl } from '@wordpress/components';
// @ts-expect-error
import type { BaseControlProps as WPBaseControlProps } from '@wordpress/components';

/**
 * BaseControl
 * @param props
 */
export default function BaseControl( props: WPBaseControlProps ): JSX.Element {
	return <WPBaseControl { ...props } __nextHasNoMarginBottom />;
}

/**
 * 入力欄を持たないプレビュー等に、標準設定と同じ見出しを表示する。
 * @param props ラベルの表示内容と属性。
 */
export function BaseControlVisualLabel(
	props: React.ComponentProps< typeof WPBaseControl.VisualLabel >
) {
	return <WPBaseControl.VisualLabel { ...props } />;
}
