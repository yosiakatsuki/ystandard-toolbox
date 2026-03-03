/**
 * WordPress Dependencies
 */
import { render, screen, fireEvent } from '@testing-library/react';

/**
 * Plugin Dependencies
 */
import { Columns } from '../columns';
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

describe( 'Columns', () => {
	it( 'デスクトップの NumberControl が正しくレンダリングされる', () => {
		const props = createProps();
		render( <Columns { ...props } /> );
		expect(
			screen.getByLabelText( 'デスクトップ' )
		).toBeInTheDocument();
	} );

	it( 'タブレットの NumberControl が正しくレンダリングされる', () => {
		const props = createProps();
		render( <Columns { ...props } /> );
		expect(
			screen.getByLabelText( 'タブレット' )
		).toBeInTheDocument();
	} );

	it( 'モバイルの NumberControl が正しくレンダリングされる', () => {
		const props = createProps();
		render( <Columns { ...props } /> );
		expect(
			screen.getByLabelText( 'モバイル' )
		).toBeInTheDocument();
	} );

	it( 'デスクトップの列数を変更すると setAttributes が { colPc: 整数値 } で呼ばれる', () => {
		const props = createProps();
		render( <Columns { ...props } /> );
		const input = screen.getByLabelText( 'デスクトップ' );
		fireEvent.change( input, { target: { value: '4' } } );
		expect( props.setAttributes ).toHaveBeenCalledWith( {
			colPc: 4,
		} );
	} );

	it( 'タブレットの列数を変更すると setAttributes が { colTablet: 整数値 } で呼ばれる', () => {
		const props = createProps();
		render( <Columns { ...props } /> );
		const input = screen.getByLabelText( 'タブレット' );
		fireEvent.change( input, { target: { value: '3' } } );
		expect( props.setAttributes ).toHaveBeenCalledWith( {
			colTablet: 3,
		} );
	} );

	it( 'モバイルの列数を変更すると setAttributes が { colMobile: 整数値 } で呼ばれる', () => {
		const props = createProps();
		render( <Columns { ...props } /> );
		const input = screen.getByLabelText( 'モバイル' );
		fireEvent.change( input, { target: { value: '2' } } );
		expect( props.setAttributes ).toHaveBeenCalledWith( {
			colMobile: 2,
		} );
	} );

	it( '非数値を入力した場合、setAttributes が undefined で呼ばれる', () => {
		const props = createProps();
		render( <Columns { ...props } /> );
		const input = screen.getByLabelText( 'デスクトップ' );
		fireEvent.change( input, { target: { value: 'abc' } } );
		expect( props.setAttributes ).toHaveBeenCalledWith( {
			colPc: undefined,
		} );
	} );
} );
