// @ts-expect-error WordPress公開APIに型定義が同梱されていない.
import { __experimentalTextTransformControl as WPTextTransformControl } from '@wordpress/block-editor';

interface TextTransformControlProps {
	value?: string;
	onChange: ( value?: string ) => void;
}

/**
 * WordPressの大文字小文字コントロール.
 *
 * @param props コントロールプロパティ.
 * @return 大文字小文字コントロール.
 */
export default function TextTransformControl(
	props: TextTransformControlProps
) {
	return <WPTextTransformControl { ...props } />;
}
