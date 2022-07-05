/**
 * WordPress
 */
import { PanelBody } from '@wordpress/components';
import { useContext, useState, useEffect } from '@wordpress/element';
/**
 * yStandard
 */
import { DesignContext } from '../index';
import ColorPaletteControl from '@aktk/components/color-palette-control';
import UnitControl from '@aktk/components/unit-control';
import HorizonButtons from '@aktk/components/horizon-buttons';
import BaseControl from '../../component/base-control';
import { migrateSubHeaderFontSize } from './function/sub-header';
import { getEditorColors } from '../../function/config';

const SECTION_NAME = 'header_design';

const SubHeader = ( props ) => {
	const { updateSection } = props;
	const [ subHeaderSettings, setSubHeaderSettings ] = useState( {} );
	const { getSettings, settings } = useContext( DesignContext );
	const getSubHeaderSettings = () => {
		const _settings = getSettings( SECTION_NAME );
		const fontSize =
			_settings?.subHeaderFontSize ??
			migrateSubHeaderFontSize(
				{
					size: _settings?.subHeaderFontSizeDesktop,
					unit: _settings?.subHeaderFontSizeUnitDesktop,
				},
				'0.7em'
			);
		setSubHeaderSettings( {
			background: _settings?.subHeaderBackgroundColorDesktop ?? '#f1f1f3',
			textColor: _settings?.subHeaderColorDesktop ?? '#666666',
			align: _settings?.subHeaderAlignDesktop ?? 'right',
			fontSize,
		} );
	};
	useEffect( getSubHeaderSettings, [ settings ] );

	const updateSubHeader = ( newValue ) => {
		updateSection( SECTION_NAME, newValue );
	};

	const handleOnChangeBackgroundColor = ( newValue ) => {
		updateSubHeader( {
			subHeaderBackgroundColorDesktop: newValue,
		} );
	};
	const handleOnChangeTextColor = ( newValue ) => {
		updateSubHeader( {
			subHeaderColorDesktop: newValue,
		} );
	};
	const handleOnChangeFontSize = ( newValue ) => {
		updateSubHeader( {
			subHeaderFontSize: newValue,
		} );
	};
	const handleOnChangeAlign = ( newValue ) => {
		updateSubHeader( {
			subHeaderAlignDesktop: newValue.name,
		} );
	};
	return (
		<PanelBody title={ 'サブヘッダー' }>
			<BaseControl label={ '背景色' } id={ 'background-color' }>
				<ColorPaletteControl
					label={ '背景色' }
					value={ subHeaderSettings?.background }
					onChange={ handleOnChangeBackgroundColor }
					position={ 'right bottom' }
					colors={ getEditorColors() }
				/>
			</BaseControl>
			<BaseControl label={ '文字色' } id={ 'text-color' }>
				<ColorPaletteControl
					label={ '文字色' }
					value={ subHeaderSettings?.textColor }
					onChange={ handleOnChangeTextColor }
					position={ 'right bottom' }
					colors={ getEditorColors() }
				/>
			</BaseControl>
			<BaseControl label={ '表示位置' } id={ 'position' }>
				<HorizonButtons
					primary={ subHeaderSettings?.align }
					items={ [
						{
							name: 'left',
							label: '左揃え',
						},
						{
							name: 'center',
							label: '中央揃え',
						},
						{
							name: 'right',
							label: '右揃え',
						},
					] }
					onChange={ handleOnChangeAlign }
				/>
			</BaseControl>
			<BaseControl label={ '文字サイズ' } id={ 'font-size' }>
				<UnitControl
					value={ subHeaderSettings?.fontSize }
					onChange={ handleOnChangeFontSize }
				/>
			</BaseControl>
		</PanelBody>
	);
};
export default SubHeader;
