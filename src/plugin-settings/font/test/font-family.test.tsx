/**
 * フォント設定 / FontFamily パネルのロジックテスト
 *
 * 検証対象:
 *  - InputControl 入力 → updateSettings({ family }) の payload
 *  - 「現在のフォント設定をコピーする」ボタン → themeFontSetting を family にコピー
 *  - 条件付き表示の分岐:
 *    - isYStandard=false のときコピー UI が出ない
 *    - settings.family 入力済みのときコピー UI が出ない
 *    - 両条件を満たすときのみコピー UI が出る
 *  - placeholder の出し分け（family 空 → themeFontSetting / family 入力済み → 空）
 */

/* WordPress Dependencies */
import { render, screen, fireEvent } from '@testing-library/react';

/* InputControl ラッパーは @wordpress/components の __experimentalInputControl 依存で、
   グローバルな setup-tests.js には同コンポーネントのモックが無いためテスト側で軽量モックする。 */
jest.mock(
	'@aktk/block-components/wp-controls/input-control',
	() => ( {
		__esModule: true,
		default: ( props: {
			id?: string;
			value: string;
			placeholder?: string;
			onChange: ( v: string | undefined ) => void;
		} ) => (
			<input
				id={ props.id }
				placeholder={ props.placeholder }
				value={ props.value ?? '' }
				onChange={ ( e ) => props.onChange( e.target.value ) }
			/>
		),
	} )
);

/* getAdminConfig は isYStandard を切り替えたいので変数経由でモック。
   `mock` プレフィックス変数は jest.mock のホイスト後にも参照可能。 */
let mockIsYStandard = true;

jest.mock( '@aktk/plugin-settings/utils/config', () => ( {
	getAdminConfig: ( name?: string, defaultValue?: unknown ) => {
		if ( 'isYStandard' === name ) {
			return mockIsYStandard;
		}
		return defaultValue;
	},
	getPluginAssetsUrl: () => '/test-assets',
} ) );

/* FontContext を上書きするため、親モジュールから export されているコンテキストをモック。
   factory 内で createContext を呼ぶことでホイスト時の外部参照エラーを回避する。 */
jest.mock( '../index', () => {
	// eslint-disable-next-line @typescript-eslint/no-require-imports
	const { createContext } = require( '@wordpress/element' );
	return {
		__esModule: true,
		FontContext: createContext( null ),
	};
} );

/* Plugin Dependencies */
import FontFamily from '../font-family';
import { FontContext } from '../index';

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
		<FontContext.Provider value={ value }>
			<FontFamily />
		</FontContext.Provider>
	);
	return { updateSettings };
};

const getFamilyInput = (): HTMLInputElement => {
	// InputControl は内部で <input id="font-family-input"> をレンダリング。
	const input = document.getElementById(
		'font-family-input'
	) as HTMLInputElement | null;
	if ( ! input ) {
		throw new Error( 'font-family-input が見つからない' );
	}
	return input;
};

beforeEach( () => {
	mockIsYStandard = true;
} );

describe( 'FontFamily — handleOnChange', () => {
	it( 'family 入力 → updateSettings({ family: 値 }) が呼ばれる', () => {
		const { updateSettings } = renderPanel( {
			settings: { family: '', themeFontSetting: 'serif' },
		} );
		fireEvent.change( getFamilyInput(), {
			target: { value: '"Noto Sans JP", sans-serif' },
		} );
		expect( updateSettings ).toHaveBeenCalledWith( {
			family: '"Noto Sans JP", sans-serif',
		} );
	} );
} );

describe( 'FontFamily — handleOnClickCopyFontFamily', () => {
	it( '「現在のフォント設定をコピーする」 → updateSettings({ family: themeFontSetting })', () => {
		const { updateSettings } = renderPanel( {
			settings: { family: '', themeFontSetting: '"Hiragino Sans", sans-serif' },
		} );
		fireEvent.click(
			screen.getByRole( 'button', {
				name: '現在のフォント設定をコピーする',
			} )
		);
		expect( updateSettings ).toHaveBeenCalledWith( {
			family: '"Hiragino Sans", sans-serif',
		} );
	} );

	it( 'themeFontSetting 未設定でコピーすると family が空文字になる', () => {
		const { updateSettings } = renderPanel( {
			settings: { family: '' },
		} );
		fireEvent.click(
			screen.getByRole( 'button', {
				name: '現在のフォント設定をコピーする',
			} )
		);
		expect( updateSettings ).toHaveBeenCalledWith( { family: '' } );
	} );
} );

describe( 'FontFamily — 条件付き表示の分岐ロジック', () => {
	it( 'isYStandard=true かつ family 空のときコピー UI が表示される', () => {
		mockIsYStandard = true;
		renderPanel( {
			settings: { family: '', themeFontSetting: 'serif' },
		} );
		expect(
			screen.getByRole( 'button', {
				name: '現在のフォント設定をコピーする',
			} )
		).toBeInTheDocument();
	} );

	it( 'isYStandard=false のときコピー UI が表示されない', () => {
		mockIsYStandard = false;
		renderPanel( {
			settings: { family: '', themeFontSetting: 'serif' },
		} );
		expect(
			screen.queryByRole( 'button', {
				name: '現在のフォント設定をコピーする',
			} )
		).toBeNull();
	} );

	it( 'family 入力済みのときコピー UI が表示されない（isYStandard=true でも）', () => {
		mockIsYStandard = true;
		renderPanel( {
			settings: { family: 'serif', themeFontSetting: 'sans-serif' },
		} );
		expect(
			screen.queryByRole( 'button', {
				name: '現在のフォント設定をコピーする',
			} )
		).toBeNull();
	} );
} );

describe( 'FontFamily — placeholder の出し分け', () => {
	it( 'family 空のとき placeholder に themeFontSetting が表示される', () => {
		renderPanel( {
			settings: { family: '', themeFontSetting: 'serif' },
		} );
		expect( getFamilyInput().placeholder ).toBe( 'serif' );
	} );

	it( 'family 入力済みのとき placeholder は空になる', () => {
		renderPanel( {
			settings: {
				family: '"Noto Sans JP"',
				themeFontSetting: 'serif',
			},
		} );
		expect( getFamilyInput().placeholder ).toBe( '' );
	} );
} );
