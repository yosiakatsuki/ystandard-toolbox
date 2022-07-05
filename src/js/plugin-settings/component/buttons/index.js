import { Button } from '@wordpress/components';
import { cloudUpload } from '@wordpress/icons';

import './_index.scss';

const Buttons = ( {
	onClickUpdate,
	onClickDelete = undefined,
	isDisabled,
} ) => {
	return (
		<div className="aktk-settings-update-buttons">
			<UpdateButton onClick={ onClickUpdate } isDisabled={ isDisabled } />
			{ 'function' === typeof onClickDelete && (
				<DeleteButton
					onClick={ onClickDelete }
					isDisabled={ isDisabled }
				/>
			) }
		</div>
	);
};
const UpdateButton = ( { text, onClick, icon = undefined, isDisabled } ) => {
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
			isPrimary
			onClick={ onClick }
			icon={ _icon }
			disabled={ isDisabled }
			isBusy={ isDisabled }
		>
			{ _text }
		</Button>
	);
};
const DeleteButton = ( { text, onClick, icon, isDisabled } ) => {
	const _text = text || '設定を削除';
	return (
		<Button
			className={ 'aktk-settings-update-buttons__button' }
			isDestructive
			onClick={ onClick }
			icon={ icon }
			disabled={ isDisabled }
			isBusy={ isDisabled }
		>
			{ _text }
		</Button>
	);
};
Buttons.Update = UpdateButton;
Buttons.Delete = DeleteButton;
export default Buttons;
