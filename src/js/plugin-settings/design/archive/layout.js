/**
 * WordPress
 */
import { PanelBody } from '@wordpress/components';
import { useContext, useState, useEffect } from '@wordpress/element';
/**
 * yStandard
 */
import { DesignContext } from '../index';
import { Flex, FlexItem } from '@aktk/components/flex';
import ButtonImage from '@aktk/components/button-image';
import ButtonReset from '@aktk/components/button-reset';
import BaseControl from '../../component/base-control';
import Notice from '@aktk/components/notice';
import { getPluginAssetsUrl } from '../../function/config';

const SECTION_NAME = 'archive';

const Layout = ( props ) => {
	const { updateSection } = props;
	const [ layoutSettings, setLayoutSettings ] = useState( {} );
	const { getSettings, settings } = useContext( DesignContext );
	const assetsUrl = getPluginAssetsUrl();

	const getLayoutSettings = () => {
		const _settings = getSettings( SECTION_NAME );
		setLayoutSettings( {
			desktop: _settings?.theme_ys_archive_type ?? 'card',
			mobile: _settings?.archiveMobileLayout,
		} );

		return layoutSettings;
	};
	useEffect( getLayoutSettings, [ settings ] );

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

	const updateLayout = ( newValue ) => {
		updateSection( SECTION_NAME, newValue );
	};
	const onChangeDesktopLayout = ( newValue ) => {
		updateLayout( {
			theme_ys_archive_type: newValue.name,
		} );
	};
	const onChangeMobileLayout = ( newValue ) => {
		updateLayout( {
			archiveMobileLayout: newValue.name,
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
										onChangeDesktopLayout( item )
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
										onChangeMobileLayout( item )
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
							onChangeMobileLayout( { name: undefined } );
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
