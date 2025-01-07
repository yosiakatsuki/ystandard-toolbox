/**
 * WordPress
 */
import { __ } from '@wordpress/i18n';
import { useContext } from '@wordpress/element';

/**
 * Akatsuki
 */
import {
	DestructiveButton,
	PrimaryButton,
} from '@aktk/block-components/components/buttons';

/**
 * Plugin.
 */

import { HeadingContext } from '../index';
import { updateHeadingStyles } from '@aktk/plugin-settings/heading/app/api';

export default function UpdateHeadingOption() {
	// @ts-ignore
	const {
		headingOption,
		initHeadingStyles,
		initLevelList,
		setSelectedStyle,
		setIsEdit,
	} = useContext( HeadingContext );

	/**
	 * 更新成功時の処理.
	 */
	const onUpdateSuccess = () => {
		// データを再取得.
		initHeadingStyles();
		// 編集フラグをリセット.
		setIsEdit( false );
	};

	/**
	 * 削除成功時の処理.
	 */
	const onDeleteSuccess = () => {
		// 選択スタイルをリセット.
		setSelectedStyle( '' );
		// データを再取得.
		initLevelList();
		initHeadingStyles();
		// 編集フラグをリセット.
		setIsEdit( false );
	};

	/**
	 * データ保存処理.
	 */
	const handleOnClickSave = async () => {
		if ( ! headingOption ) {
			return;
		}
		await updateHeadingStyles( {
			type: 'update',
			headingOption,
			onSuccess: onUpdateSuccess,
		} );
	};

	/**
	 * データ削除処理.
	 */
	const handleOnClickDelete = async () => {
		if ( ! headingOption ) {
			return;
		}
		await updateHeadingStyles( {
			type: 'delete',
			headingOption,
			onSuccess: onDeleteSuccess,
		} );
	};

	return (
		<>
			<div className="sticky bottom-0 left-0 flex justify-between bg-white/90 pb-5 pt-2">
				<PrimaryButton
					icon={ 'cloud-upload' }
					onClick={ handleOnClickSave }
				>
					{ __( 'スタイル設定を更新', 'ystandard-toolbox' ) }
				</PrimaryButton>
				<DestructiveButton onClick={ handleOnClickDelete }>
					{ __( 'スタイルを削除', 'ystandard-toolbox' ) }
				</DestructiveButton>
			</div>
		</>
	);
}
