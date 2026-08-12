/**
 * WordPress Dependencies
 */
import { useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';

/**
 * Aktk Dependencies
 */
import EditorPinnedButton from '@aktk/block-components/wp-controls/editor-pinned-button';
import Modal from '@aktk/block-components/wp-controls/modal';
import PluginMoreMenuItem from '@aktk/block-components/wp-controls/plugin-more-menu-item';

/**
 * Plugin Dependencies
 */
import { PanelIcon } from '@aktk/components/ystandard-icon';

/**
 * Toolbox投稿設定モーダルを表示する.
 *
 * @return 投稿設定モーダル.
 */
export default function PostSettingsModal() {
	const [ isOpen, setIsOpen ] = useState( false );
	const title = __( '[Toolbox] 投稿設定', 'ystandard-toolbox' );
	// 投稿設定モーダルを開く.
	const openModal = () => setIsOpen( true );

	return (
		<>
			<EditorPinnedButton
				icon={ <PanelIcon /> }
				label={ title }
				onClick={ openModal }
			/>
			<PluginMoreMenuItem icon={ <PanelIcon /> } onClick={ openModal }>
				{ title }
			</PluginMoreMenuItem>
			{ isOpen && (
				<Modal
					title={ title }
					onRequestClose={ () => setIsOpen( false ) }
				>
					<p>
						{ __(
							'投稿設定はここに追加されます。',
							'ystandard-toolbox'
						) }
					</p>
				</Modal>
			) }
		</>
	);
}
