/**
 * コード追加 / EditorPanel のロジックテスト
 *
 * 検証対象:
 *  - 各タブ（head / body_open / body_close）の CodeInput 変更 → setSettings の payload
 *  - 既存値（settings.{tab.name}）が CodeInput の value にバインドされる
 *  - AMP 有効時のみ AMP 用 CodeInput と注意書きが描画される
 *  - AMP 用 CodeInput 変更で setSettings に {tab.name}_amp のキーが含まれる
 *  - AMP 有効時に settings.{tab.name}_amp の値が AMP 用 CodeInput にバインドされる
 *
 * AMP 切替は getAdminConfig('isAmpEnable', false) の戻り値に依存するため、
 * `@aktk/plugin-settings/utils/config` をモックして真偽を切り替える。
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
			data-testid="code-input"
			value={ value ?? '' }
			onChange={ ( e ) => onChange( e.target.value ) }
		/>
	),
} ) );

/* getAdminConfig をモック（AMP 分岐切り替え用） */
jest.mock( '@aktk/plugin-settings/utils/config', () => ( {
	getAdminConfig: jest.fn(),
} ) );

/* AddCodeContext を上書きするため、親モジュール（index.tsx）から
   export されているコンテキストを再生成する。
   factory 内で createContext を呼ぶことでホイスト時の外部参照エラーを回避。 */
jest.mock( '../index', () => {
	// eslint-disable-next-line @typescript-eslint/no-require-imports
	const { createContext } = require( '@wordpress/element' );
	return {
		__esModule: true,
		AddCodeContext: createContext( null ),
	};
} );

/* Plugin Dependencies */
import EditorPanel from '../editor-panel';
import { AddCodeContext } from '../index';
import { getAdminConfig } from '@aktk/plugin-settings/utils/config';

const mockedGetAdminConfig = getAdminConfig as jest.Mock;

type ContextValue = {
	settings: Record< string, unknown >;
	setSettings: jest.Mock;
	isLoading: boolean;
	setIsLoading: jest.Mock;
};

type TabName = 'head' | 'body_open' | 'body_close';

const renderPanel = ( {
	tabName,
	settings = {},
	setSettings = jest.fn(),
	isAmpEnable = false,
}: {
	tabName: TabName;
	settings?: Record< string, unknown >;
	setSettings?: jest.Mock;
	isAmpEnable?: boolean;
} ) => {
	mockedGetAdminConfig.mockImplementation(
		( name: string, defaultValue: unknown ) => {
			if ( name === 'isAmpEnable' ) {
				return isAmpEnable;
			}
			return defaultValue;
		}
	);
	const value: ContextValue = {
		settings,
		setSettings,
		isLoading: false,
		setIsLoading: jest.fn(),
	};
	render(
		// @ts-ignore
		<AddCodeContext.Provider value={ value }>
			<EditorPanel tab={ { name: tabName, title: '' } } />
		</AddCodeContext.Provider>
	);
	return { setSettings };
};

afterEach( () => {
	mockedGetAdminConfig.mockReset();
} );

describe( 'EditorPanel — handleCodeOnChange', () => {
	it.each( [ [ 'head' ], [ 'body_open' ], [ 'body_close' ] ] as [
		TabName,
	][] )(
		'%s タブ: CodeInput 変更で setSettings に該当キー（値）が含まれる',
		( tabName ) => {
			const { setSettings } = renderPanel( {
				tabName,
				settings: { head: '', body_open: '', body_close: '' },
			} );
			const input = screen.getByTestId( 'code-input' );
			fireEvent.change( input, {
				target: { value: '<script>foo</script>' },
			} );
			expect( setSettings ).toHaveBeenCalledWith( {
				head: '',
				body_open: '',
				body_close: '',
				[ tabName ]: '<script>foo</script>',
			} );
		}
	);
} );

describe( 'EditorPanel — 既存値の表示', () => {
	it( 'settings[tab.name] の値が CodeInput の value にバインドされる', () => {
		renderPanel( {
			tabName: 'head',
			settings: {
				head: '<meta name="x" />',
				body_open: '',
				body_close: '',
			},
		} );
		const input = screen.getByTestId( 'code-input' ) as HTMLTextAreaElement;
		expect( input.value ).toBe( '<meta name="x" />' );
	} );
} );

describe( 'EditorPanel — AMP 分岐', () => {
	it( 'AMP 無効時: AMP 用 CodeInput と「AMP用コード追加」ラベルが描画されない', () => {
		renderPanel( {
			tabName: 'head',
			settings: {},
			isAmpEnable: false,
		} );
		// CodeInput は通常用の 1 つだけ。
		expect( screen.getAllByTestId( 'code-input' ) ).toHaveLength( 1 );
		// AMP 用ラベルは描画されない。
		expect( screen.queryByText( 'AMP用コード追加' ) ).toBeNull();
	} );

	it( 'AMP 有効時: AMP 用 CodeInput と「AMP用コード追加」ラベルが描画される', () => {
		renderPanel( {
			tabName: 'head',
			settings: {},
			isAmpEnable: true,
		} );
		expect( screen.getAllByTestId( 'code-input' ) ).toHaveLength( 2 );
		expect( screen.queryByText( 'AMP用コード追加' ) ).not.toBeNull();
	} );

	it( 'AMP 有効時: AMP 用 CodeInput 変更で setSettings に {tab.name}_amp が含まれる', () => {
		const { setSettings } = renderPanel( {
			tabName: 'head',
			settings: { head: '', body_open: '', body_close: '' },
			isAmpEnable: true,
		} );
		// 描画順で inputs[0] が通常用、inputs[1] が AMP 用。
		const inputs = screen.getAllByTestId( 'code-input' );
		fireEvent.change( inputs[ 1 ], {
			target: { value: '<amp-script>foo</amp-script>' },
		} );
		expect( setSettings ).toHaveBeenCalledWith( {
			head: '',
			body_open: '',
			body_close: '',
			head_amp: '<amp-script>foo</amp-script>',
		} );
	} );

	it( 'AMP 有効時: settings[{tab.name}_amp] の値が AMP 用 CodeInput にバインドされる', () => {
		renderPanel( {
			tabName: 'head',
			settings: {
				head: '',
				head_amp: '<x>amp</x>',
			},
			isAmpEnable: true,
		} );
		const inputs = screen.getAllByTestId(
			'code-input'
		) as HTMLTextAreaElement[];
		expect( inputs[ 0 ].value ).toBe( '' );
		expect( inputs[ 1 ].value ).toBe( '<x>amp</x>' );
	} );
} );
