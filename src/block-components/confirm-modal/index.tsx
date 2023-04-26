/**
 * WordPress dependencies.
 */
import { Modal, Button } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

/**
 * Component.
 */
interface ConfirmModalProps {
	title: string;
	children: React.ReactNode;
	isOpen: boolean;
	onSuccess: () => void;
	onCancel: () => void;
	okText?: string;
	cancelText?: string;
}
export default function ConfirmModal( props: ConfirmModalProps ) {
	const {
		title,
		children,
		isOpen,
		onSuccess,
		onCancel,
		okText = 'OK',
		cancelText = __( 'キャンセル', 'ystandard-toolbox' ),
	} = props;
	const handleOnClose = () => {
		onCancel();
	};
	return (
		<>
			{ isOpen && (
				// @ts-expect-error
				<Modal
					title={ title }
					onRequestClose={ handleOnClose }
					shouldCloseOnClickOutside={ false }
				>
					<div>{ children }</div>
					<div className={ 'mt-4 flex justify-end gap-4' }>
						{ /* @ts-expect-error */ }
						<Button variant={ 'tertiary' } onClick={ onCancel }>
							{ cancelText }
						</Button>
						{ /* @ts-expect-error */ }
						<Button variant={ 'primary' } onClick={ onSuccess }>
							{ okText }
						</Button>
					</div>
				</Modal>
			) }
		</>
	);
}
