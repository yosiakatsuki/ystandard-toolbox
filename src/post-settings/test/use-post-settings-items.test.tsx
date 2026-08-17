/**
 * WordPress Dependencies
 */
import { addFilter, removeFilter } from '@wordpress/hooks';

/**
 * Plugin Dependencies
 */
import {
	getPostSettingsItems,
	getPostSettingsSections,
} from '../host/use-post-settings-items';
import { ITEM_FILTER, SECTION_FILTER } from '../types';

const context = {
	apiVersion: 1 as const,
	postType: 'page',
	postId: 10,
};

function FirstSetting() {
	return null;
}

function LastSetting() {
	return null;
}

describe( '投稿設定フックの定義取得', () => {
	afterEach( () => {
		removeFilter( SECTION_FILTER, 'ystandard-toolbox-test/definitions' );
		removeFilter( ITEM_FILTER, 'ystandard-toolbox-test/definitions' );
	} );

	it( '表示順を整え、同じIDは後の定義を採用する', () => {
		addFilter( SECTION_FILTER, 'ystandard-toolbox-test/definitions', () => [
			{ id: 'test/late', title: '後', order: 20 },
			{ id: 'test/shared', title: '最初', order: 10 },
			{ id: 'test/shared', title: '最後', order: 30 },
		] );
		addFilter( ITEM_FILTER, 'ystandard-toolbox-test/definitions', () => [
			{
				id: 'test/shared',
				section: 'test/late',
				order: 20,
				Component: FirstSetting,
			},
			{
				id: 'test/shared',
				section: 'test/shared',
				order: 10,
				Component: LastSetting,
			},
		] );

		const sections = getPostSettingsSections( context );
		const items = getPostSettingsItems( context, sections );

		expect( sections.map( ( section ) => section.id ) ).toEqual( [
			'test/late',
			'test/shared',
		] );
		expect( sections[ 1 ].title ).toBe( '最後' );
		expect( items ).toHaveLength( 1 );
		expect( items[ 0 ].Component ).toBe( LastSetting );
	} );
} );
