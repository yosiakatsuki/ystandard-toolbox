/**
 * WordPress
 */
import { PanelBody } from '@wordpress/components';
import { useState, useEffect } from '@wordpress/element';
/**
 * yStandard
 */
import CustomSelectControl from '@aktk/components/custom-select-control';
import BaseControl from '../../component/base-control';

const DISPLAY_DATE = [
	{
		key: '',
		name: '公開日(デフォルト)',
	},
	{
		key: 'modified',
		name: '更新日',
	},
];

const Date = ( props ) => {
	const { updateSection, sectionSettings } = props;
	const [ dateSettings, setDateSettings ] = useState( {} );

	const getDateSettings = () => {
		setDateSettings( {
			displayDate: sectionSettings?.archiveDisplayDate,
		} );

		return dateSettings;
	};
	useEffect( getDateSettings, [ sectionSettings ] );

	const handleOnChangeDisplayDate = ( newValue ) => {
		updateSection( {
			archiveDisplayDate: newValue,
		} );
	};
	return (
		<PanelBody title={ '日付情報' }>
			<BaseControl>
				<CustomSelectControl
					label={ '日付表示' }
					options={ DISPLAY_DATE }
					value={ dateSettings?.displayDate }
					onChange={ handleOnChangeDisplayDate }
					isHorizon
				/>
			</BaseControl>
		</PanelBody>
	);
};
export default Date;
