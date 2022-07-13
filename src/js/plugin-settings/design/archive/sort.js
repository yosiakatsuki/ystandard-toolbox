/**
 * WordPress
 */
import { PanelBody } from '@wordpress/components';
/**
 * yStandard
 */
import CustomSelectControl from '@aktk/components/custom-select-control';
import BaseControl from '../../component/base-control';

const ORDER = [
	{ key: '', name: '公開日/降順(デフォルト)' },
	{ key: 'date/ASC', name: '公開日/昇順' },
	{ key: 'modified/DESC', name: '更新日/降順' },
	{ key: 'modified/ASC', name: '更新日/昇順' },
	{ key: 'title/ASC', name: 'タイトル/A-Z' },
	{ key: 'title/DESC', name: 'タイトル/Z-A' },
	{ key: 'rand/ASC', name: 'ランダム' },
];

const Sort = ( { updateSection, sectionSettings } ) => {
	const handleOnChangeOrder = ( newValue ) => {
		updateSection( {
			archiveOrder: newValue,
		} );
	};
	return (
		<PanelBody title={ '並び順' }>
			<BaseControl isFullWidth>
				<CustomSelectControl
					label={ '並び順' }
					options={ ORDER }
					value={ sectionSettings?.archiveOrder }
					onChange={ handleOnChangeOrder }
					isHorizon
				/>
			</BaseControl>
		</PanelBody>
	);
};
export default Sort;
