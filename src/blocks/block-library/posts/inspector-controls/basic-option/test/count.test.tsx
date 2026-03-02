/**
 * WordPress Dependencies
 */
import { render, screen, fireEvent } from '@testing-library/react';

/**
 * Plugin Dependencies
 */
import { Count } from '../count';
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

describe( 'Count', () => {
	it( 'PC表示件数の NumberControl が正しくレンダリングされる', () => {
		const props = createProps();
		render( <Count { ...props } /> );
		expect(
			screen.getByLabelText( 'PC 表示件数' )
		).toBeInTheDocument();
	} );

	it( 'モバイル表示件数の NumberControl が正しくレンダリングされる', () => {
		const props = createProps();
		render( <Count { ...props } /> );
		expect(
			screen.getByLabelText( 'モバイル 表示件数' )
		).toBeInTheDocument();
	} );

	it( 'PC表示件数を変更すると setAttributes が { count: 整数値 } で呼ばれる', () => {
		const props = createProps();
		render( <Count { ...props } /> );
		const input = screen.getByLabelText( 'PC 表示件数' );
		fireEvent.change( input, { target: { value: '10' } } );
		expect( props.setAttributes ).toHaveBeenCalledWith( { count: 10 } );
	} );

	it( 'モバイル表示件数を変更すると setAttributes が { countMobile: 整数値 } で呼ばれる', () => {
		const props = createProps();
		render( <Count { ...props } /> );
		const input = screen.getByLabelText( 'モバイル 表示件数' );
		fireEvent.change( input, { target: { value: '5' } } );
		expect( props.setAttributes ).toHaveBeenCalledWith( {
			countMobile: 5,
		} );
	} );

	it( '非数値を入力した場合、setAttributes が { count: undefined } で呼ばれる', () => {
		const props = createProps();
		render( <Count { ...props } /> );
		const input = screen.getByLabelText( 'PC 表示件数' );
		fireEvent.change( input, { target: { value: 'abc' } } );
		expect( props.setAttributes ).toHaveBeenCalledWith( {
			count: undefined,
		} );
	} );
} );
