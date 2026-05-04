/**
 * カスタムCSS / WP「追加CSS」警告パネルのロジックテスト
 *
 * 検証対象:
 *  - 警告メッセージの表示 / 非表示の分岐ロジック
 *    （hasWPCustomCss と hideNotice の組み合わせ）
 *  - 「このメッセージを非表示にする」トグル → updateSettings({ hideNotice }) の payload
 */

/* WordPress Dependencies */
import { render, screen, fireEvent } from '@testing-library/react';

/* CustomCssContext を上書きするため、親モジュールから export されているコンテキストをモック。
   factory 内で createContext を呼ぶことでホイスト時の外部参照エラーを回避する。 */
jest.mock( '../index', () => {
	// eslint-disable-next-line @typescript-eslint/no-require-imports
	const { createContext } = require( '@wordpress/element' );
	return {
		__esModule: true,
		CustomCssContext: createContext( null ),
	};
} );

/* Plugin Dependencies */
import WPCustomCss from '../wp-custom-css';
import { CustomCssContext } from '../index';

type ContextValue = {
	settings: Record< string, unknown >;
	setSettings: jest.Mock;
	isLoading: boolean;
	setIsLoading: jest.Mock;
	updateSettings: jest.Mock;
};

const renderPanel = ( {
	settings = {},
	updateSettings = jest.fn(),
}: {
	settings?: Record< string, unknown >;
	updateSettings?: jest.Mock;
} = {} ) => {
	const value: ContextValue = {
		settings,
		setSettings: jest.fn(),
		isLoading: false,
		setIsLoading: jest.fn(),
		updateSettings,
	};
	render(
		// @ts-ignore
		<CustomCssContext.Provider value={ value }>
			<WPCustomCss />
		</CustomCssContext.Provider>
	);
	return { updateSettings };
};

const NOTICE_HEADING = '「追加CSS」の設定が見つかりました。';

describe( 'WPCustomCss — 警告メッセージ表示の分岐ロジック', () => {
	it( 'hasWPCustomCss=true かつ hideNotice=false のとき警告が表示される', () => {
		renderPanel( {
			settings: { hasWPCustomCss: true, hideNotice: false },
		} );
		expect( screen.getByText( NOTICE_HEADING ) ).toBeInTheDocument();
	} );

	it( 'hasWPCustomCss=false のとき警告が表示されない', () => {
		renderPanel( {
			settings: { hasWPCustomCss: false, hideNotice: false },
		} );
		expect( screen.queryByText( NOTICE_HEADING ) ).toBeNull();
	} );

	it( 'hasWPCustomCss=true かつ hideNotice=true のとき警告が表示されない', () => {
		renderPanel( {
			settings: { hasWPCustomCss: true, hideNotice: true },
		} );
		expect( screen.queryByText( NOTICE_HEADING ) ).toBeNull();
	} );

	it( 'settings 未提供（hasWPCustomCss undefined）でも警告が表示されない', () => {
		renderPanel( { settings: {} } );
		expect( screen.queryByText( NOTICE_HEADING ) ).toBeNull();
	} );
} );

describe( 'WPCustomCss — handleOnChange', () => {
	it( '「このメッセージを非表示にする」トグル ON → updateSettings({ hideNotice: true })', () => {
		const { updateSettings } = renderPanel( {
			settings: { hasWPCustomCss: true, hideNotice: false },
		} );
		// ToggleControl はチェックボックス相当で出力される。
		const toggle = screen.getByRole( 'checkbox', {
			name: 'このメッセージを非表示にする',
		} );
		fireEvent.click( toggle );
		expect( updateSettings ).toHaveBeenCalledWith( { hideNotice: true } );
	} );
} );
