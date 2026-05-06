/**
 * フォント設定 / HTML 入力パネルのロジックテスト
 *
 * 検証対象:
 *  - CodeInput の値変更 → FontContext の updateSettings({ html }) の payload
 *
 * レンダリングや見た目は対象外（手動 UI テストで担保）。
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
			aria-label="font-html-input"
			value={ value ?? '' }
			onChange={ ( e ) => onChange( e.target.value ) }
		/>
	),
} ) );

/* FontContext を上書きするため、親モジュールから export されているコンテキストをモック。
   factory 内で createContext を呼ぶことで jest.mock のホイストによる外部変数参照エラーを回避する */
jest.mock( '../index', () => {
	// eslint-disable-next-line @typescript-eslint/no-require-imports
	const { createContext } = require( '@wordpress/element' );
	return {
		__esModule: true,
		FontContext: createContext( null ),
	};
} );

/* Plugin Dependencies */
import Html from '../html';
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
			<Html />
		</FontContext.Provider>
	);
	return { updateSettings };
};

describe( 'Font / Html — handleOnChange', () => {
	it( 'CodeInput 変更 → updateSettings({ html: 値 }) が呼ばれる', () => {
		const { updateSettings } = renderPanel( {
			settings: { html: '' },
		} );
		fireEvent.change( screen.getByLabelText( 'font-html-input' ), {
			target: { value: '<link rel="stylesheet" href="...">' },
		} );
		expect( updateSettings ).toHaveBeenCalledWith( {
			html: '<link rel="stylesheet" href="...">',
		} );
	} );

	it( 'settings.html が undefined でも空文字として扱われる', () => {
		renderPanel( { settings: {} } );
		const textarea = screen.getByLabelText(
			'font-html-input'
		) as HTMLTextAreaElement;
		expect( textarea.value ).toBe( '' );
	} );
} );
