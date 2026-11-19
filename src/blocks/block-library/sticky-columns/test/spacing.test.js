/* Test Dependencies */
import { fireEvent, render, screen } from '@testing-library/react';

/* Plugin Dependencies */
import { ResponsiveSpacing } from '../inspector-controls/styles/responsive-spacing';
import { getGapVariables } from '../gap';

jest.mock( '@aktk/block-components/wp-controls/unit-control', () => ( {
	__esModule: true,
	default: ( { 'aria-label': label, value, onChange } ) => (
		<input
			aria-label={ label }
			value={ value ?? '' }
			onChange={ ( event ) => onChange( event.target.value ) }
		/>
	),
} ) );
jest.mock( '@aktk/block-components/wp-controls/tools-panel', () => ( {
	ToolsPanel: ( { children, label, resetAll } ) => (
		<section>
			{ children }
			<button onClick={ resetAll }>{ label }を解除</button>
		</section>
	),
	ToolsPanelItem: ( { children, label, onDeselect } ) => (
		<div>
			{ children }
			<button onClick={ onDeselect }>{ label }を解除</button>
		</div>
	),
} ) );

it( '入力と解除を対象の間隔に限り、通常値と追従位置を保持する', () => {
	const spacing = {
		blockGap: { top: '2em', left: '32px' },
		padding: { top: '8px' },
	};
	const blockGap = {
		column: { desktop: '3%', tablet: '2rem' },
		row: { mobile: '1rem' },
	};
	const style = {
		spacing,
		ystdtb: {
			stickyColumns: { stickyOffset: '2em', responsive: { blockGap } },
		},
	};
	const setAttributes = jest.fn();
	render(
		<ResponsiveSpacing
			attributes={ { style } }
			clientId="columns"
			setAttributes={ setAttributes }
		/>
	);
	expect( screen.getAllByRole( 'textbox' ) ).toHaveLength( 6 );
	fireEvent.change( screen.getByLabelText( '横方向（タブレット）' ), {
		target: { value: '' },
	} );
	expect(
		setAttributes.mock.lastCall[ 0 ].style.ystdtb.stickyColumns.responsive
			.blockGap
	).toEqual( {
		column: { desktop: '3%' },
		row: blockGap.row,
	} );
	fireEvent.change( screen.getByLabelText( '縦方向（PC）' ), {
		target: { value: '0' },
	} );
	expect(
		setAttributes.mock.lastCall[ 0 ].style.ystdtb.stickyColumns.responsive
			.blockGap
	).toEqual( {
		column: blockGap.column,
		row: { mobile: '1rem', desktop: '0' },
	} );
	for ( const label of [ 'カラムの間隔を解除', 'レスポンシブ余白を解除' ] ) {
		fireEvent.click( screen.getByRole( 'button', { name: label } ) );
		expect( setAttributes.mock.lastCall[ 0 ].style ).toEqual( {
			spacing,
			ystdtb: { stickyColumns: { stickyOffset: '2em' } },
		} );
	}
} );

it.each( [
	{ desktop: '32px' },
	{ tablet: '2rem' },
	{ mobile: '0' },
	{ desktop: '32px', tablet: '2rem', mobile: '0' },
	{ tablet: '2rem', mobile: '0' },
] )( '指定された端末だけに横間隔を出力する %j', ( column ) => {
	const style = {
		spacing: { blockGap: '1em' },
		ystdtb: { stickyColumns: { responsive: { blockGap: { column } } } },
	};
	const expected = {
		'--ystdtb--columns--row-gap-base': '1em',
		'--ystdtb--columns--column-gap-base': '1em',
	};
	for ( const [ device, gap ] of Object.entries( column ) ) {
		expected[ '--ystdtb--columns--column-gap-' + device ] =
			gap === '0' ? '0px' : gap;
	}
	expect( getGapVariables( { style } ) ).toEqual( expected );
} );
