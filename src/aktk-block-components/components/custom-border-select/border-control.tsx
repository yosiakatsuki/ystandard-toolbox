import BorderBoxControl, {
	type BorderBoxControlProps,
} from '@aktk/block-components/wp-controls/border-box-control';

/**
 * 枠線コントロール
 *
 * @param props
 * @class
 */
export function BorderControl( props: BorderBoxControlProps ) {
	return <BorderBoxControl { ...props } />;
}
