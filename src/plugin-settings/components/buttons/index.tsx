import type { HTMLProps, ReactNode } from 'react';
/**
 *  WordPress.
 */
import { Button } from '@wordpress/components';
import { cloudUpload } from '@wordpress/icons';
/**
 * Component.
 */
import './_editor.scss';

interface ButtonProps {
	text?: string | ReactNode;
	onClick?: () => void;
	icon?: any;
	isDisabled?: boolean;
	style?: object;
}

type ButtonPropsType = HTMLProps< HTMLElement > & ButtonProps;

interface ButtonsComponentProps {
	onClickUpdate: () => void;
	onClickDelete?: () => void | undefined;
}

type ButtonsComponentPropsType = HTMLProps< HTMLElement > &
	ButtonProps &
	ButtonsComponentProps;

const Buttons = ( {
	onClickUpdate,
	onClickDelete = undefined,
	isDisabled,
	...props
}: ButtonsComponentPropsType ) => {
	return (
		<div className="aktk-settings-update-buttons">
			<UpdateButton
				onClick={ onClickUpdate }
				isDisabled={ isDisabled }
				{ ...props }
			/>
			{ 'function' === typeof onClickDelete && (
				<DeleteButton
					onClick={ onClickDelete }
					isDisabled={ isDisabled }
					{ ...props }
				/>
			) }
		</div>
	);
};

const UpdateButton = ( {
	text,
	onClick,
	icon = undefined,
	isDisabled,
	...props
}: ButtonPropsType ) => {
	const _text = text || '変更を保存';
	let _icon = cloudUpload;
	if ( false === icon ) {
		_icon = undefined;
	}
	if ( !! icon ) {
		_icon = icon;
	}
	return (
		<Button
			className={ 'aktk-settings-update-buttons__button' }
			variant={ 'primary' }
			onClick={ onClick }
			icon={ _icon }
			disabled={ isDisabled }
			isBusy={ isDisabled }
			{ ...props }
		>
			{ _text }
		</Button>
	);
};
const DeleteButton = ( {
	text,
	onClick,
	icon,
	isDisabled,
	...props
}: ButtonPropsType ) => {
	const _text = text || '設定を削除';
	return (
		<Button
			className={ 'aktk-settings-update-buttons__button' }
			isDestructive
			onClick={ onClick }
			icon={ icon }
			disabled={ isDisabled }
			isBusy={ isDisabled }
			{ ...props }
		>
			{ _text }
		</Button>
	);
};
const DisableButton = ( { text, icon, ...props }: ButtonPropsType ) => {
	return (
		<Button
			className={ 'aktk-settings-update-buttons__button' }
			isDestructive
			icon={ icon }
			disabled={ true }
			{ ...props }
		>
			{ text }
		</Button>
	);
};

const CancelButton = ( { text, onClick, icon, ...props }: ButtonPropsType ) => {
	return (
		<Button
			className={ 'aktk-settings-update-buttons__button is-cancel' }
			onClick={ onClick }
			icon={ icon }
			{ ...props }
		>
			{ text }
		</Button>
	);
};
Buttons.Update = UpdateButton;
Buttons.Delete = DeleteButton;
Buttons.Disable = DisableButton;
Buttons.Cancel = CancelButton;
export default Buttons;
