/**
 * WordPress
 */
import { PanelBody } from '@wordpress/components';
import { useState, useEffect } from '@wordpress/element';
/**
 * yStandard
 */
import { Flex, FlexItem } from '@aktk/components/flex';
import ButtonImage from '@aktk/components/button-image';
import ButtonReset from '@aktk/components/button-reset';
import BaseControl from '../../component/base-control';
import Notice from '@aktk/components/notice';
import { getPluginAssetsUrl } from '../../function/config';

const Layout = ( props ) => {
	const { updateSection, sectionSettings } = props;
	const [ layoutSettings, setLayoutSettings ] = useState( {} );
	const assetsUrl = getPluginAssetsUrl();

	const getLayoutSettings = () => {
		setLayoutSettings( {
			desktop: sectionSettings?.theme_ys_archive_type ?? 'card',
			mobile: sectionSettings?.archiveMobileLayout,
			ratioMobile: sectionSettings?.archiveImageRatioMobile,
		} );

		return layoutSettings;
	};
	useEffect( getLayoutSettings, [ sectionSettings ] );

	const layoutTypes = [
		{
			name: 'card',
			label: 'カード',
			image: 'card.png',
		},
		{
			name: 'list',
			label: 'リスト',
			image: 'list.png',
		},
		{
			name: 'simple',
			label: 'シンプル',
			image: 'simple.png',
		},
	];

	const handleOnChangeDesktopLayout = ( newValue ) => {
		updateSection( {
			theme_ys_archive_type: newValue.name,
		} );
	};
	const handleOnChangeMobileLayout = ( newValue ) => {
		updateSection( {
			archiveMobileLayout: newValue.name,
			archiveImageRatioMobile: !! newValue.name
				? layoutSettings.ratioMobile
				: undefined,
		} );
	};
	return (
		<PanelBody title={ '一覧ページレイアウト' }>
			<BaseControl
				label={ 'デスクトップ・タブレット' }
				id={ 'desktop-tablet' }
			>
				<Flex isGapSmall>
					{ layoutTypes.map( ( item ) => {
						return (
							<FlexItem key={ item.name }>
								<ButtonImage
									isPrimary={
										layoutSettings.desktop === item.name
									}
									onClick={ () =>
										handleOnChangeDesktopLayout( item )
									}
									imageUrl={ `${ assetsUrl }/archive/${ item.image }` }
									alt={ item.label }
								/>
							</FlexItem>
						);
					} ) }
				</Flex>
				<Notice isHelp style={ { fontSize: '12px', maxWidth: '100%' } }>
					※カスタマイザーの「デザイン」→「アーカイブページ」→「一覧レイアウト」と同じ設定です。
				</Notice>
			</BaseControl>
			<BaseControl label={ 'モバイル' } id={ 'mobile' }>
				<Flex isGapSmall>
					{ layoutTypes.map( ( item ) => {
						return (
							<FlexItem key={ item.name }>
								<ButtonImage
									isPrimary={
										layoutSettings.mobile === item.name
									}
									onClick={ () =>
										handleOnChangeMobileLayout( item )
									}
									imageUrl={ `${ assetsUrl }/archive/${ item.image }` }
									alt={ item.label }
								/>
							</FlexItem>
						);
					} ) }
				</Flex>
				<div style={ { marginTop: '0.5em' } }>
					<ButtonReset
						label={ 'クリア' }
						onClick={ () => {
							handleOnChangeMobileLayout( { name: undefined } );
						} }
					/>
				</div>
				<Notice isHelp style={ { fontSize: '12px', maxWidth: '100%' } }>
					※未選択の場合、デスクトップ・タブレットと同じレイアウトが適用されます。
				</Notice>
			</BaseControl>
		</PanelBody>
	);
};
export default Layout;
