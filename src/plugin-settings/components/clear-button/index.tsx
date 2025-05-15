/**
 * WordPress
 */
import { __, _x } from '@wordpress/i18n';
/**
 * Akatsuki
 */
import { DestructiveButton } from '@aktk/block-components/components/buttons';
interface ClearButtonProps {
	onClick: () => void;
}

export default function ClearButton( props: ClearButtonProps ) {
	const { onClick } = props;

	return (
		<div className="flex justify-end mt-1">
			<DestructiveButton isSmall onClick={ onClick }>
				{ _x( '設定クリア', 'plugin-settings', 'ystandard-toolbox' ) }
			</DestructiveButton>
		</div>
	);
}
