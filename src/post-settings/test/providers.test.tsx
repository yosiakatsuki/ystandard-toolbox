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
import SeoDescriptionSetting, {
	SEO_DESCRIPTION_META_KEY,
} from '../providers/seo-description';
import SeoTitleSetting, { SEO_TITLE_META_KEY } from '../providers/seo-title';
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
	default: ( {
		children,
		help,
	}: {
		children: React.ReactNode;
		help?: string;
	} ) => (
		<div>
			{ children }
			{ help && (
				<p className="components-base-control__help">{ help }</p>
			) }
		</div>
	),
} ) );

jest.mock( '@aktk/block-components/wp-controls/text-control', () => ( {
	__esModule: true,
	default: ( {
		label,
		help,
		value,
		onChange,
	}: {
		label: string;
		help?: string;
		value: string;
		onChange: ( value: string ) => void;
	} ) => (
		<>
			<label htmlFor="test-seo-title">{ label }</label>
			<input
				id="test-seo-title"
				value={ value }
				onChange={ ( event ) => onChange( event.target.value ) }
			/>
			{ help && <p>{ help }</p> }
		</>
	),
} ) );

jest.mock( '@aktk/block-components/wp-controls/textarea-control', () => ( {
	__esModule: true,
	default: ( {
		label,
		help,
		value,
		onChange,
	}: {
		label: string;
		help?: string;
		value: string;
		onChange: ( value: string ) => void;
	} ) => (
		<>
			<label htmlFor="test-seo-description">{ label }</label>
			<textarea
				id="test-seo-description"
				value={ value }
				onChange={ ( event ) => onChange( event.target.value ) }
			/>
			{ help && <p>{ help }</p> }
		</>
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
		removeFilter( ITEM_FILTER, 'ystandard-toolbox/seo-title' );
		removeFilter( ITEM_FILTER, 'ystandard-toolbox/seo-description' );
		removeFilter( ITEM_FILTER, 'ystandard-toolbox/header-overlay' );
		removeFilter( ITEM_FILTER, 'ystandard-toolbox/menu-replace' );
	} );

	it( 'yStandardと共通の投稿設定フック名を使用する', () => {
		expect( SECTION_FILTER ).toBe(
			'ystandard.hooks.postSettings.sections'
		);
		expect( ITEM_FILTER ).toBe( 'ystandard.hooks.postSettings.items' );
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
		expect(
			screen.getByText(
				'「全体設定に従う」を選択した場合、ヘッダーオーバーレイの「詳細ページ」設定に従います。'
			)
		).toHaveClass( 'components-base-control__help' );
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

	it( 'SEOタイトルを独立したTSXから投稿メタへ反映する', () => {
		const setMeta = jest.fn();
		mockUseEntityProp.mockReturnValue( [
			{ [ SEO_TITLE_META_KEY ]: '変更前', untouched: 'keep' },
			setMeta,
		] );

		render( <SeoTitleSetting postType="page" postId={ 10 } /> );
		fireEvent.change( screen.getByLabelText( '<title>タグ用タイトル' ), {
			target: { value: '変更後' },
		} );

		expect( setMeta ).toHaveBeenCalledWith( {
			[ SEO_TITLE_META_KEY ]: '変更後',
			untouched: 'keep',
		} );
	} );

	it( 'meta descriptionを独立したTSXから投稿メタへ反映する', () => {
		const setMeta = jest.fn();
		mockUseEntityProp.mockReturnValue( [
			{
				[ SEO_DESCRIPTION_META_KEY ]: '変更前',
				untouched: 'keep',
			},
			setMeta,
		] );

		render( <SeoDescriptionSetting postType="page" postId={ 10 } /> );
		fireEvent.change( screen.getByLabelText( 'meta description' ), {
			target: { value: '変更後' },
		} );

		expect( setMeta ).toHaveBeenCalledWith( {
			[ SEO_DESCRIPTION_META_KEY ]: '変更後',
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
		expect(
			screen.getByText(
				'この投稿を表示するときだけ、選択したメニューへ切り替えます。'
			)
		).toHaveClass( 'components-base-control__help' );
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
				id: 'ystdtb/seo-title',
				section: 'ystandard/seo',
				order: 100,
				Component: SeoTitleSetting,
			},
			{
				id: 'ystdtb/seo-description',
				section: 'ystandard/seo',
				order: 110,
				Component: SeoDescriptionSetting,
			},
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

	it( '投稿設定コンテキストが異なる場合は設定を登録しない', () => {
		registerPostSettingsProviders( config );

		const otherContext = { ...context, postId: 11 };
		expect( applyFilters( SECTION_FILTER, [], otherContext ) ).toEqual(
			[]
		);
		expect( applyFilters( ITEM_FILTER, [], otherContext ) ).toEqual( [] );
	} );
} );
