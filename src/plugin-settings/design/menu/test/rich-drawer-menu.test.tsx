/**
 * リッチドロワーメニュー設定パネルのロジックテスト
 *
 * 検証対象は「操作 → updateSection の payload」と「mobileMenuEnable による
 * 条件付き表示の出し分け」のロジック部分のみ。レンダリングや見た目は対象外。
 */

/* WordPress Dependencies */
import { render, screen, fireEvent } from '@testing-library/react';

/* Plugin Dependencies */
import RichDrawerMenu from '../rich-drawer-menu';

type SectionSettings = Record< string, unknown >;
type RenderProps = {
	updateSection: jest.Mock;
	sectionSettings: SectionSettings;
};

const renderPanel = ( overrides: Partial< RenderProps > = {} ) => {
	const props: RenderProps = {
		updateSection: jest.fn(),
		sectionSettings: {},
		...overrides,
	};
	render(
		<RichDrawerMenu
			updateSection={ props.updateSection }
			sectionSettings={ props.sectionSettings }
		/>
	);
	return props;
};

describe( 'RichDrawerMenu — handleOnChange ロジック', () => {
	it( '「ON」ボタンクリック → updateSection({ mobileMenuEnable: true }) が呼ばれる', () => {
		const { updateSection } = renderPanel();
		fireEvent.click( screen.getByRole( 'button', { name: 'ON' } ) );
		expect( updateSection ).toHaveBeenCalledWith( {
			mobileMenuEnable: true,
		} );
	} );

	it( '「OFF」ボタンクリック → updateSection({ mobileMenuEnable: false }) が呼ばれる', () => {
		const { updateSection } = renderPanel( {
			sectionSettings: { mobileMenuEnable: true },
		} );
		fireEvent.click( screen.getByRole( 'button', { name: 'OFF' } ) );
		expect( updateSection ).toHaveBeenCalledWith( {
			mobileMenuEnable: false,
		} );
	} );

	it( 'グローバルメニュー「非表示」クリック → updateSection({ mobileMenuHideGlobalMenu: true }) が呼ばれる', () => {
		const { updateSection } = renderPanel( {
			sectionSettings: { mobileMenuEnable: true },
		} );
		// 有効化中は「非表示」ボタンが2つ存在する（[0]=グローバルメニュー、[1]=検索）
		const hideButtons = screen.getAllByRole( 'button', { name: '非表示' } );
		fireEvent.click( hideButtons[ 0 ] );
		expect( updateSection ).toHaveBeenCalledWith( {
			mobileMenuHideGlobalMenu: true,
		} );
	} );

	it( 'グローバルメニュー「表示」クリック → updateSection({ mobileMenuHideGlobalMenu: false }) が呼ばれる', () => {
		const { updateSection } = renderPanel( {
			sectionSettings: {
				mobileMenuEnable: true,
				mobileMenuHideGlobalMenu: true,
			},
		} );
		const showButtons = screen.getAllByRole( 'button', { name: '表示' } );
		fireEvent.click( showButtons[ 0 ] );
		expect( updateSection ).toHaveBeenCalledWith( {
			mobileMenuHideGlobalMenu: false,
		} );
	} );

	it( '検索「非表示」クリック → updateSection({ mobileMenuHideSearch: true }) が呼ばれる', () => {
		const { updateSection } = renderPanel( {
			sectionSettings: { mobileMenuEnable: true },
		} );
		const hideButtons = screen.getAllByRole( 'button', { name: '非表示' } );
		fireEvent.click( hideButtons[ 1 ] );
		expect( updateSection ).toHaveBeenCalledWith( {
			mobileMenuHideSearch: true,
		} );
	} );

	it( '検索「表示」クリック → updateSection({ mobileMenuHideSearch: false }) が呼ばれる', () => {
		const { updateSection } = renderPanel( {
			sectionSettings: {
				mobileMenuEnable: true,
				mobileMenuHideSearch: true,
			},
		} );
		const showButtons = screen.getAllByRole( 'button', { name: '表示' } );
		fireEvent.click( showButtons[ 1 ] );
		expect( updateSection ).toHaveBeenCalledWith( {
			mobileMenuHideSearch: false,
		} );
	} );
} );

describe( 'RichDrawerMenu — 条件付き表示の分岐ロジック', () => {
	it( 'mobileMenuEnable が未設定（false 相当）時はグローバルメニュー / 検索の操作 UI が出ない', () => {
		renderPanel();
		// 「表示」「非表示」ボタンは追加 UI 内のみに存在する
		expect(
			screen.queryByRole( 'button', { name: '表示' } )
		).toBeNull();
		expect(
			screen.queryByRole( 'button', { name: '非表示' } )
		).toBeNull();
	} );

	it( 'mobileMenuEnable=false 明示時もグローバルメニュー / 検索の操作 UI が出ない', () => {
		renderPanel( { sectionSettings: { mobileMenuEnable: false } } );
		expect(
			screen.queryByRole( 'button', { name: '表示' } )
		).toBeNull();
		expect(
			screen.queryByRole( 'button', { name: '非表示' } )
		).toBeNull();
	} );

	it( 'mobileMenuEnable=true 時はグローバルメニュー / 検索の操作 UI が出る（各「表示」「非表示」が 2 つずつ）', () => {
		renderPanel( { sectionSettings: { mobileMenuEnable: true } } );
		expect(
			screen.getAllByRole( 'button', { name: '表示' } )
		).toHaveLength( 2 );
		expect(
			screen.getAllByRole( 'button', { name: '非表示' } )
		).toHaveLength( 2 );
	} );
} );
