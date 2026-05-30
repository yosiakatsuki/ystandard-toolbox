/**
 * WordPress dependencies.
 */
import { Modal as WPModal, Button } from '@wordpress/components';
import { useEffect, useRef } from '@wordpress/element';
import { __ } from '@wordpress/i18n';

/**
 * Component.
 */
type ButtonVariant = 'primary' | 'secondary' | 'tertiary' | 'link';
type ActionButtonOrder = 'cancel-ok' | 'ok-cancel';

interface ModalProps {
	title?: string;
	children: React.ReactNode;
	isOpen: boolean;
	onOk?: () => void;
	onCancel?: () => void;
	okText?: string;
	cancelText?: string;
	okVariant?: ButtonVariant;
	cancelVariant?: ButtonVariant;
	isOkDestructive?: boolean;
	isCancelDestructive?: boolean;
	focusOnCancel?: boolean;
	actionButtonOrder?: ActionButtonOrder;
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
		okVariant = 'primary',
		cancelVariant = 'tertiary',
		isOkDestructive = false,
		isCancelDestructive = false,
		focusOnCancel = false,
		actionButtonOrder = 'cancel-ok',
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

	const cancelButton = onCancel ? (
		<Button
			ref={ cancelButtonRef }
			variant={ cancelVariant }
			onClick={ onCancel }
			isDestructive={ isCancelDestructive }
			style={
				'tertiary' === cancelVariant
					? {
							color: 'var(--ys--global--text-color--gray, #656565)',
					  }
					: undefined
			}
		>
			{ cancelText }
		</Button>
	) : null;
	const okButton = onOk ? (
		<Button
			variant={ okVariant }
			onClick={ onOk }
			isDestructive={ isOkDestructive }
		>
			{ okText }
		</Button>
	) : null;
	const actionButtons =
		'ok-cancel' === actionButtonOrder ? (
			<>
				{ okButton }
				{ cancelButton }
			</>
		) : (
			<>
				{ cancelButton }
				{ okButton }
			</>
		);

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
						{ actionButtons }
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
