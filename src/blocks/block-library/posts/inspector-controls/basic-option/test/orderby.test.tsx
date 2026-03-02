/**
 * WordPress Dependencies
 */
import { render, screen, fireEvent } from '@testing-library/react';

/**
 * Plugin Dependencies
 */
import { OrderBy } from '../orderby';
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

describe( 'OrderBy', () => {
	it( 'CustomSelectControl が正しくレンダリングされる', () => {
		const props = createProps();
		render( <OrderBy { ...props } /> );
		// 選択肢が存在することを確認.
		expect(
			screen.getByText( '公開日 / 新しい順' )
		).toBeInTheDocument();
		expect( screen.getByText( 'ランダム' ) ).toBeInTheDocument();
	} );

	it( '「公開日 / 新しい順」を選択すると setAttributes が正しく呼ばれる', () => {
		const props = createProps( {
			attributes: {
				...createProps().attributes,
				orderby: 'modified',
				order: 'ASC',
			},
		} );
		render( <OrderBy { ...props } /> );
		const select = screen.getByRole( 'combobox' );
		fireEvent.change( select, { target: { value: 'date/DESC' } } );
		expect( props.setAttributes ).toHaveBeenCalledWith( {
			orderby: 'date',
			order: 'DESC',
		} );
	} );

	it( '「更新日 / 古い順」を選択すると setAttributes が正しく呼ばれる', () => {
		const props = createProps();
		render( <OrderBy { ...props } /> );
		const select = screen.getByRole( 'combobox' );
		fireEvent.change( select, { target: { value: 'modified/ASC' } } );
		expect( props.setAttributes ).toHaveBeenCalledWith( {
			orderby: 'modified',
			order: 'ASC',
		} );
	} );

	it( '「ランダム」を選択すると setAttributes が正しく呼ばれる', () => {
		const props = createProps();
		render( <OrderBy { ...props } /> );
		const select = screen.getByRole( 'combobox' );
		fireEvent.change( select, { target: { value: 'rand/DESC' } } );
		expect( props.setAttributes ).toHaveBeenCalledWith( {
			orderby: 'rand',
			order: 'DESC',
		} );
	} );
} );
