/**
 * External dependencies.
 */
import type { ReactNode } from 'react';

/**
 * WordPress dependencies.
 */
import { fireEvent, render, screen } from '@testing-library/react';

/**
 * Internal dependencies.
 */
import { ResponsiveSpacingControl } from '../index';

jest.mock( '@aktk/block-components/wp-controls/base-control', () => ( {
	__esModule: true,
	default: ( {
		children,
		label,
	}: {
		children: ReactNode;
		label: string;
	} ) => (
		<div>
			<span>{ label }</span>
			{ children }
		</div>
	),
} ) );

jest.mock( '@aktk/block-components/wp-controls/spacing-size-control', () => ( {
	__esModule: true,
	default: ( {
		minimumCustomValue,
		onChange,
		sides,
	}: {
		minimumCustomValue: number;
		onChange: ( value: { top?: string; bottom?: string } ) => void;
		sides: string[];
	} ) => (
		<button
			type="button"
			data-minimum={ String( minimumCustomValue ) }
			data-sides={ sides.join( ',' ) }
			onClick={ () => onChange( { top: '16px' } ) }
		>
			余白を変更
		</button>
	),
} ) );

describe( 'ResponsiveSpacingControl', () => {
	it( 'ラベルと3端末の余白入力を縦に表示する', () => {
		const { container } = render(
			<ResponsiveSpacingControl
				label="マージン"
				value={ {
					desktop: { top: '1rem' },
				} }
				onChange={ jest.fn() }
				allowedSides={ [ 'top', 'bottom' ] }
				minimumCustomValue={ -9999 }
			/>
		);

		expect( screen.getByText( 'マージン' ) ).toBeInTheDocument();
		expect(
			container.querySelector( '.aktk-responsive-spacing-control' )
		).not.toBeNull();
		[ 'デスクトップ', 'タブレット', 'モバイル' ].forEach(
			( deviceLabel ) => {
				expect(
					screen.getByRole( 'group', { name: deviceLabel } )
				).toBeInTheDocument();
			}
		);
		screen
			.getAllByRole( 'button', { name: '余白を変更' } )
			.forEach( ( control ) => {
				expect( control ).toHaveAttribute( 'data-sides', 'top,bottom' );
				expect( control ).toHaveAttribute( 'data-minimum', '-9999' );
			} );
	} );

	it( '変更した端末の値だけを更新する', () => {
		const onChange = jest.fn();
		render(
			<ResponsiveSpacingControl
				label="マージン"
				value={ {
					desktop: { top: '1rem' },
				} }
				onChange={ onChange }
				allowedSides={ [ 'top', 'bottom' ] }
			/>
		);

		fireEvent.click(
			screen.getAllByRole( 'button', { name: '余白を変更' } )[ 1 ]
		);

		expect( onChange ).toHaveBeenCalledWith( {
			desktop: { top: '1rem' },
			tablet: { top: '16px' },
		} );
	} );
} );
