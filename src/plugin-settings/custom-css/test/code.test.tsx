/**
 * カスタムCSS / Code 編集パネルのロジックテスト
 *
 * 検証対象:
 *  - 共通 / フロント / ブロックエディター タブの CodeInput 変更 → updateSettings の payload
 *
 * setup-tests.js の TabPanel モックは全タブの children を同時にレンダリングする。
 * そのため CodeInput は all / front / editor の 3 つ同時に存在し、
 * 配列インデックスで TABS 順（all=0, front=1, editor=2）に対応させて判別する。
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
			data-testid="css-input"
			value={ value ?? '' }
			onChange={ ( e ) => onChange( e.target.value ) }
		/>
	),
} ) );

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
import Code from '../code';
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
			<Code />
		</CustomCssContext.Provider>
	);
	return { updateSettings };
};

// TABS の順序（all=0, front=1, editor=2）に依存。code.tsx の TABS が変わったら更新が必要。
const TAB_INDEX = {
	all: 0,
	front: 1,
	editor: 2,
} as const;

describe( 'Code — handleOnChange', () => {
	it( '共通タブ（all）の CodeInput 変更 → updateSettings({ all: 値 })', () => {
		const { updateSettings } = renderPanel( {
			settings: { all: '', front: '', editor: '' },
		} );
		const inputs = screen.getAllByTestId( 'css-input' );
		fireEvent.change( inputs[ TAB_INDEX.all ], {
			target: { value: '.common { color: red; }' },
		} );
		expect( updateSettings ).toHaveBeenCalledWith( {
			all: '.common { color: red; }',
		} );
	} );

	it( 'フロントタブ（front）の CodeInput 変更 → updateSettings({ front: 値 })', () => {
		const { updateSettings } = renderPanel( {
			settings: { all: '', front: '', editor: '' },
		} );
		const inputs = screen.getAllByTestId( 'css-input' );
		fireEvent.change( inputs[ TAB_INDEX.front ], {
			target: { value: '.front-only { color: blue; }' },
		} );
		expect( updateSettings ).toHaveBeenCalledWith( {
			front: '.front-only { color: blue; }',
		} );
	} );

	it( 'ブロックエディタータブ（editor）の CodeInput 変更 → updateSettings({ editor: 値 })', () => {
		const { updateSettings } = renderPanel( {
			settings: { all: '', front: '', editor: '' },
		} );
		const inputs = screen.getAllByTestId( 'css-input' );
		fireEvent.change( inputs[ TAB_INDEX.editor ], {
			target: { value: '.editor-only { color: green; }' },
		} );
		expect( updateSettings ).toHaveBeenCalledWith( {
			editor: '.editor-only { color: green; }',
		} );
	} );
} );

describe( 'Code — 既存値の表示', () => {
	it( '各タブに対応する settings の値が CodeInput の value にバインドされる', () => {
		renderPanel( {
			settings: {
				all: '.a {}',
				front: '.f {}',
				editor: '.e {}',
			},
		} );
		const inputs = screen.getAllByTestId(
			'css-input'
		) as HTMLTextAreaElement[];
		expect( inputs[ TAB_INDEX.all ].value ).toBe( '.a {}' );
		expect( inputs[ TAB_INDEX.front ].value ).toBe( '.f {}' );
		expect( inputs[ TAB_INDEX.editor ].value ).toBe( '.e {}' );
	} );
} );
