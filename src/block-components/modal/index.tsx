/**
 * WordPress dependencies.
 */
import { Modal as WPModal, Button } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

/**
 * Component.
 */
interface ModalProps {
	title?: string;
	children: React.ReactNode;
	isOpen: boolean;
	onOk: () => void;
	onCancel: () => void;
	okText?: string;
	cancelText?: string;
}
export function Modal( props: ModalProps ) {
	const {
		title,
		children,
		isOpen,
		onOk,
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
				<WPModal
					title={ title || '' }
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
						<Button variant={ 'primary' } onClick={ onOk }>
							{ okText }
						</Button>
					</div>
				</WPModal>
			) }
		</>
	);
}

export function ConfirmModal( props: ModalProps ) {
	return (
		<Modal { ...props } title={ __( '確認', 'ystandard-toolbox' ) }>
			{ props.children }
		</Modal>
	);
}
