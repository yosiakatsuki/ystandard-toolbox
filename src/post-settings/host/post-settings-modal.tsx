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

import type { PostSettingsContext } from '../types';
import PostSettingsItemBoundary from './post-settings-item-boundary';
import { usePostSettingsItems } from './use-post-settings-items';

interface PostSettingsModalProps {
	context: PostSettingsContext;
}

/**
 * Toolbox投稿設定モーダルを表示する.
 *
 * @param props         コンポーネントprops.
 * @param props.context
 * @return 投稿設定モーダル.
 */
export default function PostSettingsModal( {
	context,
}: PostSettingsModalProps ) {
	const [ isOpen, setIsOpen ] = useState( false );
	const { sections, items } = usePostSettingsItems( context );

	if ( items.length === 0 ) {
		return null;
	}
	const title = __( '[ys]投稿設定', 'ystandard-toolbox' );
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
					<div className="ystdtb-post-settings__sections">
						{ sections.map( ( section ) => {
							const sectionItems = items.filter(
								( item ) => item.section === section.id
							);
							if ( sectionItems.length === 0 ) {
								return null;
							}
							return (
								<section
									key={ section.id }
									className="ystdtb-post-settings__section"
								>
									<h2>{ section.title }</h2>
									{ sectionItems.map( ( item ) => {
										const ItemComponent = item.Component;
										return (
											<PostSettingsItemBoundary
												key={ item.id }
												fallback={
													<p role="alert">
														{ __(
															'設定項目を表示できませんでした。',
															'ystandard-toolbox'
														) }
													</p>
												}
											>
												<ItemComponent
													postType={
														context.postType
													}
													postId={ context.postId }
												/>
											</PostSettingsItemBoundary>
										);
									} ) }
								</section>
							);
						} ) }
					</div>
					<p className="ystdtb-post-settings__save-notice">
						{ __(
							'変更は投稿の保存・更新時に保存されます。',
							'ystandard-toolbox'
						) }
					</p>
				</Modal>
			) }
		</>
	);
}
