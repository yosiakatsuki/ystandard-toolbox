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
	onOk?: () => void;
	onCancel?: () => void;
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
		okText = __( 'OK', 'aktk-blocks' ),
		cancelText = __( 'キャンセル', 'aktk-blocks' ),
	} = props;

	const handleOnClose = () => {
		if ( !! onCancel ) {
			onCancel();
		}
	};
	return (
		<>
			{ isOpen && (
				<WPModal
					title={ title || '' }
					onRequestClose={ handleOnClose }
					shouldCloseOnClickOutside={ false }
				>
					<div>{ children }</div>
					<div className={ 'mt-4 flex justify-end gap-4' }>
						{ onCancel && (
							<Button variant={ 'tertiary' } onClick={ onCancel }>
								{ cancelText }
							</Button>
						) }
						{ onOk && (
							<Button variant={ 'primary' } onClick={ onOk }>
								{ okText }
							</Button>
						) }
					</div>
				</WPModal>
			) }
		</>
	);
}

export function ConfirmModal( props: ModalProps ) {
	const { title } = props;
	return (
		<Modal { ...props } title={ title ?? __( '確認', 'aktk-blocks' ) }>
			{ props.children }
		</Modal>
	);
}
