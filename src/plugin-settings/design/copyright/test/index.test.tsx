/**
 * Copyright 設定パネルのロジックテスト
 *
 * 検証対象:
 *  - CodeInput / HorizonButtonSelect / DestructiveButton 各操作 → DesignContext の updateSettings の payload
 *  - 「設定をデフォルトに戻す」が getAdminConfig('copyrightDefault') の値を渡す
 *  - tab.name が 'copyright' 以外のとき何もレンダリングされない（条件付き表示）
 */

/* WordPress Dependencies */
import { render, screen, fireEvent } from '@testing-library/react';

/* CodeInput は CodeMirror 依存で重いので軽量モック（textarea で代替） */
jest.mock( '@aktk/components/code-input', () => ( {
	CodeInput: ( {
		// eslint-disable-next-line react/prop-types
		value,
		// eslint-disable-next-line react/prop-types
		onChange,
	}: {
		value: string;
		onChange: ( newValue: string ) => void;
	} ) => (
		<textarea
			aria-label="copyright-input"
			value={ value ?? '' }
			onChange={ ( e ) => onChange( e.target.value ) }
		/>
	),
} ) );

/* getAdminConfig はテスト用の固定値を返すモック */
jest.mock( '@aktk/plugin-settings/utils/config', () => ( {
	getAdminConfig: ( name?: string ) => {
		if ( 'copyrightDefault' === name ) {
			return '&copy; {year} <a href="{url}" rel="home">{site}</a>';
		}
		return undefined;
	},
	getPluginAssetsUrl: () => '/test-assets',
} ) );

/* DesignContext を上書きするため、親モジュールから export されているコンテキストをモック。
   factory 内で createContext を呼ぶことで jest.mock のホイストによる外部変数参照エラーを回避する */
jest.mock( '../../index', () => {
	// eslint-disable-next-line @typescript-eslint/no-require-imports
	const { createContext } = require( '@wordpress/element' );
	return {
		__esModule: true,
		DesignContext: createContext( null ),
	};
} );

/* Plugin Dependencies */
import Copyright from '../index';
import { DesignContext } from '../../index';

type ContextValue = {
	settings: Record< string, unknown >;
	getSettings: ( section: string ) => Record< string, unknown >;
	updateSettings: jest.Mock;
};

const renderPanel = ( {
	tabName = 'copyright',
	sectionSettings = {},
	updateSettings = jest.fn(),
}: {
	tabName?: string;
	sectionSettings?: Record< string, unknown >;
	updateSettings?: jest.Mock;
} = {} ) => {
	const value: ContextValue = {
		settings: { copyright: sectionSettings },
		getSettings: () => sectionSettings,
		updateSettings,
	};
	render(
		// @ts-ignore
		<DesignContext.Provider value={ value }>
			<Copyright tab={ { name: tabName, title: 'Copyright' } as never } />
		</DesignContext.Provider>
	);
	return { updateSettings };
};

describe( 'Copyright — handleCopyrightOnChange', () => {
	it( 'CodeInput を変更 → updateSettings("copyright", { copyright: 値, disable_theme_info }) が呼ばれる', () => {
		const { updateSettings } = renderPanel( {
			sectionSettings: { copyright: '元', disable_theme_info: false },
		} );
		fireEvent.change( screen.getByLabelText( 'copyright-input' ), {
			target: { value: '© 2026 テスト' },
		} );
		expect( updateSettings ).toHaveBeenCalledWith( 'copyright', {
			copyright: '© 2026 テスト',
			disable_theme_info: false,
		} );
	} );
} );

describe( 'Copyright — handlePoweredByOnChange', () => {
	it( '「削除する」ボタンクリック → updateSettings("copyright", { ..., disable_theme_info: true })', () => {
		const { updateSettings } = renderPanel( {
			sectionSettings: { copyright: '©', disable_theme_info: false },
		} );
		fireEvent.click( screen.getByRole( 'button', { name: '削除する' } ) );
		expect( updateSettings ).toHaveBeenCalledWith( 'copyright', {
			copyright: '©',
			disable_theme_info: true,
		} );
	} );

	it( '「表示する」ボタンクリック → updateSettings("copyright", { ..., disable_theme_info: false })', () => {
		const { updateSettings } = renderPanel( {
			sectionSettings: { copyright: '©', disable_theme_info: true },
		} );
		fireEvent.click( screen.getByRole( 'button', { name: '表示する' } ) );
		expect( updateSettings ).toHaveBeenCalledWith( 'copyright', {
			copyright: '©',
			disable_theme_info: false,
		} );
	} );
} );

describe( 'Copyright — handleClearSettings', () => {
	it( '「設定をデフォルトに戻す」ボタンクリック → updateSettings("copyright", { copyright: getAdminConfig("copyrightDefault") })', () => {
		const { updateSettings } = renderPanel( {
			sectionSettings: {
				copyright: 'カスタム',
				disable_theme_info: true,
			},
		} );
		fireEvent.click(
			screen.getByRole( 'button', { name: '設定をデフォルトに戻す' } )
		);
		expect( updateSettings ).toHaveBeenCalledWith( 'copyright', {
			copyright:
				'&copy; {year} <a href="{url}" rel="home">{site}</a>',
			// disable_theme_info はクリア対象外（既存値が維持される）。
			disable_theme_info: true,
		} );
	} );
} );

describe( 'Copyright — タブ条件付きレンダリング', () => {
	it( 'tab.name !== "copyright" のとき UI 要素がレンダリングされない', () => {
		renderPanel( { tabName: 'header' } );
		expect(
			screen.queryByLabelText( 'copyright-input' )
		).toBeNull();
		expect(
			screen.queryByRole( 'button', { name: '削除する' } )
		).toBeNull();
	} );

	it( 'tab.name === "copyright" のとき UI 要素がレンダリングされる', () => {
		renderPanel( { tabName: 'copyright' } );
		expect(
			screen.getByLabelText( 'copyright-input' )
		).toBeInTheDocument();
	} );
} );
