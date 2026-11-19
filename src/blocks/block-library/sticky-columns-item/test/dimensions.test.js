/* Test Dependencies */
import { fireEvent, render, screen } from '@testing-library/react';

/* Plugin Dependencies */
import { ResponsiveSizePanel } from '@aktk/block-components/components/responsive-size-panel';
import { ResponsiveSize } from '../inspector-controls/styles/responsive-size';
import { getItemSizeVariables } from '../dimensions';
import { getColumnWidthVariables } from '../../sticky-columns/widths';

jest.mock( '@aktk/block-components/wp-controls/unit-control', () => ( {
	__esModule: true,
	default: ( { 'aria-label': label, value, onChange } ) => (
		<input
			aria-label={ label }
			value={ value ?? '' }
			onChange={ ( e ) => onChange( e.target.value ) }
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

it( '端末別幅の更新と解除が通常寸法・他端末・最小高さを保持する', () => {
	const style = {
		dimensions: { width: '35%', minHeight: '3em' },
		spacing: { padding: { top: '20px' } },
		ystdtb: {
			stickyColumnsItem: {
				responsive: {
					width: { desktop: '36rem', mobile: '2em' },
					minHeight: { tablet: '10rem' },
				},
			},
		},
	};
	const setAttributes = jest.fn();
	const props = { attributes: { style }, setAttributes, clientId: 'column' };
	render( <ResponsiveSize { ...props } /> );
	expect(
		screen
			.getAllByRole( 'group' )
			.map( ( item ) => item.querySelector( 'legend' ).textContent )
	).toEqual( [ '幅', '最小高さ' ] );
	fireEvent.change( screen.getByLabelText( '幅（モバイル）' ), {
		target: { value: '' },
	} );
	let next = setAttributes.mock.lastCall[ 0 ].style;
	expect( next.dimensions ).toEqual( style.dimensions );
	expect( next.ystdtb.stickyColumnsItem.responsive ).toEqual( {
		width: { desktop: '36rem' },
		minHeight: { tablet: '10rem' },
	} );
	fireEvent.change( screen.getByLabelText( '最小高さ（PC）' ), {
		target: { value: '0px' },
	} );
	next = setAttributes.mock.lastCall[ 0 ].style;
	expect( next.ystdtb.stickyColumnsItem.responsive.minHeight ).toEqual( {
		desktop: '0px',
		tablet: '10rem',
	} );
	fireEvent.click( screen.getByRole( 'button', { name: '幅を解除' } ) );
	next = setAttributes.mock.lastCall[ 0 ].style;
	expect( next.dimensions ).toEqual( style.dimensions );
	expect( next.ystdtb.stickyColumnsItem.responsive ).toEqual( {
		minHeight: { tablet: '10rem' },
	} );
	fireEvent.click(
		screen.getByRole( 'button', { name: 'レスポンシブサイズを解除' } )
	);
	expect( setAttributes.mock.lastCall[ 0 ].style ).toEqual( {
		dimensions: style.dimensions,
		spacing: style.spacing,
	} );
} );

it( 'ブロックが指定した寸法だけを表示し、各項目を端末別に更新する', () => {
	const labels = {
		width: '幅',
		minWidth: '最小幅',
		maxWidth: '最大幅',
		height: '高さ',
		minHeight: '最小高さ',
		maxHeight: '最大高さ',
	};
	const settings = Object.fromEntries(
		Object.keys( labels ).map( ( key ) => [ key, true ] )
	);
	const onChange = jest.fn();
	const props = {
		panelId: 'sample',
		title: 'レスポンシブサイズ',
		settings,
		onChange,
	};
	const { rerender } = render( <ResponsiveSizePanel { ...props } /> );
	expect( screen.getAllByRole( 'group' ) ).toHaveLength( 6 );
	for ( const [ key, label ] of Object.entries( labels ) ) {
		fireEvent.change( screen.getByLabelText( label + '（タブレット）' ), {
			target: { value: '0px' },
		} );
		expect( onChange ).toHaveBeenLastCalledWith( {
			[ key ]: { tablet: '0px' },
		} );
	}
	rerender(
		<ResponsiveSizePanel
			{ ...props }
			settings={ { maxHeight: true, height: false } }
			value={ { height: { desktop: '20rem' } } }
		/>
	);
	expect( screen.getAllByRole( 'group' ) ).toHaveLength( 1 );
	fireEvent.click(
		screen.getByRole( 'button', { name: 'レスポンシブサイズを解除' } )
	);
	expect( onChange ).toHaveBeenLastCalledWith( { maxHeight: undefined } );
	rerender( <ResponsiveSizePanel { ...props } settings={ {} } /> );
	expect( screen.queryByRole( 'group' ) ).toBeNull();
} );

it( '左右それぞれの通常幅と端末別幅だけを親のFlexに渡す', () => {
	expect(
		getColumnWidthVariables( [
			{ style: { dimensions: { width: '40%' } } },
			{
				style: {
					ystdtb: {
						stickyColumnsItem: {
							responsive: { width: { tablet: '0px' } },
						},
					},
				},
			},
		] )
	).toEqual( {
		'--ystdtb--columns--1-width': '40%',
		'--ystdtb--columns--2-tablet': '0px',
	} );
} );

it.each( [
	[ 'PC', { desktop: '32rem' } ],
	[ 'タブレット', { tablet: '315px' } ],
	[ 'モバイル', { mobile: '0px' } ],
	[ '全端末', { desktop: '32rem', tablet: '315px', mobile: '0px' } ],
	[ 'タブレットとモバイル', { tablet: '315px', mobile: '0px' } ],
] )( '%sに値がある寸法だけをCSS変数にする', ( deviceLabel, values ) => {
	const column = {
		style: {
			dimensions: { width: '50%', minHeight: '12rem' },
			ystdtb: {
				stickyColumnsItem: {
					responsive: {
						width: values,
						minHeight: values,
						maxHeight: { desktop: '999px' },
					},
				},
			},
		},
	};
	const widths = { '--ystdtb--columns--1-width': '50%' };
	const heights = {};
	for ( const [ device, size ] of Object.entries( values ) ) {
		widths[ '--ystdtb--columns--1-' + device ] = size;
		heights[ '--ystdtb--' + device + '--columns--min-height' ] = size;
	}
	expect( getColumnWidthVariables( [ column ] ) ).toEqual( widths );
	expect( getItemSizeVariables( column ) ).toEqual( heights );
} );
