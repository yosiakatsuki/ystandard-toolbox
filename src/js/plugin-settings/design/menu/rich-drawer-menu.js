/**
 * WordPress
 */
import { PanelBody } from '@wordpress/components';
import { useContext, useState, useEffect } from '@wordpress/element';
/**
 * yStandard
 */
import HorizonButtons from '@aktk/components/horizon-buttons';
import Notice from '@aktk/components/notice';
import BaseControl from '../../component/base-control';
import { DesignContext } from '../index';
import { toBool } from '@aktk/helper/boolean.js';

const SECTION_NAME = 'navigation';

const RichDrawerMenu = ( props ) => {
	const { updateSection } = props;
	const [ richDrawerMenuSettings, setRichDrawerMenuSettings ] = useState(
		{}
	);
	const { getSettings, settings } = useContext( DesignContext );
	const getRichDrawerMenuSettings = () => {
		const _settings = getSettings( SECTION_NAME );
		setRichDrawerMenuSettings( {
			enable: toBool( _settings?.mobileMenuEnable ?? false ),
			hideGlobalMenu: toBool(
				_settings?.mobileMenuHideGlobalMenu ?? false
			),
			hideSearch: toBool( _settings?.mobileMenuHideSearch ?? false ),
		} );
		return richDrawerMenuSettings;
	};
	useEffect( getRichDrawerMenuSettings, [ settings ] );
	const updateRichDrawerMenu = ( newValue ) => {
		updateSection( SECTION_NAME, newValue );
	};
	const handleOnChangeEnable = ( newValue ) => {
		updateRichDrawerMenu( {
			mobileMenuEnable: newValue.value,
		} );
	};
	const handleOnChangeHideGlobalMenu = ( newValue ) => {
		updateRichDrawerMenu( {
			mobileMenuHideGlobalMenu: newValue.value,
		} );
	};
	const handleOnChangeHideSearch = ( newValue ) => {
		updateRichDrawerMenu( {
			mobileMenuHideSearch: newValue.value,
		} );
	};
	return (
		<PanelBody title={ 'リッチドロワーメニュー' }>
			<BaseControl label={ '有効 / 無効' } id={ 'enable' }>
				<HorizonButtons
					primary={ richDrawerMenuSettings?.enable }
					items={ [
						{
							name: 'true',
							label: 'ON',
							value: true,
						},
						{
							name: 'false',
							label: 'OFF',
							value: false,
						},
					] }
					onChange={ handleOnChangeEnable }
				/>
			</BaseControl>
			{ toBool( richDrawerMenuSettings?.enable ) && (
				<>
					<BaseControl
						label={ 'グローバルメニューの表示' }
						id={ 'global-menu' }
					>
						<Notice
							isHelp
							style={ { fontSize: '12px', paddingTop: 0 } }
						>
							ドロワーメニュー内のグローバルメニューの表示/非表示を設定します。
						</Notice>
						<HorizonButtons
							primary={ richDrawerMenuSettings?.hideGlobalMenu }
							items={ [
								{
									name: 'true',
									label: '表示',
									value: true,
								},
								{
									name: 'false',
									label: '非表示',
									value: false,
								},
							] }
							onChange={ handleOnChangeHideGlobalMenu }
						/>
					</BaseControl>
					<BaseControl label={ '検索フォームの表示' } id={ 'search' }>
						<Notice
							isHelp
							style={ { fontSize: '12px', paddingTop: 0 } }
						>
							ドロワーメニュー内の検索フォームの表示/非表示を設定します。
						</Notice>
						<HorizonButtons
							primary={ richDrawerMenuSettings?.hideSearch }
							items={ [
								{
									name: 'true',
									label: '表示',
									value: true,
								},
								{
									name: 'false',
									label: '非表示',
									value: false,
								},
							] }
							onChange={ handleOnChangeHideSearch }
						/>
					</BaseControl>
				</>
			) }
		</PanelBody>
	);
};

export default RichDrawerMenu;
