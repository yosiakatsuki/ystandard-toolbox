/**
 * WordPress Dependencies
 */
import { useContext } from '@wordpress/element';
import { __, sprintf } from '@wordpress/i18n';

/**
 * Aktk Dependencies
 */
import Modal from '@aktk/block-components/wp-controls/modal';
import {
	DestructiveButton,
	CancelLinkButton,
} from '@aktk/block-components/components/buttons/buttons';

/**
 * Settings.
 */
import { CtaContext } from './index';
import { getPluginSetting } from '@aktk/plugin-settings/utils/setting';

/**
 * Plugin
 */
import { getTabName, getCtaDefault } from './tab';

/**
 * Type
 */
interface ModalResetProps {
	onClickUpdate: ( value: object ) => void;
}

export default function ModalReset( {
	onClickUpdate,
}: ModalResetProps ): JSX.Element {
	// CTA設定のコンテキストから必要な値と関数を取得
	const {
		ctaItems,
		setCtaItems,
		selectPostType,
		selectedTab,
		setIsResetModalOpen,
	} = useContext( CtaContext );

	/**
	 * 選択されている投稿タイプの表示名を取得する
	 * @return {string} 投稿タイプの表示名
	 */
	const getPostTypeName = () => {
		// CTA選択可能な投稿タイプの設定を取得
		const settings = getPluginSetting( 'ctaSelectPostType' );
		if ( ! Array.isArray( settings ) ) {
			return '';
		}
		// 現在選択されている投稿タイプの情報を検索
		const selected = settings.filter( ( item ) => {
			return item?.key === selectPostType;
		} );
		if ( selected.length === 0 ) {
			return '';
		}
		return selected[ 0 ]?.name || '';
	};

	/**
	 * リセットボタンクリック時の処理
	 * 選択された投稿タイプのCTA設定をデフォルト値にリセットする
	 */
	const handleResetOnClick = () => {
		// 選択された投稿タイプのデフォルトCTA設定を取得
		const defaultCta = getCtaDefault( selectPostType );
		// 既存のCTA設定にデフォルト値をマージ
		const newCtaItems = {
			...ctaItems,
			...{
				[ selectPostType ]: defaultCta,
			},
		};
		// ローカル状態を更新
		setCtaItems( newCtaItems );
		// 親コンポーネントに変更を通知
		onClickUpdate( newCtaItems );
		// モーダルを閉じる
		handleCloseModal();
	};

	/**
	 * モーダルを閉じる処理
	 */
	const handleCloseModal = () => {
		setIsResetModalOpen( false );
	};
	return (
		<Modal
			title={ __( 'リセット', 'ystandard-toolbox' ) }
			onRequestClose={ handleCloseModal }
			shouldCloseOnClickOutside={ true }
			isDismissible={ false }
		>
			<div className="flex flex-col gap-8">
				<p>
					{ sprintf(
						/* translators: %1$s post type, %2$s section. */
						__(
							'「%1$s」の%2$s設定をリセットしますか？',
							'ystandard-toolbox'
						),
						getPostTypeName(),
						getTabName( selectedTab )
					) }
				</p>
				<div>
					<div className="ystdtb-settings-cta__reset-buttons flex justify-between gap-4">
						<DestructiveButton
							text={ __( 'リセット', 'ystandard-toolbox' ) }
							onClick={ handleResetOnClick }
						/>
						<CancelLinkButton
							text={ __( 'キャンセル', 'ystandard-toolbox' ) }
							onClick={ handleCloseModal }
						/>
					</div>
				</div>
			</div>
		</Modal>
	);
}
