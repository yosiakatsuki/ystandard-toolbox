/**
 * WordPress dependencies.
 */
import { Modal as WPModal, Button } from '@wordpress/components';
import { useEffect, useRef } from '@wordpress/element';
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
	isOkDestructive?: boolean;
	focusOnCancel?: boolean;
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
		isOkDestructive = false,
		focusOnCancel = false,
	} = props;
	const cancelButtonRef = useRef< HTMLButtonElement >( null );

	const handleOnClose = () => {
		if ( !! onCancel ) {
			onCancel();
		}
	};

	useEffect( () => {
		if ( isOpen && focusOnCancel ) {
			cancelButtonRef.current?.focus();
		}
	}, [ isOpen, focusOnCancel ] );

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
							<Button
								ref={ cancelButtonRef }
								variant={ 'tertiary' }
								onClick={ onCancel }
								style={ {
									color: 'var(--ys--global--text-color--gray, #656565)',
								} }
							>
								{ cancelText }
							</Button>
						) }
						{ onOk && (
							<Button
								variant={ 'primary' }
								onClick={ onOk }
								isDestructive={ isOkDestructive }
							>
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
