/**
 * WordPress
 */
import { __ } from '@wordpress/i18n';
import { useContext, useState } from '@wordpress/element';

/**
 * Akatsuki
 */
import {
	DestructiveButton,
	PrimaryButton,
} from '@aktk/block-components/components/buttons';
import { ConfirmModal } from '@aktk/block-components/components/modal';

/**
 * Plugin.
 */

import { HeadingContext } from '../index';
import { updateHeadingStyles } from '@aktk/plugin-settings/heading/app/api';

export default function UpdateHeadingOption() {
	const [ isDeleteConfirmModalOpen, setIsDeleteConfirmModalOpen ] =
		useState( false );

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

	/**
	 * 削除確認画面の実行処理.
	 */
	const handleOnConfirmDelete = async () => {
		setIsDeleteConfirmModalOpen( false );
		await handleOnClickDelete();
	};

	return (
		<>
			<div className="sticky bottom-0 left-0 flex justify-between bg-white/80 pb-5 pt-2">
				<PrimaryButton
					icon={ 'cloud-upload' }
					onClick={ handleOnClickSave }
				>
					{ __( 'スタイル設定を更新', 'ystandard-toolbox' ) }
				</PrimaryButton>
				<DestructiveButton
					onClick={ () => setIsDeleteConfirmModalOpen( true ) }
				>
					{ __( 'スタイルを削除', 'ystandard-toolbox' ) }
				</DestructiveButton>
			</div>
			<ConfirmModal
				title={ __( 'スタイル削除確認', 'ystandard-toolbox' ) }
				isOpen={ isDeleteConfirmModalOpen }
				onCancel={ () => setIsDeleteConfirmModalOpen( false ) }
				onOk={ handleOnConfirmDelete }
				cancelText={ __( 'キャンセル', 'ystandard-toolbox' ) }
				okText={ __( '削除する', 'ystandard-toolbox' ) }
				isOkDestructive={ true }
				focusOnCancel={ true }
			>
				<p className="mb-0">
					{ __(
						'選択中の見出しスタイルを削除してもよろしいですか。',
						'ystandard-toolbox'
					) }
				</p>
				<p className={ 'mt-1 text-xs text-gray-400' }>
					{ __(
						'※削除したスタイルは元に戻せません。',
						'ystandard-toolbox'
					) }
				</p>
			</ConfirmModal>
		</>
	);
}
