/**
 * WordPress dependencies.
 */
import { __ } from '@wordpress/i18n';
import { ConfirmModal } from '@aktk/block-components/modal';

/**
 * Component.
 */
interface ConfirmSelectProps {
	isOpen: boolean;
	onSuccess: () => void;
	onCancel: () => void;
}

export default function ConfirmSelect( props: ConfirmSelectProps ) {
	const { isOpen, onSuccess, onCancel } = props;
	return (
		<>
			<ConfirmModal
				isOpen={ isOpen }
				onOk={ onSuccess }
				onCancel={ onCancel }
				okText={ __(
					'編集するスタイルを変更する',
					'ystandard-toolbox'
				) }
			>
				<p>
					{ __(
						'編集中のデータがありますが編集するスタイルを変更してもよろしいですか？',
						'ystandard-toolbox'
					) }
				</p>
				<p className={ 'mt-1 text-xs text-gray-400' }>
					{ __(
						'※編集中のデータは破棄されます。',
						'ystandard-toolbox'
					) }
				</p>
			</ConfirmModal>
		</>
	);
}
