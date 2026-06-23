/**
 * WordPress dependencies.
 */
import { __ } from '@wordpress/i18n';
/**
 * Aktk dependencies.
 */
import { ConfirmModal } from '@aktk/block-components/components/modal';

/**
 * Component.
 */
interface ConfirmSelectProps {
	isOpen: boolean;
	onSuccess: () => void;
	onCancel: () => void;
}

export default function ConfirmSelectModal( props: ConfirmSelectProps ) {
	const { isOpen, onSuccess, onCancel } = props;
	return (
		<>
			<ConfirmModal
				title={ __( '編集内容を破棄しますか', 'ystandard-toolbox' ) }
				isOpen={ isOpen }
				onOk={ onSuccess }
				onCancel={ onCancel }
				okText={ __( '別のスタイルを編集する', 'ystandard-toolbox' ) }
				cancelText={ __( 'スタイル編集に戻る', 'ystandard-toolbox' ) }
				isOkDestructive={ true }
				focusOnCancel={ true }
				actionButtonOrder={ 'ok-cancel' }
				okVariant={ 'secondary' }
				cancelVariant={ 'primary' }
			>
				<p>
					{ __(
						'編集するスタイルを変更してもよろしいですか？',
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
