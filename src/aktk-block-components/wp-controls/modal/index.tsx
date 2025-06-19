/**
 * WordPress Dependencies
 */
import { Modal as WPModal } from '@wordpress/components';

/**
 * WordPressのModalコンポーネントをそのまま使用するためのラッパーコンポーネント
 * @param props - Modalコンポーネントに渡すprops
 * @return WordPressのModalコンポーネント
 */
export default function Modal( props: React.ComponentProps< typeof Modal > ) {
	return <WPModal { ...props } />;
}
