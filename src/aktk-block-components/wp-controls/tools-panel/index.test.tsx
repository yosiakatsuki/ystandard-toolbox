/**
 * WordPress dependencies.
 */
import { render, screen } from '@testing-library/react';

/**
 * Aktk dependencies.
 */
import { ToolsPanel } from './index';

jest.mock( '@wordpress/components', () => ( {
	__experimentalToolsPanel: ( {
		children,
		label,
	}: {
		children?: React.ReactNode;
		label: string;
	} ) => <section aria-label={ label }>{ children }</section>,
	__experimentalToolsPanelItem: () => <div />,
} ) );

jest.mock( '@wordpress/compose', () => ( {
	useViewportMatch: () => false,
} ) );

describe( 'ToolsPanel', () => {
	it( 'アイコン指定時はパネル見出し用の配置要素を追加する', () => {
		const { container } = render(
			<ToolsPanel
				icon={ <span data-testid="panel-icon">ys</span> }
				label="レスポンシブ設定"
			/>
		);

		expect( screen.getByTestId( 'panel-icon' ) ).toBeInTheDocument();
		expect(
			container.querySelector( '.aktk-component-tools-panel--with-icon' )
		).not.toBeNull();
		expect(
			container.querySelector( '.aktk-component-tools-panel__icon' )
		).not.toBeNull();
	} );

	it( 'アイコン未指定時は従来のパネル構造を維持する', () => {
		const { container } = render( <ToolsPanel label="通常設定" /> );

		expect(
			container.querySelector( '.aktk-component-tools-panel--with-icon' )
		).toBeNull();
		expect(
			screen.getByRole( 'region', { name: '通常設定' } )
		).toBeInTheDocument();
	} );
} );
