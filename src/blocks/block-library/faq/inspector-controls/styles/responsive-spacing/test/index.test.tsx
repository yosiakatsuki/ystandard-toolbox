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
import { ResponsiveSpacing } from '..';

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
	ToolsPanelItem: ( {
		children,
		isShownByDefault,
		label,
	}: {
		children: ReactNode;
		isShownByDefault: boolean;
		label: string;
	} ) => (
		<section
			aria-label={ label }
			data-shown-by-default={ String( isShownByDefault ) }
		>
			{ children }
		</section>
	),
} ) );

jest.mock(
	'@aktk/block-components/components/responsive-spacing-control',
	() => ( {
		hasResponsiveSpacingValue: () => false,
		ResponsiveSpacingControl: ( {
			allowedSides,
			label,
			minimumCustomValue = 0,
		}: {
			allowedSides: string[];
			label: string;
			minimumCustomValue?: number;
		} ) => (
			<div
				data-testid={ `responsive-${ label }` }
				data-minimum={ String( minimumCustomValue ) }
				data-sides={ allowedSides.join( ',' ) }
			/>
		),
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

describe( 'ResponsiveSpacing', () => {
	it( 'パディングとマージンを初期非表示にする', () => {
		render( <ResponsiveSpacing { ...createProps() } /> );

		expect(
			document.querySelector( '[data-panel-label="レスポンシブ余白"]' )
		).not.toBeNull();
		expect( screen.getByTestId( 'ys-panel-icon' ) ).toBeInTheDocument();
		screen.getAllByRole( 'region' ).forEach( ( item ) => {
			expect( item ).toHaveAttribute( 'data-shown-by-default', 'false' );
		} );
	} );

	it( 'marginは上下、paddingは上下左右だけを許可する', () => {
		render( <ResponsiveSpacing { ...createProps() } /> );

		expect( screen.getByTestId( 'responsive-パディング' ) ).toHaveAttribute(
			'data-sides',
			'top,right,bottom,left'
		);
		expect( screen.getByTestId( 'responsive-パディング' ) ).toHaveAttribute(
			'data-minimum',
			'0'
		);
		expect( screen.getByTestId( 'responsive-マージン' ) ).toHaveAttribute(
			'data-sides',
			'top,bottom'
		);
		expect( screen.getByTestId( 'responsive-マージン' ) ).toHaveAttribute(
			'data-minimum',
			'-9999'
		);
	} );
} );
