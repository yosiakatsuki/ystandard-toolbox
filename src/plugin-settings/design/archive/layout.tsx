/**
 * WordPress
 */
import { __ } from '@wordpress/i18n';
/**
 * Aktk Dependencies
 */
import {
	ImageButton,
	DestructiveButton,
} from '@aktk/block-components/components/buttons';
import { NoticeSecondaryText } from '@aktk/block-components/components/notice';
/**
 * Plugin Dependencies
 */
import {
	PluginSettingsPanel,
	PanelInner,
} from '@aktk/plugin-settings/components/panel';
import PluginSettingsBaseControl from '@aktk/plugin-settings/components/base-control';
import { getPluginAssetsUrl } from '@aktk/plugin-settings/utils/config';
import { PanelProps } from './index';

interface LayoutType {
	name: string;
	label: string;
	image: string;
}

const LAYOUT_TYPES: LayoutType[] = [
	{
		name: 'card',
		label: __( 'カード', 'ystandard-toolbox' ),
		image: 'card.png',
	},
	{
		name: 'list',
		label: __( 'リスト', 'ystandard-toolbox' ),
		image: 'list.png',
	},
	{
		name: 'simple',
		label: __( 'シンプル', 'ystandard-toolbox' ),
		image: 'simple.png',
	},
];

export default function Layout( {
	updateSection,
	sectionSettings,
}: PanelProps ): JSX.Element {
	const assetsUrl = getPluginAssetsUrl();
	const layoutDesktop = sectionSettings?.theme_ys_archive_type ?? 'card';

	const handleOnChangeDesktopLayout = ( newValue: LayoutType ): void => {
		updateSection( {
			theme_ys_archive_type: newValue.name,
		} );
	};
	const handleOnChangeMobileLayout = ( newValue: {
		name?: string;
	} ): void => {
		updateSection( {
			archiveMobileLayout: newValue.name,
			archiveImageRatioMobile: !! newValue.name
				? sectionSettings?.archiveImageRatioMobile
				: undefined,
		} );
	};
	return (
		<PluginSettingsPanel
			title={ __( '一覧ページレイアウト', 'ystandard-toolbox' ) }
		>
			<PanelInner>
				<PluginSettingsBaseControl
					label={ __(
						'デスクトップ・タブレット',
						'ystandard-toolbox'
					) }
					id={ 'desktop-tablet' }
				>
					<div className="flex gap-2">
						{ LAYOUT_TYPES.map( ( item ) => {
							return (
								<div key={ item.name }>
									<ImageButton
										isPrimary={
											layoutDesktop === item.name
										}
										onClick={ () =>
											handleOnChangeDesktopLayout( item )
										}
										imageUrl={ `${ assetsUrl }/archive/${ item.image }` }
										alt={ item.label }
									/>
								</div>
							);
						} ) }
					</div>
					<NoticeSecondaryText>
						{ __(
							'※カスタマイザーの「デザイン」→「アーカイブページ」→「一覧レイアウト」と同じ設定です。',
							'ystandard-toolbox'
						) }
					</NoticeSecondaryText>
				</PluginSettingsBaseControl>
				<PluginSettingsBaseControl
					label={ __( 'モバイル', 'ystandard-toolbox' ) }
					id={ 'mobile' }
				>
					<div className="flex gap-2">
						{ LAYOUT_TYPES.map( ( item ) => {
							return (
								<div key={ item.name }>
									<ImageButton
										isPrimary={
											sectionSettings?.archiveMobileLayout ===
											item.name
										}
										onClick={ () =>
											handleOnChangeMobileLayout( item )
										}
										imageUrl={ `${ assetsUrl }/archive/${ item.image }` }
										alt={ item.label }
									/>
								</div>
							);
						} ) }
					</div>
					<div className="mt-2">
						<DestructiveButton
							onClick={ () => {
								handleOnChangeMobileLayout( {
									name: undefined,
								} );
							} }
							isSmall={ true }
						>
							{ __( 'クリア', 'ystandard-toolbox' ) }
						</DestructiveButton>
					</div>
					<NoticeSecondaryText>
						{ __(
							'※未選択の場合、デスクトップ・タブレットと同じレイアウトが適用されます。',
							'ystandard-toolbox'
						) }
					</NoticeSecondaryText>
				</PluginSettingsBaseControl>
			</PanelInner>
		</PluginSettingsPanel>
	);
}
