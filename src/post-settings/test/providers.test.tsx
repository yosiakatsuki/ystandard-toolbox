import { fireEvent, render, screen } from '@testing-library/react';

/**
 * WordPress Dependencies
 */
import { useEntityProp } from '@wordpress/core-data';
import { applyFilters, removeFilter } from '@wordpress/hooks';

/**
 * Plugin Dependencies
 */
import HeaderOverlaySetting, {
	OVERLAY_META_KEY,
} from '../providers/header-overlay';
import { registerPostSettingsProviders } from '../providers/index';
import MenuReplaceSetting, {
	MENU_REPLACE_META_KEY,
} from '../providers/menu-replace';
import {
	ITEM_FILTER,
	SECTION_FILTER,
	type PostSettingsProviderConfig,
} from '../types';

jest.mock( '@wordpress/core-data', () => ( {
	useEntityProp: jest.fn(),
} ) );

jest.mock( '@aktk/block-components/wp-controls/base-control', () => ( {
	__esModule: true,
	default: ( { children }: { children: React.ReactNode } ) => (
		<div>{ children }</div>
	),
} ) );

jest.mock( '@aktk/block-components/components/toggle-group', () => ( {
	ToggleGroup: ( {
		label,
		value,
		onChange,
		options,
	}: {
		label: string;
		value: string;
		onChange: ( value?: string | number ) => void;
		options: Array< { label: string; value: string } >;
	} ) => (
		<fieldset aria-label={ label }>
			<legend>{ label }</legend>
			{ options.map( ( option ) => (
				<button
					key={ option.value }
					type="button"
					aria-pressed={ value === option.value }
					onClick={ () => onChange( option.value ) }
				>
					{ option.label }
				</button>
			) ) }
		</fieldset>
	),
} ) );

jest.mock( '@aktk/block-components/components/custom-select-control', () => ( {
	CustomSelectControl: ( {
		label,
		value,
		options,
		onChange,
	}: {
		label: string;
		value: string;
		options: Array< { key: string; name: string } >;
		onChange: ( value: string ) => void;
	} ) => (
		<>
			<label htmlFor="test-menu-select">{ label }</label>
			<select
				id="test-menu-select"
				value={ value }
				onChange={ ( event ) => onChange( event.target.value ) }
			>
				{ options.map( ( option ) => (
					<option key={ option.key } value={ option.key }>
						{ option.name }
					</option>
				) ) }
			</select>
		</>
	),
} ) );

const config: PostSettingsProviderConfig = {
	apiVersion: 1,
	postType: 'page',
	postId: 10,
	overlay: { enabled: true },
	menuReplace: {
		enabled: true,
		locations: [ { name: 'primary', label: 'メインメニュー' } ],
		menus: [
			{ value: '', label: '- 変更なし -' },
			{ value: '20', label: 'テストメニュー' },
		],
	},
};

const context = {
	apiVersion: 1 as const,
	postType: 'page',
	postId: 10,
};

const mockUseEntityProp = useEntityProp as jest.Mock;

describe( 'Toolbox投稿設定プロバイダー', () => {
	beforeEach( () => {
		window.ystdtbPostSettingsProvider = config;
	} );

	afterEach( () => {
		delete window.ystdtbPostSettingsProvider;
		jest.clearAllMocks();
		removeFilter( SECTION_FILTER, 'ystandard-toolbox/design' );
		removeFilter( SECTION_FILTER, 'ystandard-toolbox/navigation' );
		removeFilter( ITEM_FILTER, 'ystandard-toolbox/header-overlay' );
		removeFilter( ITEM_FILTER, 'ystandard-toolbox/menu-replace' );
	} );

	it( 'オーバーレイ設定を独立したTSXから投稿メタへ反映する', () => {
		const setMeta = jest.fn();
		mockUseEntityProp.mockReturnValue( [
			{ [ OVERLAY_META_KEY ]: 'none', untouched: 'keep' },
			setMeta,
		] );

		render( <HeaderOverlaySetting postType="page" postId={ 10 } /> );
		expect( screen.getAllByText( 'ヘッダーオーバーレイ' ) ).toHaveLength(
			1
		);
		fireEvent.click( screen.getByRole( 'button', { name: '有効' } ) );

		expect( mockUseEntityProp ).toHaveBeenCalledWith(
			'postType',
			'page',
			'meta',
			10
		);
		expect( setMeta ).toHaveBeenCalledWith( {
			[ OVERLAY_META_KEY ]: 'on',
			untouched: 'keep',
		} );
	} );

	it( '対象位置だけを更新してほかのメニュー設定を保持する', () => {
		const setMeta = jest.fn();
		mockUseEntityProp.mockReturnValue( [
			{
				[ MENU_REPLACE_META_KEY ]: { footer: '30' },
				untouched: 'keep',
			},
			setMeta,
		] );

		render( <MenuReplaceSetting postType="page" postId={ 10 } /> );
		expect( screen.getAllByText( 'メインメニュー' ) ).toHaveLength( 1 );
		fireEvent.change( screen.getByLabelText( 'メインメニュー' ), {
			target: { value: '20' },
		} );

		expect( setMeta ).toHaveBeenCalledWith( {
			[ MENU_REPLACE_META_KEY ]: {
				footer: '30',
				primary: '20',
			},
			untouched: 'keep',
		} );
	} );

	it( 'セクションと独立した設定コンポーネント参照をフックへ登録する', () => {
		registerPostSettingsProviders( config );

		const sections = applyFilters( SECTION_FILTER, [], context );
		const items = applyFilters( ITEM_FILTER, [], context );

		expect( sections ).toEqual( [
			{ id: 'ystdtb/design', title: '[Toolbox]デザイン', order: 20 },
			{
				id: 'ystdtb/navigation',
				title: '[Toolbox]ナビゲーション',
				order: 30,
			},
		] );
		expect( items ).toEqual( [
			{
				id: 'ystdtb/header-overlay',
				section: 'ystdtb/design',
				order: 10,
				Component: HeaderOverlaySetting,
			},
			{
				id: 'ystdtb/menu-replace',
				section: 'ystdtb/navigation',
				order: 10,
				Component: MenuReplaceSetting,
			},
		] );
	} );
} );
