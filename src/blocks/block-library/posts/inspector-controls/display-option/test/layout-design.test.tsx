/**
 * WordPress Dependencies
 */
import { render, screen, fireEvent } from '@testing-library/react';

/**
 * Plugin Dependencies
 */
import { LayoutDesign } from '../layout-design';
import type { PostsEditProps } from '../../../types';

const createProps = (
	overrides: Partial< PostsEditProps > = {}
): PostsEditProps => ( {
	attributes: {
		count: 6,
		countMobile: 3,
		orderby: 'date',
		order: 'DESC',
		listType: 'card',
		colMobile: 1,
		colTablet: 2,
		colPc: 3,
		showImg: true,
		thumbnailSize: 'medium',
		thumbnailRatio: '16-9',
		showDate: true,
		showCategory: true,
		showExcerpt: false,
		postType: 'post',
	},
	setAttributes: jest.fn(),
	clientId: 'test-client-id',
	isSelected: true,
	...overrides,
} );

describe( 'LayoutDesign', () => {
	it( 'デザイン選択肢が正しくレンダリングされる', () => {
		const props = createProps();
		render( <LayoutDesign { ...props } /> );
		// デスクトップ・モバイル両方のセレクトに選択肢があるため複数存在する.
		expect( screen.getAllByText( 'カード' ).length ).toBeGreaterThanOrEqual( 1 );
		expect( screen.getAllByText( 'リスト' ).length ).toBeGreaterThanOrEqual( 1 );
		expect( screen.getAllByText( 'シンプル' ).length ).toBeGreaterThanOrEqual( 1 );
	} );

	it( 'デスクトップとモバイルで2つのセレクトが存在する', () => {
		const props = createProps();
		render( <LayoutDesign { ...props } /> );
		const selects = screen.getAllByRole( 'combobox' );
		expect( selects ).toHaveLength( 2 );
	} );

	it( 'デスクトップ用セレクトには空の選択肢がない', () => {
		const props = createProps();
		render( <LayoutDesign { ...props } /> );
		// デスクトップは useEmptyValue={ false } のため空の選択肢がない.
		const selects = screen.getAllByRole( 'combobox' );
		const desktopOptions = selects[ 0 ].querySelectorAll( 'option' );
		expect( desktopOptions ).toHaveLength( 3 );
	} );

	it( 'モバイル用セレクトには空の選択肢がある', () => {
		const props = createProps( {
			attributes: {
				...createProps().attributes,
				listTypeMobile: '',
			},
		} );
		render( <LayoutDesign { ...props } /> );
		// モバイルは useEmptyValue がデフォルト（true）のため空の選択肢がある.
		expect( screen.getByText( '----' ) ).toBeInTheDocument();
	} );

	it( 'デスクトップのセレクトを変更すると setAttributes が呼ばれる', () => {
		const props = createProps();
		render( <LayoutDesign { ...props } /> );
		const selects = screen.getAllByRole( 'combobox' );
		fireEvent.change( selects[ 0 ], { target: { value: 'list' } } );
		expect( props.setAttributes ).toHaveBeenCalledWith( {
			listType: 'list',
		} );
	} );

	it( 'モバイルのセレクトを変更すると setAttributes が呼ばれる', () => {
		const props = createProps();
		render( <LayoutDesign { ...props } /> );
		const selects = screen.getAllByRole( 'combobox' );
		fireEvent.change( selects[ 1 ], { target: { value: 'simple' } } );
		expect( props.setAttributes ).toHaveBeenCalledWith( {
			listTypeMobile: 'simple',
		} );
	} );
} );
