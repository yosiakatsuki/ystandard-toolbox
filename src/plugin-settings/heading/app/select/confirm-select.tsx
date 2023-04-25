/**
 * WordPress dependencies.
 */
import { Modal } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { PrimaryButton, TertiaryButton } from '@aktk/components/buttons';

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
	const handleOnClose = () => {
		onCancel();
	};
	return (
		<>
			{ isOpen && (
				// @ts-expect-error
				<Modal
					title={ __( '確認', 'ystandard-toolbox' ) }
					onRequestClose={ handleOnClose }
					shouldCloseOnClickOutside={ false }
				>
					<p>
						{ __(
							'編集中のデータがありますが編集するスタイルを変更してもよろしいですか？',
							'ystandard-toolbox'
						) }
					</p>
					<p className={ 'text-xs text-gray-400 mt-1' }>
						{ __(
							'※編集中のデータは破棄されます。',
							'ystandard-toolbox'
						) }
					</p>
					<div className={ 'mt-4 flex justify-end gap-4' }>
						<TertiaryButton onClick={ onCancel }>
							{ __( 'キャンセル', 'ystandard-toolbox' ) }
						</TertiaryButton>
						<PrimaryButton onClick={ onSuccess }>
							{ __(
								'編集するスタイルを変更する',
								'ystandard-toolbox'
							) }
						</PrimaryButton>
					</div>
				</Modal>
			) }
		</>
	);
}
