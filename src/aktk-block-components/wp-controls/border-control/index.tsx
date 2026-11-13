/* WordPress Dependencies */
import { __experimentalBorderControl as WPBorderControl } from '@wordpress/components';

type BorderControlProps = React.ComponentProps< typeof WPBorderControl >;

/**
 * 単一要素の枠線の幅・色・線種を編集するコア入力。
 * @param props コアの枠線入力プロパティ。
 */
export default function BorderControl( props: BorderControlProps ) {
	return <WPBorderControl { ...props } />;
}
