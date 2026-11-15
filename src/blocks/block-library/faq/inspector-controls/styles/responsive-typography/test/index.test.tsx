/**
 * External dependencies.
 */
import type { ReactNode } from 'react';

/**
 * WordPress dependencies.
 */
import { render, screen } from '@testing-library/react';

/**
 * Block dependencies.
 */
import type { FaqEditProps } from '../../../../types';
import { ResponsiveTypography } from '..';

jest.mock( '@aktk/block-components/wp-controls/tools-panel', () => ( {
	ToolsPanel: ( {
		children,
		icon,
		label,
	}: {
		children: ReactNode;
		icon?: ReactNode;
		label: string;
	} ) => (
		<div data-panel-label={ label }>
			{ icon }
			{ children }
		</div>
	),
	ToolsPanelItem: ( { children }: { children: ReactNode } ) => (
		<section>{ children }</section>
	),
} ) );

jest.mock(
	'@aktk/block-components/components/responsive-font-size-control',
	() => ( {
		ResponsiveFontSizeControl: () => <div />,
	} )
);

jest.mock( '@aktk/components/ystandard-icon', () => ( {
	PanelIcon: () => <span data-testid="ys-panel-icon" />,
} ) );

const createProps = (): FaqEditProps => ( {
	attributes: {
		isAccordion: false,
	},
	setAttributes: jest.fn(),
	clientId: 'test-client-id',
	updateChildAttributes: jest.fn(),
} );

describe( 'ResponsiveTypography', () => {
	it( 'パネル見出しにysアイコンを表示する', () => {
		render( <ResponsiveTypography { ...createProps() } /> );

		expect(
			document.querySelector(
				'[data-panel-label="レスポンシブ文字設定"]'
			)
		).not.toBeNull();
		expect( screen.getByTestId( 'ys-panel-icon' ) ).toBeInTheDocument();
	} );
} );
