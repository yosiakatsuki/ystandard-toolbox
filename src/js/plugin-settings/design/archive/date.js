/**
 * WordPress
 */
import { PanelBody } from '@wordpress/components';
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

const Date = ( { updateSection, sectionSettings } ) => {
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
					value={ sectionSettings?.archiveDisplayDate }
					onChange={ handleOnChangeDisplayDate }
					isHorizon
				/>
			</BaseControl>
		</PanelBody>
	);
};
export default Date;
